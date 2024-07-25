---
title: Install Pulumi
pcx_content_type: how-to
weight: 2
meta:
  title: Install Pulumi
---

# Install Pulumi

Follow the recommended steps for your operating system below. For official instructions on installing Pulumi and other install options, refer to [Install Pulumi](https://www.pulumi.com/docs/install/).

{{<Aside type="note">}}

Pulumi is free, open source, and optionally pairs with the [Pulumi Cloud](https://www.pulumi.com/product/pulumi-cloud/) to make managing infrastructure secure, reliable, and hassle-free.

{{</Aside>}}

{{<Aside type="warning">}}

To avoid resource management conflicts, it’s **always** recommended to manage Pulumi-controlled resources via Pulumi.

{{</Aside>}}

## Installation

### Mac

Install via Homebrew package manager.

```sh
$ brew install pulumi/tap/pulumi
```

### Linux

Use the installation script.

```sh
$ curl -fsSL https://get.pulumi.com | sh
```

### Windows

1. Download the latest installer from the [Pulumi Repository](https://github.com/pulumi/pulumi-winget/releases/latest)
2. Double click the MSI file and complete the wizard.

## Verify installation

To verify your installation, run the following in the terminal:

```sh
$ pulumi version
```

{{<Aside type="note" header="Note">}}

For upgrades and installation alternatives, refer to [Install Pulumi](https://www.pulumi.com/docs/install/).

{{</Aside>}}

## Next steps

Follow the [Hello World tutorial](/pulumi/tutorial/hello-world/) to write a simple Pulumi program. It takes about 10 minutes to complete.