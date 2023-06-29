---
pcx_content_type: reference
title: Outlook
rss: file
weight: 4
---

# Outlook

{{<render file="casb/_integration-description.md" withParameters="Outlook;;Microsoft 365 account">}}

## Integration prerequisites

- A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
- [Global admin role](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

{{<render file="casb/_integration-perms.md" withParameters="Microsoft 365;;microsoft-365">}}

## Security findings

The Outlook integration currently scans for the following findings or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### Calendar sharing

Get alerted when calendars in your Microsoft 365 account have their permissions changed to a less secure setting.

| Finding                    | Severity |
| -------------------------- | -------- |
| Calendar shared externally | Low      |

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
