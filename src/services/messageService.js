import axios from 'axios';

class Message {
    create(formData) {
        const url = 'http://localhost:8000/api/create-message';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getMessages() {
        const url = 'http://localhost:8000/api/get-messages';
        return axios.get(url);
    }

    deleteMessage(id) {
        const url = 'http://localhost:8000/api/delete-message/' + id;
        return axios.get(url);
    }
}

export default new Message();
