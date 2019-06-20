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
export declare class KongConsumersResource {
    private readonly kongClient;
    constructor(kongClient: Kong);
    create(username: string, custom_id?: string, tags?: string[]): Promise<KongConsumer>;
    retrieve(username: string): Promise<KongConsumer>;
    list(): Promise<KongConsumer[]>;
    update(identifier: string, consumer: KongConsumer): Promise<KongConsumer>;
    remove(identifier: string): Promise<KongConsumer>;
    generateApiKey(consumer_id: string): Promise<KongConsumerCredentials>;
    removeApiKey(consumer_id: string, key_id: string): Promise<void>;
}
//# sourceMappingURL=consumers.resource.d.ts.map