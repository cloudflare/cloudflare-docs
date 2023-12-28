---
title: Enable TLS decryption (optional)
pcx_content_type: overview
weight: 4
layout: learning-unit
---

[TLS decryption](https://www.cloudflare.com/learning/security/what-is-https-inspection/) allows Cloudflare Gateway to inspect HTTPS requests to your private network applications. With TLS decryption enabled, you will be able to apply advanced policies such as scanning for sensitive data, starting a remote browser isolation session, and filtering based on the complete URL and path of requests.

These features can increase the security posture of sensitive systems, but enabling TLS decryption can cause challenges. For instance, if many of your internal applications use self-signed certificates, TLS decryption with the Cloudflare root certificate will break your users' ability to access those resources. One way to work around the issue is by creating a [Do Not Inspect](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) policy for the application. Alternatively, Enterprise customers can upload their own root CA to Cloudflare and build an Allow policy with a [certificate _Pass through_ action](/cloudflare-one/policies/gateway/http-policies/#untrusted-certificates), which allows our proxy to trust the certificate presented by the application. To learn more about incompatible applications, refer to [TLS decryption limitations](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#limitations).

With TLS decryption disabled, Gateway can only inspect unencrypted HTTP requests. However, you can still apply policies to HTTPS traffic based on user identity, device posture, IP, resolved domain, SNI, and other attributes that support a Zero Trust security implementation.

## Enable TLS decryption

{{<render file="gateway/_enable-tls-decryption.md" productFolder="cloudflare-one">}}

Next, determine which certificate you want to use for inspection.

## User-side certificates

- Cloudflare root certificate:

- Custom root certificate (Enterprise only):

Deploying the Cloudflare root certificate to your devices? This is a simple, common solution to deliver TLS decryption capabilities, and is usually appropriate for testing or proof of concept conditions.

If you already have a ‘source of truth’ certificate that you use for other inspection or trust purposes, we would recommend using your own root certificate.
- Assuming it’s already deployed on the relevant fleet of devices, using a single certificate streamlines your IT management
- If other services (git workflows, other cli tools, thick client applications, etc) rely on an existing certificate store, presenting the same cert in inspection is far less likely to interrupt their traffic flow, although these are things that you may wish to exempt from inspection.
- if you are using WARP connector to onramp traffic to Cloudflare, devices behind those tunnels will not be able to leverage HTTP policies that require decrypting TLS unless they have a certificate that matches either your uploaded certificate or the Cloudflare root certificate. It is more likely in most scenarios that your network infrastructure already has your own device certificates deployed, so using your own existing PKI infrastructure for inspection will reduce the steps necessary to better protect services leveraging this use case.
