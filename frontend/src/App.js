import React, { Component, Suspense } from "react";
import "./styles/App.css";
import {
	getFromStorage,
	setInStorage,
	removeFromStorage,
	storage_key
} from "./utils/storage";

import { verifyToken } from "./utils/userAuth";

const UserLogin = React.lazy(() => import("./components/userAuth/login"));
const UserSignUp = React.lazy(() => import("./components/userAuth/signup"));
const Dashboard = React.lazy(() => import("./components/dashboard/dashboard"));

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: "",
			isLoading: true,
			userLogin: true,
			message: ""
		};

		this.handleAuthSwitch = this.handleAuthSwitch.bind(this);
		this.setToken = this.setToken.bind(this);
	}

	componentDidMount() {
		const obj = getFromStorage(storage_key);
		if (obj && obj.token) {
			const { token } = obj;

			verifyToken(token).then(res => {
				if (res) {
					const { data } = res.payload;

					if (data.success) {
						this.setState({
							isLoading: false,
							token
						});
					} else {
						this.setState({
							isLoading: false
						});
					}
				} else {
					this.setState({
						isLoading: false
					});
				}
			});
		} else {
			this.setState({
				isLoading: false
			});
		}
	}

	handleAuthSwitch(message) {
		this.setState({
			userLogin: !this.state.userLogin,
			message
		});
	}

	setToken(token) {
		setInStorage(storage_key, { token });
		this.setState({
			token
		});
	}

	render() {
		const { isLoading, token, userLogin, message } = this.state;

		if (isLoading) {
			return <div>Loading...</div>;
		}
		if (!token) {
			return (
				<div className="user-auth-holder">
					<Suspense fallback={<div>Loading...</div>}>
						<div className="user-login-message">
							{message ? message : ""}
						</div>
						{userLogin ? (
							<UserLogin
								switchAuth={this.handleAuthSwitch}
								setUserToken={this.setToken}
							/>
						) : (
							<UserSignUp switchAuth={this.handleAuthSwitch} />
						)}
					</Suspense>
				</div>
			);
		}

		return (
			<Suspense fallback={<div>Loading...</div>}>
				<Dashboard
					loginToken={token}
					removeToken={() => removeFromStorage(storage_key)}
				/>
			</Suspense>
		);
	}
}

export default App;
