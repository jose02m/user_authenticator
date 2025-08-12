import { Router } from "express"
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const postRouter = Router();

postRouter.post('/', authRequired, createPost);
postRouter.get('/', authRequired, getAllPosts);
postRouter.get('/:id', authRequired, getPostById);
postRouter.put('/:id', authRequired, updatePost);
postRouter.delete('/:id', authRequired, deletePost);

export default postRouter;