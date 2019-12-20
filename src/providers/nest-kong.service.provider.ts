import {
    NestKongConfigurationNamespace
} from '../constants';
import { KongClient } from '../classes/KongClient';
import { KongModuleConfiguration } from '../interfaces';
import { NestKongService } from '../nest-kong.service';
import { ConfigService } from '@nestjs/config';

export const NestKongServiceProvider = {
    provide: NestKongService,
    inject: [
        KongClient,
        ConfigService
    ],
    useFactory: async (kongClient: KongClient, configService: ConfigService): Promise<NestKongService> => {
        return new NestKongService(kongClient, configService.get<KongModuleConfiguration>(NestKongConfigurationNamespace));
    },

};
