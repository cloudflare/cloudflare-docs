---
pcx_content_type: concept
title: Stytch
weight: 1
---

# Stytch Pages Plugin

The Stytch Pages Plugin is a middleware which validates all requests and their `session_token`.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-stytch
```

## Usage

```typescript
---
filename: functions/_middleware.ts
---
import stytchPlugin from "@cloudflare/pages-plugin-stytch";
import { envs } from "@cloudflare/pages-plugin-stytch/api";

export const onRequest: PagesFunction = stytchPlugin({
  project_id: "YOUR_STYTCH_PROJECT_ID",
  secret: "YOUR_STYTCH_PROJECT_SECRET",
  env: envs.live
});
```

We recommend storing your secret in KV rather than in plain text as above.

The Stytch Plugin takes a single argument, an object with several properties. `project_id` and `secret` are mandatory strings and can be found in [Stytch's dashboard](https://stytch.com/dashboard/api-keys). `env` is also a mandatory string, and can be populated with the `envs.test` or `envs.live` variables in the API. By default, the Plugin validates a `session_token` cookie of the incoming request, but you can also optionally pass in a `session_token` or `session_jwt` string yourself if you are using some other mechanism to identify user sessions. Finally, you can also pass in a `session_duration_minutes` in order to extend the lifetime of the session. More information on these parameters can be found in [Stytch's documentation](https://stytch.com/docs/api/session-auth).

The validated session response containing user information is made available to subsequent Pages Functions on `data.stytch.session`.
