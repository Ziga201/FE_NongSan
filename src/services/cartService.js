import axios from 'axios';
const localhost = 'http://tungpts-001-site1.atempurl.com/';
// const localhost = "https://localhost:7211/"
class Cart {
    addToCart(formData) {
        const url = localhost + 'api/Cart/AddToCart';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    handleQuantity(formData) {
        const url = localhost + 'api/Cart/HandleQuantity';

        return axios.put(url, formData);
    }

    getAll(id) {
        const url = localhost + 'api/Cart/GetAll/' + id;

        return axios.get(url);
    }

    deleteCart(id) {
        const url = localhost + 'api/Cart/DeleteCart/' + id;
        return axios.delete(url);
    }

    delete(id) {
        const url = localhost + 'api/Cart/DeleteCartItem/' + id;
        return axios.delete(url);
    }
}

export default new Cart();
