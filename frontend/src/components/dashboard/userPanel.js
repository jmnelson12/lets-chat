import React, { Component } from "react";

export default class UserPanel extends Component {
	render() {
		const { firstName, lastName } = this.props.data;

		if (
			typeof this.props.data === "undefined" ||
			typeof firstName === "undefined" ||
			typeof lastName === "undefined"
		) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<p>Currently logged in as:</p>
				<h2>{firstName + " " + lastName}</h2>
			</div>
		);
	}
}
