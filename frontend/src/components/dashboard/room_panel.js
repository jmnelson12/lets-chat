import React, { Component } from "react";
import { deleteChatroom, updateChatroom } from "../../utils/chatroom";

export default class RoomPanel extends Component {
	constructor(props) {
		super(props);

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleMouseOver(e) {
		e.stopPropagation();
		if (typeof e.target.children[1] !== "undefined")
			e.target.children[1].style.display = "flex";
	}
	handleMouseLeave(e) {
		e.stopPropagation();
		if (typeof e.target.children[1] !== "undefined")
			e.target.children[1].style.display = "none";
	}

	handleSelect() {}
	handleDelete(cid) {
		if (this.props.userEmail) {
			deleteChatroom(cid, this.props.userEmail).then(res => {
				console.log(res);
			});
		}
	}
	handleEdit(cid) {
		console.log("oi");
	}

	render() {
		const { roomArr } = this.props;
		return (
			<div className="room-holder">
				{roomArr.map(room => {
					return (
						<div
							className="room"
							onMouseOver={this.handleMouseOver}
							onMouseLeave={this.handleMouseLeave}
							onClick={this.handleSelect}
							key={room._id}>
							<input
								type="text"
								value={room.chatroomName}
								readOnly
							/>
							<div className="action-btns">
								<button
									onClick={() => {this.handleDelete(room._id)}}
									className="btnDelete">
									Delete
								</button>
								<button
									onClick={() => {this.handleEdit(room._id)}}
									className="btnEdit">
									Edit
								</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
