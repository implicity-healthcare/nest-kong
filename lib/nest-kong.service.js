"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var NestKongService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const KongClient_1 = require("./classes/KongClient");
const constants_1 = require("./constants");
const consumers_resource_1 = require("./classes/consumers.resource");
let NestKongService = NestKongService_1 = class NestKongService {
    constructor(kongClient, configuration, logger) {
        this.kongClient = kongClient;
        this.configuration = configuration;
        this.logger = logger;
        this.localService = configuration.service;
        this.logger = this.logger || new common_1.Logger(NestKongService_1.name);
        /**
         * Common service information
         */
        this.localService = configuration.service;
        /**
         * Kong fail checks
         */
        this.tries = 0;
        this.maxRetry = lodash_1.get(configuration, 'kong.maxRetry', 10);
        this.retryInterval = lodash_1.get(configuration, 'kong.retryInterval', 1000);
        this.setupProcessHandlers();
        this.consumers = new consumers_resource_1.KongConsumersResource(this.kongClient);
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.localService) {
                return;
            }
            return yield this.register();
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.localService) {
                return;
            }
            return yield this.unregister();
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Registering service to ${this.localService.upstream} ...`, NestKongService_1.name);
            try {
                this.localService = yield this.kongClient.register(this.localService);
                this.logger.log(`Registration succeeded.`, NestKongService_1.name);
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    this.logger.error(`> Maximum connection retry reached. Exiting.`);
                    process.exit(1);
                }
                this.logger.warn(`Registering the service to ${this.localService.upstream} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
                this.tries++;
                setTimeout(() => this.register(), this.retryInterval);
            }
        });
    }
    unregister() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.kongClient
                    .unregister(this.localService);
                this.logger.log(`Unregistered the service ${this.localService.upstream} successfully.`);
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    this.logger.error('Deregister the service fail.', e);
                }
                this.logger.warn(`Deregister the service fail, will retry after ${this.retryInterval}`);
                this.tries++;
                setTimeout(() => this.register(), this.retryInterval);
            }
        });
    }
    setupProcessHandlers() {
        /**
         * Process terminated manually.
         */
        process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
            yield this.unregister();
            process.exit(0);
        }));
        /**
         * Process terminated during its lifecycle.
         */
        process.on('exit', () => __awaiter(this, void 0, void 0, function* () {
            yield this.unregister();
            process.exit(0);
        }));
    }
    resetTriesCount() {
        this.tries = 0;
    }
};
NestKongService = NestKongService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.KONG_CLIENT_PROVIDER)),
    __param(2, common_1.Optional()),
    __metadata("design:paramtypes", [KongClient_1.Kong, Object, Object])
], NestKongService);
exports.NestKongService = NestKongService;
//# sourceMappingURL=nest-kong.service.js.map