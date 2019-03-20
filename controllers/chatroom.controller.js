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
						message: "Successfully created",
						payload: { _id: room._id, chatroomName: room.chatroomName}
					});
				});
			});
		});
	},
	removeChatroom(req, res) {
		// DELETE
		let { cid, userEmail } = req.query;

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
		const { cid } = req.query;

		if (!cid) {
			return res.send({
				success: false,
				message: "Please provide a chatroom id"
			});
		}

		Chatroom.find({}, (err, rooms) => {
			if (err || rooms === []) {
				return res.send({
					success: false,
					message: "Chatroom Not Found"
				});
			}

			// loop over chatrooms returning one if cid matches a room id
			let roomToSend = rooms.filter(room => {
				return cid === room._id.toString();
			});

			if (roomToSend.length !== 0) {

				return res.send({
					success: true,
					message: "success",
					payload: {
						_id: roomToSend[0]._id,
						chatroomName: roomToSend[0].chatroomName
					}
				});
			}

			// if no matches return first chatroom in list
			return res.send({
				success: true,
				message: "success",
				payload: {
					_id: rooms[0]._id,
					chatroomName: rooms[0].chatroomName
				},
				roomDeleted: true
			});
		})
	},
	selectChatroom(req, res) {
		let { cid, userEmail } = req.query;

		if (!cid) {
			return res.send({
				success: false,
				message: "Chatroom not found"
			});
		}

		if (!userEmail) {
			return res.send({
				success: false,
				message: "Email not found"
			});
		}

		User.findOneAndUpdate({ email: userEmail }, { $set: { currentChatRoomId: cid}}, (err, doc) => {
			if (err) {
				return res.send({
					success: false,
					message: "Server Error"
				});
			}

			return res.send({
				success: true,
				message: "success",
				payload: doc.currentChatRoomId
			});
		})
	}
};
