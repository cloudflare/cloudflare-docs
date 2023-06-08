---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started

To begin using Magic Network Monitoring, complete the list of tasks below. If you are an Enterprise customer, Cloudflare can significantly accelerate the timeline during active-attack scenarios.

If you are an Enterprise customer and would like to use Magic Network Monitoring and Magic Transit On Demand together, begin by [configuring Magic Transit](/magic-transit/get-started/).

## 1. Verify NetFlow or sFlow capabilities

Verify your routers are capable of exporting NetFlow or sFlow to an IP address on Cloudflare’s network. Magic Network Monitoring supports NetFlow v5, NetFlow v9, IPFIX, and sFlow.

Refer to [Supported routers](/magic-network-monitoring/routers/supported-routers) to view a list of supported routers. The list is not exhaustive.

## 2. Register your router with Cloudflare

When you register your router with Cloudflare, your router links your NetFlow or sFlow data to your Cloudflare account.

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Analytics & Logs** > **Magic Monitoring**.
3. In **Magic Network Monitoring Analytics**, select **Configure Magic Network Monitoring**.
4. Select the **Configure routers** tab.
5. Under **IP Address**, enter your router's public IP address.
6. Under **Default router sampling rate**, enter a value for the sampling rate. The value should match the sampling rate of your NetFlow or sFlow configuration.
7. Select **Next**.

## 3. Configure your router 

Next, configure your router to send NetFlow/SFlow data to Cloudflare. For this step, you will also need to have your router's configuration menu open to input the values shown in the Cloudflare dashboard.

Refer to the [NetFlow/IPFIX configuration](/magic-network-monitoring/routers/netflow-ipfix-config/) or the [sFlow configuration guide](/magic-network-monitoring/routers/sflow-config/) for more information.

1. From **Configure routers** in the dashboard, select either **NetFlow Configuration** or **sFlow configuration**.
2. Follow the configuration steps for the selected configuration type. 
3. Enter the values shown in your router's configuration.
4. Select **Next**.

## 4. Check your router configuration

After setting up your router, confirm the configuration was successfully set up. 

From the **Check routers** page on the dashboard, you can view the status of your routers. Keep in mind that router data takes five to ten minutes to be sent to Cloudflare. 

Refer to **Router status description** to confirm whether data is successfully being sent.

When you are done with router configuration, select **Finish onboarding**.

{{<Aside type="note">}}This will only be visible during the onboarding process. When you are finished onboarding, this page will no longer be visible.{{</Aside>}}

## 5. Create rules

Create rules to analyze data for a specific set of destinations or to implement thresholds. Refer to [Rules](/magic-network-monitoring/rules/) for more information.