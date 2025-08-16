import express from 'express';
import cookieParser from 'cookie-parser';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cookieParser());

// app.get('/',(req,res)=>{
//     res.cookie("name","Aachal");
//     res.send("Hello Aachal");
// });

// app.get('/name',(req,res)=>{
//     res.send("Hello Aachal Waghmare");
//     console.log(req.cookies)
// });

// const password = "abcde"
// const hashed = "$2b$10$csMf.9aq2w2tKXRTiVFRZeLckrpPnciz6qTVJE7GvaU1BYbgyb9sm"

// app.get('/',(req,res)=>{
//     bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         res.send("password is successfully encrypted");
//         console.log(hash);
//     });
// });
// });


// app.get('/',(req,res)=>{
//     bcrypt.compare(password, hashed, function(err, result) {
//     console.log(result);
// });
// });


app.get('/',(req,res)=>{
    let token = jwt.sign({email:"gauravwaghmare95032@gmail.com"},'secret');
    res.cookie("token",token);
    res.send("done");
});

app.get('/check',(req,res)=>{
    let data = jwt.verify(req.cookies.token,'secret');
    console.log(data);
    res.send(data);
});


app.listen(3000,()=>{
    console.log(`app is listening on the http://localhost:3000`);
});