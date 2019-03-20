const User = require("../models/User");
const UserSession = require("../models/UserSession");
const Message = require("../models/Message");

module.exports = {
	getUser(req, res) {
		// get user token
		const { token } = req.query;

		// Verify token
		UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: "Error finding user session"
				});
			}

			// Check if token
			if (sessions.length != 1) {
				return res.send({
					success: false,
					message: "Couldn't find user"
				});
			} else {
				User.find({ _id: sessions[0].userId }, (err, users) => {
					// classic error checking
					if (err) {
						return res.send({
							success: false,
							message: "Couldn't find user"
						});
					}

					// check if there is a user
					if (users.length != 1) {
						return res.send({
							success: false,
							message: "User not found"
						});
					}

					// send user
					const user = users[0];
					const payload = {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						chatroom: user.currentChatRoomId
					};

					// Verify user hasn't been deleted
					if (user.isDeleted) {
						return res.send({
							success: false,
							message: "User is deleted, how did you get here??"
						});
					}

					return res.send({
						success: true,
						message: "the user has been found",
						payload
					});
				});
			}
		});
	}
};
