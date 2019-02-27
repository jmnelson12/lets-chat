import React, { Component } from "react";

export default class UserPanel extends Component {
	render() {
		return (
			<div>
				<h2>Hello, {this.props.data.firstName}</h2>
			</div>
		);
	}
}
