import axios from 'axios';

class Decentralization {
    getAll() {
        const url = 'https://localhost:7211/api/Decentralization/GetAll';
        return axios.get(url);
    }
}

export default new Decentralization();
