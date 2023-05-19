---
pcx_content_type: reference
title: Atlassian Confluence
rss: file
---

# Atlassian Confluence

The Atlassian Confluence integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Atlassian Confluence Cloud account that could leave you and your organization vulnerable.

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

The Confluence Cloud integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### Access security

Flag user and third-party app access issues, including account misuse, sharing security, and users not following best practices.

| Finding                                               | Severity |
| ----------------------------------------------------- | -------- |
| Unknown or anonymous user with edit access to content | Critical |
| Unknown or anonymous user with edit access to space   | High     |
| External collaborators with content access            | Medium   |
| External collaborator with access                     | Medium   |
| Third-party app with edit access to space             | Medium   |
| Third-party app with edit access to content           | Medium   |
| External collaborators with edit access to space      | Medium   |
| External collaborators with edit access to content    | Medium   |
| Unknown or anonymous user with access                 | Low      |
| Third-party app with content access                   | Low      |
