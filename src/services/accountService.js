import axios from 'axios';

class Account {
    login(formData) {
        const url = 'https://localhost:7211/api/Auth/Login';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    create(formData) {
        const url = 'https://localhost:7211/api/Auth/Register';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = 'https://localhost:7211/api/Auth/UpdateAccount';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/Auth/DeleteAccount/' + id;
        return axios.delete(url);
    }
    getAll() {
        const url = 'https://localhost:7211/api/Auth/GetAll';
        return axios.get(url);
    }

    getAccountById(id) {
        const url = 'http://localhost:8000/api/get-account/' + id;
        return axios.get(url);
    }
}

export default new Account();
