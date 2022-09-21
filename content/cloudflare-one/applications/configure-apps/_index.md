---
pcx_content_type: concept
title: Add web applications
weight: 1
---

# Web applications in Access

Cloudflare Access allows you to secure your web applications by acting as an identity aggregator, or proxy. Users can only log in to the application if they meet the criteria you want to introduce.

![Cloudflare Access verifies a user's identity before granting access to your application.](/cloudflare-one/static/documentation/applications/diagram-saas.jpg)

You can protect two types of web applications: SaaS and self-hosted.

* [**SaaS applications**](/cloudflare-one/applications/configure-apps/saas-apps/) consist of applications your team relies on that are not hosted by your organization. Examples include Salesforce and Workday. To secure SaaS applications, you must integrate Cloudflare Access with the SaaS application's SSO configuration.

* [**Self-hosted applications**](/cloudflare-one/applications/configure-apps/self-hosted-apps/) consist of internal applications that you host in your own environment. These can be the data center versions of tools like the Atlassian suite or applications created by your own team. To secure self-hosted applications, you must use Cloudflare's DNS ([full setup](/dns/zone-setups/full-setup/) or [partial CNAME setup](/dns/zone-setups/partial-setup/)) and [connect the application](/cloudflare-one/connections/connect-apps/) to Cloudflare.

* [**Cloudflare Dashboard SSO**](/cloudflare-one/applications/configure-apps/dash-sso-apps/) are a special type of SaaS application that manages SSO settings for the Cloudflare dashboard and has limited permissions for administrator edits.
