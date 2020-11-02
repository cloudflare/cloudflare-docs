# Exempt partners from Hotlink Protection

<Aside type='note' header='Note'>

If you use this technique, disable Hotlink Protection within the **Scrape Shield** app so that partner referrals are not blocked by that feature.

</Aside>

When enabled, Cloudflare Hotlink Protection blocks all HTTP referrers that are not part of your domain or zone. That presents a problem if you allow partners to use inline links to your assets.

However, with Firewall Rules you can maintain hotlink protection while allowing inline links from your partners.

This example uses the `http.referer` [field](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#standard-fields) to target HTTP referrals from partner sites.

The `not` operator matches HTTP referrals that are not from partner sites, and the action blocks them:

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>not (http.referer contains "example.com" or http.referer eq "www.example.net" or http.referer eq "www.cloudflare.com")</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
