import axios from "axios";
import ProductApiClient from "./product-api-client";
import PromoCodeApiClient from "./promo-code-api-client";
import ReviewApiClient from "./review-api-client";
import SettingsApiClient from "./settings-api-client";

const client = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

class ApiClient {

    static product = new ProductApiClient(client, '/product');

    static review = new ReviewApiClient(client, '/review');

    static promoCode = new PromoCodeApiClient(client, '/promo-code');

    static settings = new SettingsApiClient(client, '/settings');
}

export default ApiClient;