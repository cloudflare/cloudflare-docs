---
order: 0
---

# Onboarding

The Cloudflare Network Interconnect (CNI) onboarding process, from scoping to going live, typically takes 10-15 business days.

![Onboarding diagram](../static/cni-onboarding.png)

Throughout the onboarding process, Cloudflare partners closely with your organization to accomplish the following:

* [Scope your configuration](#scope-your-configuration)
* [Configure the network cross-connect](#configure-the-network-cross-connect)
* [Configure Cloudflare Border Gateway Protocol (BGP) and Generic Route Encapsulation (GRE)](#configure-cloudflare-bgp-and-gre)
* [Go live](#go-live)

## Scope your configuration

Cloudflare engages your organization with an initial kickoff call to confirm the scope and timeline for the CNI setup.

_Customer requirements:_ During the kickoff call, be prepared to provide the [configuration data](/network-interconnect/set-up-cni/configuration-data/) for the type of network cross-connect you want to use with CNI.

## Configure the network cross-connect

To configure the cross-connect, the Cloudflare Infrastructure uses your information to generate a Letter of Authorization (LOA)/service key.

_Duration:_ 1–2 weeks.

_Customer requirements:_ We provide you with the LOA/service key so you can:

* Order cross-connects at the locations the LOA specifies.
* Verify when the cross-connects are complete.

For Equinix users, open your Equinix dashboard and select Cloudflare as your service provider. Select your port, Cloudflare port, and port speed. After choosing your VLANID, submit the connection request for approval from Cloudflare.

<Aside type='note'>

When using a virtual partner network interconnect, provision cross-connects using the appropriate partner portals.

For more information, see the [Cloudflare Network Interconnect Partner Program](https://www.cloudflare.com/network-interconnect-partnerships/).

</Aside>

After you provide verification, Cloudflare assigns IP addresses to use with the cross-connect, assuming you are not using an Internet exchange point for the cross-connect.

## Configure Cloudflare BGP

During this phase, Cloudflare validates BGP sessions over the cross-connect.

1. Cloudflare supplies customers with the GRE IPs and BGP Peering info, which is completed after GRE tunnels in CNI links are onboarded.

2. Work with Cloudflare to establish the BGP sesion for the PNI on both sides. This requires a BGP call and a ~2 hour manintenance window provided by the customer.

3. Configure the GRE tunnel over the PNI.

4. Cloudflare up-prefs the CNI connection and turns Magic Transit back on.

_Duration:_ Approximately 1 week.

## Go live

Cloudflare engages your team to confirm connectivity.
