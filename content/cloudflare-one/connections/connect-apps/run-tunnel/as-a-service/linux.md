---
pcx-content-type: how-to
title: Linux
weight: 31
meta:
  title: Run as a service on Linux
---

# Run as a service on Linux

You can install `cloudflared` as a system service on Linux. Before you install Cloudflare Tunnel as a service, follow the [Tunnel guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) to install `cloudflared` on your machine, create a tunnel, route traffic to your tunnel, and then run it.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/configuration-file/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `tunnel`           | The UUID of your Tunnel                              |
| `credentials-file` | The location of the credentials file for your Tunnel |

## Running `cloudflared` as a service

Open a terminal window and run the following command to install the latest version of `cloudflared`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">wget https://github.com/cloudflare/cloudflared/releases/download/latest/cloudflared-linux-amd64</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mv ./cloudflared-linux-amd64 /usr/local/bin/cloudflared</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">chmod a+x /usr/local/bin/cloudflared</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared update</span></div></span></span></span></code></pre>{{</raw>}}

Next, run the following three commands to run `cloudflared` as a service:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared service install</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">systemctl start cloudflared</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">systemctl status cloudflared</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
