---
title: Enable TLS decryption (optional)
pcx_content_type: overview
weight: 4
layout: learning-unit
---

[TLS decryption](https://www.cloudflare.com/learning/security/what-is-https-inspection/) allows Cloudflare Gateway to inspect HTTPS requests to your private network applications.

## Should I enable TLS decryption?

With TLS decryption enabled, you will be able to apply advanced policies such as scanning for sensitive data, starting a remote browser isolation session, and filtering based on the complete URL and path of requests. These features can increase the security posture of sensitive systems, but TLS decryption can also break your users' access to certain resources. For instance, if your internal applications use self-signed certificates, you will need to either configure a [Do Not Inspect](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) policy or an [Untrusted certificate _Pass through_](/cloudflare-one/policies/gateway/http-policies/#untrusted-certificates) policy to allow users to connect. To learn more, refer to [TLS decryption limitations](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#inspection-limitations).

With TLS decryption disabled, Gateway can only inspect unencrypted HTTP requests. However, you can still apply policies to HTTPS traffic based on user identity, device posture, IP, resolved domain, SNI, and other attributes that support a Zero Trust security implementation. Refer to the [Gateway HTTP policies documentation](/cloudflare-one/policies/gateway/http-policies/) for more information.

## Enable TLS decryption

{{<render file="gateway/_enable-tls-decryption.md" productFolder="cloudflare-one">}}

Next, choose a [user-side certificate](#configure-user-side-certificates) to use for inspection.

## Configure user-side certificates

When you enable TLS decryption, Gateway will decrypt all traffic sent over HTTPS, apply your HTTP policies, and then re-encrypt the request with a certificate on the user device. You can either [install the certificate provided by Cloudflare](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cert-with-warp/) (default option) or [upload a custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/) to Cloudflare (Enterprise-only option).

### Best practices

Deploying the Cloudflare root certificate is the simplest way to get started with TLS decryption and is usually appropriate for testing or proof of concept conditions.

If you already have a certificate that you use for other inspection or trust purposes, we recommend uploading your own root certificate for the following reasons:

- Using a single certificate streamlines IT management.
- If other services (such as git workflows, other cli tools, or thick client applications) rely on an existing certificate store, presenting the same certificate in inspection is far less likely to interrupt their traffic flow.
- If you are using WARP Connector to connect devices to Cloudflare, those devices will not be able to leverage HTTP policies that require decrypting TLS unless they have a certificate that matches either your uploaded certificate or the Cloudflare root certificate. It is more likely that your network infrastructure already has your own device certificates deployed, so using the existing PKI infrastructure for inspection will reduce the number of steps needed to deploy Zero Trust.

{{<Aside type="note" header="MDM deployments">}}
Many customers [deploy WARP](/learning-paths/replace-vpn/connect-devices/) onto devices in production using an MDM tool like JAMF or InTune. Cloudflare has the ability to deploy the root certificate along with the device, but this could be more consistently and holistically configured within the MDM, where other certificates are presumably managed, trusted, and stored.
{{</Aside>}}
