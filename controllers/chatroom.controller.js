const User = require("../models/User");
const Chatroom = require("../models/Chatroom");

module.exports = {
	createChatroom(req, res) {
		// POST
		let { chatroomName, email } = req.body;

		if (!chatroomName) {
			return res.send({
				success: false,
				message: "Chatroom Name not recieved"
			});
		}

		// standardize so we dont have -> General and general
		chatroomName = chatroomName.toLowerCase();

		// Grab user
		User.find({ email: email }, (err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server error"
				});
			}

			if (user.length === 0 || !user) {
				return res.send({
					success: false,
					message: "User Not Found"
				});
			}

			const { _id } = user[0];

			// check if chatroom exists - use name
			Chatroom.find({ chatroomName }, (err, chatrooms) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server Error"
					});
				} else if (chatrooms.length > 0) {
					return res.send({
						success: false,
						message: "Chatroom already exists"
					});
				}

				if (chatroomName.length < 4 || chatroomName.length > 25) {
					return res.send({
						success: false,
						message:
							"Chatroom name length must be between 4 and 25 characters"
					});
				}

				// create chatroom
				const newChatroom = new Chatroom({
					creatorId: _id,
					chatroomName
				});

				newChatroom.save((err, room) => {
					if (err) {
						return res.send({
							success: false,
							message: "Server error"
						});
					}
					res.send({
						success: true,
						message: "Successfully created"
					});
				});
			});
		});
	},
	removeChatroom(req, res) {
		// DELETE
		let { cid, userEmail } = req.body;

		if (!cid) {
			return res.send({
				success: false,
				message: "Please provide a chatroom id"
			});
		}

		if (!userEmail) {
			return res.send({
				success: false,
				message: "Please provide a email"
			});
		}

		User.findOne({ email: userEmail }, (err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server Error"
				});
			}

			if (!user) {
				return res.send({
					success: false,
					message: "User Not Found"
				});
			}

			const userId = user._id;

			// check if chatroom exists - by id
			Chatroom.findOneAndDelete({ _id: cid, creatorId: userId }, (err, room) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server Error"
					});
				}

				if (!room) {
					return res.send({
						success: false,
						message: "Chatroom not found. Note: only the creator of the chatroom can remove it"
					});
				}

				return res.send({
					success: true,
					message: "Chatroom Deleted"
				});
			});
		});
	},
	updateChatroom(req, res) {
		// PUT
		let { cid, newChatroomName } = req.body;

		if (!cid) {
			return res.send({
				success: false,
				message: "Please provide the chatroom id"
			});
		}

		if (
			!newChatroomName ||
			(newChatroomName.length < 4 || newChatroomName.length > 25)
		) {
			return res.send({
				success: false,
				message:
					"Chatroom Name length must be between 4 and 25 characters"
			});
		}

		newChatroomName = newChatroomName.toLowerCase();

		// check if chatroom exists - by name
		Chatroom.findOneAndUpdate(
			{ _id: cid },
			{ $set: { chatroomName: newChatroomName } },
			(err, room) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server Error"
					});
				}

				return res.send({
					success: true,
					message: "Success!"
				});
			}
		);
	},
	getChatrooms(req, res) {
		// GET
		Chatroom.find({}, (err, crooms) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server Error"
				});
			}

			if (!crooms) {
				return res.send({
					success: false,
					message: "Chatrooms not found"
				});
			}

			let chatroomArr = crooms.map(cm => {
				return {
					_id: cm._id,
					chatroomName: cm.chatroomName
				};
			});

			// return chatroom data
			return res.send({
				success: true,
				payload: chatroomArr
			});
		});
	},
	getChatroom(req, res) {
		// GET
		const { cid } = req.body;

		if (!cid) {
			return res.send({
				success: false,
				message: "Please provide a chatroom id"
			});
		}

		Chatroom.findOne({ _id: cid }, (err, room) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server Error"
				});
			}

			if (!room) {
				return res.send({
					success: false,
					message: "Chatroom Not Found"
				});
			}

			return res.send({
				success: true,
				payload: {
					_id: room._id,
					chatroomName: room.chatroomName
				}
			});
		});
	}
};
