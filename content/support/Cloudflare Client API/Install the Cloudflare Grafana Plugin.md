---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115002722267-Install-the-Cloudflare-Grafana-Plugin
title: Install the Cloudflare Grafana Plugin
---

# Install the Cloudflare Grafana Plugin



## Overview

Installing the Cloudflare Grafana Plugin takes under 5 minutes and is the best way to start exploring your DNS analytics from Cloudflare. The Cloudflare Grafana plugin currently includes DNS and [Virtual DNS](https://www.cloudflare.com/dns/virtual-dns/) analytics, and over time will be expanded to include other HTTP and Firewall data.

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005755247/Screen_Shot_2017-02-09_at_11.34.40_AM.png
Article IDs: 115002722267 | Install the Cloudflare Grafana Plugin
](/images/support/hc-import-screen_shot_2017_02_09_at_11_34_40_am.png)


## Requirements

This is a very specific use case that requires that:
* You have configured [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/);
* You have a [Full Setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)

Otherwise, it won't collect any data here.



## How to install
___

1\. First you will [need to have a running version of Grafana](http://docs.grafana.org/installation/).

2\. Next use the Grafana CLI to install the Cloudflare plugin.

`grafana-cli plugins install cloudflare-app`

3\. Now when you launch Grafana, Cloudflare for Grafana will appear on the home screen under installed apps.

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005811168/Screen_Shot_20017-02-09_at_11.55.21_AM.png
Article IDs: 115002722267 | Install the Cloudflare Grafana Plugin
](/images/support/hc-import-screen_shot_20017_02_09_at_11_55_21_am.png)

4\. Click on the main Grafana icon in the top left corner and hover over the Cloudflare Plugin row and click on Plugin Config.

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005755527/Screen_Shot_20917-02-09_at_11.55.21_AM.png
Article IDs: 115002722267 | Install the Cloudflare Grafana Plugin
](/images/support/hc-import-screen_shot_20917_02_09_at_11_55_21_am.png)

5\. This will take you to the Plugin Config page. We highly recommend that you generate an [API token](/fundamentals/api/get-started/create-token/) for this app. Please make sure the token has the following permissions:

-   Account / Account Settings / Read
-   Account / DNS Firewall / Read
-   Zone / Zone / Read
-   Zone / Analytics / Read

Alternatively, you may authenticate with your email address and [legacy API key](/fundamentals/api/get-started/keys/).

6\. Now that you have configured the Cloudflare Grafana plugin with your account details, you can go to the main menu at the top and choose Cloudflare Grafana App > Zones or Cloudflare Grafana App > Virtual DNS if you are a Virtual DNS user.

_Note: If you are running Grafana behind Cloudflare, to use the Grafana Cloudflare App you will need to grey cloud (in the DNS editor) the Grafana subdomain so that it does not route through Cloudflare. Otherwise you will receive the error: "DNS points to prohibited IP"._

7\. To confirm if you are receiving data, we recommend to check first in the Cloudflare dashboard, when you need to gather the [DNS Analytics](https://developers.cloudflare.com/dns/additional-options/analytics/#analytics).

**What can different plans see?**

Different Cloudflare plans have access to different levels of data.

Free zones: # of queries per response code

Pro zones: # of queries per colo

Business zones: # of queries per response code and # of queries per record type

Enterprise zones: # of queries per query name

You can upgrade plans in your Cloudflare account dashboard here: https://www.cloudflare.com/a/overview/

___

## Adding new panels with the Cloudflare Grafana Plugin

You can use the Cloudflare Grafana plugin to add your own panels to your Grafana dashboards.

When you are creating a new panel, from Panel Data Source, choose Cloudflare.

_For DNS_

Use the following fields:

Source: Zone

Tag: $zone

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005811428/Screen_Shot_2017-02-08_at_1.09.26_PM.png
Article IDs: 115002722267 | Install the Cloudflare Grafana Plugin
](/images/support/hc-import-screen_shot_2017_02_08_at_1_09_26_pm.png)

_For Virtual DNS_

Use the following fields:

Source: Virtual DNS

Tag: $cluster

![Old URL: https://support.cloudflare.com/hc/en-us/article_attachments/115005811488/Screen_Shot_20197-02-08_at_1.09.26_PM.png
Article IDs: 115002722267 | Install the Cloudflare Grafana Plugin
](/images/support/hc-import-screen_shot_20197_02_08_at_1_09_26_pm.png)

___

## Troubleshooting

1\. "DNS points to prohibited IP" Error

This means there's a loop created between Grafana and Cloudflare. To fix, you will need to "grey cloud" your grafana dashboard in the Cloudflare DNS dashboard (click on the orange cloud next to the DNS entry for the subdomain hosting your Grafana dashboard).
