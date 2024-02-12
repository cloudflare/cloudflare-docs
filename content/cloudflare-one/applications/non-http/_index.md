---
pcx_content_type: how-to
title: Add non-HTTP applications
weight: 2
---

# Add non-HTTP applications

You can connect applications to Cloudflare Zero Trust over a number of different protocols.

- [Connect through Access using a CLI](/cloudflare-one/tutorials/cli/)
- [Connect through Access over RDP](/cloudflare-one/connections/connect-networks/use-cases/rdp/)
- [Connect through Access over SSH](/cloudflare-one/connections/connect-networks/use-cases/ssh/)
- [Connect through Access using kubectl](/cloudflare-one/tutorials/kubectl/)
- [Connect through Access over SMB](/cloudflare-one/connections/connect-networks/use-cases/smb/)

## Browser rendering

Cloudflare can render certain non-web applications in your browser without the need for client software or end-user configuration changes. Cloudflare currently supports rendering a terminal for SSH and VNC connections in a user's browser.

{{<Aside type="note">}}

You can only enable browser rendering on domains and subdomains, not for specific paths.

{{</Aside>}}

### Enable browser rendering

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Locate the SSH or VNC application you created when [connecting the server to Cloudflare](/cloudflare-one/connections/connect-networks/use-cases/ssh/). Select **Configure**.
3. In the **Policies** tab, ensure that only **Allow** or **Block** policies are present. **Bypass** and **Service Auth** are not supported for browser-rendered applications.
4. In the **Settings** tab, scroll down to **Additional settings**.
5. For **Browser rendering**, choose _SSH_ or _VNC_.
6. Select **Save application**.

When users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.

## Automatic `cloudflared` authentication

{{<Aside>}}

This setting should only be enabled if a [service token](/cloudflare-one/identity/service-tokens/) cannot be used for your automated service.

{{</Aside>}}

When you log in to Cloudflare Access through `cloudflared`, your browser prompts you to allow access by
displaying this page:

![Access request prompt page displayed after logging in with cloudflared.](/images/cloudflare-one/applications/non-http/access-screen.png)

To avoid seeing this page every time you authenticate through `cloudflared`, you can turn on automatic `cloudflared` authentication.

### Prerequisites

Ensure that you have:

- An automated service that relies on `cloudflared` authentication
- An active IdP session when logging in through `cloudflared`

### Enable automatic cloudflared authentication

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Locate your application and select **Configure**.
3. In the **Settings** tab, scroll down to **Additional settings**.
4. Turn on **Enable automatic cloudflared authentication**.
5. Select **Save application**.

This option will still prompt a browser window in the background, but authentication will now happen automatically.
