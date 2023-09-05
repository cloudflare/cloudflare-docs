---
pcx_content_type: concept
title: Environment variables
---

# Environment variables

## Background

Attach secrets, text strings, and JSON values as environment variables to your Worker. Environment variables are available on the [`env` parameter](/workers/runtime-apis/fetch-event/#parameters) passed to your Worker's [`fetch` event handler](/workers/runtime-apis/fetch-event/#syntax-es-modules).

Secrets are environment variables that are encrypted and not visible once set. They are used for storing sensitive information like API keys and auth tokens.

Text strings and JSON values are not encrypted and are useful for storing application configuration.

## Add environment variables via Wrangler

Text and JSON values are defined via the `[vars]` configuration in your `wrangler.toml` file. In the following example, `API_HOST` and `API_ACCOUNT_ID` are text values and `SERVICE_X_DATA` is a JSON value.

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"

[vars]
API_HOST = "example.com"
API_ACCOUNT_ID = "example_user"
SERVICE_X_DATA = { URL = "service-x-api.dev.example", MY_ID = 123 }
```

Refer to the following example on how to access the `API_HOST` environment variable in your Worker code:

```ts
---
filename: index.ts
---
export interface Env {
  API_HOST: string;
}
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    console.log(env.API_HOST)
  }
}
```

## Add environment variables via the dashboard

To add environment variables via the dashboard:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings**.
4. Under **Environment Variables**, select **Add variable**.
5. Input a **Variable name** and its **value**, which will be made available to your Worker.
6. If your variable is a secret, select **Encrypt** to protect its value. This will prevent the value from being visible via Wrangler and the dashboard.
7. (Optional) To add multiple environment variables, select **Add variable**.
8. Select **Save** to implement your changes.

{{<Aside type="warning" header="Plaintext strings and secrets">}}

Only select **Encrypt** if your environment variable is a secret. Otherwise, skip this step.

{{</Aside>}}

## Add secrets to your project

### Secrets in development

When developing your Worker locally, create a `.dev.vars` file in the root of your project to define secrets that will be available to your Worker when running `wrangler dev`.

The `.dev.vars` file should be formatted like a `dotenv` file.

```bash
---
header: .dev.vars
---
SECRET_KEY=value
API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### Secrets on deployed Workers

To add a secret to a Worker, run the [`wrangler secret put <KEY>`](/workers/wrangler/commands/#secret) in your terminal, where `<KEY>` is the name of your secret:

```sh
---
filename: wrangler secret put
---
$ wrangler secret put <KEY>
```

To add a secret to a Worker using the Cloudflare dashboard, follow the [environment variables setup instructions](/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard) and make sure to encrypt your secret.

{{<Aside type="warning" header="Use secrets for sensitive information">}}

Do not use plaintext environment variables to store sensitive information. Use [`wrangler secret put`](/workers/wrangler/commands/#secret) instead.

{{</Aside>}}

## Compare secrets and environment variables

Secrets are environment variables. The difference is secret values are not visible within Wrangler or dashboard interfaces after you define them. This means that sensitive data, including passwords or API tokens, should always be encrypted to prevent data leaks. To your Worker, there is no difference between an environment variable and a secret. The secret's value is passed through as defined.