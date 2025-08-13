import http from 'http';

const app = http.createServer((req,res)=>{
    res.end("Hello world");
});

app.listen()