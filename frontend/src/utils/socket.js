import openSocket from "socket.io-client";
const socket = openSocket("/"); // production
// const socket = openSocket("http://localhost:8080"); // development

const sendMessage = data => {
	socket.emit("sentMessage", data);
};

const userConnected = user => {
	socket.emit("userConnected", user);
};

const userDisconnected = user => {
	socket.emit("userDisconnected", user);
};

const receivingSocketEvents = () => {
	return new Promise((resolve, reject) => {
		socket.on("newMessage", data => {
			resolve({ type: "newMessage", data });
		});
		socket.on("newConnection", user => {
			resolve({ type: "userConnected", user });
		});
		socket.on("userDisconnected", user => {
			resolve({ type: "userDisconnected", user });
		});
	});
};

export { sendMessage, userConnected, userDisconnected, receivingSocketEvents };
