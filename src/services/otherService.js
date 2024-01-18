import axios from 'axios';
const localhost = 'https://tungpts-001-site1.atempurl.com';
// const localhost = "https://localhost:7211"
class Other {
    sendMessage(formData) {
        const url = localhost + '/api/Other/SendMessage';

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        return axios.post(url, formData, config);
    }

    getAll() {
        const url = localhost + '/api/Other/GetAll';
        return axios.get(url);
    }
}

export default new Other();
