import { DynamicModule, Global, Module } from '@nestjs/common';
import { KongModuleConfiguration } from './interfaces';
import { KONG_CLIENT_PROVIDER, KONG_CONFIGURATION_PROVIDER, KONG_SERVICE_PROVIDER } from './constants';
import { Kong } from './classes/KongClient';
import { NestKongService } from './nest-kong.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class NestKongModule {

    static init(options?: KongModuleConfiguration): DynamicModule {
        /**
         * Configure kong client by connecting to the client agent
         * and register the current API if configuration is provided.
         */
        const kongClientProvider = {
            provide: KONG_CLIENT_PROVIDER,
            inject: [
                ConfigService
            ],
            useFactory: async (configService: ConfigService): Promise<any> => {
                const configuration = configService.get<KongModuleConfiguration>('NKong', options);
                return new Kong(configuration.kong);
            }
        };

        const kongServiceProvider = {
            provide: KONG_SERVICE_PROVIDER,
            inject: [
                KONG_CLIENT_PROVIDER,
                KONG_CONFIGURATION_PROVIDER
            ],
            useFactory: async (kongClient: Kong, kongConfiguration: KongModuleConfiguration): Promise<NestKongService> => {
                return new NestKongService(kongClient, kongConfiguration);
            },

        };

        return {
            module: NestKongModule,
            imports: [
                ConfigService,
            ],
            providers: [kongClientProvider, kongServiceProvider],
            exports: [kongServiceProvider],
        };
    }
}
