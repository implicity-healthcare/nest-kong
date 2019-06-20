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
const axios_1 = require("axios");
class Kong {
    constructor(options) {
        this.options = options;
        const protocol = options.secure ? 'https' : 'http';
        const port = (options.port && options.port !== 80 && options.port !== 443)
            ? `:${options.port}` : '';
        this.baseUrl = `${protocol}://${options.host}${port}`;
        this.axios = axios_1.default.create({ baseURL: this.baseUrl });
    }
    register(target) {
        return __awaiter(this, void 0, void 0, function* () {
            if (target.id) {
                throw new KongConflictError('Target Already registered');
            }
            const path = `/upstreams/${target.upstream}/targets`;
            return yield this.axios
                .post(path, target)
                .then(response => Object.assign(response.data, target));
        });
    }
    unregister(target) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!target.id) {
                throw new InvalidTargetError('Missing target identifier');
            }
            return yield this.axios
                .delete(`/upstreams/${target.upstream}/targets/${target.id}`)
                .then(_ => true);
        });
    }
    request(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.axios
                .request(configuration)
                .then(response => response.data);
        });
    }
}
exports.Kong = Kong;
class KongConflictError extends Error {
}
exports.KongConflictError = KongConflictError;
class InvalidTargetError extends Error {
}
exports.InvalidTargetError = InvalidTargetError;
//# sourceMappingURL=KongClient.js.map