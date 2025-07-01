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
  const userId = socket.handshake.query.userId;

  if (userId) {
    // Let the socket join a room with the name of the userId
    socket.join(userId);
    console.log(`Socket ${socket.id} joined personal room: ${userId}`);
  }

    
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });
    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id);
    })
})

export {io, server, app}