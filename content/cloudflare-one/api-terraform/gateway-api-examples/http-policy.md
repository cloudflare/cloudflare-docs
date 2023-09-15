---
type: example
summary: Block specific users from accessing a site.
tags:
  - HTTP policy
title: HTTP policy
weight: 3
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
              "splat": "http.request.domains"
            },
            "rhs": "example.com"
          }
        }
      }
    },
    {
      "type": "identity",
      "expression": {
        "in": {
          "lhs": "identity.email",
          "rhs": ["user@example1.com"]
        }
      }
    }
  ],
  "action": "block",
  "precedence": 50000,
  "enabled": true,
  "description": "Block user@example1.com from accessing example.com",
  "rule_settings": {
    "block_page_enabled": false,
    "block_reason": "This website is blocked",
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
  "filters": ["http"]
}
```
