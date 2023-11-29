import axios from 'axios';

class Staff {
    create(formData) {
        const url = 'http://localhost:8000/api/create-staff';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }

    getStaffs() {
        const url = 'http://localhost:8000/api/get-staffs';
        return axios.get(url);
    }

    deleteStaff(id) {
        const url = 'http://localhost:8000/api/delete-staff/' + id;
        return axios.get(url);
    }

    update(formData) {
        const url = 'http://localhost:8000/api/update-staff';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
}

export default new Staff();
