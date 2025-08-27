import { Router } from "express";

import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { modifyComment } from "../middlewares/modifyComments.js";

const commentRouter = Router();

commentRouter.post("/:id", authRequired, createComment);
commentRouter.get("/:postId", getCommentsByPostId);
commentRouter.put("/:id", authRequired, updateComment);
commentRouter.delete("/:id", authRequired, modifyComment, deleteComment);

export default commentRouter;
