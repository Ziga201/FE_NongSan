import axios from 'axios';
const localhost = 'http://tungpts-001-site1.atempurl.com/';
// const localhost = "https://localhost:7211/"
class BlogType {
    create(formData) {
        const url = localhost + 'api/BlogType/AddBlogType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = localhost + 'api/BlogType/UpdateBlogType';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = localhost + 'api/BlogType/DeleteBlogType/' + id;
        return axios.delete(url);
    }
    getAll() {
        const url = localhost + 'api/BlogType/GetAll';
        return axios.get(url);
    }

    getBlogTypeById(id) {
        const url = localhost + 'api/BlogType/GetBlogTypeByID' + id;
        return axios.get(url);
    }
}

export default new BlogType();
