---
type: example
summary: Override one hostname with another.
tags:
  - Network policy
title: Network policy
weight: 2
layout: example
pcx_content_type: configuration
---

```json
{
  "name": "Override example.com with 1.1.1.1",
  "conditions": [
    {
      "type": "traffic",
      "expression": {
        "and": [
          {
            "in": {
              "lhs": "net.dst.ip",
              "rhs": [
                {
                  "ip": "203.0.113.17"
                }
              ]
            }
          },
          {
            "==": {
              "lhs": "net.dst.port",
              "rhs": 80
            }
          }
        ]
      }
    }
  ],
  "action": "l4_override",
  "precedence": 50000,
  "enabled": true,
  "description": "",
  "rule_settings": {
    "block_page_enabled": false,
    "block_reason": "",
    "biso_admin_controls": {
      "dcp": false,
      "dd": false,
      "dk": false,
      "dp": false,
      "du": false
    },
    "add_headers": {},
    "ip_categories": false,
    "l4override": {
      "ip": "1.1.1.1",
      "port": 80
    },
    "override_host": "",
    "override_ips": null
  },
  "filters": ["l4"]
}
```
