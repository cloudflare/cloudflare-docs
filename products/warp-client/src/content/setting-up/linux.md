---
title: Linux
order: 6
---

# Linux desktop client

## Steps to install
1. Find the [setup repository](https://pkg.cloudflareclient.com/).
1. Install the `cloudflare-warp` package depending on your distro:
    1. **apt-based OS** (e.g., Ubuntu) `sudo apt install cloudflare-warp`
    2. **yum-based OS** (e.g., CentOS or RHEL) `sudo yum install cloudflare-warp`

## Using WARP

The command line interface is the primary way to use WARP.

### Initial Connection
To connect for the very first time you must call `register` first:
1. Register the client `warp-cli register`
1. Connect `warp-cli connect`
1. Run `curl https://www.cloudflare.com/cdn-cgi/trace/` and verify that `warp=on`

### Always stay connected
If you want to always stay connected to WARP you must call `enable-always-on`. This is the cli equivalent to switching the toggle switch to the on position in our GUI apps.
1. Run `warp-cli enable-always-on`

### Switching modes
You can use `warp-cli set-mode --help` to get a list of the modes to switch between. For instance:

- DNS Only mode via DoH would be accomplished with `warp-cli set-mode doh`
- WARP with DoH `warp-cli set-mode warp+doh`

### Using 1.1.1.1 for Families
The Linux client supports all 1.1.1.1 for Families modes with either WARP on or in pure DNS only mode
- Families off `warp-cli set-families-mode off`
- Malware protection `warp-cli set-families-mode malware`
- Malware + Adult Content `warp-cli set-families-mode full`

### Additional commands
A complete list of all supported commands can be found by running `warp-cli --help`

## Feedback
You can find logs required to debug WARP issues by running `sudo warp-diag`. This will place a `warp-debugging-info.zip` file in the path from which you ran the command.

To report bugs or provide feedback to the team use the command `sudo warp-diag feedback`. This will submit a support ticket.
