const express = require("express");
const router = express.Router();
const chatroomCtrl = require("../../controllers/chatroom.controller");

// chatroom routes
router.route(`/createChatroom`).post(chatroomCtrl.createChatroom);
router.route(`/removeChatroom`).delete(chatroomCtrl.removeChatroom);
router.route(`/updateChatroom`).put(chatroomCtrl.updateChatroom);
router.route(`/getChatrooms`).get(chatroomCtrl.getChatrooms);

router.route(`/test`).get((req, res) => {
    return res.send({
        message: "worked"
    })
})

module.exports = router;
