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

    getAllPayment() {
        const url = 'https://localhost:7211/api/Order/GetAllPayment';
        return axios.get(url);
    }
}

export default new Order();
