---
pcx-content-type: concept
title: Clientless Web Isolation
weight: 5
---

# Clientless Web Isolation

Clientless Web Isolation allows users to securely navigate high risk or sensitive websites in a remote browser without having to install the Cloudflare WARP client on their device.

## Enable remote browser

To enable Clientless Web Isolation,

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), navigate to **Settings** > **Browser Isolation**.
2. Toggle on **Clientless Web Isolation**.
3. (Optional) To configure access permissions, click **Manage**. You can add authentication methods and [rules](/cloudflare-one/policies/access/) to control who can use the clientless remote browser.

### Optional configurations

When users visit a website through the clientless remote browser, the traffic passes through Cloudflare Gateway. Therefore, you can apply HTTP policies even if the user's device does not have the Cloudflare certificate.

- Configure [HTTP policies](/cloudflare-one/policies/filtering/http-policies/) to allow or block websites within the remote browser.

- Configure [remote browser controls](/cloudflare-one/policies/browser-isolation/#settings) such as disabling copy/paste, printing, or keyboard input.

## Open URL in remote browser

Clientless Web Isolation is implemented through a prefixed URL, where `<your-team-name>` is your organization's [team name](/cloudflare-one/glossary/#team-name).

```txt
https://<your-team-name>.cloudflareaccess.com/browser/<URL>
```

For example, to isolate `www.example.com`, users would visit `https://yourcompany.cloudflareaccess.com/browser/https://www.example.com/` in their preferred browser.

If `<url>` is not provided, users are presented with a Cloudflare Zero Trust landing page where they can input a target URL or search for a website.

## Address bar

Clientless Web Isolation has an embedded address bar. This feature is designed to improve the user's experience while navigating in isolated pages with prefixed URLs.

The clientless address bar has three views: hostname notch, full address bar and hidden. The user's selected view is remembered across domains and remote browsing sessions.

### Hostname notch view

By default the isolated domain name appears in the notch positioned at the top and center of an isolated page.

![Viewing hostname of an isolated page in the clientless remote browser](/cloudflare-one/static/documentation/policies/rbi-address-bar-notch.png)

Clicking **expand** or the hostname text will expand the notch to the full address bar view. If isolated page content is obscured by the notch, expanding to the full address bar view will make the content accessible.

### Full address bar view

The full address bar allows users to search and navigate to isolated websites. Users can jump to the address bar at any time by pressing <kbd>CTRL</kbd> + <kbd>L</kbd> on the keyboard.

![Viewing full address of an isolated page in the clientless remote browser](/cloudflare-one/static/documentation/policies/rbi-address-bar-full.png)

### Hidden view

To turn on or off the address bar, users can right-click on any isolated page and select **Show / Hide address bar**.

## Logs

- **Authentication events** — User login events are available in Access Audit Logs.
- **HTTP request logs** — Traffic from the remote browser to the Internet is logged in Gateway request logs.

## Integrate with a third-party Secure Web Gateway

Clientless Web Isolation can be integrated with a third-party Secure Web Gateway by implementing a custom block page. Below is an example block page that redirects websites to a remote browser.

```html
<!doctype html>
<html>
<head>
<title>Redirecting website to a remote browser</title>
<script>
    window.location.href = 'https://<your-team-name>.cloudflareaccess.com/browser/<URL>}';
</script>
<noscript>
    <meta http-equiv="refresh" content="0; url=https://<your-team-name>.cloudflareaccess.com/browser/<URL>" />
</noscript>
</head>
<body>
<p>This website is being redirected to a remote browser. Click <a href="https://<your-team-name>.cloudflareaccess.com/browser/<URL>">here</a> if you are not automatically redirected.</p>
</body>
</html>
```
