---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: blocklistPolicyType
---

Block specific domains or hosts that are malicious or pose a threat to your organization. Like **All-$1-ResolvedIP-Blocklist**, this blocklist can be updated manually or via API automation.

| Selector | Operator      | Value              | Logic | Action |
| -------- | ------------- | ------------------ | ----- | ------ |
| Domain   | in list       | _Domain Blocklist_ | Or    | Block  |
| Host     | in list       | _Host Blocklist_   | Or    |        |
| Host     | matches regex | `.*example\.com`   |       |        |
