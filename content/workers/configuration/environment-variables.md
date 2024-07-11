---
pcx_content_type: configuration
title: Environment variables
meta:
  description: Attach text strings and JSON values as environment variables to your Worker.
---

# Environment variables

## Background

Environment variables are a type of binding that allow you to attach text strings or JSON values to your Worker. Environment variables are available on the [`env` parameter](/workers/runtime-apis/handlers/fetch/#parameters) passed to your Worker's [`fetch` event handler](/workers/runtime-apis/handlers/fetch/).

Text strings and JSON values are not encrypted and are useful for storing application configuration.

## Add environment variables via Wrangler

Text and JSON values are defined via the `[vars]` configuration in your `wrangler.toml` file. In the following example, `API_HOST` and `API_ACCOUNT_ID` are text values and `SERVICE_X_DATA` is a JSON value.

{{<render file="_envvar-example.md">}}

Refer to the following example on how to access the `API_HOST` environment variable in your Worker code:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: index.js
---
export default {
  async fetch(request, env, ctx) {
    return new Response(`API host: ${env.API_HOST}`);
  }
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: index.ts
---
export interface Env {
  API_HOST: string;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    return new Response(`API host: ${env.API_HOST}`);
  }
} satisfies ExportedHandler<Env>;
```
{{</tab>}}
{{</tabs>}}

`vars` is a non-inheritable key. [Non-inheritable keys](/workers/wrangler/configuration/#non-inheritable-keys) are configurable at the top-level, but cannot be inherited by environments and must be specified for each environment.

To define environment variables for different environments, refer to the example below:

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"

[env.staging.vars]
API_HOST = "staging.example.com"
API_ACCOUNT_ID = "staging_example_user"
SERVICE_X_DATA = { URL = "service-x-api.dev.example", MY_ID = 123 }

[env.production.vars]
API_HOST = "production.example.com"
API_ACCOUNT_ID = "production_example_user"
SERVICE_X_DATA = { URL = "service-x-api.prod.example", MY_ID = 456 }
```

For local development with `wrangler dev`, variables in `wrangler.toml` are automatically overridden by any values defined in a `.dev.vars` file located in the root directory of your worker. This is useful for providing values you do not want to check in to source control.

```shell
---
filename: .dev.vars
---
API_HOST = "localhost:4000"
API_ACCOUNT_ID = "local_example_user"
```

Alternatively, you can specify per-environment values in `wrangler.toml` and provide an `environment` value via the `env` flag when developing locally like so `wrangler dev --env=local`.

## Add environment variables via the dashboard

To add environment variables via the dashboard:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker.
4. Select **Settings**.
5. Select **Variables**.
6. Under **Environment Variables**, select **Add variable**.
7. Input a **Variable name** and its **Value**, which will be made available to your Worker.
8. (Optional) To add multiple environment variables, select **Add variable**.
9. Select **Save and deploy** to implement your changes.

{{<Aside type="warning" header="Plaintext strings and secrets">}}

Only select **Encrypt** if your environment variable is a [secret](/workers/configuration/secrets/).

{{</Aside>}}

{{<render file="_env_and_secrets.md">}}

## Related resources

* Learn how to access environment variables in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
