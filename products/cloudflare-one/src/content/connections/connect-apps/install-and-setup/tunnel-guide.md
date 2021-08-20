---
order: 3
title: Tunnel guide
pcx-content-type: how-to
---

# Set up your first tunnel

Follow this step-by-step guide to getting your first tunnel up and running. Before you start, make sure you:
1. [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website)
1. [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708)

## 1. Download and install `cloudflared`

<details>
<summary>Windows</summary>
<div>

First, download `cloudflared` on your machine. Visit the [downloads](/connections/connect-apps/install-and-setup/installation) page to find the right package for your OS.

Next, rename the executable to `cloudflared.exe`, and then open PowerShell. Change directory to your Downloads folder and run `.\cloudflared.exe --version`. It should output the version of `cloudflared`. Note that `cloudflared.exe` could be `cloudflared-windows-amd64.exe` or `cloudflared-windows-386.exe` if you haven't renamed it.

Replace the path in the example with the specifics of your Downloads directory:

```text
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
```

### Build from source

You can also build the latest version of `cloudflared` from source with the following steps:

```bash
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

<details>
<summary>macOS</summary>
<div>

The first step to creating a tunnel is to download and install `cloudflared` on your machine.

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

Alternatively, you can [download the latest Darwin amd64 release](/connections/connect-apps/install-and-setup/installation) directly.

</div>
</details>

<details>
<summary>Linux</summary>
<div>

First, download `cloudflared` on your machine. Visit the [downloads](/connections/connect-apps/install-and-setup/installation) page to find the right package for your OS.

Next, install `cloudflared`. 

### .deb install
Use the deb package manager to install `cloudflared` on compatible machines. `amd64 / x86-64` is used in this example.

```sh
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb dpkg -i cloudflared-linux-amd64.deb
```

### ​.rpm install
Use the rpm package manager to install `cloudflared` on compatible machines. `amd64 / x86-64` is used in this example.

```sh
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm
```

### Build from source

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

## 2. Authenticate `cloudflared`

```bash
$ cloudflared tunnel login
```

Running this command will:

* Open a browser window and prompt you to log into your Cloudflare account. After logging into your account, select your hostname. 
* Generate a [cert.pem file](/connections/connect-apps/tunnel-useful-terms#cert-pem). The `cert.pem` file contains account-wide credentials.

## 3. Create a tunnel and give it a name

```bash
$ cloudflared tunnel create <NAME>
```

Running this command will:
* Create a tunnel by establishing a persistent relationship between the [name you provide](/connections/connect-apps/tunnel-useful-terms#tunnel-name) and a [UUID](/connections/connect-apps/tunnel-useful-terms#tunnel-uuid) for your tunnel. At this point, no connection is active within the tunnel yet. 
* Generate a [credentials file](/connections/connect-apps/tunnel-useful-terms#credentials-file). 
* Create a subdomain of `.cfargotunnel.com`.

From the output of the command, take note of the tunnel’s UUID and the path to your tunnel’s credentials file.

## 4. Create a configuration file

Create a [configuration file](/connections/connect-apps/tunnel-useful-terms#configuration-file) in your `.cloudflared` directory using any text editor. This file will configure the tunnel to route traffic from a given origin to the hostname of your choice.

Add the following fields to the file:

**If you’re connecting an application**

```txt
url: http://localhost:8000
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
```

**If you’re connecting a network**

```txt
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
```

## 5. Start routing traffic

Now assign a CNAME record that points traffic to your tunnel subdomain. This record will be easier to remember and share. 

```bash
$ cloudflared tunnel route dns <UUID or NAME> <hostname>
```

You can confirm that the route has been successfully established by running:

```bash
$ cloudflared tunnel route ip show 
```

## 6. Run the tunnel 

Run the tunnel to proxy incoming traffic from the Tunnel to any number of services running locally on your origin. 

```bash
$ cloudflared tunnel --config path/config.yaml run <UUID or NAME>
```

You can also run the tunnel without a configuration file. To do that, run it by adding the necessary [flags](/connections/connect-apps/configuration/config#arguments) after the `run` command and before the name or UUID. For example, running your tunnel with this command way will route all traffic to the given URL:

```bash
$ cloudflared tunnel run --url localhost:3000 <NAME or UUID>
```

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS. For more information, refer to [Run as a service](/connections/connect-apps/run-tunnel/run-as-service).

## 7. Check the tunnel

Your tunnel configuration is complete! Navigate to **Access** > **Tunnels** on the Teams Dashboard to see your tunnel listed as active. If you want to see a list of active tunnels directly from your CLI, you can run:

```bash
$ cloudflared tunnel list
```