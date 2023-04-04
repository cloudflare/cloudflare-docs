---
pcx_content_type: concept
title: Manage PII
weight: 3
---

# Gateway logs and PII

Cloudflare Gateway gives you multiple ways to safely handle your employees’ personally identifiable information (PII). You can choose to exclude PII from activity logging, or you can choose to redact PII from everyone except for designated administrators.

## Types of PII

Cloudflare Gateway can log the following types of PII:

- Source IP
- User email
- User ID
- Device ID
- URL
- Referer
- User agent

## Exclude PII

Enabling this setting means Cloudflare Gateway will log activity without storing any employee PII. Changes to this setting will not change PII storage of any previous logs. This means if Exclude PII is enabled and then disabled, there will be no PII data for logs captured while Exclude PII was enabled. The PII data will be unavailable to all roles within your Zero Trust organization, including the Super Admin.

To enable or disable this setting, log in to [Zero Trust](https://one.dash.cloudflare.com/) and go to **Settings** > **Network** > **Exclude PII**.

## Redact PII

{{<Aside type="note">}}
This feature is only available on Enterprise plans.
{{</Aside>}}

PII is by default redacted from Gateway Activity logs for all permission roles except the Super Admin and users with the [Cloudflare Zero Trust PII role](/cloudflare-one/cloudflare-teams-roles-permissions/#cloudflare-zero-trust-pii) assigned to them. Only the Super Admin can assign roles and determine who has permission to view PII. Redacting PII does not affect the way PII is captured in logs — the data is simply hidden and no information is lost.

To add or remove the Cloudflare Zero Trust PII role for a user, refer to our [Account setup](/fundamentals/account-and-billing/members/) documentation.
