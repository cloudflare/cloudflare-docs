---
updated: 2021-06-14
category: 🔐 Zero Trust
pcx-content-type: tutorial
title: Connect through Cloudflare Access over RDP
---

# Connect through Cloudflare Access over RDP

You can connect to machines over RDP using Cloudflare's Zero Trust platform.

**🗺️ This walkthrough covers how to:**

- Build a policy in Cloudflare Access to secure the machine
- Connect a machine to Cloudflare's network using an RDP connection
- Connect from a client machine

**⏲️ Time to complete: 30 minutes**

## Before you start

1.  [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website)
2.  [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708)

---

## Create a Zero Trust policy

1.  Navigate to the Zero Trust Dashboard to create a new application.

2.  Select the `Applications` page from the sidebar.

3.  Click **Add application**.

    ![App List](/cloudflare-one/static/zero-trust-security/ssh/app-list.png)

4.  Choose **Self-hosted** on the next page.

    ![Add App](/cloudflare-one/static/zero-trust-security/ssh/add-app.png)

5.  Input a subdomain where your application will be available to users.

    ![Configure](/cloudflare-one/static/zero-trust-security/ssh/configure-app.png)

6.  Next, create rules that control who can reach the application.

    ![Add Rules](/cloudflare-one/static/zero-trust-security/ssh/app-rules.png)

7.  Finally, click **Save** to save the policy.

    You can always edit the policy to change who should be allowed access to the application, or to change which authentication providers can be used to access the application.

    ![Save](/cloudflare-one/static/zero-trust-security/ssh/save-app.png)

## Install `cloudflared`

Cloudflare Tunnel creates a secure, outbound-only connection between this machine and Cloudflare's network. With an outbound-only model, you can prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

1.  Download the version of `cloudflared` that matches your architecture from the [available releases](https://github.com/cloudflare/cloudflared/releases).

2.  Place the `cloudflared` executable in a location accessible to the OS, for example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Cloudflared\bin\cloudflared.exe</span></div></span></span></span></code></pre>{{</raw>}}

3.  Next, run `CMD` as an administrator to install the service.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Cloudflared</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">bin</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">cloudflared.exe </span><span class="CodeBlock--token-function">service</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    By default, the agent will run as a Local Account service and will look for the configuration and certificate file in the systemprofile.

4.  Run the following command to create a new directory within systemprofile, replacing the `System32` value if needed to match your architecture.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">mkdir</span><span class="CodeBlock--token-plain"> C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Windows</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">System32</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">config</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">systemprofile</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">.cloudflared</span></div></span></span></span></code></pre>{{</raw>}}

    {{<Aside>}}
Ensure that the machine's firewall permits egress on ports `80`, `443`, and `3389`, otherwise cloudflared will return an error.
    {{</Aside>}}

## Authenticate `cloudflared`

1.  Run the following command to authenticate `cloudflared` into your Cloudflare account.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Cloudflared\bin\cloudflared.exe login</span></div></span></span></span></code></pre>{{</raw>}}

2.  `cloudflared` will open a browser window and prompt you to login to your Cloudflare account.

    If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

3.  Choose any hostname presented in the list. Cloudflare will issue a certificate scoped to your account. You do not need to pick the specific hostname where you will serve the Tunnel.

4.  Copy the file to the `systemprofile` directory created previously.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared</span></div></span></span></span></code></pre>{{</raw>}}

## Create a Tunnel

Next, [create a Tunnel](/cloudflare-one/connections/connect-apps/create-tunnel/) with the command below.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared tunnel create &ltNAME&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Replace `<NAME>` with a name for the Tunnel. This name can be any value. A single Tunnel can also serve traffic for multiple hostnames to multiple services in your environment, including a mix of connection types like SSH and HTTP.

The command will output an ID for the Tunnel and generate an associated credentials file. At any time you can list the Tunnels in your account with the following command.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Cloudflared\bin\cloudflared.exe tunnel list</span></div></span></span></span></code></pre>{{</raw>}}

## Configure the Tunnel

You can now [configure the Tunnel](/cloudflare-one/connections/connect-apps/configuration/) to serve traffic.

1.  Create a `YAML` file that `cloudflared` can reach. By default `cloudflared` will look for the file in the `C:\Users\%USERNAME%\.cloudflared\` folder of your Windows machine.

2.  Run `Notepad.exe` as an administrator. Next, configure the Tunnel, replacing the example ID below in the first two lines with the ID of the Tunnel created above. Additionally, replace the hostname in this example with the hostname of the application configured with Cloudflare Access.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yaml" language="yaml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">tunnel</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> 6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">credentials-file</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> C</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">\Users\%USERNAME%\.cloudflared\6ff42ae2</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">765d</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">4adf</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">8112</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">31c55c1551ef.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-key CodeBlock--token-atrule">ingress</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">hostname</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> azure.widgetcorp.tech</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> rdp</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//localhost</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">3389</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">service</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> http_status</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-number">404</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># Catch-all rule, which responds with 404 if traffic doesn't match any of</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment"># the earlier rules</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

3.  Make sure the file is saved to the following location:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Users\%USERNAME%\.cloudflared\config.yml</span></div></span></span></span></code></pre>{{</raw>}}

    with `%USERNAME%` being your Windows username (this is your user folder).

## Route to the Tunnel

{{<Aside>}}

<strong>IMPORTANT</strong>: Make sure you have enabled WebSockets in the "Network" section of your
domain in the Cloudflare control panel:

![Enable WebSockets](/cloudflare-one/static/zero-trust-security/ssh/enable-websockets.png)

{{</Aside>}}

You can now create a DNS record that will route traffic to this Tunnel. Multiple DNS records can point to a single Tunnel and will send traffic to the service configured as long as the hostname is defined with an [ingress rule](/cloudflare-one/connections/connect-apps/configuration/configuration-file/ingress/).

1.  Navigate to `dash.cloudflare.com` and choose the hostname where you want to create a Tunnel. This should match the hostname of the Access policy. Click **+ Add record**.

    ![DNS List](/cloudflare-one/static/zero-trust-security/ssh/dns-list.png)

2.  Select `CNAME` as the record type. For the target, input the ID of your Tunnel followed by `cfargotunnel.com`. In this example, the target would be:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com</span></div></span></span></span></code></pre>{{</raw>}}

3.  Click **Save**.

    ![Add DNS](/cloudflare-one/static/zero-trust-security/ssh/add-dns.png)

## Run the Tunnel

You can now run the Tunnel to connect the target service to Cloudflare. Use the following command to run the Tunnel, replacing `<NAME>` with the name created for your Tunnel.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Cloudflared\bin\cloudflared.exe tunnel run &ltNAME&gt</span></div></span></span></span></code></pre>{{</raw>}}

We recommend that you run `cloudflared` [as a service](/cloudflare-one/connections/connect-apps/run-tunnel/as-a-service/) that is configured to launch on start.

## Connect from a client machine

### Install `cloudflared` on the client machine

[Download and install](/cloudflare-one/connections/connect-apps/install-and-setup/installation) `cloudflared` on the client desktop that will connect to the remote desktop. Note that `cloudflared` will need to be installed on each user device that will connect.

### Connect to the remote desktop

1.  Run the following command to create a connection from the device to Cloudflare. Any available port can be specified, but in this example we will use `3389` as it is the default port for RDP connections.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Cloudflared\bin\cloudflared.exe access rdp --hostname rdp.site.com --url localhost:3389</span></div></span></span></span></code></pre>{{</raw>}}

    This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

2.  Open your RDP client and configure the client to point to `localhost:3389`. Do not input the hostname.

3.  When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

## Configuring A Desktop Shortcut

### Windows

You can help end users connect without requiring the command line by providing them with a shortcut that can be launched from the desktop.

1.  Ensure that `cloudflared.exe` is installed on the end user device and available in the Windows Path.

2.  Right-click on the Windows desktop and select **New > Shortcut**.

3.  In the wizard that appears, paste in the path to your `cloudflared.exe` file, followed by this command with the hostname your team uses:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">C:\Cloudflared\bin\cloudflared.exe access rdp --hostname monday.example.com --url localhost:3389</span></div></span></span></span></code></pre>{{</raw>}}

4.  Click **Next** and complete the wizard.

    At this point the shortcut will appear on the desktop, and users can launch with a double-click. The shortcut can then be distributed to end users along with `cloudflared`.

## Common issues

- You may get a warning indicating that the `.exe` (`cloudflared.exe`) is unknown. This can be skipped by clicking `More Info` in the dialog box and then clicking **Run Anyway**. This will only appear one time.

- Ensure that RDP is enabled on the target Windows machine. If not, you may encounter an error: `No connection could be made because the target machine actively refused it`.

### MacOS

{{<Aside type="note">}}

Before you start, make sure you download an RDP client for macOS.

{{</Aside>}}

MacOS users can save a command shortcut that will launch the RDP flow.

1.  The command below can be saved as a `.command` file that can be launched on login:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">var=/Applications/CF-RDP-Tunnel.command &amp;&amp;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">echo &quot;`which cloudflared` access rdp --hostname monday.example.com --url localhost:3389 &amp;&quot; &gt $var &amp;&amp;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">chmod +x $var</span></div></span></span></span></code></pre>{{</raw>}}

2.  Check that everything is successful by running the following command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">lsof -nP -iTCP:3389 | grep LISTEN</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    If needed, you can kill the process by running the following command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">sudo kill -9 [process id]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    The command from Step 1 can then be configured to run at device login by navigating to **System Preferences > Users & Groups**.

3.  Select the `+` sign.

4.  Navigate to **Macintosh HD > Applications**.

5.  Double click on the previously created `CF-RDP-Tunnel.command` file.

    The default behavior in MacOS is for the Terminal window to stay open. You can configure it to close automatically.
