import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { sendMessage,allMessage } from "../controller/message.controller.js";
import { createNotification,getNotifications } from "../controller/notification.controller.js";
import { markMessagesAsDelivered } from "../controller/message.controller.js";
const messageRouter=express.Router()


messageRouter.route('/').post(protect,sendMessage);
messageRouter.route('/:chatId').get(protect,allMessage);
messageRouter.route('/notification').post(protect,createNotification);
messageRouter.route('/getNotification').get(protect,getNotifications);
messageRouter.route('/delivered').put(protect, markMessagesAsDelivered);
export default messageRouter;