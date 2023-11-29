import axios from 'axios';

class Account {
    create(formData) {
        const url = 'http://localhost:8000/api/create-account';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getAccounts() {
        const url = 'http://localhost:8000/api/get-accounts';
        return axios.get(url);
    }

    getAccountById(id) {
        const url = 'http://localhost:8000/api/get-account/' + id;
        return axios.get(url);
    }

    deleteAccount(id) {
        const url = 'http://localhost:8000/api/delete-account/' + id;
        return axios.get(url);
    }

    update(formData) {
        const url = 'http://localhost:8000/api/update-account';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
}

export default new Account();
