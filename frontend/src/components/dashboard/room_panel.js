import React, { Component } from "react";

export default class RoomPanel extends Component {
	render() {
		const { roomArr } = this.props;

		return (
			<div className="room-holder">
				{roomArr.map(room => {
					return (
						<div className="room" key={room._id}>
							<input
								type="text"
								value={room.chatroomName}
								readOnly
							/>
							<div className="action-btns">
								<button
									onClick={() => {
										this.props.handleDelete(room._id);
									}}
									className="btnDelete">
									Delete
								</button>
								<button
									onClick={() => {
										this.props.handleSelect(room._id);
									}}
									className="btnJoin">
									Join
								</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
