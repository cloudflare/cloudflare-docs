---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172676-Understanding-Cloudflare-DDoS-protection
title: Understanding Cloudflare DDoS protection
---

# Understanding Cloudflare DDoS protection



## Overview

A [Distributed Denial of Service attack](https://www.cloudflare.com/ddos) (DDoS) seeks to make an online service unavailable to its end users.  For all plan types, Cloudflare provides unmetered mitigation of DDoS attacks at Layer 3, 4, and 7. Cloudflare does not bill by attack size and does not have a cap on attack size, type, or duration.

Cloudflare's network is built to automatically monitor and mitigate large [DDoS attacks](https://www.cloudflare.com/ddos). Caching your content at Cloudflare also protects your website against small DDoS attacks, but uncached assets require additional [manual response to DDoS attacks](https://support.cloudflare.com/hc/articles/200170196).

Additionally, Cloudflare helps mitigate smaller DDoS attacks:

-   For zones on any plan, when the HTTP error rate is above the _High_ (default) sensitivity level of 1,000 errors-per-second rate threshold. You can decrease the sensitivity level by [configuring the HTTP DDoS Attack Protection Managed Ruleset](/ddos-protection/managed-rulesets/http).
-   For zones on Pro, Business and Enterprise plans, Cloudflare performs an additional check for better detection accuracy: the errors-per-second rate must also be at least five times the normal origin traffic levels.

Cloudflare determines the error rate based on all HTTP errors in the 52X range (Internal Server Error) and in the 53X range, except for [error 530](https://support.cloudflare.com/hc/articles/115003011431#530error).

Mitigations of HTTP DDoS attacks are shown in the Security Events dashboard as HTTP DDoS events. These events are also available via [Cloudflare Logs](/logs/).

Currently, for DDoS mitigations based on HTTP error rate, customers cannot exclude specific HTTP error codes.

Learn more about [Famous DDoS Attacks](https://www.cloudflare.com/learning/ddos/famous-ddos-attacks/) and [DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) at the Cloudflare Learning Center. You can also review DDoS case studies in the related resources section at the end of this article.

___

## The Cloudflare HTTP DDoS Attack Protection Managed Ruleset

The Cloudflare HTTP DDoS Attack Protection Managed Ruleset is a set of pre-configured rules used to match known attack patterns, known attack tools, suspicious patterns, protocol violations, requests causing large amounts of origin errors, excessive traffic hitting the origin/cache, and additional attack vectors at the application layer on the edge. The ruleset is available for Cloudflare customers on all plans and is enabled by default.

If you are expecting large spikes of legitimate traffic, consider customizing your DDoS protection settings to avoid false positives, where legitimate traffic is falsely identified as attack traffic and blocked/challenged.

Learn more about the Cloudflare HTTP DDoS Attack Protection Managed Ruleset and the available configuration settings in the [Cloudflare Developers portal](/ddos-protection/managed-rulesets/http).

For more information on the actions applied by HTTP DDoS attack protection systems, refer to [HTTP DDoS Attack Protection parameters: Action](/ddos-protection/managed-rulesets/http/override-parameters#action).

___

## The Cloudflare Network-layer DDoS Attack Protection Managed Ruleset

The Cloudflare Network-layer DDoS Attack Protection Managed Ruleset is a set of pre-configured rules used to match known DDoS attack vectors at levels 3 and 4 of the OSI model. The ruleset is available for Cloudflare customers on all plans and is enabled by default.

Learn more about the Cloudflare Network-layer DDoS Attack Protection Managed Ruleset and the available configuration settings in the [Cloudflare Developers portal](/ddos-protection/managed-rulesets/network).

For more information on the actions applied by L3/4 DDoS attack protection systems, refer to [Network-layer DDoS Attack Protection parameters: Action](/ddos-protection/managed-rulesets/network/override-parameters#action).

___

## Determine if you are under DDoS attack

Common signs that you are under DDoS attack include:

-   Your site is offline or slow to respond to requests.
-   There are unexpected spikes in the graph of **Requests Through Cloudflare** or **Bandwidth** in your Cloudflare **Analytics** app.
-   There are strange requests in your origin web server logs that don’t match normal visitor behavior.

{{<Aside type="note">}}
If you are currently under DDoS attack, refer to our guide on
[responding to a DDoS
attack](https://support.cloudflare.com/hc/en-us/articles/200170196-I-am-under-DDoS-attack-what-do-I-do-).
{{</Aside>}}

___

## Is Cloudflare attacking me?

There are two common scenarios where Cloudflare is falsely perceived to attack your site:

-   Unless you [restore the original visitor IP addresses](https://support.cloudflare.com/hc/en-us/sections/200805497-Restoring-Visitor-IPs), Cloudflare IP addresses appear in your server logs for all proxied requests.
-   The attacker is spoofing Cloudflare's IPs. Cloudflare only [sends traffic to your origin web server over a few specific ports](https://support.cloudflare.com/hc/articles/200169156) unless you use [Cloudflare Spectrum](/spectrum/get-started/).

Ideally, because Cloudflare is a reverse proxy, your hosting provider observes attack traffic connecting from [Cloudflare IP addresses](https://www.cloudflare.com/ips/). In contrast, if you notice connections from IP addresses that do not belong to Cloudflare, the attack is direct to your origin web server. Cloudflare cannot stop attacks directly to your origin IP address because the traffic bypasses Cloudflare’s network.

{{<Aside type="tip">}}
If an attacker is directly targeting your origin web server, request
your hosting provider change your origin IPs and update the IP
information in your Cloudflare **DNS** app. Confirm all possible DNS
records are orange-clouded and that your name servers still point to
Cloudflare (unless using a [CNAME
setup](/dns/zone-setups/partial-setup))
before changing your origin IP.
{{</Aside>}}
___

## Related resources

-   [Responding to DDoS attacks](https://support.cloudflare.com/hc/articles/200170196)
-   [Best practices: DDoS preventative measures](https://support.cloudflare.com/hc/articles/200170166)
-   [Using Cloudflare Logs to investigate DDoS traffic (Enterprise Only)](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [What is a DDoS attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
-   [How DNS Amplification Attacks Work](http://blog.cloudflare.com/deep-inside-a-dns-amplification-ddos-attack)

### Case Studies:

-   [How to Launch a 65Gbps DDoS, and How to Stop One](http://blog.cloudflare.com/65gbps-ddos-no-problem)
-   [Ceasefires Don't End Cyberwars](http://blog.cloudflare.com/ceasefires-dont-end-cyberwars)
-   [Reflections on reflection (attacks)](https://blog.cloudflare.com/reflections-on-reflections/)
-   [Stupidly Simple DDoS Protocol (SSDP) generates 100 Gbps DDoS](https://blog.cloudflare.com/ssdp-100gbps/)
-   [Memcrashed - Major amplification attacks from UDP port 11211](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/)
-   [The real cause of large DDoS - IP Spoofing](https://blog.cloudflare.com/the-root-cause-of-large-ddos-ip-spoofing/)
