---
type: example
summary: Allow a specific email address.
tags:
  - HTTP policy
title: HTTP policy
weight: 4
layout: example
pcx_content_type: configuration
---

```json
{
  "name": "Block reddit.com",
  "conditions": [
    {
      "type": "traffic",
      "expression": {
        "any": {
          "==": {
            "lhs": {
              "splat": "http.request.domains"
            },
            "rhs": "reddit.com"
          }
        }
      }
    },
    {
      "type": "identity",
      "expression": {
        "in": {
          "lhs": "identity.email",
          "rhs": ["john@example.com", "mary@example.com"]
        }
      }
    }
  ],
  "action": "block",
  "precedence": 50000,
  "enabled": true,
  "description": "Block users john@example.com and mary@example.com from accessing reddit.com",
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
