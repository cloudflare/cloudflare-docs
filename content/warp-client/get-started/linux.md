---
title: Linux
pcx-content-type: how-to
weight: 0
meta:
  title: Linux desktop client
---

# Linux desktop client

You have two ways of installing WARP on Linux, depending on the distro you are using:

- Find the latest WARP client.
  - [Package repository](https://pkg.cloudflareclient.com/packages/cloudflare-warp).
  - [APT/YUM repository](https://pkg.cloudflareclient.com/install).
- Install the `cloudflare-warp` package that suits your distro:
  - **apt-based OS** (like Ubuntu): `sudo apt install cloudflare-warp`.
  - **yum-based OS** (like CentOS or RHEL): `sudo yum install cloudflare-warp`.

{{<Aside type="note">}}

If you get an error message when trying to install via the terminal, download the package that suits your distro from the [package repository](https://pkg.cloudflareclient.com/packages/cloudflare-warp).

{{</Aside>}}

## Using WARP

The command line interface is the primary way to use WARP.

### Initial Connection

To connect for the very first time you must call `register` first:

1. Register the client `warp-cli register`.
2. Connect `warp-cli connect`.
3. Run `curl https://www.cloudflare.com/cdn-cgi/trace/` and verify that `warp=on`.

### Always stay connected

If you want to always stay connected to WARP you must call `enable-always-on`. This is the `cli` equivalent to switching the toggle switch to the `on` position in our GUI apps.

To enable this feature, run:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">warp-cli enable-always-on</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Switching modes

You can use `warp-cli set-mode --help` to get a list of the modes to switch between. For example:

- **DNS only mode via DoH:** `warp-cli set-mode doh`.
- **WARP with DoH:** `warp-cli set-mode warp+doh`.

### Using 1.1.1.1 for Families

The Linux client supports all 1.1.1.1 for Families modes, in either WARP on DNS-only mode:

- **Families mode off:** `warp-cli set-families-mode off`
- **Malware protection:** `warp-cli set-families-mode malware`
- **Malware and adult content:** `warp-cli set-families-mode full`

### Additional commands

A complete list of all supported commands can be found by running:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">warp-cli --help</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Feedback

You can find logs required to debug WARP issues by running `sudo warp-diag`. This will place a `warp-debugging-info.zip` file in the path from which you ran the command.

To report bugs or provide feedback to the team use the command `sudo warp-diag feedback`. This will submit a support ticket.