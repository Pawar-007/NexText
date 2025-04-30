import mongoose from "mongoose";

const requestSchema=mongoose.Schema({
      sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
      chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
      requestCount:{type:Number,default:0},
      lastRequestDate: { type: Date, default: Date.now } 
    },
    {
      timestamps: true
    }
)

const Request = mongoose.model("Request",requestSchema);
 
export default Request;