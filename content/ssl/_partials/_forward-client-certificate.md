---
_build:
  publishResources: false
  render: never
  list: never
---

## Forward a client certificate

In addition to enforcing mTLS authentication for your host, you can also forward a client certificate to your origin server as an HTTP header. This setup is often helpful for server logging.

{{<Aside type="warning">}}
This process is only available on accounts with [Cloudflare Access](/cloudflare-one/).
{{</Aside>}}

### Cloudflare API

The most common approach to forwarding a certificate is to use the Cloudflare API to [update an mTLS certificate's hostname settings](/api/operations/zone-level-access-mtls-authentication-update-an-mtls-certificate-settings).

```bash
---
header: Request
highlight: [11]
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/access/certificates/settings \
--header "x-auth-email: <EMAIL>" \
--header "x-auth-key: <API_KEY>" \
--header "content-type: application/json" \
--data '{
  "settings": [
    {
      "hostname": "<HOSTNAME>",
      "china_network": false,
      "client_certificate_forwarding": true
    }
  ]
}'
```

Once `client_certificate_forwarding` is set to `true`, the first request of an mTLS connection will now include the following headers:

- `Cf-Client-Cert-Der-Base64`
- `Cf-Client-Cert-Sha256`

### Managed Transforms

You can also [modify HTTP response headers](/rules/transform/response-header-modification/) using Managed Transforms to pass along **TLS client auth headers**.

### Cloudflare Workers

Additionally, Workers can provide details around the [client certificate](/workers/runtime-apis/bindings/mtls/).

```js
const tlsHeaders = {
    'X-CERT-ISSUER-DN': request.cf.tlsClientAuth.certIssuerDN,
    'X-CERT-SUBJECT-DN': request.cf.tlsClientAuth.certSubjectDN,
    'X-CERT-ISSUER-DN-L': request.cf.tlsClientAuth.certIssuerDNLegacy,
    'X-CERT-SUBJECT-DN-L': request.cf.tlsClientAuth.certSubjectDNLegacy,
    'X-CERT-SERIAL': request.cf.tlsClientAuth.certSerial,
    'X-CERT-FINGER': request.cf.tlsClientAuth.certFingerprintSHA1,
    'X-CERT-VERIFY': request.cf.tlsClientAuth.certVerify,
    'X-CERT-NOTBE': request.cf.tlsClientAuth.certNotBefore,
    'X-CERT-NOTAF': request.cf.tlsClientAuth.certNotAfter
};
```
