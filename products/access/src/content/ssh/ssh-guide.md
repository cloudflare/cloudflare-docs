---
order: 16
---

# SSH Connections

Secure Shell (SSH) protocol allows users to connect to infrastructure to perform activities like remote command execution.

Cloudflare Access provides a mechanism for end users to authenticate with their single sign-on (SSO) provider and connect to shared files over RDP without being on a virtual private network (VPN).

### Requirements
* A Cloudflare account
* A site active on Cloudflare
* The `cloudflared` daemon installed on the host and client machines

If you have an origin that serves both SSH and HTTP requests, you need to place those services on separate domains or subdomains. Otherwise, errors occur when attempting to access the machine over different protocols. For example, requests made in a web browser will route over SSH and fail.

> To use Cloudflare Access, you first need to [add a site](https://dash.cloudflare.com/sign-up) to Cloudflare. You can use any site you have registered; the site does not need to be the same one you use for customer traffic and it does not need to match sites in your internal DNS.
>
> Adding the site to Cloudflare requires changing your domain's authoritative DNS to point to Cloudflare's nameservers. Once configured, all requests to that hostname will be sent to Cloudflare's network first, where Access policies can be applied.

# **Connect the remote server to Cloudflare**

## 1. Install the Cloudflare daemon on the remote server

The Cloudflare daemon, `cloudflared`, will maintain a secure, persistent, outbound-only connection from the machine to Cloudflare. SSH traffic will be proxied over this connection using [Cloudflare Argo Tunnel](https://www.cloudflare.com/products/argo-tunnel/).

Follow [these instructions](https://developers.cloudflare.com/argo-tunnel/downloads/) to download and install `cloudflared` on the host.

## 2. Authenticate the Cloudflare daemon

Run the following command to authenticate `cloudflared` into your Cloudflare account.

```sh
$ cloudflared tunnel login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Once you login, Cloudflare will display the sites that you added to your account. Select the site where you will create a subdomain to represent the machine or server. For example, if you plan to share the machine at `ssh.site.com` select `site.com` from the list.

Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow `cloudflared` to create a DNS record for a subdomain of the site.

## 3. Secure the subdomain with Cloudflare Access

Next, protect the subdomain you plan to register with a Cloudflare Access policy. Follow [these instructions](/setting-up-access/configuring-access-policies/) to build a new policy to control who can connect to the machine.

For example, if you share the machine at `ssh.site.com`, build a policy to only allow your team members to connect to that subdomain.

## 4. Connect the remote machine to Cloudflare

By default, the SSH protocol listens on port 22. Confirm which port your infrastructure uses. You can use nonstandard ports, as well.

Run the following command to connect the machine to Cloudflare, replacing the `ssh.site.com` and `22` values with your site and port.

```sh
$ cloudflared tunnel --hostname ssh.site.com --url ssh://localhost:22
```

`cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

**Common issues**

* Ensure that the machine's firewall permits egress on ports 22, 80, 443, otherwise `cloudflared` will return an error.

# **Connect from a client machine**

## 1. Install the Cloudflare daemon on the client machine

Follow the same steps above to download and install `cloudflared` on the client desktop that will connect to the machine. `cloudflared` will need to be installed on each user device that will connect.

## 2. Update your SSH configuration settings

Cloudflare Access does not require any unique commands or SSH wrappers. The only change required is the update to your SSH configuration file. `cloudflared` will print these details.

To generate generic configuration settings, run the following command:

```sh
$ cloudflared access ssh-config
```

The command will print SSH configuration details in the following format:

```bash
Host [your hostname]
	ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

Replace the `[your hostname]` value with the hostname configured for the remote machine.

Optionally, if you know the hostname, you can run the following command to generate the exact SSH configuration details. Replace `ssh.site.com` with your remote machine's hostname.

```sh
$ cloudflared access ssh-config --hostname ssh.site.com
```

The command will print the following details:

```
Host ssh.site.com
	ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

## 3. Connect over SSH to the remote machine

Run the following command to create a connection from the device to Cloudflare.

```sh
$ ssh username@ssh.site.com
```

`cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

### Connecting to Git repositories

If you use SSH to reach a Git repository, you can continue to use the `git` command without any wrapper. You will still need to update your SSH configuration file using the instructions above.

Once configured, you can run the following command to test the connection:

```sh
$ git clone ssh -T username@git.site.com
```

Cloudflare Access does not replace SSH key exchange with a Git repository.

### Service tokens

[Service tokens](/service-auth/service-token/) can be used with the Cloudflare Access SSH flow. To do so, set `--id` and `--secret` on the request with the values of the service token. Ensure the Access policy protecting the resource also allows for the particular service token.

## Video guide

In this video, you’ll learn how to use Cloudflare Access to protect an SSH connection by setting up a secure link with Argo Tunnel.

<StreamVideo id="2379b6b85ee22866c4b45571bdb5fe35"/>

A video guide is [also available](/videos/configuring-access/).
