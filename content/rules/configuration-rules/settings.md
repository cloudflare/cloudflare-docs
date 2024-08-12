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

[Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) prevents end users from seeing `Mixed content` errors by rewriting URLs from `http` to `https` for resources or links on your website that can be served with HTTPS.

Use this setting to turn on or off Automatic HTTPS Rewrites for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Browser Integrity Check

[Browser Integrity Check](/waf/tools/browser-integrity-check/) blocks access to pages based on specific HTTP headers commonly abused by spammers.

Use this setting to turn on or off Browser Integrity Check for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Disable Apps

[Cloudflare Apps](/support/more-dashboard-apps/cloudflare-apps/), now deprecated, is a platform for sharing high-quality apps that anyone with a website can use.

Use this setting to turn off all active Cloudflare Apps for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Disable Real User Monitoring (RUM)

[Cloudflare Web Analytics](/web-analytics/), also known as Real User Monitoring (RUM), is Cloudflare's free, privacy-first analytics for your website.

Use this setting to turn off Web Analytics for matching requests.

{{<render file="_configuration-rule-wins-over-rum-rule.md" withParameters="Configuration rules;;[Web Analytics rules](/web-analytics/configuration-options/rules/)">}}

{{<details header="API information">}}

API configuration property name: `"disable_rum"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "disable_rum": true
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

{{</details>}}

## Disable Zaraz

[Cloudflare Zaraz](/zaraz/) gives you complete control over third-party tools and services for your website, and allows you to offload them to the Cloudflare global network.

Use this setting to turn off Zaraz for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Hotlink Protection

[Hotlink Protection](/waf/tools/scrape-shield/hotlink-protection/) prevents your images from being used by other sites, potentially reducing the bandwidth consumed by your origin server.

Use this setting to turn on or off Hotlink Protection for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Email Obfuscation

[Email Obfuscation](/waf/tools/scrape-shield/email-address-obfuscation/) helps in spam prevention by hiding email addresses appearing in your pages from email harvesters and other bots, while remaining visible to your site visitors.

Use this setting to turn on or off Email Obfuscation for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Fonts

[Cloudflare Fonts](/speed/optimization/content/fonts/) rewrites Google Fonts to be delivered from a website's own origin, eliminating the need to rely on third-party font providers.

Use this setting to turn on or off Cloudflare Fonts for matching requests.

{{<details header="API information">}}

API configuration property name: `"fonts"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "fonts": false
}
```

{{<render file="_configuration-rule-link-to-examples.md">}}

{{</details>}}

## Mirage

[Mirage](/speed/optimization/images/mirage/) accelerates image delivery for your visitors based on their device.

Use this setting to turn on or off Mirage for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Opportunistic Encryption

[Opportunistic Encryption](/ssl/edge-certificates/additional-options/opportunistic-encryption/) allows browsers to access HTTP URIs over an encrypted TLS channel.

Use this setting to turn on or off Opportunistic Encryption for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Polish

[Cloudflare Polish](/images/polish/) is a one-click image optimization product that automatically optimizes images in your site.

Use this setting to configure Polish for matching requests:
- Off
- Lossless
- Lossy

Refer to [Compression options](/images/polish/compression/#compression-options) for more information on these values.

{{<details header="API information">}}

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

{{</details>}}

## Rocket Loader

[Rocket Loader](/speed/optimization/content/rocket-loader/) prioritizes your website's content (such as text, images, and fonts) by deferring the loading of all your JavaScript code until after rendering.

Use this setting to turn on or off Rocket Loader for matching requests.

{{<details header="API information">}}

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

{{</details>}}

## Security Level

[Security Level](/waf/tools/security-level/) controls Managed Challenges for requests from low reputation IP addresses.

Use this setting to select the security level for matching requests:

- Off
- Essentially Off
- Low
- Medium
- High
- I'm Under Attack

Refer to [Security levels](/waf/tools/security-level/#security-levels) for more information on these values.

{{<details header="API information">}}

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

{{</details>}}

## SSL

[SSL/TLS encryption modes](/ssl/origin-configuration/ssl-modes/) control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin web server and how SSL certificates presented by your origin will be validated.

Use this setting to configure the SSL/TLS encryption mode for matching requests:

- Off
- Flexible
- Full
- Strict
- Origin Pull

Refer to [Available encryption modes](/ssl/origin-configuration/ssl-modes/#available-encryption-modes) for more information on these values.

{{<details header="API information">}}

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

{{</details>}}

## SXG

[Signed Exchanges (SXG)](/speed/optimization/other/signed-exchanges/) is an open standard that makes it possible to cryptographically authenticate the origin of a resource independently of how it is delivered.

Use this setting to turn on or off signed exchanges for matching requests.

{{<details header="API information">}}

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

{{</details>}}
