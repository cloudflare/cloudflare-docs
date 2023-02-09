---
title: Minimal ruleset
pcx_content_type: configuration
weight: 2
meta:
  title: Minimal suggested ruleset
---

# Minimal suggested ruleset

The suggested minimal ruleset blocks some known common vectors for DDoS attacks and permits all other ESP, TCP, UDP, GRE and ICMP traffic.

This is a suggested list and not an exhaustive list. Review your environment and add more rules as necessary.

## Recommended rules

**Rule ID**: 1 <br/>
**Description**: Single rule that blocks all traffic with UDP source ports which are used in attacks or invalid in Magic Transit ingress. <br/>
**Match**: `(udp.srcport in {1900 11211 389 111 19 1194 3702 10001 20800 161 162 137 27005 520 0})` <br/>
**Action**: Block <br/>

**Rule ID**: 2 <br/>
**Description**: Blocks TCP traffic with source port 0 and common ports used in TCP SYN/ACK reflection attacks. <br/>
**Match**: `(tcp.srcport in {21 0 3306})` <br/>
**Action**: Block <br/>

**Rule ID**: 3 <br/>
**Description**: Blocks HOPOPT (protocol 0) or else blocks if protocol not in {ESP, TCP, UDP, GRE, ICMP}. Note that this is only an example. Permit the relevant protocols for your environment.<br/>
**Match**: `(ip.proto eq "hopopt") or (not ip.proto in {"esp" "tcp" "udp" "gre" "icmp"})` <br/>
**Action**: Block <br/>

## Traffic and port types

The information below covers traffic type, how the port is used, and reasons for blocking the port.

| Traffic | Port use | Reason to block |
| ------- | -------- | --------------- |
| UDP source port `0` | Reserved port. Should not be used by applications. | Invalid as a legitimate traffic source port. Commonly used in DDoS attacks. |
| UDP source port `1900` | Simple Service Discovery Protocol (SSDP). Allows universal plug and play devices to send and receive information. | [SSDP DDoS attacks](https://www.cloudflare.com/learning/ddos/ssdp-ddos-attack/) exploit Universal Plug and Play protocols. |
| UDP source port `11211` | Memcached. A database caching system designed to speed up websites and networks. | [Memcached DDos Attacks](https://www.cloudflare.com/learning/ddos/memcached-ddos-attack/). |
| UDP source port `389` | Connection-less Lightweight Directory Access Protocol (CLDAP).| [Used in reflection attacks](https://blog.cloudflare.com/reflections-on-reflections/). |
| UDP source port `111` | SunRPC. | Common attack vector. [Used in reflection attacks](https://blog.cloudflare.com/reflections-on-reflections/). |
| UDP source port `19` | CHARGEN. | [Amplification attack vector](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/). |
| UDP source port `11194` | OpenVPN. | Unless this is an authorized VPN in your environment, this common VPN should be blocked. |
| UDP source port `3702` | Web Services Dynamic Discovery Multicast discovery protocol. (WS-Discovery.) | Vulnerable to exploiting for DDoS attacks. |
| UDP source port `10001` | Ubiquiti Unifi discovery protocol. | Ubiquiti devices were exploited and used to conduct DDoS attacks on this port. |
| UDP source port `20800` | Call of Duty. | [Commonly used in attacks](https://blog.cloudflare.com/reflections-on-reflections/). |
| UDP source ports `161` and `162` | SNMP. | Vulnerable to exploiting for DDoS attacks. |
| UDP source port `137` | Netbios. | NetBios allows file sharing over networks. If configured improperly, can expose file systems. |
| UDP source port `27005` | SRCDS. | Used in [amplication attacks](https://blog.cloudflare.com/reflections-on-reflections/). |
| UDP source port `520` | Routing Information Protocol (RIP). | Internal routing protocol. Not required on Internet WAN access. |
| TCP source port `0` | Reserved port. Should not be used by applications. | Commonly used in DDoS attacks. Invalid as a legitimate traffic source port. |
| TCP source port `0` | FTP. | Commonly used for attacks. |
| TCP source port `3306` | MYSQL open source database. | Used as attack vector in DDoS attacks. |

## Other common traffic to consider

The list below is a common list of traffic types you should also consider blocking or restricting inbound.

- SFTP, TFTP
- SSH, Telnet
- RDP
- RCP
- SMCP
- NTP
  - Common vector for reflection attacks. Consider using [Cloudflare Gateway](/web3/), [1.1.1.1's DNS over HTTPs (DoH)](/1.1.1.1/), or an internal DNS service if possible. Consider restricting your firewall rules to only allow the source and destination of DNS traffic.
- MS-SQL
  - Common vector and [increasingly used as vector for DDos attacks](https://blog.cloudflare.com/ddos-attack-trends-for-2021-q4/). Block if unused or consider restricting only to the required source IP addresses.
- HTTP and HTTPS
  - If you only have servers on your Magic Transit prefixes, consider blocking ingress traffic on TCP source ports 80 and 443 from outside. If you have endpoints on your Magic Transit prefixes, you can allow traffic on the source ports but consider creating a disabled rule you can activate to respond to reflection attacks as needed.

If relevant to your environment, consider blocking based on GeoIP, which blocks traffic based on the country or user when an end user's IP address is registered in the GeoIP database.

If you are interested in participating in the beta for [Session Initiation Protocol (SIP) Validation](https://blog.cloudflare.com/programmable-packet-filtering-with-magic-firewall/), contact your Implementation Manager.
