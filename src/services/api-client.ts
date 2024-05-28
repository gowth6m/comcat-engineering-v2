import axios from "axios";
import ProductApiClient from "./product-api-client";

const client = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

class ApiClient {

    static product = new ProductApiClient(client, '/product')

}

export default ApiClient;