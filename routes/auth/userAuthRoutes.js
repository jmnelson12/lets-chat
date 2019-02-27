const express = require("express");
const router = express.Router();
const userAuthCtrl = require("../../controllers/userAuth.controller");

// User Auth
router.route(`/signup`).post(userAuthCtrl.signUp);
router.route(`/login`).post(userAuthCtrl.login);
router.route(`/verify`).get(userAuthCtrl.verify);
router.route(`/logout`).get(userAuthCtrl.logout);

module.exports = router;
