import React, { Component } from "react";
import {
	createChatroom,
	getChatrooms,
	getChatroom,
	selectChatroom,
	deleteChatroom
} from "../../utils/chatroom";

import RoomPanel from "./room_panel";

export default class ChatRooms extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "",
			isLoading: true,
			chatrooms: [],
			newChatroomName: ""
		};

		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	componentDidMount() {
		getChatrooms().then(res => {
			if (!res.success) {
				this.setState({
					isLoading: false,
					message: "Unable to grab chatrooms"
				});
			}

			const leRooms = res.payload.data.payload;

			if (!leRooms) {
				this.setState({
					isLoading: false,
					message: "Unable to grab chatrooms"
				});
			}

			this.setState({
				isLoading: false,
				chatrooms: leRooms
			});
		});
	}

	handleSelect(cid) {
		const { email } = this.props.data;

		if (email) {
			selectChatroom(cid, email).then(res => {
				if (!res.data.success) {
					document.querySelector('.chatRoom .errorMsg').innerText = res.data.message;
				} else {
					document.querySelector('.chatRoom .errorMsg').innerText = "";
					getChatroom(cid).then(res => {
						if (res.success) {
							const data = res.payload.data.payload;
							this.props.chatroomChange(data._id, data.chatroomName);
						} else {
							document.querySelector('.chatRoom .errorMsg').innerText = res.message;
						}
					})
				}
			});
		}
	}
	handleDelete(cid) {
		const { email } = this.props.data;
		if (email) {
			let oldRooms = this.state.chatrooms;
			let newRooms = oldRooms.filter(
				room => room._id !== cid
			);

			deleteChatroom(cid, email).then(res => {
				if (!res.data.success) {
					document.querySelector('.chatRoom .errorMsg').innerText = res.data.message;
				} else {
					document.querySelector('.chatRoom .errorMsg').innerText = "";
					this.setState({
						chatrooms: newRooms
					});
				}
			});
		}
	}
	handleCreate() {
		const { email } = this.props.data;
		createChatroom(this.state.newChatroomName, email).then(res => {
			if (!res.data.success) {
				document.querySelector('.chatRoom .errorMsg').innerText = res.data.message;
			} else {
				this.setState({
					chatrooms: [...this.state.chatrooms, res.data.payload],
					newChatroomName: ""
				})
				document.querySelector('.chatRoom .errorMsg').innerText = "";
				document.querySelector(
					"input.txtCreate"
				).style.display = "none";
			}
		})
	}

	render() {
		const { isLoading, message, newChatroomName } = this.state;

		if (isLoading || this.props.data === {}) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<h1>ChatRooms</h1>
				<button
					className="btnCreate"
					onClick={e => {
						e.stopPropagation();
						document.querySelector(
							"input.txtCreate"
						).style.display = "block";
					}}>
					Create Chatroom
				</button>
				<input
					type="text"
					className="txtCreate"
					onChange={e => {
						this.setState({
							newChatroomName: e.target.value
						});
					}}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							this.handleCreate();
						}
					}}
					onClick={e => {
						e.stopPropagation();
					}}
					value={newChatroomName}
					placeholder={"Enter Chatroom Name..."}
				/>

				<div className="errorMsg">{message}</div>
				<RoomPanel
					roomArr={this.state.chatrooms}
					handleDelete={this.handleDelete}
					handleSelect={this.handleSelect}
				/>
			</div>
		);
	}
}
