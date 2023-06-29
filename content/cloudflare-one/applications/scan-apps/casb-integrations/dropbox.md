---
pcx_content_type: reference
title: Dropbox
rss: file
---

# Dropbox

{{<render file="casb/_integration-description.md" withParameters="Dropbox;;Dropbox account">}}

## Integration prerequisites

- A Dropbox Business plan (Standard, Advanced, Enterprise, or Education)
- Access to a Dropbox Business account with Team admin permissions

## Integration permissions

For the Dropbox integration to function, Cloudflare CASB requires the following Dropbox permissions via an OAuth 2.0 app:

- `account_info.read`
- `files.metadata.read`
- `files.content.read`
- `sharing.read`
- `team_info.read`
- `team_data.member`
- `team_data.governance.write`
- `team_data.governance.read`
- `files.team_metadata.read`
- `members.read`
- `groups.read`
- `sessions.list`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Dropbox API Permissions documentation](https://developers.dropbox.com/oauth-guide#dropbox-api-permissions).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Dropbox;;dropbox">}}

### File and folder sharing

Identify files and folders that have been shared in a potentially insecure fashion.

| Finding                                                               | Severity |
| --------------------------------------------------------------------- | -------- |
| Dropbox file publicly accessible with edit access                     | Critical |
| Dropbox file shared team-wide with edit access                        | High     |
| Dropbox file publicly accessible with view access                     | High     |
| Dropbox folder publicly accessible                                    | High     |
| Dropbox shared link create policy set to default 'Public'             | High     |
| Dropbox file shared team-wide with view access                        | Medium   |
| Dropbox shared folder policy set to default 'Anyone'                  | Medium   |
| Dropbox group creation policy set to 'Admins and Members'             | Medium   |
| Dropbox folder join policy set to 'Can join folders shared by Anyone' | Medium   |
| Dropbox folder member policy set to 'Can share folders with Anyone'   | Medium   |
| Dropbox folder shared company-wide                                    | Medium   |
| Dropbox shared link create policy set to default 'Team-wide'          | Low      |

### Suspicious applications

Detect when suspicious Dropbox applications are linked by members.

| Finding                                         | Severity |
| ----------------------------------------------- | -------- |
| Suspicious Dropbox application linked by member | High     |

### User access and account misconfigurations

Flag user access issues, including users misusing accounts or not following best practices.

| Finding                                                             | Severity |
| ------------------------------------------------------------------- | -------- |
| Dropbox user with admin permissions and unverified secondary email  | Medium   |
| Dropbox user with admin permissions and restricted directory access | Medium   |
| Dropbox user with unverified email                                  | Medium   |
| Invited Dropbox user                                                | Low      |
| Suspended Dropbox user                                              | Low      |
| Dropbox user with secondary email configured                        | Low      |
