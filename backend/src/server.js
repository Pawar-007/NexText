import express from "express"
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
import colors from 'colors'
import { createServer } from 'http';
import { Server } from "socket.io";
import userRouter from "./router/userRouter.js";
import {notFound,errorHandler} from './middleware/error.middleware.js'
import chatroute from "./router/chatroutes.js";
import messageRouter from "./router/messageRouter.js";
dotenv.config({
   path:".env"
});

connectDB()
.then(item=>{
   console.log(`database connected successfully `.yellow);
}).catch(error => {
   console.log(`database not connected ${error.message}`);

}
)

const app=express();

app.use(cors(
   { 
      origin:`${process.env.CLIENT_URL}`,
      methods:["GET","POST","PUT","DELETE"],
      credentials:true
   }
));

app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({limit:"16kb",extended:true}))

app.get("/",(req,res)=>{
   res.send("server is running successfully ");
}) 
console.log("server is running successfully",process.env.CLIENT_URL);
app.use('/app/user',userRouter);
app.use('/app/chats',chatroute);
app.use('/app/Message',messageRouter);


app.use(notFound);
app.use(errorHandler);

const server=createServer(app);
 
const io=new Server(server,{
   pingTimeout:60000,
   cors:{
      origin:`${process.env.CLIENT_URL}`,
   }
}) 

io.on('connection',(socket)=>{
   socket.on("setup",(userData)=>{
      socket.join(userData._id);
      socket.emit("connected");
   })

   socket.on("join room",room=>{

      console.log("room join ",room);
     })
   
   socket.on("typing",room=>{
     
      socket.in(room).emit("typing")
   })

   socket.on("stop typing",room=>{
      socket.in(room).emit("stop typing");
   })

    
     
   socket.on("new Message",(newMessage)=>{
      var chat=newMessage.chat;
      if(!chat.users) return console.log("user not found in chats");
      console.log("new message",newMessage);
      chat.users.forEach(user=>{
         if(user._id===newMessage.sender._id) return;
         let send=socket.in(user._id).emit("Message recieved",newMessage);
        
      })
   })
})

server.listen(process.env.PORT,()=>{
   console.log(`server running successfully ${process.env.PORT}`);
   })