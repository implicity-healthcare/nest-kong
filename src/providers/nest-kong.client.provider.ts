import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KongModuleConfiguration } from '../interfaces';
import { KongClient } from '../classes/KongClient';
import { NestKongConfigurationNamespace } from '../constants';

export const NestKongClientProvider: Provider = {
        provide: KongClient,
        inject: [
            ConfigService
        ],
        useFactory: async (configService: ConfigService): Promise<any> => {
            const options = configService.get<KongModuleConfiguration>(NestKongConfigurationNamespace);

            if (!options)
                throw new Error(`Missing configuration from @nestjs/config. Please register Nest-Kong configuration under the '${NestKongConfigurationNamespace}' namespace`);

            return new KongClient(options.kong);
        }
}
