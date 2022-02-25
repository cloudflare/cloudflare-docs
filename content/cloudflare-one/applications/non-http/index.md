---
pcx-content-type: how-to
title: Add non-HTTP applications
weight: 5
---

# Add non-HTTP applications

You can connect applications to Cloudflare Zero Trust over a number of different protocols.

*   [Connect through Access using a CLI](/cloudflare-one/tutorials/cli/)
*   [Connect through Access over RDP](/cloudflare-one/tutorials/rdp/)
*   [Connect through Access over SSH](/cloudflare-one/tutorials/ssh/)
*   [Connect through Access using kubectl](/cloudflare-one/tutorials/kubectl/)
*   [Connect through Access over SMB](/cloudflare-one/tutorials/smb/)

## Rendering in the browser

<Aside type='note'>

SSH and browser-rendered applications can be set for domains and subdomains, but cannot be set for paths.

</Aside>

Cloudflare can render certain non-web applications in your browser without the need for client software or end-user configuration changes. Cloudflare currently supports rendering a terminal for SSH and VNC connections in a user's browser.

To enable this setting, follow the instructions [here](/cloudflare-one/tutorials/ssh/) to connect a machine available over SSH to Cloudflare. Next, navigate to the application page of the Access section in the Zero Trust dashboard. Click **Edit** and select the Settings tab. In the **`cloudflared` settings** card, select *SSH* from the **Browser Rendering** drop-down menu.

![Auto Auth](/cloudflare-one/static/documentation/applications/ssh-browser-rendering.png)

Once enabled, when users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.

## Automatic `cloudflared` authentication

<Aside>

This should only be enabled if a [service token](/cloudflare-one/identity/service-auth/service-tokens/) cannot be used for your automated service.

</Aside>

<TableWrap>

| Before you start |
| ------------------- |
| Ensure you have an automated service relying on `cloudflared` authentication |
| Ensure you have an active IdP session when logging in through `cloudflared` |

</TableWrap>

When you log into Access through `cloudflared`, your browser prompts you to allow access by
displaying this page:

![Access browser page](/cloudflare-one/static/documentation/applications/non-http/access-screen.png)

To avoid seeing this page every time you authenticate through `cloudflared`, navigate to the application page of the Access section in the Zero Trust dashboard. Click **Edit** and select the Settings tab. In the `cloudflared settings` card, toggle `Enable automatic cloudflared authentication` to on.

![Auto Auth](/cloudflare-one/static/documentation/applications/non-http/cloudflared-app-settings.png)

This option will still prompt a browser window in the background, but the authentication will be automatic.
