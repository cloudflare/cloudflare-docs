---
pcx_content_type: configuration
title: Exempt partners from Hotlink Protection
---

# Exempt partners from Hotlink Protection

When enabled, [Cloudflare Hotlink Protection](https://support.cloudflare.com/hc/articles/200170026) blocks all HTTP referrers that are not part of your domain or zone. That presents a problem if you allow partners to use inline links to your assets.

However, with firewall rules you can maintain hotlink protection while allowing inline links from your partners.

{{<Aside type="note">}}

If you use this technique, disable Hotlink Protection within the **Scrape Shield** app so that partner referrals are not blocked by that feature.

{{</Aside>}}

This example uses the [`http.referer`](/ruleset-engine/rules-language/fields/#field-http-referer) field to target HTTP referrals from partner sites.

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
			<td>
				<code>
					not (http.referer contains "example.com" or http.referer eq "www.example.net" or
					http.referer eq "www.cloudflare.com")
				</code>
			</td>
			<td>
				<em>Block</em>
			</td>
		</tr>
	</tbody>
</table>
