import axios from "axios";
import { baseUrl } from "../config";

const instance = axios.create({
	baseURL: baseUrl,
	timeout: 10000
});

instance.interceptors.request.use(
	(config) => {
		// console.log(config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		if (response.status == 200) {
			return response;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;
