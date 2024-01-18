import axios from 'axios';
const localhost = 'http://tungpts-001-site1.atempurl.com/';
// const localhost = "https://localhost:7211/"
class ProductType {
    create(formData) {
        const url = localhost + 'api/ProductType/AddProductType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = localhost + 'api/ProductType/UpdateProductType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = localhost + 'api/ProductType/DeleteProductType/' + id;
        return axios.delete(url);
    }

    getAll() {
        const url = localhost + 'api/ProductType/GetAll';
        return axios.get(url);
    }
}

export default new ProductType();
