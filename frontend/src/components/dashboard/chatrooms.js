import React, { Component } from "react";
import {
	createChatroom,
	getChatrooms,
	getChatroom
} from "../../utils/chatroom";

import RoomPanel from "./room_panel";

export default class ChatRooms extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "",
			isLoading: true,
			chatrooms: []
		}
	}

	componentDidMount() {
		getChatrooms().then(res => {
			if (!res.success) {
				this.setState({
					isLoading: false,
					message: "Unable to grab chatrooms"
				})
			}

			const leRooms = res.payload.data.payload;

			if (!leRooms) {
				this.setState({
					isLoading: false,
					message: "Unable to grab chatrooms"
				})
			}

			this.setState({
				isLoading: false,
				chatrooms: leRooms
			});
		});
	}

	render() {
		const { isLoading, message } = this.state;

		if (isLoading || this.props.data === {}) {
			return (<div>Loading...</div> )
		}

		return (
			<div>
				<h1>ChatRooms</h1>
				<div className="errorMsg">{message}</div>
				<RoomPanel roomArr={this.state.chatrooms} userEmail={this.props.data.email} />
			</div>
		);
	}
}
