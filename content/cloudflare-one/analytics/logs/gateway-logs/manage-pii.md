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

Enabling this setting means Cloudflare Gateway will log activity without storing any employee PII. Disabling the feature will not have any retroactive effect on those logs, because Gateway will not capture any PII in the first place. The PII data will be unavailable to all roles within your Zero Trust organization, including the Super Admin.

To enable or disable this setting, log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/) and navigate to **Settings** > **Network** > **Exclude PII**.

## Redact PII

{{<Aside type="note">}}
This feature is only available on Enterprise plans.
{{</Aside>}}

PII is by default redacted from Gateway Activity logs for all permission roles except the Super Admin and users with the [Cloudflare Zero Trust PII role](/cloudflare-one/cloudflare-teams-roles-permissions/#protecting-personally-identifiable-information-pii) assigned to them. Only the Super Admin can assign roles and determine who has permission to view PII. Redacting PII does not affect the way PII is captured in logs — the data is simply hidden and no information is lost.

To add or remove the Cloudflare Zero Trust PII role for a user, refer to our [Account setup](/fundamentals/account-and-billing/account-setup/manage-account-members/) documentation.
