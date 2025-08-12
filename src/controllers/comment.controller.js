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
    const commentData = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, commentData, { new: true });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

