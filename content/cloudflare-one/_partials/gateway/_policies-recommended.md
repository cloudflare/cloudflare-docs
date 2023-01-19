---
_build:
  publishResources: false
  render: never
  list: never
---
### Block all security risks

Block known threats such as Command & Control, Botnet and Malware based on Cloudflare’s threat intelligence.

| Selector            | Operator  | Value              | Action |
| ------------------- | ----------| -------------------| ------ |
| Security categories | in        | `All security risks` | Block  |
