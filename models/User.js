const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	email: {
		type: String,
		default: ""
	},
	password: {
		type: String,
		default: ""
	},
	currentChatRoomId: {
		type: String,
		default: "5c8179cf5b2316123954c7c9"
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

UserSchema.methods.generateHash = function(string) {
	return bcrypt.hashSync(string, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
