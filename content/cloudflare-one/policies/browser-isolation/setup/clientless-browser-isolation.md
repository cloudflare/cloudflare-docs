---
pcx_content_type: concept
title: Clientless Web Isolation
weight: 5
---

# Clientless Web Isolation

Clientless Web Isolation allows users to securely browse high risk or sensitive websites in a remote browser without having to install the Cloudflare WARP client on their device.

## Set up Clientless Web Isolation

{{<render file="/_clientless-browser-isolation.md">}} 3. To configure permissions, select **Manage**. You can add authentication methods and [rules](/cloudflare-one/policies/access/) to control who can access the remote browser.

## Use the remote browser

Clientless Web Isolation is implemented through a prefixed URL, where `<your-team-name>` is your organization's [team name](/cloudflare-one/glossary/#team-name).

```txt
https://<your-team-name>.cloudflareaccess.com/browser/<URL>
```

For example, to isolate `www.example.com`, users would visit `https://<your-team-name>.cloudflareaccess.com/browser/https://www.example.com/` in their preferred browser.

If `<url>` is not provided, users are presented with a Cloudflare Zero Trust landing page where they can input a target URL or search for a website.

## Optional configurations

### Allow or block websites

When users visit a website through the [Clientless Web Isolation URL](#use-the-remote-browser), the traffic passes through Cloudflare Gateway. This allows you to [apply HTTP policies](/cloudflare-one/policies/gateway/http-policies/) to control what websites the remote browser can connect to, even if the user's device does not have WARP installed.

For example, if you use a third-party Secure Web Gateway to block `example.com`, users can still access the page in the remote browser by visiting `https://<your-team-name>.cloudflareaccess.com/browser/https://www.example.com/`. To block `https://<your-team-name>.cloudflareaccess.com/browser/https://www.example.com/`, simply create a Cloudflare Gateway HTTP policy to block `example.com`:

| Selector | Operator | Value         | Action |
| -------- | -------- | ------------- | ------ |
| Domain   | in       | `example.com` | Block  |

### Bypass TLS decryption

If [TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) is turned on, Gateway will decrypt all sites accessed through the Clientless Web Isolation URL. To connect to sites that are incompatible with TLS decryption, you will need to add a Do Not Inspect HTTP policy for the application or domain.

| Selector | Operator | Value        | Action         |
| -------- | -------- | ------------ | -------------- |
| Domain   | is       | `mysite.com` | Do Not Inspect |

### Connect private networks

With Clientless Web Isolation, users can reach any private IP resource you have connected through [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/). To connect a private network to Cloudflare, refer to our [Tunnel guide](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/).

For example, if you added `192.0.2.1` to your tunnel, users can connect to your application through the remote browser by going to `https://<your-team-name>.cloudflareaccess.com/browser/http://192.0.2.1`.

{{<Aside type="note">}}
All users with access to your remote browser can access your Cloudflare Tunnel applications unless you create a Gateway HTTP policy to block them.
{{</Aside>}}

### Disable remote browser controls

You can configure [remote browser controls](/cloudflare-one/policies/browser-isolation/isolation-policies/#policy-settings) such as disabling copy/paste, printing, or keyboard input. These settings display in the Gateway [HTTP policy builder](/cloudflare-one/policies/gateway/http-policies/) when you select the Isolate action.

## Address bar

Clientless Web Isolation has an embedded address bar. This feature is designed to improve the user's experience while visiting isolated pages with prefixed URLs.

The clientless address bar has three views: hostname notch, full address bar and hidden. The user's selected view is remembered across domains and remote browsing sessions.

### Hostname notch view

By default the isolated domain name appears in the notch positioned at the top and center of an isolated page.

![Viewing hostname of an isolated page in the clientless remote browser](/images/cloudflare-one/policies/rbi-address-bar-notch.png)

Selecting **Expand** or the hostname text will expand the notch to the full address bar view. If isolated page content is obscured by the notch, expanding to the full address bar view will make the content accessible.

### Full address bar view

The full address bar allows users to search and go to isolated websites. Users can jump to the address bar at any time by pressing <kbd>CTRL</kbd> + <kbd>L</kbd> on the keyboard.

![Viewing full address of an isolated page in the clientless remote browser](/images/cloudflare-one/policies/rbi-address-bar-full.png)

### Hidden view

To turn on or off the address bar, users can right-click on any isolated page and select **Show / Hide address bar**.

## Logs

- **Authentication events** — User login events are available in Access Audit Logs.
- **HTTP request logs** — Traffic from the remote browser to the Internet is logged in Gateway request logs.

## Redirect traffic to the remote browser

If you want to isolate a website without Cloudflare WARP installed, you will need to redirect traffic to the Clientless Web Isolation [prefixed URL](#use-the-remote-browser). One way to do this is through a third-party Secure Web Gateway. To redirect users to the remote browser, you can implement a custom block page similar to the example shown below.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redirecting website to a remote browser</title>
    <script>
      window.location.href =
        "https://<your-team-name>.cloudflareaccess.com/browser/<URL>}";
    </script>
    <noscript>
      <meta
        http-equiv="refresh"
        content="0; url=https://<your-team-name>.cloudflareaccess.com/browser/<URL>"
      />
    </noscript>
  </head>
  <body>
    <p>
      This website is being redirected to a remote browser. Select
      <a href="https://<your-team-name>.cloudflareaccess.com/browser/<URL>"
        >here</a
      >
      if you are not automatically redirected.
    </p>
  </body>
</html>
```
