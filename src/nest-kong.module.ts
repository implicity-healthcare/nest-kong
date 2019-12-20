import { DynamicModule, Global, Module } from '@nestjs/common';
import { KongModuleConfiguration } from './interfaces';
import { NestKongService } from './nest-kong.service';
import { ConfigService } from '@nestjs/config';
import { NestKongClientProvider } from './providers/nest-kong.client.provider';
import { NestKongServiceProvider } from './providers/nest-kong.service.provider';

@Global()
@Module({
    imports: [
        ConfigService,
    ],
    providers: [
        NestKongClientProvider,
        NestKongServiceProvider
    ],
    exports: [
        NestKongService
    ],
})
export class NestKongModule {
}
