---
title: Available settings
pcx_content_type: reference
weight: 6
meta:
  title: Configuration Rules settings
---

# Configuration Rules settings

You can change the configuration settings described below in a configuration rule.

## Automatic HTTPS Rewrites

Enable or disable [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) [^1] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"automatic_https_rewrites"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "automatic_https_rewrites": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Auto Minify

Select which file extensions to minify automatically using [Auto Minify](/speed/optimization/content/auto-minify/) [^2].

<details>
<summary>API information</summary>
<div>

API configuration object name: `"autominify"` (object).

```json
---
header: API configuration example
---
"action_parameters": {
  "autominify": {
    "html": true,
    "css": true,
    "js": false
  }
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Browser Integrity Check

Enable or disable [Browser Integrity Check](/fundamentals/security/browser-integrity-check/) [^3] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"bic"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "bic": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Disable Apps

Disable all active [Cloudflare Apps](https://www.cloudflare.com/apps/developer/docs/getting-started) [^4] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"disable_apps"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "disable_apps": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

{{<Aside type="warning">}}
This setting will not disable [Apps with Workers](https://cloudflareapps.com/apps/developer/docs/workers). These apps request permission to add a Worker when you are installing them.
{{</Aside>}}

## Disable Railgun (deprecated)

Disable [Cloudflare Railgun](/railgun/) [^5] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"disable_railgun"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "disable_railgun": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Disable Zaraz

Disable [Cloudflare Zaraz](/zaraz/) [^6] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"disable_zaraz"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "disable_zaraz": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Hotlink Protection

Enable or disable [Hotlink Protection](/support/more-dashboard-apps/cloudflare-scrape-shield/understanding-cloudflare-hotlink-protection/) [^7] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"hotlink_protection"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
    "hotlink_protection": false
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Email Obfuscation

Enable or disable [Email Obfuscation](https://support.cloudflare.com/hc/articles/200170016) [^8] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"email_obfuscation"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "email_obfuscation": false
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Mirage

Enable or disable [Mirage](/speed/optimization/images/mirage/) [^9] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"mirage"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "mirage": false
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Opportunistic Encryption

Enable or disable [Opportunistic Encryption](/ssl/edge-certificates/additional-options/opportunistic-encryption/) [^10] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"opportunistic_encryption"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "opportunistic_encryption": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Polish

Set [Polish](/images/polish/) [^11] compression options for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"polish"` (string).

API values: `"off"`, `"lossless"`, `"lossy"`.

```json
---
header: API configuration example
---
"action_parameters": {
  "polish": "lossless"
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Rocket Loader

Enable or disable [Rocket Loader](/speed/optimization/content/rocket-loader/) [^12] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"rocket_loader"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "rocket_loader": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Security Level

Select the [Security Level](/fundamentals/security/security-level/) [^13] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"security_level"` (string).

API values: `"off"`, `"essentially_off"`, `"low"`, `"medium"`, `"high"`, `"under_attack"`.

```json
---
header: API configuration example
---
"action_parameters": {
  "security_level": "low"
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## Server Side Excludes

Enable or disable [Server Side Excludes](https://support.cloudflare.com/hc/articles/200170036) [^14] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"server_side_excludes"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "server_side_excludes": false
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## SSL

Select the [SSL/TLS encryption mode](/ssl/origin-configuration/ssl-modes/) [^15] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"ssl"` (string).

API values: `"off"`, `"flexible"`, `"full"`, `"strict"`, `"origin_pull"`.

```json
---
header: API configuration example
---
"action_parameters": {
  "ssl": "flexible"
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

## SXG

Enable or disable [Signed Exchanges (SXG)](/speed/optimization/other/signed-exchanges/) [^16] for matching requests.

<details>
<summary>API information</summary>
<div>

API configuration property name: `"sxg"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "sxg": false
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

</div>
</details>

[^1]: Automatic HTTPS Rewrites prevents end users from seeing “mixed content” errors by rewriting URLs from `http` to `https` for resources or links on your website that can be served with HTTPS.

[^2]: Auto Minify can remove all unnecessary characters from HTML, JavaScript, and CSS files.

[^3]: Browser Integrity Check blocks access to pages based on specific HTTP headers commonly abused by spammers.

[^4]: Cloudflare Apps is a platform for sharing high-quality apps that anyone with a website can use.

[^5]: Railgun (deprecated) is a WAN optimization technology that compresses previously unreachable web objects using techniques similar to those used in high-quality video compression.

[^6]: Zaraz gives you complete control over third-party tools and services for your website, and allows you to offload them to the Cloudflare global network.

[^7]: Hotlink Protection prevents your images from being used by other sites, potentially reducing the bandwidth consumed by your origin server.

[^8]: Email Obfuscation helps in spam prevention by hiding email addresses appearing in your pages from email harvesters and other bots, while remaining visible to your site visitors.

[^9]: Mirage accelerates image delivery for your visitors based on their device.

[^10]: Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel.

[^11]: Cloudflare Polish is a one-click image optimization product that automatically optimizes images in your site.

[^12]: Rocket Loader prioritizes your website's content (such as text, images, and fonts) by deferring the loading of all your JavaScript code until after rendering.

[^13]: The Security Level controls Managed Challenges for requests from low reputation IP addresses.

[^14]: Server Side Excludes allow you to provide specific pieces of content to real website visitors while hiding that content from suspicious visitors.

[^15]: Encryption modes control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin web server and how SSL certificates presented by your origin will be validated.

[^16]: Signed exchanges (SXG) is an open standard that makes it possible to cryptographically authenticate the origin of a resource independently of how it is delivered.
