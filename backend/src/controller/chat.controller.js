import User from "../model/user.model";
import { asyncHandler } from "../utils/async-handler";

const fetchChats=asyncHandler(async(req,res)=>{
   const {userId}=req.body;
   if(!userId){
      console.log("userId params not send with request");
      return res.sendStatus(400)
   }

   const isChat=await User.find({
      isGroupChat:false,
      $and:[
         {users : {$elemMatch : {$eq : req.user._id}}},
         {users : {$elemMatch : {$eq:userId }}}
      ]
   }).populate('users','password').populate('latest')
})