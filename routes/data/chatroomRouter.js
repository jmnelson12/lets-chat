const express = require("express");
const router = express.Router();
const chatroomCtrl = require("../../controllers/chatroom.controller");

// chatroom routes
router.route(`/create`).post(chatroomCtrl.createChatroom);
router.route(`/delete`).delete(chatroomCtrl.removeChatroom);
router.route(`/getAll`).get(chatroomCtrl.getChatrooms);
router.route(`/getOne`).get(chatroomCtrl.getChatroom);
router.route(`/select`).get(chatroomCtrl.selectChatroom);

module.exports = router;
