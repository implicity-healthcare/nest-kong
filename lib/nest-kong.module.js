"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var NestKongModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const KongClient_1 = require("./classes/KongClient");
const nest_kong_service_1 = require("./nest-kong.service");
let NestKongModule = NestKongModule_1 = class NestKongModule {
    static init(options) {
        const kongConfigurationProvider = {
            provide: constants_1.KONG_CONFIGURATION_PROVIDER,
            useFactory: () => {
                /**
                 * TODO: lean the configuration with default properties.
                 */
                return options;
            },
        };
        /**
         * Configure kong client by connecting to the client agent
         * and register the current API if configuration is provided.
         */
        const kongClientProvider = {
            provide: constants_1.KONG_CLIENT_PROVIDER,
            useFactory: () => __awaiter(this, void 0, void 0, function* () {
                return yield new KongClient_1.Kong(options.kong);
            }),
        };
        const kongServiceProvider = {
            provide: constants_1.KONG_SERVICE_PROVIDER,
            useFactory: (kongClient, kongConfiguration) => __awaiter(this, void 0, void 0, function* () {
                return new nest_kong_service_1.NestKongService(kongClient, kongConfiguration);
            }),
            inject: [constants_1.KONG_CLIENT_PROVIDER, constants_1.KONG_CONFIGURATION_PROVIDER],
        };
        return {
            module: NestKongModule_1,
            providers: [kongConfigurationProvider, kongClientProvider, kongServiceProvider],
            exports: [kongServiceProvider],
        };
    }
};
NestKongModule = NestKongModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], NestKongModule);
exports.NestKongModule = NestKongModule;
//# sourceMappingURL=nest-kong.module.js.map