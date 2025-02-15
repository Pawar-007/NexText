import { asyncHandler } from "../utils/async-handler.js";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';

const protect=asyncHandler(async (req,res,next)=>{
   console.log("auth body ",req.headers);
   let token;
   if(req.headers.authorization && 
      req.headers.authorization.startsWith("Bearer")
   ){
      try { 
         token=req.headers.authorization.split(" ")[1];
         
         const decode= jwt.verify(token,process.env.JWT_SECRET);
         console.log("auth body ",token);
         req.user=await User.findById(decode.id).select("-password");

         next();

      } catch (error) {
         res.status(401).json({"message":"no authorized,token faild"})
         throw new Error("no authorized,token faild");
      }
   }

   if(!token){
      res.status(401).json({"message":"no authorized,not token"})
      throw new Error("not authorized,no token");
   }
})

export {protect};