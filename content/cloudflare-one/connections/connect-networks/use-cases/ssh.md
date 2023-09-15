---
pcx_content_type: how-to
title: SSH
weight: 1
---

# Connect with SSH through Cloudflare Tunnel

The Secure Shell Protocol (SSH) enables users to remotely access devices through the command line. With Cloudflare Zero Trust, you can make your SSH server available over the Internet without the risk of opening inbound ports on the server.

Cloudflare Zero Trust offers two solutions to provide secure access to SSH servers:

- [Private subnet routing with Cloudflare WARP to Tunnel](#connect-to-ssh-server-with-warp-to-tunnel)
- [Public hostname routing with `cloudflared access`](#connect-to-ssh-server-with-cloudflared-access)

## Set up an SSH server in GCP

This example walks through how to set up an SSH server on a Google Cloud Platform (GCP) virtual machine (VM), but you can use any machine that supports SSH connections.

### 1. Create an SSH key pair

Before creating your VM instance you will need to create an SSH key pair.

1. Open a terminal and type the following command:
   ```sh
   $ ssh-keygen -t rsa -f ~/.ssh/gcp_ssh -C <username in GCP>
   ```

2. Enter your passphrase when prompted. It will need to be entered twice.

   Two files will be generated: `gcp_ssh` which contains the private key, and `gcp_ssh.pub` which contains the public key.

3. In the command line, enter:
   ```sh
   $ cat ~/.ssh/gcp_ssh.pub
   ```

4. Copy the output. This will be used when creating the VM instance in GCP.

{{<Aside type="note">}}
You can configure SSH servers that do not require SSH keys and instead rely exclusively on Cloudflare Zero Trust policies or [short-lived certificates](/cloudflare-one/identity/users/short-lived-certificates/) to secure the server.
{{</Aside>}}

### 2. Create a VM instance in GCP

Now that the SSH key pair has been created, you can create a VM instance.

1. In your [Google Cloud Console](https://console.cloud.google.com/), [create a new project](https://developers.google.com/workspace/guides/create-project).  
2. Go to **Compute Engine** > **VM instances**.
3. Select **Create instance**.
4. Name your VM instance, for example `ssh-server`.
5. Scroll down to **Advanced options** > **Security** > **Manage Access**.  
6. Under **Add manually generated SSH keys**, select **Add item** and paste the public key that you have created.
7. Select **Create**.
8. Once your VM instance is running, open the dropdown next to **SSH** and select _Open in browser window_.

{{<Aside type="note">}}
In order to be able to establish an SSH connection, do not enable [OS Login](https://cloud.google.com/compute/docs/oslogin) on the VM instance.
{{</Aside>}}

## Connect to SSH server with WARP to Tunnel

{{<render file="_warp-to-tunnel-intro.md">}}

### 1. Connect the server to Cloudflare

{{<render file="_warp-to-tunnel-server.md">}}

### 2. Set up the client

{{<render file="_warp-to-tunnel-client.md">}}

### 3. Route private network IPs through WARP

{{<render file="_warp-to-tunnel-route-ips.md">}}

### 4. Connect as a user

Once you have set up the application and the user device, the user can now SSH into the machine using its private IP address.  If your SSH server requires an SSH key, the key should be included in the command.

```sh
$ ssh -i ~/.ssh/gcp_ssh <username>@<server IP>
```

## Connect to SSH server with `cloudflared access`

{{<render file="_tunnel-cloudflared-access.md">}}

### 1. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following our [dashboard setup guide](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/remote/).

2. In the **Public Hostnames** tab, choose a domain from the drop-down menu and specify any subdomain (for example, `ssh.example.com`).

3. For **Service**,  select _SSH_ and enter `localhost:22`. If the SSH server is on a different machine from where you installed the tunnel, enter `<server IP>:22`.

4. Select **Save hostname**.

5. (Recommended) Add a [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) to Cloudflare Access in order to manage access to your server.

### 2. Connect as a user

Users can connect from their device by [authenticating through `cloudflared`](#native-terminal), or from a [browser-rendered terminal](#browser-rendered-terminal).

#### Native Terminal

1. [Install `cloudflared`](/cloudflare-one/connections/connect-networks/downloads/) on the client machine.

2. Make a one-time change to your SSH configuration file:
   ```sh
   $ vim ~/.ssh/config
   ```

3. Input the following values; replacing `ssh.example.com` with the hostname you created.
   ```txt
   Host ssh.example.com
   ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
   ```

   The `cloudflared` path may be different depending on your OS and package manager. For example, if you installed `cloudflared` on macOS with Homebrew, the path is `/opt/homebrew/bin/cloudflared`.

4. You can now test the connection by running a command to reach the service:

   ```sh
   $ ssh <username>@ssh.example.com
   ```

   When the command is run, `cloudflared` will launch a browser window to prompt you to authenticate with your identity provider before establishing the connection from your terminal.

#### Browser-rendered terminal

End users can connect to the SSH server without any configuration by using Cloudflare’s browser-based terminal. When users visit the public hostname URL (for example, `https://ssh.example.com`) and log in with their Access credentials, Cloudflare will render a terminal in their browser.

To enable, follow the instructions [here](/cloudflare-one/applications/non-http/#rendering-in-the-browser).
