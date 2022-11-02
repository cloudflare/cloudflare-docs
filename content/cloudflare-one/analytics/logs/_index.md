---
pcx_content_type: navigation
title: Zero Trust logs
weight: 6
---

# Zero Trust logs

The Logs section of the [Zero Trust dashboard](https://dash.teams.cloudflare.com/) allows you to take a look at analytics on your network traffic.

{{<directory-listing>}}

## Log retention

Cloudflare Zero Trust logs are stored for a varying period of time based on the service used:

| Zero Trust plan | Access logs | DNS logs | Network logs | HTTP logs |
| --- | --- | --- | --- | --- |
| **Free** | 24 hours | 24 hours | 24 hours | 24 hours |
| **Standard** | 30 hours | 30 days | 30 days | 30 days |
| **Enterprise** | 180 hours | 180 days | 30 days | 30 days |

## Regional Services

By default, Cloudflare will store and deliver logs from data centers across our global edge network. To maintain regional control over your data, you can use [Regional Services](https://support.cloudflare.com/hc/en-us/articles/360061946171-Data-Localization-Suite) and restrict data storage to a specific geographic region.

Cloudflare will still send all logs to the Portland, OR (PDX) data center for processing and deliver them from memory. Logs are never stored on disk outside of your provisioned region.

## Data privacy

For more information on how we use this data, please refer to our [Privacy Policy](https://www.cloudflare.com/application/privacypolicy/).
