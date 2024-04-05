---
pcx_content_type: how-to
title: Add non-HTTP applications
weight: 2
---

# Add non-HTTP applications

You can secure non-HTTP applications by [connecting your private network](/cloudflare-one/connections/connect-networks/private-net/) to Cloudflare. Users reach the application by installing the Cloudflare WARP client on their device and enrolling in your Zero Trust organization. Remote devices will be able to connect to your applications as if they were on your private network. By default, all devices enrolled in your organization can access the application unless you build policies to allow or block specific users.

## Setup

For a comprehensive overview of how to connect a private network, refer to our implementation guide:

- [Replace your VPN](/learning-paths/replace-vpn/connect-private-network/)

To connect to an application over a specific protocol, refer to these tutorials:

- [Connect over SSH with WARP to Tunnel](/cloudflare-one/connections/connect-networks/use-cases/ssh/#connect-to-ssh-server-with-warp-to-tunnel)
- [Connect over SMB with WARP to Tunnel](/cloudflare-one/connections/connect-networks/use-cases/smb/#connect-to-smb-server-with-warp-to-tunnel)
- [Connect over RDP with WARP to Tunnel](/cloudflare-one/connections/connect-networks/use-cases/rdp/#connect-to-rdp-server-with-warp-to-tunnel)

## Enable browser rendering

Cloudflare can render certain non-web applications in your browser without the need for client software or end-user configuration changes. Cloudflare currently supports rendering a terminal for SSH and VNC connections in a user's browser.

{{<Aside type="note">}}

You can only enable browser rendering on domains and subdomains, not for specific paths.

{{</Aside>}}

To enable browser rendering:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Locate the SSH or VNC application you created when [connecting the server to Cloudflare](/cloudflare-one/connections/connect-networks/use-cases/ssh/). Select **Configure**.
3. In the **Policies** tab, ensure that only **Allow** or **Block** policies are present. **Bypass** and **Service Auth** are not supported for browser-rendered applications.
4. In the **Settings** tab, scroll down to **Additional settings**.
5. For **Browser rendering**, choose _SSH_ or _VNC_.
6. Select **Save application**.

When users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.
