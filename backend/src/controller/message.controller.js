import axios from "axios";
import Chat from "../model/chat.model.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import Request from "../model/request.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });

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

const unreadMessage=asyncHandler(async(user)=>{
      const unread=await Message.find({chat:{$in :user.chats},delevered:false})
      .populate("sender","name pic email")
      .populate("chat")
      .sort({createdAt:-1})

      Message.updateMany({chat:{$in :user.chats},delevered:false},{
      delevered:true});
      return unread;
})



const markMessagesAsDelivered = async (req, res) => {
    try {
        const { chatId } = req.body;

        if (!chatId) {
            return res.status(400).json({ message: "Chat ID is required" });
        }

        // Update all messages in this chat that are not delivered
        await Message.updateMany(
            { chat: chatId, delivered: false },
            { $set: { delivered: true } }
        );

        res.status(200).json({ message: "Messages marked as delivered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const chatWithChatBot=asyncHandler (async (req,res)=>{
   const {chatId,content}=req.body;

   if(!chatId || !content){
      console.log("invallid data pass into request");
      return res.status(400).json("invalud input");
   }
   let getResponseCount=await Request.findOne({
      sender:req.user._id,
      chat:chatId,
   })
   if (!getResponseCount) {
      getResponseCount = await Request.create({
         sender: req.user._id,
         chat: chatId,
         requestCount: 0,
      });
   }
 
   if(getResponseCount.requestCount < 10){
        try {
      let userMessage = await Message.create({
         sender:req.user._id,
         chat:chatId,
         content:content
       });
    
      userMessage = await userMessage.populate("sender", "name pic");
      userMessage = await userMessage.populate({
         path: "chat",
         populate: { path: "users", select: "name pic email" }
      });
      await Chat.findByIdAndUpdate(req.body.chatId,{
         latestMessage:userMessage
      })

      const response = await ai.models.generateContent({
       model: "gemini-2.0-flash",
       contents: `You are an intelligent, helpful assistant in a chat application, similar to Meta AI. 
       Answer the following user message accurately, clearly, and conversationally. 
      If the user asks for advice, provide step-by-step or structured suggestions. 
      If the question is factual, give accurate and concise information. 
      Avoid unnecessary explanations. Here is the user's message:  ${content}`,
       });
   
      let botReply =response?.text;
      if (!botReply) throw new Error("Invalid bot response");
      let bot=await User.findOne({
         name:"chatbot",
         email:process.env.CHATBOT_EMAIL
      })
    
      let botMessage=await Message.create({
         sender:bot._id,
         chat:chatId,
         content:botReply
      })
      botMessage=await botMessage.populate("sender","name pic");
      botMessage=await botMessage.populate({
         path:"chat",
         populate:{path:"users",select:"name pic email"}
      })
    
      await Chat.findByIdAndUpdate(req.body.chatId,{
         latestMessage:botMessage
      })
      await Request.findOneAndUpdate(
      { sender: req.user._id, chat: chatId },
      { $inc: { requestCount: 1 }, $set: { lastRequestDate: new Date() } }
      );

      
      res.status(200).json({"isBot":true,"botMessage":botMessage,"message":userMessage});
   } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: "Failed to connect to chatbot" });
   }
   }
   else{
      res.status(429).json({
      error: "You exceeded the limit of chats",
     });
   }
})

export {
   sendMessage,
   allMessage,
   unreadMessage,
   markMessagesAsDelivered,
   chatWithChatBot
}