import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb://localhost:27017/learning");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    imageUrl:String,
});

export const User = mongoose.model('User',userSchema);