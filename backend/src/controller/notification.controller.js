import Notification from "../model/notification.modal.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
const createNotification =asyncHandler(async(req,res)=>{
      const {receiver,chat}=req.body;
      const sender=req.user._id;
      if(!sender || !receiver){
        console.log("sender or reciver not found in request");
        return res.sendStatus(400).message("sender or reciver not found in request");
      }
       const receiverId =new mongoose.Types.ObjectId(receiver);
       const chatId = chat ?new mongoose.Types.ObjectId(chat) : null; 
      const notificationCreated=await Notification.create({
        sender:sender,
        receiver:receiverId,
        chat: chatId
      });

      res.status(201).send(notificationCreated);
})

const getNotifications=asyncHandler(async(req,res)=>{
      console.log("userId",req.user);
      const userId=req.user._id;
      
      const notification=await Notification.find();

      console.log("notification ",notification);
       
      res.status(200).send(notification);
      
})

export{
   createNotification,
   getNotifications
}