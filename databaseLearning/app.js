import express from 'express';
import userModel from './userModel.js';

const app = express();

app.get('/', (req, res) => {
  res.send('hey');
});

app.get('/create', async (req, res) => {
  const createduser = await userModel.create({
    name: "Archana thawkar",
    email: "archana@gmail.com",
    username: "archana"
  });
  res.send(createduser);
});

app.get('/update', async (req,res)=>{
    const updatedUser = await userModel.findOneAndUpdate({username:"gaurav"},{name:"Gaurav Sumant Waghmare",email:"gauravwaghmare95032@gmail.com"},{new:true});
    res.send(updatedUser)
});

app.get('/read',async (req,res)=>{
    const users = await userModel.find();
    res.send(users)
});

app.get('/read/:username',async (req,res)=>{
    const user = await userModel.findOne({username:req.params.username});
    res.send(user);
})

app.get('/delete/:username',async (req,res)=>{
    const deleteduser = await userModel.findOneAndDelete({username:req.params.username});
    res.send(deleteduser);
})

app.listen(3000);