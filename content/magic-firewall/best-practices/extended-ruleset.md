---
title: Extended ruleset
pcx_content_type: configuration
weight: 3
meta:
  title: Extended suggested ruleset
---

# Extended suggested ruleset

If you are unable to export your current perimeter firewall rules, consider identifying categories of systems or user-groups that reside on your MT prefixes, for example:

- [Endpoints (user devices)](#endpoints-user-devices)
- [Internal routers](#internal-routerfirewall-ip-addresses)
- [Web servers](#web-servers)
- [Non-web servers](#non-web-servers)

For each item above, consider the requirements in terms of their permitted Internet access. For example, permit what is required for legitimate traffic and block the rest.

## Create lists for using Magic Firewall rules

For more information on lists, refer to [Use rule lists](/magic-firewall/how-to/use-rules-list/).

You can also create a list from the dashboard from **Configurations** > **Lists** on your **Account Home**.

## Endpoints (User devices)

Endpoint devices do not operate as servers, which means:

- They receive traffic from standard common ports — for example 80 or 443 — towards their ephemeral ports, above 32768 in modern operating systems (above 1025 in older Windows Server 2003 and Windows XP).
- Connections flow outwards, not inwards, and therefore do not receive TCP SYN or ACK packets.
- They typically only need client TCP and UDP, with no requirement for ingress ICMP.

For example, you can create a list for the combination of generic client TCP and client UDP that allows external pings or traceroutes and a catchall rule for all other protocols and traffic.

Create a list named **Endpoints** and specify the list of endpoints or user IP addresses to reference within the rules.

{{<Aside type="note">}}

Rule 10 in the example ruleset below is acting as a catch-all to block all traffic not permitted in rules 1-3 towards your list of Endpoint IP addresses. If you want to permit other traffic to these destination IP addresses, the new rule must be added before rule 10.

{{</Aside>}}

### Suggested rules

**Rule ID**: 1 <br/>
**Description**: Endpoints (clients) will receive traffic destined for ephemeral ports. Blocks inbound SYN-only traffic. (meaning SYN-ACKs are permitted) <br/>
**Match**: `ip.proto eq "tcp" and ip.dst in $endpoints and tcp.dstport in {32768..60999} and not (tcp.flags.syn and not tcp.flags.ack)` <br/>
**Action**: Allow <br/>

**Rule ID**: 2 <br/>
**Description**: Endpoints (clients) will receive traffic destined for ephemeral ports <br/>
**Match**: `ip.proto eq "udp" and ip.dst in $endpoints and udp.dstport in {32768..60999}` <br/>
**Action**: Allow <br/>

**Rule ID**: 3 <br/>
**Description**: Permits ICMP traffic to destination IP addresses in `$endpoints` list with ICMP Types:

- Type 0 = Echo Reply <br/>
- Type 3 = Destination Unreachable <br/>
- Type 11 = Time Exceeded <br/>

**Match**: `ip.proto eq "icmp" and ip.dst in $endpoints and (icmp.type eq 0 or icmp.type eq 3 or icmp.type eq 11)` <br/>
**Action**: Allow <br/>

**Rule ID**: 10 <br/>
**Description**: Otherwise deny all traffic to IP’s in `$endpoints` list <br/>
**Match**: `ip.dst in $endpoints` <br/>
**Action**: Block <br/>

## Internal router/Firewall IP addresses

Follow the best practices for internal routers or firewall interface IP addresses on your MT prefixes below.

1.  Create [an IP List](/fundamentals/global-configurations/lists/ip-lists/), **Internal routers** for example, list your IP addresses.
2.  Block ICMP if it is not needed.
3.  Permit GRE/ESP as needed if the devices have GRE/IPsec tunnels via the Internet.

### Suggested rules

**Rule ID**: 1 <br/>
**Description**: Permit limited ICMP traffic inbound, including:

- Type 0 - Echo Reply
- Type 3 - Destination Unreachable
- Type 8 - Echo
- Type 11 - Time Exceeded <br/>

**Match**: `ip.proto eq "icmp" and ip.dst in $internal_routers and ( (icmp.type eq 0 or icmp.type eq 3) or (icmp.type eq 11) or (icmp.type eq 8) )` <br/>
**Action**: Allow<br/>

**Rule ID**: 2 <br/>
**Description**: Block all other traffic destined to these IP addresses <br/>
**Match**: `ip.dst in $internal_routers` <br/>
**Action**: Block <br/>

## Web Servers

Web servers require careful consideration of necessary traffic flows. Traffic for the **web server** functionality is required in addition to traffic flows where the web server is acting as a client.

Where possible, permit the required destination IP addresses and ports for web servers and block everything else. Additional services, for example NTP/DNS, may be required along with the ports for the web traffic.

The following is an example of suggested rules, but you should only make changes based on your specific requirements. For example, if you are not proxied by Cloudflare Layer 7 protection and you expect traffic sourced from the web towards your web servers:

1.  Create [an IP List](/fundamentals/global-configurations/lists/ip-lists/), **web servers** for example, to list IP addresses for your web servers.
2.  Permit traffic for the web server traffic inbound from the Internet.
3.  Permit traffic for the infrastructure or client traffic flows from the Internet, for example DNS and NTP.
4.  Block all other traffic destined for the web server IP addresses.

### Suggested rules

**Rule ID**: 1 <br/>
**Description**: Allows inbound HTTP/S traffic from the Internet with SYN-only or ACK-only flag (not SYN/ACKs) <br/>
**Match**: `ip.proto eq "tcp" and tcp.srcport in {32768..60999} and ip.dst in $web_servers and tcp.dstport in {80, 443} and not (tcp.flags.syn and tcp.flags.ack)` <br/>
**Action**: Allow <br/>

**Rule ID**: 2 <br/>
**Description**: Allows UDP replies for DNS and NTP to web servers <br/>
**Match**: `ip.dst in $web_servers and ip.proto eq “udp” and udp.srcport in {53 123} and udp.dstport in {1024..65535}` <br/>
**Action**: Allow if necessary but Disable if under attack <br/>

**Rule ID**: 3 <br/>
**Description**: Catch-all to block all other traffic destined for web server IP addresses <br/>
**Match**: `ip.dst in $web_servers` <br/>
**Action**: Block <br/>

Alternatively, if you have Cloudflare Layer 7 protection, the Cloudflare Public IP addresses can be permitted as the source IP addresses to the destination IP addresses for the HTTP/HTTPS inbound traffic. This recommendation effectively replaces Rule 1 in the example above.

For a list of Cloudflare's IP addresses, refer to [Cloudflare's IP addresses](https://www.cloudflare.com/ips/).

### Suggested rules for Cloudflare proxied traffic

**Description**: Allow inbound HTTP/S traffic from Cloudflare with SYN or ACK <br/>
**Match**: `ip.proto eq "tcp" and tcp.srcport in {32768..60999} and ip.dst in $web_servers and tcp.dstport in {80, 443} and not (tcp.flags.syn and tcp.flags.ack) and ip.src in {173.245.48.0/20 103.21.244.0/22 103.22.200.0/22 103.31.4.0/22 141.101.64.0/18 108.162.192.0/18 190.93.240.0/20 188.114.96.0/20 197.234.240.0/22 198.41.128.0/17 162.158.0.0/15 104.16.0.0/13 104.24.0.0/14 172.64.0.0/13 131.0.72.0/22}` <br/>
**Action**: Allow <br/>

## Non-web servers

Restrict the source based on whether the server is expecting traffic from the general Internet or from only specific users.

1.  Apply rules based on source IP or ports if possible.
2.  Restrict permitted destination ports to only those that are required.
3.  Block incoming SYN to the closed ports.

### Suggested rules

- IP Destination Address { non-web server } and TCP dst port in \<valid ports> — Permit
- IP Destination Address { non-web server } and UDP dst port in \<valid ports> — Permit
- IP Destination Address { web server } — Block
