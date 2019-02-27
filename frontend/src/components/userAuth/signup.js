import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { signup } from "../../utils/userAuth";
import "../../styles/userAuth.css";

library.add([faEnvelope, faLock, faUser]);

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			password2: "",
			signUpError: ""
		};
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePassword2Change = this.handlePassword2Change.bind(this);
		this.onSignUp = this.onSignUp.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
	}
	handleFirstNameChange(e) {
		this.setState({
			firstName: e.target.value
		});
	}
	handleLastNameChange(e) {
		this.setState({
			lastName: e.target.value
		});
	}
	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		});
	}
	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}
	handlePassword2Change(e) {
		this.setState({
			password2: e.target.value
		});
	}
	handleKeyDown(e) {
		if (e.key === "Enter" || e.keyCode === "13") {
			const formSwitch = document.querySelector(".user-auth-switch");
			if (document.activeElement === formSwitch) {
				this.props.switchAuth();
			} else {
				this.onSignUp();
			}
		}
	}
	onSignUp() {
		const formData = this.state;
		signup(formData).then(res => {
			if (!res.success) {
				this.setState({
					signUpError: res.message
				});
			} else {
				const { message, success } = res.payload.data;
				if (!success) {
					this.setState({
						signUpError: message
					});
				} else {
					this.props.switchAuth("User Created");
					this.setState({
						firstName: "",
						lastName: "",
						email: "",
						password: "",
						password2: "",
						signUpError: message
					});
				}
			}
		});
	}

	render() {
		const {
			firstName,
			lastName,
			email,
			password,
			password2,
			signUpError
		} = this.state;

		return (
			<div className="user-signup">
				<h1>Register Your Account</h1>
				<div className="error">{signUpError ? signUpError : null}</div>
				<br />
				<div className="input-group">
					<FontAwesomeIcon icon="user" />
					<input
						type="text"
						className="txt-auth"
						value={firstName}
						onChange={this.handleFirstNameChange}
						placeholder="First Name"
						autoFocus={true}
					/>
				</div>
				<br />
				<br />
				<div className="input-group">
					<FontAwesomeIcon icon="user" />
					<input
						type="text"
						className="txt-auth"
						value={lastName}
						onChange={this.handleLastNameChange}
						placeholder="Last Name"
					/>
				</div>
				<br />
				<br />
				<div className="input-group">
					<FontAwesomeIcon icon="envelope" />
					<input
						type="email"
						className="txt-auth"
						value={email}
						onChange={this.handleEmailChange}
						placeholder="Email"
					/>
				</div>
				<br />
				<br />
				<div className="input-group">
					<FontAwesomeIcon icon="lock" />
					<input
						type="password"
						className="txt-auth"
						value={password}
						onChange={this.handlePasswordChange}
						placeholder="Password"
					/>
				</div>
				<br />
				<br />
				<div className="input-group">
					<FontAwesomeIcon icon="lock" />
					<input
						type="password"
						className="txt-auth"
						value={password2}
						onChange={this.handlePassword2Change}
						placeholder="Confirm Password"
					/>
				</div>
				<br />
				<br />
				<button className="btn-auth" onClick={this.onSignUp}>
					Register
				</button>

				<p
					className="user-auth-switch"
					onClick={() => this.props.switchAuth()}
					tabIndex="0">
					Sign In
				</p>
			</div>
		);
	}
}

export default SignUp;
