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

        const kongConfigurationProvider = {
            provide: KONG_CONFIGURATION_PROVIDER,
            useFactory: (configService: ConfigService): KongModuleConfiguration => configService.get<KongModuleConfiguration>('NKong', options),
            inject: [ConfigService]
        };

        /**
         * Configure kong client by connecting to the client agent
         * and register the current API if configuration is provided.
         */
        const kongClientProvider = {
            provide: KONG_CLIENT_PROVIDER,
            useFactory: async (configuration: KongModuleConfiguration): Promise<any> => {
                new Kong(options.kong)
            },
            inject: [KONG_CONFIGURATION_PROVIDER]
        };

        const kongServiceProvider = {
            provide: KONG_SERVICE_PROVIDER,
            useFactory: async (kongClient: Kong, kongConfiguration: KongModuleConfiguration): Promise<NestKongService> => {
                return new NestKongService(kongClient, kongConfiguration);
            },
            inject: [KONG_CLIENT_PROVIDER, KONG_CONFIGURATION_PROVIDER],
        };

        return {
            module: NestKongModule,
            providers: [kongConfigurationProvider, kongClientProvider, kongServiceProvider],
            exports: [kongServiceProvider],
        };
    }
}
