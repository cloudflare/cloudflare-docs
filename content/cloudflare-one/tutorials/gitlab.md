---
updated: 2020-12-10
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Zero Trust GitLab SSH & HTTP
---

# Zero Trust GitLab SSH & HTTP

You can use Cloudflare Access to add Zero Trust rules to a self-hosted instance of GitLab. Combined with Cloudflare Tunnel, users can connect through HTTP and SSH and authenticate with your team's identity provider.

**🗺️ This walkthrough covers how to:**

- Deploy an instance of GitLab
- Lock down all inbound connections to that instance and use Cloudflare Tunnel to set outbound connections to Cloudflare
- Build policies with Cloudflare Access to control who can reach GitLab
- Connect over HTTP and SSH through Cloudflare

**⏲️ Time to complete:**

1 hour

---

## Deploying GitLab

This section walks through deploying GitLab in Digital Ocean. If you have already deployed GitLab, you can skip this section.

Create a Droplet that has 16 GB of RAM and 6 CPUs. This should make it possible to support 500 users, based on [GitLab's resource recommendations](https://docs.gitlab.com/ee/install/requirements.html).

![Create Droplet](/cloudflare-one/static/zero-trust-security/gitlab/create-droplet.png)

GitLab will provide an external IP that is exposed to the Internet (for now). You will need to connect to the deployed server using this external IP for the initial configuration. You can secure connections to the IP by [adding SSH keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) to your Digital Ocean account.

This example uses a macOS machine to configure the Droplet. Copy the IP address assigned to the machine from Digital Ocean.

![Machine IP](/cloudflare-one/static/zero-trust-security/gitlab/show-ip.png)

Open Terminal and run the following command, replacing the IP address with the IP assigned by Digital Ocean.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">ssh</span><span class="CodeBlock--token-plain"> root@134.209.124.123</span></div></span></span></span></code></pre>{{</raw>}}

Next, install GitLab. This example uses the [Ubuntu package](https://about.gitlab.com/install/#ubuntu) and the steps in the GitLab documentation, with a few exceptions called out below.

Run the following commands to begin.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">apt-get</span><span class="CodeBlock--token-plain"> update</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">apt-get</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain"> -y </span><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> openssh-server ca-certificates</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">bash</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The commands above download the GitLab software to this machine. You must now install it. This is the first place this tutorial will diverge from the operations in the GitLab documentation. The next step in the GitLab-provided tutorial sets an external hostname. Instead, you can just install the software.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">apt-get</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain"> gitlab-ee</span></div></span></span></span></code></pre>{{</raw>}}

After a minute or so, GitLab will be installed.

![Install GitLab](/cloudflare-one/static/zero-trust-security/gitlab/install-gitlab.png)

However, the application is not running yet. You can check to see what ports are listening to confirm by installing and using `netstat`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">apt-get</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain"> net-tools</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">netstat</span><span class="CodeBlock--token-plain"> -tulpn </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">grep</span><span class="CodeBlock--token-plain"> LISTEN</span></div></span></span></span></code></pre>{{</raw>}}

The result should be only the services currently active on the machine:

![Just Services](/cloudflare-one/static/zero-trust-security/gitlab/just-services.png)

To start GitLab, run the software's reconfigure command.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> gitlab-ctl reconfigure</span></div></span></span></span></code></pre>{{</raw>}}

GitLab will launch its component services. Once complete, confirm that GitLab is running and listening on both ports 22 and 80.

![GitLab Services](/cloudflare-one/static/zero-trust-security/gitlab/gitlab-services.png)

Users connect to GitLab over SSH (port 22 here) and HTTP for the web app (port 80). In the next step, you will make it possible for users to try both through Cloudflare Access. I'll leave this running and head over to the Cloudflare dashboard.

## Securing GitLab with Zero Trust rules

### Building Zero Trust policies

You can use Cloudflare Access to build Zero Trust rules to determine who can connect to both the web application of GitLab (HTTP) and who can connect over SSH.

When a user makes a request to a site protected by Access, that request hits Cloudflare's network first. Access can then check if the user is allowed to reach the application. When integrated with Cloudflare Tunnel, the Zero Trust architecture looks like this:

![GitLab Services](/cloudflare-one/static/zero-trust-security/gitlab/teams-diagram.png)

To determine who can reach the application, Cloudflare Access relies on integration with identity providers like Okta or AzureAD or Google to issue the identity cards that get checked at the door. While a VPN allows users free range on a private network unless someone builds an active rule to stop them, Access enforces that identity check on every request (and at any granularity configured).

For GitLab, start by building two policies. Users will connect to GitLab in a couple of methods: in the web app and over SSH. Create policies to secure a subdomain for each. First, the web app.

Before you build the rule, you'll need to follow [these instructions](/cloudflare-one/setup/) to set up Cloudflare Access in your account.

Once enabled, navigate to the `Applications` page in the Zero Trust Dashboard. Click `Add an application`.

![Applications Page](/cloudflare-one/static/documentation/applications/add-saas-application.png)

Choose self-hosted from the options presented.

![Self Hosted](/cloudflare-one/static/zero-trust-security/gitlab/policy.png)

In the policy builder, you will be prompted to add a subdomain that will represent the resource. This must be a subdomain of a domain in your Cloudflare account. You will need separate subdomains for the web application and SSH flows.

This example uses `gitlab.widgetcorp.tech` for the web application and `gitlab-ssh.widgetcorp.tech` for SSH connectivity.

![App Picker](/cloudflare-one/static/secure-origin-connections/share-new-site/configure-app.png)

While on this page, you can decide which identity providers will be allowed to authenticate. By default, all configured providers are allowed. Click `Next` to build rules to determine who can reach the application.

You can then add rules to determine who can reach the site.

![Add Rules](/cloudflare-one/static/secure-origin-connections/share-new-site/add-rules.png)

Click `Next` and `Next` again on the `Setup` page - this example does not require advanced CORS configuration. Repeat these steps for the second application, `gitlab-ssh.widgetcorp.tech`.

## Cloudflare Tunnel

Cloudflare Tunnel creates a secure, outbound-only, connection between this machine and Cloudflare's network. With an outbound-only model, you can prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

Cloudflare Tunnel is made possible through a lightweight daemon from Cloudflare called `cloudflared`. Download and then install that on the Digital Ocean machine with the two commands below.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">wget</span><span class="CodeBlock--token-plain"> https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> dpkg -i ./cloudflared-linux-amd64.deb</span></div></span></span></span></code></pre>{{</raw>}}

Once installed, authenticate the instance of `cloudflared` with the following command.

`cloudflared login`

The command will print a URL that you must visit to login with your Cloudflare account.

![Self Hosted](/cloudflare-one/static/zero-trust-security/gitlab/leave-running.png)

Choose a website that you have added into your account.

![Choose Site](/cloudflare-one/static/secure-origin-connections/share-new-site/pick-site.png)

Once you click one of the sites in your account, Cloudflare will download a certificate file to authenticate this instance of `cloudflared`. You can now use `cloudflared` to control Cloudflare Tunnel connections in your Cloudflare account.

![Download Cert](/cloudflare-one/static/secure-origin-connections/share-new-site/cert-download.png)

### Connecting to Cloudflare

You can now connect GitLab to Cloudflare using Cloudflare Tunnel.

First, create a new Tunnel by running the following command.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared tunnel create gitlab</span></div></span></span></span></code></pre>{{</raw>}}

`cloudflared` will generate a unique ID for this Tunnel. You can use this Tunnel both for SSH and HTTP traffic.

![Self Hosted](/cloudflare-one/static/zero-trust-security/gitlab/tunnel-create.png)

Next, you will need to configure Cloudflare Tunnel to proxy traffic to both destinations. The configuration below will take traffic bound for the DNS record that will be created for the web app and the DNS record to represent SSH traffic to the right port.

You use the text editor of your choice to edit the configuration file. The example relies on `Vi`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">vim</span><span class="CodeBlock--token-plain"> ~/.cloudflared/config.yml</span></div></span></span></span></code></pre>{{</raw>}}

Next, configure the Tunnel to serve traffic.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yml" language="yml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">tunnel</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">credentials-file</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /root/.cloudflared/6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">ingress</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> gitlab.widgetcorp.tech</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">80</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> gitlab</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">ssh.widgetcorp.tech</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> ssh</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">22</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Catch-all rule, which just responds with 404 if traffic doesn't match any of</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># the earlier rules</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http_status</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">404</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

![Self Hosted](/cloudflare-one/static/zero-trust-security/gitlab/config-file.png)

You can test that the configuration file is set correctly with the following command.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared tunnel ingress validate</span></div></span></span></span></code></pre>{{</raw>}}

`cloudflared` should indicate the Tunnel is okay. You can now begin running the Tunnel.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared tunnel run</span></div></span></span></span></code></pre>{{</raw>}}

![Tunnel Run](/cloudflare-one/static/zero-trust-security/gitlab/tunnel-run.png)

{{<Aside>}}

This command should be run as a `systemd` service for long-term use; if it terminates, GitLab will be unavailable.

{{</Aside>}}

### Configure DNS records

You can now create DNS records for GitLab in the Cloudflare dashboard. Remember, you will still need two records - one for the web application and one for SSH traffic.

In the DNS tab, choose the website where you built your [Zero Trust policies](/cloudflare-one/policies/zero-trust/). Click `+Add record` and select `CNAME` from type. In the `Name` field, input `gitlab`. In the `Target` field, input the ID of the Tunnel created followed by `cfargotunnel.com`. In this example, that value is:

    6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com

![Add DNS](/cloudflare-one/static/zero-trust-security/gitlab/add-dns.png)

Click `Save`. Repeat the process again by creating a second `CNAME` record, with the same `Target`, but input `gitlab-ssh` for the `Name`. Both records should then appear, pointing to the same Tunnel. The ingress rules defined in the configuration file above will direct traffic to the appropriate port.

![View DNS](/cloudflare-one/static/zero-trust-security/gitlab/view-dns.png)

### Connecting to the web application

You can now test the end-to-end configuration for the web application. Visit the subdomain created for the web application. Cloudflare Access will prompt you to authenticate. Login with your provider.

![Access Login](/cloudflare-one/static/zero-trust-security/gitlab/access-login.png)

Once authenticated, you should see the GitLab web application.

![GitLab Web](/cloudflare-one/static/zero-trust-security/gitlab/gitlab-web.png)

Register your own account and create a Blank project to test SSH in the next step.

![Blank Project](/cloudflare-one/static/zero-trust-security/gitlab/blank-project.png)

GitLab will create a new project and repository.

![New Project](/cloudflare-one/static/zero-trust-security/gitlab/new-project.png)

{{<Aside>}}

To pull or push code, you must also add an SSH key to your profile in GitLab.

{{</Aside>}}

### Configuring SSH

To push and pull code over SSH, you will need to install `cloudflared` on the client machine as well. This example uses a macOS laptop. On macOS, you can install `cloudflared` with the following command.

    $ brew install cloudflare/cloudflare/cloudflared

While you need to install `cloudflared`, you do not need to wrap your SSH commands in any unique way. Instead, you will need to make a one-time change to your SSH configuration file.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">vim</span><span class="CodeBlock--token-plain"> /Users/samrhea/.ssh/config</span></div></span></span></span></code></pre>{{</raw>}}

Input the following values; replacing `gitlab-ssh.widgetcorp.tech` with the hostname you created.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Host gitlab-ssh.widgetcorp.tech</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  ProxyCommand /usr/local/bin/cloudflared access </span><span class="CodeBlock--token-function">ssh</span><span class="CodeBlock--token-plain"> --hostname %h</span></div></span></span></span></code></pre>{{</raw>}}

You can now test the SSH flow by attempting to clone the project created earlier.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">git</span><span class="CodeBlock--token-plain"> clone git@gitlab-ssh.widgetcorp.tech:samrhea/demo</span></div></span></span></span></code></pre>{{</raw>}}

`cloudflared` will prompt you to login with my identity provider and, once successful, issue a token to your device to allow you to authenticate.

![GitLab Clone](/cloudflare-one/static/zero-trust-security/gitlab/git-clone.png)

### Lock down exposed ports

You can now configure your Digital Ocean firewall with a single rule, block any inbound traffic, to prevent direct access.

![Download Cert](/cloudflare-one/static/zero-trust-security/gitlab/disable-ingress.png)

Cloudflare Tunnel will continue to run outbound-only connections and I can avoid this machine getting caught up in a crypto mining operation, or something worse.

## View logs

You can also view logs of the events that are allowed and blocked. Open the `Access` page of the `Logs` section in the Zero Trust Dashboard.

![View Logs](/cloudflare-one/static/zero-trust-security/gitlab/view-logs.png)
