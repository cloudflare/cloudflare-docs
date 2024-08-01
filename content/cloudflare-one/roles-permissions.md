---
pcx_content_type: reference
title: Roles and permissions
weight: 13
---

# Roles and permissions

When creating a Cloudflare Zero Trust account, you will be given the Super Administrator role. As a Super Administrator, you can invite members to join your Zero Trust account and assign them different roles. There is no limit to the number of members which can be added to a given account. Any members with the proper permissions will be able to make configuration changes while actively logged into Zero Trust (unless [read-only mode](/cloudflare-one/api-terraform/#set-dashboard-to-read-only) is enabled).

To check the list of members in your account, or to manage roles and permissions, refer to our [Account setup](/fundamentals/setup/manage-members/) documentation.

## Zero Trust roles

Only Super Administrators will be able to assign or remove the following roles from users in their account. Scroll to the right to see a full list of permissions for each role.

{{<table-wrap>}}

|                                 | Access Read | Access Edit | Gateway Read | Gateway Edit | Gateway Report | Billing Read | Billing Edit |
| ------------------------------- | ----------- | ----------- | ------------ | ------------ | -------------- | ------------ | ------------ |
| Super Administrator             | ✅          | ✅          | ✅           | ✅           | ✅             | ✅           | ✅           |
| Cloudflare Zero Trust           | ✅          | ✅          | ✅           | ✅           | ✅             | ✅           | ❌           |
| Cloudflare Access               | ✅          | ✅          | ✅           | ❌           | ✅             | ✅           | ❌           |
| Cloudflare Gateway              | ✅          | ❌          | ✅           | ✅           | ✅             | ✅           | ❌           |
| Cloudflare Zero Trust Read Only | ✅          | ❌          | ✅           | ❌           | ✅             | ✅           | ❌           |
| Cloudflare Zero Trust Reporting | ❌          | ❌          | ❌           | ❌           | ✅             | ✅           | ❌           |

{{</table-wrap>}}

### Cloudflare Zero Trust PII

By default, only Super Administrators can view end users' PII in the Gateway activity logs, such as Device IDs, Source IPs, or user emails. No other roles will have the ability to read PII unless Super Administrators explicitly assign the **Cloudflare Zero Trust PII** role to them.

The Cloudflare Zero Trust PII role should be considered an add-on role, to be combined with any role from the table above. For example, Super Administrators may decide to assign the Cloudflare Gateway role to a user, and add the Cloudflare Zero Trust PII role to allow that user to access PII in the Gateway logs.

{{<Aside type="note">}}
The Cloudflare Zero Trust PII role does not apply to Access audit logs. PII is always visible in Access logs.
{{</Aside>}}
<<<<<<< HEAD
=======

## Email details

Email Security shows you the following email detail information:

- Details
- Action log
- Raw message
- Mail trace

### Details

Email Security displays the following details:

1. **Threat type**:  Add a link where I explain the most common threat types.
2. **Validation**: Email validation methods [SPF](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), [DMARC](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/).
3. **Sender details**: Information include:
    - IP address
    - Registered domain
    - Autonomous sys number: This number identifies your [autonomous system (AS)](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/).
    - Autonomous sys name: This name identifies your autonomous system (AS).
    - Country
4. **Links identified**: A list of malicious links identified by Email Security.
5. **Reasons for detections**: Description of why the email was deemed as Malicious, Suspicious, or Spam.

### Action log

The action log tab allows you to review post-delivery actions performed on your selected message. The action log displays:

- **Date**: Date when the post-delivery action was performed.
- **Activity**: The activity taken on an email. For example, moving the email to the trash folder, releasing a quarantined email, and more.

### Raw message

The raw message tab allows you to view the raw details of the message. You can also choose to download the email message. To download the message, select **Download .EML**.

### Mail trace

The mail trace tab allows you to track the path your selected message took from the sender to the recipient. This tab details:

- **Date**: The date and time when the mail was tracked.
- **Type**: An email can be inbound (email is sent to you from another email), or outbound (emails sent from your email address).
- **Activity**: The activity taken on an email. For example, moving the email to the trash folder, releasing a quarantined email, and more.
>>>>>>> 8097d86ba (Apply suggestions from code review)
