---
pcx_content_type: reference
title: Box
---

# Box

The Box integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Box account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Box account on a Business plan (Business, Business Plus, Enterprise, Enterprise Plus)

* Access to a Box Business account with Admin permission

## Integration permissions

For the Box integration to function, Cloudflare CASB requires the following Box permissions via an OAuth 2.0 app:

* `Read all files and folders stored in Box`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about the permission, refer to the [Box Scopes documentation](https://developer.box.com/guides/api-calls/permissions-and-errors/scopes/#read-all-files-and-folders).

## Security findings

The Box integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](/cloudflare-one/applications/scan-apps/manage-findings/#severity-levels).

### File sharing

Identify files and folders that have been shared in a potentially insecure fashion.

| Finding                                               | Severity |
|-------------------------------------------------------|----------|
| Box File publicly accessible read only                | High     |
| Box File publicly accessible read write               | Critical |
| Box File shared company wide read only                | Medium   |
| Box File shared company wide read write               | High     |
| Box File shared company wide with high download count | Medium   |
| Box File shared company wide with high view count     | Low      |
| Box Folder publicly accessible read only              | Medium   |
| Box Folder publicly accessible read write             | High     |
| Box Folder shared company wide read only              | Low      |
| Box Folder shared company wide read write             | Medium   |
| Box Folder that can be shared by anyone               | Medium   |
| Box Folder with external email upload access          | Low      |
| Box File larger than 2GB                              | Low      |
| Box publicly accessible file with high download count | High     |
| Box publicly accessible file with high view count     | Medium   |
| Box Shared folder with high download count            | Medium   |
| Box Shared folder with high view count                | Low      |

### User access

Flag user access issues, including account misuse and users not following best practices.

| Finding                                             | Severity |
|-----------------------------------------------------|----------|
| Box Admin not required to use 2FA                   | High     |
| Box Inactive Admin user                             | Medium   |
| Box Inactive user                                   | Low      |
| Box User allowed to collaborate with external users | Low      |
| Box User not required to use 2FA                    | Medium   |
| Box User with email alias configured                | Low      |
| Box User with unconfirmed notification email        | Low      |

### Account misconfigurations

Discover account and admin-level settings that have been configured in a potentially insecure way.

| Finding            | Severity |
|--------------------|----------|
| Box Active Webhook | Low      |