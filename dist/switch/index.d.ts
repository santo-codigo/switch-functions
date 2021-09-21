/**
 * Implementation interface for the role adapter
 *
 * @access     public
 *
 * @param {Object} [target] The target is for you to identify which parameter will be analyzed the value.
 *
 * @param {Object} [expected] In expected will be informed of the value that must match the __target__.
 *
 * @param {Object} [handle] The function that will be executed if the step is true.
 *
 */
export declare type AdapterOptions<T extends string | number | symbol, Y extends string | number | symbol> = {
    target?: Partial<Record<T, Y>>;
    expected?: Partial<Record<Y, any>>;
    handle: Function;
}[];
/**
 * Function that handles the received json, and identifies which part will execute
 *
 * @access  public
 *
 * @param {Object} [AdapterOptions] Multiple execution options.
 *
 *
 * @return {type} Returns the entire result of the functions that were executed.
 */
declare const adaptSwitchFunctions: (switchMiddlewareOptions: AdapterOptions<any, any>) => (...middlewareParams: any) => any;
export { adaptSwitchFunctions };
