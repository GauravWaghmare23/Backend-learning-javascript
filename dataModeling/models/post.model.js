import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postTitle:String,
    postContent:String,
    postAuthor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

export const Post = mongoose.model('Post',postSchema);