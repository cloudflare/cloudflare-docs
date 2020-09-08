---
title: Firewall policies
alwaysopen: true
weight: 214
hidden: false
---


Your Magic Transit firewall policy has two components:

* recommended rules that reflect common amplification attack vectors
* custom rules requested by you

## Recommended firewall rules

Cloudflare recommends these 11 firewall rules, which reflect known amplification attack vectors. They operate in addition to the distributed denial-of-service protection that Magic Transit provides.

<table>
  <thead>
    <tr>
      <td colspan="5" ><strong>Recommended Firewall Rules</strong></td>
    </tr>
    <tr>
      <td><strong>Rule ID</strong></td>
      <td><strong>Source Port</strong></td>
      <td><strong>Destination Port</strong></td>
      <td><strong>Protocol</strong></td>
      <td><strong>Action</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>1900</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>2</td>
      <td>11211</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>3</td>
      <td>389</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>4</td>
      <td>111</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>5</td>
      <td>19</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>6</td>
      <td>1194</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>7</td>
      <td>3702</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>8</td>
      <td>10001</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>9</td>
      <td>0</td>
      <td>Any</td>
      <td>UDP</td>
      <td>Drop</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Any</td>
      <td>32768-65535</td>
      <td>UDP</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Any</td>
      <td>32768-65535</td>
      <td>TCP</td>
      <td>Allow</td>
    </tr>
  </tbody>
</table>

## Custom firewall rules

To preserve flexibility, Cloudflare recommends that you restrict custom firewall rules to protocol filters that use the _Allow_ or _Deny_ action.

### Example custom firewall rules

The policy defined in the _Example Custom Firewall Rules_ table allows TCP, GRE, ICMP, IPSEC (ESP and AH), and PIM protocol packets. Packets that use any other protocols are dropped.

<table>
  <thead>
    <tr>
      <td colspan="3" ><strong>Example custom firewall rules</strong></td>
    </tr>
    <tr>
      <td><strong>Rule ID</strong></td>
      <td><strong>Protocol</strong></td>
      <td><strong>Action</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>TCP</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>2</td>
      <td>GRE</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>3</td>
      <td>ICMP</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>4</td>
      <td>ESP</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>5</td>
      <td>AH</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>6</td>
      <td>PIM</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>7</td>
      <td>ALL</td>
      <td>Drop</td>
    </tr>
  </tbody>
</table>

### Firewall rule guidelines

When specifying Magic Transit firewall rules, consider these guidelines:

* Cloudflare executes firewall rules in order of first match, so lists of rules are order sensitive.

* You can specify any of these protocols:
_ah, ax.25, dccp, ddp, egp, eigrp, encap, esp, etherip, fc, ggp, gre, hip, hmp, hopopt, icmp, idpr-cmtp, idrp, igmp, igp, ip, ipcomp, ipencap, ipip, ipv6, ipv6-frag, ipv6-icmp, ipv6-nonxt, ipv6-opts, ipv6-route, isis, iso-tp4, l2tp, manet, mobility-header, mpls-in-ip, ospf, pim, pup, rdp, rohc, rspf, rsvp, sctp, shim6, skip, st, tcp, udp, udplite, vmtp, vrrp, wesp, xns-idp, xtp_

* To use any of the following parameters in a firewall rule, contact your account team:
  * Source IP/prefix
  * Destination IP/prefix
  * Source port
  * Destination port
  * Protocol
  * Packet length
  * Bit field match (Cloudflare is able to match on any part of an IP packet to apply allow or drop rules)


<Aside type="info">

If you or your end users are using other Cloudflare services (eg. CDN, Spectrum) that proxy traffic:
* Firewall rules to block traffic based on source IP may not work as intended, since rules are evaluated after Cloudflare terminates the incoming TCP connections.
* [Cloudflare IPs](https://www.cloudflare.com/ips/) must be allowed.

</Aside>
