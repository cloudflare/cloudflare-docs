---
pcx_content_type: reference
title: Gmail
rss: file
weight: 2
---

# Gmail

{{<render file="casb/_integration-description.md" withParameters="Gmail;;Google Workspace account">}}

## Integration prerequisites

{{<render file="casb/_google-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Google Workspace;;google-workspace">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Gmail;;google-workspace/gmail">}}

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
