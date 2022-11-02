---
pcx_content_type: concept
title: Sentry
weight: 1
---

# Sentry Pages Plugin

The Sentry Pages Plugin captures and logs all exceptions which occur below it in the execution chain of your Pages Functions. It is therefore recommended that you install this Plugin at the root of your application in `functions/_middleware.ts` as the very first Plugin.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-sentry
```

## Usage

```typescript
---
filename: functions/_middleware.ts
---
import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest: PagesFunction = sentryPlugin({
  dsn: "https://sentry.io/welcome/xyz",
});
```

The Plugin uses [Toucan](https://github.com/robertcepa/toucan-js). Refer to the Toucan README to [review the options it can take](https://github.com/robertcepa/toucan-js#other-options). `context`, `request`, and `event` are automatically populated and should not be manually configured.

If your [DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer/) is held as an environment variable or in KV, you can access it like so:

```typescript
---
filename: functions/_middleware.ts
---
import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest: PagesFunction<{
  SENTRY_DSN: string;
}> = (context) => {
  return sentryPlugin({ dsn: context.env.SENTRY_DSN })(context);
};
```

```typescript
---
filename: functions/_middleware.ts
---
import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest: PagesFunction<{
  KV: KVNamespace;
}> = async (context) => {
  return sentryPlugin({ dsn: await context.env.KV.get("SENTRY_DSN") })(context);
};
```

### Additional context

If you need to set additional context for Sentry (for example, user information or additional logs), use the `data.sentry` instance in any Function below the Plugin in the execution chain.

For example, you can access `data.sentry` and set user information like so:

```typescript
---
filename: functions/admin/_middleware.ts
---
import type { PluginData } from "@cloudflare/pages-plugin-sentry";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
  next,
}) => {
  // Authenticate the user from the request and extract user's email address
  const email = await getEmailFromRequest(request);

  data.sentry.setUser({ email });

  return next();
};
```

Again, the full list of features can be found in [Toucan's documentation](https://github.com/robertcepa/toucan-js#features).
