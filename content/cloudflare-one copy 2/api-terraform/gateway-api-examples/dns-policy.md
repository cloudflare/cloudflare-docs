---
type: example
summary: Block users in a group from accessing a site.
tags:
  - DNS policy
title: DNS policy
weight: 1
layout: example
pcx_content_type: configuration
---

```json
{
  "name": "Block example.com",
  "conditions": [
    {
      "type": "traffic",
      "expression": {
        "any": {
          "==": {
            "lhs": {
              "splat": "dns.resolved_ips"
            },
            "rhs": {
              "ip": "203.0.113.17"
            }
          }
        }
      }
    },
    {
      "type": "identity",
      "expression": {
        "any": {
          "in": {
            "lhs": {
              "splat": "identity.groups.name"
            },
            "rhs": ["marketing"]
          }
        }
      }
    }
  ],
  "action": "block",
  "precedence": 50000,
  "enabled": true,
  "description": "block example.com by resolved IP for users in marketing group",
  "rule_settings": {
    "block_page_enabled": true,
    "block_reason": "site example.com is blocked for users in the marketing group",
    "biso_admin_controls": {
      "dcp": false,
      "dd": false,
      "dk": false,
      "dp": false,
      "du": false
    },
    "add_headers": {},
    "ip_categories": false,
    "override_host": "",
    "override_ips": null,
    "l4override": null
  },
  "filters": ["dns"]
}
```
