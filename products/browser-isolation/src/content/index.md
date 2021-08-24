---
title: Welcome
order: 0
type: overview
---

<ContentColumn>

# Welcome
Welcome to the Cloudflare Browser Isolation documentation!

## How Browser Isolation works

Browser Isolation works by intercepting normal browsing traffic and serving a web-native remote client to the user's browser instead of the normal HTML/CSS/Javascript content.

This web-based remoting client connects to a containerized headless browser hosted in a nearby Cloudflare data center. The remote browser is responsible for downloading and executing all foreign webpage code (HTML, CSS, Javascript etc), and serves network vector drawing commands over the network to your local browser.

Since HTML, CSS and Javascript content is not served to the user's browser, it is protected from malicious websites that attempt to exploit web-based vulnerabilities.

The web-based remoting client is downloaded, installed and updated on-the-fly without requiring the user to make any changes to their browser.

Our network automatically provisions, scales and upgrades browsers for users. The first time a user connects, we assign them a remote browser, and when all active tabs are closed the remote browser is automatically destroyed after 15 minutes of inactivity.

Remote browsing is invisible to the user who continues to use their browser normally without changing their preferred browser and habits. Every open tab and window is automatically isolated.

![Diagram of how Browser Isolation integrates with WARP and Gateway](./static/cloudflare-one-browser-diagram.png)

While the Browser Isolation technology does not require any additional software to be installed on a device, it does require a method to reroute Internet traffic through Cloudflare's network. This is achieved by leveraging Cloudflare WARP, a VPN-like desktop agent that securely tunnels your Internet traffic through a nearby Cloudflare data center.

## Get started

Browser Isolation is integrated into Cloudflare for Teams HTTP Policies.

In order to use Browser Isolation with administrative controls you will need your own Cloudflare for Teams account with the Browser Isolation add-on subscription. Follow [this guide](/administration/setup-teams) to get started.

</ContentColumn>
