import React, { Component } from "react";
import { logout } from "../../utils/userAuth";
import { getUser, getMessages } from "../../utils/userData";
import { getChatroom, selectChatroom } from "../../utils/chatroom";
import {
	sendMessage,
	userConnected,
	userDisconnected,
	receivingSocketEvents
} from "../../utils/socket";
import "../../styles/dashboard.css";

import UserPanel from "./userPanel";
import ChatRooms from "./chatrooms";
import MessageBoard from "./messageBoard";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			userData: {},
			senderData: {},
			errorMessage: "",
			currentRoom: "Loading...",
			currentRoomID: ""
		};

		this.handleSend = this.handleSend.bind(this);
		this.socketReceiver = this.socketReceiver.bind(this);
		this.handleChatroomChange = this.handleChatroomChange.bind(this);
	}

	componentDidMount() {
		const _this = this;
		getUser(this.props.loginToken).then(res => {
			const receivedPayload = res.payload.data.payload;

			if (!res.success) {
				this.setState({
					errorMessage: "Error grabbing user data"
				});
			}

			getChatroom(receivedPayload.chatroom).then(res => {
				if (!res.payload.data.success) {
					this.setState({
						errorMessage: "Error grabbing messages",
						userData: receivedPayload
					});
				}
				const cdata = res.payload.data.payload;

				if (typeof res.payload.data.roomDeleted !== 'undefined' && res.payload.data.roomDeleted) {
					selectChatroom(cdata._id, receivedPayload.email).then(res => {
						if (!res.data.success) {
							this.setState({
								errorMessage: "Error grabbing messages",
								userData: receivedPayload,
								currentRoomID: cdata._id,
								currentRoom: cdata.chatroomName
							});
						}

						_this.handleChatroomChange(cdata._id, cdata.chatroomName);
					});
				} else {
					getMessages(receivedPayload.chatroom).then(res => {
						if (!res.success) {
							this.setState({
								errorMessage: "Error grabbing messages",
								userData: receivedPayload,
								currentRoomID: receivedPayload.chatroom,
								currentRoom: cdata.chatroomName
							});
						}

						const responseData = res.payload.data.payload;

						let newMessages = responseData.map(msg => {
							return {
								message: msg.message,
								timestamp: msg.timestamp,
								userInfo: msg.userInfo
							};
						});

						this.setState({
							messages: newMessages,
							errorMessage: "",
							userData: receivedPayload,
							currentRoomID: receivedPayload.chatroom,
							currentRoom: cdata.chatroomName
						});
					});
				}

				userConnected(this.state.userData);
			});
		});

		this.socketReceiver();

		window.onfocus = function() {
			const { title } = window.document;

			if (title.indexOf("New Message") !== -1) {
				window.document.title = "Lets Chat";
			}
		};
	}

	handleChatroomChange(cid, cname) {
		getMessages(cid).then(res => {
			if (!res.success) {
				this.setState({
					errorMessage: "Error grabbing messages"
				});
			}

			const responseData = res.payload.data.payload;

			let newMessages = responseData.map(msg => {
				return {
					message: msg.message,
					timestamp: msg.timestamp,
					userInfo: msg.userInfo
				};
			});

			this.setState({
				messages: newMessages,
				errorMessage: "",
				currentRoom: cname,
				currentRoomID: cid
			});
		});
	}

	handleSend(msg) {
		if (msg) {
			const msgData = {
				message: msg,
				token: this.props.loginToken,
				chatRoomId: this.state.currentRoomID,
				senderInfo: this.state.userData
			};

			// Send message
			sendMessage(msgData);

			// push message to sender's message area
			let newMessages = this.state.messages.concat({
				message: msg,
				timestamp: new Date().toString(),
				userInfo: this.state.userData
			});

			this.setState({
				messages: newMessages
			});
		}
	}

	socketReceiver() {
		const _this = this;
		receivingSocketEvents().then(res => {
			switch (res.type) {
				case "newMessage":
					let newMessages = this.state.messages.concat({
						message: res.data.message,
						timestamp: new Date().toString(),
						userInfo: res.data.senderInfo
					});
					this.setState({
						messages: newMessages
					});

					window.document.title = "Lets Chat - New Message";
					_this.socketReceiver();
					break;
				case "userConnected":
					// console.log(res);
					_this.socketReceiver();
					break;
				case "userDisconnected":
					// console.log(res);
					_this.socketReceiver();
					break;
				default:
					window.document.title = "Lets Chat";
					break;
			}
		});
	}

	render() {
		const { userData, errorMessage, messages } = this.state;

		return (
			<div className="dashboard">
				<div
					className="left-panel panel"
					onClick={() => {
						document.querySelector(
							".chatRoom .errorMsg"
						).innerText = "";
						document.querySelector(
							"input.txtCreate"
						).style.display = "none";
					}}>
					<div className="user-info">
						<UserPanel data={userData} />

						<h2 className="dashboard-error-message">
							{errorMessage}
						</h2>
					</div>
					<div className="chatRoom">
						<ChatRooms
							data={userData}
							chatroomChange={this.handleChatroomChange}
						/>
					</div>
					<button
						className="btn-logout"
						onClick={() => {
							/* eslint-disable */
							const logoutCheck = confirm(
								"Are you sure you want to logout?"
							);
							/* eslint-enable */
							if (logoutCheck) {
								this.props.removeToken();
								userDisconnected(this.state.userData);
								logout(this.props.loginToken);
							}
						}}>
						Logout
					</button>
				</div>
				<div className="right-panel panel">
					<div className="panelHeader" />
					<div className="messageBoard">
						<MessageBoard
							messages={messages}
							userData={userData}
							handleSend={this.handleSend}
							currentRoom={this.state.currentRoom}
						/>
					</div>
				</div>
			</div>
		);
	}
}
