---
_build:
  publishResources: false
  render: never
  list: never
---

## Compare secrets and environment variables

{{<Aside type="warning" header="Use secrets for sensitive information">}}

Do not use plaintext environment variables to store sensitive information. Use [secrets](/workers/configuration/secrets/) instead.

{{</Aside>}}

[Secrets](/workers/configuration/secrets/) are [environment variables](/workers/configuration/environment-variables/). The difference is secret values are not visible within Wrangler or Cloudflare dashboard after you define them. This means that sensitive data, including passwords or API tokens, should always be encrypted to prevent data leaks. To your Worker, there is no difference between an environment variable and a secret. The secret's value is passed through as defined.