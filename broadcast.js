

const http = require("http");
const express = require("express");
const fs = require("fs");

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server);

app.get("/", (req,res)=>{
    fs.createReadStream('./index.html','utf-8').pipe(res);
})

//! sending data to all connected users 

// let users =0;
// io.on('connection',function(socket){

//     console.log('an user connected')

//     users++;
//     io.sockets.emit('broadcast', {message: ` ${users}  users connected`})

//     socket.on('disconnect',function(){
//         users--;
//         io.sockets.emit('broadcast', {message: ` ${users}  users connected`})
//         console.log('user disconnected')
//     })
// })

let users =0;
io.on('connection',function(socket){

    console.log('an user connected')

    users++;

    //! sending data to the single client who is connecting now 

    socket.emit('broadcast',{message:"hello , welcome to socket "})

    //! sending data to the clients who were already connected 

    socket.broadcast.emit('broadcast', {message: ` ${users}  users connected`})

    socket.on('disconnect',function(){
        users--;
        socket.broadcast.emit('broadcast', {message: ` ${users}  users connected`})
        console.log('user disconnected')
    })
})

server.listen(5000,err=>{
    if(err) throw err;
    console.log('server is running')
})