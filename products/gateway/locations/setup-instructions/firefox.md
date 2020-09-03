---
title: "Firefox Setup Instructions"
alwaysopen: true
weight: 2
---
With Firefox, you can send DNS queries using the DNS over HTTPS protocol.  

* Open Preferences and scroll to the bottom.

* Click on Settings inside **Network Settings**.

* Check **Enable DNS over HTTPS**.

* Using the dropdown for **Use Provider**, choose **Custom**.

* In the Custom field enter `https://YOUR_UNIQUE_SUBDOMAIN.cloudflare-gateway.com/dns-query` and click **OK**.

* Enter **about:config** in the address bar.

* Click on **Accept the risk!** if you see a prompt from Firefox.

* Set network.trr.bootstrapAddress to `162.159.36.5`

* Set network.trr.mode to **3**