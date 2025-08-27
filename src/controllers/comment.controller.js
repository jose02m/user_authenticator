import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';

export const createComment = async (req, res) => {
    const commentData = req.body;

    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ error: 'Post not found' });

        const newComment = new Comment(commentData);

        newComment.userId = req.user.id;
        newComment.postId = req.params.id;

        const commentSaved = await newComment.save();

        res.status(201).json(commentSaved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
            .populate([{ path: 'userId', select: 'username' }, { path: 'postId', select: 'title' }])
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateComment = async (req, res) => {
    const { content } = req.body;

    try {
        const cutOff = new Date(Date.now() - 30 * 1000);

        const commentUpdatedData = await Comment.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user.id,
            createdAt: { $gte: cutOff }
        },
        { $set: { content: content.trim() } },
        {
            new: true,
            runValidators: true
        })
        .populate('userId', 'username')
        .populate('postId', 'title');

        if (!commentUpdatedData) {
            const existingComment = await Comment.findById(req.params.id).lean();
            
            if (!existingComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            if (existingComment.userId.toString() !== req.user.id) {
                return res.status(403).json({ error: 'Not authorized' });
            }

            return res.status(403).json({ error: 'Comment can only be updated within 30 seconds of creation' });
        }

        res.status(200).json(commentUpdatedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({_id: req.params.id, userId: req.user.id});

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

