---
pcx-content-type: how-to
title: Clientless Web Isolation
weight: 5
---

# Clientless Web Isolation

Clientless Web Isolation enables users to securely navigate high risk or sensitive websites in a remote browser without transmitting or executing any untrusted website code or sensitive data to the endpoint device.

## UI Setup

1. Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/).
2. Navigate to **Settings** > **Browser Isolation**.
3. Enable **Clientless Web Isolation**.
4. Configure permissions.
5. Navigate to `<authdomain>.cloudflareaccess.com/browser`, complete the login and start using Browser Isolation.

### Optional configurations

{{<Aside type="note">}}

Clientless Web Isolation does not require the Cloudflare Root CA to be configured on the endpoint device.

{{</Aside>}}

* You can configure Zero Trust to [allow / block websites within the remote browser](/cloudflare-one/policies/filtering/http-policies/).

* You can configure [remote browser controls](/cloudflare-one/policies/browser-isolation/#settings) such as disabling copy/paste, printing, or keyboard input.


## API setup

Clientless Web Isolation is implemented through a prefixed URL.

```txt
https://{{authdomain}}.cloudflareaccess.com/browser/{{url}}
```
### Parameters

* `authdomain` — Your organization's Cloudflare Zero Trust team domain.
* `URL (optional)` — Target URL to open in a remote browser. This parameter is optional — when not provided, users are presented with a Cloudflare Zero Trust landing page to input a URL or search for a website. 

## Logs

* **Authentication events.** User login events are available in Access Audit Logs.
* **HTTP request logs.** Traffic from the remote browser to the Internet is logged in Gateway request logs.

## Examples

* **Integrating with a third-party Secure Web Gateway.** Clientless Web Isolation can be integrated with a secure web gateway by implementing a custom block page.

    ```html
    <!doctype html>
    <html>
    <head>
    <title>Redirecting website to a remote browser</title>
    <script>
        window.location.href = 'https://<authdomain>.cloudflareaccess.com/browser/{{URL}}';
    </script>
    <noscript>
        <meta http-equiv="refresh" content="0; url=https://<authdomain>.cloudflareaccess.com/browser/{{URL}}" />
    </noscript>
    </head>
    <body>
    <p>This website is being redirected to a remote browser. Click <a href="https://<authdomain>.cloudflareaccess.com/browser/{{URL}}">here</a> if you are not automatically redirected.</p>
    </body>
    </html>
    ```
