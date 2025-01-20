import { Router } from "express";
import { alluser } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const chatroute=Router();
chatroute.route("/").get(protect, fetchChats);
// chatroute.route('/').post(protect,accessChat);
// chatroute.route('/group').post(protect,createGroupChat);
// chatroute.route('/rename').put(protect,renameGroup);
// chatroute.route('/groupremove').put(protect,removeFromGroup);
// chatroute.route('/groupadd').put(protect,groupToGroup);


export default chatroute