---
pcx_content_type: reference
title: Slack
rss: file
---

# Slack

{{<render file="casb/_integration-description.md" withParameters="Slack;;Slack Workspace">}}

## Integration prerequisites

- A Slack user account
- Membership in a Slack Workspace (Free, Pro, Business+, or Enterprise Grid)
- If you are not the Workspace Owner and the `Require App Approval` setting is enabled for the Workspace, [request permission](https://slack.com/help/articles/202035138-Add-apps-to-your-Slack-workspace) to install apps.

## Integration permissions

For the Slack integration to function, Cloudflare CASB requires the following Slack API permissions:

- `channels:read`
- `files:read`
- `groups:read`
- `users:read`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Slack Permission scopes reference](https://api.slack.com/scopes).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Slack;;slack">}}

### User account settings

| Finding                        | Severity | Description                                                                                            |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| Slack User 2FA Disabled        | Critical | A user in the Slack Workspace does not have two-factor authentication (2FA) enabled for their account. |
| Slack User Email Not Confirmed | High     | A user in the Slack Workspace has not verified the email they use to sign in.                          |

### Channel sharing

| Finding                         | Severity | Description                                                                                       |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| Slack Channel Shared Externally | High     | A channel in the Slack Workspace has been shared with users who are not members of the Workspace. |

### File sharing

| Finding                           | Severity | Description                                                                   |
| --------------------------------- | -------- | ----------------------------------------------------------------------------- |
| Slack File Publicly Accessible    | Medium   | An external link has been created for a file uploaded to the Slack Workspace. |
| Large File (2GB+) Shared in Slack | Low      | A file ≥ 2 GB has been uploaded to the Slack Workspace.                       |
