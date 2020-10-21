---
title: Specify IP addresses for endpoint health checks
alwaysopen: true
order: 4
hidden: false
---

## Specify IP addresses for endpoint health checks

Magic Transit uses endpoint health checks to determine the overall health of your inter-network connections. Probes originate from Cloudflare infrastructure, outside customer network namespaces, and target IP addresses deep within your network, beyond the tunnel-terminating border router. These “long distance” probes are purely diagnostic.

When choosing which endpoint IP addresses to monitor with health checks, use these guidelines:

* Provide 1 IP address for each of the prefixes to be advertised by Cloudflare.
* Redundant IPs routed via the same ISP and infrastructure are not necessary but are useful when troubleshooting.

Cloudflare pings health check IPs from within the [published Cloudflare IP range](https://www.cloudflare.com/ips/), which is also available via the [Cloudflare API](https://api.cloudflare.com/#cloudflare-ips-properties).

For an example endpoint health check configuration, refer to this table:

<table>
  <thead>
    <tr>
      <td colspan="2" ><strong>Example endpoint health check configuration</strong></td>
    </tr>
    <tr>
      <td><strong>Prefix</strong></td>
      <td><strong>Endpoint IP address</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>103.21.244.0/24</td>
      <td>103.21.244.100</td>
    </tr>
    <tr>
      <td>103.21.245.0/24</td>
      <td>103.21.245.100</td>
    </tr>
  </tbody>
</table>
