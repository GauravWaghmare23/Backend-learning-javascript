import express from "express";
import { User } from "./models/user.model.js";
import { Post } from "./models/post.model.js";

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Welcome to the Data Modeling');
});

app.get('/create', async (req, res) => {
  try {
    const createdUser = await User.create({
      username: "Aachal Waghmare",
      email: "aachal@gmail.com",
      password: "123456",
    });
    res.send(createdUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/post/create', async (req, res) => {
  try {
    const user = await User.findOne({ email: "aachal@gmail.com" });

    const createdPost = await Post.create({
      postTitle: "post2",
      postContent: "post2 content",
      postAuthor: user._id,
    });

    user.post.push(createdPost._id); 
    await user.save();

    res.send(createdPost);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/post/read', async (req, res) => {
  try {
    const posts = await Post.find().populate('postAuthor', 'username');
    const formattedPosts = posts.map(post => ({
      postTitle: post.postTitle,
      postContent: post.postContent,
      postAuthor: post.postAuthor.username,
    }));
    res.send(formattedPosts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});