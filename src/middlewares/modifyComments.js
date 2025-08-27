import Comment from "../models/comment.model.js";

export const modifyComment = async (req, res, next) => {
  try {
    const comment = await Comment.FindcommentById(req.params.id)
      .select("userId postId")
      .populate({ path: "postId", select: "author" })
      .lean();
      
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const isOwnner = comment.userId.toString() === req.user.id;
    const isAuthor = comment.postId.author.toString() === req.user.id;
    
    if (!isOwnner && !isAuthor) {
      return res.status(403).json({ error: "You are not authorized to modify this comment" });
    }

    req.commentId = comment._id;
    next();

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
