---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/204191238-What-are-the-types-of-Threats-
title: What are the types of Threats
---

# What are the types of Threats?



## Overview

Cloudflare classifies the threats that it blocks or challenges. To help you understand more about your site’s traffic, the “Type of Threats Mitigated” metric on the analytics page measures threats blocked or challenged by the following categories:

### Bad browser:

The source of the request was not legitimate or the request itself was malicious. Users would receive a [1010 error page](https://support.cloudflare.com/hc/articles/360029779472#error1010) in their browser.

Cloudflare's Browser Integrity Check looks for common HTTP headers abused most commonly by spammers and denies them access to your page. It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by bots, crawlers, or visitors).

[Learn more about the Browser Integrity Check here.](https://support.cloudflare.com/hc/en-us/articles/200170086-What-does-the-Browser-Integrity-Check-do-)

### Blocked hotlink:

"Hotlink Protection" ensures that other sites cannot use your bandwidth by building pages that link to images hosted on your origin server. This feature can be turned on and off by Cloudflare’s customers.

[Learn more about Hotlink Protection here.](https://support.cloudflare.com/hc/en-us/articles/200170026)

### Human challenged:

Visitors were presented with an interactive challenge page and failed to pass.

_Note: An interactive challenge page is a difficult to read word or set of numbers that only a human can translate. If entered incorrectly or not answered in a timely fashion, the request is blocked._

### Browser challenge:

A bot gave an invalid answer to the JavaScript challenge (in most cases this won't happen, bots typically do not respond to the challenge at all, so "failed" JavaScript challenges would not get logged).

_Note: During a JavaScript challenge you will be shown an interstitial page for about five seconds while Cloudflare performs a series of mathematical challenges to make sure it is a legitimate human visitor._

### Bad IP:

A request that came from an IP address that is not trusted by Cloudflare based on the Threat Score.

Cloudflare uses Threat Scores gathered from sources such as Project Honeypot, as well as our own communities' traffic to determine whether a visitor is legitimate or malicious. When a legitimate visitor passes a challenge, that helps offset the Threat Score against the previous negative behavior seen from that IP address. Our system learns who is a threat from this activity. Site owners may override the Threat Score at any time using Cloudflare's security settings.

### Country block:

Requests from countries that were blocked based on the user configuration set within the Firewall app.

[Learn more about blocking countries using the Firewall app here.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

### IP block (user):

Requests from specific IP addresses that were blocked based on the user configuration set within the Firewall app.

[Learn more about blocking IPs using the Firewall app here.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

### IP range block (/16):

A /16 IP range that was blocked based on the user configuration set within the Firewall app.

[Learn more about blocking IPs using the Firewall app here.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

### IP range block (/24):

A /24 IP range that was blocked based on the user configuration set within the Firewall app.

[Learn more about blocking IPs using the Firewall app here.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

### New Challenge (user):

Challenge based on user configurations set for visitor’s IP in either WAF managed rules or firewall rules, configured in **Security** > **WAF**.

[Learn more about challenging visitors using the WAF here.](https://support.cloudflare.com/hc/articles/200170136)

### Challenge error:

Requests made by a bot that failed to pass the challenge.

_Note: An interactive challenge page is a difficult to read word or set of numbers that only a human can translate. If entered incorrectly or not answered in a timely fashion, the request is blocked._

### Bot Request:

Request that came from a bot.

### Unclassified:

Unclassified threats comprises a number of automatic blocks that are not related to the Browser Integrity Challenge (Bad Browser). These threats usually relate to Hotlink Protection, and other actions that happen on the edge based on the composition of the request (and not its content).

Unclassified means a number of conditions under which we group common threats related to Hotlink protection as well as certain cases of IP reputation and specific requests that are blocked at the Cloudflare edge before reaching your servers.
