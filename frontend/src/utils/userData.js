import axios from "axios";

export const getUser = async token => {
	const response = {
		success: false,
		message: "",
		payload: null
	};
	if (!token) {
		response.success = false;
		response.message = "No user token found";
	}

	try {
		response.payload = await axios.get("/user/getUser?token=" + token);
		response.success = true;
	} catch (e) {
		response.success = false;
		response.message = "Error calling userGet api endpoint";
	}
	return Promise.resolve(response);
};

export const getMessages = async chatId => {
	const response = {
		success: false,
		message: "",
		payload: null
	};

	if (!chatId) {
		response.message = "No chatId given"
	}

	try {
		response.payload = await axios.get("/user/getMessages?cid=" + chatId);
		response.success = true;
	} catch (e) {
		response.message = "Error calling getMessages api endpoint";
	}

	return Promise.resolve(response);
}
