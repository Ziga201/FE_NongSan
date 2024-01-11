import axios from 'axios';

class Other {
    sendMessage(formData) {
        const url = 'https://localhost:7211/api/Other/SendMessage';

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        return axios.post(url, formData, config);
    }

    getAll() {
        const url = 'https://localhost:7211/api/Other/GetAll';
        return axios.get(url);
    }
}

export default new Other();
