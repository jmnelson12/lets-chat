const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
	userInfo: {
		firstName: {
			type: String,
			default: ""
		},
		lastName: {
			type: String,
			default: ""
		}
	},
	chatRoomId: {
		type: String,
		default: ""
	},
	timestamp: {
		type: Date,
		default: Date.now()
	},
	message: {
		type: String,
		default: ""
	}
});

module.exports = mongoose.model("UserMessage", MessageSchema);
