---
pcx_content_type: reference
title: ServiceNow
rss: file
---

# Atlassian Confluence

{{<render file="casb/_integration-description.md" withParameters="ServiceNow;;ServiceNow account">}}

## Integration prerequisites

- A Confluence Cloud plan (Free, Standard, Premium, Enterprise)

- Access to a ServiceNow account

## Integration permissions

For the ServiceNow integration to function, Cloudflare CASB requires the following permissions via X:

- `read:perm1`
- `read:perm2`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [ServiceNow documentation](#).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="ServiceNow;;servicenow">}}

### Access security

Flag user and third-party app access issues, including account misuse, sharing security, and users not following best practices.

| Finding | Severity |
| ------- | -------- |
| TBD     | Critical |
| TBD     | High     |
| TBD     | Medium   |
| TBD     | Low      |
