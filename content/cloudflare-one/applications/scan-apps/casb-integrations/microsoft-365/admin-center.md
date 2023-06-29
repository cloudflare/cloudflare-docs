---
pcx_content_type: reference
title: Admin Center
rss: file
weight: 1
---

# Admin Center

{{<render file="casb/_integration-description.md" withParameters="Admin Center;;Microsoft 365 account">}}

## Integration prerequisites

- A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
- [Global admin role](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

{{<render file="casb/_integration-perms.md" withParameters="Microsoft 365;;microsoft-365">}}

## Security findings

The Admin Center integration currently scans for the following findings or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### User account settings

Keep user accounts safe by ensuring the following settings are maintained. Review password configurations and password strengths to ensure alignment to your organization's security policies and best practices.

| Finding                                      | Severity |
| -------------------------------------------- | -------- |
| FIDO2 authentication method unattested       | Low      |
| Provisioning error for on-prem user          | Low      |
| Password expiration disabled for user        | Low      |
| Password not changed in last 90 days         | Low      |
| Strong password disabled for user            | Low      |
| Cloud sync disabled for on-prem user         | Low      |
| Weak Windows Hello for Business key strength | Low      |
| On-prem user not synced in 7 days            | Low      |
| User is not a legal adult                    | Low      |
| User configured proxy addresses              | Low      |
| User account disabled                        | Low      |

### Third-party apps

Identify and get alerted about the third-party apps that have access to at least one service in your Microsoft 365 domain. Additionally, receive information about which services are being accessed and by whom to get full visibility into Shadow IT.

| Finding                        | Severity |
| ------------------------------ | -------- |
| App Not Certified By Microsoft | Low      |
| App Not Attested By Published  | Low      |
| App Disabled By Microsoft      | Low      |
