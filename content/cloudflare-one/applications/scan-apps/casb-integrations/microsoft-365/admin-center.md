---
pcx_content_type: reference
title: Admin Center
rss: file
weight: 1
---

# Admin Center

{{<render file="casb/_integration-description.md" withParameters="Admin Center;;Microsoft 365 account">}}

## Integration prerequisites

{{<render file="casb/_m365-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Microsoft 365;;microsoft-365">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Admin Center;;microsoft-365/admin-center">}}

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
