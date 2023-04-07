---
pcx_content_type: reference
title: Atlassian Jira
rss: file
---

# Atlassian Jira

The Atlassian Jira integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Atlassian Jira Cloud account that could leave you and your organization vulnerable.

{{<Aside type="note">}}
At this time, the CASB integration for Jira is only compatible with Jira Cloud accounts. Support for Jira Data Center will come at a future date.
{{</Aside>}}

## Integration prerequisites

* A Jira Cloud plan (Free, Standard, Premium, Enterprise)

* Access to a Jira Cloud account with Site admin and/or Organization admin permissions

## Integration permissions

For the Jira Cloud integration to function, Cloudflare CASB requires the following permissions via an OAuth 2.0 app:

* `read:jira-work`
* `read:jira-user`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Atlassian scopes documentation](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/).

## Security findings

The Jira Cloud integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### Access security

Flag user and third-party app access issues, including account misuse and users not following best practices.

| Finding                                    | Severity |
|--------------------------------------------|----------|
| Active Jira user with unknown account type | Low      |
| Active third-party app with access         | Low      |
| Inactive third-party app with access       | Low      |
| Inactive Jira user                         | Low      |

### File security

Identify files that could be potentially problematic and worth deeper investigation.

| Finding                           | Severity |
|-----------------------------------|----------|
| Jira Issue attachment over 512 MB | Medium   |