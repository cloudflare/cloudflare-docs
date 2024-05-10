---
pcx_content_type: how-to
title: Connect using cloudflared
weight: 11
---

# Connect to application using cloudflared

With Cloudflare Zero Trust, users can connect to non-HTTP applications via a public hostname without installing the WARP client. This method requires you to onboard a domain to Cloudflare and install `cloudflared` on both the server and the user's device.

Users log in to the application by running a `cloudflared access` command in their terminal. `cloudflared` will launch a browser window and prompt the user to authenticate with your identity provider.

{{<Aside type="note">}}
Automated services should only authenticate with `cloudflared` if they cannot use a [service token](/cloudflare-one/identity/service-tokens/). Cloudflared authentication relies on WebSockets to establish a connection. WebSockets have a known limitation where persistent connections may close unexpectedly. We recommend either a [Service Auth policy](/cloudflare-one/policies/access/#service-auth) or using [Warp to Tunnel routing](/cloudflare-one/applications/non-http/) in these instances.
{{</Aside>}}

## Setup

For examples of how to connect to Access applications with `cloudflared`, refer to these tutorials:

- [Connect through Access using a CLI](/cloudflare-one/tutorials/cli/)
- [Connect through Access using kubectl](/cloudflare-one/tutorials/kubectl/)
- [Connect over SSH with cloudflared](/cloudflare-one/connections/connect-networks/use-cases/ssh/#connect-to-ssh-server-with-cloudflared-access)
- [Connect over RDP with cloudflared](/cloudflare-one/connections/connect-networks/use-cases/rdp/#connect-to-rdp-server-with-cloudflared-access)
- [Connect over SMB with cloudflared](/cloudflare-one/connections/connect-networks/use-cases/smb/)

## Automatic `cloudflared` authentication

When users connect to an Access application through `cloudflared`, the browser prompts them to allow access by displaying this page:

![Access request prompt page displayed after logging in with cloudflared.](/images/cloudflare-one/applications/non-http/access-screen.png)

Automatic `cloudflared` authentication allows users to skip this login page if they already have an active IdP session.

To enable automatic `cloudflared` authentication:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Locate your application and select **Configure**.
3. In the **Settings** tab, scroll down to **Additional settings**.
4. Turn on **Enable automatic cloudflared authentication**.
5. Select **Save application**.

This option will still prompt a browser window in the background, but authentication will now happen automatically.
