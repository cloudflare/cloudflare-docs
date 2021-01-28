---
type: overview
order: 3
---

# Access API examples

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

<ContentColumn>

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

</ContentColumn>

## Example rule configurations

These are commonly used rule configurations.

import DocsCodeExamplesOverview from "../../components/docs-code-examples-overview"

<DocsCodeExamplesOverview/>
