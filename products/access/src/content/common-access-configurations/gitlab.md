---
order: 3
---

# GitLab

[GitLab](https://about.gitlab.com/) is a continuous integration and delivery platform that includes Git repository source control, issue tracking, and release and testing tools.

GitLab is available in two models: a SaaS version and as licensed software that can be run on-premise or in a cloud provider. Cloudflare Access and Argo Tunnel can be used with the licensed software version to add zero trust security to a GitLab deployment.

## Confirm the ports in use

Connect to the machine running your GitLab instance. Confirm which ports are in use with the following command:

```bash
sudo netstat -tulpn | grep LISTEN
```

The output should confirm that the GitLab services are listening on several ports, including the databases, alert manager, and unicorn masters. Confirm that the port in use for the `nginx: master` service, likely `80`, as well as the port used by `sshd` which will likely be `22`.

## Build Access policies

End users connect over HTTP to the GitLab web application and over SSH for source code management. Each protocol will need a unique subdomain and corresponding Cloudflare Access policy.

To determine who can reach the application, Cloudflare Access relies on integration with identity providers like Okta or AzureAD or Google to issue the identity cards that get checked at the door. While a VPN allows me inside free range on a private network unless someone builds an active rule to stop me, Access enforces that identity check on every request (and at any granularity configured).

For example, if you intend to deploy the application at a subdomain of `site.com`, create two Access policies:

* `gitlab.site.com` for the web application
* `gitlab-ssh.site.com` for SSH connections

An example policy is provided below.

![Access Policy](../static/gitlab/gitlab-web.png)

These names are just examples; any name can be used for the subdomain. You can learn more about creating Access policies [here](/setting-up-access/configuring-access-policies/).

## Connect GitLab to Cloudflare with Argo Tunnel

Cloudflare Argo Tunnel creates a secure, outbound-only, connection between this machine and Cloudflare's network. Using outbound-only connections, teams can avoid opening firewall ports to the public Internet.

Argo Tunnel can be installed on the machine with the following commands.

```sh
$ sudo wget https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.deb
$ sudo dpkg -i ./cloudflared-stable-linux-amd64.deb
```

Once installed, you will need to authenticate `cloudflared`. The following command will print a URL that can be visited in another machine with a browser.

```sh
$ cloudflared login
```

Login with your Cloudflare credentials and select the hostname you intend to use. Cloudflare will then issue a certificate to the instance of `cloudflared` that can be used to create the subdomains required.

You will need to create two Tunnels: one for the web application and other for SSH traffic. The same instance of `cloudflared` can be used to support both connections.

The following commands will initiate the connections, but these will terminate if the machine restarts or is otherwise disrupted. For long-term use, these should be run as `systemd` services.

```sh
$ cloudflared tunnel --hostname gitlab.site.com --url localhost:80
```

Will establish the Tunnel for the web application.

```sh
$ cloudflared tunnel --hostname gitlab-ssh.site.com --url ssh://localhost:22
```

Will establish the Tunnel for SSH connections.

## Connecting from a client

End users can visit the web application address without any agent required. They will be prompted to login based on the Access policy configured previously.

For SSH connections, the end user needs to install `cloudflared`. Users can follow [these instructions](https://developers.cloudflare.com/argo-tunnel/downloads/) to download the appropriate version for their OS.

Once installed, end users can then run the following command to print settings that will need to be added to their SSH configuration file.

```sh
$ cloudflared access ssh-config --hostname gitlab-ssh.site.com
```

`cloudflared` will print the following message:

```bash
Add to your /Users/username/.ssh/config:

Host gitlab-ssh.site.com
  ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

The user will need to append these lines to their SSH configuration file. This is a one-time step.

Once saved, the user can run any SSH commands directed to the GitLab instance. Cloudflare Access will check the request for authentication and launch a browser window that will prompt the user to login with their SSO credentials. Once complete, a token will be sent to the `cloudflared` instance on the user's machine and the connection will be established.

## Example video

<StreamVideo id="d0fafb9d43ba50f533127805f3ffee67"/>
