import { Review } from "@prisma/client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class ReviewApiClient {

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

    async getReviewsByProductSlug(productSlug: string): Promise<AxiosResponse<{
        data: Review[]
    }>> {
        return await this.client.get(`/${productSlug}`);
    }

    async createReview({
        rating,
        comment,
        productId
    }: {
        rating: number,
        comment: string,
        productId: string
    }): Promise<AxiosResponse<{
        data: Review
    }>> {
        return await this.client.post('/create', {
            rating,
            comment,
            productId
        });
    }



}