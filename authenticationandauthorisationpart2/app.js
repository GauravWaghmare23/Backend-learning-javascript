import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine','ejs');
app.set(path.join(__dirname,'views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.render("index");
})

app.post('/create',(req,res)=>{
    const {username,email,password,age} = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            const createdUser = await User.create({username,email,password:hash,age});
            const token = jwt.sign({ email }, 'secret');
            res.cookie("token",token);
            res.redirect('/profile');
        });
    });
});

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        res.send("User not found");
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            const token = jwt.sign({ email:user.email }, 'secret');
            res.cookie("token",token);
            res.redirect('/profile');
        }else{
            res.send("Incorrect password");
        }
    });
});

app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect('/');
})

app.get('/profile',async (req,res)=>{
    const token = req.cookies.token;
    if (token) {
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findOne({email:decoded.email});
        res.send(user);
    }else{
        res.redirect('/login');
    }
});

app.get('/admin',async (req,res)=>{
    const token = req.cookies.token;
    if (token) {
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findOne({email:decoded.email});
        if(user.role === 'admin'){
            res.send("Admin page");
        }
    }else{
        res.redirect('/login');
    }   
})

app.listen(3000);