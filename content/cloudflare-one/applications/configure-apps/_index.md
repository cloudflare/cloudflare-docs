---
pcx_content_type: navigation
title: Add web applications
weight: 1
---

# Add web applications

With Cloudflare Zero Trust, you can protect two types of web applications: SaaS and self-hosted.

* [**SaaS applications**](/cloudflare-one/applications/configure-apps/saas-apps/) consist of applications your team relies on that are not hosted by your organization. Examples include Salesforce and Workday. To secure SaaS applications, you must integrate Cloudflare Access with the SaaS application's SSO configuration.

* [**Self-hosted applications**](/cloudflare-one/applications/configure-apps/self-hosted-apps/) consist of internal applications that you host in your own environment. These can be the data center versions of tools like the Atlassian suite or applications created by your own team. To secure self-hosted applications, you must use Cloudflare's authoritative DNS and [connect the application](/cloudflare-one/connections/connect-apps/) to Cloudflare.

* [**Dashboard SSO applications**](/cloudflare-one/applications/configure-apps/dash-sso-apps/) are a special type of SaaS application that manages SSO settings for the Cloudflare dashboard and has limited permissions for customer edits.
