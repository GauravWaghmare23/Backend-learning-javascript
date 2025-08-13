import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send("I am a champion");
})

let data = {
    name:"Gaurav Waghmare",
    "age":21,
    "college":"Suryodaya college of engineering and technology",
    "year":"3rd year"
}
app.get('/profile',(req,res)=>{
    res.status(200).send(data)
})

app.listen(3000,()=>{
    console.log(`app is listening on the port 3000`)
})