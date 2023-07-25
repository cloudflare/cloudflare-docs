---
pcx_content_type: how-to
title: Add non-HTTP applications
weight: 5
layout: single
---

# Add non-HTTP applications

You can connect applications to Cloudflare Zero Trust over a number of different protocols.

- [Connect through Access using a CLI](/cloudflare-one/tutorials/cli/)
- [Connect through Access over RDP](/cloudflare-one/connections/connect-networks/use-cases/rdp/)
- [Connect through Access over SSH](/cloudflare-one/connections/connect-networks/use-cases/ssh/)
- [Connect through Access using kubectl](/cloudflare-one/tutorials/kubectl/)
- [Connect through Access over SMB](/cloudflare-one/connections/connect-networks/use-cases/smb/)

## Rendering in the browser

{{<Aside type="note">}}

Browser-rendered applications can be set for domains and subdomains, but cannot be set for paths.

{{</Aside>}}

Cloudflare can render certain non-web applications in your browser without the need for client software or end-user configuration changes. Cloudflare currently supports rendering a terminal for SSH and VNC connections in a user's browser.

To enable browser rendering:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Locate the SSH or VNC application you created when [connecting the server to Cloudflare](/cloudflare-one/connections/connect-networks/use-cases/ssh/). Select **Configure**.
3. In the **Policies** tab, ensure that only **Allow** or **Block** policies are present. **Bypass** and **Service Auth** are not supported for browser-rendered applications.
4. In the **Settings** tab, scroll down to **Browser rendering**.
5. Choose _SSH_ or _VNC_.

Once enabled, when users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.

## Automatic `cloudflared` authentication

{{<Aside>}}

This should only be enabled if a [service token](/cloudflare-one/identity/service-tokens/) cannot be used for your automated service.

{{</Aside>}}

{{<table-wrap>}}

| Before you start                                                             |
| ---------------------------------------------------------------------------- |
| Ensure you have an automated service relying on `cloudflared` authentication |
| Ensure you have an active IdP session when logging in through `cloudflared`  |

{{</table-wrap>}}

When you log in to Access through `cloudflared`, your browser prompts you to allow access by
displaying this page:

![Access request prompt page displayed after logging in with cloudflared.](/images/cloudflare-one/applications/non-http/access-screen.png)

To avoid seeing this page every time you authenticate through `cloudflared`, go to the application page of the Access section in Zero Trust. Select **Edit** and select the Settings tab. In the `cloudflared settings` card, toggle `Enable automatic cloudflared authentication` to on.

![The toggle to enable automatic connection is set to on.](/images/cloudflare-one/applications/non-http/cloudflared-app-settings.png)

This option will still prompt a browser window in the background, but the authentication will be automatic.
