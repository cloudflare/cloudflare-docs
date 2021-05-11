---
order: 100
hidden: true
---

# Troubleshooting and FAQ

This section addresses the most common issues you may come across when setting up or connecting to Cloudflare for Teams.

* [Getting started with Teams](#getting-started-with-teams)
* [General](#general)
* [Devices](#devices)
* [Policies](#policies)
* [Authentication](#authentication)
* [Tunnels](#tunnels)
* [Troubleshooting](#troubleshooting)

## Getting started with Teams

### How do I sign up for Teams?

You can sign up today at [this link](https://dash.cloudflare.com/sign-up/teams). Follow the onboarding steps, choose a team name and a payment plan, and start protecting your network in just a few minutes.

### What's a team domain/team name?

Your team domain is a unique subdomain assigned to your Cloudflare account; for example, `<your-team-name>.cloudflareaccess.com`. Setting up a team domain is an essential step in your Teams configuration. This is where your users will find the apps you've secured behind Teams — displayed in the [App Launcher](/applications/app-launcher) — and will be able to make login requests to them.  The customizable portion of your team domain is called **team name**. You can change this name at any time in the Teams dashboard, under the **Authentication** tab.

| team name | team domain |
|-------------|-----------|
|  `your-team-name` | `<your-team-name>.cloudflareaccess.com` |

### How do I change my subscription plan?

To make changes to your subscription, visit the Billing section under Account on the [Teams Dashboard](https://dash.teams.cloudflare.com/). You can change or cancel your subscription at any time. Just remember - if you downgrade your plan during a billing cycle, your downgraded pricing will apply in the next billing cycle. If you upgrade during a billing cycle, you will be billed for the upgraded plan at the moment you select it. 

### How are active seats measured?

Cloudflare for Teams counts any unique user who authenticated in a calendar month as an active user. This resets at the beginning of each calendar month.

### How do I know if my network is protected behind Teams?

You can visit the [Teams help page](https://help.teams.cloudflare.com). This page will give you an overview of your network details, as well as an overview of the categories that are being blocked and/or allowed.

## General

### What is the difference between Cloudflare Gateway and 1.1.1.1?

1.1.1.1 does not block any DNS query. When a browser requests for example.com, 1.1.1.1 simply looks up the answer either in cache or by performing a full recursive DNS query.

Cloudflare Gateway's DNS resolver introduces security into this flow. Instead of allowing all DNS queries, Gateway first checks the hostname being queried against the intelligence Cloudflare has about threats on the Internet. If that query matches a known threat, or is requesting a blocked domain configured by an administrator as part of a Gateway policy, Gateway stops it before the site could load for the user - and potentially execute code or phish that team member.

### Is multi-factor authentication supported?

Access is subjected to the MFA policies set in your identity provider. For example, users attempting to log in to an Access protected app might log in through Okta. Okta would enforce an MFA check before sending the valid authentication confirmation back to Cloudflare Access.

Access does not have an independent or out-of-band MFA feature. 

### Which browsers are supported?

These browsers are supported:
* Internet Explorer® 11
* Edge® (current release, last release)
* Firefox® (current release, last release)
* Chrome® (current release, last release)
* Safari® (current release, last release)
 
## Policies

### What is the order of policy enforcement?

Zero Trust and DNS policies trigger top to bottom, based on their position in the policy table in the UI. The exception is Bypass policies, which Access evaluates first. For Allow and Deny policies, you can modify the order by dragging and dropping individual policies in the UI.

Similarly, the L7 firewall will evaluate Do Not Inspect policies before any subsequent Allow or Block policies, to determine if decryption should occur. This means regardless of precedence in your list of policies, all Do Not Inspect policies will take precedence over Allow or Block policies.

### Can I secure applications with a second-level subdomain URL?

Yes. Ensure that your SSL certificates cover the first- and second-level subdomain. Most certificates only cover the first-level subdomain and not the second. This is true for most Cloudflare certificates. To cover a second-level subdomain with a CF certificate, select the Custom Hostnames option for Dedicated SSL.
Wildcard-based policies in Cloudflare Access only cover the level where they are applied. Add the wildcard policy to the left-most subdomain to be covered.

### Can I use regular expressions to build policies?

You can use wildcards when setting up Zero Trust policies. Wildcards are useful when specifying application paths you want to protect. For more information, see our guide for [Using wildcards in subdomains and path](/applications/configure-apps/app-paths#using-wildcards-in-subdomains-and-paths).

Gateway uses Rust to evaluate regular expressions. The Rust implementation is slightly different than regex libraries used elsewhere. For example, if you want to match multiple domains, you could use the pipe symbol (`|`) as an OR operator. In Gateway, you do not need to use an escape character (`\`) before the pipe symbol. Let's say you want to block requests to two hosts if either appears in a request header. A regex for such a rule would look like this:

| Selector | Operator | Value | Action |
| - | - | - | - | 
| Host | Matches regex | `.*whispersystems.org | .*signal.org` | Block |

To evaluate if your regex matches, you can use [Rustexp](https://rustexp.lpil.uk/).

### How do isolation policies work together with HTTP policies?

Isolation policies, like all HTTP policies, are evaluated in stages. When a user makes a request which evaluates an Isolation policy, the request will be rerouted to an isolated browser and re-evaluated for HTTP policies. This makes it possible for an isolated browser to remotely render a block page, or have malicious content within the isolated browser blocked by HTTP policies.

### Why is API or CLI traffic not isolated?
Isolation policies are applied to requests that include Accept: `text/html*`. This allows Browser Isolation policies to co-exist with API and command line requests.

### Can Access enforce policies on a specific nonstandard port?
No. Cloudflare Access cannot enforce a policy that would contain a port appended to the URL. However, you can use Cloudflare Argo Tunnel to point traffic to non-standard ports. For example, if Jira is available at port `8443` on your origin, you can proxy traffic to that port via Argo Tunnel.

## Authentication

### Does Access work with multiple identity providers at the same time?

Yes. Your team can simultaneously use multiple providers, reducing friction when working with partners or contractors. Get started by adding your preferred identity providers as login methods on the Teams dashboard. Then, when securing a new application behind Access, you'll be able to choose which providers you want your users to log in with to reach that application. 

### What if the identity provider my team uses is not listed?

You can add your preferred identity providers to Cloudflare Access even if you don't see them listed on the Teams dashboard, as long as these providers support SAML 2.0 or [OpenID Connect (OIDC)](/identity/idp-integration/generic-oidc). 

## Devices

### Why is my device not connecting to a closer Cloudflare data center?
As our [Network Map](https://www.cloudflare.com/en-gb/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the data center (colo) you are connecting to isn't necessarily the one physically closest to your location. This can be due to a number of reasons:

* Sometimes your nearest colo might be having problems, although we work hard to prevent it. Check [here](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for system status.
* Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
* Not all Cloudflare data centers are WARP-enabled. We are constantly evaluating performance and how users are connecting, bringing more colos online with WARP all the time.

### Why is my public IP address sometimes visible?
Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the origin (the site you are connecting to), but not from the origin itself. In a number of cases, if the origin site you are communicating with can't determine who you are and where you're from, they can't serve locale relevant content to you.
Sites inside Cloudflare network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network (orange clouded sites) however are unable to see this information and instead see the nearest egress colo to their server. We are working to see if in the future we can't find a way to more easily share this information with a limited number of gray clouded sites where it is relevant to both parties.

### ​Why has my throughput dropped while using WARP?
Cloudflare WARP is in part powered by 1.1.1.1. When visiting sites or going to a new location on the Internet, you should see blazing fast DNS lookups. However, WARP is built to trade some throughput for enhanced privacy, because it encryps all traffic both to and from your device. While this isn't noticeable at most mobile speeds, on desktop systems in countries where high speed broadband is available, you may notice a drop. We think the tradeoff is worth it though and continue to work on improving performance all over the system.

## Tunnels

### ​Can I create a Tunnel for an apex domain?

Yes. With [Named Tunnels](https://blog.cloudflare.com/argo-tunnels-that-live-forever/) you can create a CNAME at the apex that points to the named tunnel.

### ​Does Argo Tunnel support Websockets?

Yes. Argo Tunnel has full support for Websockets.

### What are the ports and IPs used by `cloudflared`?

Users can implement a positive security model with Argo Tunnel by restricting traffic originating from cloudflared. The parameters below can be configured for egress traffic inside of a firewall.

- TCP port 7844 (HTTPS)
- IPs are those behind **region1.argotunnel.com** and **region2.argotunnel.com** \*

Below the output of `dig` commands towards the above hostnames:

```bash
$ dig region1.argotunnel.com
...

;; ANSWER SECTION:
region1.argotunnel.com.	86400	IN	A	198.41.192.7
region1.argotunnel.com.	86400	IN	A	198.41.192.47
region1.argotunnel.com.	86400	IN	A	198.41.192.107
region1.argotunnel.com.	86400	IN	A	198.41.192.167
region1.argotunnel.com.	86400	IN	A	198.41.192.227

...

$ dig region2.argotunnel.com

...

;; ANSWER SECTION:
region2.argotunnel.com.	300	IN	A	198.41.200.193
region2.argotunnel.com.	300	IN	A	198.41.200.233
region2.argotunnel.com.	300	IN	A	198.41.200.13
region2.argotunnel.com.	300	IN	A	198.41.200.53
region2.argotunnel.com.	300	IN	A	198.41.200.113

...
```

\* *These IP addresses are unlikely to change but in the event that they do, Cloudflare will update the information here.*

### How can Tunnel be used with Partial DNS (CNAME Setup)?

Cloudflare offers two modes of setup: Full Setup, in which the domain uses Cloudflare DNS name servers, and Partial Setup (also known as CNAME setup) in which the domain uses non-Cloudflare DNS servers.

The best experience with Argo Tunnel is using Full Setup because Cloudflare manages DNS for the domain and can automatically configure DNS records for newly started Tunnels.

You can still use Tunnel with Partial Setup. You will need to create a new DNS record with your current DNS provider for each new hostname connected through Argo Tunnel. The DNS record should be of type CNAME or ALIAS if it is on the root of the domain. The name of the record should be the subdomain it corresponds to (e.g. example.com or tunnel.example.com) and the value of the record should be subdomain.domain.tld.cdn.cloudflare.net. (e.g. example.com.cdn.cloudflare.net or tunnel.example.com.cdn.cloudflare.net)

### How can origin servers be secured when using Tunnel?

Tunnel can expose web applications to the internet that sit behind a NAT or firewall. Thus, you can keep your web server otherwise completely locked down. To double check that your origin web server is not responding to requests outside Cloudflare while Tunnel is running you can run netcat in the command line:

```bash
netcat -zv [your-server’s-ip-address] 80
netcat -zv [your-server’s-ip-address] 443
```

If your server is still responding on those ports, you will see:

```bash
[ip-address] 80 (http) open
```

If your server is correctly locked down, you will see:

```bash
[ip-address] 443 (https): Connection refused
```

### What is the difference between Tunnel creating a CNAME or AAAA record in the hostname's DNS setting?

Tunnels that use Cloudflare's Load Balancer use CNAME records. Tunnels that do not use the Load Balancer product will create AAAA records.

### Does Argo Tunnel send visitor IPs to my origin?

No. When using Argo Tunnel, all requests to the origin are made internally between `cloudflared` and the origin.

To log external visitor IPs, you will need to [configure an alternative method](https://support.cloudflare.com/hc/en-us/articles/200170786-Restoring-original-visitor-IPs-Logging-visitor-IP-addresses-with-mod-cloudflare-).

### Why does the name "warp" appear in some legacy materials?

Argo Tunnel was previously named Warp during the beta phase. As Warp was added to the Argo product family, we changed the name to match.

## Troubleshooting

### I see a website is blocked, and it shouldn't be.

If you believe a domain has been incorrectly blocked, you can use [this form](https://radar.cloudflare.com/categorization-feedback/) to get the URL reviewed.

### I see an error saying `No Access-Control-Allow-Origin header is present on the requested resource`.

Cloudflare Access requires that the credentials: `same-origin parameter` be added to JavaScript when using the Fetch API (to include cookies). AJAX requests fail without this parameter present. For more information, see our documentation about [CORS settings](/policies/zero-trust/cors#list-of-cors-settings).

### I see untrusted certificate warnings for every page and I am unable to browse the Internet.

Advanced security features including HTTPS traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all of your devices, these steps will need to be performed on each new device that is to be subject to HTTP Filtering.
To install the Cloudflare root certificate, follow the steps found [here](/connections/connect-devices/warp/install-cloudflare-cert).

### I see a Cloudflare Gateway error page when browsing to a website.

![HTTP error page](../static/documentation/faq/http-error-page.png)

We present an HTTP error page in the following cases:
1. ​**An untrusted certificate is presented from the origin to Gateway**. Gateway will consider a certificate is untrusted if any of these three conditions are true:
  * The server certificate issuer is unknown or is not trusted by the service.
  * The server certificate is revoked and fails a CRL check (OSCP checking coming soon)
  * There is at least one expired certificate in the certificate chain for the server certificate
​
1. **Common certificate errors occur**. For example,  in the event of a certificate common name mismatch.
1. **​Insecure cipher suite**. When the connection from Cloudflare Gateway to an upstream server is insecure (e.g, uses an insecure cipher such as rc4, rc4-md5, 3des, etc). We do support upstream connections that require a connection over TLS that is prior to TLS 1.3. We will support the ability for an administrator to configure whether to trust insecure connections in the very near future.

If you see this page, providing as much information as possible to the local IT administrator will be helpful as we troubleshoot with them, such as:
* Operating System (Windows 10, macOS 10.x, iOS 14.x)
* Web browser (Chrome, Firefox, Safari, Edge)
* URL of the request
* Screenshot or copy/paste of the content from the error page

### I see an error in the Gateway Overview page, and no analytics are displayed.

![Overview empty](../static/documentation/faq/gateway-dash-overview-empty.png)

You may not see analytics on the Overview page for the following reasons:

* **You are not sending DNS queries to Gateway**. Verify that the destination IP addresses you are sending DNS queries to are correct. You can check the destination IP addresses for your location by going to your locations page and then expanding the location.
* **You are using other DNS resolvers**. If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. Please make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.
* **The source IPv4 address for your location is incorrect**. If you are using IPv4, check the source IPv4 address that you entered for the location matches with the network's source IPv4 address.
* **Analytics is not available yet**. It takes some time to generate the analytics for Cloudflare Gateway. If you are not seeing anything even after 5 minutes, please file a support ticket.

### I see a `websocket: bad handshake` error.

If your Cloudflare account has Universal SSL enabled and the SSL/TLS encryption mode is set to Off, cloudflared will return a "websocket: bad handshake" error. To resolve, set the SSL/TLS encryption mode to any setting other than Off.

### ​I see a "No Browsers Available" alert.

If you encounter this error please [file feedback](https://developers.cloudflare.com/cloudflare-one/connections/connect-browsers/known-limitations#submitting-feedback) via the WARP client and we will investigate.

### ​I see a "Maximum Sessions Reached" alert.
This can occur if your device is attempting to establish a connection to more than two remote browser instances.
A browser isolation session is a connection from your local browser to a remote browser. Tabs and windows within the same browser share a single remote browser session. In practice, this generally means that you can open both Chrome and Firefox to use browser isolation concurrently, but attempting to open a third browser such as Opera will cause this alert to appear. To release a browser session, please close all tabs/windows in your local browser. The remote browser session will be automatically terminated within 15 minutes.

Safari is more susceptible to presenting this error. See [workaround](/connections/connect-browsers/known-limitations#safari).

### Mobile applications warn of an invalid certificate, even though I installed the Cloudflare certificate on my system.

These mobile applications may use [certificate pinning](/glossary#certificate-pinning). Cloudflare Gateway dynamically generates a certificate for all encrypted connections in order to inspect the content of HTTP traffic. This certificate will not match the expected certificate by applications that use certificate pinning.
To allow these applications to function normally, administrators can configure bypass rules to exempt traffic to hosts associated with the application from being intercepted and inspected.

### My tunnel fails to authenticate. 

To start using Argo Tunnel, a super administrator in the Cloudflare account must first log in through `cloudflared login`. The client will launch a browser window and prompt the user to select a hostname in their Cloudflare account. Once selected, Cloudflare generates a certificate that consists of three components:

* The public key of the origin certificate for that hostname
* The private key of the origin certificate for that domain
* A token that is unique to Argo Tunnel

Those three components are bundled into a single PEM file that is downloaded one time during that login flow. The host certificate is valid for the root domain and any subdomain one-level deep. Cloudflare uses that certificate file to authenticate `cloudflared` to create DNS records for your domain in Cloudflare.

The third component, the token, consists of the zone ID (for the selected domain) and an API token scoped to the user who first authenticated with the login command. When user permissions change (if that user is removed from the account or becomes an admin of another account, for example), Cloudflare rolls the user's API key. However, the certificate file downloaded through `cloudflared` retains the older API key and can cause authentication failures. The user will need to login once more through `cloudflared` to regenerate the certificate. Alternatively, the administrator can create a dedicated service user to authenticate.

### Firefox shows network protocol violation when using the WARP client

You may have to disable the DNS over HTTPs setting in Firefox. To do so, navigate to Firefox Preferences, scroll down to **Network Settings**, and uncheck **Enable DNS over HTTPS > OK**.