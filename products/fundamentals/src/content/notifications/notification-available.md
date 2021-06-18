---
order: 5
type: overview
title: Types of Notifications
pcx-content: concept
---

<ContentColumn>

# What kinds of Notifications are available?

The type of available Notifications depends on your Cloudflare plan. We offer a variety of Notifications for our products and services: Billing, Denial-of-Service protection, Magic Transit, SSL/TLS, and many more.
Depending on your plan, you will also be able to configure webhooks. Webhooks allow you to connect your account with external services such as Slack, Google Chat and others. Another possibility is to use PagerDuty to receive Cloudflare Notifications.

</ContentColumn>

<TableWrap>

Notification | What is it for? | Included with
-------------|-----------------|-------------------------
Origin Error Rate Alert | Enterprise customers who want to be alerted when Cloudflare is unable to access their origin server. | Enterprise plans
Dedicated SSL Alert     | Customers with dedicated certificates that want to be alerted on validation, issuance, renewal, and expiration of certificates. | Free
Universal SSL Alert     | Customers with universal certificates that want to be alerted on validation, issuance, renewal, and expiration of certificates. | Free
SSL for SaaS Custom Hostnames Alert | Customers with custom hostname certificates that want to be alerted on validation, issuance, renewal, and expiration of certificates. | Purchase of Cloudflare for SaaS
HTTP DDoS Attack Alerter | WAF/CDN customers that want to be alerted when Cloudflare has mitigated an attack. | Pro and up plans
Layer 4 Attack Alerter | BYOIP customers and Spectrum customers with Network Analytics that want to be alerted when Cloudflare has mitigated an attack. | Purchase of Magic Transit and/or BYOIP 
Flow-based Monitoring: Volumetric Attack | Magic Transit On Demand customers who are using Flow Based Monitoring to detect attacks when Magic Transit is disabled. | Purchase of Magic Transit
Passive Origin Monitoring | Any customer who wants to be alerted when Cloudflare is unable to access their origin. | Free
Expiring Access Service Token Alert | Access customers who want to be alerted when their service token is about to expire. | Purchase of Access
Usage Based Billing | Customers that want to be alerted when usage of a product goes above a set level. | Pro and up plans
Script Monitor New Scripts Alert | Page Shield customers who want to be alerted when new JS dependencies appear in their zone. | Business and up plans
Script Monitor New Domain Alert | Page Shield customers who want to be alerted when JS dependencies from new host domains appear in their zone. | Business and up plans
Route Leak Detection Alert | BYOIP customers who want to be alerted when their prefixes are advertised in places they should not be. | Purchase of BYOIP
Secondary DNS all Primaries Failing | Enterprise customers who have at least one secondary zone in their account and who want to get alerted if all of their primary nameservers are failing. | Purchase of Secondary DNS
Secondary DNS Primaries Failing | Enterprise customers who have at least one secondary zone and who want to get alerted if at least one of their primary nameservers is failing. | Purchase of Secondary DNS
Secondary DNS Primaries Failing | Enterprise customers who have at least one secondary zone and who want to get alerted if at least one of their primary nameservers is failing. | Purchase of Secondary DNS
Secondary DNS Successfully Updated | Enterprise customers who have at least one secondary zone in their account and who want to get alerted on successful zone transfers. | Purchase of Secondary DNS

</TableWrap>