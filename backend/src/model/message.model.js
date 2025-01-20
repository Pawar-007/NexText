import mongoose from "mongoose";
import { Schema } from "mongoose";
const messageModel=mongoose.Schema({
    sender:{type:Schema.Types.ObjectId,ref:"User"},
    chat:{type:Schema.Types.ObjectId,ref:"Chat"},
    content:{type:String,trim:true}
},{
   timeStamps:true,
})

const Message=mongoose.model("Message",messageModel);

export default Message;
