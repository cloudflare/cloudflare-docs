---
pcx_content_type: concept
title: Environment variables
---

# Environment variables

Environment variables, such as `vars` and secrets, are known as bindings.

## Environment variables via Wrangler

### Add environment variables via `wrangler.toml`

Environment variables are defined via the `[vars]` configuration in your `wrangler.toml` file. Environment variables are always plaintext or JSON values, represented using the [inline table toml syntax](https://toml.io/en/v1.0.0#inline-table).

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"

# Define top-level environment variables
# under the `[vars]` block using
# the `key = "value"` format
[vars]
API_TOKEN = "example_dev_token"
STRIPE_TOKEN = "pk_xyz1234_test"
SERVICE_X_DATA = { URL = "service-x-api.dev.example", API_KEY = "my-service-x-dev-api-key", MY_ID = 123 }

# Override values for `--env production` usage
[env.production]
name = "my-worker-production"
[env.production.vars]
API_TOKEN = "example_production_token"
STRIPE_TOKEN = "pk_xyz1234"
SERVICE_X_DATA = { URL = "service-x-api.prod.example", API_KEY = "my-service-x-prod-api-key", MY_ID = 123 }
```

These environment variables can then be accessed within your Worker script as global variables. They will be either plaintext strings or json objects.

```js
// Worker code:
console.log(API_TOKEN);
//=> (default) "example_dev_token"
//=> (env.production) "example_production_token"

console.log(STRIPE_TOKEN);
//=> (default) "pk_xyz1234_test"
//=> (env.production) "pk_xyz1234"

console.log(JSON.stringify(SERVICE_X_DATA)):
//=> (default) {"API_KEY":"my-service-x-dev-api-key","MY_ID":123,"URL":"service-x-api.dev.example"}
//=> (env.production) {"API_KEY":"my-service-x-prod-api-key","MY_ID":123,"URL":"service-x-api.prod.example"}
```

If using [Workers written in ES modules format](/workers/learning/migrate-to-module-workers/), your environment variables are available on the [`env` parameter](/workers/runtime-apis/fetch-event/#parameters) passed to your Worker's [`fetch` event handler](/workers/runtime-apis/fetch-event/#syntax-module-worker). Refer to the following example:

```ts
export interface Env {
  API_TOKEN: string;
}
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    console.log(env.API_TOKEN)
  }
}
```

### Add secrets to your project

#### Secrets in development

When developing your Worker or Pages Functions, create a `.dev.vars` file in the root of your project to define variables that will be used when running `wrangler dev` or `wrangler pages dev`, as opposed to using another environment and `[vars]` in `wrangler.toml`. This works both in the local and remote development modes.

The `.dev.vars` file should be formatted like a `dotenv` file, such as `KEY=VALUE`.

```bash
---
header: .dev.vars
---
SECRET_KEY=value
```

#### Secrets on deployed Workers

Secrets are defined by running [`wrangler secret put <KEY>`](/workers/wrangler/commands/#secret) in your terminal, where `<KEY>` is the name of your binding. You may assign environment-specific secrets by rerunning the command `wrangler secret put <KEY> -e` or `wrangler secret put <KEY> --env`. Keep a detailed list of the secrets used in your code in your `wrangler.toml` file, like the example under `[vars]`:

```toml
---
filename: wrangler.toml
---
[vars]
# ...

# ...

# The necessary secrets are:
# - SPARKPOST_KEY
# - GTOKEN_PRIVKEY
# - GTOKEN_KID
# Run `echo <VALUE> | wrangler secret put <NAME>` for each of these
```

{{<Aside type="warning" header="Use secrets for sensitive information">}}

Do not use plaintext environment variables to store sensitive information. Use [`wrangler secret put`](/workers/wrangler/commands/#secret) instead.

{{</Aside>}}

## Environment variables via the dashboard

### Add environment variables via the dashboard

To add environment variables, such as `vars` and `secret`, via the dashboard:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings**.
4. Under **Environment Variables**, select **Add variable**.
5. Input a **Variable name** and its **value**, which will be made available to your Worker.
6. If your variable is a secret, select **Encrypt** to protect its value. This will prevent the value from being visible via Wrangler and the dashboard.
7. (Optional) To add multiple environment variables, select **Add variable**.
8. Select **Save** to implement your changes.

![After selecting Add variable, you will be directed to an environment variables configuration page to set up your environment variable name and value](/images/workers/platform/env_variables_dash.png)

{{<Aside type="warning" header="Plaintext strings and secrets">}}

Do not select **Encrypt** when adding environment variables if your variable is not a secret. Skip step 3 if your variable's value is a plaintext string and does not need to be encrypted.

{{</Aside>}}

## Compare secrets and environment variables

Secrets are environment variables. The difference is secret values are not visible within Wrangler or dashboard interfaces after you define them. This means that sensitive data, including passwords or API tokens, should always be encrypted to prevent data leaks. To your Worker, there is no difference between an environment variable and a secret. The secret's value is passed through as defined.
