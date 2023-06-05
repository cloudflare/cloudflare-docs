---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000546328-Troubleshooting-Cloudflare-Rate-Limiting
title: Troubleshooting Cloudflare Rate Limiting
---

# Troubleshooting Cloudflare Rate Limiting



## Overview

A few common **Rate Limiting** configuration issues prevent proper request matches:

-   **Including HTTP or HTTPS protocol schemes in rule patterns** (such as _https://example.com/\*_). To restrict rules to match only HTTP or HTTPS traffic, use the schemes array in the request match, e.g. _"schemes": \[ "HTTPS" \]_
-   **Forgetting a trailing slash character (/)**. Cloudflare **Rate Limiting** only treats requests for the homepage (such as _example.com_ and _example.com/_) as equivalent, but not any other path (such as _example.com/path/_ and _example.com/path_)_._ To match request paths both with and without the trailing slash, use a wildcard match (such as _example.com/path\*_) 
-   **Including a query string or anchor** (such as _example.com/path?foo=bar_ or _example.com/path#section1_). A rule like _example.com/path_ will match requests for _example.com/path?foo=bar_.
-   **Overriding a rate limit with** [**IP Access Rules**](https://support.cloudflare.com/hc/articles/217074967)**.**
-   **Including a port number** (such as _example.com:8443/api/_). The rate limit product doesn't consider port numbers within rules and this affects the rules. By removing the port number from the URL, the rate limit rule will trigger as expected.

Also, there are a few common errors that prevent configuring **Rate Limiting** via the Cloudflare API:  

-   _Decoding is not yet implemented_ - Indicates that your request is missing the _Content-Type: application/json_ header. Add the header to your API request to fix the issue.
-   _Ratelimit.api.not\_entitled_ - Enterprise customers must contact their Cloudflare Account Team before adding rules.
-   Other errors are documented in the [API documentation](https://api.cloudflare.com/#rate-limits-for-a-zone-errors). If you're unsure about a particular error, [contact Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) and provide the failed API request after redacting your API key.

{{<Aside type="note">}}
The **origin\_traffic** parameter can only be set on Enterprise plans.
Setting **origin\_traffic** = *false* for a rule on a Free, Pro, or
Enterprise domain is automatically converted into **origin\_traffic** =
*true*.
{{</Aside>}}
___

## Limitations

Rate Limiting is designed to limit surges in traffic that exceed a user-defined rate. The system is not designed to allow a precise number of requests to reach the origin server. There might be cases where a delay is introduced between detecting the request and updating the internal counter. Because of this delay (which can be up to a few seconds), excess requests could still reach the origin before an action is enforced at the edge (such as blocking or challenging).

___

## Related resources

-   [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
