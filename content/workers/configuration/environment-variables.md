---
pcx_content_type: configuration
title: Environment variables
---

# Environment variables

## Background

Attach text strings and JSON values as environment variables to your Worker. Environment variables are available on the [`env` parameter](/workers/runtime-apis/fetch-event/#parameters) passed to your Worker's [`fetch` event handler](/workers/runtime-apis/fetch-event/#syntax-es-modules).

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
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings**.
4. Under **Environment Variables**, select **Add variable**.
5. Input a **Variable name** and its **value**, which will be made available to your Worker.
6. (Optional) To add multiple environment variables, select **Add variable**.
7. Select **Save** to implement your changes.

{{<Aside type="warning" header="Plaintext strings and secrets">}}

Only select **Encrypt** if your environment variable is a [secret](/workers/configuration/secrets/).

{{</Aside>}}

{{<render file="_env_and_secrets.md">}}
