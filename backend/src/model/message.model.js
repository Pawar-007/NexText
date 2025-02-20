import mongoose from "mongoose";
import { Schema } from "mongoose";
const messageModel=new Schema({
    sender:{type:Schema.Types.ObjectId,ref:"User"},
    chat:{type:Schema.Types.ObjectId,ref:"Chat"},
    content:{type:String,trim:true,require:true}
},{ timestamps: true })

const Message=mongoose.model("Message",messageModel);

export default Message;
