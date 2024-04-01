---
title: Single sign-on front-door controls
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Cloudflare provides tools to control access to your SaaS applications' single sign-on (SSO) front-door.

## Configure CASB via the API

Because CASB is implemented via the API, you can use it to complement the existing security posture outlined in this implementation guide without interruption of service, user traffic proxies, or front door access restrictions.

### General best practices

### Integrating DLP policies

If you use both Cloudflare CASB and Cloudflare Data Loss Prevention (DLP), you can use DLP to discover if files stored in your SaaS application contain sensitive data. CASB integrations supported by DLP include:

{{<render file="casb/_casb-dlp-integrations.md" productFolder="cloudflare-one">}}

For more information, refer to [Scan SaaS applications with DLP](/cloudflare-one/applications/scan-apps/casb-dlp/).

#### Upload/download control

When you use a supported integration with DLP, you can place restrictions on uploading and downloading based on a file's contents.

## Configure SSO to use allowlisting

To configure allowlists based on user IP addresses or other identifiers, you can add your application to Access for SaaS, configure an Access policy, and turn on SSO in your SaaS application.

For more information, refer to [Add a SaaS application to Access](/cloudflare-one/applications/configure-apps/saas-apps/).

## Use Access for SaaS instead of an SSO

Alternatively, you can use Access for SaaS in place of an separate SSO or solution integrated into your SSO application. Access for SaaS provides higher fidelity user identity and device posture controls to ensure Cloudflare inspects all of your traffic. You can pair this with the [App Launcher](/cloudflare-one/applications/app-launcher/) to provide a full replacement to your organization's front door.

## Configure DLP for clientless Browser Isolation

When traffic is isolated, it can run through the whole Cloudflare security stack of TLS decryption, HTTP inspection, network inspection, DNS filtering, and DLP policy evaluation in the request body.

### Clientless upload/download control

By creating isolation policies with DLP profiles, you can control user access to uploading and downloading.
