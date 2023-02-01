---
title: Third-party services and DDoS protection
pcx_content_type: reference
weight: 2
meta:
  title: Third-party services and Cloudflare DDoS protection
---

# Third-party services and Cloudflare DDoS protection

## Using a third-party CDN in front of Cloudflare

Some Cloudflare customers choose to use a Content Delivery Network (CDN) in front of Cloudflare to cache and serve their resources.

Cloudflare recommends that you **do not use a third-party CDN in front of Cloudflare**. Some CDN providers may introduce subtleties into HTTP requests that deviate from protocol standards and/or protocol best practices. Additionally, because traffic to Cloudflare will originate from a limited set of IP addresses of the third-party CDN, in rare occasions — such as when using the Akamai CDN in front of Cloudflare — it may appear as if the CDN is launching a DDoS attack against Cloudflare due to the amount of traffic from these limited IP addresses.

Therefore, it is recommended that you **use the [Cloudflare CDN](/cache/)**, which provides the following benefits:

- You remove an additional hop between vendor data centers, thus reducing latency for your users.
- You perform DDoS filtering in the first point of contact from the Internet, which is a recommended best practice.

Note that, if you are using a third-party CDN in front of Cloudflare and Cloudflare mitigates a DDoS attack, you will still pay your first-hop CDN provider for the attack traffic that they processed before it was mitigated by Cloudflare.

### Recommended DDoS configuration adjustments

If you are using the Akamai CDN in front of Cloudflare, it is recommended that you change the action and/or sensitivity level of the DDoS rule named **HTTP requests with unusual HTTP headers or URI path (signature #1)** with rule ID `0b1e17bd25c74e38834f19043486aee1`:

- Change the rule’s action to _Log_ (only available on Enterprise plans) to view the flagged traffic in the [analytics dashboard](/ddos-protection/reference/analytics/).
- Alternatively, change the rule's **Sensitivity Level** to _Essentially Off_ to prevent the rule from being triggered.

For more information, refer to [HTTP DDoS Attack Protection managed ruleset: Ruleset configuration](/ddos-protection/managed-rulesets/http/#ruleset-configuration).

## Using VPNs, NATs, and other third-party services

Some Cloudflare Magic Transit customers operate Virtual Private Networks (VPN) so that their remote employees can connect securely to the organization’s services. Additionally, larger organizations have Network Addressing Translation (NAT) systems that manage connections in and out of their network.

Cloudflare Magic Transit customers may also use third-party services such as Zoom, Webex, Microsoft Teams, and others for their internal organization communication. Because traffic to Cloudflare will be originating from a limited set of IP addresses belonging to these third-party services, it may appear as if the services are launching a DDoS attack against Cloudflare due to the amount of traffic from limited IP addresses.

Additionally, since this traffic may also be targeting a limited set of destinations (for example, the same designated service ports, VPN endpoints, or NAT IP addresses), it may appear as if the CDN is launching a DDoS attack against Cloudflare due to the amount of traffic from a limited set of IPs _to_ a limited set of IPs.

### Recommended DDoS configuration adjustments

If your organization uses VPNs, NATs, or third-party services at high rates of over 100 Mbps, it is recommended that you one of the following:

- Change the **Sensitivity Level** of the relevant rules to a lower level. Changing the level to _Essentially Off_ will prevent the rules from being triggered. Refer to [HTTP DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/http/) and [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/) for more information on the available adjustments per ruleset and how to perform them.

- Exclude the desired traffic from the Managed DDoS rule using expression filters. You can exclude a combination of source ports, source IP addresses, destination ports, destination IP addresses, and protocol. For more information, refer to [Configure Network-layer DDoS Attack Protection via API](/ddos-protection/managed-rulesets/network/configure-api/).

If you are on an Enterprise plan, you can change a rule’s action to _Log_ to view the flagged traffic in the [analytics dashboard](/ddos-protection/reference/analytics/). After gathering this information, you can later define rule adjustments as previously described.
