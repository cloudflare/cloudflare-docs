---
pcx-content-type: reference
title: Google Workspace
weight: 2
---

# Google Workspace

The Google Workspace integration detects a variety of user security, data loss prevention, and misconfiguration risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan.
* [Super Admin privileges](https://support.google.com/a/answer/2405986) in Google Workspace.

## Integration permissions

For the Google Workspace integration to function, CASB requires the following API scopes for access:

`https://www.googleapis.com/auth/admin.directory.domain.readonly`
`https://www.googleapis.com/auth/admin.directory.user.readonly`
`https://www.googleapis.com/auth/admin.directory.user.security`
`https://www.googleapis.com/auth/calendar`
`https://www.googleapis.com/auth/cloud-platform.read-only`
`https://www.googleapis.com/auth/drive.readonly`
`https://www.googleapis.com/auth/gmail.settings.basic`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Google Workspace Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/v1/guides/authorizing).

## Security findings

The Google Workspace integration currently scans for the following types of security risks:

### Users

* **Users without 2FA enabled** — Google Workspace users who do not have two-factor authentication (2FA) enabled run the risk of having their accounts compromised without the additional layer of security. This puts your entire organization at risk should a bad actor gain access to the user's account.

* **Inactive users** — Having inactive users still present in your Workspace account may present potential compliance violations related to employee offboarding. Inactive users also increase the risk of account misuse should someone else gain access to their account.

* **Insecure user behaviors** — Discover risks across user accounts and settings, such as activity from suspended users and publicly shared Google Calendars.

### Google Drive

* **Files and folders shared externally** — Discover which files and folders in your drives (including Google Docs, Google Sheets, Google Slides, and more) have been shared outside of your organization, and with whom.

* **File visibility changes** — Get alerted when files have their visibility changed to a less secure setting, including _Anyone with the link_. Additionally, detect changes to Write settings (Viewer, Commenter, Editor) and download permissions.

### Apps

* **Services that a 3rd-party app has access to** — Identify and get alerted about the third-party apps that have access to at least one service in your Google Workspace domain. Additionally, receive information about which services are being accessed and by who to get full visibility into Shadow IT.

### Gmail

* **Missing SPF and DMARC records** — Missing SPF and DMARC records make it easier for bad actors to spoof email, ensuring that your messages are delivered correctly and securely.

* **Google Workspace users forwarding their email externally** — When users in your Google Workspace domain set their email to be forwarded to an external email, this can either be a sign of unauthorized activity, or an employee unknowingly sending potentially sensitive information to a personal email.

* **Suspicious email configurations** — Suspicious email configurations, like SPF records configured to a domain that belongs to neither your company or Google, can be a potential warning sign of malicious or unauthorized activity in your Google Workspace domain.
