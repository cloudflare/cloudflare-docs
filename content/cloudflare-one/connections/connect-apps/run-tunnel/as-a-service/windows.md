---
pcx-content-type: how-to
title: Windows
weight: 31
meta:
  title: Run as a service on Windows
---

# Run as a service on Windows

You can install `cloudflared` as a system service on Windows.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `%USERPROFILE%\.cloudflared\config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/configuration-file/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `tunnel`           | The UUID of your Tunnel                              |
| `credentials-file` | The location of the credentials file for your Tunnel |

## Running `cloudflared` as a service

1.  [Download the latest `cloudflared` version](/cloudflare-one/connections/connect-apps/install-and-setup/installation/).

1.  Create a new directory:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Cloudflared</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">bin</span></div></span></span></span></code></pre>{{</raw>}}

1.  Copy the `.exe` file you downloaded in step 1 to the new directory and rename it to `cloudflared.exe`.

1.  Open the CMD as an administrator and navigate to `C:\Cloudflared\bin`.

1.  Run this command to install `cloudflared`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared.exe </span><span class="CodeBlock--token-function">service</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Next, run this command to create another directory:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">mkdir</span><span class="CodeBlock--token-plain"> C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Windows</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">System32</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">config</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">systemprofile</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">.cloudflared</span></div></span></span></span></code></pre>{{</raw>}}

1.  Now log in and authenticate `cloudflared`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared.exe login</span></div></span></span></span></code></pre>{{</raw>}}

1.  The login command will generate a `cert.pem` file and save it to your user profile by default. Copy the file to the `.cloudflared` folder created in step 5 using this command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">copy C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Users</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">%USERNAME%</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">.cloudflared</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">cert.pem C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Windows</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">System32</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">config</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">systemprofile</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">.cloudflared</span></div></span></span></span></code></pre>{{</raw>}}

1.  Next, create a tunnel:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared.exe tunnel create </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">Tunnel Name</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    This will generate a [credentials file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#credentials-file) in `.json` format.

1.  [Create a configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#4-create-a-configuration-file) with the following content:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">tunnel: &ltTunnel ID&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">credentials-file: C:\Windows\System32\config\systemprofile\.cloudflared\&ltTunnel-ID&gt.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"># Uncomment the following two lines if you are using self-signed certificates in your origin server</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"># originRequest:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#   noTLSVerify: true</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ingress:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">- hostname: app.mydomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    service: https://internal.mydomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">- service: http_status:404</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">logfile:  C:\Cloudflared\cloudflared.log</span></div></span></span></span></code></pre>{{</raw>}}

1.  Copy the credentials file and the configuration file to the folder created in step 6:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Windows</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">System32</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">config</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">systemprofile</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">.cloudflared</span></div></span></span></span></code></pre>{{</raw>}}

         {{<Aside type="Note">}}

    If you haven't created a config.yml file, follow [these instructions](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#4-create-a-configuration-file).
    {{</Aside>}}

1.  Validate the ingress rule entries in your configuration file using the command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared.exe tunnel ingress validate</span></div></span></span></span></code></pre>{{</raw>}}

1.  Edit the registry to run `cloudflared` as a service and point the `cloudflared.exe` file, the config.yml file and the command to run the tunnel as explained below:

    Move the registry entry under `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`.

1.  Locate `imagepath` and modify it as shown below. Make sure that there are no extra spaces or characters while you modify the registry entry, as this could cause problems with starting the service.

        C:\Cloudflared\bin\cloudflared.exe --config=C:\Windows\System32\config\systemprofile\.cloudflared\config.yml  tunnel run

1.  If the service does not start, run the following command from `C:\Cloudflared\bin`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sc start cloudflared tunnel run</span></div></span></span></span></code></pre>{{</raw>}}

You will see the output below:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">SERVICE_NAME: cloudflared</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        TYPE               : 10  WIN32_OWN_PROCESS</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        STATE              : 2  START_PENDING</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">                                (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        WIN32_EXIT_CODE    : 0  (0x0)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        SERVICE_EXIT_CODE  : 0  (0x0)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        CHECKPOINT         : 0x0</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        WAIT_HINT          : 0x7d0</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        PID                : 3548</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        FLAGS              :</span></div></span></span></span></code></pre>{{</raw>}}
