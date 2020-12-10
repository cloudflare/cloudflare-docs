---
order: 0
---

# Install / Update

## Install

### Install with `npm`

```sh
$ npm i @cloudflare/wrangler -g
```

### Install with `cargo`

```sh
$ cargo install wrangler
```

If you don’t have `cargo` or `npm` installed, you will need to follow these [additional instructions](#additional-installation-instructions).

## Additional Installation Instructions

Wrangler can be installed both through [npm](https://www.npmjs.com/get-npm) and through Rust’s package manager, [Cargo](https://github.com/rust-lang/cargo).

### Using `npm`

1. If you don’t already have npm on your machine, install it using [npm’s instructions](https://www.npmjs.com/get-npm) — we recommend using a Node version manager like [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating).

    If you have already installed npm with a package manager, it is possible you will run into an `EACCES` error while installing wrangler. This is related to how many system packagers install npm. You can either uninstall npm and reinstall using the npm recommended install method (a version manager), or use one of our other install methods.

2. Install Wrangler by running:

    ```sh
    $ npm i @cloudflare/wrangler -g
    ```

### Using `cargo`

1. Install `cargo`:

    Rustup, a tool for installing Rust, will also install Cargo. On Linux and macOS systems, `rustup` can be installed as follows:

    ```sh
    $ curl https://sh.rustup.rs -sSf | sh
    ```

    Additional installation methods are available [on the Rust site](https://forge.rust-lang.org/other-installation-methods.html).

2. Install `wrangler`:

    ```sh
    $ cargo install wrangler
    ```

    By default we vendor OpenSSL to make things easier when installing, but this can make the binary size a bit larger. If you want to use your system OpenSSL, provide the feature flag `sys-openssl` when running install.

    ```sh
    $ cargo install wrangler --features sys-openssl
    ```

### Manual Install

1. Download the binary tarball for your platform from our [releases page](https://github.com/cloudflare/wrangler/releases). You don’t need to download wranglerjs, wrangler will install that for you.

2. Unpack the tarball and place the binary `wrangler` somewhere on your `PATH`, preferably `/usr/local/bin` for Linux/macOS or `Program Files` for Windows.

## Update

To update [Wrangler](https://github.com/cloudflare/wrangler), follow the below instructions (customized for either an NPM or Cargo install):

**Updating Wrangler with NPM:**

```sh
$ npm uninstall -g @cloudflare/wrangler && npm install -g @cloudflare/wrangler
```

**Updating Wrangler with Cargo:**

```sh
$ cargo install wrangler --force
```
