"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class KongConsumersResource {
    constructor(kongClient) {
        this.kongClient = kongClient;
    }
    create(username, custom_id, tags = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kongClient
                .request({
                url: '/consumers',
                method: 'POST',
                data: {
                    username,
                    custom_id,
                    tags,
                },
            });
        });
    }
    retrieve(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kongClient
                .request({
                url: `/consumers/${username}`,
                method: 'GET',
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kongClient
                .request({
                url: `/consumers`,
                method: 'GET',
            });
        });
    }
    update(identifier, consumer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kongClient
                .request({
                url: `/consumers/${identifier}`,
                method: 'PUT',
                data: consumer,
            });
        });
    }
    remove(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kongClient
                .request({
                url: `/consumers/${identifier}`,
                method: 'DELETE',
            });
        });
    }
    generateApiKey(consumer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kongClient
                .request({
                url: `/consumers/${consumer_id}/key-auth`,
                method: 'POST',
            });
        });
    }
    removeApiKey(consumer_id, key_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.kongClient
                .request({
                url: `/consumers/${consumer_id}/key-auth/${key_id}`,
                method: 'DELETE',
            });
        });
    }
}
exports.KongConsumersResource = KongConsumersResource;
//# sourceMappingURL=consumers.resource.js.map