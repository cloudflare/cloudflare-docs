---
pcx_content_type: reference
title: Google Workspace
rss: file
meta:
    title: Google Workspace - CASB
---

# Google Workspace

{{<render file="casb/_integration-description.md" withParameters="Google Workspace;;Google Workspace account">}}

This integration covers the following Google Workspace products:

{{<directory-listing>}}

## Integration prerequisites

{{<render file="casb/_google-prereqs.md">}}

## Integration permissions

For the Google Workspace integration to function, Cloudflare CASB requires the following Google API permissions:

- `https://www.googleapis.com/auth/admin.directory.domain.readonly`
- `https://www.googleapis.com/auth/admin.directory.user.readonly`
- `https://www.googleapis.com/auth/admin.directory.user.security`
- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/cloud-platform.read-only`
- `https://www.googleapis.com/auth/drive.readonly`
- `https://www.googleapis.com/auth/gmail.settings.basic`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Google Workspace Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/v1/guides/authorizing).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Google Workspace;;google-workspace">}}

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

### File sharing

| Finding                                       | Severity | Description                                                                                               |
| --------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| File Publicly Accessible Read and Write       | Critical | A Google Drive file is publicly accessible on the Internet that anyone can read or write.                 |
| File Publicly Accessible Read Only            | High     | A Google Drive file is publicly accessible on the Internet that anyone can read.                          |
| File Shared Outside Company Read and Write    | High     | A Google Drive file is shared with another organization or outside party with read and write permissions. |
| File Shared Outside Company Read Only         | Medium   | A Google Drive file is shared with another organization or outside party with read permissions.           |
| File Shared Company Wide Read and Write       | Medium   | A Google Drive file is shared with the entire company with read and write permissions.                    |
| File Shared Company Wide Read Only            | Medium   | A Google Drive file is shared with the entire company with read permissions.                              |
| Google Workspace Calendar Publicly Accessible | Medium   | A user's Google Calendar is publicly accessible on the Internet that anyone can read.                     |

### Data Loss Prevention (optional)

{{<render file="casb/_data-loss-prevention.md">}}

| Finding                                                        | Severity | Description                                                                                |
| -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| File Publicly Accessible Read and Write with DLP Profile match | Critical | A Google Drive file contains sensitive data that anyone on the Internet can read or write. |
| File Publicly Accessible Read Only with DLP Profile match      | Critical | A Google Drive file contains sensitive data that anyone on the Internet can read.          |

### Third-party apps

| Finding                                            | Severity | Description                                                                          |
| -------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| Installed 3rd Party App with Drive Access          | High     | A third-party application has been granted permissions to a user's Google Drive.     |
| Installed 3rd Party App with Gmail Access          | High     | A third-party application has been granted permissions to a user's Gmail.            |
| Installed 3rd Party App with Google Docs Access    | Medium   | A third-party application has been granted permissions to a user's Google Documents. |
| Installed 3rd Party App with Google Slides Access  | Medium   | A third-party application has been granted permissions to a user's Google Slides.    |
| Installed 3rd Party App with Google Sheets Access  | Medium   | A third-party application has been granted permissions to a user's Google Sheets.    |
| Installed 3rd Party App with Google Sign In Access | Low      | A user has used their Google Workspace account to sign up for a third party service. |

### Gmail administrator settings

| Finding                                                   | Severity | Description                                                                                                                  |
| --------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Google Workspace Domain SPF Record Allows Any IP Address  | High     | A Google Workspace Domain SPF record allows any email to be sent from any IP address on your behalf.                         |
| Google Workspace Domain SPF Record Not Present            | Medium   | An SPF record does not exist for a Google Workspace Domain.                                                                  |
| Google Workspace Domain DMARC Record Not Present          | Medium   | A DMARC record does not exist for a Google Workspace Domain.                                                                 |
| Google Workspace Domain DMARC Not Enforced                | Medium   | A DMARC record for a Google Workspace Domain is not enforced.                                                                |
| Google Workspace Domain DMARC Not Enforced for Subdomains | Medium   | A DMARC record for a Google Workspace Subdomain is not configured to quarantine or reject messages that fail authentication. |
| Google Workspace Domain DMARC Only Partially Enforced     | Medium   | A DMARC record for a Google Workspace Domain is not configured to quarantine or reject messages that fail authentication.    |

### Email forwarding

| Finding                                      | Severity | Description                                                                                                                      |
| -------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Google Workspace User Delegates Email Access | High     | A user has delegated access to their inbox to another party. Delegates can read, send, and delete messages on the user's behalf. |
