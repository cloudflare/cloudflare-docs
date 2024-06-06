---
_build:
  publishResources: false
  render: never
  list: never
---

### Dashboard

Editing in the dashboard is helpful for simpler use cases.

Once you have created your Worker script, you can edit and deploy your Worker using the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. Select your application.
4. Select **Edit Code**.

  ![Edit code directly within the Cloudflare dashboard](/images/workers/workers-edit-code.png)

### Wrangler CLI

To develop more advanced applications or [implement tests](/workers/testing/), start working in the Wrangler CLI.

1. Install [`npm`](https://docs.npmjs.com/getting-started).
2. Install [`Node.js`](https://nodejs.org/en/).

  {{<Aside type="note" header="Node.js version manager">}}
  Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.
  {{</Aside>}}

3. Run the following command, replacing the value of `[<DIRECTORY>]` which the location you want to put your Worker Script.

  {{<tabs labels="npm | yarn | pnpm | bun">}}
  {{<tab label="npm" default="true">}}
  ```sh
  $ npm create cloudflare [<DIRECTORY>] -- --type=pre-existing
  ```
  {{</tab>}}
  {{<tab label="yarn">}}
  ```sh
  $ yarn create cloudflare [<DIRECTORY>] --type=pre-existing
  ```
  {{</tab>}}
  {{<tab label="pnpm">}}
  ```sh
  $ pnpm create cloudflare [<DIRECTORY>] --type=pre-existing
  ```
  {{</tab>}}
  {{<tab label="bun">}}
  ```sh
  $ bun create cloudflare [<DIRECTORY>] --type=pre-existing
  ```
  {{</tab>}}
  {{</tabs>}}

After you run this command - and work through the prompts - your local changes will not automatically sync with dashboard. So, once you download your script, continue using the CLI.