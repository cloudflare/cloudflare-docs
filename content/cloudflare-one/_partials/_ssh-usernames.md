---
_build:
  publishResources: false
  render: never
  list: never
---

The simplest setup is one where a user's Unix username matches their email address prefix. 
Issued short-lived certificates will be valid for the user's email address prefix.
For example, if user `jdoe@example.com` connects to `vm.example.com`, they would try to sign in as the user `jdoe`.

For testing purposes, you can run the following command to generate a Unix user on the machine:

```sh
$ sudo adduser jdoe
```

<details>
<summary>Advanced Setup: Differing usernames</summary>
<div>

SSH certificates have no concept of username, and instead authorize users to a "principal".
When `jdoe@example.com` tries to connect to `vm.example.com`, the short-lived certificate is authorized for the principal `jdoe`.

By default, an SSH server will authenticate the username against the list of principals in the user's cert.
However, you can override this behavior by instead offering a command to say which principals are authorized.

If you'd like to allow `jdoe@example.com` to log in as the user `johndoe`, you can add the following to the server's `/etc/ssh/sshd_config`:
```sh
Match user 'johndoe'
  AuthorizedPrincipalsCommand echo 'jdoe'
  AuthorizedPrincipalsCommandUser nobody
```
This tells the ssh server that, when someone tries to authenticate as the user `johndoe`, check their certificate for the principal `jdoe`.

If you'd like to authorize multiple users, replace the `AuthorizedPrincipalsCommand` above with one to echo multiple usernames, separated by `\n`.
For example, to allow `jdoe@example.com` and `bwayne@example.com` to both log in as `vmuser`:

```sh
Match user 'vmuser'
  AuthorizedPrincipalsCommand echo -e 'jdoe\nbwayne'
  AuthorizedPrincipalsCommandUser nobody
```

Alternatively, you can specify a list of principals (in this case, usernames from users' emails) in a file, and pass that to ssh instead:

```sh
Match user 'vmuser'
  AuthorizedPrincipalsFile /etc/ssh/vmusers-list.txt
```

Then, in `/etc/ssh/vmusers-list.txt`, list the users that can sign in as `vmuser`, one per line:

```text
jdoe
bwayne
robin
```

For any of these configs you'll also need the `TrustedUserCAKeys` option, as documented below.
</div>
</details>

<details>
<summary>Advanced Setup: Allowing any user to log in</summary>
<div>

If you'd like to allow any user to log in as a particular user, you can add the following command to the server's `/etc/ssh/sshd_config`:

```sh
Match user 'vmuser'
  AuthorizedPrincipalsCommand bash -c "echo '%t %k' | ssh-keygen -L -f - | grep -A1 Principals"
  AuthorizedPrincipalsCommandUser nobody
```

(there's no way to tell sshd to allow any verified certificate, so this takes the certificate presented by the user and authorizes whatever principal is listed on it)

Or, to allow any Access user to log in as any user:

```sh
AuthorizedPrincipalsCommand bash -c "echo '%t %k' | ssh-keygen -L -f - | grep -A1 Principals"
AuthorizedPrincipalsCommandUser nobody
```

(the same options, but without the `Match` block above it)

This will put the security of your server entirely dependent on your Access configuration, so make extra sure your [access policies](/cloudflare-one/policies/access/policy-management/) are correctly configured.

For any of these configs you'll also need the `TrustedUserCAKeys` option, as documented below.
</div>
</details>