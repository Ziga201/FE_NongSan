import axios from 'axios';

class Checkout {
    create(formData) {
        const url = 'http://localhost:8000/api/create-checkout';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getCheckouts() {
        const url = 'http://localhost:8000/api/get-checkouts';
        return axios.get(url);
    }

    deleteCheckout(id) {
        const url = 'http://localhost:8000/api/delete-checkout/' + id;
        return axios.get(url);
    }

    // update(formData) {
    //     const url = 'http://localhost:8000/api/update-checkout';
    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     };
    //     return axios.post(url, formData, config);
    // }
}

export default new Checkout();
