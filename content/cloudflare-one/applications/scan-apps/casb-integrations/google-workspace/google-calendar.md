---
pcx_content_type: reference
title: Google Calendar
rss: file
---

# Google Calendar

The Google Calendar integration detects a variety of user security, data loss prevention, and misconfiguration risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

- A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
- [Super Admin privileges](https://support.google.com/a/answer/2405986) in Google Workspace

## Integration permissions

For the Google Calendar integration to function, Cloudflare CASB requires the following Google API permissions:

- `https://www.googleapis.com/auth/admin.directory.domain.readonly`
- `https://www.googleapis.com/auth/admin.directory.user.readonly`
- `https://www.googleapis.com/auth/admin.directory.user.security`
- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/cloud-platform.read-only`
- `https://www.googleapis.com/auth/drive.readonly`
- `https://www.googleapis.com/auth/gmail.settings.basic`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Google Workspace Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/v1/guides/authorizing).

## Security findings

The Google Calendar integration currently scans for the following findings, or security risks.

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its RSS feed.

### Calendar sharing

| Finding                                       | Severity | Description                                                                           |
| --------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| Google Workspace Calendar Publicly Accessible | Medium   | A user's Google Calendar is publicly accessible on the Internet that anyone can read. |
