---
pcx_content_type: how-to
title: New Relic
weight: 103
layout: single
---

# New Relic

This tutorial explains how to analyze Cloudflare metrics using the [New Relic One Cloudflare Quickstart](https://newrelic.com/instant-observability/cloudflare/fc2bb0ac-6622-43c6-8c1f-6a4c26ab5434).

## Prerequisites

Before sending your Cloudflare log data to New Relic, make sure that you:

- Have a Cloudflare Enterprise account with Cloudflare Logs enabled.
- Have a New Relic account.
- Configure [Logpush to New Relic](/logs/get-started/enable-destinations/new-relic/).

## Task 1 - Install the Cloudflare Network Logs quickstart

1.  Log in to New Relic.
2.  Click the Instant Observability button (top right).
3.  Search for **Cloudflare Network Logs**.

![Cloudflare Network Logs install screen](/fundamentals/static/images/new-relic/screenshots/cloudflare-network-logs.png)

4.  Click **Install this quickstart**.
5.  Follow the steps to deploy.

## Task 2 - View the Cloudflare Dashboards

You can view your dashboards on the New Relic dashboard page. The dashboards include the following information:

### Overview

Get a quick overview of the most important metrics from your websites and applications on the Cloudflare network.

![Cloudflare Network Logs install screen](/fundamentals/static/images/new-relic/dashboard/dash-1.png)

### Security

Get insights on threats to your websites and applications, including number of threats taken action on by the Web Application Firewall (WAF), threats over time, top threat countries, and more.

![Cloudflare Network security metrics screen](/fundamentals/static/images/new-relic/dashboard/dash-2.png)

### Performance

Identify and address performance issues and caching misconfigurations. Metrics include total requests, total versus cached requests, total versus origin requests.

![Cloudflare Network Logs performance metrics screen](/fundamentals/static/images/new-relic/dashboard/dash-3.png)

### Reliability

Get insights on the availability of your websites and Applications. Metrics include, edge response status over time, percentage of `3xx`/`4xx`/`5xx` errors over time, and more.

![Cloudflare Network Logs reliability metrics screen](/fundamentals/static/images/new-relic/dashboard/dash-4.png)
