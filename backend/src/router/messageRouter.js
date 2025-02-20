import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { sendMessage,allMessage } from "../controller/message.controller.js";

const messageRouter=express.Router()


messageRouter.route('/').post(protect,sendMessage);
messageRouter.route('/:chatId').get(protect,allMessage);
export default messageRouter;