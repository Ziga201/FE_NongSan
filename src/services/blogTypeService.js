import axios from 'axios';

class BlogType {
    create(formData) {
        const url = 'https://localhost:7211/api/BlogType/AddBlogType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = 'https://localhost:7211/api/BlogType/UpdateBlogType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/BlogType/DeleteBlogType/' + id;
        return axios.delete(url);
    }
    getAll() {
        const url = 'https://localhost:7211/api/BlogType/GetAll';
        return axios.get(url);
    }

    getBlogTypeById(id) {
        const url = 'https://localhost:7211/api/BlogType/GetBlogTypeByID' + id;
        return axios.get(url);
    }
}

export default new BlogType();
