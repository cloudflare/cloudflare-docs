---
pcx_content_type: reference
title: SharePoint
rss: file
weight: 3
---

# SharePoint

{{<render file="casb/_integration-description.md" withParameters="SharePoint;;Microsoft 365 account">}}

## Integration prerequisites

{{<render file="casb/_m365-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Microsoft 365;;microsoft-365">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="SharePoint;;microsoft-365/sharepoint">}}

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

### Data Loss Prevention (optional)

{{<render file="casb/_data-loss-prevention.md">}}

{{<render file="casb/_m365-dlp-findings.md">}}
