const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
	creatorId: {
		type: String,
		default: ""
	},
	chatroomName: {
		type: String,
		default: ""
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("Chatroom", ChatroomSchema);
