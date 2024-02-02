---
pcx_content_type: reference
title: Microsoft 365
rss: file
---

# Microsoft 365

{{<render file="casb/_integration-description.md" withParameters="Microsoft 365 (M365);;Microsoft 365 account">}}

This integration covers the following Microsoft 365 products:

{{<directory-listing>}}

## Integration prerequisites

{{<render file="casb/_m365-prereqs.md">}}

## Integration permissions

For the Microsoft 365 integration to function, Cloudflare CASB requires the following delegated Microsoft Graph API permissions:

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

{{<render file="casb/_security-findings.md" withParameters="Microsoft 365;;microsoft-365">}}

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
| On-prem user not synced in 7 days.           | Low      |
| User is not a legal adult                    | Low      |
| User configured proxy addresses              | Low      |
| User account disabled                        | Low      |

### File sharing

Get alerted when files in your Microsoft 365 account have their permissions changed to a less secure setting.

{{<render file="casb/_shared-links.md">}}

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

### Data Loss Prevention (optional)

{{<render file="casb/_data-loss-prevention.md">}}

{{<render file="casb/_m365-dlp-findings.md">}}

### Third-party apps

Identify and get alerted about the third-party apps that have access to at least one service in your Microsoft 365 domain. Additionally, receive information about which services are being accessed and by whom to get full visibility into {{<glossary-tooltip term_id="shadow IT" link="https://www.cloudflare.com/learning/access-management/what-is-shadow-it/">}}shadow IT{{</glossary-tooltip>}}.

| Finding                        | Severity |
| ------------------------------ | -------- |
| App Not Certified By Microsoft | Low      |
| App Not Attested By Published  | Low      |
| App Disabled By Microsoft      | Low      |

### Email administrator settings

Discover suspicious or insecure email configurations in your Microsoft domain. Missing SPF and DMARC records make it easier for bad actors to spoof email, while SPF records configured to another domain can be a potential warning sign of malicious activity.

| Finding                                            | Severity |
| -------------------------------------------------- | -------- |
| Microsoft Domain SPF Record Allows Any IP Address  | High     |
| Microsoft Domain SPF Record Not Present            | Medium   |
| Microsoft Domain DMARC Record Not Present          | Medium   |
| Microsoft Domain DMARC Not Enforced                | Medium   |
| Microsoft Domain DMARC Not Enforced for Subdomains | Medium   |
| Microsoft Domain DMARC Only Partially Enforced     | Medium   |
| Microsoft Domain Not Verified                      | Medium   |
| App Certification Expires in 90 Days or Sooner     | Low      |

### Email forwarding

Get alerted when users set their email to be forwarded externally. This can either be a sign of unauthorized activity, or an employee unknowingly sending potentially sensitive information to a personal email.

| Finding                                               | Severity |
| ----------------------------------------------------- | -------- |
| Active Message Rule Forwards Externally As Attachment | Low      |
| Active Message Rule Forwards Externally               | Low      |
| Active Message Rule Redirects Externally              | Low      |

## Microsoft Information Protection (MIP) sensitivity labels

{{<Aside type="note">}}

Requires [Cloudflare DLP](/cloudflare-one/policies/data-loss-prevention/).

{{</Aside>}}

Microsoft provides [MIP sensitivity labels](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide) to classify and protect sensitive data. When you add the CASB Microsoft 365 integration, Cloudflare will automatically retrieve the labels from your Microsoft account and populate them in a [DLP Profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/integration-profiles/).
