---
title: Glossary
order: 121
---

# Glossary

## Terminology categories

### General Terms

#### Request

A record of each request that has been processed through the Cloudflare network

#### Origin requests

Requests served from the origin server

#### Cached requests

The number of requests served from Cloudflare without having to hit the origin server. Cached requests are the sum of all requests where **CacheCacheStatus** equals _hit_, _stale_, _updating_, _ignored_. This doesn’t include _revalidated_ since the request had to be sent to the origin server.

#### Uncached requests

The number of requests that are not cached and therefore, are served from the origin server. Uncached requests are the sum of all requests where **CacheCacheStatus** doesn’t equal to _hit_, _stale_, _updating_, or _ignored_.

#### Total bandwidth (Total egress bandwidth, Edge bandwidth)

The amount of data transferred from Cloudflare to end users within a certain period of time. **Total bandwidth** equals the sum of all **EdgeResponseBytes** for a certain period of time.

#### Origin bandwidth (Origin egress bandwidth)

The amount of data transferred from the origin server to Cloudflare within a certain period of time. **Origin bandwidth** is the sum of all **EdgeResponseBytes** where **OriginResponseStatus** doesn’t equal _0_.

#### Cached bandwidth (Cached egress bandwidth)

The amount of bandwidth served from Cloudflare without hitting the origin server. **Cached bandwidth** is the sum of all **EdgeResponseBytes** where **CacheCacheStatus** equals _hit_, _stale_, _updating_, _ignored_, or _revalidated_.

#### Saved bandwidth (Saved egress bandwidth)

The percentage of bandwidth saved by caching on the Cloudflare network.

#### Uncached bandwidth (Uncached egress bandwidth)

The amount of bandwidth that is not cached and therefore, is served from the origin. **Uncached bandwidth** is the sum of all **EdgeResponseBytes** where **CacheCacheStatus** doesn’t equal _hit_, _stale_, _updating_, _ignored_, or _revalidated_.

#### Static content

Website content that can be delivered to an end user directly from cache, without hitting the origin server

#### Dynamic content

Website content that has to be fetched from the origin server

#### Edge response status code

HTTP response code sent from Cloudflare to the client (end user). The Cloudflare dashboard **Analytics** app uses the edge response status code.

#### Origin response status code

HTTP response code sent from the origin server to Cloudflare

### Threat related terms

#### Threat

Any event that can potentially cause serious damage and lead to site attacks. In addition to threat analytics, you can monitor search engine crawlers visiting your websites. Cloudflare uses the IP reputation of a visitor to decide whether to present a challenge. A Cloudflare internal algorithm calculates an IP's reputation and assigns a threat score that ranges from 0 to 100.

The security levels and the challenge display criteria are:

- _High_ - for scores greater than 0
- _Medium_ - for scores greater than 14
- _Low_ - for scores greater than 24
- _Essentially off_ - for scores greater than 49

#### Total Threats Stopped

Indicates the number of suspicious and bad requests aimed at your site

#### Bad browser

This value results from the Cloudflare **Browser Integrity Check (BIC)** feature. It indicates that the source of the request was not legitimate or that the request itself was malicious. Users would see a Cloudflare error _1010_ page in their browser. Cloudflare's **Browser Integrity Check** looks for common HTTP headers used most often by spammers, and blocks access to your page. It also challenges visitors that do not have a user agent or use a non-standard user agent (commonly used by bots, crawlers, or visitors).

#### Blocked hotlink

This value results from the Cloudflare **Hotlink Protection** feature. **Hotlink Protection** ensures that other sites cannot use your bandwidth by building pages that link to images hosted on your server. Cloudflare customers can turn this feature feature on and off.

#### Bad IP

A request that came from an IP address that is not trusted by Cloudflare based on the **Threat Score**

#### Country block

Requests from countries that were blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IP block (user)

Requests from specific IP addresses that were blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IP range block (/16)

A /16 IP range that was blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IP range block (/24)

A /24 IP range that was blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IPv6 block (user)

Requests from specific IPv6 addresses that were blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IPv6 range block (/64)

A /64 IPv6 range that was blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IPv6 range block (/48)

A /48 IPv6 range that was blocked based on the user configuration set in the Cloudflare **Firewall** app

#### IPv6 range block (/32)

A /32 IPv6 range that was blocked based on the user configuration set in the Cloudflare **Firewall** app

#### Captcha Error

Requests made by a bot that failed to pass the Captcha challenge.

#### New Captcha (user)

Challenge based on user configurations set for visitor’s IP in either the **Web Application Firewall (WAF)** or the **Firewall** app

### Traffic related terms

#### NoRecord

No record was found about this request/IP to classify it somewhere else.

#### Whitelist

The request has been sent from a whitelisted IP address.

#### SearchEngine

The search engine used to send the request

#### BadHost

A bad host header or no host header was used

#### backupService

Backup service

#### monitoringService

Monitoring service

#### Tor

The request was made using a Tor browser

#### BadIP

A request coming from an IP address that is not trusted by Cloudflare based on the **Threat Score**

#### WAF Events

Events that been triggered based on **Web Applications Firewall** rules
