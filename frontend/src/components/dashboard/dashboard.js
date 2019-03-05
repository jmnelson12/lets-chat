import React, { Component } from "react";
import { logout } from "../../utils/userAuth";
import { getUser, getMessages } from "../../utils/userData";
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

const GENERAL_CHAT_ID = "12345";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			userData: {},
			senderData: {},
			errorMessage: ""
		};

		this.handleSend = this.handleSend.bind(this);
		this.socketReceiver = this.socketReceiver.bind(this);
	}

	componentDidMount() {
		getUser(this.props.loginToken).then(res => {
			const receivedPayload = res.payload.data.payload;

			if (!res.success) {
				this.setState({
					errorMessage: "Error grabbing user data"
				});
			}

			getMessages(GENERAL_CHAT_ID).then(res => {
				if (!res.success) {
					this.setState({
						errorMessage: "Error grabbing messages",
						userData: receivedPayload
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
					userData: receivedPayload
				});
			});

			userConnected(this.state.userData);
		});

		this.socketReceiver();

		window.onfocus = function() {
			const { title } = window.document;

			if (title.indexOf("New Message") !== -1) {
				window.document.title = "Lets Chat";
			}
		};
	}

	handleSend(msg) {
		if (msg) {
			const msgData = {
				message: msg,
				token: this.props.loginToken,
				chatRoomId: "12345",
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
						userInfo: res.data.senderInfo
					});
					this.setState({
						messages: newMessages
					});

					window.document.title = "Lets Chat - New Message";
					_this.socketReceiver();
					break;
				case "userConnected":
					console.log(res);
					_this.socketReceiver();
					break;
				case "userDisconnected":
					console.log(res);
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
				<div className="left-panel panel">
					<div className="user-info">
						<UserPanel data={userData} />

						<h2 className="dashboard-error-message">
							{errorMessage}
						</h2>
					</div>
					<div className="chatRoom">
						<ChatRooms />
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
						/>
					</div>
				</div>
			</div>
		);
	}
}
