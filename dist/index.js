"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSwitchMiddleware = void 0;
const object_1 = require("../../utils/object");
const checkIfTestsPass = (checkArray) => {
    const findNonComplianceResult = checkArray.find((value) => value === false);
    return findNonComplianceResult !== false;
};
const filterHttpRequestByTarget = (request, target) => Object.keys(target).reduce((accumulator, currentValue) => ({
    ...accumulator,
    [currentValue]: request?.[currentValue],
}), {});
const convertTargetForLowerCaseEntities = (target) => Object.entries(target).map(([key, value]) => [
    String(key).toLocaleLowerCase(),
    String(value).toLocaleLowerCase(),
]);
const adaptSwitchMiddleware = (switchMiddlewareOptions) => (...middlewareParams) => {
    const [rawHttpRequest] = middlewareParams;
    for (const options of switchMiddlewareOptions) {
        if (!options.target)
            return options.handle(...middlewareParams);
        const filteredHttRequest = filterHttpRequestByTarget(rawHttpRequest, options.target);
        const httpRequestToLowerCaseKeys = (0, object_1.formateToLowerCase)(filteredHttRequest);
        const targetEntries = convertTargetForLowerCaseEntities(options.target);
        const expectedToLowerCaseKeys = (0, object_1.formateToLowerCase)(options.expected);
        const testsResults = targetEntries.map((entries) => {
            const targetRequestKey = entries[0];
            const targetRequestValue = entries[1];
            if (Array.isArray(targetRequestValue)) {
                const conditionResultExtractedFromArray = (() => {
                    const testsResult = targetRequestValue.map((value) => {
                        const requestValue = httpRequestToLowerCaseKeys?.[targetRequestKey]?.[value];
                        if (!options.expected && requestValue)
                            return true;
                        const expectedValue = expectedToLowerCaseKeys?.[value];
                        return requestValue === expectedValue;
                    });
                    return checkIfTestsPass(testsResult);
                })();
                return conditionResultExtractedFromArray;
            }
            const requestValue = httpRequestToLowerCaseKeys?.[targetRequestKey]?.[targetRequestValue];
            if (!options.expected)
                return true;
            const expectedValue = expectedToLowerCaseKeys?.[targetRequestValue];
            const testResult = requestValue === expectedValue;
            return testResult;
        });
        const passedTheTest = checkIfTestsPass(testsResults);
        if (passedTheTest)
            return options.handle(...middlewareParams);
    }
};
exports.adaptSwitchMiddleware = adaptSwitchMiddleware;
//# sourceMappingURL=index.js.map