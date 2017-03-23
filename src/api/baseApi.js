import axios from 'axios';
import modalStore from '../components/Common/ModalDialog/ModalStore';

const baseApi = {
	config: {
		baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'http://eprusarw1180:5001/'
	},

	ajax(request) {
		return axios({...this.config, ...request})
			.catch((error) => {
				console.log(error);

				modalStore.showError(
					'Server error!',
					error.response.data.errors
				);
			});
	}
};

export default baseApi;
