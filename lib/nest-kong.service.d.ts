import { LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { KongModuleConfiguration } from './interfaces';
import { Kong } from './classes/KongClient';
import { KongConsumersResource } from './classes/consumers.resource';
export interface Instantiable<T> {
    new (): T;
}
export declare class NestKongService implements OnModuleInit, OnModuleDestroy {
    private readonly kongClient;
    private readonly configuration;
    private readonly logger?;
    private localService;
    private tries;
    private readonly maxRetry;
    private readonly retryInterval;
    readonly consumers: KongConsumersResource;
    constructor(kongClient: Kong, configuration: KongModuleConfiguration, logger?: LoggerService);
    onModuleInit(): Promise<any>;
    onModuleDestroy(): Promise<any>;
    private register;
    private unregister;
    private setupProcessHandlers;
    private resetTriesCount;
}
//# sourceMappingURL=nest-kong.service.d.ts.map