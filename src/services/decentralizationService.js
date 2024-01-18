import axios from 'axios';
const localhost = 'https://tungpts-001-site1.atempurl.com';
// const localhost = "https://localhost:7211"
class Decentralization {
    getAll() {
        const url = localhost + '/api/Decentralization/GetAll';
        return axios.get(url);
    }
}

export default new Decentralization();
