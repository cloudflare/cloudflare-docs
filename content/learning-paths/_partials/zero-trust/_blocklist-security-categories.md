---
_build:
  publishResources: false
  render: never
  list: never
---

Block [security categories](/cloudflare-one/policies/gateway/domain-categories/#security-categories), such as **Command and Control & Botnet** and **Malware**, based on Cloudflare's threat intelligence.

| Selector       | Operator | Value                | Action |
| -------------- | -------- | -------------------- | ------ |
| Security Risks | in       | _All Security Risks_ | Block  |
