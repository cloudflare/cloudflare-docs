---
order: 10
---

# Arbitrary TCP

Cloudflare Access provides a mechanism for end users to authenticate with their single sign-on (SSO) provider and connect to resources over arbitrary TCP without being on a virtual private network (VPN).

### Requirements
* A Cloudflare account
* A site active on Cloudflare
* The `cloudflared` daemon installed on the host and client machines

> Cloudflare Access requires you to first [add a site](https://dash.cloudflare.com/sign-up) to Cloudflare. You can use any site you have registered; the site does not need to be the same one you use for customer traffic and it does not need to match sites in your internal DNS.
>
> Adding the site to Cloudflare requires changing your domain's authoritative DNS to point to Cloudflare's nameservers. Once configured, all requests to that hostname will be sent to Cloudflare's network first, where Access policies can be applied.

# **Connect the host to Cloudflare**

## 1. Install the Cloudflare daemon on the host machine

The Cloudflare daemon, `cloudflared`, will maintain a secure, persistent, outbound-only connection from the machine to Cloudflare. Arbitrary TCP traffic will be proxied over this connection using [Cloudflare Argo Tunnel](https://www.cloudflare.com/products/argo-tunnel/).

Follow [these instructions](https://developers.cloudflare.com/argo-tunnel/downloads/) to download and install `cloudflared` on the machine hosting the resource.

## 2. Authenticate the Cloudflare daemon

Run the following command to authenticate `cloudflared` into your Cloudflare account.

```sh
$ cloudflared tunnel login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Once you login, Cloudflare will display the sites that you added to your account. Select the site where you will create a subdomain to represent the resource. For example, if you plan to share the service at `tcp.site.com` select `site.com` from the list.

Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow `cloudflared` to create a DNS record for a subdomain of the site.

## 3. Secure the subdomain with Cloudflare Access

Next, protect the subdomain you plan to register with a Cloudflare Access policy. Follow [these instructions](/setting-up-access/configuring-access-policies/) to build a new policy to control who can connect to the resource.

For example, if you share the resource at `tcp.site.com`, build a policy to only allow your team members to connect to that subdomain.

## 4. Connect the resource to Cloudflare

`cloudflared` can proxy connections to nonstandard ports.

Run the following command to connect the resource to Cloudflare, replacing the `tcp.site.com` and `7870` values with your site and port.

```sh
$ cloudflared tunnel --hostname tcp.site.com --url tcp://localhost:7870
```

`cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

# **Connect from a client machine**

## 1. Install the Cloudflare daemon on the client machine

Follow the same steps above to download and install `cloudflared` on the client desktop that will connect to the resource. `cloudflared` will need to be installed on each user device that will connect.

## 2. Connect to the resource

Run the following command to create a connection from the device to Cloudflare. Any available port can be specified.

```sh
$ cloudflared access tcp --hostname tcp.site.com --url localhost:9210
```

This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

Point the client application to the selected port.

When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

**Common issues**

* Ensure that the machine's firewall permits egress on ports 80 and 443, otherwise `cloudflared` will return an error.