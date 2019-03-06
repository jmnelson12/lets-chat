const User = require("../models/User");
const Chatroom = require("../models/Chatroom");

module.exports = {
	createChatroom(req, res) {
		// POST
		const { chatroomName, email } = req.body;

		if (!chatroomName) {
			return res.send({
				success: false,
				message: "Chatroom Name not recieved"
			});
		}

		// Grab user
		User.find({ email: email }, (err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server error"
				});
			}

			console.log(user);

			// check if chatroom exists - use name
			// Chatroom.find({ chatroomName: chatroomName }, (err, chatrooms) => {
			// 	if (err) {
			// 		return res.send({
			// 			success: false,
			// 			message: "Server Error"
			// 		});
			// 	} else if (chatrooms.length > 0) {
			// 		return res.send({
			// 			success: false,
			// 			message: "Chatroom already exists"
			// 		});
			// 	}

			// 	if (chatroomName.length < 4 || chatroomName.length > 25) {
			// 		return res.send({
			// 			success: false,
			// 			message: "Chatroom name length must be between 4 and 25"
			// 		});
			// 	}

			// 	// create chatroom
			// 	const newChatroom = new Chatroom({});
			// });
		});
	},
	removeChatroom(req, res) {
		// DELETE
		const { cName, user } = req.body;
		// check if chatroom exists - by name
		// check if person trying to remove the chatroom is the creator
		// remove chatroom
	},
	updateChatroom(req, res) {
		// PUT
		const { cName } = req.body;
		// check if chatroom exists - by name
		// update chatroom
	},
	getChatrooms(req, res) {
		// GET
		console.log("called");
		return res.send({
			message: "working"
		});
		// const { cName } = req.body;
		// check if chatroom exists - by name
		// return chatroom data
	}
};
