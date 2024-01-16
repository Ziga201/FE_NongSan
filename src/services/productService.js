import axios from 'axios';

class Decentralization {
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
        const url =
            pageSize != null && pageNumber != null
                ? `https://localhost:7211/api/Product/GetProduct?PageSize=${pageSize}&PageNumber=${pageNumber}`
                : 'https://localhost:7211/api/Product/GetProduct';
        return axios.get(url);
    }

    getAllProduct() {
        const url = 'https://localhost:7211/api/Product/GetAll';
        return axios.get(url);
    }
    getProductByID(id) {
        const url = 'https://localhost:7211/api/Product/GetProductByID/' + id;
        return axios.get(url);
    }

    updateView(id) {
        const url = 'https://localhost:7211/api/Product/UpdateView?id=' + id;
        return axios.put(url);
    }

    getRelatedProduct(id) {
        const url = 'https://localhost:7211/api/Product/GetRelatedProduct?productTypeID=' + id;
        return axios.get(url);
    }
    addProductReview(formData) {
        const url = 'https://localhost:7211/api/Product/AddProductReview';
        return axios.post(url, formData);
    }
    getProductReview(id) {
        const url = 'https://localhost:7211/api/Product/GetProductReview?productID=' + id;
        return axios.get(url);
    }
    getProductReviewByAccountID(id) {
        const url = 'https://localhost:7211/api/Product/GetProductReviewByAccountID/' + id;
        return axios.get(url);
    }
}

export default new Decentralization();
