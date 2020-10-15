---
title: Pathing status
weight: 122
---

Cloudflare issues the following **Edge Pathing Statuses**:

- EdgePathingSrc: The stage that made the routing decision
- EdgePathingOp: The specific action or operation taken
- EdgePathingStatus: Additional information complementing the **EdgePathingOp**

The information stored is broken down based on the following categories (click for details below):

- [Errors](#errors)
- [User-based actions](#user-based-actions)
- [Firewall Rules](#firewall-rules)
- [Zone Lockdown](#zone-lockdown)
- [Firewall User-Agent Block](#firewall-user-agent-block)
- [Browser Integrity Check](#browser-integrity-check)
- [Hot Linking](#hot-linking)
- [L7-to-L7 DDoS mitigation](#l7-to-l7-ddos-mitigation)
- [IP Reputation (MACRO)](#ip-reputation-macro)
- [Rate Limiting](#rate-limiting)
- [Special cases](#special-cases)
- [Javascript and Captcha Challenge](#javascript-and-captcha-challenge)

---

<a id="errors" style="color: inherit">

### Errors
</a>

These occur for requests that didn't pass any of the sanity checks performed by the Cloudflare network. Example cases include:

- Whenever Cloudflare is unable to look up a domain or zone
- An attempt to improperly use the IP for an origin server
- Domain ownership is unclear (for example, the domain is not in Cloudflare)

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><em>cyclic</em></td>
<td>Cloudflare loop</td>
<td><em>err_host</em></td>
<td>&nbsp;</td>
<td><em>403</em></td>
</tr>
<tr>
<td><em>dns_err</em></td>
<td>Unable to resolve</td>
<td><em>err_host</em></td>
<td>&nbsp;</td>
<td><em>409</em></td>
</tr>
<tr>
<td><em>reserved_ip</em></td>
<td>DNS points to local or disallowed IP</td>
<td><em>err_host</em></td>
<td>&nbsp;</td>
<td><em>403</em></td>
</tr>
<tr>
<td><em>reserved_ip6</em></td>
<td>DNS points to local or disallowed IPv6 address</td>
<td><em>err_host</em></td>
<td>&nbsp;</td>
<td><em>403</em></td>
</tr>
<tr>
<td><em>bad_host</em></td>
<td>Bad or no Host header</td>
<td><em>err_host</em></td>
<td>&nbsp;</td>
<td><em>403</em></td>
</tr>
<tr>
<td><em>no_existing_host</em></td>
<td>Ownership lookup failed: host possibly not on Cloudflare</td>
<td><em>err_host</em></td>
<td>&nbsp;</td>
<td><em>409</em></td>
</tr>
</tbody>
</table>

---

<a id="user-based-actions" style="color: inherit">

### User-based actions
</a>

These occur for actions triggered from users based on the configuration for a specific IP (or IP range).

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td>
<strong>EdgePathingStatus</strong>
</td>
<td>
<strong>Description</strong>
</td>
<td>
<strong>EdgePathingOp</strong>
</td>
<td>
<strong>EdgePathingSrc</strong>
</td>
<td>
<strong>Status Code</strong>
</td>
</tr>
</thead>
<tbody>
<tr>
<td>
<em>Asnum<br/></em>
<em>ip<br/></em>
<em>ipr24<br/></em>
<em>ipr16<br/></em>
<em>ip6<br/></em>
<em>ip6r64<br/></em>
<em>ip6r48<br/></em>
<em>ip6r32<br/></em>
<em>ctry<br/></em>
</td>
<td>
the request was blocked
</td>
<td>
<em>ban</em>
</td>
<td>user</td>
<td>403</td>
</tr>
<tr>
<td>
<em>Asnum<br/></em>
<em>ip<br/></em>
<em>ipr24<br/></em>
<em>ipr16<br/></em>
<em>ip6<br/></em>
<em>ip6r64<br/></em>
<em>ip6r48<br/></em>
<em>ip6r32<br/></em>
<em>ctry<br/></em>
</td>
<td>
<ul>
<li>the request was allowed</li>
<li>WAF will not execute</li>
</ul>
</td>
<td>
<em>wl</em>
</td>
<td>user</td>
<td></td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="firewall-rules" style="color: inherit">

### Firewall Rules
</a>

The Cloudflare **Firewall Rules** app triggers actions based on matching customer-defined rules.

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong>&nbsp;</td>
</tr>
</thead>
<tbody>
<tr>
<td><em>filter_based_firewall</em></td>
<td>the request was blocked</td>
<td><em>ban</em></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>filter_based_firewall</em></td>
<td>the request was allowed</td>
<td><em>wl</em></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="zone-lockdown" style="color: inherit">

### Zone Lockdown
</a>

_Zone Lockdown_ blocks visitors to particular URIs where the visitor's IP is not allowlisted.

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong>&nbsp;</td>
</tr>
</thead>
<tbody>
<tr>
<td><em>zl</em></td>
<td>Lock down applied</td>
<td><em>ban</em></td>
<td>&nbsp;<em>user</em></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="firewall-user-agent-block" style="color: inherit">

### Firewall User-Agent Block
</a>

Challenge (Captcha or JavaScript) or block visitors who use a browser for which the User-Agent name matches a specific string

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong>&nbsp;</td>
</tr>
</thead>
<tbody>
<tr>
<td><em>ua</em></td>
<td>Blocked User-Agent</td>
<td><em>ban</em></td>
<td>&nbsp;<em>user</em></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="browser-integrity-check" style="color: inherit">

### Browser Integrity Check
</a>

Assert whether the source of the request is illegitimate or the request itself is malicious

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong>&nbsp;</td>
</tr>
</thead>
<tbody>
<tr>
<td><span style="font-weight: 400;">empty</span></td>
<td>Blocked request</td>
<td><em>ban</em></td>
<td>&nbsp;<em>bic</em></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="hot-linking" style="color: inherit">

### Hot Linking
</a>

Prevent hot linking from other sites

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong>&nbsp;</td>
</tr>
</thead>
<tbody>
<tr>
<td><span style="font-weight: 400;">empty</span></td>
<td>Blocked request</td>
<td><em>ban</em></td>
<td>&nbsp;<em>hot</em></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="l7-to-l7-ddos-mitigation" style="color: inherit">

### L7-to-L7 DDoS mitigation
</a>

Drop DDoS attacks through L7 mitigation

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong>&nbsp;</td>
</tr>
</thead>
<tbody>
<tr>
<td><em><span style="font-weight: 400;">l7ddos</span></em></td>
<td>Blocked request</td>
<td><em>ban</em></td>
<td>&nbsp;<em>protect</em></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---

<a id="ip-reputation-macro" style="color: inherit">

### IP Reputation (MACRO)
</a>

The macro stage is comprised of many different paths. They are categorized by the reputation of the visitor IP.

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><em>nr</em></td>
<td>There is no reputation data for the IP and no action is being taken (if IUAM is on, a JS challenge is served)</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>wl</em></td>
<td>IP is explicitly allowlisted</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>scan</em></td>
<td>IP is explicitly allowlisted and categorized as a security scanner</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>mon</em></td>
<td>IP is explicitly allowlisted and categorized as a Monitoring Service</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>bak</em></td>
<td>IP is explicitly allowlisted and categorized as a Backup Service</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>mob</em></td>
<td>IP is explicitly allowlisted and categorized as Mobile Proxy Service</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>se</em></td>
<td>IP is explicitly allowlisted as it belongs to a search engine crawler and no action is taken</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>grey</em></td>
<td>IP is greylisted (suspected to be bad) but the request was either for a favicon or security is turned off and as such, it is allowlisted.</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>bad_ok</em></td>
<td>
The reputation score of the IP is bad (or is a TOR IP) but the request was either for a favicon or security is turned off and as such, it is allowlisted.
Alternatively, the threat score of the IP is in the accepted security level.
</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>unknown</em></td>
<td>The <em>pathing_status</em> is unknown and the request is being processed as normal.</td>
<td>wl</td>
<td>macro</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

All other paths in the MACRO stage issue a challenge. Possible scenarios include:

- A clean IP (acceptable threat level) with IUAM on will trigger the JS challenge
- A greylisted IP triggers the JS challenge (captcha challenge if IUAM is on)
- An IP with a bad reputation (also TOR) with a threat level above the accepted threshold triggers a captcha challenge (JS challenge if IUAM is on)

---

<a id="rate-limiting" style="color: inherit">

### Rate Limiting
</a>

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><em>rate_limit</em></td>
<td>Dropped request</td>
<td><em>ban</em></td>
<td>&nbsp;<em>user</em></td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>rate_limit</em></td>
<td>IP is explicitly allowlisted</td>
<td><em>simulate</em></td>
<td>&nbsp;<em>user</em></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

To understand the behavior of challenge pages, see [Javascript and Captcha Challenge](#javascript-and-captcha-challenge).

---
<a id="special-cases" style="color: inherit">

### Special cases
</a>

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>ao_crawl</td>
<td>AO (Always Online) crawler request</td>
<td><em>wl</em></td>
<td>&nbsp;<em>skip</em></td>
<td>&nbsp;</td>
</tr>
<tr>
<td><em>cdnjs</em></td>
<td>Request to a cdnjs resource</td>
<td><em>wl</em></td>
<td>&nbsp;<em>skip</em></td>
<td>&nbsp;</td>
</tr>
<tr>
  <td>&nbsp;</td>
<td>certain challenge forced by Cloudflare's special headers</td>
  <td>&nbsp;</td>
<td><em>forced</em></td>

<td>&nbsp;</td>
</tr>
</tbody>
</table>

---
<a id="javascript-and-captcha-challenge" style="color: inherit">

### Javascript and Captcha Challenge
</a>

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>EdgePathingStatus</strong></td>
<td><strong>Description</strong></td>
<td><strong>EdgePathingOp</strong></td>
<td><strong>EdgePathingSrc</strong></td>
<td><strong>Status Code</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>
<ul>
<li><em>captchaNew</em></li>
<li><em>jschlNew</em></li>
</ul>
</td>
<td>A Captcha/JavaScript challenge was presented</td>
<td><em>chl</em></td>
<td><em>&nbsp;</em></td>
<td>
<ul>
<li><em>403</em></li>
<li><em>503</em></li>
</ul>
</td>
</tr>
<tr>
<td>
<ul>
<li><em>captchaOk</em></li>
<li><em>jschlOk</em></li>
</ul>
</td>
<td>A Captcha/JavaScript challenge would have been presented but a clearance cookie was present</td>
<td><em>temp_ok</em></td>
<td><em>&nbsp;</em></td>
<td>
<ul>
<li>As per request</li>
</ul>
</td>
</tr>
<tr>
<td>
<ul>
<li><em>captchaSucc</em></li>
<li><em>jschlSucc</em></li>
</ul>
</td>
<td>A Captcha challenge was solved correctly and a clearance cookie will be issued</td>
<td><em>temp_ok</em></td>
<td><em>macro</em></td>
<td>
<ul>
<li><em>302</em> (Redirect to original URL)</li>
</ul>
</td>
</tr>
<tr>
<td>
<ul>
<li><em>captchaFail</em></li>
<li><em>jschlFail</em></li>
</ul>
<p><em>&nbsp;</em></p>
</td>
<td>A failed attempt at solving the Captcha challenge, no clearance cookie will be issued</td>
<td>
<p><em>chl</em></p>
</td>
<td><em>macro</em></td>
<td>
<ul>
<li><em>302</em> (Redirect to original URL)</li>
</ul>
</td>
</tr>
<tr>
<td>
<ul>
<li><em>captchaErr</em></li>
<li><em>jschlErr</em></li>
</ul>
</td>
<td>A failed attempt at solving the Captcha challenge, no clearance cookie will be issued. Not enough data was provided to solve the challenge. The difference to the previous case is that not all input was provided which is needed to verify the solution</td>
<td>
<p><em>chl</em></p>
</td>
<td><em>macro</em></td>
<td><br />
<ul>
<li><em>302</em> (Redirect to original URL)</li>
</ul>
<br /><br /></td>
</tr>
<tr>
<td>
<ul>
<li><em>tokRedempSucc</em></li>
</ul>
</td>
<td>A blinded-token redemption was successful</td>
<td>
<p><em>chl</em></p>
</td>
<td><em>&nbsp;</em></td>
<td>
<ul>
<li>As per request</li>
</ul>
</td>
</tr>
<tr>
<td>
<ul>
<li><em>tokRedempFail</em></li>
</ul>
</td>
<td>A blinded-token redemption failed</td>
<td><em>chl</em></td>
<td><em>&nbsp;</em></td>
<td>
<ul>
<li>As per request</li>
</ul>
</td>
</tr>
</tbody>
</table>
