import { PromoCode } from "@prisma/client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class PromoCodeApiClient {

    private client: AxiosInstance;

    constructor(client: AxiosInstance, baseURL?: string) {
        this.client = axios.create({
            baseURL: '/api',
            headers: {
                'Content-Type': 'application/json',
            },
            ...client
        });
        if (baseURL) {
            this.client.defaults.baseURL += baseURL;
        }
    }

    async getPromoCode(code: string): Promise<AxiosResponse<{
        data: PromoCode
    }>> {
        return await this.client.get(`/${code}`);
    }

}