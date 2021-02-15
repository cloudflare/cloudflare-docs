---
order: 1
---

# Arbitrary TCP

<Aside>

<b>Requirements</b>

* A Cloudflare account
* An **<a href="https://support.cloudflare.com/hc/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website">active zone</a>**  on Cloudflare
* The `cloudflared` daemon installed on both the client machine and the target server

</Aside>

Cloudflare Access provides a mechanism for end users to authenticate with their single sign-on (SSO) provider and connect to resources over arbitrary TCP without being on a virtual private network (VPN).

This section will cover:

1. [How to connect the host to Cloudflare](#connect-host)
2. [How to connect from a Client machine over arbitrary TCP](#connect-client)

## Connect the host to Cloudflare

### 1. Install the Cloudflare daemon

The Cloudflare daemon, `cloudflared`, will maintain a secure, persistent, outbound-only connection from the machine to Cloudflare. Arbitrary TCP traffic will be proxied over this connection using [Argo Tunnel](/glossary#argo-tunnel).

Follow [these instructions](/connections/connect-apps/install-and-setup/installation) to download and install `cloudflared` on the machine hosting the resource.

### 2. Authenticate the Cloudflare daemon

1. Run the following command to authenticate `cloudflared` into your Cloudflare account.

```sh
$ cloudflared tunnel login
```

`cloudflared` will open a browser window and prompt you to log in to your Cloudflare account.

If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

2. Once you login, Cloudflare will display the sites that you added to your account.

3. Select the site where you will create a subdomain to represent the resource. For example, if you plan to share the service at `tcp.site.com` select `site.com` from the list.

4. Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow `cloudflared` to create a DNS record for a subdomain of the site.

### 3. Secure the subdomain with Cloudflare Access

Next, protect the subdomain you plan to register with a [Zero Trust policy](/policies/zero-trust). Follow [these instructions](/policies/zero-trust/policy-management) to build a new policy to control who can connect to the resource.

For example, if you share the resource at `tcp.site.com`, build a policy to only allow your team members to connect to that subdomain.

### 4. Connect the resource to Cloudflare

`cloudflared` can proxy connections to nonstandard ports.

Run the following command to connect the resource to Cloudflare, replacing the `tcp.site.com` and `7870` values with your site and port.

```sh
$ cloudflared tunnel --hostname tcp.site.com --url tcp://localhost:7870
```

`cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

## Connect from a client machine

### 1. Install the Cloudflare daemon on the client machine

Follow the same steps above to download and install `cloudflared` on the client desktop that will connect to the resource. `cloudflared` will need to be installed on each user device that will connect.

### 2. Connect to the resource

Run the following command to create a connection from the device to Cloudflare. Any available port can be specified.

```sh
$ cloudflared access tcp --hostname tcp.site.com --url localhost:9210
```

This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

Point the client application to the selected port.

When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

<Aside>

Ensure that the machine's firewall permits egress on ports `80`, `443`, and `2244`, otherwise cloudflared will return an error.

</Aside>
