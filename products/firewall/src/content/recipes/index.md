---
title: Common use cases
weight: 350
---


### WordPress: Use IP restrictions to limit access to /wp-admin/
The administrative area of a web application is very sensitive, and if compromised, the consequences can be devastating. WordPress is no exception. One effective measure is to limit access to `/wp-admin/` so that only requests originating from a set of known IP addresses can access the administrative area.

This example also uses the `lower()` function to transform the URI path segment to lowercase so that attackers cannot bypass the rule with a permutation such as `/wP-AdMiN/`.

Since our expression targets the requests we want to allow, we use the _Allow_ action.

<table>
  <tr>
   <td><strong>Expression</strong>
   </td>
   <td><strong>Action</strong>
   </td>
  </tr>
  <tbody>
  <tr>
   <td valign="top">not (ip.src in {'{10.20.30.40 192.168.1.0/24}'} and lower(http.request.uri.path contains "/wp-admin")
   </td>
   <td><code>Allow</code>
   </td>
  </tr>
  </tbody>
</table>


-----


### Limit access to only those users with a specific cookie
Cookies are a great tool for securing a sensitive area, such as a development environment, since you can share a cookie with trusted individuals and then filter requests so that only users that have the cookie are allowed access.

The example below uses two rules. In the first, we look for a specific cookie key, `devaccess`, with individual values for three authorized users: _james_, _matt_, and _michael_. We specify our host and set the action to _Allow_. The second rule blocks all access to our development domain. Since the _Allow_ action has precedence over _Block_, requests that satisfy Rule 1 will be granted access; all other requests will be denied.
<table>
  <tr>
   <td><strong>Execution Order</strong></td>
   <td><strong>Expression</strong></td>
   <td><strong>Action</strong></td>
  </tr>
  <tbody>
  <tr>
   <td>1</td>
   <td valign="top">
    <code>
    (http.cookie contains "devaccess=james" or http.cookie contains "devaccess=matt" or http.cookie contains "devaccess=michael") and host eq dev.www.foo.com
    </code>
   </td>
   <td><code>Allow</code></td>
  </tr>
  <tr>
   <td>2</td>
   <td valign="top">
    <code>
    http.host eq dev.www.foo.com
    </code>
   </td>
   <td><code>Block</code></td>
  </tr>
  </tbody>
</table>


-----


### Block requests based on IP reputation
A powerful feature of Firewall Rules is its support for Cloudflare’s IP reputation score via the `cf.threat_score` field, which contains a score from 0 to 100. This example will block any request associated with an IP address that has a score greater than 0. This is equivalent to setting the Security Level in the Firewall app **Settings** panel to _High_.

This example also filters requests that originate from China, Taiwan, the United States, or the United Kingdom, based on country code ([ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format).

<table>
  <tr>
   <td><strong>Expression</strong></td>
   <td><strong>Action</strong></td>
  </tr>
  <tbody>
  <tr>
   <td valign="top">(ip.geoip.country in {'{"CN" "TW" "US" "GB"}'}) or cf.threat_score > 0</td>
   <td>Block</td>
  </tr>
  </tbody>
</table>




-----


### Expand hotlink protection with Firewall Rules
Cloudflare provides Hotlink Protection as a standard feature; however, the feature is a bit of a blunt instrument. When enabled, Hotlink Protection will block all HTTP referrers that are not part of your domain or zone. You can extend that capability with Firewall Rules to allow partner websites to link directly to website assets.

This example uses the logical `not` operator to allow referrals from partners while blocking all other referrers’ requests. If you use this technique, it is important to disable Hotlink Protection within the Scrape Shield app so that partner referrals are not blocked by the feature.

<table>
  <tr>
   <td><strong>Expression</strong></td>
   <td><strong>Action</strong></td>
  </tr>
  <tbody>
  <tr>
   <td valign="top">
    <code>
    not (http.referer contains "foo.com" or http.referer eq www.bar.com" or http.referer eq "www.cloudflare.com")
    </code>
   </td>
   <td><code>Block</code></td>
  </tr>
  </tbody>
</table>


-----


### Block Microsoft Exchange autodiscover requests

In some cases, autodiscover requests can be “noisy,” needlessly triggering large numbers of 404 errors. In this example we use the `matches` comparison operator and a regular expression to block requests that target autodiscover.xml and autodiscover.src.

<table>
  <tr>
   <td><strong>Expression</strong>
   </td>
   <td><strong>Action</strong>
   </td>
  </tr>
  <tbody>
  <tr>
   <td>
    <code>
    http.request.uri.path matches "/autodiscover\.(xml|src)$"
    </code>
   </td>
   <td><code>Block</code>
   </td>
  </tr>
  </tbody>
</table>


-----


### Only accept requests over ports 80 and 443
By default, Cloudflare allows requests over a number of different ports. Firewall Rules allows you to restrict which ports have access to your application.

In this example, requests that do not come over ports 80 or 443 will be blocked, and Cloudflare will return a 403 error. For a list of ports that Cloudflare allows by default, see _[Identifying network ports compatible with Cloudflare's proxy](https://support.cloudflare.com/hc/en-us/articles/200169156-Identifying-network-ports-compatible-with-Cloudflare-s-proxy)_ on the Cloudflare support site.

<table>
  <tr>
   <td><strong>Expression</strong></td>
   <td><strong>Action</strong></td>
  </tr>
  <tbody>
  <tr>
   <td valign="top">
    <code>
    host eq www.foo.com and not cf.edge.server_port in {'{80 443}'}
    </code>
   </td>
   <td><code>Block</code></td>
  </tr>
  </tbody>
</table>


-----


### Block requests missing a specific header
There are cases where customers wish to take action based on the lack of a specific header in the HTTP request. This example leverages case insensitive logic to look for the presence of the X-CSRF-Token header and block the request if it is missing.

<table>
  <tr>
   <td><strong>Expression</strong></td>
   <td><strong>Action</strong></td>
  </tr>
  <tbody>
  <tr>
  <td valign="top">
    <code>
    not any(lower(http.request.headers.names[*])[*] contains "x-csrf-token") and (http.request.full_uri eq "https://www.example.com/somepath")
    </code>
  </td>
   <td valign="top"><code>Block</code></td>
  </tr>
  </tbody>
</table>


-----

### Challenge bad bots
Customers with Enterprise plans have access to our Bot Management feature, which scores the likelihood a request originated from a bot. Scores range from 1 to 99. Low scores indicate the request came from a script, API service, or an automated agent. High scores indicate that the request came from a human using a standard desktop or mobile web browser.

This example uses the `cf.bot_management.score `field to target requests likely to have been automated. The rule will issue a CAPTCHA challenge to any request for access to _/login_ that scores below 30 and is not on the list of known good bots.

<table>
  <tr>
   <td><strong>Expression</strong></td>
   <td><strong>Action</strong></td>
  </tr>
  <tbody>
  <tr>
   <td valign="top">
<code>
(cf.bot_management.score lt 30) and (http.request.uri.path eq "/login" ) and not (cf.bot_management.verified_bot)
</code>
   </td>
   <td valign="top"><code>Challenge</code>
   </td>
  </tr>
  </tbody>
</table>


-----

### Stop spam and R.U.D.Y attacks ###
Imagine that you run an online forum and you want to ensure that the form that creates comments only receives requests that have a valid authenticated session cookie.

This recipe shows how you can stop spam and protect against *R-U-Deat-Yet* (R.U.D.Y.) attacks with one single rule.

To accomplish this, you can use a regular expression to specify which URIs an attacker might target. Then, you can ensure that a legitimate authenticated session cookie is being passed in the `http.cookie` field.

This recipe uses a compound expression (described below) and the *block* [action](/firewall/cf-firewall-rules/actions) to mitigate this type of attack on a `POST` request.

#### Expression
You can design a compound expression as described below. It is assumed that you have previously defined a format for the `auth_session` cookie that you can validate internally.

The expression is as follows:

**Match against a specific URI**

```
http.request.uri.path matches "(comment|conversation|event|poll)/create"
```

**And**

**Verify the format of the auth_section cookie**

```
not http.cookie matches "auth_session=[0-9a-zA-Z]{'{32}'}-[0-9]{'{10}'}-[0-9a-z]{'{6}'}"
```

In the expression above, we're using a pre-defined authenticated session format to validate internally. Once you have defined a proprietary authenticated session format for your web application, use a regular expression to verify the correct pattern.

**And**

**Ensure the request is sent via a POST call**

```
http.request.method eq "POST"
```

You can create a similar rule using the [Firewall app in the Cloudflare dashboard](/firewall/cf-dashboard) or via the [Firewall Rules API](/firewall/api/cf-firewall-rules).

Finally, you might wish to consider a similar approach when you want to protect expensive resources such as search pages, inventory pages, and login forms from being exploited in an effort to exhaust your origin web server. The idea is to take advantage of Firewall Rules to discard undesired traffic as early as possible before it reaches your origin.
