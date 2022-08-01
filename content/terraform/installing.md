---
title: Get started
pcx_content_type: how-to
weight: 2
meta:
  title: Install Terraform
---

# Install Terraform

Terraform ships as a single binary file. The examples below include installation information for popular operating systems.

For official instructions on installing Terraform, refer to [Install Terraform](https://learn.hashicorp.com/terraform).

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

On Linux, download and place the binary in your `PATH`.

```sh
$ wget -q https://releases.hashicorp.com/terraform/0.11.6/terraform_0.11.6_linux_amd64.zip

$ unzip terraform_0.11.6_linux_amd64.zip
Archive:  terraform_0.11.6_linux_amd64.zip
  inflating: terraform

$ sudo mv terraform /usr/local/bin/terraform

$ terraform version
Terraform v0.11.6
```

## Windows

1.  Download the 32 or 64-bit executable from the [Download Terraform](https://www.terraform.io/downloads) page.
2.  Unzip and place `terraform.exe` somewhere in your path.

## Other

For additional installers, refer to the [Download Terraform](https://www.terraform.io/downloads) page.
