---
pcx_content_type: configuration
title: mTLS
---

# Client authentication with mTLS

When using [HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/), a server presents a certificate for the client to authenticate in order to prove their identity. For even tighter security, some services require that the client also present a certificate.

This process - known as [mTLS](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) - moves authentication to the protocol of TLS, rather than managing it in application code. Connections from unauthorized clients are rejected during the TLS handshake instead.

To present a client certificate when communicating with a service, you can create and use a [binding](/workers/platform/bindings) to a certificate for use in your Worker project.

First, upload a certificate and its private key to your account using the [`wrangler mtls-certificate`](/workers/wrangler/commands/#mtls-certificate) command:

```sh
$ wrangler mtls-certificate upload --cert cert.pem --key key.pem --name my-client-cert
```

Then, update your Worker project's `wrangler.toml` file to create a binding to the certificate:

```toml
---
header: wrangler.toml
---
mtls_certificates = [
  { binding = "MY_CERT", certificate_id = "<CERTIFICATE_ID>" } 
]
```

{{<Aside type="note">}}
Certificate IDs are displayed after uploading, and can also be viewed with the command `wrangler mtls-certificate list`.
{{</Aside>}}

Adding an mTLS certificate binding includes a variable in the Worker's environment on which the `fetch()` method is available. This `fetch()` method uses the standard [Fetch](/workers/runtime-apis/fetch/) API and has the exact same signature as the global `fetch`, but always presents the client certificate when establishing the TLS connection.

{{<Aside type="note">}}
mTLS certificate bindings present an API similar to [service bindings](/workers/runtime-apis/service-bindings).
{{</Aside>}}

### Interface

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}
```js
export default {
    async fetch(request, environment) {
        return await environment.MY_CERT.fetch("https://a-secured-origin.com")
    }
}
```
{{</tab>}}
{{<tab label="ts/esm">}}
```js
interface Env {
  MY_CERT: Fetcher;
}

export default {
    async fetch(request: Request, environment: Env) {
        return await environment.MY_CERT.fetch("https://a-secured-origin.com")
    }
}
```
{{</tab>}}
{{</tabs>}}
