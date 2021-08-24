---
order: 2
pcx-content-type: how-to
hidden: true
---

# Authenticate `cloudflared`

| Before you start |
|---|
| 1. [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website) |
| 2. [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708) |
| 3. [Install `cloudflared`](/connections/connect-apps/install-and-setup/installation) |

Follow these steps to authenticate `cloudflared`:

1. Log in to your Cloudflare account with the following command:

 ```sh
 $ cloudflared tunnel login
 ```

1. The command will attempt to open a browser window and prompt you to authenticate with your Cloudflare account.

  If running on a headless system, copy the link and paste it into a browser.

1. Choose any hostname in your account. Cloudflare will issue credentials that are account-wide in scope; you do not need to pick a specific hostname where you plan to connect the Tunnel.

1. Once authenticated, Cloudflare will return a certificate file, `cert.pem`, that will give this instance of `cloudflared` the ability to:
    * Create and delete Tunnels
    * Modify DNS records in your account

 The file is **required** if you want to:
   * Create new Tunnels
   * Configure routing from `cloudflared`

 The file is **not required** if you want to:
   * Run an existing Tunnel
   * Manage routing from the Cloudflare dashboard

 <Aside>

 The `cert.pem` origin certificate is valid for at least 10 years, and the service token it contains is valid until revoked.

 </Aside>