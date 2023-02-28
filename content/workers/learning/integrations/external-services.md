---
pcx_content_type: concept
title: External Services
---

# External Services

Many external services provide libraries and SDKs to interact with their APIs. While many Node-compatible libraries work on Workers right out of the box, some, which implement `fs`, `http/net`, or access the browser `window` do not directly translate to the Workers runtime, which is v8-based. 

For a list of working packages, refer to [Works on Workers](https://workers.cloudflare.com/works).

<iframe 
    class="airtable-embed" 
    src="https://airtable.com/embed/shrTR0QCusxZoCgiJ?backgroundColor=yellow&viewControls=on" 
    frameborder="0" 
    width="100%" 
    height="800" 
    style="background:transparent;border:1px solid #ccc"
    allowFullScreen></iframe>

{{<Aside type="note">}}
If you do not see an integration listed or have an integration to add, complete and submit the [Cloudflare Developer Platform Integration form](https://forms.gle/iaUqLWE8aezSEhgd6) or [submit a package directly through Airtable](https://airtable.com/shrtvoM4QfEr48ZoQ).
{{</Aside>}}

## Authentication

If your service requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```

Then use the secret value to authenticate with the external service. For example, if the external service requires an API key for authentication, include the secret in your library's configuration.

For services that require mTLS authentication, use [mTLS certificates](/workers/runtime-apis/mtls) to present a client certificate.

Use [Custom Domains](/workers/platform/triggers/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.
