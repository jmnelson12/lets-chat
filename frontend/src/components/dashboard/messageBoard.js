import React, { Component } from "react";

export default class MessageBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newMessage: "",
			menuToggled: false
		};

		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	handleMenuClick() {
		const leftPanel = document.querySelector(".left-panel");
		const menuBtn = document.querySelector(".hidden-menu-btn");
		if (leftPanel) {
			if (this.state.menuToggled) {
				// untoggle
				leftPanel.style.display = "none";

				menuBtn.style.top = "0";
				menuBtn.style.color = "var(--dark-blue)";
				menuBtn.style.position = "relative";
			} else {
				// toggle
				leftPanel.style.display = "block";

				menuBtn.style.top = "calc(-98vh)";
				menuBtn.style.color = "var(--white)";
				menuBtn.style.position = "absolute";
				menuBtn.style.right = "10px";
			}

			this.setState({
				menuToggled: !this.state.menuToggled
			});
		}
	}

	formatDate(datestring) {
		let hours = datestring.getHours();
		let minutes = datestring.getMinutes();
		let day = datestring.getDate();
		let year = datestring.getFullYear();
		let month = datestring.getMonth() + 1;
		let ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		let strTime =
			month +
			"/" +
			day +
			"/" +
			year +
			" " +
			hours +
			":" +
			minutes +
			" " +
			ampm;
		return strTime;
	}

	render() {
		const { messages, userData } = this.props;

		return (
			<div>
				<div className="message-room">
					{this.props.currentRoom}
					<div
						className="hidden-menu-btn"
						onClick={this.handleMenuClick}>
						menu
					</div>
				</div>
				<div className="messages inset-shadow">
					{messages.map((data, i) => {
						let testUser = false;
						if (
							userData.firstName === data.userInfo.firstName &&
							userData.lastName === data.userInfo.lastName
						) {
							testUser = true;
						}
						const leDate = new Date(data.timestamp);
						const timeOfMessage = this.formatDate(leDate);

						return (
							<div
								className={
									"message " + (testUser ? " mainUser" : "")
								}
								key={i}>
								<div className="userInfo">
									{userData === {}
										? `Anon: ${data.message}`
										: `${data.userInfo.firstName} ${
												data.userInfo.lastName
										  }`}
									&nbsp;-&nbsp;{timeOfMessage}
								</div>
								<div className="userMsg">{data.message}</div>
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
