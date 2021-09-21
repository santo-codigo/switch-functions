export declare type adapterOptions = {
    target?: {
        body?: string;
        params?: string;
        query?: string;
        headers?: string;
        [key: string]: string | undefined;
    };
    expected?: {
        [key: string]: any;
    };
    handle: Function;
}[];
declare const adaptSwitchMiddleware: (switchMiddlewareOptions: adapterOptions) => (...middlewareParams: any) => any;
export { adaptSwitchMiddleware };
