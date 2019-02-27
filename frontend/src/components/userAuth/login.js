import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../utils/userAuth";
import "../../styles/userAuth.css";

library.add([faEnvelope, faLock]);

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loginError: ""
		};

		this.onLogin = this.onLogin.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
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

	handleKeyDown(e) {
		if (e.key === "Enter" || e.keyCode === "13") {
			const formSwitch = document.querySelector(".user-auth-switch");

			if (document.activeElement === formSwitch) {
				this.props.switchAuth();
			} else {
				this.onLogin();
			}
		}
	}

	onLogin() {
		const formData = this.state;

		// POST request to backend
		login(formData).then(res => {
			if (!res.success) {
				this.setState({
					loginError: res.message
				});
			} else {
				const { message, success, token } = res.payload.data;

				if (!success) {
					this.setState({
						loginError: message
					});
				} else {
					this.props.setUserToken(token);
				}
			}
		});
	}

	render() {
		const { email, password, loginError } = this.state;

		return (
			<div className="user-login">
				<h1>Sign in to your account</h1>
				<div className="error">{loginError ? loginError : null}</div>
				<br />
				<div className="input-group">
					<FontAwesomeIcon icon="envelope" />
					<input
						type="email"
						className="txt-auth"
						value={email}
						onChange={this.handleEmailChange}
						placeholder="Email"
						autoFocus={true}
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
				<button className="btn-auth" onClick={this.onLogin}>
					Sign In
				</button>
				<p
					className="user-auth-switch"
					onClick={() => this.props.switchAuth()}
					tabIndex="0">
					Register
				</p>
			</div>
		);
	}
}

export default Login;
