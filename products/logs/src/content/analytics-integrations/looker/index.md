---
title: Looker
order: 101
---

# Looker

This tutorial explains how to analyze [Cloudflare Logs](https://www.cloudflare.com/products/cloudflare-logs/) using the [Cloudflare Log Analytics for Looker](https://looker.com/platform/blocks/source/cloudflare-log-analytics).

## Overview

If you haven’t used Cloudflare Logs before, visit our [Logs documentation](/) for more details. Contact your Cloudflare Customer Account Team to enable logs for your account.

This tutorial uses Cloudflare Logpush to send logs to [Google Cloud Storage Bucket and Cloud Function](/analytics-integrations/google-cloud/) and then import them into Google Big Query.

### Prerequisites

Before sending your Cloudflare log data to Looker, make sure that you:

- Have an existing Looker account
- Have a Cloudflare Enterprise account with Cloudflare Logs enabled
- Configure [Logpush](/logpush/) or [Logpull](/logpull-api/)
- Load your data in a [database supported by Looker](https://looker.com/solutions/other-databases)

<Aside type="note" header="Note">

Cloudflare logs are HTTP/HTTPS request logs in JSON format and are gathered from our 194+ data centers globally. By default, timestamps are returned as Unix nanosecond integers. We recommend using the RFC 3339 format for sending logs to Looker.
</Aside>

## Task 1 - Connect your Database to Looker

Looker connects to a database in order to query the data. In this tutorial, we use Google Big Query as an example. Learn [how to connect Google BigQuery to Looker](https://docs.looker.com/setup-and-management/database-config/google-bigquery#create_a_temporary_dataset_for_persistent_derived_tables).

Once you load Cloudflare logs into your database, [connect the database to Looker](https://docs.looker.com/setup-and-management/connecting-to-db).

## Task 2 - Create a new LookML project from the public Git repository

To create your new LookML project:

1. Log in to your Looker account.

2. In the menu bar, click **Develop** and make sure **Development Mode** is set to _ON_.

3. Next, also under **Develop**, click **Manage LookML Projects**.

4. At the top right of the LookML Projects page, click **New LookML Project**.

5. In the **New Project** dialog, enter a project name.

6. For **Starting Point**, choose _Clone Public Git Repository**.**_

7. Enter the _cloudflare_block_ URL for the public Git repository `git://github.com/llooker/cloudflare_block.git`.

8. Click **Create Project**. Looker will pull all of the repository files into a new LookML project.

9. Next, open the project.

10. Click **Deploy from Remote** to pull all remote changes into your local version of the repository.
    ![Looker manage LookML projects](../../static/images/looker/screenshots/develop-look-ml-project.png)

## Task 3 - Update the connection name

To update the connection name in the LookML files:

1. In your LookML **cloudflare_looker** model file, replace the **connection** name with yours, for example:
   `connection: "bigquery_lpr"`.

2. Check if any table names need to be updated to your database connection names as well. If you decide to rename the filenames for explore, model name, and view, make sure to update all mentions within the other files. Otherwise, you might encounter errors.

## Task 4 - View the Dashboards

In the main menu, click **Browse** and select **LookML Dashboards**. You should see all the Cloudflare dashboards that were pulled from GitHub.

### About the Dashboards

There are five dashboards to help you analyze Cloudflare logs. You can also use filters within the dashboards to help narrow the analysis by date and time, device type, country, user agent, client IP, hostname, and more.

#### Snapshot

This is a quick overview of the most important metrics from your Cloudflare logs, including total number of requests, top visitors by country, client IP, user agent, traffic type, total number of threats, and bandwidth usage.

![Looker Cloudflare Snapshot dashboard](../../static/images/looker/dashboards/snapshot-cloudflare-dashboard-looker.png)

#### Security

This dashboard provides insights on threat identification and mitigation through our Web Application Firewall (WAF), Rate Limiting rules, and IP Firewall. Metrics include total threats stopped, threat traffic source, blocked IPs, and user agents, top threat requests, WAF events (SQL injections, XSS, etc.), and rate limiting. Use this data to fine tune the firewall to target obvious threats and prevent false positives.

![Looker Cloudflare Security dashboard](../../static/images/looker/dashboards/security-cloudflare-dashboard-looker.png)

#### Performance

This dashboard helps you identify and address issues like slow pages and caching misconfigurations. Metrics include total vs. cached bandwidth, cache ratio, top uncached requests, static vs. dynamic content, slowest URIs, and more.

![Looker Cloudflare Performance dashboard](../../static/images/looker/dashboards/performance-cloudflare-dashboard-looker.png)

#### Reliability

This dashboard provides insights on the availability of your websites and applications. Metrics include origin response error ratio, origin response status over time, percentage of 3xx/4xx/5xx errors over time, and more.

![Looker Cloudflare Reliability dashboard](../../static/images/looker/dashboards/reliability-cloudflare-dashboard-looker.png)

#### Bot Management

This dashboard allows to reliably detect and mitigate bad bots to prevent credential stuffing, spam registration, content scraping, click fraud, inventory hoarding, and other malicious activities. Use these insights to tune Cloudflare and prevent bots from excessive usage and abuse across websites, applications, and API endpoints.

![Looker Cloudflare Reliability dashboard](../../static/images/looker/dashboards/bot-management-cloudflare-dashboard-looker.png)

### Filters

All dashboard have a set of filters that you can apply to the entire dashboard, as shown in the following example. The filters apply across the entire dashboard.

![Looker Cloudflare dashboard filters](../../static/images/looker/screenshots/cloudflare-looker-dashboard-filters.png)

The default time interval is set to 24 hours. Note that for correct calculations, by default, filters exclude Worker subrequests (**WorkerSubrequest** = _false_) and purge requests (**ClientRequestMethod** is not _PURGE_).

Available Filters:

- Date (EdgeStartTimestamp)

- Device type

- Country

- Client IP

- Hostname

- Request URI

- Origin Response Status

- Edge response status

- Origin IP

- User Agent

- RayID

- Worker Subrequest

- Client Request Method

With the following pre-set filter values in the Looker dashboards all workers subrequests and client request method PURGE are excluded from the calculations:

- **WorkerSubrequet** set to value _False_

- **ClientRequestMethod** doesn’t equal to _PURGE_

You can always adjust your default filters values according to your needs.
