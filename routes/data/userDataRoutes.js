const express = require("express");
const router = express.Router();
const userMainCtrl = require("../../controllers/userMain.controller");
const messageCtrl = require("../../controllers/message.controller");

// User data routes
router.route(`/getUser`).get(userMainCtrl.getUser);
router.route('/getMessages').get(messageCtrl.getMessages);

module.exports = router;
