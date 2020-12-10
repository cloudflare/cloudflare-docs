---
title: Pathing status
order: 122
---

# Pathing status

Cloudflare issues the following **Edge Pathing Statuses**:

- EdgePathingSrc: The stage that made the routing decision
- EdgePathingOp: The specific action or operation taken
- EdgePathingStatus: Additional information complementing the **EdgePathingOp**

The information stored is broken down based on the following categories (click for details below):

## Errors

These occur for requests that didn't pass any of the sanity checks performed by the Cloudflare network. Example cases include:

- Whenever Cloudflare is unable to look up a domain or zone
- An attempt to improperly use the IP for an origin server
- Domain ownership is unclear (for example, the domain is not in Cloudflare)

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>cyclic</em> | Cloudflare loop | <em>err_host</em> | | <em>403</em> |
| <em>dns_err</em> | Unable to resolve | <em>err_host</em> | | <em>409</em> |
| <em>reserved_ip</em> | DNS points to local or disallowed IP | <em>err_host</em> | | <em>403</em> |
| <em>reserved_ip6</em> | DNS points to local or disallowed IPv6 address | <em>err_host</em> | | <em>403</em> |
| <em>bad_host</em> | Bad or no Host header | <em>err_host</em> | | <em>403</em> |
| <em>no_existing_host</em> | Ownership lookup failed: host possibly not on Cloudflare | <em>err_host</em> | | <em>409</em> |

</TableWrap>

## User-based actions

These occur for actions triggered from users based on the configuration for a specific IP (or IP range).

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>Asnum</em><br/> <em>ip</em><br/> <em>ipr24</em><br/> <em>ipr16</em><br/> <em>ip6</em><br/> <em>ip6r64</em><br/> <em>ip6r48</em><br/> <em>ip6r32</em><br/> <em>ctry</em><br/> | the request was blocked | <em>ban</em> | user | 403 |
| <em>Asnum</em><br/> <em>ip</em><br/> <em>ipr24</em><br/> <em>ipr16</em><br/> <em>ip6</em><br/> <em>ip6r64</em><br/> <em>ip6r48</em><br/> <em>ip6r32</em><br/> <em>ctry</em><br/> | <ul><li>the request was allowed</li><li>WAF will not execute</li></ul> | <em>wl</em> | user | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Firewall Rules

The Cloudflare **Firewall Rules** app triggers actions based on matching customer-defined rules.

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>filter_based_firewall</em> | the request was blocked | <em>ban</em> | | |
| <em>filter_based_firewall</em> | the request was allowed | <em>wl</em> | | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Zone Lockdown

_Zone Lockdown_ blocks visitors to particular URIs where the visitor's IP is not allowlisted.

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>zl</em> | Lock down applied | <em>ban</em> | <em>user</em> | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Firewall User-Agent Block

Challenge (Captcha or JavaScript) or block visitors who use a browser for which the User-Agent name matches a specific string

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>ua</em> | Blocked User-Agent | <em>ban</em> | <em>user</em> | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Browser Integrity Check

Assert whether the source of the request is illegitimate or the request itself is malicious

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <span style="font-weight: 400;">empty</span> | Blocked request | <em>ban</em> | <em>bic</em> | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Hot Linking

Prevent hot linking from other sites

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <span style="font-weight: 400;">empty</span> | Blocked request | <em>ban</em> | <em>hot</em> | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## L7-to-L7 DDoS mitigation

Drop DDoS attacks through L7 mitigation

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em><span style="font-weight: 400;">l7ddos</span></em> | Blocked request | <em>ban</em> | <em>protect</em> | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## IP Reputation (MACRO)

The macro stage is comprised of many different paths. They are categorized by the reputation of the visitor IP.

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>nr</em> | There is no reputation data for the IP and no action is being taken (if IUAM is on, a JS challenge is served) | wl | macro | |
| <em>wl</em> | IP is explicitly allowlisted | wl | macro | |
| <em>scan</em> | IP is explicitly allowlisted and categorized as a security scanner | wl | macro | |
| <em>mon</em> | IP is explicitly allowlisted and categorized as a Monitoring Service | wl | macro | |
| <em>bak</em> | IP is explicitly allowlisted and categorized as a Backup Service | wl | macro | |
| <em>mob</em> | IP is explicitly allowlisted and categorized as Mobile Proxy Service | wl | macro | |
| <em>se</em> | IP is explicitly allowlisted as it belongs to a search engine crawler and no action is taken | wl | macro | |
| <em>grey</em> | IP is greylisted (suspected to be bad) but the request was either for a favicon or security is turned off and as such, it is allowlisted. | wl | macro | |
| <em>bad_ok</em> | The reputation score of the IP is bad (or is a TOR IP) but the request was either for a favicon or security is turned off and as such, it is allowlisted. Alternatively, the threat score of the IP is in the accepted security level. | wl | macro | |
| <em>unknown</em> | The <em>pathing_status</em> is unknown and the request is being processed as normal. | wl | macro | |

</TableWrap>

All other paths in the MACRO stage issue a challenge. Possible scenarios include:

- A clean IP (acceptable threat level) with IUAM on will trigger the JS challenge
- A greylisted IP triggers the JS challenge (captcha challenge if IUAM is on)
- An IP with a bad reputation (also TOR) with a threat level above the accepted threshold triggers a captcha challenge (JS challenge if IUAM is on)

## Rate Limiting

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <em>rate_limit</em> | Dropped request | <em>ban</em> | <em>user</em> | |
| <em>rate_limit</em> | IP is explicitly allowlisted | <em>simulate</em> | <em>user</em> | |

</TableWrap>

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Special cases

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| ao_crawl | AO (Always Online) crawler request | <em>wl</em> | <em>skip</em> | |
| <em>cdnjs</em> | Request to a cdnjs resource | <em>wl</em> | <em>skip</em> | |
| | certain challenge forced by Cloudflare's special headers | | <em>forced</em> | |

</TableWrap>

## JavaScript and Captcha Challenge

<TableWrap>

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <ul><li><em>captchaNew</em></li><li><em>jschlNew</em></li></ul> | A Captcha/JavaScript challenge was presented | <em>chl</em> | | <ul><li><em>403</em></li><li><em>503</em></li></ul> |
| <ul><li><em>captchaOk</em></li><li><em>jschlOk</em></li></ul> | A Captcha/JavaScript challenge would have been presented but a clearance cookie was present | <em>temp_ok</em> | | <ul><li>As per request</li></ul> |
| <ul><li><em>captchaSucc</em></li><li><em>jschlSucc</em></li></ul> | A Captcha challenge was solved correctly and a clearance cookie will be issued | <em>temp_ok</em> | <em>macro</em> | <ul><li><em>302</em> (Redirect to original URL)</li></ul> |
| <ul><li><em>captchaFail</em></li><li><em>jschlFail</em></li></ul> | A failed attempt at solving the Captcha challenge, no clearance cookie will be issued | <p><em>chl</em></p> | <em>macro</em> | <ul><li><em>302</em> (Redirect to original URL)</li></ul> |
| <ul><li><em>captchaErr</em></li><li><em>jschlErr</em></li></ul> | A failed attempt at solving the Captcha challenge, no clearance cookie will be issued. Not enough data was provided to solve the challenge. The difference to the previous case is that not all input was provided which is needed to verify the solution | <p><em>chl</em></p> | <em>macro</em> | <br /><ul><li><em>302</em> (Redirect to original URL)</li></ul><br /><br /> |
| <ul><li><em>tokRedempSucc</em></li></ul> | A blinded-token redemption was successful | <p><em>chl</em></p> | | <ul><li>As per request</li></ul> |
| <ul><li><em>tokRedempFail</em></li></ul> | A blinded-token redemption failed | <em>chl</em> | | <ul><li>As per request</li></ul> |

</TableWrap>
