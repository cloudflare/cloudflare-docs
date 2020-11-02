# Block requests based on IP reputation

A powerful feature of Firewall Rules is its support for Cloudflare’s IP reputation score. To block requests based on IP reputation, use the `cf.threat_score` field, which can contain a score from 0 to 100. Reputation scores are collected from [Project Honeypot](https://www.projecthoneypot.org/).

This example blocks requests from IP addresses that score greater than 0. This is equivalent to setting the Security Level in the Firewall app **Settings** panel to _High_. For more, see [_Understanding the Cloudflare Security Level_](https://support.cloudflare.com/hc/en-us/articles/200170056-Understanding-the-Cloudflare-Security-Level).

This example also blocks requests based on country code ([ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format):

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(ip.geoip.country in {'{'}"CN" "TW" "US" "GB"{'}'}) or cf.threat_score > 0</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
