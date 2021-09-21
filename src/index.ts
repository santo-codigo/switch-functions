import { adaptSwitchFunctions, AdapterOptions } from "./switch";

type Values = "sportClub" | "name";
type Targets = "body";

const options: AdapterOptions<Targets, Values> = [
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

console.log(adaptSwitchFunctions(options));
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
