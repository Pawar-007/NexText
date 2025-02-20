import Chat from "../model/chat.model.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";

const sendMessage=asyncHandler(async(req,res)=>{
   const {content,chatId}=req.body;
   
   if(!content || !chatId){
      console.log("invallid data pass into request");
      return res.status(400).json("invalud input");
   }

   var newMesssage={
      sender:req.user._id,
      chat:chatId,
      content:content
   }

   try {
      let message=await Message.create(newMesssage);
      
      message=await message.populate("sender","name pic");
      message=await message.populate({
         path:"chat",
         populate:{path:"users",select:"name pic email"}
      })
      console.log("message",message);

      await Chat.findByIdAndUpdate(req.body.chatId,{
         latestMessage:message
      })
      
      res.status(200).json(message);
   } catch (error) {
      res.status(400);
      throw new Error(error.message);
   }
})

const allMessage=asyncHandler(async(req,res)=>{
    let chatId=req.params.chatId;
    if(!chatId){
      throw new Error("chatId is not provided");
    }
    try {
      const message=await Message.find({chat:chatId}).populate("sender","name pic email")
      .populate("chat")

      res.status(200).json(message);

    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
})
export {
   sendMessage,
   allMessage
}