---
title: Available Notifications
pcx_content_type: concept
weight: 2
layout: single
---

# Available Notifications

Available Notifications depend on your Cloudflare plan. Cloudflare offers a variety of Notifications for our products and services, such as Billing, Denial-of-Service protection, Magic Transit, and SSL/TLS.

Depending on your plan, you will also be able to configure webhooks (which allow you to connect your account with external services such as Slack and Google Chat) and PagerDuty to receive Cloudflare Notifications.

## Actions available on receiving a Notification

Each Notification carries different types of information about the status of your Cloudflare account, or the type of action you can take.

Refer to information below to understand what each Notification does and what to do when receiving one.

## Access

<details>
<summary>Expiring Access Service Token Alert</summary>
<div>

**Who is it for?**

Access customers who want to receive a notification when their service token is about to expire.

**Other options / filters**

None.

**Included with**

Purchase of Access.

**What should you do if you receive one?**

Refresh your service token in the [Teams dashboard](https://one.dash.cloudflare.com/) under **Configuration** > **Service Auth**.

</div>
</details>

## Billing

<details>
<summary>Usage Based Billing</summary>
<div>

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

</div>
</details>

## DNS

<details>
<summary>Secondary DNS all Primaries Failing</summary>
<div>

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

</div>
</details>

<details>
<summary>Secondary DNS Primaries Failing</summary>
<div>

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

</div>
</details>

<details>
<summary>Secondary DNS Successfully Updated</summary>
<div>

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification on successful zone transfers.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

No action needed. Everything is working correctly.

</div>
</details>

<details>
<summary>Secondary DNSSEC Validation Warning</summary>
<div>

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

</div>
</details>

## DDoS Protection

<details>
<summary>HTTP DDoS Attack Alert</summary>
<div>

**Who is it for?**

WAF/CDN customers who want to receive a notification when Cloudflare has mitigated an attack.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

</div>
</details>

<details>
<summary>Layer 3/4 DDoS Attack Alert</summary>
<div>

**Who is it for?**

BYOIP customers and Spectrum customers with Network Analytics who want to receive a notification when Cloudflare has mitigated an attack.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

</div>
</details>

<details>
<summary>Advanced HTTP DDoS Attack Alert</summary>
<div>

**Who is it for?**

WAF/CDN customers with the Advanced DDoS Protection subscription who want to receive a notification when Cloudflare has mitigated an attack with certain characteristics.

**Other options / filters**

- Customers can choose when to trigger a notification. Available filters are:

  - The zones in the account for which they wish to receive notifications.
  - The specific hostnames for which they wish to receive notifications.
  - The minimum requests-per-second rate that will trigger the alert.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

</div>
</details>

<details>
<summary>Advanced Layer 3/4 DDoS Attack Alert</summary>
<div>

**Who is it for?**

BYOIP and Magic Transit customers with Network Analytics who want to receive a notification when Cloudflare has mitigated an attack with certain characteristics.

**Other options / filters**

- Customers can choose when to trigger a notification. Available filters are:

  - The IP prefixes for which they wish to receive notifications.
  - The specific IP addresses for which they wish to receive notifications.
  - The minimum packets-per-second rate that will trigger the alert.
  - The minimum megabits-per-second rate that will trigger the alert.
  - The protocols for which they wish to receive notifications.

**Included with**

Purchase of Magic Transit and/or BYOIP (Enterprise plans).

**What should you do if you receive one?**

{{<render file="_ddos.md">}}

</div>
</details>

## Health checks

<details>
<summary>Health Checks status notification</summary>
<div>

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

Pro plans or higher.

**What should you do if you receive one?**

Review your [health check analytics](/health-checks/health-checks-analytics/#common-error-codes).

</div>
</details>

## Load Balancing

<details>
<summary>Pool Enablement</summary>
<div>

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

All Cloudflare plans with [Load Balancing purchase](/load-balancing/how-to/enable-load-balancing/).

**What should you do if you receive one?**

No direct call to action.

</div>
</details>

<details>
<summary>Load Balancing Health Alert</summary>
<div>

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

All Cloudflare plans with [Load Balancing purchase](/load-balancing/how-to/enable-load-balancing/).

**What should you do if you receive one?**

Evaluate [load balancing analytics](/load-balancing/reference/load-balancing-analytics/) to review changes in health status over time.

</div>
</details>

## Logpush

<details>
<summary>Failing Logpush Job Disabled</summary>
<div>

**Who is it for?**

This is for any customer who uses Logpush and wants to monitor their job health.

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

</div>
</details>

## Magic Transit

<details>
<summary>Flow-based Monitoring: Auto Advertisement</summary>
<div>

**Who is it for?**

Magic Transit on-demand customers who use Flow Based Monitoring and want alerts when Magic Transit is automatically enabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

No action is needed. You can [go to the dashboard](https://dash.cloudflare.com/?to=/:account/magic-transit) to review the health and status of your tunnels.

</div>
</details>

<details>
<summary>Flow-based Monitoring: Volumetric Attack</summary>
<div>

**Who is it for?**

Magic Transit On Demand customers who are using Flow Based Monitoring to detect attacks when Magic Transit is disabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

If you do not have auto advertisement enabled, you need to advertise your IP prefixes to enable Magic Transit. For more information, see [Dynamic advertisement](/byoip/about/dynamic-advertisement/).

</div>
</details>

## Origin Monitoring

<details>
<summary>Origin Error Rate Alert</summary>
<div>

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

</div>
</details>

<details>
<summary>Passive Origin Monitoring</summary>
<div>

**Who is it for?**

Any customer who wants to receive a notification when Cloudflare is unable to access their origin.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

{{<render file="_errors.md">}}

</div>
</details>

## Route Leak Detection

<details>
<summary>Route Leak Detection Alert</summary>
<div>

**Who is it for?**

[BYOIP customers](/byoip/) who want to receive a notification when their prefixes are advertised in places they should not be.

**Other options / filters**

None.

**Included with**

Purchase of BYOIP.

**What should you do if you receive one?**

Confirm your traffic is healthy: reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.

</div>
</details>

## SSL/TLS

<details>
<summary>Access mTLS Certificate Expiration Alert</summary>
<div>

**Who is it for?**

Access customers that use client certificates for mutual TLS authentication.

**Other options / filters**

None.

**Included with**

[Access](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/) and [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/).

**What should you do if you receive one?**

Upload a [renewed certificate](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration).

</div>
</details>

<details>
<summary>Advanced Certificate Alert</summary>
<div>

**Who is it for?**

Customers with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) that want to be alerted on validation, issuance, renewal, and expiration of certificates.

**Other options / filters**

None.

**Included with**

When an advanced certificate is validated, issued, renewed, or expired.

**What should you do if you receive one?**

Action only needed if notification is about a certificate that failed to be issued. Refer to [SSL expired or SSL mismatch errors](https://support.cloudflare.com/hc/articles/200170566#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f) for more information.

</div>
</details>

<details>
<summary>Hostname-level Authenticated Origin Pulls Certificate Expiration Alert</summary>
<div>

**Who is it for?**

Customers that upload their own certificate to use with hostname-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for [hostname-level AOP](/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

</div>
</details>

<details>
<summary>SSL for SaaS Custom Hostnames Alert</summary>
<div>

**Who is it for?**

Customers with custom hostname certificates who want to receive a notification on validation, issuance, renewal, and expiration of certificates.

For more details around data formatting for webhooks, refer to the [Cloudflare for SaaS docs](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/webhook-definitions/).

**Other options / filters**

None.

**Included with**

Purchase of Cloudflare for SaaS.

**What should you do if you receive one?**

{{<render file="_troubleshoot-ssl.md">}}

</div>
</details>

<details>
<summary>Universal SSL Alert</summary>
<div>

**Who is it for?**

Customers with universal certificates who want to receive a notification on validation, issuance, and renewal of certificates.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

{{<render file="_troubleshoot-ssl.md">}}

</div>
</details>

<details>
<summary>Zone-level Authenticated Origin Pulls Certificate Expiration Alert</summary>
<div>

**Who is it for?**
Customers that upload their own certificate to use with zone-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server.

**Other options / filters**

None.

**Included with**
Authenticated Origin Pull

**What should you do if you receive one?**
Upload a renewed certificate to use for [zone-level AOP](/ssl/origin-configuration/authenticated-origin-pull/set-up/).

</div>
</details>

## Script Monitor

<details>
<summary>Script Monitor New Code Change Detection Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when JavaScript dependencies change in the pages of their domain.

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

</div>
</details>

<details>
<summary>Script Monitor New Domain Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when JavaScript dependencies from new host domains appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

</div>
</details>

<details>
<summary>Script Monitor New Malicious Domain Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when JavaScript dependencies from a known malicious domain appear in their domain.

{{<render file="_script-monitor-detect-malicious-scripts.md">}} <br>

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

{{<render file="_script-monitor-review-malicious-scripts.md">}}

</div>
</details>

<details>
<summary>Script Monitor New Malicious Script Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when Cloudflare classifies JavaScript dependencies in their domain as malicious.

{{<render file="_script-monitor-detect-malicious-scripts.md">}} <br>

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

{{<render file="_script-monitor-review-malicious-scripts.md">}}

</div>
</details>

<details>
<summary>Script Monitor New Malicious URL Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when JavaScript dependencies from a known malicious URL appear in their domain.

{{<render file="_script-monitor-detect-malicious-scripts.md">}} <br>

**Other options / filters**

None.

**Included with**

Enterprise plans with paid add-on.

**What should you do if you receive one?**

{{<render file="_script-monitor-review-malicious-scripts.md">}}

</div>
</details>

<details>
<summary>Script Monitor New Scripts Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when new JavaScript dependencies appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

</div>
</details>

<details>
<summary>Script Monitor New Script Exceeds Max URL Length Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when a script's URL exceeds the maximum allowed length.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Manually check the script.

</div>
</details>

## Stream

<details>
<summary>Stream Live Notifications</summary>
<div>

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

</div>
</details>

## WAF

<details>
<summary>Advanced Security Events Alert</summary>
<div>

**Who is it for?**

Enterprise customers who want to receive alerts about spikes in specific services that generate log entries in security events.

For more information, refer to [WAF alerts](/waf/reference/alerts/).

**Other options / filters**

Customers can search for and add domains from their list of enterprise zones. Customers also have to choose which services the alert should monitor (Managed Firewall, Rate Limiting, etc.).

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the information in [Security Events](/waf/security-events/paid-plans/) to identify any possible attack or misconfiguration.

</div>
</details>

<details>
<summary>Security Events Alert</summary>
<div>

**Who is it for?**

Business and Enterprise customers who want to receive alerts about spikes across all services that generate log entries in security events.

For more information, refer to [WAF alerts](/waf/reference/alerts/).

**Other options / filters**

Customers can search for and add domains from their list of business or enterprise zones. The notification will be sent for the domains chosen.

**Included with**

Business and Enterprise plans.

**What should you do if you receive one?**

Review the information in [Security Events](/waf/security-events/paid-plans/) to identify any possible attack or misconfiguration.

</div>
</details>

## Tunnel

<details>
<summary>Tunnel Creation or Deletion Event</summary>
<div>

**Who is it for?**

Customers who want to receive a notification when Cloudflare Tunnels are created or deleted in their account.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

No direct call to action.

</div>
</details>

<details>
<summary>Tunnel Health Alert</summary>
<div>

**Who is it for?**

Customers who want to be warned about [changes in health status](/cloudflare-one/connections/connect-apps/tunnel-monitoring/notifications/) for their Cloudflare Tunnels.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Monitor tunnel health over time and consider deploying [`cloudflared` replicas or load balancers](/cloudflare-one/connections/connect-apps/install-and-setup/deploy-cloudflared-replicas/).

</div>
</details>

## Web Analytics

<details>
<summary>Weekly summary</summary>
<div>

**Who is it for?**

Customers using Web Analytics to monitor their website's performance.

**Other options / filters**

None.

**Included with**

All plans.

**What should you do if you receive one?**

No action required. This notification is a weekly summary with reports from your Web Analytics account. Refer to [Notifications](https://dash.cloudflare.com/?to=/:account/notifications) in the Cloudflare dashboard to refine your notifications settings.

</div>
</details>

## Workers

<details>
<summary>Workers Usage Report</summary>
<div>

**Who is it for?**

Developers using Workers, especially those on the Unbound usage model.

**Other options / filters**

None.

**Included with**

Workers subscription (free or paid).

**What should you do if you receive one?**

Check any recent changes to your script or its external dependencies. Usage reports inform users of a sharp increase (25% or more) in key metrics like CPU time.

</div>
</details>

<details>
<summary>Workers Weekly Summary</summary>
<div>

**Who is it for?**

Developers using Workers.

**Other options / filters**

None.

**Included with**

Workers subscription (free or paid).

**What should you do if you receive one?**

No action is usually required. This notification gives users a high-level overview of their key Workers’ metrics without having to check the dashboard. Possible metrics include account usage and per-worker usage.

</div>
</details>
