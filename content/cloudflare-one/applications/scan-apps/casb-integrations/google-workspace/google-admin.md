---
pcx_content_type: reference
title: Google Admin
rss: file
---

# Google Admin

{{<render file="casb/_integration-description.md" withParameters="Google Admin;;Google Workspace account">}}

## Integration prerequisites

{{<render file="casb/_google-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Google Workspace;;google-workspace">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Google Admin;;google-workspace/google-admin">}}

### User account settings

| Finding                                      | Severity | Description                                                                           |
| -------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| Google Workspace Admin User 2FA Disabled     | Critical | An administrator in Google Workspace does not have two-factor authentication enabled. |
| Google Workspace User 2FA Disabled           | High     | A user in Google Workspace does not have two-factor authentication enabled.           |
| Google Workspace User without Recovery Email | Low      | A user in Google Workspace does not have a recovery email set.                        |
| Google Workspace User without Recovery Phone | Low      | A user in Google Workspace does not have a recovery phone number set.                 |

### Inactive or suspended users

| Finding                               | Severity | Description                                                                 |
| ------------------------------------- | -------- | --------------------------------------------------------------------------- |
| Google Workspace Admin User Inactive  | Medium   | An administrator account in Google Workspace has not logged in for 30 days. |
| Google Workspace Admin User Suspended | Medium   | An administrator account in Google Workspace is suspended.                  |
| Google Workspace User Inactive        | Low      | A user account in Google Workspace has not logged in for 30 days.           |
| Google Workspace User Suspended       | Low      | A user account in Google Workspace is suspended.                            |

### Third-party apps

| Finding                                            | Severity | Description                                                                          |
| -------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| Installed 3rd Party App with Drive Access          | High     | A third-party application has been granted permissions to a user's Google Drive.     |
| Installed 3rd Party App with Gmail Access          | High     | A third-party application has been granted permissions to a user's Gmail.            |
| Installed 3rd Party App with Google Docs Access    | Medium   | A third-party application has been granted permissions to a user's Google Documents. |
| Installed 3rd Party App with Google Slides Access  | Medium   | A third-party application has been granted permissions to a user's Google Slides.    |
| Installed 3rd Party App with Google Sheets Access  | Medium   | A third-party application has been granted permissions to a user's Google Sheets.    |
| Installed 3rd Party App with Google Sign In Access | Low      | A user has used their Google Workspace account to sign up for a third party service. |
