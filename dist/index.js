"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switch_1 = require("./switch");
const options = [
    {
        target: {
            body: "sportClub",
        },
        expected: {
            sportClub: 1,
        },
        handle: () => {
            // Will run what club 1 needs
        },
    },
    {
        target: {
            body: "sportClub",
        },
        expected: {
            sportClub: 2,
        },
        handle: () => {
            // Will run what club 2 needs
        },
    },
    {
        handle: () => {
            // Here it will be executed if you do not enter in any case.
        },
    },
];
console.log((0, switch_1.adaptSwitchFunctions)(options));
/*
export type AdapterOptions<T = any> = {
  target?: {
    body?: string;
    params?: string;
    query?: string;
    headers?: string;
    [key: string]: string | undefined;
  };
  expected?: { [key: string]: any };
  handle: Function;
}[];
*/
//# sourceMappingURL=index.js.map