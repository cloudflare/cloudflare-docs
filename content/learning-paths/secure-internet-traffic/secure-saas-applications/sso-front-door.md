---
title: Single sign-on front door controls
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

[Access for SaaS](/cloudflare-one/applications/configure-apps/saas-apps/) functions as an identity proxy to add an additional authentication layer to your SaaS apps.

Access for SaaS integrates directly with your SaaS app using standard protocols (such as SAML) to become the primary enforcement point for user access. Access calls your identity provider (IdP) of choice and uses additional security signals about your users and devices to make policy decisions. Benefits of Access for SaaS include:

- A streamlined experience for users on both managed and unmanaged devices.
- Application of baseline policies requiring specific concepts such as device posture and endpoint control.
- Distinct access methodology for contractors.
- Flexibility to configure multiple SSO vendors simultaneously, freely switch between SSO vendors, and reduce reliance on a single vendor.

### SSO integrations

You can pair Access for SaaS with the [App Launcher](/cloudflare-one/applications/app-launcher/) to provide a full replacement to your organization's front door.

{{<Aside type="note" header="SCIM provisioning limitation">}}

Access for SaaS supports SCIM passthrough in an API-only closed beta. If you require SCIM passthrough, contact your account team.

{{</Aside>}}

## Configure your SSO provider

If you cannot use Access for SaaS for some or all of your SaaS apps, you can accomplish most of the same outcomes through a combination of strong security controls on your managed devices and your [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/setup/clientless-browser-isolation/) implementation. You can use your existing SSO provider to enforce a strong relationship between Cloudflare and your SaaS applications.

### Policies based on dedicated egress IPs

With [dedicated egress IPs](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/), you can set explicit egress locations globally and share these IPs with your SSO provider. With this Zero Trust security approach, your users must meet all of your Cloudflare requirements (such as being enrolled in WARP or Browser Isolation) when they authenticate to your SSO provider. Using your dedicated egress IPs as a control mechanism within your SSO means you can set policies on the basis of which users are subject to security policy and inspection because they are guaranteed to be proxied through Cloudflare.

### Generic IdP multi-factor authentication

Similar to the dedicated egress IP option, many IdPs support a generic multi-factor authentication (MFA) method. You can use your IdP's generic MFA in conjunction with Cloudflare security policies to make your second factor a Cloudflare Access policy. This policy can check all of the security signals available in Access for SaaS. This method delivers user traffic data to Cloudflare and ensures that users cannot access SaaS applications without first being subject to granular security policy.
