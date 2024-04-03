---
title: Layer security methods
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Once you have decided on a model (or mixture of models) to secure front door access to your SaaS applications, you can deliver a number of Cloudflare controls that address other common SaaS security areas of concern:

- Device posture controls via either Access for SaaS or via controls related to WARP enrollment. Device posture can determine what constitutes a managed endpoint accessing a SaaS application using provisioning or access to a dedicated egress IP address.
  - You can also define what constitutes a healthy or semi-healthy managed endpoint and invoke step-up security policies based on potential security concerns. These controls are separate from the controls enacted for unmanaged endpoints.
- For unmanaged endpoints, you can deliver selective inline security like upload/download controls, HTTP filtering, and data loss detection/prevention policies in SaaS applications without the need to install agents.
  - You can be deliver this method through Browser Isolation, but it requires a [front door control](/learning-paths/secure-internet-traffic/secure-saas-applications/sso-front-door/) (such as Access for SaaS, dedicated egress IP for SSO, or Okta second factor) in order to be applied consistently.

## Browser Isolation

Cloudflare can deliver Browser Isolation in three different ways:

1. Via Cloudflare's endpoint agent (WARP), where it appears transparent. In this case, a user's browser will display `example.com`, but Cloudflare will isolate the traffic.
2. Clientless Web Isolation via static links, where Cloudflare appends to the web address. In this case, a user's browser will display `example.cloudflareaccess.com/browser/organization.application.com`.
3. Clientless Web Isolation via Access applications, where it appears transparent. In this case, the Cloudflare public hostname will be in the Access policy for `access.example.com`, and Cloudflare isolates the traffic.

When Cloudflare isolates traffic, Cloudflare can apply the security stack of TLS decryption, HTTP inspection, network inspection, DNS filtering, and DLP policy evaluation to the traffic in the request body. This provides a solution for securing unmanaged endpoint access to sensitive systems and can potentially upgrade traffic from users or services that may have otherwise been deemed as risky. Any method for Browser Isolation attaches the user to your dedicated egress IP addresses so you can apply policies across each method of access consistently.
