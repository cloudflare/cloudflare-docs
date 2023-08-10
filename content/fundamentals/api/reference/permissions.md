---
title: API token permissions
pcx_content_type: reference
weight: 20
---

# API token permissions

Permissions are segmented into three categories based on resource:

- Zone permissions
- Account permissions
- User permissions

Each category contains permission groups related to those resources. DNS permissions belong to the Zone category, while Billing permissions belong to the Account category. Below is a list of the available token permissions.

To obtain an updated list of token permissions, including the permission ID and the scope of each permission, use the [List permission groups](/api/operations/permission-groups-list-permission-groups) endpoint.

## User permissions

The applicable scope of user permissions is `com.cloudflare.api.user`.

| Name              | Description                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| API Tokens Read   | Grants read access to user's [API tokens](/fundamentals/api/reference/permissions/).                      |
| API Tokens Edit   | Grants write access to user's [API tokens](/fundamentals/api/reference/permissions/).                     |
| Memberships Read  | Grants read access to a user's [account memberships](/fundamentals/account-and-billing/members/manage/).  |
| Memberships Edit  | Grants write access to a user's [account memberships](/fundamentals/account-and-billing/members/manage/). |
| User Details Read | Grants read access to user details.                                                                       |
| User Details Edit | Grants write access to user details.                                                                      |

## Account permissions

The applicable scope of account permissions is `com.cloudflare.api.account`.

| Name                                                         | Description                                                                                                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Access: Apps and Policies Read                               | Grants read access to [Cloudflare Access](/cloudflare-one/policies/access/) account resources.                                                           |
| Access: Apps and Policies Revoke                             | Grants ability to revoke all tokens to [Cloudflare Access](/cloudflare-one/policies/access/) account resources.                                          |
| Access: Apps and Policies Edit                               | Grants write access to [Cloudflare Access](/cloudflare-one/policies/access/) account resources.                                                          |
| Access: Audit Logs Read                                      | Grants read access to [Cloudflare Access audit logs](/cloudflare-one/insights/logs/audit-logs/).                                                         |
| Access: Custom Pages Read                                    | Grants read access to [Cloudflare Access Custom Pages](/cloudflare-one/policies/gateway/configuring-block-page/).                                        |
| Access: Custom Pages Edit                                    | Grants write access to [Cloudflare Access Custom Pages](/cloudflare-one/policies/gateway/configuring-block-page/).                                       |
| Access: Device Posture Read                                  | Grants read access to [Cloudflare Access Device Posture](/cloudflare-one/identity/devices/).                                                             |
| Access: Device Posture Edit                                  | Grants write access to [Cloudflare Access Device Posture](/cloudflare-one/identity/devices/).                                                            |
| Access: Mutual TLS Certificates Read                         | Grants read access to [Cloudflare Access mTLS certificates](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).            |
| Access: Mutual TLS Certificates Edit                         | Grants write access to [Cloudflare Access mTLS certificates](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).           |
| Access: Organizations, Identity Providers, and Groups Read   | Grants read access to [Cloudflare Access account resources](/cloudflare-one/identity/)s.                                                                 |
| Access: Organizations, Identity Providers, and Groups Revoke | Grants ability to revoke user sessions to [Cloudflare Access account resources](/cloudflare-one/identity/).                                              |
| Access: Organizations, Identity Providers, and Groups Edit   | Grants write access to [Cloudflare Access account resources](/cloudflare-one/identity/).                                                                 |
| Access: Service Tokens Read                                  | Grants read access to [Cloudflare Access Service Tokens](/cloudflare-one/identity/service-tokens/).                                                      |
| Access: Service Tokens Edit                                  | Grants write access to [Cloudflare Access Service Tokens](/cloudflare-one/identity/service-tokens/).                                                     |
| Access: SSH Auditing Read                                    | Grants read access to [SSH Auditing](/cloudflare-one/policies/gateway/network-policies/ssh-logging/).                                                    |
| Access: SSH Auditing Edit                                    | Grants write access to [SSH Auditing](/cloudflare-one/policies/gateway/network-policies/ssh-logging/).                                                   |
| Account Analytics Read                                       | Grants read access to [account analytics](/analytics/account-and-zone-analytics/account-analytics/).                                                     |
| Account Custom Pages Read                                    | Grants read access to account-level [Custom Pages](/support/more-dashboard-apps/cloudflare-custom-pages/configuring-custom-pages-error-and-challenge/).  |
| Account Custom Pages Edit                                    | Grants write access to account-level [Custom Pages](/support/more-dashboard-apps/cloudflare-custom-pages/configuring-custom-pages-error-and-challenge/). |
| Account Filter Lists Read                                    | Grants read access to Account Filter Lists.                                                                                                              |
| Account Filter Lists Edit                                    | Grants write access to Account Filter Lists.                                                                                                             |
| Account Firewall Access Rules Read                           | Grants read access to account firewall access rules.                                                                                                     |
| Account Firewall Access Rules Edit                           | Grants write access to account firewall access rules.                                                                                                    |
| Account Rulesets Read                                        | Grants read access to [Account Rulesets](/ruleset-engine/about/rulesets/).                                                                               |
| Account Rulesets Edit                                        | Grants write access to [Account Rulesets](/ruleset-engine/about/rulesets/).                                                                              |
| Account Settings Read                                        | Grants read access to [Account resources, account membership, and account level features](/fundamentals/account-and-billing/).                           |
| Account Settings Edit                                        | Grants write access to [Account resources, account membership, and account level features](/fundamentals/account-and-billing/).                          |
| Account: SSL and Certificates Read                           | Grants read access to [SSL and Certificates](/ssl/).                                                                                                     |
| Account: SSL and Certificates Edit                           | Grants write access to [SSL and Certificates](/ssl/).                                                                                                    |
| Account WAF Read                                             | Grants read access to [Account WAF](/waf/).                                                                                                              |
| Account WAF Edit                                             | Grants write access to [Account WAF](/waf/).                                                                                                             |
| Allow Request Tracer Read                                    | Grants read access to Request Tracer.                                                                                                                    |
| API Gateway Read                                             | Grants read access to [API Gateway (including API Shield)](/api-shield/) for all domains in an account.                                                  |
| API Gateway Edit                                             | Grants write access to [API Gateway (including API Shield)](/api-shield/) for all domains in an account.                                                 |
| Billing Read                                                 | Grants read access to [billing profile, subscriptions, and access to fetch invoices](/fundamentals/account-and-billing/) and entitlements.               |
| Billing Edit                                                 | Grants write access to [billing profile, subscriptions, and access to fetch invoices and entitlements](/fundamentals/account-and-billing/).              |
| Bulk URL Redirects Read                                      | Grants read access to [Bulk URL Redirects](/rules/url-forwarding/bulk-redirects/).                                                                       |
| Bulk URL Redirects Edit                                      | Grants write access to [Bulk URL Redirects](/rules/url-forwarding/bulk-redirects/).                                                                      |
| China Network Steering Read                                  | Grants read access to [China Network Steering](/china-network/).                                                                                         |
| China Network Steering Edit                                  | Grants write access to [China Network Steering](/china-network/).                                                                                        |
| Cloudflare DEX Read                                          | Grants read access to [Digital Experience Monitoring](/cloudflare-one/insights/dex/).                                                                    |
| Cloudflare DEX Edit                                          | Grants write access to [Digital Experience Monitoring](/cloudflare-one/insights/dex/).                                                                   |
| Cloudflare Images Read                                       | Grants read access to [Cloudflare Images](/images/cloudflare-images/).                                                                                   |
| Cloudflare Images Edit                                       | Grants write access to [Cloudflare Images](/images/cloudflare-images/).                                                                                  |
| Cloudflare Pages Read                                        | Grants access to view [Cloudflare Pages](/pages/) projects.                                                                                              |
| Cloudflare Pages Edit                                        | Grants access to create, edit and delete [Cloudflare Pages](/pages/) projects.                                                                           |
| Cloudflare Tunnel Read                                       | Grants access to view [Cloudflare Tunnels](/cloudflare-one/connections/connect-networks/).                                                               |
| Cloudflare Tunnel Edit                                       | Grants access to create and delete [Cloudflare Tunnels](/cloudflare-one/connections/connect-networks/).                                                  |
| Constellation Read                                           | Grants read access to [Constellation](/constellation/).                                                                                                  |
| Constellation Edit                                           | Grants write access to [Constellation](/constellation/).                                                                                                 |
| D1 Read                                                      | Grants read access to [D1](/d1/).                                                                                                                        |
| D1 Edit                                                      | Grants write access to [D1](/d1/).                                                                                                                       |
| DDoS Protection Read                                         | Grants read access to [DDoS protection](/ddos-protection/).                                                                                              |
| DDoS Protection Edit                                         | Grants write access to [DDoS protection](/ddos-protection/).                                                                                             |
| DNS Firewall Read                                            | Grants read access to [DNS Firewall](/dns/dns-firewall/).                                                                                                |
| DNS Firewall Edit                                            | Grants write access to [DNS Firewall](/dns/dns-firewall/).                                                                                               |
| Email Routing Addresses Read                                 | Grants read access to [Email Routing Addresses](/email-routing/setup/email-routing-addresses/).                                                          |
| Email Routing Addresses Edit                                 | Grants write access to [Email Routing Addresses](/email-routing/setup/email-routing-addresses/).                                                         |
| Intel Read                                                   | Grants read access to [Intel](/security-center/intel-apis/).                                                                                             |
| Intel Edit                                                   | Grants write access to [Intel](/security-center/intel-apis/).                                                                                            |
| IOT Read                                                     | Grants read access to [IOT](https://blog.cloudflare.com/rethinking-internet-of-things-security/).                                                        |
| IOT Edit                                                     | Grants write access to [IOT](https://blog.cloudflare.com/rethinking-internet-of-things-security/).                                                       |
| IP Prefixes: Read                                            | Grants access to read IP prefix settings.                                                                                                                |
| IP Prefixes: Edit                                            | Grants access to read/write IP prefix settings.                                                                                                          |
| IP Prefixes: BGP On Demand Read                              | Grants access to read IP prefix BGP configuration.                                                                                                       |
| IP Prefixes: BGP On Demand Edit                              | Grants access to read and change IP prefix BGP configuration.                                                                                            |
| L3/4 DDoS Managed Ruleset Read                               | Grants read access to [L3/4 DDoS managed ruleset](/ddos-protection/managed-rulesets/network/).                                                           |
| L3/4 DDoS Managed Ruleset Edit                               | Grants write access to [L3/4 DDoS managed ruleset](/ddos-protection/managed-rulesets/network/).                                                          |
| Load Balancing: Monitors and Pools Read                      | Grants read access to account level [load balancer resources](/load-balancing/).                                                                         |
| Load Balancing: Monitors and Pools Edit                      | Grants write access to account level [load balancer resources](/load-balancing/).                                                                        |
| Logs Read                                                    | Grants read access to logs using [Logpull or Instant Logs](/logs/).                                                                                      |
| Logs Edit                                                    | Grants read and write access to [Logpull, Logpush, and Instant Logs](/logs/).                                                                            |
| Magic Firewall Read                                          | Grants read access to [Magic Firewall](/magic-firewall/).                                                                                                |
| Magic Firewall Edit                                          | Grants write access to [Magic Firewall](/magic-firewall/).                                                                                               |
| Magic Firewall Packet Captures - Read PCAPs API              | Grants read access to [Packet Captures](/magic-firewall/how-to/collect-pcaps/).                                                                          |
| Magic Firewall Packet Captures - Edit PCAPs API              | Grants write access to [Packet Captures](/magic-firewall/how-to/collect-pcaps/).                                                                         |
| Magic Network Monitoring Read                                | Grants read access to [Magic Network Monitoring](/magic-network-monitoring/).                                                                            |
| Magic Network Monitoring Edit                                | Grants read access to [Magic Network Monitoring](/magic-network-monitoring/).                                                                            |
| Magic Transit Read                                           | Grants read access to manage a user's [Magic Transit prefixes](/magic-transit/how-to/advertise-prefixes/).                                               |
| Magic Transit Edit                                           | Grants write access to manage a user's [Magic Transit prefixes](/magic-transit/how-to/advertise-prefixes/).                                              |
| Notifications Read                                           | Grants read access to [Notifications](/fundamentals/notifications/).                                                                                     |
| Notifications Edit                                           | Grants read access to [Notifications](/fundamentals/notifications/).                                                                                     |
| Page Shield Read                                             | Grants read access to [Page Shield](/page-shield/).                                                                                                      |
| Page Shield Edit                                             | Grants read access to [Page Shield](/page-shield/).                                                                                                      |
| Pub/Sub Read                                                 | Grants read access to [Pub/Sub](/pub-sub/).                                                                                                              |
| Pub/Sub Edit                                                 | Grants read access to [Pub/Sub](/pub-sub/).                                                                                                              |
| Rule Policies Read                                           | Grants read access to Rule Policies.                                                                                                                     |
| Rule Policies Edit                                           | Grants write access to Rule Policies.                                                                                                                    |
| Stream Read                                                  | Grants read access to [Cloudflare Stream](/stream/).                                                                                                     |
| Stream Edit                                                  | Grants write access to [Cloudflare Stream](/stream/).                                                                                                    |
| Transform Rules Read                                         | Grants read access to [Transform Rules](/rules/transform/).                                                                                              |
| Transform Rules Edit                                         | Grants write access to [Transform Rules](/rules/transform/).                                                                                            |
| Turnstile Read                                               | Grants read access to [Turnstile](/turnstile/).                                                                                                          |
| Turnstile Edit                                               | Grants read access to [Turnstile](/turnstile/).                                                                                                          |
| URL Scanner Read                                             | Grants read access to [URL Scanner](/radar/investigate/url-scanner/).                                                                                    |
| URL Scanner Edit                                             | Grants read access to [URL Scanner](/radar/investigate/url-scanner/).                                                                                    |
| Workers KV Storage Read                                      | Grants read access to [Cloudflare Workers KV Storage](/workers/runtime-apis/kv/).                                                                        |
| Workers KV Storage Edit                                      | Grants write access to [Cloudflare Workers KV Storage](/workers/runtime-apis/kv/).                                                                       |
| Workers R2 Storage Read                                      | Grants read access to [Cloudflare R2 Storage](/r2/).                                                                                                     |
| Workers R2 Storage Edit                                      | Grants write access to [Cloudflare R2 Storage](/r2/).                                                                                                    |
| Workers Scripts Read                                         | Grants read access to [Cloudflare Workers scripts](/workers/).                                                                                           |
| Workers Scripts Edit                                         | Grants write access to [Cloudflare Workers scripts](/workers/).                                                                                           |
| Workers Tail Read                                            | Grants [`wrangler tail`](/workers/wrangler/commands/#tail) read permissions.                                                                             |
| Zero Trust Read                                              | Grants read access to [Cloudflare Zero Trust](/cloudflare-one/).                                                                                         |
| Zero Trust Report                                            | Grants reporting access to [Cloudflare Zero Trust](/cloudflare-one/).                                                                                    |
| Zero Trust Edit                                              | Grants write access to [Cloudflare Zero Trust](/cloudflare-one/).                                                                                        |
| Zero Trust Seats Edit                                        | Grants write access to the number of [Zero Trust Seats](/cloudflare-one/identity/users/seat-management/) your organization can use (and be billed for).  |

## Zone permissions

The applicable scope of zone permissions is `com.cloudflare.api.account.zone`.

| Name                             | Description                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Access: Apps and Policies Read   | Grants read access to [Cloudflare Access](/cloudflare-one/policies/access/) zone resources.                                                |
| Access: Apps and Policies Revoke | Grants ability to revoke all tokens to [Cloudflare Access](/cloudflare-one/policies/access/) zone resources.                               |
| Access: Apps and Policies Edit   | Grants write access to [Cloudflare Access](/cloudflare-one/policies/access/) zone resources.                                               |
| Analytics Read                   | Grants read access to [analytics](/analytics/account-and-zone-analytics/zone-analytics/).                                                  |
| API Gateway Read                 | Grants read access to [API Gateway](/api-shield/) zone resources.                                                                          |
| API Gateway Edit                 | Grants write access to [API Gateway](/api-shield/) zone resources.                                                                         |
| Apps Edit                        | Grants full access to [Cloudflare Apps](/support/more-dashboard-apps/cloudflare-apps/).                                                    |
| Bot Management Read              | Grants read access to [Bot Management](/bots/plans/bm-subscription/).                                                                      |
| Bot Management Edit              | Grants write access to [Bot Management](/bots/plans/bm-subscription/).                                                                     |
| Bot Management Feedback Read     | Grants read access to [Bot Management feedback](/bots/concepts/feedback-loop/).                                                                                         |
| Bot Management Feedback Edit     | Grants write access to [Bot Management feedback](/bots/concepts/feedback-loop/).                                                                                        |
| Cache Purge                      | Grants access to [purge cache](/cache/how-to/purge-cache/).                                                                                |
| Cache Rules Read                 | Grants read access to [Cache Rules](/cache/how-to/cache-rules/).                                                                           |
| Cache Rules Edit                 | Grants write access to [Cache Rules](/cache/how-to/cache-rules/).                                                                          |
| Config Rules Read                | Grants read access to [Configuration Rules](/rules/configuration-rules/).                                                                  |
| Config Rules Edit                | Grants write access to [Configuration Rules](/rules/configuration-rules/).                                                                 |
| Custom Error Rules Read          | Grants read access to [Custom Error Rules](/rules/custom-error-responses/).                                                                |
| Custom Error Rules Edit          | Grants write access to [Custom Error Rules](/rules/custom-error-responses/).                                                               |
| Custom Pages Read                | Grants read access to [Custom Pages](/support/more-dashboard-apps/cloudflare-custom-pages/configuring-custom-pages-error-and-challenge/).  |
| Custom Pages Edit                | Grants write access to [Custom Pages](/support/more-dashboard-apps/cloudflare-custom-pages/configuring-custom-pages-error-and-challenge/). |
| DMARC Management Read            | Grants read access to [DMARC Management](/dmarc-management/).                                                                              |
| DMARC Management Edit            | Grants write access to [DMARC Management](/dmarc-management/).                                                                             |
| DNS Read                         | Grants read access to [DNS](/dns/).                                                                                                        |
| DNS Write                        | Grants write access to [DNS](/dns/).                                                                                                       |
| Dynamic Redirect Read            | Grants read access to zone-level [Single Redirects](/rules/url-forwarding/single-redirects/).                                              |
| Dynamic Redirect Edit            | Grants write access to zone-level [Single Redirects](/rules/url-forwarding/single-redirects/).                                             |
| Email Routing Rules Read         | Grants read access to [Email Routing Rules](/email-routing/setup/email-routing-addresses/).                                                |
| Email Routing Rules Edit         | Grants write access to [Email Routing Rules](/email-routing/setup/email-routing-addresses/).                                               |
| Firewall Services Read           | Grants read access to Firewall resources.                                                                                                  |
| Firewall Services Edit           | Grants write access to Firewall resources.                                                                                                 |
| Health Checks Read               | Grants read access to [Health Checks](/health-checks/).                                                                                    |
| Health Checks Edit               | Grants write access to [Health Checks](/health-checks/).                                                                                   |
| HTTP DDoS Managed Ruleset Read   | Grants read access to [HTTP DDoS managed ruleset](/ddos-protection/managed-rulesets/http/).                                                |
| HTTP DDoS Managed Ruleset Edit   | Grants write access to [HTTP DDoS managed ruleset](/ddos-protection/managed-rulesets/http/).                                               |
| Load Balancers Read              | Grants read access to [load balancer resources](/load-balancing/).                                                                         |
| Load Balancers Edit              | Grants write access to [load balancer resources](/load-balancing/).                                                                        |
| Logs Read                        | Grants read access to logs using [Logpull](/logs/).                                                                                        |
| Logs Edit                        | Grants write access to [Logpull and Logpush](/logs/).                                                                                  |
| Managed Headers Read             | Grants read access to [Managed Headers](/rules/transform/managed-transforms/).                                                             |
| Managed Headers Edit             | Grants write access to [Managed Headers](/rules/transform/managed-transforms/).                                                            |
| Origin Rules Read                | Grants read access to [Origin Rules](/rules/origin-rules/).                                                                                |
| Origin Rules Edit                | Grants write access to [Origin Rules](/rules/origin-rules/).                                                                               |
| Page Rules Read                  | Grants read access to [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).          |
| Page Rules Edit                  | Grants write access to [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).         |
| Page Shield Read                 | Grants read access to [Page Shield](/page-shield/).                                                                                        |
| Page Shield Edit                 | Grants write access to [Page Shield](/page-shield/).                                                                                       |
| Response Compression Read        | Grants read access to [Response Compression](/rules/compression-rules/).                                                                   |
| Response Compression Edit        | Grants write access to [Response Compression](/rules/compression-rules/).                                                                  |
| Sanitize Read                    | Grants read access to sanitization.                                                                                                        |
| Sanitize Edit                    | Grants write access to sanitization.                                                                                                       |
| SSL and Certificates Read        | Grants read access to [SSL configuration and certificate management](/ssl/).                                                               |
| SSL and Certificates Edit        | Grants write access to [SSL configuration and certificate management](/ssl/).                                                              |
| Transform Rules Read             | Grants read access to [Transform Rules](/rules/transform/).                                                                                |
| Transform Rules Edit             | Grants write access to [Transform Rules](/rules/transform/).                                                                               |
| Waiting Room Read                | Grants read access to [Waiting Room](/waiting-room/).                                                                                      |
| Waiting Room Edit                | Grants write access to [Waiting Room](/waiting-room/).                                                                                     |
| Web3 Hostnames Read              | Grants read access to [Web3 Hostnames](/web3/).                                                                                            |
| Web3 Hostnames Edit              | Grants write access to [Web3 Hostnames](/web3/).                                                                                           |
| Workers Routes Read              | Grants read access to [Cloudflare Workers](/workers/) and [Workers KV Storage](/workers/runtime-apis/kv/).                                 |
| Workers Routes Edit              | Grants write access to [Cloudflare Workers](/workers/) and [Workers KV Storage](/workers/runtime-apis/kv/).                                |
| Zaraz Read                       | Grants read access to [Zaraz](/zaraz/) zone level settings.                                                                                |
| Zaraz Edit                       | Grants write access to [Zaraz](/zaraz/) zone level settings.                                                                               |
| Zone Read                        | Grants read access to zone management.                                                                                                     |
| Zone Edit                        | Grants write access to zone management.                                                                                                    |
| Zone Settings Read               | Grants read access to zone settings.                                                                                                       |
| Zone Settings Edit               | Grants write access to zone settings.                                                                                                      |
| Zone Versioning Read             | Grants read access to [Zone Versioning](/version-management/) at zone level.                                                               |
| Zone Versioning Edit             | Grants write access to [Zone Versioning](/version-management/) at zone level.                                                              |
| Zone WAF Read                    | Grants read access to [Zone WAF](/waf/).                                                                                                   |
| Zone WAF Edit                    | Grants write access to [Zone WAF](/waf/).                                                                                                  |
