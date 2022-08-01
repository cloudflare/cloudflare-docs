---
pcx_content_type: reference
title: Google Workspace
weight: 2
---

# Google Workspace

The Google Workspace integration detects a variety of user security, data loss prevention, and misconfiguration risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan.
* [Super Admin privileges](https://support.google.com/a/answer/2405986) in Google Workspace.

## Integration permissions

For the Google Workspace integration to function, CASB requires the following API scopes for access:

* `https://www.googleapis.com/auth/admin.directory.domain.readonly`
* `https://www.googleapis.com/auth/admin.directory.user.readonly`
* `https://www.googleapis.com/auth/admin.directory.user.security`
* `https://www.googleapis.com/auth/calendar`
* `https://www.googleapis.com/auth/cloud-platform.read-only`
* `https://www.googleapis.com/auth/drive.readonly`
* `https://www.googleapis.com/auth/gmail.settings.basic`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Google Workspace Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/v1/guides/authorizing).

## Security findings

The Google Workspace integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/#severity-levels).

### User account settings

Users who did not enable two-factor authentication (2FA) or set a recovery email run the risk of having their accounts compromised. This puts your entire organization at risk should a bad actor gain access to the user's account.

| Finding                                       | Severity |
|-----------------------------------------------|----------|
| Google Workspace Admin User 2FA Disabled      | Critical |
| Google Workspace User 2FA Disabled            | High     |
| Google Workspace User without Recovery Email  | Low      |
| Google Workspace User without Recovery Phone  | Low      |

### Inactive or suspended users

Having inactive or suspended users in your Google Workspace account may present potential compliance violations (for example, employee offboarding violations). Inactive users also increase the risk of account misuse should someone else gain access to their account.

| Finding                               | Severity |
|---------------------------------------|----------|
| Google Workspace Admin User Inactive  | Medium   |
| Google Workspace Admin User Suspended | Medium   |
| Google Workspace User Inactive        | Low      |
| Google Workspace User Suspended       | Low      |

### File sharing

Get alerted when files, folders, and calendars in your Google Workspace have their permissions changed to a less secure setting, including _Anyone with the link_.

| Finding                                       | Severity |
|-----------------------------------------------|----------|
| File Publicly Accessible Read and Write       | Critical |
| File Publicly Accessible Read Only            | High     |
| File Shared Outside Company Read and Write    | High     |
| File Shared Outside Company Read Only         | Medium   |
| File Shared Company Wide Read and Write       | Medium   |
| File Shared Company Wide Read Only            | Medium   |
| Google Workspace Calendar Publicly Accessible | Medium   |

### Third-party apps

Identify and get alerted about the third-party apps that have access to at least one service in your Google Workspace domain. Additionally, receive information about which services are being accessed and by whom to get full visibility into Shadow IT.

| Finding                                            | Severity |
|----------------------------------------------------|----------|
| Installed 3rd Party App with Drive Access          | High     |
| Installed 3rd Party App with Gmail Access          | High     |
| Installed 3rd Party App with Google Docs Access    | Medium   |
| Installed 3rd Party App with Google Slides Access  | Medium   |
| Installed 3rd Party App with Google Sheets Access  | Medium   |
| Installed 3rd Party App with Google Sign In Access | Low      |

### Gmail administrator settings

Discover suspicious or insecure email configurations in your Google Workspace domain. Missing SPF and DMARC records make it easier for bad actors to spoof email, while SPF records configured to another domain can be a potential warning sign of malicious activity.

| Finding                                                   | Severity |
|-----------------------------------------------------------|----------|
| Google Workspace Domain SPF Record Allows Any IP Address  | High     |
| Google Workspace Domain SPF Record Not Present            | Medium   |
| Google Workspace Domain DMARC Record Not Present          | Medium   |
| Google Workspace Domain DMARC Not Enforced                | Medium   |
| Google Workspace Domain DMARC Not Enforced for Subdomains | Medium   |
| Google Workspace Domain DMARC Only Partially Enforced     | Medium   |

### Email forwarding

Get alerted when users set their email to be forwarded externally. This can either be a sign of unauthorized activity, or an employee unknowingly sending potentially sensitive information to a personal email.

| Finding                                      | Severity |
|----------------------------------------------|----------|
| Google Workspace User Delegates Email Access | High     |
