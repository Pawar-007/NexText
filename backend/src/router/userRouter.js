import { Router } from "express";
import { 
   registerUser,
   login,
   alluser
 } from "../controller/user.controller.js";
import { uplode } from "../middleware/multer.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
const userRouter=Router();

userRouter.route('/').post(
   uplode.fields([
      { 
      name:"picture", 
      maxcount:1  
   }
   ]),
   registerUser)
userRouter.route("/").get(protect ,alluser);

userRouter.route('/login').post(login);
userRouter.route('/chats')
export default userRouter;