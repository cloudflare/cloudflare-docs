---
updated: 2021-04-15
category: 🔐 Zero Trust
---

# Render an SSH client in a browser

Cloudflare can render an SSH client in your browser without the need for client software or end user configuration changes.

Administrators can deploy Cloudflare Tunnel to connect one or more machines available over SSH to Cloudflare's network. Zero Trust rules can then be applied and enforced at Cloudflare's edge. When users authenticate through those rules, they can start an SSH session in their browser.

**🗺️ This walkthrough covers how to:**

* Render a terminal in your browser for SSH connections

**⏲️ Time to complete: 30 minutes**

**Before you start**

* [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website)
* [Connect your machine to Cloudflare](/tutorials/ssh) and apply Zero Trust rules

---

## Enable browser-based rendering

First, navigate to the application page of the Access section in the Cloudflare for Teams dashboard. Choose an application created using the guide lined above. Click **Edit**.

Next, select the Settings tab. In the `cloudflared settings` card, toggle `Enable browser rendering` to on.

![Auto Auth](../static/documentation/applications/render-browser.png)

Once enabled, when users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.

## Recommended: enable short-lived certificates

Cloudflare's browser-based terminal does not access the device's certificate store to gather SSH keys. Instead, users can input a username and password for password-based authentication or paste their private key. The terminal is rendered entirely in the user's browser - Cloudflare never stores or has access to the private key.

Alternatively, your team can configure short-lived certificates as a more secure, SSO-integrated, session authentication method. Cloudflare will gather the identity from the token issued by the user's login and issue a short-lived certificate for that user. The SSH server can then use that certificate to start the session.

Follow the instructions [here](/identity/users/short-lived-certificates) to configure short-lived certificate authentication.