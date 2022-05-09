---
_build:
  publishResources: false
  render: never
  list: never
---

In order to match a user to their SSO identity, the user's Unix username must match their email address prefix. For example, `jdoe` must be registered in your Okta or GSuite organization as `jdoe@example.com`.

You can create a user entry with duplicate `uid`, `gid`, and home directory to link an identity to an existing user with a different username. You will need to create a password for it separately and add it to the same groups to replicate permissions.

For testing purposes, you can run the following command to generate a Unix user on the machine:

```sh
$ sudo adduser jdoe
```
