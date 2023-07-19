---
pcx_content_type: reference
title: Salesforce
rss: file
---

# Salesforce

{{<render file="casb/_integration-description.md" withParameters="Salesforce;;Salesforce environment">}}

## Integration prerequisites

- A Salesforce environment (most editions are compatible)
- Permissions to a Salesforce organization with either:

  - System Administrator permission
  - Permissions for View Setup and Configuration, Customize Applications, and Modify All Data

## Integration permissions

For the Salesforce integration to function, Cloudflare CASB requires the following Salesforce permissions via a Connected App:

- `Manage user data via APIs (api)`
- `Manage user data via Web browsers (web)`
- `Perform requests at any time (refresh_token, offline_access)`
- `Access unique user identifiers (openid)`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Salesforce OAuth Tokens and Scopes documentation](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_tokens_scopes.htm).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Salesforce;;salesforce">}}

### File sharing

Identify uploaded content, files, and attachments that have been shared in a potentially insecure fashion.

| Finding                                                                        | Severity |
| ------------------------------------------------------------------------------ | -------- |
| Salesforce Content Document Publicly Accessible Without Password               | Critical |
| Salesforce Content Document Publicly Accessible Weak Password                  | High     |
| Salesforce Content Document Publicly Accessible Password Protected             | Medium   |
| Salesforce Content Document Shared and Not Viewed in 1 Year (Stale Permission) | Medium   |
| Salesforce Large Content Document (2 GB+)                                      | Medium   |

### Account misconfigurations

Discover account and admin-level settings that have been configured in an insecure way.

| Finding                                                  | Severity |
| -------------------------------------------------------- | -------- |
| Salesforce Domain without HTTPS                          | High     |
| Salesforce Default Account Record Access Allows Edit     | Medium   |
| Salesforce Default Case Record Access Allows Edit        | Medium   |
| Salesforce Default Contact Record Access Allows Edit     | Medium   |
| Salesforce Default Lead Record Access Allows Edit        | Medium   |
| Salesforce Default Opportunity Record Access Allows Edit | Medium   |
| Salesforce Organization with Active Compliance BCC Email | Low      |

### User access

Flag user access issues, including account misuse and users not following best practices.

| Finding                                                    | Severity |
| ---------------------------------------------------------- | -------- |
| Salesforce User Sending Email with Different Email Address | Medium   |
| Salesforce User Inactive                                   | Low      |
| Salesforce User Never Logged In                            | Low      |
| Salesforce User Not Logged In within 90 Days               | Low      |
