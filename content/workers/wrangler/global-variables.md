---
pcx_content_type: how-to
title: Global Variables
weight: 5
---

## Global Variables

Global variables are process environment variables that are available to Wrangler commands. These variables are used to configure Wrangler's behavior. They can be set in a variety of ways, including:

- Setting them `.env` file in the project directory this is the recommended & persistent way to set these variables.
- Inlining them in your Wrangler command for one-off use cases, for example `WRANGLER_LOG="debug" wrangler publish`.
- Setting them in your shell environment persists depending on the shell settings, for example `export CF_API_TOKEN=...`.

**Currently, Wrangler supports the following global variables:**

- "CLOUDFLARE_ACCOUNT_ID": The account ID for the Workers related account, can be found in the Cloudflare dashboard, can usually be inferred by Wrangler.
- "CLOUDFLARE_API_TOKEN": The API token for your Cloudflare account, can be used for authentication for situations like CI/CD, and other automation.
- "CLOUDFLARE_API_KEY": The API key for your Cloudflare account, usually used for older authentication method with `CLOUDFLARE_EMAIL=`.
- "CLOUDFLARE_EMAIL": The email address associated with your Cloudflare account, usually used for older authentication method with `CLOUDFLARE_API_KEY=`.
- "WRANGLER_SEND_METRICS": Options for this are `true` and `false`, the default behavior is `false`.
- "CLOUDFLARE_API_BASE_URL": The default value is "https://api.cloudflare.com/client/v4".
- "WRANGLER_LOG": Options for Logging levels are "none", "error", "warn", "info", "log" and "debug".

examples in `.env` file:

```text
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_EMAIL=...
WRANGLER_SEND_METRICS=true
CLOUDFLARE_API_BASE_URL=https://api.cloudflare.com/client/v3
WRANGLER_LOG=debug
```

**Deprecated global variables are:**
These variables are deprecated. Please use the new variables listed above, to prevent any issues or unwanted messaging.

- CF_ACCOUNT_ID
- CF_API_TOKEN
- CF_API_KEY
- CF_EMAIL
- CF_API_BASE_URL
