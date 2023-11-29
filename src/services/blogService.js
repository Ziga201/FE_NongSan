import axios from 'axios';

class Blog {
    create(formData) {
        const url = 'http://localhost:8000/api/create-blog';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getBlogs() {
        const url = 'https://localhost:7211/api/Product/GetProductTest';
        return axios.get(url);
    }

    getBlogById(id) {
        const url = 'http://localhost:8000/api/get-blog/' + id;
        return axios.get(url);
    }

    deleteBlog(id) {
        const url = 'http://localhost:8000/api/delete-blog/' + id;
        return axios.get(url);
    }

    update(formData) {
        const url = 'http://localhost:8000/api/update-blog';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
}

export default new Blog();
