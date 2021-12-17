---
order: 
pcx-content-type: reference
---

# Bot Management variables

Bot Management provides access to several [new variables](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#dynamic-fields) within the Firewall expression builder.

- **Bot Score**: An integer between 1-99 that indicates [Cloudflare's level of certainty](/concepts/bot-score) that a request comes from a bot.
- **Verified Bot**: A boolean value that is true if the request comes from a good bot, like Google or Bing. Most customers choose to allow this traffic. For more details, see [Traffic from known bots](https://developers.cloudflare.com/firewall/known-issues-and-faq#how-does-firewall-rules-handle-traffic-from-known-bots).
- **Serves Static Resource**: An identifier that matches [file extensions](/reference/static-resources) for many types of static resources. Use this variable if you send emails that retrieve static images.
- **ja3Hash**: A [**JA3 Fingerprint**](/concepts/ja3-fingerprint) helps you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.

These variables are also available as part of the [request.cf](https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties) object via Cloudflare Workers:

- `request.cf.botManagement.score`
- `request.cf.botManagement.verifiedBot`
- `request.cf.botManagement.staticResource`
- `request.cf.botManagement.ja3Hash`