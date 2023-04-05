---
pcx_content_type: reference
title: Microsoft 365
---

# Microsoft 365

The Microsoft 365 (M365) integration detects a variety of user security, data loss prevention, and misconfiguration risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

This integration covers Microsoft 365 products, including OneDrive and SharePoint.

## Integration prerequisites

* A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription.
* [Global admin role](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365.

## Integration permissions

For the Microsoft 365 integration to function, Cloudflare CASB requires the following delegated Microsoft Graph API permissions:

* `Application.Read.All`
* `Calendars.Read`
* `Domain.Read.All`
* `Group.Read.All`
* `InformationProtectionPolicy.Read.All`
* `MailboxSettings.Read`
* `offline_access`
* `RoleManagement.Read.All`
* `User.Read.All`
* `UserAuthenticationMethod.Read.All`
* `Files.Read.All`
* `AuditLog.Read.All`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Microsoft Graph permissions documentation](https://docs.microsoft.com/en-us/graph/permissions-reference).

## Security findings

The Microsoft 365 integration currently scans for the following findings or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### User account settings

Keep user accounts safe by ensuring the following settings are maintained. Review password configurations and password strengths to ensure alignment to your organization's security policies and best practices.

| Finding                                      | Severity |
|----------------------------------------------|----------|
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

Get alerted when calendars in your Microsoft 365 account have their permissions changed to a less secure setting.

|  Finding                                            | Severity |
|-----------------------------------------------------|----------|
| Microsoft File Publicly Accessible Read and Write   | Critical |
| Microsoft File Publicly Accessible Read Only        | High     |
| Microsoft File Shared Company Wide Read and Write   | Medium   |
| Microsoft File Shared Company Wide Read Only        | Medium   |
| Microsoft Folder Publicly Accessible Read and Write | Critical |
| Microsoft Folder Publicly Accessible Read Only      | High     |
| Microsoft Folder Shared Company Wide Read and Write | Medium   |
| Microsoft Folder Shared Company Wide Read Only      | Medium   |
| Calendar shared externally                          | Low      |

### Third-party apps

Identify and get alerted about the third-party apps that have access to at least one service in your Microsoft 365 domain. Additionally, receive information about which services are being accessed and by whom to get full visibility into Shadow IT.

| Finding                        | Severity |
|--------------------------------|----------|
| App Not Certified By Microsoft | Low      |
| App Not Attested By Published  | Low      |
| App Disabled By Microsoft      | Low      |

### Email administrator settings

Discover suspicious or insecure email configurations in your Microsoft domain. Missing SPF and DMARC records make it easier for bad actors to spoof email, while SPF records configured to another domain can be a potential warning sign of malicious activity.

| Finding                                            | Severity |
|----------------------------------------------------|----------|
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
|-------------------------------------------------------|----------|
| Active Message Rule Forwards Externally As Attachment | Low      |
| Active Message Rule Forwards Externally               | Low      |
| Active Message Rule Redirects Externally              | Low      |

## Microsoft Information Protection (MIP) sensitivity labels

{{<Aside type="note">}}

Requires [Cloudflare DLP](/cloudflare-one/policies/data-loss-prevention/).

{{</Aside>}}

Microsoft provides [MIP sensitivity labels](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide) to classify and protect sensitive data. When you add the CASB Microsoft 365 integration, Cloudflare will automatically retrieve the labels from your Microsoft account and populate them in a [DLP Profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/integration-profiles/).
