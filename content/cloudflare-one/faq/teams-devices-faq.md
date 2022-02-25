---
order: 5
pcx-content-type: faq
---

[❮ Back to FAQ](/faq)

# Devices

## Why is my device not connecting to a closer Cloudflare data center?

As our [Network Map](https://www.cloudflare.com/en-gb/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the data center (colo) you are connecting to isn't necessarily the one physically closest to your location. This can be due to a number of reasons:

*   Sometimes your nearest colo might be having problems, although we work hard to prevent it. Check [here](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for system status.
*   Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
*   Not all Cloudflare data centers are WARP-enabled. We are constantly evaluating performance and how users are connecting, bringing more colos online with WARP all the time.

## Why is my public IP address sometimes visible?

Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the origin (the site you are connecting to), but not from the origin itself. In a number of cases, if the origin site you are communicating with can't determine who you are and where you're from, they can't serve locale relevant content to you.
Sites inside Cloudflare network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network (orange clouded sites) however are unable to see this information and instead see the nearest egress colo to their server. We are working to see if in the future we can't find a way to more easily share this information with a limited number of gray clouded sites where it is relevant to both parties.

## Why has my throughput dropped while using WARP?

Cloudflare WARP is in part powered by 1.1.1.1. When visiting sites or going to a new location on the Internet, you should see blazing fast DNS lookups. However, WARP is built to trade some throughput for enhanced privacy, because it encryps all traffic both to and from your device. While this isn't noticeable at most mobile speeds, on desktop systems in countries where high speed broadband is available, you may notice a drop. We think the tradeoff is worth it though and continue to work on improving performance all over the system.

## Firefox is showing a network protocol violation when I use the WARP client.

If you see this warning, you may have to disable DNS over HTTPs setting in Firefox. If you need help doing that, see [these instructions](https://support.mozilla.org/en-US/kb/firefox-dns-over-https#w_manually-enabling-and-disabling-dns-over-https).

## Why is my device not connecting to the Internet after I deploy WARP?

Deploying new software can come with unexpected issues. This section covers the most common issues you might encounter as you deploy the WARP client in your organization, or turn on new features that interact with the client.

### Is the Cloudflare root certificate installed in all the places?

Installing and trusting the [Cloudflare root cert](/connections/connect-devices/warp/install-cloudflare-cert) is a necessary step to enable advanced security features, such as Browser Isolation, HTTP filtering, AV scanning, and device posture. It is required once you enable the Proxy in **Settings** > **Network** > **HTTP Filtering**.

In addition to ensuring the root certificate is trusted at the device level, many applications also rely on their own certificate store. Applications like Firefox, Docker, Python, and NPM all rely on their own certificate store and the Cloudflare root certificate must be trusted in each.

If you ever see an error like *Certificate not trusted* or *Not trusted identity* or *SSL Error*, it is likely related to our root certificates.

As a last resort, add the application to a **Do Not Decrypt** policy in Gateway.

### Have you set up a Do Not Inspect policy for applications not compatible with TLS decryption?

You may need to set up a Do Not Inspect policy to exclude some applications that do not support SSL inspection, or are otherwise incompatible with TLS decryption, from Gateway inspection. These applications could show errors once the WARP client is connected. For more information, refer to our documentation on [Do Not Decrypt applications](/policies/filtering/http-policies/application-app-types#do-not-decrypt-applications).

### Do you, your ISP, or your country have policies in place that would block the WARP client?

Ensure that you do not have policies or firewall rules in place that block communication to the transport mechanisms or IP addresses required for WARP. Check the requirements at [this page](/connections/connect-devices/warp/deployment/firewall).

In particular, Microsoft Intune’s default security policy creates a Firewall rule that will block WARP by default. Refer to the page linked above for instructions on which IP addresses you need to add.

Some countries explicitly block the use of VPN or VPN-like software that intentionally encrypts traffic. If you suspect your country may be blocking this traffic, please work with your ISP to verify.

### Are you running another VPN, firewall, or security product that may be trying to inspect traffic, interfere with routing or enforce DNS policy?

Running VPNs or firewalls alongside the WARP client may interfere with some of its functionalities. Please refer to the following documentation on how to use WARP alongside a VPN, or on how to exclude traffic from the WARP client:

[❯ Use WARP alongside a VPN](/connections/connect-devices/warp/exclude-traffic#use-warp-alongside-a-vpn)

[❯ Exclude traffic from WARP](/connections/connect-devices/warp/exclude-traffic)

The most common places we see interference with WARP from these products are:

*   **Control of the routing table:** In the default configuration of WARP where exclude-split tunnel rules are in place, WARP needs control over the default route. Third-party VPNs need to be set to only include routes to your internal resource.

*   **Control of DNS:** WARP must be the last client to touch the primary and secondary DNS server on the default interface. Make sure any DNS setting is disabled in third-party VPNs.

*   If running alongside a third-party VPN, you must create an exclude [Split Tunnel rule](/connections/connect-devices/warp/exclude-traffic/split-tunnels) for the VPN server you are connecting to (for example, `vpnserver.3rdpartyvpn.example.com`).

### As a last resort, does WARP or your configuration work on a clean machine?

To eliminate issues related to a particular Cloudflare Zero Trust configuration or policy, you can try running WARP in consumer mode. This will allow you to ensure basic connectivity can be achieved. Once this is verified, you can slowly start applying additional complexity and testing along the way.
