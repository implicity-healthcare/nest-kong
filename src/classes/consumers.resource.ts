import { Kong } from './KongClient';

export interface KongConsumer {
    id: string;
    username: string;
    custom_id?: string;
}

export interface KongConsumerCredentials {
    id: string;
    key: string;
    consumer: KongConsumer;
}

export class KongConsumersResource {

    constructor(private readonly kongClient: Kong) {

    }

    async create(username: string, custom_id?: string, tags: string[] = []): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: '/consumers',
                method: 'POST',
                data: {
                    username,
                    custom_id,
                    tags,
                },
            });
    }

    async retrieve(username: string): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: `/consumers/${username}`,
                method: 'GET',
            });
    }

    async list(): Promise<KongConsumer[]> {
        return await this.kongClient
            .request({
                url: `/consumers`,
                method: 'GET',
            });
    }

    async update(identifier: string, consumer: KongConsumer): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: `/consumers/${identifier}`,
                method: 'PUT',
                data: consumer,
            });
    }

    async remove(identifier: string): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: `/consumers/${identifier}`,
                method: 'DELETE',
            });
    }

    async generateApiKey(consumer_id: string): Promise<KongConsumerCredentials> {
        return await this.kongClient
            .request({
                url: `/consumers/${consumer_id}/key-auth`,
                method: 'POST',
            });
    }

    async removeApiKey(consumer_id: string, key_id: string): Promise<void> {
        await this.kongClient
            .request({
                url: `/consumers/${consumer_id}/key-auth/${key_id}`,
                method: 'DELETE',
            });
    }
}
