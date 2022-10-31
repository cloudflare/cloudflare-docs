---
pcx_content_type: how-to
title: Setup
weight: 1
---

# Set up Browser Isolation

## Setup options

Two options for getting started with BISO:
In-line browser isolation -> Setup [Gateway HTTP filtering (WARP)](/cloudflare-one/policies/filtering/initial-setup/http/) or set up a non-identity connection (Magic WAN, PAC file)
Clientless browser isolation

Browser Isolation is enabled through Secure Web Gateway HTTP policies. By default, no traffic is isolated until an Isolation policy has been added within HTTP policies.

To start isolating your traffic you need to:

1. Set up

2. Set up an [Isolation policy](/cloudflare-one/policies/filtering/http-policies/#isolate).

## Build an Isolation policy

Browser Isolation policies are configured through the Gateway HTTP policy builder.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **Policies** > **HTTP**.
2. Select **Create a policy** and enter a name for the policy.
3. Use the HTTP policy [selectors](/cloudflare-one/policies/filtering/http-policies/#selectors) and [operators](/cloudflare-one/policies/filtering/http-policies/#operators) to specify the websites or content you want to isolate.
4. For **Action**, choose either [_Isolate_](#isolate) or [_Do not Isolate_](#do-not-isolate).
5. (Optional) Configure [settings](#policy-settings) for an Isolate policy.
6. Select **Create policy**.

Next, verify that the 

## Check if a webpage is isolated

The easiest way to check if a webpage is proxied through Cloudflare is by checking for the presence of a Cloudflare Root CA.

In Chrome, click the padlock to the left of your address bar and select **Certificate**.

### Normal browsing

**Non-Cloudflare Root CA**. Non-Cloudflare for Teams root certificate indicates that Cloudflare did not proxy this webpage.

![Non-Cloudflare for Teams Root CA](/cloudflare-one/static/documentation/rbi/non-cloudflare-root-ca.png)

**Normal context menu**. Right-click context menu will have all normal options.

![Normal right click menu](/cloudflare-one/static/documentation/rbi/non-isolated-browser.png)

### Isolated browsing

**Cloudflare Root CA**. Cloudflare for Teams + Gateway Intermediate indicates traffic was proxied through Cloudflare Gateway.

![Cloudflare for Teams Root CA](/cloudflare-one/static/documentation/rbi/cloudflare-gateway-root-ca.png)

**Simplified context menu**. Right-click context menu will be simplified.

![Simplified right click menu](/cloudflare-one/static/documentation/rbi/isolated-browser.png)

## Disconnect Browser Isolation

If a user would like to temporarily disable isolated browsing, they can do this by disconnecting the WARP client.

### macOS

1. In the Menu Bar, select the Cloudflare logo.
2. Toggle the blue **Connected** switch into the Disconnected state.
3. Refresh the webpage to return to the non-isolated page.

### Windows

1. In the System Tray, select the Cloudflare logo.
2. Toggle the blue **Connected** switch into the Disconnected state.
3. Refresh the webpage to return to the non-isolated page.
