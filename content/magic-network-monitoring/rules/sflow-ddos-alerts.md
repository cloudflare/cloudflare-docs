---
title: sFlow DDoS alerts
pcx_content_type: how-to
weight: 2
---

# sFlow DDoS Alerts

Magic Network Monitoring customers that send sFlow data to Cloudflare can receive alerts when a specific type of {{<glossary-tooltip term_id="distributed denial-of-service (DDoS) attack">}}distributed denial-of-service (DDoS) attack{{</glossary-tooltip>}} is detected within their network traffic. Cloudflare uses the same DDoS attack detection rules that protect our own global network to generate these alerts for customers.

## Send sFlow data from your network to Cloudflare

Customers can export sFlow data of their network traffic to Cloudflare via Magic Network Monitoring. There are [specific brands and models](/magic-network-monitoring/routers/supported-routers/) of routers that are capable of generating sFlow data. Make sure to check the router specifications to ensure that it is able to export sFlow data. Customers can follow this [sFlow configuration guide](/magic-network-monitoring/routers/sflow-config/) to configure sFlow exports to Magic Network Monitoring.

## Use sFlow DDoS alerts

Customers can configure sFlow DDoS alerts and receive notifications if a DDoS attack is detected within their sFlow traffic. These alerts are not compatible with NetFlow traffic. The sFlow DDoS alerts can be used along with traffic volume threshold alerts to give customers multiple layers of DDoS protection.

## Configure the sFlow DDoS alerts

To configure sFlow DDoS alerts:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Notifications**, and select **Add**.
3. Select **Magic Transit** from the product dropdown menu.
4. Find the **Magic Network Monitoring: DDoS Attack** alert, and select **Select**.
5. Fill in the notification configuration details.
6. Select **Save**.

## Tune the sFlow DDoS alert thresholds

Customers can tune the thresholds of their sFlow DDoS alerts in the dashboard and via the Cloudflare API by following the [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/) guide.