---
type: overview
pcx_content_type: configuration
title: Access API examples
weight: 4
layout: list
---

# Access API examples

{{<content-column>}}

Access users can create policies, including individual rule blocks inside of group or policy bodies. For example, this policy allows all Cloudflare email account users to reach the application with the exception of one account:

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
