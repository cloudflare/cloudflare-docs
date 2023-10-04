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

## Mac

Install via Homebrew package manager.

```bash
$ brew install pulumi/tap/pulumi
```

## Linux

Use the installation script.

```bash
$ curl -fsSL https://get.pulumi.com | sh
```

## Windows

1. Download the latest installer from the [Pulumi Repository](https://github.com/pulumi/pulumi-winget/releases/latest)
2. Double click the msi file and complete the wizard.

# Verify installation

In the terminal run:

```bash
$ pulumi version
```

Note: For upgrades and installation alternatives refer to [Install Pulumi](https://www.pulumi.com/docs/install/).

<!-- # Next steps

Visit the [Get started tutorial](TODO) to write a simple Pulumi program. It takes about 10 minutes to complete. -->