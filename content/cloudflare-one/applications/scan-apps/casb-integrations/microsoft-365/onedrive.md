---
pcx_content_type: reference
title: OneDrive
rss: file
weight: 2
---

# OneDrive

{{<render file="casb/_integration-description.md" withParameters="OneDrive;;Microsoft 365 account">}}

## Integration prerequisites

{{<render file="casb/_m365-prereqs.md">}}

## Integration permissions

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
