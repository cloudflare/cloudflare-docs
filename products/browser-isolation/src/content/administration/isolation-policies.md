---
title: Isolation policies
order: 2
---

# Isolation policies

Browser Isolation is enabled by configuring a HTTP policy with an Isolate action within Gateway.

<Aside>
This feature must be enabled by Cloudflare, if you do not see it please email your Cloudflare technical contact. Once configured it can take up to 30 minutes for the option to become visible and you will need to logout and back into the Cloudflare for Teams dashboard.
</Aside>

## Before you start
The Cloudflare Gateway L7 firewall will intercept and inspect all HTTP and HTTPS traffic over ports 80 and 443. The inspection of HTTPS traffic requires breaking the TLS connection between the user and the origin server. Cloudflare Gateway presents a certificate to the user and securely connects to the origin on their behalf; however, this requires the Cloudflare certificate to be installed and trusted on each user's device. See [Install Cloudflare Root CA for more information](https://developers.cloudflare.com/gateway/connecting-to-gateway/install-cloudflare-cert).

## Manage HTTP policies

1. On the Teams dashboard, navigate to the Policies tab.
2. Select the **HTTP** tab.
3. Select **Add a Rule**.

Administrators are able to create up to 50 rules in their HTTP policy.

## Create an Isolation policy

Isolation policies are HTTP traffic (Layer 7) policies that use an **Isolate** or **Do Not Isolate** action.

When a HTTP policy applies the Isolate action the user's web browser is transparently served a HTML compatible remote browser client.

### Example isolation policies

#### Isolate all security threats

| Selector | Operator | Value | Action |
| - | - | - | - |
| Security Threats | In | `All security threats` | Isolate

#### Isolate specific domain names

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | In | `example.com`, `example.net` | Isolate

#### Isolating entire domain names
If you would like to isolate an entire domain name, use a regular expression match such as:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | matches regex | `example\.com\|.*\.example\.com` | Isolate

#### Disabling isolation for domains

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | In | `example.com` | Do Not Isolate

<Aside>
For a list of recommended policies see <a href="/usage/isolated-traffic#managed-beta-organization-rules">Usage \ Isolated traffic</a>.
</Aside>

### API traffic
Isolation policies are applied to requests that include `Accept: text/html*`. This allows Browser Isolation policies to co-exist with API traffic.

## Enable L7 filtering

In the settings (Gateway → Policies → Settings) page, click the toggle to enable filtering once clients have been deployed and certificates installed. If you do not enable filtering, your rules will not apply.

<Aside>
Note: It usually takes about 60 seconds for a new policy to be configured for users and you may need to restart your web browser to establish a <a href="/feedback/faq#how-long-does-it-take-for-l7-firewall-policies-to-apply">filtered connection</a> for open websites.
</Aside>

## Start browsing

If you have not already installed the WARP client and Cloudflare Root CA on your device, follow the [installation](/installation) steps.

Next use your normal browser with the WARP client enabled to start using an isolated browser. See [usage](/usage).