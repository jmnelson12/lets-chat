import axios from "axios";

export const verifyToken = async token => {
	const response = {
		success: false,
		message: "",
		payload: null
	};
	if (!token) return null;
	try {
		response.success = true;
		response.payload = await axios.get("/user/verify?token=" + token);
	} catch (e) {
		response.success = false;
		response.message = "Error calling verifyToken api";
	}
	return Promise.resolve(response);
};

export const signup = async userData => {
	const { firstName, lastName, email, password, password2 } = userData;
	const response = {
		success: false,
		message: "",
		payload: null
	};

	if (!email && !password && !firstName && !lastName) {
		response.message = "Please enter your information in the fields below";

		return Promise.resolve(response);
	}

	if (!email) {
		response.message = "Please enter your email";

		return Promise.resolve(response);
	}

	if (!password) {
		response.message = "Please enter your password";

		return Promise.resolve(response);
	}

	if (!password2 || password !== password2) {
		response.message = "Passwords must match";

		return Promise.resolve(response);
	}

	if (!firstName) {
		response.message = "Please enter your first name";

		return Promise.resolve(response);
	}

	if (!lastName) {
		response.message = "Please enter your last name";

		return Promise.resolve(response);
	}

	try {
		response.payload = await axios.post("/user/signup", {
			firstName,
			lastName,
			email,
			password,
			password2
		});
		response.success = true;
		response.message = "Success";
	} catch (e) {
		response.success = false;
		response.message = "Error calling signup api";
		response.payload = null;
	}
	return Promise.resolve(response);
};

export const login = async userData => {
	let result;
	const { email, password } = userData;
	const response = {
		success: false,
		message: "",
		payload: null
	};

	if (!email && !password) {
		response.message = "Please enter your email and password";

		return Promise.resolve(response);
	}

	if (!email) {
		response.message = "Please enter your email";

		return Promise.resolve(response);
	}

	if (!password) {
		response.message = "Please enter your password";

		return Promise.resolve(response);
	}

	try {
		result = await axios.post("/user/login", {
			email,
			password
		});

		response.success = true;
		response.message = "Success";
		response.payload = result;
		return Promise.resolve(response);
	} catch (e) {
		response.success = false;
		response.message = "Error calling login api";
		response.payload = null;
		return Promise.resolve(response);
	}
};

export const logout = async token => {
	const response = {
		success: false,
		message: "",
		payload: null
	};
	if (!token) return null;

	try {
		response.success = true;
		response.payload = await axios.get("/user/logout?token=" + token);
		window.location.reload();
	} catch (e) {
		response.success = false;
		response.message = "Error calling logout api";
	}
	return Promise.resolve(response);
};
