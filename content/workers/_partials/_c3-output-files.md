---
_build:
  publishResources: false
  render: never
  list: never
---

In your Worker project directory, C3 has generated the following:

1. `wrangler.toml`: A [Wrangler](/workers/wrangler/configuration/) configuration file.
2. `index.js` or `index.ts` (in `/src`): A minimal `'Hello World!'` Worker written in [ES modules](/workers/reference/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [`npm` documentation on `package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [`npm` documentation `node_modules`](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).