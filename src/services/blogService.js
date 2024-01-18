import axios from 'axios';
const localhost = 'https://tungpts-001-site1.atempurl.com';
// const localhost = "https://localhost:7211"
class Blog {
    create(formData) {
        const url = localhost + '/api/Blog/AddBlog';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = localhost + '/api/Blog/UpdateBlog';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = localhost + '/api/Blog/DeleteBlog/' + id;
        return axios.delete(url);
    }
    updateView(id) {
        const url = localhost + '/api/Blog/UpdateViewBlog/' + id;
        return axios.put(url);
    }
    getAll(pageSize, pageNumber) {
        const url =
            pageSize != null && pageNumber != null
                ? `${localhost}/api/Blog/GetAll?PageSize=${pageSize}&PageNumber=${pageNumber}`
                : localhost + '/api/Blog/GetAll';
        return axios.get(url);
    }
    getAllByBlogTypeID(id) {
        const url = localhost + '/api/Blog/GetAllByBlogTypeID/' + id;
        return axios.get(url);
    }

    getBlogById(id) {
        const url = localhost + '/api/Blog/GetBlogByID/' + id;
        return axios.get(url);
    }
}

export default new Blog();
