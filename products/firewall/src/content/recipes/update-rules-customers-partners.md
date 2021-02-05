# Update firewall rules for customers or partners

You may want to adjust your firewall rules to increase access by customers or partners.

Potential examples include:
- Removing rate limiting for an API
- Sharing brand assets and marketing materials

<Aside type='note' header='Note'>

These rules can bypass Cloudflare's security features and are generally not recommended. Use with caution.

</Aside>

## Update firewall rules by ASN
If a customer or partner is large enough, you could set up a firewall rule based on an [autonomous system number (ASN)](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/).

### Allow traffic by ASN

This example uses:
- `ip.geoip.asnum` to specify the general region
- The `cf.bot_management.score` [dynamic field](/cf-firewall-language/fields/#dynamic-fields) to ensure partner traffic does not come from bots

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(ip.geoip.asnum eq 12345 and cf.bot_management.score gt 30)</code></td>
      <td><em>Allow</em></td>
    </tr>
  </tbody>
</table>

<Aside type='warning' header='Important'>

Access to [Bot Management](https://developers.cloudflare.com/logs/tutorials/bot-management-dashboard/) requires a Cloudflare Enterprise plan with Bot Management.

</Aside>

### Adjust rules by ASN

This example uses:
- `ip.geoip.asnum` to specify the general region
- The `cf.threat_score` [dynamic field](/cf-firewall-language/fields/#dynamic-fields) to ensure requests are not high-risk traffic

If a request meets these criteria, your firewall bypasses normal `User Agent Block` rules.

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(ip.geoip.asnum eq 12345 and cf.threat_score lt 14)</code></td>
      <td><em>Bypass - User Agent Block</em></td>
    </tr>
  </tbody>
</table>

##  Update firewall rules by IP
For smaller organizations, you could set up firewall rules based on IP addresses.

### Allow traffic by IP address

This example:
- Specifies the network and host
- Uses the `cf.bot_management.score` [dynamic field](/cf-firewall-language/fields/#dynamic-fields) to ensure requests are not high-risk traffic

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(ip.src eq 1.1.1.1 and http.host eq "example.com" and cf.bot_management.score gt 30)</code></td>
      <td><em>Allow</em></td>
    </tr>
  </tbody>
</table>

### Adjust rules by IP address

This example specifies the network and host.

If a request meets these criteria, your firewall bypasses normal `Rate Limiting` rules.

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(ip.src eq 1.1.1.1 and http.host eq "example.com")</code></td>
      <td><em>Bypass - Rate Limiting</em></td>
    </tr>
  </tbody>
</table>


