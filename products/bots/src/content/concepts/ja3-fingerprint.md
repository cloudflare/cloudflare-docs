---
pcx-content-type: concept
---

# JA3 Fingerprint

A [**JA3 Fingerprint**](https://github.com/salesforce/ja3) helps you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.

<Aside type="note" header="Note:">

JA3 Fingerprints are only available to Enterprise customers who have purchased Bot Management.

</Aside>

## Analytics

To get more information about potential bot requests, use these JA3 Fingerprints in:

- [Bot Analytics](/bot-analytics/bm-subscription) 
- [Firewall Analytics](https://developers.cloudflare.com/waf/analytics)
- [Analytics GraphQL API](https://developers.cloudflare.com/analytics/graphql-api), specifically the **HTTP Requests** data set

## Actions

To adjust how your application responds to specific fingerprints, use them with:

- [Firewall Rules](https://developers.cloudflare.com/firewall/cf-dashboard)
- [Transform Rules](https://developers.cloudflare.com/rules/transform)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties)