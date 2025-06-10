import express from 'express'
import messageroute from './route/message.route.js'
import dotenv from 'dotenv'

dotenv.config();


const app=express();
const Port=process.env.Port;
app.use(express.json());


const message=[{ role: "user", content: "Let's see, write a single paragraph-long poem for me." }];
app.get('/', async(req,res)=>{
 res.send("server is working");
});
app.use('/chat', messageroute )

app.listen(
    Port,()=>{
        console.log("server Started at Port "+Port);
    }
)