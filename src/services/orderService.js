import axios from 'axios';

class Order {
    order(order, orderDetail) {
        const dataToSend = {
            order: order,
            orderDetail: orderDetail,
        };
        const queryString = Object.keys(order)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(order[key]))
            .join('&');
        const url = `https://localhost:7211/api/Order/Order?${queryString}`;

        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
            },
        };

        return axios.post(url, orderDetail, config);
    }

    getAll() {
        const url = 'https://localhost:7211/api/Order/GetAll';
        return axios.get(url);
    }

    getAllOrderByID(userID) {
        const url = 'https://localhost:7211/api/Order/getAllOrderByID/' + userID;
        return axios.get(url);
    }

    getAllOrderDetail(orderID) {
        const url = 'https://localhost:7211/api/Order/GetAllOrderDetail/' + orderID;
        return axios.get(url);
    }

    getAllPayment() {
        const url = 'https://localhost:7211/api/Order/GetAllPayment';
        return axios.get(url);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/Order/DeleteOrder/' + id;
        return axios.delete(url);
    }
    changeOrderStatus(id) {
        const url = 'https://localhost:7211/api/Order/changeOrderStatus/' + id;
        return axios.put(url);
    }
}

export default new Order();
