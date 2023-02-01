---
title: Kentik
pcx_content_type: tutorial
weight: 1
---

# Kentik

Kentik is a network observability company that helps detect attacks on your network and triggers Cloudflare's Magic Transit to begin advertisement. Together, Kentik and Magic Transit On Demand work to create a fully SaaS-based, DDoS protection solution to help you mitigate attacks and protect your network automatically.

In this tutorial, the example scenario includes two mitigations, one which pulls the advertisement from the router and a second mitigation that makes an API call to Cloudflare to begin advertising the prefixes from Cloudflare's global network.

## Prerequisites

You will need the email address associated with your Cloudflare account, Cloudflare Account ID, and Cloudflare API token to configure the connection for Magic Transit in Kentik.

## Configure the Kentik portal

1. Log in to your Kentik account.
2. Select **Menu** > **Settings**.
3. From the **Settings** page under **Customizations**, select **Mitigations**.
4. On the **Configure Mitigations** page, locate the **Cloudflare** section.
5. Select **Edit** next to the Cloudflare branded mitigation to edit and review the information.

    In the example below under section two, the Cloudflare email address, Account ID, and API token are used to send the API call to Cloudflare to begin advertising routes and turn on Magic Transit for the customer’s network.

    ![Kentik mitigation setup](/magic-transit/static/kentik-setup.png)

6. After reviewing the information, select **Update Mitigation Platform**.
7. Select **Menu** > **Library**.
8. On the **Library** page, in the search field, enter **Cloudflare**.
9. Under **Uncategorized Views**, select **Cloudflare Saved View**. The data explorer displays.
10. From **Options** > **Time**, you can edit the **Lookback** information to review traffic source information for a specific time period.

For additional information about Kentik and Magic Transit, refer to [Kentik's Magic Transit setup](https://kb.kentik.com/v3/Gc10.htm#Gc10-Cloudflare_MT_Setup).

## Access Cloudflare account

1. Log in to your [Cloudflare account](https://dash.cloudflare.com), and select your account.
2. Select **IP Addresses** > **IP Prefixes**.
3. Referring to the example scenario, the prefix protected by Cloudflare displays a **Withdrawn** status.

    After a DDoS attacks occurs, the status changes to **Advertised** which indicates the network is protected.

## Analytics

For a detailed view of actions taken and attack types, you can use the **Network Analytics** dashboard. For more information about Network Analytics, refer to [Network Analytics](/analytics/network-analytics/).

From your Cloudflare dashboard, select **Analytics & Logs** > **Network Analytics**.
