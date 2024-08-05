---
title: Update local DNS resolver
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

With a Gateway location created, you have the ability to send traffic to your environment. You can test without risk by changing your DNS resolvers in your browser or network settings.

## Change DNS resolver at the network level

To configure your device to send traffic to Gateway:

{{<details header="macOS">}}

![macOS DNS Resolver Options](/images/dns/dns-resolvers-macosx.png)

{{</details>}}

{{<details header="Windows">}}

![Windows DNS Resolver Options](/images/dns/dns-resolvers-windows.png)

{{</details>}}

{{<details header="Linux">}}

```sh
$ cat /etc/resolv.conf

nameserver 172.64.X.X
nameserver 172.64.X.X
```

{{</details>}}

{{<details header="iPhone">}}

![iPhone DNS Resolver Options](/images/dns/dns-resolvers-iphone.png)

{{</details>}}

{{<details header="Android">}}

![Android DNS Resolver Options](/images/dns/dns-resolvers-android.png)

{{</details>}}

## Change DNS resolver in the browser

To configure your browser to send traffic to Gateway:

1. Obtain your DNS over HTTPS (DoH) address:
    1. Go to **Gateway** > **DNS Locations**.
    2. Select the default location.
    3. Copy your **DNS over HTTPS** hostname: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`
2. Follow the configuration instructions for your browser:

    {{<render file="gateway/_doh-instructions.md" productFolder="cloudflare-one">}}

3. Verify that third-party firewall or TLS decryption software does not inspect or block traffic to the DoH endpoint: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

## More locations

To configure your router or OS, or to add additional DNS endpoints, refer to [DNS locations](/cloudflare-one/connections/connect-devices/agentless/dns/locations/).
