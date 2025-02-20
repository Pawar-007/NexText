import express from "express"
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
import colors from 'colors'

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

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
   res.send("server is running successfully ");
}) 

app.use('/app/user',userRouter);
app.use('/app/chats',chatroute);
app.use('/app/Message',messageRouter);
app.listen(process.env.PORT,()=>{
   console.log(`server running successfully ${process.env.PORT}`);
})


app.use(notFound);
app.use(errorHandler);