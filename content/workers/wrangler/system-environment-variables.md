---
pcx_content_type: how-to
title: System Environment Variables
weight: 5
---

## System Environment Variables

System Environment Variables are local environment variables that can change Wrangler's behavior. You can set them by:

1. Setting the values in a [`.env`](http://localhost:1313/workers/wrangler/system-environment-variables/#examples-in-env-file) file in your project directory. This is the recommended way to set these variables, as it persists the values between Wrangler sessions.
2. Inlining the values in your Wrangler command. For example, `WRANGLER_LOG="debug" wrangler publish` will set the value of `WRANGLER_LOG` to "debug" for this execution of the command.
3. Setting the values in your shell environment persists depending on the shell settings, for example `export CF_API_TOKEN=...`.

### Wrangler supports the following System Environment Variables:

{{<definitions>}}

- `CLOUDFLARE_ACCOUNT_ID` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The account ID for the Workers related account, can be found in the Cloudflare dashboard, can usually be inferred by Wrangler.

- `CLOUDFLARE_API_TOKEN` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The [API token](https://developers.cloudflare.com/api/get-started/create-token/) for your Cloudflare account, can be used for authentication for situations like CI/CD, and other automation.

- `CLOUDFLARE_API_KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The API key for your Cloudflare account, usually used for older authentication method with `CLOUDFLARE_EMAIL=`.

- `CLOUDFLARE_EMAIL` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The email address associated with your Cloudflare account, usually used for older authentication method with `CLOUDFLARE_API_KEY=`.

- `WRANGLER_SEND_METRICS` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Options for this are `true` and `false`, the default behavior is `false`.

- `CLOUDFLARE_API_BASE_URL` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The default value is https://api.cloudflare.com/client/v4.

- `WRANGLER_LOG` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Options for Logging levels are "none", "error", "warn", "info", "log" and "debug".

{{</definitions>}}

### Example `.env` file:

```bash
CLOUDFLARE_ACCOUNT_ID=00aa000000a00000a0aa00a000a00xxx
CLOUDFLARE_API_TOKEN=XXXXXXXXXXXXXXXXXXX
CLOUDFLARE_EMAIL=fakeemail@void.com
WRANGLER_SEND_METRICS=true
CLOUDFLARE_API_BASE_URL=https://api.cloudflare.com/client/v3
WRANGLER_LOG=debug
```

### Deprecated global variables are:

These variables are deprecated. Please use the new variables listed above, to prevent any issues or unwanted messaging.

- CF_ACCOUNT_ID
- CF_API_TOKEN
- CF_API_KEY
- CF_EMAIL
- CF_API_BASE_URL
