import axios from 'axios';

class Cart {
    addToCart(formData) {
        const url = 'https://localhost:7211/api/Cart/AddToCart';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getAll(id) {
        const url = 'https://localhost:7211/api/Cart/GetAll?userID=' + id;

        return axios.get(url);
    }

    deleteCart(id) {
        const url = 'https://localhost:7211/api/Cart/DeleteCart/' + id;
        return axios.delete(url);
    }

    delete(id) {
        const url = 'https://localhost:7211/api/Cart/DeleteCartItem/' + id;
        return axios.delete(url);
    }
}

export default new Cart();
