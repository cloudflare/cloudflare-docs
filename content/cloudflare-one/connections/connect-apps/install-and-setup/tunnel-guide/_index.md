---
title: Tunnel guide
pcx_content_type: how-to
weight: 3
meta:
  title: Set up your first tunnel
---

# Set up your first tunnel

When setting up your first Cloudflare Tunnel, you have the option to create it:

* [Remotely on the Zero Trust dashboard](#set-up-a-tunnel-remotely-dashboard-setup)
* [Locally, using your CLI](#set-up-a-tunnel-locally-cli-setup)

## Prerequisites

Before you start, make sure you:

* [Add a website to Cloudflare](/fundamentals/get-started/setup/add-site/).
* [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708).

## Set up a tunnel remotely (Dashboard setup)

Follow this step-by-step guide to get your first tunnel up and running using the Zero Trust dashboard.

### 1. Create a tunnel

1. Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and navigate to **Access** > **Tunnels**. 

2. Click **Create a tunnel**.

3. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).

4. Click **Save tunnel**.

5. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.

6. Once the command has finished running, your connector will appear on the Zero Trust dashboard.

    ![Connector appearing in the UI after cloudflared has run](/cloudflare-one/static/documentation/connections/connect-apps/connector.png)

7. Click **Next**.

The next steps depend on whether you want to [connect an application](#connect-an-application) or [connect a network](#connect-a-network).

### 2. Connect an application

Follow these steps to connect an application through your tunnel. If you are looking to connect a network, skip to the [Connect a network section](#connect-a-network).

1. In the **Public Hostnames** tab, select an application from the drop-down menu and specify any subdomain or path information.

2. Specify a service, for example `https://localhost:8000`.

3. Under **Additional application settings**, specify any parameters you would like to add to your tunnel configuration.

4. Click **Save `<tunnel-name>`**.

### 3. Connect a network

Follow these steps to connect a private network through your tunnel.

1. In the **Private Networks** tab, add an IP or CIDR.

2. Click **Save `<tunnel-name>`**.

### 4. View your tunnel

Once you click **Save `<tunnel-name>`**, you will be redirected to the **Tunnels** page. Look for your new tunnel to be listed along with its active connector.

![Tunnel appearing in the Tunnels table](/cloudflare-one/static/documentation/connections/connect-apps/tunnel-table.png)

{{<Aside type="note" header="Troubleshooting">}}
 
If you run into issues during the remote setup process, refer to the [Tunnel FAQ](/cloudflare-one/faq/cloudflare-tunnels-faq/#how-can-i-troubleshoot-a-tunnel-that-was-configured-from-the-zero-trust-dashboard) for troubleshooting tips.
 
{{</Aside>}}

## Set up a tunnel locally (CLI setup)

Follow this step-by-step guide to get your first tunnel up and running using the CLI.

### 1. Download and install `cloudflared`

<details>
<summary>Windows</summary>
<div>

First, download `cloudflared` on your machine. Visit the [downloads](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) page to find the right package for your OS.

Next, rename the executable to `cloudflared.exe`, and then open PowerShell. Change directory to your Downloads folder and run `.\cloudflared.exe --version`. It should output the version of `cloudflared`. Note that `cloudflared.exe` could be `cloudflared-windows-amd64.exe` or `cloudflared-windows-386.exe` if you haven't renamed it.

Replace the path in the example with the specifics of your Downloads directory:

```text
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
```

</div>
</details>

<details>
<summary>macOS</summary>
<div>

The first step to creating a tunnel is to download and install `cloudflared` on your machine.

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

Alternatively, you can [download the latest Darwin amd64 release](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) directly.

</div>
</details>

<details>
<summary>Linux</summary>
<div>

First, download `cloudflared` on your machine. Visit the [downloads](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) page to find the right package for your OS.

Next, install `cloudflared`.

#### .deb install

Use the deb package manager to install `cloudflared` on compatible machines. `amd64 / x86-64` is used in this example.

```sh
$ wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && dpkg -i cloudflared-linux-amd64.deb
```

#### ​.rpm install

Use the rpm package manager to install `cloudflared` on compatible machines. `amd64 / x86-64` is used in this example.

```sh
$ wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm
```

</div>
</details>

<details>
<summary>Build from source</summary>
<div>

You can also build the latest version of `cloudflared` from source with the following steps.

```sh
$ git clone https://github.com/cloudflare/cloudflared.git
$ cd cloudflared
$ make cloudflared
$ go install github.com/cloudflare/cloudflared/cmd/cloudflared
```

Depending on where you installed `cloudflared`, you can move it to a known path as well.

```bash
mv /root/cloudflared/cloudflared /usr/bin/cloudflared
```

</div>
</details>

### 2. Authenticate `cloudflared`

```bash
$ cloudflared tunnel login
```

Running this command will:

- Open a browser window and prompt you to log in to your Cloudflare account. After logging in to your account, select your hostname.
- Generate an account certificate, the [cert.pem file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#cert-pem), in the [default `cloudflared` directory](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#default-cloudflared-directory).

### 3. Create a tunnel and give it a name

```bash
$ cloudflared tunnel create <NAME>
```

Running this command will:

- Create a tunnel by establishing a persistent relationship between the [name you provide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#tunnel-name) and a [UUID](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#tunnel-uuid) for your tunnel. At this point, no connection is active within the tunnel yet.
- Generate a [tunnel credentials file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#credentials-file) in the [default `cloudflared` directory](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#default-cloudflared-directory).
- Create a subdomain of `.cfargotunnel.com`.

From the output of the command, take note of the tunnel’s UUID and the path to your tunnel’s credentials file.

Confirm that the tunnel has been successfully created by running:

```bash
$ cloudflared tunnel list
```

### 4. Create a configuration file

Create a [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file) in your `.cloudflared` directory using any text editor. This file will configure the tunnel to route traffic from a given origin to the hostname of your choice. 

Add the following fields to the file:

**If you are connecting an application**

```txt
url: http://localhost:8000
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
```

**If you are connecting a network**

```txt
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
warp-routing:
  enabled: true
```

Confirm that the configuration file has been successfully created by running:

```bash
$ cat config.yml
```

### 5. Start routing traffic

Now assign a CNAME record that points traffic to your tunnel subdomain.

**If you are connecting an application**

```bash
$ cloudflared tunnel route dns <UUID or NAME> <hostname>
```

**If you are connecting a network**

Add the IP/CIDR you would like to be routed through the tunnel.

```bash
$ cloudflared tunnel route ip add <IP/CIDR> <UUID or NAME>
```

You can confirm that the route has been successfully established by running:

```bash
$ cloudflared tunnel route ip show
```

### 6. Run the tunnel

Run the tunnel to proxy incoming traffic from the tunnel to any number of services running locally on your origin.

```bash
$ cloudflared tunnel run <UUID or NAME>
```

If your configuration file has a custom name or is not in the `.cloudflared` directory, add the `--config` flag and specify the path.  

```sh
$ cloudflared tunnel --config /path/your-config-file.yaml run
```

{{<Aside>}}

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS. For more information, refer to [Run as a service](/cloudflare-one/connections/connect-apps/run-tunnel/as-a-service/).

{{</Aside>}}

### 7. Check the tunnel

Your tunnel configuration is complete! If you want to get information on the tunnel you just created, you can run:

```bash
$ cloudflared tunnel info
```