import axios from 'axios';
const localhost = 'http://tungpts-001-site1.atempurl.com/';
// const localhost = "https://localhost:7211/"
class Decentralization {
    create(formData) {
        const url = localhost + 'api/Product/AddProduct';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = localhost + 'api/Product/UpdateProduct';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = localhost + 'api/Product/DeleteProduct/' + id;
        return axios.delete(url);
    }

    getAll(pageSize, pageNumber) {
        const url =
            pageSize != null && pageNumber != null
                ? `${localhost}api/Product/GetProduct?PageSize=${pageSize}&PageNumber=${pageNumber}`
                : localhost + 'api/Product/GetProduct';
        return axios.get(url);
    }

    getAllProduct() {
        const url = localhost + 'api/Product/GetAll';
        return axios.get(url);
    }
    getProductByID(id) {
        const url = localhost + 'api/Product/GetProductByID/' + id;
        return axios.get(url);
    }

    updateView(id) {
        const url = localhost + 'api/Product/UpdateView?id=' + id;
        return axios.put(url);
    }

    getRelatedProduct(id) {
        const url = localhost + 'api/Product/GetRelatedProduct?productTypeID=' + id;
        return axios.get(url);
    }
    addProductReview(formData) {
        const url = localhost + 'api/Product/AddProductReview';
        return axios.post(url, formData);
    }
    getProductReview(id) {
        const url = localhost + 'api/Product/GetProductReview?productID=' + id;
        return axios.get(url);
    }
    getProductReviewByAccountID(id) {
        const url = localhost + 'api/Product/GetProductReviewByAccountID/' + id;
        return axios.get(url);
    }
}

export default new Decentralization();
