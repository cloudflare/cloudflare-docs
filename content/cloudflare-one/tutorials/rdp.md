---
updated: 2022-07-12
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

1.  [Add a website to Cloudflare](/fundamentals/get-started/setup/add-site/)
2.  [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708)

---

## Create a Zero Trust policy

1.  Navigate to the Zero Trust Dashboard to create a new application.

2.  Select the **Applications** page from the sidebar.

3.  Click **Add application**.

4.  Choose **Self-hosted** on the next page.

5.  Input a subdomain where your application will be available to users.

6.  Next, create rules that control who can reach the application.

7.  Finally, click **Save** to save the policy.

    You can always edit the policy to change who should be allowed access to the application, or to change which authentication providers can be used to access the application.

## Install `cloudflared`

Cloudflare Tunnel creates a secure, outbound-only connection between this machine and Cloudflare's network. With an outbound-only model, you can prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

1.  Download the version of `cloudflared` that matches your architecture from the [available releases](https://github.com/cloudflare/cloudflared/releases).

2.  Place the `cloudflared` executable in a location accessible to the OS, for example:

    ```sh
    C:\Cloudflared\bin\cloudflared.exe
    ```

3.  Next, run `CMD` as an administrator to install the service.

    ```bash
    C:\Cloudflared\bin\cloudflared.exe service install
    ```

    By default, the agent will run as a Local Account service and will look for the configuration and certificate file in the systemprofile.

4.  Run the following command to create a new directory within systemprofile, replacing the `System32` value if needed to match your architecture.

    ```bash
    mkdir C:\Windows\System32\config\systemprofile\.cloudflared
    ```

    {{<Aside>}}
Ensure that the machine's firewall permits egress on ports `80`, `443`, and `3389`, otherwise cloudflared will return an error.
    {{</Aside>}}

## Authenticate `cloudflared`

1.  Run the following command to authenticate `cloudflared` into your Cloudflare account.

    ```txt
    C:\Cloudflared\bin\cloudflared.exe login
    ```

2.  `cloudflared` will open a browser window and prompt you to login to your Cloudflare account.

    If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

3.  Choose any hostname presented in the list. Cloudflare will issue a certificate scoped to your account. You do not need to pick the specific hostname where you will serve the Tunnel.

4.  Copy the file to the `systemprofile` directory created previously.

    ```txt
    copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared
    ```

## Create a Tunnel

Next, [create a Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#set-up-a-tunnel-locally-cli-setup) with the command below.

```sh
$ cloudflared tunnel create <NAME>
```

Replace `<NAME>` with a name for the Tunnel. This name can be any value. A single Tunnel can also serve traffic for multiple hostnames to multiple services in your environment, including a mix of connection types like SSH and HTTP.

The command will output an ID for the Tunnel and generate an associated credentials file. At any time you can list the Tunnels in your account with the following command.

```txt
C:\Cloudflared\bin\cloudflared.exe tunnel list
```

## Configure the Tunnel

You can now [configure the Tunnel](/cloudflare-one/connections/connect-apps/configuration/) to serve traffic.

1.  Create a `YAML` file that `cloudflared` can reach. By default `cloudflared` will look for the file in the `C:\Users\%USERNAME%\.cloudflared\` folder of your Windows machine.

2.  Run `Notepad.exe` as an administrator. Next, configure the Tunnel, replacing the example ID below in the first two lines with the ID of the Tunnel created above. Additionally, replace the hostname in this example with the hostname of the application configured with Cloudflare Access.

    ```yaml
    tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
    credentials-file: C:\Users\%USERNAME%\.cloudflared\6ff42ae2-765d-4adf-8112-31c55c1551ef.json

    ingress:
      - hostname: azure.widgetcorp.tech
        service: rdp://localhost:3389
      - service: http_status:404
      # Catch-all rule, which responds with 404 if traffic doesn't match any of
      # the earlier rules
    ```

3.  Make sure the file is saved to the following location:

    ```txt
    C:\Users\%USERNAME%\.cloudflared\config.yml
    ```

    with `%USERNAME%` being your Windows username (this is your user folder).

## Route to the Tunnel

{{<Aside>}}

<strong>IMPORTANT</strong>: Make sure you have enabled WebSockets in the "Network" section of your
domain in the Cloudflare control panel:

![How to enable WebSockets](/cloudflare-one/static/zero-trust-security/ssh/enable-websockets.png)

{{</Aside>}}

You can now create a DNS record that will route traffic to this Tunnel. Multiple DNS records can point to a single Tunnel and will send traffic to the configured service as long as the hostname is defined with an [ingress rule](/cloudflare-one/connections/connect-apps/configuration/local-management/ingress/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Select your domain and go to **DNS**.

2. Select **+ Add record**. Choose `CNAME` as the record type. For **Name**, choose the hostname where you want to create a Tunnel. This should match the hostname of the Access policy.

3. For **Target**, input the ID of your Tunnel followed by `.cfargotunnel.com`. For example:
  
  ```txt
    6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com
  ```

4. Select **Save**.

## Run the Tunnel

You can now run the Tunnel to connect the target service to Cloudflare. Use the following command to run the Tunnel, replacing `<NAME>` with the name created for your Tunnel.

```txt
C:\Cloudflared\bin\cloudflared.exe tunnel run <NAME>
```

We recommend that you run `cloudflared` [as a service](/cloudflare-one/connections/connect-apps/run-tunnel/as-a-service/) that is configured to launch on start.

## Connect from a client machine

### Install `cloudflared` on the client machine

[Download and install](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) `cloudflared` on the client desktop that will connect to the remote desktop. Note that `cloudflared` will need to be installed on each user device that will connect.

### Connect to the remote desktop

1.  Run the following command to create a connection from the device to Cloudflare. Any available port can be specified, but in this example we will use `3389` as it is the default port for RDP connections.

    ```txt
    C:\Cloudflared\bin\cloudflared.exe access rdp --hostname rdp.site.com --url localhost:3389
    ```

    This command can be wrapped as a desktop shortcut so that end users do not need to use the command line.

2.  Open your RDP client and configure the client to point to `localhost:3389`. Do not input the hostname.

3.  When the client launches, `cloudflared` will launch a browser window and prompt the user to authenticate with your SSO provider.

## Configuring A Desktop Shortcut

### Windows

You can help end users connect without requiring the command line by providing them with a shortcut that can be launched from the desktop.

1.  Ensure that `cloudflared.exe` is installed on the end user device and available in the Windows Path.

2.  Right-click on the Windows desktop and select **New > Shortcut**.

3.  In the wizard that appears, paste in the path to your `cloudflared.exe` file, followed by this command with the hostname your team uses:

    ```txt
    C:\Cloudflared\bin\cloudflared.exe access rdp --hostname monday.example.com --url localhost:3389
    ```

4.  Click **Next** and complete the wizard.

    At this point the shortcut will appear on the desktop, and users can launch with a double-click. The shortcut can then be distributed to end users along with `cloudflared`.

## Common issues

- You may get a warning indicating that the `.exe` (`cloudflared.exe`) is unknown. This can be skipped by clicking `More Info` in the dialog box and then clicking **Run Anyway**. This will only appear one time.

- Ensure that RDP is enabled on the target Windows machine. If not, you may encounter an error: `No connection could be made because the target machine actively refused it`.

### macOS

{{<Aside type="note">}}

Before you start, make sure you download an RDP client for macOS.

{{</Aside>}}

macOS users can save a command shortcut that will launch the RDP flow.

1.  The command below can be saved as a `.command` file that can be launched on login:

    ```txt
    var=/Applications/CF-RDP-Tunnel.command &&
    echo "`which cloudflared` access rdp --hostname monday.example.com --url localhost:3389 &" > $var &&
    chmod +x $var
    ```

2.  Check that everything is successful by running the following command:

    ```sh
    $ lsof -nP -iTCP:3389 | grep LISTEN
    ```

    If needed, you can kill the process by running the following command:

    ```sh
    $ sudo kill -9 [process id]
    ```

    The command from Step 1 can then be configured to run at device login by navigating to **System Preferences > Users & Groups**.

3.  Select the `+` sign.

4.  Navigate to **Macintosh HD > Applications**.

5.  Double click on the previously created `CF-RDP-Tunnel.command` file.

    The default behavior in macOS is for the Terminal window to stay open. You can configure it to close automatically.
