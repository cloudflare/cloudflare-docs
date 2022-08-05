---
title: Tunnel guide
pcx_content_type: how-to
weight: 1
meta:
  title: Set up your first tunnel
---

# Set up your first tunnel

When setting up your first Cloudflare Tunnel, you have the option to create it:

* [Remotely on the Zero Trust dashboard](#set-up-a-tunnel-remotely-dashboard-setup)
* [Locally, using your CLI](#set-up-a-tunnel-locally-cli-setup)

## Prerequisites

Before you start, make sure you:

* [Add a website to Cloudflare](/fundamentals/get-started/setup/add-site/).
* [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708).

## Configure tunnels

Cloudflared Tunnel runs by deploying a `cloudflared` connector on your machine. You can fine-tune how your tunnel operates by adding one or more [configuration flags](/cloudflare-one/connections/connect-apps/configuration/arguments/) to the `cloudflared` run command. The method for modifying `cloudflared` depends on how the tunnel was created:

If you set up your tunnel from the Zero Trust Dashboard, refer to the [Remote management](/cloudflare-one/connections/connect-apps/configuration/remote-management/) section.

If you set up your tunnel from the CLI, refer to the [Local management](/cloudflare-one/connections/connect-apps/configuration/local-management/) section.
