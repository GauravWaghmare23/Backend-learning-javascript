import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/datamodeling");

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
});

export const User = mongoose.model('User',userSchema);