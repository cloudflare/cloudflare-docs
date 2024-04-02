---
title: Single sign-on front door controls
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

The concept of SaaS security is top of mind for many security organizations but isn't explicitly defined. When organizations approach Cloudflare for help securing their SaaS apps, it can mean a number of different things with a number of ideal outcomes. Cloudflare distills SaaS security into three key concepts:

1. Better protection for the front door of your SaaS applications with considerations for both managed and unmanaged endpoint access.
2. Assurances for the ability to apply inline security tooling. In other words, we ensure the ability to apply restrictions on file uploads/downloads, the ability to access administrative targets, and the application of policies to prevent or detect data loss. Managing distinct policies for hundreds (on average) of SaaS apps means inline security will always meaningfully drift.
3. Visibility and control for your critical SaaS applications whether or not users are actively engaging with them (also known as out-of-band). This concept becomes most critical when you have limited ability to apply inline policy using TLS inspection and other methods.

Cloudflare offers multiple solutions that achieve and sometimes overlap with all three of the defined concepts. Through combinations of Access for SaaS identity proxy, WARP with dedicated IP addresses, Browser Isolation, and CASB API, Cloudflare helps define and address any potential SaaS security goals.

## Access for SaaS

[Access for SaaS](/cloudflare-one/applications/configure-apps/saas-apps/) functions as an identity proxy to add an additional authentication layer to your SaaS apps.

Access for SaaS integrates directly with your SaaS app using standard protocols (such as SAML) to become the primary enforcement point for user access. As you adopt Cloudflare as your primary network access and web security tool, you can use security signals about your users and devices to make policy decisions. Benefits of Access for SaaS include:

- A streamlined experience for users on both managed and unmanaged devices.
- Application of baseline policies requiring specific concepts such as  device posture and endpoint control.
- Distinct access methodology for contractors.

### SSO integrations

Access for SaaS also allows more flexibility in the management of SSO. Because Cloudflare integrates with applications directly, you can configure multiple SSO vendors simultaneously, freely switch between SSO vendors, and reduce reliance on a single vendor.

Alternatively, you can use Access for SaaS in place of an separate SSO or solution integrated into your SSO application. Access for SaaS provides higher fidelity user identity and device posture controls to ensure Cloudflare inspects all of your traffic. You can pair this with the [App Launcher](/cloudflare-one/applications/app-launcher/) to provide a full replacement to your organization's front door.

{{<Aside type="warning" header="SCIM passthrough limitation">}}

Access for SaaS supports SCIM passthrough in an API-only closed beta. If you require SCIM passthrough, contact your account team.

{{</Aside>}}

## Configure your SSO

If you cannot use Access for SaaS for some or all of your SaaS apps, you can accomplish most of the same outcomes through a combination of strong security controls on your managed devices and your [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/setup/clientless-browser-isolation/) implementation. You can use your existing SSO provider to enforce a strong relationship between Cloudflare and your SaaS applications.

### Dedicated egress IPs for SSOs

With [dedicated egress IPs](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/), you can set explicit egress locations globally and share these IPs with your SSO provider. With this Zero Trust security approach, your users must both meet all of your requirements to be enrolled in WARP or Browser Isolation and continuously authenticate. Using your dedicated egress IPs as a control mechanism within your SSO means you can set policies on the basis of which users are subject to security policy and inspection because they are guaranteed to be proxied through Cloudflare.

### Okta second factor

Similar to the dedicated egress IP option, Okta specifically supports a generic multi-factor authentication (MFA) method. You can use Okta MFA in conjunction with Cloudflare security policies to make your second factor a Cloudflare Access policy with the ability to check all of the security signal that Cloudflare can check in Access for SaaS. This method delivers user traffic data to Cloudflare and can ensure that users cannot access SaaS applications without first being subject to granular security policy.
