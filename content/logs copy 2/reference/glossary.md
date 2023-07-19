---
pcx_content_type: glossary
title: Glossary
weight: 132
---

# Glossary

## Categories of terms

### Requests

#### Request

A request is a message that is sent between a client, or web browser, to a server. Each request that has been processed through the Cloudflare network generates a record.

#### Origin requests

An origin request is a type of request that is served from the origin server. The origin server is the server that contains the original version of your website.

#### Cached requests

Cached requests are requests served from Cloudflare without having to hit the origin server. Cached requests are the sum of all requests where `CacheCacheStatus` equals `hit`, `stale`, `updating`, `ignored`. This does not include `revalidated` since the request had to be sent to the origin server.

#### Uncached requests

Uncached requests are requests that are not cached and therefore, are served from the origin server. Uncached requests are the sum of all requests where `CacheCacheStatus` does not equal to `hit`, `stale`, `updating`, or `ignored`.

### Bandwidth

#### Total bandwidth (Total egress bandwidth, Edge bandwidth)

Total bandwidth is the amount of data transferred from Cloudflare to end users within a certain period of time. Total bandwidth equals the sum of all `EdgeResponseBytes` for a certain period of time.

#### Origin bandwidth (Origin egress bandwidth)

Origin bandwidth is the amount of data transferred from the origin server to Cloudflare within a certain period of time. Origin bandwidth is the sum of all `EdgeResponseBytes` where `OriginResponseStatus` does not equal `0`.

#### Cached bandwidth (Cached egress bandwidth)

Cached bandwidth is the amount of bandwidth served from Cloudflare without hitting the origin server. Cached bandwidth is the sum of all `EdgeResponseBytes` where `CacheCacheStatus` equals `hit`, `stale`, `updating`, `ignored`, or `revalidated`.

#### Saved bandwidth (Saved egress bandwidth)

Saved bandwidth is the percentage of bandwidth saved by caching on the Cloudflare network.

#### Uncached bandwidth (Uncached egress bandwidth)

Uncached bandwidth is the amount of bandwidth that is not cached and therefore, is served from the origin. Uncached bandwidth is the sum of all `EdgeResponseBytes` where `CacheCacheStatus` does not equal `hit`, `stale`, `updating`, `ignored`, or `revalidated`.

### Website content

#### Static content

Static content is any file that is stored in a server and is the same every time it is delivered to users. HTML files and images are examples of this kind of content. This type of website content can be delivered directly from cache, without hitting the origin server.

#### Dynamic content

Dynamic content is content that changes based on factors specific to the user such as time of visit, location, and device. News websites or social media are examples of this type of content. For this type of website, content has to be fetched from the origin server every time it is requested.

### HTTP Response codes

#### Edge response status code

Edge response status code is an HTTP response code sent from Cloudflare to the client (end user). Edge response status code is one of the filters that you can use to drill down and examine your data at a granular level in the Cloudflare dashboard Analytics app.

#### Origin response status code

Origin response status code is an HTTP response code sent from the origin server to Cloudflare. Origin response status code is one of the filters that you can use to drill down and examine your data at a granular level in the Cloudflare dashboard Analytics app.

### DNS

#### EDNS Client Subnet (ECS)

EDNS Client Subnet (ECS) is an extension forwarded by recursive resolvers and contains information about the network that the DNS query is originating from. Not all resolvers choose to forward ECS, but if they do, usually a part of the IP address is omitted. The subnet length indicates the size of the client subnet in bits that is forwarded. So if the last octet of an IPv4 address is omitted (for example, 192.0.2.x.), the subnet length will be 24.

### Threats

#### Threat score

A threat is any event that can potentially cause serious damage and lead to site attacks. In the Cloudflare dashboard, in addition to visualizing threat analytics, you can monitor search engine crawlers visiting your websites. Cloudflare uses the IP reputation of a visitor to decide whether to present a challenge. A Cloudflare internal algorithm calculates an IP’s reputation and assigns a threat score that ranges from 0 to 100.

The security levels and the challenge display criteria are:

- **High** - for scores greater than 0
- **Medium** - for scores greater than 14
- **Low** - for scores greater than 24
- **Essentially off** - for scores greater than 49

#### Total Threats Stopped

Total threats stopped indicates the number of suspicious and bad requests aimed at your site.

#### Bad browser score

The bad browser score indicates that the source of the request was not legitimate or that the request itself was malicious. This value results from the [Cloudflare Browser Integrity Check (BIC)](/fundamentals/security/browser-integrity-check/) feature. Users would see a Cloudflare error `1010` page in their browser. Cloudflare’s Browser Integrity Check looks for common HTTP headers used most often by spammers, and blocks access to your page. It also challenges visitors that do not have a user agent or use a non-standard user agent (commonly used by bots, crawlers, or visitors).

#### Blocked hotlink score

The Blocked hotlink value results from the [Cloudflare Hotlink Protection](/support/more-dashboard-apps/cloudflare-scrape-shield/understanding-cloudflare-hotlink-protection/) feature. Hotlink Protection ensures that other sites cannot use your bandwidth by building pages that link to images hosted on your server. Cloudflare customers can turn this feature on and off.

#### Bad IP

A Bad IP is the classification for a request that came from an IP address that is not trusted by Cloudflare based on the [Threat Score](/logs/reference/glossary/#threat-score).

#### Country block

Country block is the classification for a request from countries that were blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IP block (user)

​​IP block (user) is the classification for a request from a specific IP address that was blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IP range block (/16)

A /16 IP range that was blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IP range block (/24)

A /24 IP range that was blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IPv6 block (user)

Requests from specific IPv6 addresses that were blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IPv6 range block (/64)

A /64 IPv6 range that was blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IPv6 range block (/48)

A /48 IPv6 range that was blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### IPv6 range block (/32)

A /32 IPv6 range that was blocked based on the user configuration set in [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

#### Captcha Error

​​Captcha Error is the classification for a request made by a bot that failed to pass the Captcha challenge.

#### New Captcha (user)

​​New Captcha (user) is a challenge based on user configurations set for visitor’s IP in either the [Web Application Firewall (WAF)](/waf/) or [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/).

### Traffic

#### NoRecord

​​The value `NoRecord` indicates that no record was found about a request/IP, so it cannot be classified.

#### AllowList

The value `AllowList` indicates that the request was sent from an allowlisted IP address.

#### SearchEngine

The value `SearchEngine` indicates the search engine used to send the request.

#### BadHost

The value `BadHost` indicates that a bad host header or no host header was used in the request.

#### Tor

The value `Tor` indicates that the request was made using a Tor browser.

#### WAF Events

WAF Events are events that have been triggered based on [Web Applications Firewall rules](/waf/).