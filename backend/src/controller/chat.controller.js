import User from "../model/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import Chat from "../model/chat.model.js";
import { Error } from "mongoose";

const accessChat=asyncHandler(async(req,res)=>{
   const {userId}=req.body;
   if(!userId){
      console.log("userId params not send with request");
      return res.sendStatus(400)
   }
 
   let isChat=await Chat.find({
      isGroupChat:false,
      $and :[
         {users:{$elemMatch : { $eq: req.user._id}}},
         {users:{$elemMatch : {$eq : userId }}}
      ],
   }).populate('users','-password').populate('latestMessage');

   isChat=await User.populate(isChat,{
      path:'latestMessage.sender',
      select:"name pic email"
   })

   if(isChat.length > 0){
     
      res.send(isChat[0])
   }
   else{
      var chatData={
         chatName:"sender",
         isGroupChat:false,
         users:[req.user._id,userId],
      }

      try {
         const createChat=await Chat.create(chatData);
         const fullChat=await Chat.findOne({_id:createChat._id}).populate('users','-password');
         res.status(200).send(fullChat);


      } catch (error) {
         res.status(400)
         throw new Error(error.message);
      }
   }

})

const fetchChats=asyncHandler(async(req,res)=>{
   try {
         await Chat.find(
         {users : {$elemMatch :{$eq:req.user._id}}})
         .populate("users","-password")
         .populate("groupAdmin","-password")
         .populate("latestMessage")
         .sort({updateAt:-1})
         .then(async(result)=>{
            result=await User.populate(result,{
            path:'latestMessage.sender',
            select:"name pic email"
          })
        
          res.status(200).send(result);
         })

   } catch (error) {
      res.status(400);
      throw new Error(error.message);
   } 
})

const createGroupChat=asyncHandler(async(req,res)=>{
         if(!req.body.users || !req.body.name){
            return res.status(400).send({message:"please fill the all fields"})
         }
      
        let users = req.body.users; // Directly access the users array
        if (!Array.isArray(users)) {
         return res.status(400).send("Invalid input: users must be an array");
      }


if (users.length < 2) {
  return res.status(400).send("More than 2 users are required to form a group chat");
}

   users.push(req.user._id); 
         
      try {
      const createGroup=await Chat.create({
         chatName:req.body.name,
         users:users,
         isGroupChat:true,
         groupAdmin:req.user,
      })

      const fullGroupChat=await Chat.findOne({_id:createGroup._id})
      .populate("users","-password")
      .populate("groupAdmin","-password");

      return res.status(200).send(fullGroupChat);
    } catch (error) {
      res.status(400)
      throw new error(error.message);
    }
      
})

const renameGroup=asyncHandler(async(req,res)=>{
   const {chatId,chatName}=req.body;

   if(!chatId || !chatName){
      res.status(401).send("chatid and chatname require");
   }

   const updataChat=await Chat.findByIdAndUpdate(
      chatId
   ,{
      chatName
   },{
      new:true
   })
   .populate("users","-password")
   .populate("groupAdmin","-password");

   if(!updataChat){
      res.status(400).send("name is not updated");
      throw new Error("chat not found");
   }
   else{
      res.status(200).json(updataChat); 
   }
})

const addToGroup=asyncHandler(async(req,res)=>{
   const {chatId ,userIds }=req.body;
   
  
   const added=await Chat.findByIdAndUpdate(
      chatId,
      {
         $push:{users:{$each : userIds}},
      },
      {new:true},
   ).populate("users","-password").populate("groupAdmin","-password");
   
   if(!added){
      res.status(400)
      throw new Error("chat not found")
   }
   else{
      res.json(added);
   }
})

const removeToGroup=asyncHandler(async(req,res)=>{
   const {chatId ,userId }=req.body;
   const removed=await Chat.findByIdAndUpdate(
      chatId,
      {
         $pull:{users:userId},
      },
      {new:true},
   ).populate("users","-password").populate("groupAdmin","-password");
   
   if(!removed){
      res.status(400)
      throw new Error("chat not found")
   }
   else{
      res.json(removed);
   }
})

const deleteUserChat=asyncHandler(async(req,res)=>{
   const chatId=req.params.id;

   const deleterChat=await Chat.findByIdAndDelete(chatId);
   
   if(!deleterChat){
      res.status(400).json({message:"faild to delete chat"});
      return;
   }

   res.status(200).json({message:"user chat deleted successfully"});
})
export {
   accessChat,
   fetchChats,
   createGroupChat,
   renameGroup,
   addToGroup,
   removeToGroup,
   deleteUserChat
 };