const User = require("../models/User");
const UserSession = require("../models/UserSession");

module.exports = {
	signUp(req, res) {
		const { firstName, lastName, password, password2 } = req.body;
		let { email } = req.body;
		const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;

		/* Error Checking */
		if (!firstName) {
			return res.send({
				success: false,
				message: "First name cannot be blank."
			});
		}
		if (!lastName) {
			return res.send({
				success: false,
				message: "Last name cannot be blank."
			});
		}
		if (!password || password.length < 6) {
			return res.send({
				success: false,
				message: "Password must be at least 6 characters."
			});
		}

		if (!password2 || password !== password2) {
			return res.send({
				success: false,
				message: "Passwords must match."
			});
		}

		// Email validation
		if (!email) {
			return res.send({
				success: false,
				message: "Email cannot be blank."
			});
		}
		if (!emailRegex.test(email)) {
			return res.send({
				success: false,
				message: "Email is invalid."
			});
		}
		email = email.toLowerCase();

		// Verify email doesn't exist
		User.find({ email: email }, (err, prevUser) => {
			// Check if user exists or there is an error
			if (err) {
				return res.send({
					success: false,
					message: "Server error"
				});
			} else if (prevUser.length > 0) {
				return res.send({
					success: false,
					message: "Account already exists"
				});
			}

			// Create User
			const newUser = new User({
				firstName,
				lastName,
				email
			});

			// hash password and email
			newUser.password = newUser.generateHash(password);

			// Save User
			newUser.save((err, user) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server error"
					});
				}
				res.send({
					success: true,
					message: "Success"
				});
			});
		});
	},
	login(req, res) {
		const { password } = req.body;
		let { email } = req.body;

		if (!password && !email) {
			return res.send({
				success: false,
				message: "Please enter your email and password"
			});
		}

		if (!password || password.length < 6) {
			return res.send({
				success: false,
				message: "Please enter your password"
			});
		}

		// Email validation
		if (!email) {
			return res.send({
				success: false,
				message: "Please enter your email"
			});
		}
		email = email.toLowerCase();

		// Check user
		User.find({ email: email }, (err, users) => {
			// Check for error
			if (err) {
				return res.send({
					success: false,
					message: "Server Error"
				});
			}

			if (users.length != 1) {
				return res.send({
					success: false,
					message: "User not found"
				});
			}

			// grab user
			const user = users[0];

			// Verify Password
			if (!user.validPassword(password)) {
				return res.send({
					success: false,
					message: "Invalid password"
				});
			}

			// Verify user hasn't been deleted
			if (user.isDeleted) {
				return res.send({
					success: false,
					message: "User is deleted"
				});
			}

			// Create new user session
			const userSession = new UserSession();
			userSession.userId = user._id;

			// Save user session
			userSession.save((err, doc) => {
				if (err) {
					return res.send({
						success: false,
						message: "Error creating session"
					});
				}

				return res.send({
					success: true,
					message: "Valid Login",
					token: doc._id
				});
			});
		});
	},
	verify(req, res) {
		// get token
		const { token } = req.query;

		// Verify token
		UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: "Error validating session"
				});
			}

			// Check if token
			if (sessions.length != 1) {
				return res.send({
					success: false,
					message: "Couldn't find token"
				});
			} else {
				return res.send({
					success: true,
					message: "Valid Token"
				});
			}
		});
	},
	logout(req, res) {
		// get token
		const { token } = req.query;

		// verify token
		UserSession.findOneAndDelete({ _id: token }, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: "Error deleting token"
				});
			}
			return res.send({
				success: true,
				message: "Logged Out"
			});
		});

		// UserSession.findOneAndUpdate(
		// 	{ _id: token, isDeleted: true },
		// 	{ $set: { isDeleted: true } },
		// 	null,
		// 	(err, sessions) => {
		// 		if (err) {
		// 			return res.send({
		// 				success: false,
		// 				message: "Error deleting token"
		// 			});
		// 		}
		// 		return res.send({
		// 			success: true,
		// 			message: "Logged Out"
		// 		});
		// 	}
		// );
	}
};
