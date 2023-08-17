---
title: SSH proxy and command logs
pcx_content_type: how-to
weight: 3
---

# Configure SSH proxy and command logs

Cloudflare Zero Trust supports SSH proxying and command logging using Secure Web Gateway and the WARP client.

You can create network policies to manage and monitor SSH access to your applications. When a device connects to your origin server over SSH, a session log will be generated showing which user connected, the session duration, and optionally a full replay of all commands run during the session.

## Prerequisites

- [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/set-up-warp/) on end-user devices.
- [Install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on end-user devices.

## 1. Ensure Unix usernames match user SSO identities

Cloudflare Gateway will take the identity from a token and, using short-lived certificates, authorize the user on the target infrastructure.

{{<render file="_ssh-usernames.md">}}

## 2. Generate a Gateway SSH proxy CA

Instead of traditional SSH keys, Gateway uses short-lived certificates to authenticate traffic between Cloudflare and your origin.

{{<Aside type="note">}}
Other short-lived CAs, such as those used to [secure SSH servers behind Cloudflare Access](/cloudflare-one/identity/users/short-lived-certificates/), are incompatible with the Gateway SSH proxy. For SSH logging to work, you must create a new CA using the `gateway_ca` API endpoint.
{{</Aside>}}

To generate a Gateway SSH proxy CA and get its public key:

1. Make a request to the Cloudflare API with your email address and [API key](/fundamentals/api/get-started/keys/) as request headers.

   ```bash
   curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/access/gateway_ca"\
       -H "X-Auth-Email: <EMAIL>" \
       -H "X-Auth-Key: <API_KEY>"
   ```

2. A success response will include a `public_key` value. Save the key for configuring your server.

## 3. Save your public key

1. Copy the `public_key` value returned by the API request in Step 2.

{{<render file="_ssh-public-key.md">}}

## 4. Modify your SSHD config

{{<render file="_ssh-modify-sshd.md">}}

## 5. Check your SSH port number

Cloudflare's SSH proxy only works with servers running on the default port 22. Open the `sshd_config` file and verify that no other `Port` values are specified.

```sh
$ cat /etc/ssh/sshd_config
```

## 6. Restart your SSH server

{{<render file="_ssh-restart-server.md">}}

## 7. Create an Audit SSH policy

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies**.

2. In the **Network** tab, create a new network policy.

3. Name the policy and specify the [Destination IP](/cloudflare-one/policies/gateway/network-policies/#destination-ip) for your origin server.

4. Add any other conditions to your policy. If a user does not meet the criteria, they will be blocked by default.

5. In the **Action** dropdown, select _Audit SSH_.

6. (Optional) Enable **SSH Command Logging**. If you have not already uploaded an SSH encryption public key, follow the steps in [Configure SSH Command Logging](#optional-configure-ssh-command-logging).

7. Save the policy.

## 8. Connect as a user

Users can use any SSH client to connect to the target resource, as long as they are logged into the WARP client on their device. Cloudflare Zero Trust will authenticate, proxy, and optionally encrypt and record all SSH traffic through Gateway.

Users must specify their desired username to connect with as part of the SSH command:

```sh
$ ssh <username>@<hostname>
```

{{<Aside type="note">}}
If the target resource is already in a user’s `.ssh/known_hosts` file, the user must first remove existing SSH keys before attempting to connect:

```sh
$ ssh-keygen -R <targetIP or hostname>
```

{{</Aside>}}

## (Optional) Configure SSH Command Logging

If you enabled **SSH Command Logging** in an [Audit SSH policy](#7-create-an-audit-ssh-policy), you will need to generate an HPKE key pair and upload the public key to your dashboard.

1. [Download](https://github.com/cloudflare/ssh-log-cli/releases/latest/) the Cloudflare `ssh-log-cli` utility.

2. Using the `ssh-log-cli` utility, generate a public and private key pair.

   ```sh
   $ ./ssh-log-cli generate-key-pair -o sshkey
   $ ls
   README.md	ssh-log-cli	sshkey	sshkey.pub
   ```

   This command outputs two files, an `sshkey.pub` public key and a matching `sshkey` private key.

3. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.

4. In the **SSH encryption public key** field, paste the contents of `sshkey.pub` and select **Save**. Note that this a different public key from the `ca.pub` file you used to configure the origin server.

All proxied SSH commands are immediately encrypted using this public key. The matching private key is required to [view logs](#view-ssh-logs).

## View SSH Logs

1. In Zero Trust, go to **Logs** > **Gateway** > **SSH**.

2. If you enabled the **SSH Command Logging** feature, you can **Download** a session's command log.

3. To decrypt the log, follow the instructions in the [SSH Logging CLI repository](https://github.com/cloudflare/ssh-log-cli/). The following example uses the private key generated in [Configure SSH Command Logging](#optional-configure-ssh-command-logging):

   ```sh
   $ ./ssh-log-cli decrypt -i sshlog -k sshkey
   ```

   This command outputs a `sshlog-decrypted.zip` file with the decrypted logs.
