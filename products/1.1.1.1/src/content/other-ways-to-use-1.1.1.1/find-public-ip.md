---
order:
pcx-content-type: tutorial
---

# Find public IP address

With a Linux distribution that has `dig` available, you can use `dig` to find public IP address through Cloudflare.

```shell
$ dig +short @1.1.1.1 ch txt whoami.cloudflare
```

You can also find your IPv6 address through this command.

```shell
$ dig +short @2606:4700:4700::1111 -6 ch txt whoami.cloudflare
```

## Troubleshooting

Some distros don't have `dig` available by default. In this case you'll need to install the distro specific package for `dig`.

### Debian

```shell
$ sudo apt install dnsutils
```
