---
pcx_content_type: how-to
title: DHCP relay
---

# DHCP relay

DHCP Relay provides a way for DHCP clients to communicate with DHCP servers that are not available on the same local subnet/broadcast domain. When you enable DHCP Relay, Magic WAN Connector forwards DHCP discover messages to a predefined DHCP server, and routes the responses back to the original device that sent the discover message.

To configure DHCP relay:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select your site > **Edit**.
4. Select **Network**.
5. In **LAN configuration**, select the LAN where you need to configure DHCP relay.
6. Select **Edit**.
7. In **Addressing**, make sure you choose **Static** and enter a static IP address for your Connector.
8. Select **This is a DHCP Relay**.
9. In **Upstream DHCP server addresses**, enter the IP address of your DHCP server.
10. (Optional) If you need to add more DHCP server addresses, select **Add upstream DHCP server address** as many times as needed, and enter the new values.