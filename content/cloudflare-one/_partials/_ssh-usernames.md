---
_build:
  publishResources: false
  render: never
  list: never
---

The simplest setup is one where a user's Unix username matches their email address prefix.  Issued short-lived certificates will be valid for the user's email address prefix. For example, if a user in your Okta or GSuite organization is registered as `jdoe@example.com`, they would log in to the SSH server as `jdoe`.

For testing purposes, you can run the following command to generate a Unix user on the machine:

```sh
$ sudo adduser jdoe
```

<details>
<summary>Advanced setup: Differing usernames</summary>
<div>

SSH certificates include one or more `principals` in their signature which indicate the Unix usernames the certificate is allowed to log in as. Cloudflare Access will always set the principal to the user's email address prefix. For example, when `jdoe@example.com` tries to connect, Access issues a short-lived certificate authorized for the principal `jdoe`.

By default, SSH servers authenticate the Unix username against the principals listed in the user's certificate. You can configure your SSH server to accept principals that do not match the Unix username.

{{<Aside type="note">}}
Differing usernames do not work with the browser-based terminal. If you would like to use short-lived certificates with the browser-based terminal, you will need your users' usernames to match.
{{</Aside>}}

**Username matches a different email**

To allow `jdoe@example.com` to log in as the user `johndoe`, add the following to the server's `/etc/ssh/sshd_config`:

```txt
Match user johndoe
  AuthorizedPrincipalsCommand /bin/echo 'jdoe'
  AuthorizedPrincipalsCommandUser nobody
```

This tells the SSH server that, when someone tries to authenticate as the user `johndoe`, check their certificate for the principal `jdoe`. This would allow the user `jdoe@example.com` to sign into the server with a command such as:
```sh
$ ssh johndoe@server
```

**Username matches multiple emails**

To allow multiple email addresses to log in as `vmuser`, add the following to the server's `/etc/ssh/sshd_config`:

```txt
Match user vmuser
  AuthorizedPrincipalsFile /etc/ssh/vmusers-list.txt
```

This tells the SSH server to load a list of principles from a file. Then, in `/etc/ssh/vmusers-list.txt`, list the email prefixes that can log in as `vmuser`, one per line:

```txt
jdoe
bwayne
robin
```

**Username matches all users**

To allow any Access user to log in as `vmuser`, add the following command to the server's `/etc/ssh/sshd_config`:

```txt
Match user vmuser
  AuthorizedPrincipalsCommand /bin/bash -c "echo '%t %k' | ssh-keygen -L -f - | grep -A1 Principals"
  AuthorizedPrincipalsCommandUser nobody
```

This command takes the certificate presented by the user and authorizes whatever principal is listed on it.

**Allow all users**

To allow any Access user to log in with any username, add the following to the server's `/etc/ssh/sshd_config`:

```txt
AuthorizedPrincipalsCommand /bin/bash -c "echo '%t %k' | ssh-keygen -L -f - | grep -A1 Principals"
AuthorizedPrincipalsCommandUser nobody
```

Since this will put the security of your server entirely dependent on your Access configuration, make sure your [Access policies](/cloudflare-one/policies/access/policy-management/) are correctly configured.

</div>
</details>
