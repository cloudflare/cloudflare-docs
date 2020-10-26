---
order: 0
---

# Browser Setup

## Firefox

With Firefox, you can send DNS queries using the DNS over HTTPS protocol.

### Find a location's DoH subdomain

[Obtain a location DoH subdomain (previously known as a unique id)](/getting-started/troubleshooting-policies/#find-a-location-doh-subdomain)

### Set up Gateway on Firefox

1. Open **Preferences** and scroll to the bottom.

2. Click on **Network Settings**.

3. Click on **Settings**.

4. Check **Enable DNS over HTTPS**.

5. Choose **Custom** from the drop-down for **Use Provider**.

6. Enter `https://YOUR_UNIQUE_SUBDOMAIN.cloudflare-gateway.com/dns-query` in the **Custom** field. In place of `YOUR_UNIQUE_SUBDOMAIN`, include your **unique ID**.

7. Click **OK**.

8. Enter **about:config** in the address bar.

9. Click on **Accept the risk!** if you see a prompt from Firefox.

10. Set network.trr.bootstrapAddress to `162.159.36.5`.

11. Set network.trr.mode to **3**.

You should now be able to send queries through the DNS over HTTPS protocol.
