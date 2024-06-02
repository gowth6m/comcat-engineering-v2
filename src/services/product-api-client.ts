import { Product } from "@prisma/client";
import { AxiosInstance, AxiosResponse } from "axios";

export default class ProductApiClient {

    private client: AxiosInstance;

    constructor(client: AxiosInstance, baseURL?: string) {
        this.client = client;
        if (baseURL) {
            this.client.defaults.baseURL += baseURL;
        }
    }

    async getAllProducts(): Promise<AxiosResponse<{
        data: Product[]
    }>> {
        return await this.client.get('/all');
    }

    async getHeroProducts(): Promise<AxiosResponse<{
        bestSellers: Product[],
        newArrivals: Product[],
        clearance: Product[]
    }>> {
        return await this.client.get('/hero');
    }

}