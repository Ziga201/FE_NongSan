import axios from 'axios';
const localhost = 'https://tungpts-001-site1.atempurl.com';
// const localhost = "https://localhost:7211"
class Order {
    order(order, orderDetail) {
        const dataToSend = {
            order: order,
            orderDetail: orderDetail,
        };
        const queryString = Object.keys(order)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(order[key]))
            .join('&');
        const url = `${localhost}/api/Order/Order?${queryString}`;

        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
            },
        };

        return axios.post(url, orderDetail, config);
    }

    getAlls() {
        const url = localhost + '/api/Order/GetAll';
        return axios.get(url);
    }

    getAll(pageSize, pageNumber) {
        const url = localhost + `/api/Order/GetAll?PageSize=${pageSize}&PageNumber=${pageNumber}`;
        return axios.get(url);
    }

    getAllOrderByID(userID) {
        const url = localhost + '/api/Order/getAllOrderByID/' + userID;
        return axios.get(url);
    }

    getAllOrderDetail(orderID) {
        const url = localhost + '/api/Order/GetAllOrderDetail/' + orderID;
        return axios.get(url);
    }

    getAllPayment() {
        const url = localhost + '/api/Order/GetAllPayment';
        return axios.get(url);
    }
    delete(id) {
        const url = localhost + '/api/Order/DeleteOrder/' + id;
        return axios.delete(url);
    }
    changeOrderStatus(id) {
        const url = localhost + '/api/Order/changeOrderStatus/' + id;
        return axios.put(url);
    }
}

export default new Order();
