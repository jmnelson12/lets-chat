const User = require("../models/User");
const UserSession = require("../models/UserSession");
const Message = require("../models/Message");

module.exports = {
	saveMessage(leData) {
		const { token, message, chatRoomId } = leData;

		return new Promise((resolve, reject) => {
			if (!token) {
				resolve({
					success: false,
					message:
						"No token given - message.controller -- saveMessage"
				});
			}

			// verify user logged in and user
			UserSession.find(
				{ _id: token, isDeleted: false },
				(err, sessions) => {
					if (err) {
						resolve({
							success: false,
							message:
								"Error finding user session - message.controller -- saveMessage"
						});
					}

					if (sessions.length != 1) {
						resolve({
							success: false,
							message:
								"Couldn't find user - message.controller -- sendMessage"
						});
					} else {
						User.find({ _id: sessions[0].userId }, (err, users) => {
							// classic error checking
							if (err) {
								resolve({
									success: false,
									message:
										"Couldn't find user - message.controller -- sendMessage"
								});
							}

							// check if there is a user
							if (users.length != 1) {
								resolve({
									success: false,
									message:
										"User not found - message.controller -- sendMessage"
								});
							}

							// Verify user hasn't been deleted
							if (users.isDeleted) {
								resolve({
									success: false,
									message:
										"User is deleted, how did you get here??"
								});
							}

							// create and save message
							const newMessage = new Message();
							newMessage.userInfo = {
								firstName: users[0].firstName,
								lastName: users[0].lastName
							};
							newMessage.chatRoomId = chatRoomId || 0;
							newMessage.message = message;

							newMessage.save((err, msg) => {
								if (err) {
									resolve({
										success: false,
										message: "Server error: 01412dca3"
									});
								}
								resolve({
									success: true,
									message: "Saved message"
								});
							});
						});
					}
				}
			);
		});
	},
	getMessages(req, res) {
		const { cid } = req.query;
		// get messages for correct chatroom
		Message.find({ chatRoomId: cid }, (err, msgData) => {
			// verify user is in chatroom
			if (err) {
				return res.send({
					success: false,
					message: "Error - message.controller.js -- getMessages"
				});
			}

			if (msgData !== []) {
				let newDataArr = msgData.map(msg => {
					return {
						timestamp: msg.timestamp,
						message: msg.message,
						userInfo: msg.userInfo
					};
				});

				return res.send({
					success: true,
					message: "success",
					payload: newDataArr
				});
			}
		});
	}
};
