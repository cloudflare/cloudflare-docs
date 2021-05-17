---
order: 0
---

# SSH connections

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

<Aside>

<b>Requirements</b>

* A Cloudflare account
* An **<a href="https://support.cloudflare.com/hc/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website">active zone</a>**  on Cloudflare
* The `cloudflared` daemon installed on both the client machine and the target server

</Aside>

Secure Shell (SSH) protocol allows users to connect to infrastructure to perform activities like remote command execution.

This section will cover:
* [Connecting your remote server to Cloudflare](#connect-the-remote-server-to-cloudflare)
* [Connecting via Access-protected SSH from a remote machine](#connect-from-a-client-machine)

**NOTE**: If you have an origin that serves both SSH and HTTP requests, you need to place those services on separate domains or subdomains. Otherwise, errors occur when attempting to access the machine over different protocols. For example, requests made in a web browser will route over SSH and fail.

# Connect the remote server to Cloudflare

## 1. Authenticate `cloudflared`
1. Run the following command to authenticate cloudflared into your Cloudflare account.

```sh
$ cloudflared tunnel login
```
`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

2. Once you login, Cloudflare will display the sites that you added to your account.

3. Select the site you will create a subdomain to represent the machine or server.
For example, if you plan to share the machine at `ssh.site.com` select `site.com` from the list.

4. Once selected, `cloudflared` will download a wildcard certificate for the site. This certificate will allow `cloudflared` to create a DNS record for a subdomain of the site.

## 2. Secure The Subdomain With Cloudflare Access

Next, protect the subdomain you plan to register with a Cloudflare Access policy. Follow [these instructions](/setting-up-access/configuring-access-policies/) to build a new policy to control who can connect to the machine.
For example, if you share the machine at `ssh.site.com`, build a policy to only allow your team members to connect to that subdomain.

## 3. Connect The Remote Machine To Cloudflare

By default, the SSH protocol listens on port `22`. Confirm which port your infrastructure uses. You can use nonstandard ports, as well.
Run the following command to connect the machine to Cloudflare, replacing the `ssh.site.com` and 22 values with your site and port.

```sh
$ cloudflared tunnel --hostname
ssh.site.com --url ssh://localhost:22
```
`cloudflared` will confirm that the connection has been established. The process needs to be configured to stay alive and autostart. If the process is killed, end users will not be able to connect.

**Common issues**
Ensure that the machine's firewall permits egress on ports `22`, `80`, `443`, otherwise cloudflared will return an error.

# Connect from a client machine

## 1. Update Your SSH Configuration Settings

Cloudflare Access does not require any unique commands or SSH wrappers. The only change required is the update to your SSH configuration file. `cloudflared` will print these details.

1. To generate generic configuration settings, run the following command:

```sh
$ cloudflared access ssh-config
```

The command will print SSH configuration details in the following format:

```bash
Host [your hostname]
	ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

 Replace the `[your hostname]` value with the hostname configured for the remote machine.

2. Optionally, if you know the hostname, you can run the following command to generate the exact SSH configuration details.

```sh
$ cloudflared access ssh-config --hostname ssh.site.com
```

 Replace `ssh.site.com` with your remote machine's hostname.

The command will print the following details:

```bash
Host ssh.site.com
	ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```
## 2. Connect Over SSH To The Remote Machine

1. Run the following command to create a connection from the device to Cloudflare.

```sh
$ ssh username@ssh.site.com
```

Replace `username` with your unix username.

Note that Access matches based on the identity that precedes an email domain. **Unix usernames must match the identity preceding the email domain.** For example, if the user's identity in your Okta or GSuite provider is `jdoe@example.com` then Access will look to match that identity to the Unix user `jdoe`.
`cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

### Connecting to Git repositories

If you use SSH to reach a Git repository, you can continue to use the `git` command without any wrapper. You will still need to update your SSH configuration file using the instructions above.
Once configured, you can run the following command to test the connection:

```sh
$ git clone ssh -T username@git.site.com
```
Replace `username` with your unix username.

Cloudflare Access does not replace SSH key exchange with a Git repository.

### Service tokens

[Service tokens](/access-service-auth/service-tokens/) can be used with the Cloudflare Access SSH flow. To do so, set `--id` and `--secret` on the request with the values of the service token. Ensure the Access policy protecting the resource also allows for the particular service token.

### Securing your connection with Argo Tunnel

**Video Guide**. In this video, you’ll learn how to use Cloudflare Access to protect a Secure Shell (SSH) connection by setting up a secure link with Argo Tunnel.

<StreamVideo id="2379b6b85ee22866c4b45571bdb5fe35"/>
