import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

commentSchema.index({ postId: 1, userId: 1 });
commentSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Comment', commentSchema);