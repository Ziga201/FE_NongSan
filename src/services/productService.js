import axios from 'axios';

class Product {
    create(formData) {
        const url = 'https://localhost:7211/api/Product/AddProduct';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = 'https://localhost:7211/api/Product/UpdateProduct';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/Product/DeleteProduct/' + id;
        return axios.delete(url);
    }

    getAll(pageSize, pageNumber) {
        // const url = 'https://localhost:7211/api/Product/GetProduct';
        const url = `https://localhost:7211/api/Product/GetProduct?PageSize=${pageSize}&PageNumber=${pageNumber}`;
        return axios.get(url);
    }

    getById(id) {
        const url = 'https://localhost:7211/api/Product/GetProduct' + id;
        return axios.get(url);
    }
    getAllType() {
        const url = 'https://localhost:7211/api/ProductType/GetAll';
        return axios.get(url);
    }
}

export default new Product();
