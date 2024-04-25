
//! how to connect with socket 

const http = require("http");
const express = require("express");
const fs = require("fs");

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server);

app.get("/", (req,res)=>{
    fs.createReadStream('./index.html','utf-8').pipe(res);
})


io.on('connection',function(socket){

    console.log('an user connected')

    socket.on('disconnect',function(){

        console.log('user disconnected')
    })
})

server.listen(5000,err=>{
    if(err) throw err;
    console.log('server is running')
})