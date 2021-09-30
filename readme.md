# Switch Functions

#### An adapter where you can define which function to run

## Installation

This is a **Node.js** module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the **npm install command**:

```prompt
npm install @badass-team-code/switch-functions
```

Or using the yarn:

```prompt
yarn add @badass-team-code/switch-functions
```

## Quick Start

After installation, you will have visibility of a function and an interface to use:

### Interface - AdapterOptions

With it you will have a guide to create the object that will need to assign the function as a parameter.

It receives two types as a parameter, they are:

- **first argument**: Thinking of it as an http request, the first argument would be the indication of which object we are going to analyze: `body` or `headers`

- **second argument**: The second argument will be from which key the value will be analyzed

```ts
import { AdapterOptions } from "@badass-team-code/switch-functions";

type Targets = "body" | "headers";
type Values = "authentication" | "authorization";

const options: AdapterOptions<Targets, Values> = [];
```

### Examples

Let's say you are creating a soccer player creation flow, the initial roster stays the same, but each team has its own unique characteristics in the roster, so you choose to use `adaptSwitchFunctions` to assist you.

Creating the object to use in the adapter:

```ts
type Targets = "body";
type Values = "sportClub" | "name";

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
```

So if the `sportClub` parameter is 1 or 2, it will be executed in different business rules.

To be executed, it is only necessary to assign the function:

```js
import {
  adaptSwitchFunctions,
  AdapterOptions,
} from "@badass-team-code/switch-functions";

const result = adaptSwitchFunctions(options);
```

## Express

Using lib with express. You can use it as **Middleware** or as a **Controller**.

Here is a usage example showing the two use cases:

```js
import { Router, Request, Response } from "express";
import {
  adaptSwitchFunctions,
  AdapterOptions,
} from "@badass-team-code/switch-functions";

type Targets = "body" | "params" | "query" | "headers";
type Values = "sportClub";

const options: AdapterOptions<Targets, Values> = [
  {
    target: {
      body: "sportClub",
    },
    expected: {
      sportClub: 1,
    },
    handle: (request: Request, response: Response) => {
      // Will run what club 1 needs
      return response.send();
    },
  },
  {
    handle: (request: Request, response: Response, next: NexFunction) => {
      // Here it will be executed if you do not enter in any case.
      return next();
    },
  },
];

const router = Router();

router.get("/", adaptSwitchFunctions(options));

export { router };
```
