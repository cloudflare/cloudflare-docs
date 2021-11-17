---
pcx-content-type: concept
---

# Cloudflare Cookies

Cloudflare uses various cookies to maximize network resources, manage traffic, and protect our customers’ sites from malicious traffic.

## Understanding the Cloudflare Cookies

As defined in our [Privacy Policy](https://www.cloudflare.com/privacypolicy/), the `\__cflb`, `\__cf_bm`, `\__cf_ob_info` and `\__cf_use_ob`, and `\__cfwaitingroom` cookies are strictly necessary to provide the services requested by our customers.

As mentioned in our Privacy Policy, Cloudflare encourages our customers to disclose the use of these cookies to their end users and, in some jurisdictions, customers may be required by law to disclose these cookies to their end users.

Cookie data is processed in Cloudflare's data centers in the United States and is subject to the cross-border data transfer section 7 of the Cloudflare [Privacy Policy](https://www.cloudflare.com/privacypolicy/).

### \*__cflb* cookie for Cloudflare Load Balancer session affinity

When enabling session affinity with [Cloudflare Load Balancer](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity), Cloudflare sets a `\__cflb` cookie with a unique value on the first response to the requesting client. Cloudflare routes future requests to the same origin, optimizing network resource usage. In the event of a failover, Cloudflare sets a new `\__cflb` cookie to direct future requests to the failover pool.

The `\__cflb` cookie allows Cloudflare to return an end user to the same customer origin for a specific period of time configured by the customer. This allows the end user to have a seamless experience (for example, this cookie is used for keeping an end user’s items in a shopping cart while they continue to navigate around the website). This cookie is a session cookie that lasts from several seconds up to 24 hours.

<Aside type="note">

Currently Cloudflare only supports Session Affinity in "orange-cloud" (proxied) mode.

</Aside>

### \*__cf_bm* cookie for Cloudflare bot products

Cloudflare's [bot products](https://developers.cloudflare.com/bots/) identify and mitigate automated traffic to protect your site from bad bots. Cloudflare places the `\__cf_bm` cookie on end-user devices that access customer sites protected by Bot Management or Bot Fight Mode. The `\__cf_bm` cookie is necessary for these bot solutions to function properly.

This cookie expires after 30 minutes of continuous inactivity by the end user. The cookie contains information related to the calculation of Cloudflare’s proprietary bot score and, when Anomaly Detection is enabled on Bot Management, a session identifier. The information in the cookie (other than time-related information) is encrypted and can only be decrypted by Cloudflare.

A separate `\__cf_bm` cookie is generated for each site that an end user visits, as Cloudflare does not track users from site to site or from session to session. The `\__cf_bm` cookie is generated independently by Cloudflare, and does not correspond to any user ID or other identifiers in a customer’s web application.

<Aside type="note">

Bot Management is available to Enterprise customers as an add-on service. Contact your Cloudflare account team to enable Bot Management for your site. Non-Enterprise customers can enable [Bot Fight Mode or Super Bot Fight Mode](https://developers.cloudflare.com/bots/).

</Aside>

### \*\__cf_ob_info\* and \*\__cf_use_ob* cookie for Cloudflare Always Online

The `\__cf_ob_info` cookie provides information on:

- The HTTP Status Code returned by the origin web server
- The Ray ID of the original failed request
- The data center serving the traffic

The `\__cf_use_ob` cookie informs Cloudflare to fetch the requested resource from the Always Online cache on the designated port. Applicable values are: 0, 80, and 443.

### \*__cfwaitingroom* for Cloudflare Waiting Rooms

[Cloudflare’s Waiting Room](https://developers.cloudflare.com/waiting-room/) product enables a waiting room for a particular host and path combination within a zone. Visitors are put in the waiting room and provided an estimate of when they will be allowed to access the application, if not immediately available.

The `\_cfwaitingroom` cookie is only used to track visitors that access a Waiting Room enabled host and path combination for a zone. Visitors using a browser that does not accept cookies cannot visit the host and path combination while the Waiting Room is active. For more details, see [Waiting Room cookie](https://developers.cloudflare.com/waiting-room/reference/waiting-room-cookie).

### Additional cookies used by the Challenge Platform

The table below shows additional cookies used by the Challenge Platform.

| Cookie Name (XXX represents dynamic part)      | Description |
| ----------- | ----------- |
| `cf_clearance`      | 	Clearance Cookie stores the proof of challenge passed. It is used to no longer issue a captcha or jschallenge challenge if present. It is required to reach origin server.       |
| `cf-cc-XXX`; `cf-chl-cc-XXX`; `cf-chl-seq-XXX`; `cf-chl-prog`   | These cookies are used by Cloudflare for the execution of Javascript or Captcha challenges. They are not used for tracking or beyond the scope of the challenge. They can be deleted if seen.        |
| `cf-chl-XXXX`      | This cookie is used to check whether the [Cloudflare Edge server](https://www.cloudflare.com/en-gb/learning/cdn/glossary/edge-server/) supports cookies. It can be deleted if seen.       |
| `cf-chl-rc-i`; `cf-chl-rc-ni`   | These cookies are for internal use which allows Cloudflare to identify production issues on clients.        |

## Related resources

- [Understanding SameSite cookie interaction with Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360038470312)