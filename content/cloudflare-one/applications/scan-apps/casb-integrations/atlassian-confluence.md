---
pcx_content_type: reference
title: Atlassian Confluence
rss: file
---

# Atlassian Confluence

{{<render file="casb/_integration-description.md" withParameters="Atlassian Confluence;;Atlassian Confluence Cloud account">}}

{{<Aside type="note">}}
At this time, the CASB integration for Confluence is only compatible with Confluence Cloud accounts. Support for Confluence Data Center will come at a future date.
{{</Aside>}}

## Integration prerequisites

- A Confluence Cloud plan (Free, Standard, Premium, Enterprise)

- Access to a Confluence Cloud account with Site admin and/or Organization admin permissions

## Integration permissions

For the Confluence Cloud integration to function, Cloudflare CASB requires the following permissions via an OAuth 2.0 app:

- `read:confluence-space.summary`
- `read:confluence-props`
- `read:confluence-content.all`
- `read:confluence-content.summary`
- `read:confluence-content.permission`
- `read:confluence-user`
- `read:confluence-groups`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Atlassian scopes documentation](https://developer.atlassian.com/cloud/confluence/scopes-for-oauth-2-3LO-and-forge-apps/).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Atlassian Confluence;;atlassian-confluence">}}

### Access security

Flag user and third-party app access issues, including account misuse, sharing security, and users not following best practices.

| Finding type                                                     | Finding type ID                        | Severity |
| ---------------------------------------------------------------- | -------------------------------------- | -------- |
| Confluence Unknown or anonymous user with edit access to content | `d5ad6f5e-3e7a-4409-a9dc-9707caca047e` | Critical |
| Confluence Unknown or anonymous user with edit access to space   | `a531c40f-76f5-404e-9c9b-3b21a6da7b98` | High     |
| Confluence Third-party app with edit access to space             | `aac0ac18-25ad-442a-9a24-01ecd85b0b2b` | Medium   |
| Confluence Third-party app with edit access to content           | `8214431e-b708-49c9-b28b-3214f1b491d8` | Medium   |
| Confluence Unknown or anonymous user with access                 | `a1d0d098-2602-4312-85a8-a62d3bc56aca` | Low      |
| Confluence Third-party app with content access                   | `5ccf7326-386d-4afb-867a-fbf25978c33a` | Low      |
