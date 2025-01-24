import { Router } from "express";
import { alluser } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { accessChat, fetchChats,createGroupChat,renameGroup,addToGroup,removeToGroup } from "../controller/chat.controller.js";

const chatroute=Router();
chatroute.route("/").post(protect, accessChat);
chatroute.route('/').get(protect,fetchChats);
chatroute.route('/group').post(protect,createGroupChat);
chatroute.route('/rename').put(protect,renameGroup);
chatroute.route('/addIngroup').put(protect,addToGroup);
chatroute.route('/groupremove').put(protect,removeToGroup);
// chatroute.route('/groupadd').put(protect,groupToGroup);


export default chatroute