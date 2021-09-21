import { formateToLowerCase } from "@badass-team-code/formatted-cases-words";

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
export type AdapterOptions<
  T extends string | number | symbol,
  Y extends string | number | symbol
> = {
  target?: Partial<Record<T, Y>>;
  expected?: Partial<Record<Y, any>>;
  handle: Function;
}[];

const checkIfTestsPass = (checkArray: any[]) => {
  const findNonComplianceResult = checkArray.find((value) => value === false);
  return findNonComplianceResult !== false;
};

const filterHttpRequestByTarget = (
  request: { [key: string]: any },
  target: { [key: string]: any }
) =>
  Object.keys(target).reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: request?.[currentValue],
    }),
    {}
  );

const convertTargetForLowerCaseEntities = (target: { [key: string]: any }) =>
  Object.entries(target).map(([key, value]) => [
    String(key).toLocaleLowerCase(),
    String(value).toLocaleLowerCase(),
  ]);

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
const adaptSwitchFunctions =
  (switchMiddlewareOptions: AdapterOptions<any, any>) =>
  (...middlewareParams: any) => {
    const [rawHttpRequest] = middlewareParams;

    for (const options of switchMiddlewareOptions) {
      if (!options.target) return options.handle(...middlewareParams);

      const filteredHttRequest = filterHttpRequestByTarget(
        rawHttpRequest,
        options.target
      );

      const httpRequestToLowerCaseKeys = formateToLowerCase(filteredHttRequest);

      const targetEntries = convertTargetForLowerCaseEntities(options.target);

      const expectedToLowerCaseKeys = formateToLowerCase(options.expected);

      const testsResults = targetEntries.map((entries) => {
        const targetRequestKey = entries[0] as string;
        const targetRequestValue = entries[1] as string;

        if (Array.isArray(targetRequestValue)) {
          const conditionResultExtractedFromArray = (() => {
            const testsResult = targetRequestValue.map((value) => {
              const requestValue =
                httpRequestToLowerCaseKeys?.[targetRequestKey]?.[value];

              if (!options.expected && requestValue) return true;

              const expectedValue = expectedToLowerCaseKeys?.[value];

              return requestValue === expectedValue;
            });

            return checkIfTestsPass(testsResult);
          })();

          return conditionResultExtractedFromArray;
        }

        const requestValue =
          httpRequestToLowerCaseKeys?.[targetRequestKey]?.[targetRequestValue];

        if (!options.expected) return true;

        const expectedValue = expectedToLowerCaseKeys?.[targetRequestValue];

        const testResult = requestValue === expectedValue;

        return testResult;
      });

      const passedTheTest = checkIfTestsPass(testsResults);

      if (passedTheTest) return options.handle(...middlewareParams);
    }
  };

export { adaptSwitchFunctions };
