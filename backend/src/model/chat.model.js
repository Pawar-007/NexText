import mongoose, { Mongoose } from 'mongoose';

const chatModel=mongoose.Schema({
   chatName:{type:String,trim:true},
   isGroupChat:{type:Boolean,default:true},
   users:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   }],
   latestMessage:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Message"
   },
   groupAdmin:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   }  
},
{
   timeStamps:true
}
)

const Chat=mongoose.model("Chat",chatModel);

export default Chat;
