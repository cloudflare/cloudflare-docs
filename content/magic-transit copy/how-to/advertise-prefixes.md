---
pcx_content_type: how-to
title: Advertise prefixes
weight: 3
---

# Advertise prefixes

Cloudflare measures the Magic Transit prefix count based on the number of prefixes a customer announces through Cloudflare. The size of the prefix does not matter; there is no commercial or technical restriction. However, prefixes can only be announced exactly as they were provisioned. For example, a `/20` prefix onboarded to Magic Transit can only be announced as a `/20`. Smaller subnets that constitute the `/20` cannot be announced individually. To announce the 16x `/24s` within the `/20`, for example, requires onboarding all 16 prefixes individually. If this disaggregated setup is desired, the total Magic Transit prefix count will increase.

List all prefixes and the ASNs where they should originate. When specifying prefixes, observe these guidelines:

- Prefixes must support at least 256 hosts (`/24` in classless inter-domain routing CIDR notation.
- Internet Routing Registry entries and Letters of Authorization must match the prefixes and originating prefixes you submit to Cloudflare.
- When using contiguous prefixes, specify aggregate prefixes where possible.
- When using Route Origin Authorizations (ROAs) to sign routes for [resource public key infrastructure (RPKI)](https://tools.ietf.org/html/rfc8210), the prefix and originating ASN must match the onboarding submission.
- If you do not own an ASN, you can use the Cloudflare Customer ASN (AS209242).
- Prefixes using BGP-controlled advertisements cannot be used in conjunction with on-demand auto-advertisement. You must use dynamic advertisement.

<details>
<summary>
  Prefix configuration example
</summary>
<div class="special-class" markdown="1">

| Prefix          | Originating AS |
| --------------- | -------------- |
| `103.21.244.0/23` | AS209242       |
| `131.0.72.0/22`   | AS395747       |
| `103.21.245.0/24` | AS395747       |

</div>
</details>

{{<Aside type="note" header="Note">}}

When customers supply their own ASN, Cloudflare prepends the main Cloudflare ASN (AS13335) to the BGP `AS_PATH`. For example, if the customer ASN is AS64496, anyone directly peering with Cloudflare sees the path as `13335 64496`.

If you do not have an ASN or do not want to bring your ASN to Cloudflare, you can use the Cloudflare Customer ASN (AS209242). In this case, the path becomes `13335 209242`.

{{</Aside>}}

## Add an IP prefix

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Magic Transit** > **Manage Magic Transit configuration** > **Configure**.
3. From the **IP Prefixes** tab, select **Add IP Prefix**. 
4. Fill out the information for your prefix and select **Add IP Prefix**.

After you add the prefix, you can edit its status.

## Edit the status of a prefix

1. From the **IP Prefixes** tab, locate the prefix you want to modify and select **Edit**.
2. On the **Edit IP Prefix** page under **Status**, choose a status.
3. *(Optional)* Edit the description for your prefix.
4. Select **Edit IP Prefix** to save your changes.

{{<Aside type="note" header="Note:">}}

To avoid latency and potentially dropped routes, enable prefix advertisement from Cloudflare before withdrawing the advertisement from your data center.

{{</Aside>}}

## Delete a prefix

You can only delete a prefix with an **Unapproved** status. To delete prefixes with a different status, contact your administrator or account manager.

1. From the **IP Prefixes** tab, locate the prefix you want to modify and select **Delete**.
2. Confirm your choice from the modal by selecting **Delete**.

## Border Gateway Protocol (BGP) control for advertisements

Use BGP to control the advertisement status of your prefix — advertised or withdrawn — from Cloudflare’s global network for on-demand deployment scenarios. BGP Control works by establishing BGP sessions to Cloudflare’s globally distributed Route Reflectors, which will initiate propagation of your prefix advertisement across Cloudflare's global network.

Prefixes can be advertised from Cloudflare’s network in a supported on-demand method such as BGP Control, or dynamically via the UI, API, or [Magic Network Monitoring](/magic-transit/magic-network-monitoring/). Prefixes advertised via BGP Control cannot be advertised dynamically as this method is configured during the onboarding of your prefix.

![BGP diagram for Magic Transit](/images/magic-transit/bgp-diagram.png)

To begin using BGP control, contact your account team with the following information:

- BGP endpoint IP addresses
- Prefixes you want to use with BGP control
- Your ASN for the BGP session

After receiving your information, Cloudflare will update firewall filters to establish the BGP session and provide you with the BGP endpoints to control your prefixes.

### Regional settings

Magic Transit requires static routing to steer traffic from Cloudflare’s network over one of your configured tunnel off-ramps (GRE, IPsec or CNI). Currently, advertisement of routes for traffic engineering purposes is not supported. As a best practice to reduce last-hop latency, you should consider scoping your routes regionally. The default setting for static route regions is **All Regions**. Refer to [Configure static routes](/magic-transit/how-to/configure-static-routes/) for more information.

## Example router configurations

Below you can find example peering configurations for [Cisco IOS](https://www.cisco.com/c/en/us/td/docs/ios/fundamentals/command/reference/cf_book.html) and [Juniper Junos OS](https://www.juniper.net/documentation/us/en/software/junos/cli/index.html) for on-demand deployments leveraging BGP Control. The IP addresses used are from Cloudflare's route reflectors and should be left as is.


#### Cisco IOS

```txt
ip route {{ <YOUR-MAGIC-TRANSIT-PREFIX> }} Null0
ip prefix-list magic-transit-prefix seq 5 permit {{ <YOUR-MAGIC-TRANSIT-PREFIX> }}
 
route-map cloudflare-magic-transit-out permit 1
match ip address prefix-list magic-transit-prefix
!
route-map cloudflare-magic-transit-out deny 99
 
route-map reject-all deny 99
 
router bgp {{ <YOUR-ASN> }}
neighbor 141.101.67.22 remote-as 13335
neighbor 141.101.67.22 ebgp-multihop 64
neighbor 141.101.67.22 timers 60 900
neighbor 162.158.160.22 remote-as 13335
neighbor 162.158.160.22 ebgp-multihop 64
neighbor 162.158.160.22 timers 60 900
neighbor 173.245.63.66  remote-as 13335
neighbor 173.245.63.66  ebgp-multihop 64
neighbor 173.245.63.66  timers 60 900
!
address-family ipv4 unicast
redistribute static
neighbor 141.101.67.22 route-map cloudflare-magic-transit-out out
neighbor 141.101.67.22 route-map reject-all in
neighbor 162.158.160.22 route-map cloudflare-magic-transit-out out
neighbor 162.158.160.22 route-map reject-all in
neighbor 173.245.63.66  route-map cloudflare-magic-transit-out out
neighbor 173.245.63.66  route-map reject-all in
exit-address-family
```

#### Juniper MX (Junos OS set commands)

```txt
set protocols bgp group CF_ROUTE_REFLECTORS neighbor 162.158.160.22 description "CF RR#1 SIN"
set protocols bgp group CF_ROUTE_REFLECTORS neighbor 173.245.63.66 description "CF RR#2 IAD"
set protocols bgp group CF_ROUTE_REFLECTORS neighbor 141.101.67.22 description "CF RR#3 CDG"
set protocols bgp group CF_ROUTE_REFLECTORS peer-as 13335
set protocols bgp group CF_ROUTE_REFLECTORS import REJECT-ALL
set protocols bgp group CF_ROUTE_REFLECTORS export BGP-CONTROL-OUT
 
set policy-options policy-statement REJECT-ALL then reject
set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> from route-filter 104.245.62.0/24 exact
set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> from protocol static
set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> from route-type internal
set policy-options policy-statement BGP-CONTROL-OUT term <TERM-NAME> then accept
set policy-options policy-statement BGP-CONTROL-OUT then reject
```

#### Juniper MX (Junos OS XML format)

```txt
@rtr01> show configuration routing-instances STAGE protocols bgp group CF_ROUTE_REFLECTORS
type external;
multihop {
    ttl 64;
}
local-address {{customer router IP}}
import NONE;
export NONE;
peer-as 13335;
local-as {{customer AS}} loops 2;
neighbor 162.158.160.22 {
    description "CF RR#1 SIN";
}
neighbor 173.245.63.66 {
    description "CF RR#2 IAD";
}
neighbor 141.101.67.22 {
    description "CF RR#3 CDG";
}
```