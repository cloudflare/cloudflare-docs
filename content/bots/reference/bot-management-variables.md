---
pcx-content-type: reference
title: Bot Management variables
weight: 0
---

# Bot Management variables

Bot Management provides access to several [new variables](/ruleset-engine/rules-language/fields/#dynamic-fields) within the Firewall expression builder.

- **Bot Score**: An integer between 1-99 that indicates [Cloudflare's level of certainty](/bots/concepts/bot-score/) that a request comes from a bot.
- **Verified Bot**: A boolean value that is true if the request comes from a good bot, like Google or Bing. Most customers choose to allow this traffic. For more details, see [Traffic from known bots](/firewall/known-issues-and-faq/#how-does-firewall-rules-handle-traffic-from-known-bots).
- **Serves Static Resource**: An identifier that matches [file extensions](/bots/reference/static-resources/) for many types of static resources. Use this variable if you send emails that retrieve static images.
- **ja3Hash**: A [**JA3 Fingerprint**](/bots/concepts/ja3-fingerprint/) helps you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.
- **js_score**: Customers should not use `js_score` when creating Bot Management firewall rules because it will always be blank.

These variables are also available as part of the [request.cf](/workers/runtime-apis/request/#incomingrequestcfproperties) object via Cloudflare Workers:

- `request.cf.botManagement.score`
- `request.cf.botManagement.verifiedBot`
- `request.cf.botManagement.staticResource`
- `request.cf.botManagement.ja3Hash`
- `request.cf.botManagement.js_score`