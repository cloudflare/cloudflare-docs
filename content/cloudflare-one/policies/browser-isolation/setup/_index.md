---
pcx_content_type: how-to
title: Setup
layout: single
weight: 1
---

# Set up Browser Isolation

Browser Isolation is enabled through Secure Web Gateway HTTP policies. By default, no traffic is isolated until you have added an Isolate policy to your HTTP policies.

## 1. Connect devices to Cloudflare

Setup instructions vary depending on how you want to connect your devices to Cloudflare. Refer to the links below to view the setup guide for each deployment option.

{{<table-wrap>}}
| Connection           | Mode      | Description |
| ---------------------|-----------|--------------|
| [Gateway with WARP](/cloudflare-one/policies/filtering/initial-setup/http/)    | In-line   | Apply identity-based HTTP policies to traffic proxied through the WARP client. |
| [Gateway proxy endpoint](/cloudflare-one/policies/browser-isolation/setup/non-identity/)    | In-line  | Apply non-identity HTTP policies to traffic forwarded to a proxy endpoint. |
| [Magic WAN](/cloudflare-one/policies/browser-isolation/setup/non-identity/)       | In-line  | Apply non-identity HTTP policies to traffic connected through a GRE or IPsec tunnel. |
| [Clientless remote browser](/cloudflare-one/policies/browser-isolation/setup/clientless-browser-isolation/) | Prefixed URL | Render web pages in a remote browser when users go to `https://<your-team-name>.cloudflareaccess.com/browser/<URL>`.|
{{</table-wrap>}}

## 2. Build an Isolation policy

To configure Browser Isolation policies:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **Policies** > **HTTP**.
2. Select **Create a policy** and enter a name for the policy.
3. Use the HTTP policy [selectors](/cloudflare-one/policies/filtering/http-policies/#selectors) and [operators](/cloudflare-one/policies/filtering/http-policies/#operators) to specify the websites or content you want to isolate.
4. For **Action**, choose either [_Isolate_](/cloudflare-one/policies/browser-isolation/isolation-policies/#isolate) or [_Do not Isolate_](/cloudflare-one/policies/browser-isolation/isolation-policies/#do-not-isolate).
5. (Optional) Configure [settings](/cloudflare-one/policies/browser-isolation/isolation-policies/#policy-settings) for an Isolate policy.
6. Select **Create policy**.

Next, [verify that your policy is working](#3-check-if-a-web-page-is-isolated).

## 3. Check if a web page is isolated

Users can see if a webpage is isolated by using one of the following methods:

- Select the padlock in the address bar and check for the presence of a Cloudflare Root CA.
- Right-click the web page and view the context menu options.

### Normal browsing

- A non-Cloudflare root certificate indicates that Cloudflare did not proxy this web page.

    ![Website does not present a Cloudflare root certificate](/cloudflare-one/static/documentation/rbi/non-cloudflare-root-ca.png)

- The right-click context menu will have all of the normal options.

    ![Normal right-click menu in browser](/cloudflare-one/static/documentation/rbi/non-isolated-browser.png)

### Isolated browsing

- A Cloudflare root certificate indicates traffic was proxied through Cloudflare Gateway.

    ![Website presents a Cloudflare root certificate](/cloudflare-one/static/documentation/rbi/cloudflare-gateway-root-ca.png)

- The right-click context menu will be simplified.

    ![Simplified right-click menu in browser](/cloudflare-one/static/documentation/rbi/isolated-browser.png)

#### Disconnect Browser Isolation

WARP users can temporarily disable remote browsing by [disconnecting the WARP client](/cloudflare-one/connections/connect-devices/warp/warp-settings/#lock-warp-switch).
Once WARP is disconnected, a refresh will return the non-isolated page.
