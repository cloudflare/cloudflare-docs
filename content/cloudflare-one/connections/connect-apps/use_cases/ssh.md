---
pcx_content_type: how-to
title: SSH
weight: 8
hidden: false
---

# Connect with SSH through Cloudflare Tunnel

The Secure Shell Protocol (SSH) enables users to remotely access devices through the command line. With Cloudflare Zero Trust, you can make your SSH server available over the Internet without the risk of opening inbound ports on the server.

Cloudflare Zero Trust offers two solutions to provide secure access to SSH servers:

- [Private subnet routing] with Cloudflare WARP to Tunnel
- [Public hostname routing] with `cloudflared access`

In this guide, you will learn how to connect an SSH server to Cloudflare and how to connect to the server as a user.

## Set up an SSH server in GCP

This example walks through how to set up an SSH server on a Google Cloud Platform (GCP) virtual machine (VM), but you can use any machine that supports SSH connections.

### Create an SSH key pair

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
You can configure SSH servers that do not require SSH key and instead rely on Cloudflare Zero Trust policies or [short-lived certificates](/cloudflare-one/identity/users/short-lived-certificates/) to secure the server.
{{</Aside>}}

### Create a VM instance in GCP

Now that the SSH key pair has been created, you can create a VM instance.

1. In your [Google Cloud Console](https://console.cloud.google.com/), [create a new project](https://developers.google.com/workspace/guides/create-project).  
2. Go to **Compute Engine** > **VM instances**.
3. Select **Create instance**.
4. Name your VM instance, for example `ssh-server`.
5. Scroll down to **Advanced options** > **Security** > **Manage Access**.  
6. Under **Add manually generated SSH keys**, select **Add item** and paste the public key that you have created.
7. Select **Create**.
8. Once your VM instance is running, select the **SSH** dropdown and select _Open in browser window_.

{{<Aside type="note">}}
In order to be able to establish an SSH connection, do not enable [OS Login](https://cloud.google.com/compute/docs/oslogin) on the VM instance.
{{</Aside>}}

## Connect to SSH server with WARP to Tunnel

### 1. Set up the client

### 2. Set up the server
After logging in to your SSH server, follow [these instructions](/cloudflare-one/connections/connect-apps/private-net/connect-private-networks/) to connect the server to Cloudflare as a private network application. For **CIDR**, you will enter the IP address of your SSH server (or a range that includes the server IP). In GCP, the server IP is the  **Internal IP** of the VM instance.

### 3. Connect as a user
Once you have set up the application and the user device, the user can now SSH into the machine using its IP address.  If your SSH server requires an SSH key, the key should be included in the command.

```sh
$ ssh -i ~/.ssh/gcp_ssh <username>@<server IP>
```

## Connect to SSH server with `cloudflared access`

Cloudflare Tunnel can also route applications through a public hostname, which allows users to connect to the application without the WARP client. This method requires having `cloudflared` installed on both the server machine and on the client machine. 

The SSH traffic is proxied over this connection, and the user logs in to the server with their Cloudflare Access credentials.

To create a tunnel, follow our [dashboard setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/#1-create-a-tunnel).

The public hostname method can be implemented in conjunction with routing over WARP so that there are multiple ways to connect to the SSH server. You can reuse the same tunnel for both the private network and public hostname routes.

### 1. Connect the server to Cloudflare
  Create a Cloudflare Tunnel by following our [dashboard setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/).

### 2. Route server to public hostname

1. 

3. In the **Public Hostnames** tab, choose a domain from the drop-down menu and specify any subdomain (for example, `ssh.example.com`).

4. For **Service**,  select _SSH_ and enter `localhost:22`.

--------------The original instructions said `http://localhost:22` but this only worked when I selected _SSH_. Otherwise, I got the following error: ----------------
```sh
ranbel@N3PFQMVM4W ~ % ssh -i ~/.ssh/gcp_ssh ranbel@gcp-ssh.rsun.uk
2022-09-02T00:14:20Z ERR failed to connect to origin error="websocket: bad handshake" originURL=https://gcp-ssh.rsun.uk
websocket: bad handshake
kex_exchange_identification: Connection closed by remote host
Connection closed by UNKNOWN port 65535
```

5. Select **Save hostname**.

6. (Recommended) Add a [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) to Cloudflare Access in order to manage access to your server.

### 3. Connect as a user

Users can now connect from their device using `cloudflared`, or from a browser-rendered terminal.

#### Native Terminal

1. [Install `cloudflared`](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) on the client machine.

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

----------------Why do I no longer need to include the key?--------------------
-----------------Should we note to disable the External IP on the server? -------------

When the command is run, `cloudflared` will launch a browser window to prompt you to authenticate with your identity provider before establishing the connection from your terminal.

#### Browser-rendered terminal

End users can connect to the SSH server without any configuration by using Cloudflare’s browser-based terminal. When users visit the URL of the application (`ssh.example.com`) and authenticate, Cloudflare will render a terminal in their browser.

To enable, follow the instructions [here](/cloudflare-one/applications/non-http/#rendering-in-the-browser).
