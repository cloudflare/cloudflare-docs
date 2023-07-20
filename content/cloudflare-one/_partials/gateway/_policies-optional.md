---
_build:
  publishResources: false
  render: never
  list: never
---

## Check user identity

Configure access on a per user or group basis by adding [identity-based conditions](/cloudflare-one/policies/gateway/identity-selectors/) to your policies.

| Selector         | Operator | Value         | Action |
| ---------------- | -------- | ------------- | ------ |
| Application      | in       | Salesforce    | Block  |
| User Group Names | in       | `Contractors` |        |
