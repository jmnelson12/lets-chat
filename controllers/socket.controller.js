const userMainCtrl = require("./message.controller");

module.exports = {
	newMessage(client, data) {
		userMainCtrl.saveMessage(data).then(res => {
			if (res.success) {
				client.broadcast.emit("newMessage", data);
			}
		});
	},
	error(err, client = null) {
		console.log("An Error Occured: ", err);
	},
	connected(client, data) {
		client.broadcast.emit("newConnection", data);
	},
	disconnected(client, user) {
		client.broadcast.emit("userDisconnected", user);
		client.disconnect(true);
	}
};
