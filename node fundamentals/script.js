import fs from 'fs';

// to make and write in a file :
fs.writeFile("hey.txt","Hey from node js",function(err) {
    if(err) console.log(err);
    else console.log("done");
})


// to further write in a same file
fs.appendFile("hey.txt",", I am a javascript runtime enviornment",function(err){
    if (err) console.log(err);
    else console.log("done");
})


// to change the name of the file
fs.rename("hey.txt","hello.txt",function(err){
    if(err) console.log(err);
    else console.log("done");
})

// to copy the file
fs.copyFile("hello.txt","copyFile.txt",function(error){
    if(error) console.log(error);
    else console.log("done");
})

// to delete a file
fs.unlink("copyFile.txt",function(error){
    if(error) console.log(error);
    else console.log("done");
})

// to read a file
fs.readFile("notes.txt",(err,data)=>{
    if(err) console.log(err);
    else console.log(data.toString());
})