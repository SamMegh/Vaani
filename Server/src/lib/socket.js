import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENTNAME],
        credentials: true
    }
});
io.on("connection",(socket)=>{
    console.log("new user connected", socket.id);
    
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });
    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id);
    })
})

export {io, server, app}