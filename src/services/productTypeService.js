import axios from 'axios';

class ProductType {
    create(formData) {
        const url = 'https://localhost:7211/api/ProductType/AddProductType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = 'https://localhost:7211/api/ProductType/UpdateProductType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/ProductType/DeleteProductType/' + id;
        return axios.delete(url);
    }

    getAll() {
        const url = 'https://localhost:7211/api/ProductType/GetAll';
        return axios.get(url);
    }
}

export default new ProductType();
