import axios from 'axios';

const jwtToken = localStorage.getItem('jwtToken');
const localhost = 'http://tungpts-001-site1.atempurl.com/';
// const localhost = "https://localhost:7211/"

class Account {
    login(formData) {
        const url = localhost + 'api/Auth/Login';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    register(formData) {
        const url = localhost + 'api/Auth/Register';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    active(formData) {
        const url = localhost + 'api/Auth/ActiveAccount';
        return axios.put(url, formData);
    }

    sendCode(formData) {
        const url = localhost + 'api/Auth/SendCode';
        return axios.post(url, formData);
    }

    forgotPassword(formData) {
        const url = localhost + 'api/Auth/ForgotPassword';
        return axios.put(url, formData);
    }

    create(formData) {
        const url = localhost + 'api/Auth/AddAccount';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    update(formData) {
        const url = localhost + 'api/Auth/UpdateAccount';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = localhost + 'api/Auth/DeleteAccount/' + id;
        return axios.delete(url);
    }
    getAll() {
        const url = localhost + 'api/Auth/GetAll';
        // const config = {
        //     headers: {
        //         Authorization: 'Bearer ' + jwtToken,
        //     },
        // };
        return axios.get(url);
    }

    getAllStaff() {
        const url = localhost + 'api/Auth/GetAllStaff';
        return axios.get(url);
    }

    getAccountByID(id) {
        const url = localhost + 'api/Auth/GetAccountByID/' + id;
        return axios.get(url);
    }
}

export default new Account();
