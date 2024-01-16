import axios from 'axios';

class Blog {
    create(formData) {
        const url = 'https://localhost:7211/api/Blog/AddBlog';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = 'https://localhost:7211/api/Blog/UpdateBlog';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/Blog/DeleteBlog/' + id;
        return axios.delete(url);
    }
    updateView(id) {
        const url = 'https://localhost:7211/api/Blog/UpdateViewBlog/' + id;
        return axios.put(url);
    }
    getAll(pageSize, pageNumber) {
        const url =
            pageSize != null && pageNumber != null
                ? `https://localhost:7211/api/Blog/GetAll?PageSize=${pageSize}&PageNumber=${pageNumber}`
                : 'https://localhost:7211/api/Blog/GetAll';
        return axios.get(url);
    }
    getAllByBlogTypeID(id) {
        const url = 'https://localhost:7211/api/Blog/GetAllByBlogTypeID/' + id;
        return axios.get(url);
    }

    getBlogById(id) {
        const url = 'https://localhost:7211/api/Blog/GetBlogByID/' + id;
        return axios.get(url);
    }
}

export default new Blog();
