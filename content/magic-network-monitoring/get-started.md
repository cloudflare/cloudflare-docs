---
title: Get started
pcx_content_type: overview
weight: 2
---

# Get started

To begin using Magic Network Monitoring, complete the list of tasks below. 

## 1. (Enterprise only) Configure Magic Transit

If you are an Enterprise customer, you can use Magic Network Monitoring and Magic Transit on-demand to mitigate L7, L4, and L3 DDoS attacks. 

If you do not have Magic Transit, begin by configuring [Magic Transit](/magic-transit/get-started/).

If you already configured Magic Transit or if you are a free customer, continue on to the next steps.

## 2. Verify NetFlow or SFlow capabilities

Verify your routers are capable of exporting NetFlow or sFlow to an IP address on Cloudflare’s network.

Refer to [Supported routers](/magic-network-monitoring/routers/supported-routers) to view a list of supported routers. The list is not exhaustive.

## 3. Register your router with Cloudflare

When you register your router with Cloudflare, your router links your NetFlow or sFlow data to your Cloudflare account.

1. From the Cloudflare dashboard, select **Magic Network Monitoring**.
2. On the **Magic Network Monitoring** page, select **Configure your router**.
3. Under **IP Address**, enter your router's public IP address.
4. Under **Default router sampling rate**, enter a value for the sampling rate. The value should match the sampling rate of your NetFlow or sFlow configuration.
5. Select **Next**.

## 4. Configure your router 

Next, configure your router to send data to Cloudflare. For this step, you will also need to have your router's configuration menu open to input the values shown in the Cloudflare dashboard.

1. From **Configure routers** in the dashboard, select either **NetFlow Configuration** or **sFlow configuration**.
2. Follow the configuration steps for the selected configuration type. 
3. Enter the values shown in your router's configuration.
4. Select **Next**.

## 5. Check your router configuration

After setting up your router, confirm the configuration was successfully set up. 

From the **Check routers** page on the dashboard, you can view the status of your routers. Keep in mind that router data takes five to ten minutes to be sent to Cloudflare. 

Refer to **Router status description** to confirm whether data is successfully being sent.

When you are done with router configuration, select **Finish onboarding**.

