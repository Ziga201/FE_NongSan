import axios from 'axios';

class User {
    getByID(id) {
        const url = 'https://localhost:7211/api/User/GetByID?id=' + id;
        return axios.get(url);
    }
}

export default new User();
