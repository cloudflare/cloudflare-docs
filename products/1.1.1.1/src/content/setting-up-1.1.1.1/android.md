---
order: 1
---

# Android

## Android 9 Pie

Android Pie supports Private DNS, which uses DNS over TLS to secure your queries.
If your device runs Android 9, this is the recommended method to set up 1.1.1.1 because unlike previous versions
of Android, it does not need to be configured for each new WiFi network.

Follow these steps to configure your device to use 1.1.1.1.

Step 1: Go to Settings → Network & internet → Advanced → Private DNS.

Step 2: Select the Private DNS provider hostname option.

Step 3: Enter `one.one.one.one` or `1dot1dot1dot1.cloudflare-dns.com` and hit Save.

Step 4: Visit [1.1.1.1/help](https://1.1.1.1/help) to verify DNS over TLS is enabled.

## Previous versions

Follow this quick guide to start using 1.1.1.1 on your Android.

<StreamVideo id="62dceb0d5905f0c98a895d21409d6247"/>

Step 1: Open up Settings.

Step 2: Click on Wi-Fi.

Step 3: Press down and hold on the name of the network you are currently connected to.

Step 4: Click Modify Network.

Step 5: Click the check box called Show Advanced Options.

Step 6: Change the IP Settings to the option called Static.

Step 7: Remove any IP addresses that may be already listed and in their place add:

```txt
1.1.1.1
1.0.0.1
2606:4700:4700::1111
2606:4700:4700::1001
```

Step 8: Click Save. You may need to disconnect from the Wi-Fi and reconnect for the changes to take place.
