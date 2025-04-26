import { Router } from "express";
import { 
   registerUser,
   login,
   alluser,
   guestLogin
 } from "../controller/user.controller.js";
import { uplode } from "../middleware/multer.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
const userRouter=Router();

userRouter.route('/').post(
   uplode.fields([
      { 
      name:"picture", 
      maxCount:1  
   }
   ]),
   registerUser)
// userRouter.route('/').post(registerUser);
userRouter.route("/").get(protect ,alluser);
userRouter.route('/guestUser').post(guestLogin); 
userRouter.route('/login').post(login);
userRouter.route('/chats')
export default userRouter;