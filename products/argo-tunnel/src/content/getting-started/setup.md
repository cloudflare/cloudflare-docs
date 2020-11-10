---
order: 1
---

# Setup

| Before you start |
|---|
| 1. [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website) |
| 2. [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708) |
| 3. [Enable Argo Smart Routing for your account](https://support.cloudflare.com/hc/articles/115000224552-Configuring-Argo-through-the-UI) |
| 4. [Install `cloudflared`](/getting-started/installation/) |


Follow these steps to set up Cloudflare Argo Tunnel:

1. Authenticate your instance `cloudflared` by logging in to your Cloudflare account with the following command:

```sh
$ cloudflared tunnel login
```

2. The command will attempt to open a browser and prompt you to authenticate with your Cloudflare account.

  If running on a headless system, copy the link and paste it into a browser.

3. Once authenticated, Cloudflare will return a certificate file, `cert.pem`, that will give this instance of `cloudflared` the ability to:
    * Create and delete Tunnels
    * Modify DNS records in your account

The file is required if you want to:
   * Create new Tunnels
   * Change DNS routing from `cloudflared`

The file is not required if you want to:
  * Run an existing Tunnel
  * Manage routing from the Cloudflare dashboard

