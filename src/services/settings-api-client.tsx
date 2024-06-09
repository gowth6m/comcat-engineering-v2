import { Setting } from "@prisma/client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class SettingsApiClient {
    private client: AxiosInstance;

    constructor(client: AxiosInstance, baseURL?: string) {
        this.client = axios.create({
            baseURL: "/api",
            headers: {
                "Content-Type": "application/json",
            },
            ...client,
        });
        if (baseURL) {
            this.client.defaults.baseURL += baseURL;
        }
    }

    async createOrUpdate({
        name,
        deliveryCost,
        freeDeliveryThreshold,
        taxRate,
    }: {
        name: string;
        deliveryCost: number;
        freeDeliveryThreshold: number;
        taxRate: number;
    }): Promise<
        AxiosResponse<{
            data: Setting;
        }>
    > {
        return await this.client.post(`/update`, {
            name,
            deliveryCost,
            freeDeliveryThreshold,
            taxRate,
        });
    }

    async get(): Promise<AxiosResponse<{ data: Setting }>> {
        return await this.client.get(`/`);
    }
}
