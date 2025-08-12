import Post from '../models/post.model.js';

export const createPost = async (req, res) => { 
    const postData = req.body;

    try { 
        const newPost = new Post(postData);
        newPost.author = req.user.id;
        const postSaved = await newPost.save();
        
        res.status(201).json(postSaved);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllPosts = async (req, res) => { 
    try {
        const posts = await Post.find({author: req.user.id}).populate('author', 'username').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
}

export const updatePost = async (req, res) => {
    const postData = req.body;

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, postData, { new: true });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deletePost = async (req, res) => { 
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}