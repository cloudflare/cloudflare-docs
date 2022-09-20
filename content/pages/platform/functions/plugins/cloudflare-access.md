---
pcx_content_type: concept
title: Cloudflare Access
weight: 1
---

# Cloudflare Access Pages Plugin

The Cloudflare Access Pages Plugin is a middleware to validate Cloudflare Access JWT assertions. It also includes an API to lookup additional information about a given user's JWT.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-cloudflare-access
```

## Usage

```typescript
---
filename: functions/_middleware.ts
---
import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction = cloudflareAccessPlugin({
  domain: "https://test.cloudflareaccess.com",
  aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
});
```

The Plugin takes an object with two properties: the `domain` of your Cloudflare Access account, and the policy `aud` (audience) to validate against. Any requests which fail validation will be returned a `403` status code.

### Access the JWT payload

If you need to use the JWT payload in your application (for example, you need the user's email address), this Plugin will make this available for you at `data.cloudflareAccess.JWT.payload`.

For example:

```typescript
---
filename: functions/greet.ts
---
import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
}) => {
  return new Response(
    `Hello, ${data.cloudflareAccess.JWT.payload.email || "service user"}!`
  );
};
```

The [entire JWT payload](/cloudflare-one/identity/authorization-cookie/validating-json/#payload) will be made available on `data.cloudflareAccess.JWT.payload`. Be aware that the fields available differ between identity authorizations (for example, a user in a browser) and non-identity authorizations (for example, a service token).

### Look up identity

In order to get more information about a given user's identity, use the provided `getIdentity` API function:

```typescript
---
filename: functions/greet.ts
---
import { getIdentity } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest: PagesFunction = async ({ data }) => {
  const identity = await getIdentity({
    jwt: "eyJhbGciOiJIUzI1NiIsImtpZCI6IjkzMzhhYmUxYmFmMmZlNDkyZjY0NmE3MzZmMjVhZmJmN2IwMjVlMzVjNjI3YmU0ZjYwYzQxNGQ0YzczMDY5YjgiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiOTdlMmFhZTEyMDEyMWY5MDJkZjhiYzk5ZmMzNDU5MTNhYjE4NmQxNzRmMzA3OWVhNzI5MjM2NzY2YjJlN2M0YSJdLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiZXhwIjoxNTE5NDE4MjE0LCJpYXQiOjE1MTkzMzE4MTUsImlzcyI6Imh0dHBzOi8vdGVzdC5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsIm5vbmNlIjoiMWQ4MDgzZjcwOGE0Nzk4MjI5NmYyZDk4OTZkNzBmMjA3YTI3OTM4ZjAyNjU0MGMzOTJiOTAzZTVmZGY0ZDZlOSIsInN1YiI6ImNhNjM5YmI5LTI2YWItNDJlNS1iOWJmLTNhZWEyN2IzMzFmZCJ9.05vGt-_0Mw6WEFJF3jpaqkNb88PUMplsjzlEUvCEfnQ",
    domain: "https://test.cloudflareaccess.com",
  });

  return new Response(`Hello, ${identity.name || "service user"}!`);
};
```

The `getIdentity` function takes an object with two properties: a `jwt` string, and a `domain` string. It returns a `Promise` of [the object returned by the `/cdn-cgi/access/get-identity` endpoint](/cloudflare-one/identity/authorization-cookie/application-token/#user-identity). This is particularly useful if you want to use a user's group membership for something like application permissions.

For convience, this same information can be fetched for the current request's JWT with the `data.cloudflareAccess.JWT.getIdentity` function, (assuming you have already validated the request with the Plugin as above):

```typescript
---
filename: functions/greet.ts
---
import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
}) => {
  const identity = await data.cloudflareAccess.JWT.getIdentity();

  return new Response(`Hello, ${identity.name || "service user"}!`);
};
```

### Login and logout URLs

If you want to force a login or logout, use these utility functions to generate URLs and redirect a user:

```typescript
---
filename: functions/login.ts
---
import { generateLoginURL } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest = () => {
  const loginURL = generateLoginURL({
    redirectURL: "https://example.com/greet",
    domain: "https://test.cloudflareaccess.com",
    aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
  });

  return new Response(null, {
    status: 302,
    headers: { Location: loginURL },
  });
};
```

```typescript
---
filename: functions/logout.ts
---
import { generateLogoutURL } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest = () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: generateLogoutURL({
        domain: "https://test.cloudflareaccess.com",
      }),
    },
  });
```
