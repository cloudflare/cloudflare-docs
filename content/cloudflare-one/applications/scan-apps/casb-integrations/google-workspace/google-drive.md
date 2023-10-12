---
pcx_content_type: reference
title: Google Drive
rss: file
weight: 1
---

# Google Drive

{{<render file="casb/_integration-description.md" withParameters="Google Drive;;Google Workspace account">}}

## Integration prerequisites

{{<render file="casb/_google-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Google Workspace;;google-workspace">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Google Drive;;google-workspace/google-drive">}}

### File sharing

| Finding                                    | Severity | Description                                                                                               |
| ------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| File Publicly Accessible Read and Write    | Critical | A Google Drive file is publicly accessible on the Internet that anyone can read or write.                 |
| File Publicly Accessible Read Only         | High     | A Google Drive file is publicly accessible on the Internet that anyone can read.                          |
| File Shared Outside Company Read and Write | High     | A Google Drive file is shared with another organization or outside party with read and write permissions. |
| File Shared Outside Company Read Only      | Medium   | A Google Drive file is shared with another organization or outside party with read permissions.           |
| File Shared Company Wide Read and Write    | Medium   | A Google Drive file is shared with the entire company with read and write permissions.                    |
| File Shared Company Wide Read Only         | Medium   | A Google Drive file is shared with the entire company with read permissions.                              |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](/cloudflare-one/applications/scan-apps/casb-dlp/) to your CASB integration.

| Finding                                                           | Severity | Description                                                                                           |
| ----------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| File Publicly Accessible Read and Write with DLP Profile match    | Critical | A Google Drive file contains sensitive data that anyone on the Internet can read or write.            |
| File Publicly Accessible Read Only with DLP Profile match         | Critical | A Google Drive file contains sensitive data that anyone on the Internet can read.                     |
| File Shared Outside Company Read and Write with DLP Profile match | Critical | A Google Drive file contains sensitive data that user(s) outside your organization can read or write. |
| File Shared Outside Company Read Only with DLP Profile match      | Critical | A Google Drive file contains sensitive data that user(s) outside your organization can read.          |
| File Shared Company-Wide Read and Write with DLP Profile match    | High     | A Google Drive file contains sensitive data that all users at your organization can read or write.    |
| File Shared Company-Wide Read Only with DLP Profile match         | High     | A Google Drive file contains sensitive data that all users at your organization can read.             |
