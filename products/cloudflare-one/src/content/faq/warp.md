---
order: 0
---

# Troubleshooting and FAQ

This section addresses the most common issues you may come across when setting up or using Cloudflare for Teams.

<ButtonGroup>
  <Button type="primary" href="/faq/access/">Access</Button>
  <Button type="primary" href="/faq/gateway/">Gateway</Button>
  <Button type="primary" href="/faq/warp/">WARP client</Button>
  <Button type="primary" href="/faq/tunnel/">Argo Tunnel</Button>
  <Button type="primary" href="/faq/self-diagnostics/">Self diagnostics</Button> 
</ButtonGroup>

## WARP client help

### Known issues

* Applications or sites that rely on location information to enforce content licensing agreements (certain games, video streaming, music streaming, radio streaming, etc.) may not function properly. We are working on a product update that will allow these clients to work, by not sending their traffic through WARP.

* *Android users* may experience an issue where they are unable to progress through the onboarding screens after initially installing our app. This has been traced down to a 3rd party app with a hidden window trying to stay in focus. Please temporarily stop other running applications to progress through these screens.

* Windows users in certain Cloudflare for Teams configurations may see a SSL/CERT error even when the required certificate is already installed. You can work around this issue by quitting the application and re-launching via the Windows Start menu.

### Frequently asked questions (FAQ)

* [WARP Client doesn't work with other VPN or Security products that include VPN-like functionalities](#vpn-conflict)
* [Why am I not connecting to a closer Cloudflare point of presence?](#i-have-a-closer-colo)
* [Why is my public IP address sometimes visible?](#public-ip)
* [My throughput has dropped while using WARP](#throughput-drop-with-warp)

---------------------

<div id="vpn-conflict">

#### WARP Client doesn't work with other VPN or Security products that include VPN-like functionalities
</div>

At its core, Cloudflare WARP is also a VPN client. Because of this, our application can not function at the same time another VPN is active on the system. Examples of VPN products that our client can't work alongside:
* Kaspersky Internet Security
* Nord VPN
* Mullvad VPN
* Cisco AnyConnect
* etc.

<div id="i-have-a-closer-colo">

#### Why am I not connecting to a closer Cloudflare point of presence?
</div>

As our [Network Map](https://www.cloudflare.com/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the point of presence (colo) you are connecting to isn't necessarily the one physically closest to your location. This can be due to a number of reasons:
* We work hard to prevent it, but sometimes your nearest colo might be having problems; [check here](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for system status
* Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
* Not all Cloudflare locations are WARP enabled. We are constantly evaluating performance and how users are connecting, bringing more colos online with WARP all the time.

<div id="public-ip">

#### Why is my public IP address sometimes visible?
</div>

Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the [origin](https://www.cloudflare.com/learning/cdn/glossary/origin-server/) (the site you are connecting to), but not <i>from</i> the origin itself. In a number of cases, if the origin site you are communicating with can't determine who you are and where you're from, they can't serve locale relevant content to you.

Sites inside Cloudflare network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network (orange clouded sites) however are unable to see this information and instead see the nearest egress colo to their server. We are working to see if in the future we can't find a way to more easily share this information with a limited number of gray clouded sites where it is relevant to both parties.

<div id="throughput-drop-with-warp">

#### My throughput has dropped while using WARP
</div>

Cloudflare WARP is in part powered by 1.1.1.1, the world's fastest DNS resolver. When visiting sites or going to a new location on the Internet, you should see blazing fast DNS lookups. WARP however is built to trade some throughput for enhanced privacy by encrypting all traffic both to and from your device. While this isn't noticeable at most mobile speeds, on desktop systems in countries where high speed broadband is available, you may notice a drop. We think the tradeoff is worth it though and continue to work on improving performance all over the system.
