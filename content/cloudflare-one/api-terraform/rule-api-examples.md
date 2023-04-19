---
type: overview
pcx_content_type: configuration
title: API examples
weight: 4
layout: list
---

# API examples

{{<content-column>}}

Zero Trust users can create policies, including individual rule blocks inside of group or policy bodies. For example, this Access policy allows all Cloudflare email account users to reach the application with the exception of one account:

```json
{
  "name": "allow cloudflare employees",
  "decision": "allow",
  "include": [
    {
      "email_domain": {
        "domain": "cloudflare.com"
      }
    }
  ],
  "exclude": [
    {
      "email": {
        "email": "notthisperson@cloudflare.com"
      }
    }
  ],
  "require": []
}
```

{{</content-column>}}

## Example rule configurations

These are commonly used rule configurations.

{{<list-examples>}}
