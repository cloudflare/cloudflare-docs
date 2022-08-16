---
type: overview
pcx_content_type: reference
title: API token permissions
weight: 11
layout: list
---

# API token permissions

{{<content-column>}}

Below is a list of the available token permissions.

To obtain an updated list of token permissions, including the permission ID and the scope of each permission, use the [List permission groups](https://api.cloudflare.com/#permission-groups-list-permission-groups) API method.

{{</content-column>}}

## User permissions

The applicable scope of user permissions is `com.cloudflare.api.user`.

{{<table-wrap>}}

| Name               | Description                                          |
| ------------------ | ---------------------------------------------------- |
| API Tokens Read    | Grants read access to user's API Tokens.             |
| API Tokens Write   | Grants write access to user's API Tokens.            |
| Memberships Read   | Grants read access to a user's account memberships.  |
| Memberships Write  | Grants write access to a user's account memberships. |
| User Details Read  | Grants read access to user details.                  |
| User Details Write | Grants write access to user details.                 |

{{</table-wrap>}}

## Account permissions

The applicable scope of account permissions is `com.cloudflare.api.account`.

{{<table-wrap>}}

| Name                                                         | Description                                                                                           |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Access: Apps and Policies Read                               | Grants read access to Cloudflare Access account resources.                                            |
| Access: Apps and Policies Revoke                             | Grants ability to revoke all tokens to Cloudflare Access account resources.                           |
| Access: Apps and Policies Write                              | Grants write access to Cloudflare Access account resources.                                           |
| Access: Audit Logs Read                                      | Grants read access to Cloudflare Access audit logs.                                                   |
| Access: Certificates Read                                    | Grants read access to Cloudflare Access mTLS certificates.                                            |
| Access: Certificates Write                                   | Grants write access to Cloudflare Access mTLS certificates.                                           |
| Access: Device Posture Read                                  | Grants read access to Cloudflare Access Device Posture.                                               |
| Access: Device Posture Write                                 | Grants write access to Cloudflare Access Device Posture.                                              |
| Access: Organizations, Identity Providers, and Groups Read   | Grants read access to Cloudflare Access account resources.                                            |
| Access: Organizations, Identity Providers, and Groups Revoke | Grants ability to revoke user sessions to Cloudflare Access account resources.                        |
| Access: Organizations, Identity Providers, and Groups Write  | Grants write access to Cloudflare Access account resources.                                           |
| Access: Service Tokens Read                                  | Grants read access to Cloudflare Access Service Tokens.                                               |
| Access: Service Tokens Write                                 | Grants write access to Cloudflare Access Service Tokens.                                              |
| Account Analytics Read                                       | Grants read access to analytics.                                                                      |
| Account Firewall Access Rules Read                           | Grants read access to account firewall access rules.                                                  |
| Account Firewall Access Rules Write                          | Grants write access to account firewall access rules.                                                 |
| Account Rule Lists Read                                      | Grants read access to Rule Lists.                                                                     |
| Account Rule Lists Write                                     | Grants write access to Rule Lists.                                                                    |
| Account Rulesets Read                                        | Grants read access to Account Rulesets.                                                               |
| Account Rulesets Write                                       | Grants write access to Account Rulesets.                                                              |
| Account Settings Read                                        | Grants read access to Account resources, account membership, and account level features.              |
| Account Settings Write                                       | Grants write access to Account resources, account membership, and account level features.             |
| Account WAF Read                                             | Grants read access to Account WAF.                                                                    |
| Account WAF Write                                            | Grants write access to Account WAF.                                                                   |
| Cloudflare Tunnel Read                                             | Grants access to view Cloudflare Tunnels.                                                                   |
| Cloudflare Tunnel Write                                            | Grants access to create and delete Cloudflare Tunnels.                                                      |
| Billing Read                                                 | Grants read access to billing profile, subscriptions, and access to fetch invoices and entitlements.  |
| Billing Write                                                | Grants write access to billing profile, subscriptions, and access to fetch invoices and entitlements. |
| DDoS Protection Read                                         | Grants read access to DDoS protection.                                                                |
| DDoS Protection Write                                        | Grants write access to DDoS protection.                                                               |
| DNS Firewall Read                                            | Grants read access to DNS Firewall.                                                                   |
| DNS Firewall Write                                           | Grants write access to DNS Firewall.                                                                  |
| IP Prefixes: BGP On Demand Read                              | Grants access to read IP prefix BGP configuration.                                                    |
| IP Prefixes: BGP On Demand Write                             | Grants access to read and change IP prefix BGP configuration.                                         |
| IP Prefixes: Read                                            | Grants access to read IP prefix settings.                                                             |
| IP Prefixes: Write                                           | Grants access to read/write IP prefix settings.                                                       |
| Images Read                                                  | Grants read access to Images.                                                                         |
| Images Write                                                 | Grants write access to upload Images.                                                                 |
| L4 DDoS Managed Ruleset Read                                 | Grants read access to L4 DDoS Managed Ruleset.                                                        |
| L4 DDoS Managed Ruleset Write                                | Grants write access to L4 DDoS Managed Ruleset.                                                       |
| Load Balancing: Monitors and Pools Read                      | Grants read access to account level load balancer resources.                                          |
| Load Balancing: Monitors and Pools Write                     | Grants write access to account level load balancer resources.                                         |
| Logs Read                                                    | Grants read access to logs using Logpull or Instant Logs.                                                          |
| Logs Write                                                   | Grants read and write access to Logpull, Logpush and read access to Instant Logs.                                                                  |
| Magic Firewall Packet Captures - Read PCAPs API              | Grants read access to Packet Captures.                                                                |
| Magic Firewall Packet Captures - Write PCAPs API             | Grants write access to Packet Captures.                                                               |
| Magic Firewall Read                                          | Grants read access to Magic Firewall.                                                                 |
| Magic Firewall Write                                         | Grants write access to Magic Firewall.                                                                |
| Magic Transit Prefix Read                                    | Grants read access to manage a user's Magic Transit prefixes.                                         |
| Magic Transit Prefix Write                                   | Grants write access to manage a user's Magic Transit prefixes.                                        |
| Bulk URL Redirects Read                                      | Grants read access to Bulk URL Redirects.                                                             |
| Bulk URL Redirects Write                                     | Grants write access to Bulk URL Redirects.                                                            |
| Rule Policies Read                                           | Grants read access to Rule Policies.                                                                  |
| Rule Policies Write                                          | Grants write access to Rule Policies.                                                                 |
| Stream Read                                                  | Grants read access to Cloudflare Stream.                                                              |
| Stream Write                                                 | Grants write access to Cloudflare Stream.                                                             |
| Teams Read                                                   | Grants read access to teams.                                                                          |
| Teams Report                                                 | Grants reporting access to teams.                                                                     |
| Teams Write                                                  | Grants write access to teams.                                                                         |
| Transform Rules Read                                         | Grants read access to Transform Rules.                                                                |
| Transform Rules Write                                        | Grants write access to Transform Rules.                                                               |
| Workers KV Storage Read                                      | Grants read access to Cloudflare Workers KV Storage.                                                  |
| Workers KV Storage Write                                     | Grants write access to Cloudflare Workers KV Storage.                                                 |
| Workers R2 Storage Read                                      | Grants read access to Cloudflare R2 Storage.                                                          |
| Workers R2 Storage Write                                     | Grants write access to Cloudflare R2 Storage.                                                         |
| Workers Scripts Read                                         | Grants read access to Cloudflare Workers scripts.                                                     |
| Workers Scripts Write                                        | Grants write access to Cloudflare Workers scripts.                                                    |
| Workers Tail Read                                            | Grants `wrangler tail` read permissions.                                                              |

{{</table-wrap>}}

## Zone permissions

The applicable scope of zone permissions is `com.cloudflare.api.account.zone`.

{{<table-wrap>}}

| Name                             | Description                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| API Gateway Read                 | Grants read access to API Gateway zone resources.                        |
| API Gateway Edit                 | Grants write access to API Gateway zone resources.                       |
| Access: Apps and Policies Read   | Grants read access to Cloudflare Access zone resources.                  |
| Access: Apps and Policies Revoke | Grants ability to revoke all tokens to Cloudflare Access zone resources. |
| Access: Apps and Policies Edit   | Grants write access to Cloudflare Access zone resources.                 |
| Analytics Read                   | Grants read access to analytics.                                         |
| Apps Edit                        | Grants full access to Cloudflare Apps.                                   |
| Bot Management Read              | Grants read access to Bot Management.                                    |
| Bot Management Edit              | Grants write access to Bot Management.                                   |
| Cache Purge                      | Grants access to purge cache.                                            |
| DNS Read                         | Grants read access to DNS.                                               |
| DNS Edit                         | Grants write access to DNS.                                              |
| Dynamic Redirect Read            | Grants read access to zone level Dynamic Redirect.                       |
| Dynamic Redirect Edit            | Grants write access to zone level Dynamic Redirect.                      |
| Email Routing Rules Read         | Grants read access to Email Routing Rules.                               |
| Email Routing Rules Edit         | Grants write access to Email Routing Rules.                              |
| Firewall Services Read           | Grants read access to Firewall resources.                                |
| Firewall Services Edit           | Grants write access to Firewall resources.                               |
| HTTP DDoS Managed Ruleset Read   | Grants read access to HTTP DDoS Managed Ruleset.                         |
| HTTP DDoS Managed Ruleset Edit   | Grants write access to HTTP DDoS Managed Ruleset.                        |
| Health Checks Read               | Grants read access to Health Checks.                                     |
| Health Checks Edit               | Grants write access to Health Checks.                                    |
| Load Balancers Read              | Grants read access to load balancers and associated resources.           |
| Load Balancers Edit              | Grants write access to load balancers and associated resources.          |
| Logs Read                        | Grants read access to logs and Logpush jobs.                             |
| Logs Edit                        | Grants write access to Logpush jobs.                                     |
| Origin Read                      | Grants read access to Origin Rules.                                      |
| Origin Edit                      | Grants write access to Origin Rules.                                     |
| Page Rules Read                  | Grants read access to Page Rules.                                        |
| Page Rules Edit                  | Grants write access to Page Rules.                                       |
| SSL and Certificates Read        | Grants read access to SSL configuration and certificate management.      |
| SSL and Certificates Edit        | Grants write access to SSL configuration and certificate management.     |
| Sanitize Read                    | Grants read access to sanitization.                                      |
| Sanitize Edit                    | Grants write access to sanitization.                                     |
| Waiting Rooms Read               | Grants read access to Waiting Rooms.                                     |
| Waiting Rooms Edit               | Grants write access to Waiting Rooms.                                    |
| Web3 Hostnames Read              | Grants read access to Web3 Hostnames.                                    |
| Web3 Hostnames Edit              | Grants write access to Web3 Hostnames.                                   |
| Workers Routes Read              | Grants read access to Cloudflare Workers and Workers KV Storage.         |
| Workers Routes Edit              | Grants write access to Cloudflare Workers and Workers KV Storage.        |
| Zaraz Settings Read              | Grants read access to Zaraz zone level settings.                         |
| Zaraz Settings Edit              | Grants write access to Zaraz zone level settings.                        |
| Zone Read                        | Grants read access to zone management.                                   |
| Zone Edit                        | Grants write access to zone management.                                  |
| Zone Settings Read               | Grants read access to zone settings.                                     |
| Zone Settings Edit               | Grants write access to zone settings.                                    |
| Transform Rules Read             | Grants read access to Transform Rules at zone level.                     |
| Transform Rules Edit             | Grants write access to Transform Rules at zone level.                    |
| Zone WAF Read                    | Grants read access to Zone WAF.                                          |
| Zone WAF Edit                    | Grants write access to Zone WAF.                                         |

{{</table-wrap>}}
