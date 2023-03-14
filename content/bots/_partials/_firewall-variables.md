---
_build:
  publishResources: false
  render: never
  list: never
---

Bot Management provides access to several [new variables](/ruleset-engine/rules-language/fields/#dynamic-fields) within the Firewall expression builder.

- **Bot Score** (`cf.bot_management.score`): An integer between 1-99 that indicates [Cloudflare's level of certainty](/bots/concepts/bot-score/) that a request comes from a bot.
- **Verified Bot** (`cf.bot_management.verified_bot`): A boolean value that is true if the request comes from a good bot, like Google or Bing. Most customers choose to allow this traffic. For more details, see [Traffic from known bots](/firewall/known-issues-and-faq/#how-does-firewall-rules-handle-traffic-from-known-bots).
- **Serves Static Resource** (`cf.bot_management.static_resource`): An identifier that matches [file extensions](/bots/reference/static-resources/) for many types of static resources. Use this variable if you send emails that retrieve static images.
- **ja3Hash** (`cf.bot_management.ja3_hash`): A [**JA3 Fingerprint**](/bots/concepts/ja3-fingerprint/) helps you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.
- **Bot Detection IDs** (`cf.bot_management.detection_ids`): List of IDs that correlate to the Bot Management heuristic detections made on a request (you can have multiple heuristic detections on the same request).