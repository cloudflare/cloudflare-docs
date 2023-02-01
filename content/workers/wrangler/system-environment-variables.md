---
pcx_content_type: configuration
title: System Environment Variables
weight: 5
---

# System Environment Variables

System Environment Variables are local environment variables that can change Wrangler's behavior. There are three ways to set System Environment Variables:

1. Create an `.env` file in your project directory. Set the values of your environment variables in your [`.env`](/workers/wrangler/system-environment-variables/#example-env-file) file. This is the recommended way to set these variables, as it persists the values between Wrangler sessions.

2. Inline the values in your Wrangler command. For example, `WRANGLER_LOG="debug" wrangler publish` will set the value of `WRANGLER_LOG` to `"debug"` for this execution of the command.

3. Set the values in your shell environment. For example, if you are using Z shell, adding `export CLOUDFLARE_API_TOKEN=...` to your `~/.zshrc` file will set this token as part of your shell configuration.

## Supported environment variables

Wrangler supports the following environment variables:

{{<definitions>}}

- `CLOUDFLARE_ACCOUNT_ID` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The account ID for the Workers related account, can be [found in the Cloudflare dashboard](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/), can usually be inferred by Wrangler.

- `CLOUDFLARE_API_TOKEN` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The [API token](/fundamentals/api/get-started/create-token/) for your Cloudflare account, can be used for authentication for situations like CI/CD, and other automation.

- `CLOUDFLARE_API_KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The API key for your Cloudflare account, usually used for older authentication method with `CLOUDFLARE_EMAIL=`.

- `CLOUDFLARE_EMAIL` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The email address associated with your Cloudflare account, usually used for older authentication method with `CLOUDFLARE_API_KEY=`.

- `WRANGLER_SEND_METRICS` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Options for this are `true` and `false`, the default behavior is `false`.

- `CLOUDFLARE_API_BASE_URL` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The default value is `"https://api.cloudflare.com/client/v4"`.

- `WRANGLER_LOG` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Options for Logging levels are `"none"`, `"error"`, `"warn"`, `"info"`, `"log"` and `"debug"`.

{{</definitions>}}

## Example `.env` file

The following is an example `.env` file:

```bash
CLOUDFLARE_ACCOUNT_ID=<YOUR_ACCOUNT_ID_VALUE>
CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN_VALUE>
CLOUDFLARE_EMAIL=<YOUR_EMAIL>
WRANGLER_SEND_METRICS=true
CLOUDFLARE_API_BASE_URL=https://api.cloudflare.com/client/v4
WRANGLER_LOG=debug
```

## Deprecated global variables

The following variables are deprecated. Use the new variables listed above to prevent any issues or unwanted messaging.

- `CF_ACCOUNT_ID`
- `CF_API_TOKEN`
- `CF_API_KEY`
- `CF_EMAIL`
- `CF_API_BASE_URL`
