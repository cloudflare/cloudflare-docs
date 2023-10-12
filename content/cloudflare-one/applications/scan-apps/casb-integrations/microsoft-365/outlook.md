---
pcx_content_type: reference
title: Outlook
rss: file
weight: 4
---

# Outlook

{{<render file="casb/_integration-description.md" withParameters="Outlook;;Microsoft 365 account">}}

## Integration prerequisites

{{<render file="casb/_m365-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Microsoft 365;;microsoft-365">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Outlook;;microsoft-365/outlook">}}

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
