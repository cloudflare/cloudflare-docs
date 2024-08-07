---
_build:
  publishResources: false
  render: never
  list: never
---

<table>
  <thead>
    <tr>
      <th>Display name</th>
      <th style="width: 30%">Name in expressions</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cloudflare Open Proxies</td>
      <td><code>cf.open_proxies</code></td>
      <td>IP addresses of known open HTTP and SOCKS proxy endpoints, which are frequently used to launch attacks and hide attackers identity.</td>
    </tr>
    <tr>
      <td>Cloudflare Anonymizers</td>
      <td><code>cf.anonymizer</code></td>
      <td>IP addresses of known anonymizers (Open SOCKS Proxies, VPNs, and TOR nodes).</td>
    </tr>
    <tr>
      <td>Cloudflare VPNs</td>
      <td><code>cf.vpn</code></td>
      <td>IP addresses of known VPN servers. 
      </td>
    </tbody>
    </table>

{{<Aside>}}
Cloudflare primarily detects VPN traffic that passes through our public resolver at 1.1.1.1. Additionally, Cloudflare can identify major VPNs based on their published IP addresses. Managed Lists for VPNs allow you to block these categories of detected VPNs. However, it's important to clarify that Cloudflare does not detect and block all VPNs at this time. Cloudflare is continually working to improve our detection capabilities and expand our coverage to include a wider range of VPN services.
{{</Aside>}}

<table>
<thead>
<tr>
<th style="width: 18%"></th>
<th style="width: 25%"></th>
<th></th>
</thead>
<tbody>
    <tr>
      <td >Cloudflare Malware</td>
      <td><code>cf.malware</code></td>
      <td>IP addresses of known sources of malware.</td>
    </tr>
    <tr>
      <td>Cloudflare Botnets, Command and Control Servers</td>
      <td><code>cf.botnetcc</code></td>
      <td>IP addresses of known botnet command-and-control servers.</td>
    </tr>
  </tbody>
</table>