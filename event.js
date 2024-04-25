

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

    //! adding predefined event 

    // setTimeout(() => {
    //     socket.send('event ...')
    // }, 3000);


    //! adding custom event 

    setTimeout(() => {
        
        socket.emit('cus_event',"this is custm evnt")
    }, 3000);

    socket.on('disconnect',function(){

        console.log('user disconnected')
    })
})

server.listen(5000,err=>{
    if(err) throw err;
    console.log('server is running')
})