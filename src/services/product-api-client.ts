import { Product } from "@prisma/client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class ProductApiClient {

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

    async getProductBySlug(slug: string): Promise<AxiosResponse<{
        data: Product
    }>> {
        return await this.client.get(`/${slug}`);
    }

    async getSimilarProducts(slug: string): Promise<AxiosResponse<{
        data: Product[]
    }>> {
        return await this.client.get(`/similar/${slug}`);
    }

}