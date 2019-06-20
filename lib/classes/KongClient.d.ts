import { KongClientOptions, KongTarget } from '../interfaces';
import { AxiosRequestConfig } from 'axios';
export declare class Kong {
    private options;
    private baseUrl;
    private axios;
    constructor(options: KongClientOptions);
    register(target: KongTarget): Promise<KongTarget>;
    unregister(target: KongTarget): Promise<any>;
    request(configuration: AxiosRequestConfig): Promise<any>;
}
export declare class KongConflictError extends Error {
}
export declare class InvalidTargetError extends Error {
}
//# sourceMappingURL=KongClient.d.ts.map