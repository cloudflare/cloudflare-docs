---
pcx_content_type: reference
title: OneDrive
rss: file
weight: 2
---

# OneDrive

{{<render file="casb/_integration-description.md" withParameters="OneDrive;;Microsoft 365 account">}}

## Integration prerequisites

- A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
- [Global admin role](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

{{<render file="casb/_integration-perms.md" withParameters="Microsoft 365;;microsoft-365">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="OneDrive;;microsoft-365/onedrive">}}

### File sharing

Get alerted when files in your Microsoft 365 account have their permissions changed to a less secure setting.

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
