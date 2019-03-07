const express = require("express");
const favicon = require("express-favicon");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const isDev = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 8080;
const db =
	isDev === "dev"
		? require("./config/devURI").MONGO_URI_DEV
		: require("./config/prodURI").MONGO_URI_PROD;

// APi Routing
const userAuthRoutes = require("./routes/auth/userAuthRoutes");
const userDataRoutes = require("./routes/data/userDataRoutes");
const chatroomRoutes = require("./routes/data/chatroomRouter");

// Socket Controller
const socketCont = require("./controllers/socket.controller");

// Favicon
app.use(favicon(__dirname + "/frontend/build/favicon.ico"));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api usage
app.use("/user", userAuthRoutes);
app.use("/user", userDataRoutes);
app.use("/chatroom", chatroomRoutes);

// socket io
io.on("connection", client => {
	// Send Message
	client.on("sentMessage", data => {
		socketCont.newMessage(client, data);
	});

	// Error
	client.on("error", err => {
		socketCont.error(err);
	});

	// Connected
	client.on("userConnected", user => {
		socketCont.connected(client, user);
	});

	// Disconnected
	client.on("userDisconnected", user => {
		socketCont.disconnected(client, user);
	});
});

// connect to mlab
mongoose
	.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log("Mongodb Connected..."))
	.catch(err => console.error(err));

// If production
if (isDev !== "dev") {
	app.use(express.static(__dirname));
	app.use(express.static(path.join(__dirname, "frontend", "build")));

	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});

	// Redirect to https
	// app.configure("production", () => {
	// 	app.use((req, res, next) => {
	// 		if (req.header("x-forwarded-proto") !== "https")
	// 			res.redirect(`https://${req.header("host")}${req.url}`);
	// 		else next();
	// 	});
	// });
}

// Start Express Server
server.listen(port, () => console.log(`Server started on port ${port}`));
