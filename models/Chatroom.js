const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
	isDeleted: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("Chatroom", ChatroomSchema);
