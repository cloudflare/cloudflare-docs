---
order: 15
---

# Mutual TLS client headers

Cloudflare makes client certificate details available to be passed as request headers to your origin. To begin, configure your policy for mTLS enforcement using the instructions provided in [_Adding mTLS authentication to your Access configuration_](/service-auth/mtls/).

## Valid variables

Cloudflare Access enforces mTLS authentication by determining if the client certificate is valid against your root certificate authority (CA). If configured correctly, then your [common name](https://www.ssl.com/faqs/common-name/) will match those defined in the policy.

Sometimes, the CA requires that your origin takes an action. You can use [Cloudflare Workers](https://workers.cloudflare.com/) to send those request headers to your origin after Cloudflare Access completes session authentication.

Cloudflare Access supports these variables:

* `Client Auth` flag with the label, `tlsClientAuth.certPresented` -- Set to Boolean "0" or "1" to indicate of TLS client authorization is present. ALL Worker requests have this flag.
* `tlsClientAuth.certIssuerDN` -- Client certificate issuer DN.
* `tlsClientAuth.certSubjectDN` -- Client certificate subject DN.
* `tlsClientAuth.certIssuerDNLegacy` -- Client certificate issuer DN (Legacy policies).
* `tlsClientAuth.certSubjectDNLegacy` -- Client certificate subject DN (Legacy policies).
* `tlsClientAuth.certSerial` -- Client certificate serial number.
* `tlsClientAuth.certFingerprintSHA1` -- Client certificate fingerprint (SHA1).
* `tlsClientAuth.certVerified` -- Client certificate verify verdict. Valid values are  `SUCCESS`, `FAILED:reason`, and `NONE`.
* `tlsClientAuth.certNotBefore` -- Client certificate start validity date, in the format: "Dec 22 19:39:00 2018 GMT."
* `tlsClientAuth.certNotAfter` -- Client certificate end validity date, in the format: "Dec 22 19:39:00 2018 GMT."

Cloudflare Access will always set headers on each request. The system will not reuse incoming headers.

## Configure Cloudflare Workers

1. Enable Workers for the zone.


Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing apps without configuring or maintaining infrastructure. In our example, Workers listen for requests to your origin and pass the required variables from the client certificate.

2. Add a Worker to the path being protected.

This example Worker script looks for the variables Cloudflare parses from the client certificate and sets request headers using that data. The request headers are appended to your request. You can use them when they reach the origin to route requests or perform other operations.

```js
addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

function getHeaders(headers) {
    let heads = {};
    for (let h of headers.entries()) {
        heads[h[0]] = h[1];
    }
    return heads;
}

function handleRequest(request) {
    let headers = {};
    if (request.cf && request.cf.tlsClientAuth.certPresented) {
        const tlsHeaders = {
            'X-CERT-ISSUER-DN': request.cf.tlsClientAuth.certIssuerDN,
            'X-CERT-SUBJECT-DN': request.cf.tlsClientAuth.certSubjectDN,
            'X-CERT-ISSUER-DN-L': request.cf.tlsClientAuth.certIssuerDNLegacy,
            'X-CERT-SUBJECT-DN-L': request.cf.tlsClientAuth.certSubjectDNLegacy,
            'X-CERT-SERIAL': request.cf.tlsClientAuth.certSerial,
            'X-CERT-FINGER': request.cf.tlsClientAuth.certFingerprintSHA1,
            'X-CERT-VERIFY': request.cf.tlsClientAuth.certVerified,
            'X-CERT-NOTBE': request.cf.tlsClientAuth.certNotBefore,
            'X-CERT-NOTAF': request.cf.tlsClientAuth.certNotAfter
        };
        Object.assign(headers, tlsHeaders);
    }
    Object.assign(headers, getHeaders(request.headers));
    return fetch(request, {
        headers: new Headers(headers)
    });
}
```