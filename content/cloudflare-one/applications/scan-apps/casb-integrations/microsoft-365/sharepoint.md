---
pcx_content_type: reference
title: SharePoint
rss: file
weight: 3
---

# SharePoint

The SharePoint integration detects a variety of user security, data loss prevention, and misconfiguration risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

## Integration prerequisites

- A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
- [Global admin role](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

## Integration permissions

For the SharePoint integration to function, Cloudflare CASB requires the following delegated Microsoft Graph API permissions:

- `Application.Read.All`
- `Calendars.Read`
- `Domain.Read.All`
- `Group.Read.All`
- `InformationProtectionPolicy.Read.All`
- `MailboxSettings.Read`
- `offline_access`
- `RoleManagement.Read.All`
- `User.Read.All`
- `UserAuthenticationMethod.Read.All`
- `Files.Read.All`
- `AuditLog.Read.All`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Microsoft Graph permissions documentation](https://docs.microsoft.com/en-us/graph/permissions-reference).

## Security findings

The SharePoint integration currently scans for the following findings or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### File sharing

Get alerted when calendars in your Microsoft 365 account have their permissions changed to a less secure setting.

| Finding                                             | Severity |
| --------------------------------------------------- | -------- |
| Microsoft File Publicly Accessible Read and Write   | Critical |
| Microsoft Folder Publicly Accessible Read and Write | Critical |
| Microsoft File Publicly Accessible Read Only        | High     |
| Microsoft Folder Publicly Accessible Read Only      | High     |
| Microsoft File Shared Company Wide Read and Write   | Medium   |
| Microsoft File Shared Company Wide Read Only        | Medium   |
| Microsoft Folder Shared Company Wide Read and Write | Medium   |
| Microsoft Folder Shared Company Wide Read Only      | Medium   |
| Calendar shared externally                          | Low      |
