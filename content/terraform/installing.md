---
title: Get started
pcx_content_type: how-to
weight: 2
meta:
  title: Install Terraform
---

# Install Terraform

Terraform ships as a single binary file. The examples below include installation information for popular operating systems.

For official instructions on installing Terraform, refer to [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli).

{{<Aside type="warning">}} 

Terraform maintains your configuration state, this can be broken when configuration changes are made through both Terraform and directly via either the Cloudflare Dashboard or API.  If you are using Terraform, it is recommended that changes are no longer make to zones manually via the Cloudflare Dashboard or Cloudflare API and to use only Terraform to maintain the zone's configuration. This will avoid issues with consistency.

{{</Aside>}}

## Mac

The easiest way to install Terraform on macOS is with Homebrew.

```sh
$ brew install terraform

==> Downloading https://homebrew.bintray.com/bottles/terraform-0.11.6.sierra.bottle.tar.gz
######################################################################## 100.0%
==> Pouring terraform-0.11.6.sierra.bottle.tar.gz
🍺  /usr/local/Cellar/terraform/0.11.6: 6 files, 80.2MB

$ terraform version
Terraform v0.11.6
```

## Linux

You can install the `terraform` binary via your distribution's package manager. For example:

```sh
$ sudo apt install terraform
```

Alternatively, you can fetch a specific version directly and place the binary in your `PATH`:

```sh
$ wget -q https://releases.hashicorp.com/terraform/1.4.5/terraform_1.4.5_linux_amd64.zip

$ unzip terraform_1.4.5_linux_amd64.zip
Archive:  terraform_1.4.5_linux_amd64.zip
  inflating: terraform

$ sudo mv terraform /usr/local/bin/terraform

$ terraform version
Terraform v1.4.5
```

## Windows

1.  Download the 32 or 64-bit executable from the [Download Terraform](https://developer.hashicorp.com/terraform/downloads) page.
2.  Unzip and place `terraform.exe` somewhere in your path.

## Other

For additional installers, refer to the [Download Terraform](https://developer.hashicorp.com/terraform/downloads) page.
