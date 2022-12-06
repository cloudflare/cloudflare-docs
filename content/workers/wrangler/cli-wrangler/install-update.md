---
pcx_content_type: how-to
title: Install / Update
weight: 1
---

# Install / Update

{{<Aside type="warning">}}

The version of Wrangler you are using is now deprecated. Refer to the [Migration guide](/workers/wrangler/cli-wrangler/migration/migrating-from-wrangler-1/#update-wrangler-version) to update to the latest version of Wrangler to prevent critical errors.

If you originally installed Wrangler via npm, run `npm uninstall -g @cloudflare/wrangler && npm install -g wrangler` to update to the latest version.

If you originally installed Wrangler via cargo, run `cargo uninstall wrangler && npm install -g wrangler`.

{{</Aside>}}

## Install

### Install with `npm`

```sh
$ npm i @cloudflare/wrangler -g
```

{{<Aside type="note" header="EACCESS error">}}

You may have already installed npm. It is possible that an `EACCES` error may be thrown while installing Wrangler. This is related to how many systems install the npm binary. It is recommended that you reinstall npm using a Node version manager like [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) or [Volta](https://volta.sh/).

{{</Aside>}}

### Install with `cargo`

Assuming you have Rust’s package manager, [Cargo](https://github.com/rust-lang/cargo), installed, run:

```sh
$ cargo install wrangler
```

Otherwise, to install Cargo, you must first install rustup. On Linux and macOS systems, `rustup` can be installed as follows:

```sh
$ curl https://sh.rustup.rs -sSf | sh
```

Additional installation methods are available [on the Rust site](https://forge.rust-lang.org/other-installation-methods.html).

Windows users will need to install Perl as a dependency for `openssl-sys` — [Strawberry Perl](https://www.perl.org/get.html) is recommended.

After Cargo is installed, you may now install Wrangler:

```sh
$ cargo install wrangler
```

{{<Aside type="note" header="Customize OpenSSL">}}

By default, a copy of OpenSSL is included to make things easier during installation, but this can make the binary size larger. If you want to use your system's OpenSSL installation, provide the feature flag `sys-openssl` when running install:

```sh
$ cargo install wrangler --features sys-openssl
```

{{</Aside>}}

### Manual install

1.  Download the binary tarball for your platform from the [releases page](https://github.com/cloudflare/wrangler-legacy/releases). You do not need the `wranglerjs-*.tar.gz` download – Wrangler will install that for you.

2.  Unpack the tarball and place the Wrangler binary somewhere on your `PATH`, preferably `/usr/local/bin` for Linux/macOS or `Program Files` for Windows.

## Update

To update [Wrangler](https://github.com/cloudflare/wrangler-legacy), run one of the following:

### Update with `npm`

```sh
$ npm update -g @cloudflare/wrangler
```

### Update with `cargo`

```sh
$ cargo install wrangler --force
```
