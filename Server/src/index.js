import express from 'express';
import messageroute from './route/message.route.js';
import authroute from './route/auth.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { app, server } from './lib/socket.js';
import { connect } from './config/mongoos.db.config.js';
dotenv.config();

const Port=process.env.Port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENTNAME,
  credentials: true
}));

app.get('/', async(req,res)=>{
 res.send("server is working");
});
app.use('/chat', messageroute );
app.use('/auth', authroute);

server.listen(
    Port,()=>{
        console.log("server Started at Port "+Port);
        connect
    }
)