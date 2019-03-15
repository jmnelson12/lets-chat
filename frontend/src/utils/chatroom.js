import axios from "axios";

export const createChatroom = async (chatroomName, email) => {
	return Promise.resolve(
		await axios.post("/chatroom/create", {
			chatroomName,
			email
		})
	);
};
export const deleteChatroom = async (cid, email) => {
	return Promise.resolve(
		await axios.delete("/chatroom/delete", {
			params: {
				cid,
				userEmail: email
			}
		})
	);
};
export const getChatrooms = async () => {
	const response = {
		success: false,
		message: "",
		payload: null
	};

	try {
		response.success = true;
		response.payload = await axios.get("/chatroom/getAll");
	} catch (e) {
		response.success = false;
		response.message = "Error calling /chatroom/getAll api endpoint";
	}

	return Promise.resolve(response);
};
export const getChatroom = async cid => {
	const response = {
		success: false,
		message: "",
		payload: null
	};

	if (!cid) {
		response.message = "No chatroom id given";
	}

	try {
		response.success = true;
		response.payload = await axios.get("/chatroom/getOne", {
			params: {
				cid: cid
			}});
	} catch (e) {
		response.success = false;
		response.message = "Error calling /chatroom/getOne api endpoint";
	}

	return Promise.resolve(response);
};
export const selectChatroom = async cid => {

}