import React, { Component } from "react";

export default class MessageBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newMessage: "",
			currentRoom: "General"
		};
	}

	render() {
		const { currentRoom } = this.state;
		const { messages, userData } = this.props;

		return (
			<div>
				<div className="message-room">{currentRoom}</div>
				<div className="messages inset-shadow">
					{messages.map((data, i) => {
						return (
							<div className="message" key={i}>
								{userData === {}
									? `Anon: ${data.message}`
									: `${data.userInfo.firstName} ${
											data.userInfo.lastName
									  }: ${data.message}`}
							</div>
						);
					})}
				</div>
				<div className="message-input inset-shadow">
					<input
						type="text"
						onChange={e =>
							this.setState({
								newMessage: e.target.value
							})
						}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.props.handleSend(this.state.newMessage);
								this.setState({
									newMessage: ""
								});
							}
						}}
						value={this.state.newMessage}
						placeholder={"Enter Message..."}
					/>
					<button
						onClick={e => {
							this.props.handleSend(this.state.newMessage);
							this.setState({
								newMessage: ""
							});
						}}>
						Send
					</button>
				</div>
			</div>
		);
	}
}
