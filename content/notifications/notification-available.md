---
title: Available Notifications
pcx_content_type: concept
weight: 2
layout: single
---

# Available Notifications

Available Notifications depend on your Cloudflare plan. Cloudflare offers a variety of Notifications for our products and services, such as [Billing](/fundamentals/account-and-billing/), [Denial of Service protection](/ddos-protection/), [Magic Transit](/magic-transit/), and [SSL/TLS](/ssl/).

Depending on your plan, you can also configure webhooks, allowing you to connect your account with external services such as Slack and Google Chat, and PagerDuty to receive Cloudflare Notifications.

## Actions available on receiving a Notification

Each Notification carries different types of information about the status of your Cloudflare account, or the type of action you can take.

Refer to information below to understand what each Notification does and what to do when receiving one.

## Access

{{<details header="Expiring Access Service Token Alert">}}

**Who is it for?**

Access customers who want to receive a notification when their service token is about to expire.

**Other options / filters**

None.

**Included with**

Purchase of Access.

**What should you do if you receive one?**

Refresh your service token in the [Teams dashboard](https://one.dash.cloudflare.com/) under **Configuration** > **Service Auth**.

{{</details>}}

## Billing

{{<details header="Usage Based Billing">}}

**Who is it for?**

Customers who want to receive a notification when usage of a product goes above a set level.

**Other options / filters**

Customers can choose the **Product** they want to be notified about and the threshold that fires the notification. Thresholds depend on the product chosen. For example:

- **Argo Smart Routing**: has **Notify when total bytes of traffic exceeds** as threshold.
- **Load Balancing**: has **Notify when total number of DNS Queries exceeds** as threshold.

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Review your usage of the product and adjust the configuration and/or increase the alerting threshold.

{{</details>}}

## Brand Protection

{{<details header="Brand Protection Alerts">}}

**Who is it for?**

Customers who want a summary of activity related to [Brand Protection](/security-center/brand-protection/).

**Other options / filters**

Customers can set up Brand Protection Alerts on individual monitored queries. For more details, refer to [Brand Protection Alerts](/security-center/brand-protection/#brand-protection-alerts).

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Investigate and potentially block any suspicious domains that may be trying to impersonate your brand.

{{</details>}}

{{<details header="Brand Protection Digest">}}

**Who is it for?**

Customers who want a summary of activity related to [Brand Protection](/security-center/brand-protection/).

**Other options / filters**

Customers can set up Brand Protection Digest on individual monitored queries. For more details, refer to [Brand Protection Alerts](/security-center/brand-protection/#brand-protection-alerts).

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Investigate and potentially block any suspicious domains that may be trying to impersonate your brand.

{{</details>}}

## Cloudflare Status

{{<details header="Maintenance Notification">}}

**Who is it for?**

Customers interested in knowing about planned [Cloudflare maintenance](/support/troubleshooting/planned-maintenance/disruptive-maintenance-windows/) for specific data centers.

Specifically, the notification lets you know when maintenance has been scheduled, changed, or canceled on an entire point of presence.

**Other options / filters**

Customers can filter maintenance notifications for specific points of presence and updates (scheduled, changed, canceled).

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

If the notification is announcing new scheduled maintenance, you may want to add the maintenance to your calendar.

During these maintenance windows, you may experience a slight increase in latency to the edge location which is under maintenance.

{{</details>}}

{{<details header="Incident Alerts">}}

**Who is it for?**

Customers interested in knowing about Cloudflare incidents.

The notification lets you know when Cloudflare incidents are created, updated, and resolved.

**Other options / filters**

Customers can filter incident alerts to specific impact levels (minor, major, critical).

Additionally, incident alerts can be filtered to incidents affecting specific components. By default, incident alerts will trigger a notification for incident updates across all impact levels and components.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Review your [analytics](/analytics/) page to see if your domain is impacted.

{{</details>}}

## DNS

{{<details header="Secondary DNS all Primaries Failing">}}

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification if all of their primary nameservers are failing.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

1. Confirm that your primary nameservers are up and running.
2. Confirm that the [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/) on your primary nameservers are configured correctly.
3. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

{{</details>}}

{{<details header="Secondary DNS Primaries Failing">}}

**Who is it for?**

Enterprise customers who have at least one secondary zone and want to receive a notification if at least one of their primary nameservers is failing.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

1. Confirm that the primary nameserver that is failing is up and running.
2. Confirm that the [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/) on your primary nameservers are configured correctly.
3. Confirm that the primary nameserver that is failing is configured correctly in your Cloudflare account (correct IP, port, TSIG).

{{</details>}}

{{<details header="Secondary DNS Successfully Updated">}}

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification on successful zone transfers.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

No action needed. Everything is working correctly.

{{</details>}}

{{<details header="Secondary DNSSEC Validation Warning">}}

**Who is it for?**

Customers who are using Cloudflare for Secondary DNS and want to receive notifications about failure or success of zone transfers from their primary nameservers.

**Other options / filters**

None.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Success alerts require no further action. Actions for failure notifications will depend on the type of failure. Possible actions include:

- Checking the Access Control List (ACL) on your primary nameserver.
- Checking if Cloudflare IPs have been [configured correctly on your primary nameserver](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/).
- Checking logs on primary nameservers for other errors.

{{</details>}}

## DDoS Protection

{{<details header="HTTP DDoS Attack Alert">}}

**Who is it for?**

WAF/CDN customers who want to receive a notification when Cloudflare has mitigated an attack.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

{{</details>}}

{{<details header="Advanced HTTP DDoS Attack Alert">}}

**Who is it for?**

WAF/CDN customers with the Advanced DDoS Protection subscription who want to receive a notification when Cloudflare has mitigated an attack with certain characteristics.

**Other options / filters**

Customers can choose when to trigger a notification. Available filters are:

- The zones in the account for which they wish to receive notifications.
- The specific hostnames for which they wish to receive notifications.
- The minimum requests-per-second rate that will trigger the alert.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

{{</details>}}

{{<details header="Advanced Layer 3/4 DDoS Attack Alert">}}

**Who is it for?**

BYOIP and Magic Transit customers with Network Analytics who want to receive a notification when Cloudflare has mitigated an attack with certain characteristics.

**Other options / filters**

Customers can choose when to trigger a notification. Available filters are:

- The IP prefixes for which they wish to receive notifications.
- The specific IP addresses for which they wish to receive notifications.
- The minimum packets-per-second rate that will trigger the alert.
- The minimum megabits-per-second rate that will trigger the alert.
- The protocols for which they wish to receive notifications.

**Included with**

Purchase of Magic Transit and/or BYOIP (Enterprise plans).

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

{{</details>}}

## Health checks

{{<details header="Health Checks status notification">}}

**Who is it for?**

Customers who want to be warned about changes to server health as determined by [health checks](/health-checks/).

**Other options / filters**

Multiple filters available:

- Customers can search for and add health checks from their list of health checks.
- Customers can choose a trigger to fire the notification. Available triggers are:
  - Becomes unhealthy
  - Becomes healthy
  - Becomes either healthy or unhealthy

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Review your [health check analytics](/health-checks/health-checks-analytics/#common-error-codes).

{{</details>}}

## Load Balancing

{{<details header="Pool Enablement">}}

**Who is it for?**

Customers who want to be warned about status changes (enabled/disabled) in their pools.

**Other options / filters**

Multiple filters available:

- Customers can search for and add pools from their list of pools.
- Customers can also choose the trigger that fires the notification. Available triggers are:
  - Load Balancing pool enabled
  - Load Balancing pool disabled
  - Load Balancing pool enabled / disabled

**Included with**

All Cloudflare plans with [Load Balancing purchase](/load-balancing/get-started/enable-load-balancing/).

**What should you do if you receive one?**

No direct call to action.

{{</details>}}

{{<details header="Load Balancing Health Alert">}}

**Who is it for?**

Customers who want to be warned about [changes in health status](/load-balancing/understand-basics/health-details/) in their pools or origins.

**Other options / filters**

Multiple filters available:

- Customers can search for and add pools from their list of pools, as well as **Include future pools** (if all pools are selected).
- Customers can also choose the trigger that fires the notification. Available options are:
  - _Health status trigger_:
    - Becomes unhealthy or healthy
    - Becomes unhealthy
    - Becomes healthy
  - _Event source trigger_:
    - Health status changes in either pool or origin
    - Health status changes in pool
    - Health status changes in origin

**Included with**

All Cloudflare plans with [Load Balancing purchase](/load-balancing/get-started/enable-load-balancing/).

**What should you do if you receive one?**

Evaluate [load balancing analytics](/load-balancing/reference/load-balancing-analytics/) to review changes in health status over time.

{{</details>}}

## Logpush

{{<details header="Failing Logpush Job Disabled">}}

**Who is it for?**

Enterprise customers who use Logpush and want to monitor their job health.

**Other options / filters**

- Notification Name
  - Custom name for this notification
- Description (optional)
  - Custom description for this notification
- Notification Email (can be multiple emails)
  - Email address of recipient for this notification

**Included with**

Enterprise plans.

**What should you do if you receive one?**

In the email for the notification, you can find the destination name for the failing Logpush job. With this destination name, you should be able to figure out which zone this relates to. There can be multiple reasons why a job fails, but it is best to test that the destination endpoint is healthy, and that necessary credentials are still working. You can also check that the destination has allowlisted [Cloudflare IPs](https://www.cloudflare.com/ips/).

{{</details>}}

## Magic Transit

{{<details header="Magic Network Monitoring: Auto Advertisement">}}

**Who is it for?**

Magic Transit on-demand customers who use Flow Based Monitoring and want alerts when Magic Transit is automatically enabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

No action is needed. You can [go to the dashboard](https://dash.cloudflare.com/?to=/:account/magic-transit) to review the health and status of your tunnels.

{{</details>}}

{{<details header="Magic Network Monitoring: DDoS Attack">}}

**Who is it for?**

[BYOIP](/byoip/) customers and [Spectrum](/spectrum/) customers with [Network Analytics](/analytics/network-analytics/) who want to receive a notification when Cloudflare has mitigated an attack.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

{{</details>}}

{{<details header="Magic Network Monitoring: Volumetric Attack">}}

**Who is it for?**

[Magic Transit on-demand](/magic-transit/on-demand/) customers who are using Flow-based Monitoring to detect attacks when Magic Transit is disabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

If you do not have auto advertisement enabled, you need to advertise your IP prefixes to enable Magic Transit. For more information, refer to [Dynamic advertisement](/byoip/concepts/dynamic-advertisement/).

{{</details>}}

## Pages

{{<details header="Project updates">}}

**Who is it for?**

Customers who want to receive notifications about project-level events in [Cloudflare Pages](/pages/).

**Other options / filters**

Multiple filters available, including filtering by:

- Pages projects.
- Environments.
- Different events:
  - **Deployment started**
  - **Deployment failed**
  - **Deployment success**

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

For failed deployments, review our [debugging guide](/pages/platform/debugging-pages/#check-your-build-log).

{{</details>}}

## Page Shield

{{<details header="Page Shield New Code Change Detection Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when JavaScript dependencies change in the pages of their domain.

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

{{</details>}}

{{<details header="Page Shield New Domain Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when resources from new host domains appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

{{</details>}}

{{<details header="Page Shield New Malicious Domain Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when resources from a known malicious domain appear in their domain.

{{<render file="_script-monitor-detect-malicious-scripts.md">}} <br>

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

{{<render file="_script-monitor-review-malicious-scripts.md">}}

{{</details>}}

{{<details header="Page Shield New Malicious Script Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when Cloudflare classifies JavaScript dependencies in their domain as malicious.

{{<render file="_script-monitor-detect-malicious-scripts.md">}} <br>

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

{{<render file="_script-monitor-review-malicious-scripts.md">}}

{{</details>}}

{{<details header="Page Shield New Malicious URL Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when resources from a known malicious URL appear in their domain.

{{<render file="_script-monitor-detect-malicious-scripts.md">}} <br>

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

{{<render file="_script-monitor-review-malicious-scripts.md">}}

{{</details>}}

{{<details header="Page Shield New Resources Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when new resources appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

{{</details>}}

{{<details header="Page Shield New Resource Exceeds Max URL Length Alert">}}

**Who is it for?**

Page Shield customers who want to receive a notification when a resource's URL exceeds the maximum allowed length.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Manually check the resource.

{{</details>}}

## Route Leak Detection

{{<details header="Route Leak Detection Alert">}}

**Who is it for?**

[BYOIP customers](/byoip/) who want to receive a notification when their prefixes are advertised in places they should not be.

**Other options / filters**

None.

**Included with**

Purchase of BYOIP.

**What should you do if you receive one?**

Confirm your traffic is healthy: reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.

{{</details>}}

## SSL/TLS

{{<details header="Access mTLS Certificate Expiration Alert">}}

**Who is it for?**

Access customers that use client certificates for mutual TLS authentication. This notification will be sent 30 and 14 days before the expiration of the certificate.

**Other options / filters**

None.

**Included with**

[Access](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/) and [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/).

**What should you do if you receive one?**

Upload a [renewed certificate](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration).

{{</details>}}

{{<details header="Advanced Certificate Alert">}}

**Who is it for?**

Customers with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) that want to be alerted on validation, issuance, renewal, and expiration of certificates.

**Other options / filters**

None.

**Included with**

When an advanced certificate is validated, issued, renewed, or expired.

**What should you do if you receive one?**

Action only needed if notification is about a certificate that failed to be issued. Refer to [SSL expired or SSL mismatch errors](/ssl/troubleshooting/version-cipher-mismatch/) for more information.

{{</details>}}

{{<details header="Hostname-level Authenticated Origin Pulls Certificate Expiration Alert">}}

**Who is it for?**

Customers that upload their own certificate to use with hostname-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for [hostname-level AOP](/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

{{</details>}}

{{<details header="SSL for SaaS Custom Hostnames Alert">}}

**Who is it for?**

Customers with custom hostname certificates who want to receive a notification on validation, issuance, renewal, and expiration of certificates.

For more details around data formatting for webhooks, refer to the [Cloudflare for SaaS docs](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/webhook-definitions/).

**Other options / filters**

None.

**Included with**

Purchase of Cloudflare for SaaS.

**What should you do if you receive one?**

{{<render file="_troubleshoot-ssl.md">}}

{{</details>}}

{{<details header="Universal SSL Alert">}}

**Who is it for?**

Customers with universal certificates who want to receive a notification on validation, issuance, and renewal of certificates.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

{{<render file="_troubleshoot-ssl.md">}}

{{</details>}}

{{<details header="Zone-level Authenticated Origin Pulls Certificate Expiration Alert">}}

**Who is it for?**
Customers that upload their own certificate to use with zone-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server.

**Other options / filters**

None.

**Included with**
Authenticated Origin Pull

**What should you do if you receive one?**
Upload a renewed certificate to use for [zone-level AOP](/ssl/origin-configuration/authenticated-origin-pull/set-up/).

{{</details>}}

## Stream

{{<details header="Stream Live Notifications">}}

**Who is it for?**

Customers who are using Stream and want to receive webhooks with the status of their videos.

**Other options / filters**

Customers can input Stream Live IDs to receive notifications only about those inputs. If left blank, customers will receive a list for all inputs.

The following input states will fire notifications. Customers can toggle them on or off:

- `live_input.connected`
- `Live_input.disconnected`

**Included with**

Stream subscription.

**What should you do if you receive one?**

Stream notifications are entirely customizable by the customer. Action will depend on the customizations enabled.

{{</details>}}

## Traffic Monitoring

{{<details header="Advanced Error Rate Alert">}}

**Who is it for?**

Enterprise customers who want to receive a notification when Cloudflare detects edge and/or origin errors.

**Other options / filters**

Multiple filters available:

- Customers can search and add domains from their list of domains.
- Customers can filter alerts by:
  - Edge status code
  - Origin status code
  - IP Address
- Customers can also choose the trigger that fires the notification. Available triggers are:
  - Low sensitivity
  - Medium sensitivity
  - High sensitivity
  - Very High sensitivity

**Included with**

Enterprise plans.

**What should you do if you receive one?**

1. Use the link in the Notification you received to see which error codes Cloudflare is seeing.
2. Depending on the statuses you are alerting on, refer to [Troubleshooting Cloudflare 5XX errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/).
3. {{<render file="_errors.md">}}

{{</details>}}

{{<details header="Origin Error Rate Alert">}}

**Who is it for?**

Enterprise customers who want to receive a notification when Cloudflare is unable to access their origin server.

**Other options / filters**

Multiple filters available:

- Customers can search and add domains from their list of domains.
- Customers can also choose the trigger that fires the notification. Available triggers are:
  - Low sensitivity
  - Medium sensitivity
  - High sensitivity
  - Very High sensitivity

**Included with**

Enterprise plans.

**What should you do if you receive one?**

1. Use the link in the Notification you received to see which error codes Cloudflare is seeing from your origin.
2. {{<render file="_errors.md">}}

{{</details>}}

{{<details header="Passive Origin Monitoring">}}

**Who is it for?**

Customers who want to receive a notification when Cloudflare is unable to access their origin. Customers will only receive this notification when their origin is returning a `521` error.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

{{<render file="_errors.md">}}

{{</details>}}

{{<details header="Traffic Anomalies Alert">}}

**Who is it for?**

Enterprise customers who want to receive a notification when one zone is experiencing an unexpected spike or drop in traffic.

**Other options / filters**

Multiple filters available:

- Customers can search and add domains from their list of domains.
- Customers can include or exclude traffic mitigated by the Web Application Firewall.
- Customers can choose whether to be notified of either spikes or drops in traffic.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

1. Use the link in the Notification you received to view if the spike or drop is significant enough to require further actions.
2. {{<render file="_errors.md">}}

{{</details>}}

## Trust and Safety Blocks

{{<details header="Block Review Rejection">}}

**Who is it for?**

Customers who want to be notified when Cloudflare Trust & Safety rejects a request for block removal.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Take care of any abuse on your website. Then, go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and request a review.

{{</details>}}

{{<details header="New Blocks">}}

**Who is it for?**

Customers who want to be notified when Cloudflare Trust & Safety places a block on their website.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Take care of any abuse on your website. Then, go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and request a review.

{{</details>}}

{{<details header="Removed Blocks">}}

**Who is it for?**

Customers who want to be notified when Cloudflare Trust & Safety removes a block from their website.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

This is informational follow up.

{{</details>}}

## Tunnel

{{<details header="Tunnel Creation or Deletion Event">}}

**Who is it for?**

Customers who want to receive a notification when Cloudflare Tunnels are created or deleted in their account.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

No direct call to action.

{{</details>}}

{{<details header="Tunnel Health Alert">}}

**Who is it for?**

Customers who want to be warned about [changes in health status](/cloudflare-one/connections/connect-networks/monitor-tunnels/notifications/) for their Cloudflare Tunnels.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Monitor tunnel health over time and consider deploying [`cloudflared` replicas or load balancers](/cloudflare-one/connections/connect-networks/deploy-tunnels/deploy-cloudflared-replicas/).

{{</details>}}

## WAF

{{<details header="Advanced Security Events Alert">}}

**Who is it for?**

Enterprise customers who want to receive alerts about spikes in specific services that generate log entries in [Security Events](/waf/security-events/paid-plans/).

For more information, refer to [WAF alerts](/waf/reference/alerts/).

**Other options / filters**

- Customers can search for and add domains from their list of enterprise zones.
- Customers can choose which services the alert should monitor (Managed Firewall, Rate Limiting, etc.).
- Customers can filter events by a targeted action.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the information in [Security Events](/waf/security-events/paid-plans/) to identify any possible attack or misconfiguration.

{{</details>}}

{{<details header="Security Events Alert">}}

**Who is it for?**

Business and Enterprise customers who want to receive alerts about spikes across all services that generate log entries in [Security Events](/waf/security-events/paid-plans/).

For more information, refer to [WAF alerts](/waf/reference/alerts/).

**Other options / filters**

- Customers can search for and add domains from their list of business or enterprise zones. The notification will be sent for the domains chosen.
- Customers can filter events by a targeted action.

**Included with**

Business and Enterprise plans.

**What should you do if you receive one?**

Review the information in [Security Events](/waf/security-events/paid-plans/) to identify any possible attack or misconfiguration.

{{</details>}}

## Web Analytics

{{<details header="Weekly summary">}}

**Who is it for?**

Customers using Web Analytics to monitor their website's performance.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

No action required. This notification is a weekly summary with reports from your Web Analytics account. Refer to [Notifications](https://dash.cloudflare.com/?to=/:account/notifications) in the Cloudflare dashboard to refine your notifications settings.

{{</details>}}
