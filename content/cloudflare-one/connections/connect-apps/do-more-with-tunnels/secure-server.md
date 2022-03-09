---
pcx-content-type: how-to
title: Secure the Server
weight: 7
---

# Secure the Server

{{<Aside type="note" header="Before you start">}}

Make sure you follow our [guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) to create, configure, and run a tunnel.

{{</Aside>}}

Once you can successfully run a tunnel to proxy incoming traffic to any number of services running locally on your origin, you can lock down your origin to block out potentially malicious incoming traffic. By disallowing all ingress traffic and allowing only egress traffic, you can avoid “poking holes” on your server's firewall while exposing only the services you specified in the tunnel's `config.yml` to the outside world.

## Cloud VM instance-level firewall

If you host your services on a Virtual Machine (VM) instance by a Cloud provider such as Google Cloud Platform (GCP), you may set up instance-level firewall rules to disallow all ingress traffic and allow only egress traffic. For example, on GCP, you may delete all ingress rules, leaving only the relevant egress rules. This is because GCP's firewall defaults to “Block” unless a rule explicitly allows certain traffic.

![GCP firewall](/cloudflare-one/static/documentation/connections/gcp-firewall.png)

## OS-level firewall

Alternatively, you may also use operating system (OS)-level firewall rules to disallow all ingress traffic and allow only egress traffic. For example, if your server runs on Linux, you may use `iptables` to set up firewall rules. Most Linux distributions are pre-installed with `iptables`. Note that in the example below, not all ingress traffic is blocked, just in case that the server is hosted on the Cloud and there would be no way to SSH back into the system again if the settings were configured wrongly.

1.  Check your current firewall rules.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo iptables -L</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Allow `localhost` to communicate with itself.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo iptables -A INPUT -i lo -j ACCEPT</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Allow already established connection and related traffic.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Allow new SSH connections.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Drop all other ingress traffic.

    {{<Aside header="Warning:">}}
    Be very careful with the following command because if you didn't preserve the current SSH connection or allow new SSH connections, you would be logged out and unable to SSH back into the system again.
    {{</Aside>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo iptables -A INPUT -j DROP</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  After setting the firewall rules, use this command to check the current `iptables` settings:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo iptables -L</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Run your tunnel and check that all the services specified in `config.yml` should still be accessible to the outside world via the tunnel, but not via the external IP address of the server.

You can also:

- [Secure your application with Cloudflare Access](/cloudflare-one/applications/configure-apps/self-hosted-apps/)
