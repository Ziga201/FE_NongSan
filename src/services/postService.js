import axios from 'axios';

class Post {
    create(formData) {
        const url = 'http://localhost:8000/api/create-post';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getPosts() {
        const url = 'http://localhost:8000/api/get-posts';
        return axios.get(url);
    }

    getPostById(id) {
        const url = 'http://localhost:8000/api/get-post/' + id;
        return axios.get(url);
    }

    deletePost(id) {
        const url = 'http://localhost:8000/api/delete-post/' + id;
        return axios.get(url);
    }

    update(formData) {
        const url = 'http://localhost:8000/api/update-post';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
}

export default new Post();
