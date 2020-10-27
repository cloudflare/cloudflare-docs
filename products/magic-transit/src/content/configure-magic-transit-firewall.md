---
title: Magic Transit firewall
order: 3
---

# Configure Magic Transit firewall

Cloudflare’s Magic Transit firewall ruleset includes two components:

- Recommended rules that reflect common amplification attack vectors
- Custom rules requested by you

## Recommended firewall rules

Cloudflare recommends these 11 firewall rules, which reflect known amplification attack vectors. They operate in addition to the distributed denial-of-service (DDoS) protection that Magic Transit provides.

<TableWrap>

<table style="width: 100%">
  <thead>
    <tr>
      <th>Rule ID</th>
      <th>Source Port</th>
      <th>Destination Port</th>
      <th>Protocol</th>
      <th>Action</th>
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

</TableWrap>

## Custom firewall rules

To preserve flexibility, Cloudflare recommends that you restrict custom firewall rules to protocol filters that use the _Allow_ or _Deny_ action.

### Example custom firewall rules

The policy defined in the _Example Custom Firewall Rules_ table allows TCP, GRE, ICMP, IPSEC (ESP and AH), and PIM protocol packets. Packets that use any other protocols are dropped.

<TableWrap>

<table style="width: 100%">
  <thead>
    <tr>
      <th>Rule ID</th>
      <th>Protocol</th>
      <th>Action</th>
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

</TableWrap>

### Firewall rule guidelines

When specifying Magic Transit firewall rules, consider these guidelines:

- Cloudflare executes firewall rules in order of first match, so lists of rules are order sensitive.

- You can specify any of these protocols:
_ah, ax.25, dccp, ddp, egp, eigrp, encap, esp, etherip, fc, ggp, gre, hip, hmp, hopopt, icmp, idpr-cmtp, idrp, igmp, igp, ip, ipcomp, ipencap, ipip, ipv6, ipv6-frag, ipv6-icmp, ipv6-nonxt, ipv6-opts, ipv6-route, isis, iso-tp4, l2tp, manet, mobility-header, mpls-in-ip, ospf, pim, pup, rdp, rohc, rspf, rsvp, sctp, shim6, skip, st, tcp, udp, udplite, vmtp, vrrp, wesp, xns-idp, xtp_

- To use any of the following parameters in a firewall rule, contact your account team:
  - Source IP/prefix
  - Destination IP/prefix
  - Source port
  - Destination port
  - Protocol
  - Packet length
  - Bit field match (Cloudflare is able to match on any part of an IP packet to apply, allow, or drop rules)

<Aside>

When you or your end users are using other Cloudflare services (eg. CDN, Spectrum) that proxy traffic, be aware of the following:

- Firewall rules that block traffic based on source IP address may not work as intended, since rules are evaluated after Cloudflare terminates the incoming TCP connections.
- You must allow [Cloudflare IP addresses](https://www.cloudflare.com/ips/).

</Aside>
