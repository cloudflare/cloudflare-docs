---
title: "Browser Setup"
alwaysopen: true
weight: 0
---

## Firefox

With Firefox, you can send DNS queries using the DNS over HTTPS protocol.  

### 1. Find your location's unique ID

1. Visit your Teams dashboard to fetch the **unique id** from your location.
Navigate to the **Locations** page to visualize your location.

![Go to teams dash](../../static/go-to-teams-dashboard.png)

2. If you have more than one location set up, you will see a list of all your locations.

![Go to locations page](../../static/go-to-locations-page.png)

3. Expand the location card for the location you want to associate your mobile device with.

![Expand location card](../../static/expand-location-card.png)

4. Get the subdomain of the DNS over HTTPS hostname. This is your unique ID. In the example below, the ID is: `fix7p31bzg`.

5. Take note of the **unique ID**.

![Get unique subdomain](../../static/unique-gateway-id.png)

### 2. Set up Gateway on Firefox

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