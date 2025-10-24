---
title: 1 –  Initialize Terraform
pcx_content_type: tutorial
sidebar:
  order: 2
head:
  - tag: title
    content: Introduction to Terraform init
description: >-
  This tutorial shows you how to get started with Terraform. You will create a DNS record pointing www.example.com to a web server at 203.0.113.10.
---

import { DashButton, Render } from "~/components";

This tutorial shows you how to get started with Terraform. You just signed up your domain (`example.com`) on Cloudflare to manage everything in Terraform and now you will create a DNS record pointing `www.example.com` to a web server at `203.0.113.10`.

Before you begin, ensure you have:

- [Installed Terraform](/terraform/installing/)
- [Created an API Token](/fundamentals/api/get-started/create-token/) with permissions to edit resources for this tutorial

<Render file="v5-code-snippets" product="terraform" />
## 1. Create your configuration

Create a file named `main.tf`, filling in your own values for the [API token](/fundamentals/api/get-started/create-token/), [zone ID](/fundamentals/account/find-account-and-zone-ids/), [account ID](/fundamentals/account/find-account-and-zone-ids/), and [domain](/fundamentals/manage-domains/add-site/):

```bash
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

provider "cloudflare" {
  api_token = "<YOUR_API_TOKEN>"
}

variable "zone_id" {
  default = "<YOUR_ZONE_ID>"
}

variable "account_id" {
  default = "<YOUR_ACCOUNT_ID>"
}

variable "domain" {
  default = "<YOUR_DOMAIN>"
}

resource "cloudflare_dns_record" "www" {
  zone_id = "<YOUR_ZONE_ID>"
  name    = "www"
  content = "203.0.113.10"
  type    = "A"
  ttl     = 1
  proxied = true
  comment = "Domain verification record"
}
```

:::caution

To prevent accidentally exposing your Cloudflare credentials, do not save this file in your version control system. The [next tutorial](/terraform/tutorial/track-history/) will cover best practices for passing in your API token.
:::

## 2. Initialize and plan

Initialize Terraform to download the Cloudflare provider:

```sh
terraform init
```

Review what will be created:

```sh
terraform plan
```

```sh output

Terraform used the selected providers to generate the following execution plan. Resource actions are
indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_dns_record.www will be created
  + resource "cloudflare_dns_record" "www" {
      + comment             = "Domain verification record"
      + comment_modified_on = (known after apply)
      + content             = "203.0.113.10"
      + created_on          = (known after apply)
      + id                  = (known after apply)
      + meta                = (known after apply)
      + modified_on         = (known after apply)
      + name                = "www"
      + proxiable           = (known after apply)
      + proxied             = true
      + settings            = (known after apply)
      + tags                = (known after apply)
      + tags_modified_on    = (known after apply)
      + ttl                 = 1
      + type                = "A"
      + zone_id             = "<YOUR_ZONE_ID>"
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

## 3. Apply and verify

Apply your configuration:

```sh
terraform apply
```

Type `yes` when prompted.

```sh output
Terraform used the selected providers to generate the following execution plan. Resource actions are
indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_dns_record.www will be created
  + resource "cloudflare_dns_record" "www" {
      + comment             = "Domain verification record"
      + comment_modified_on = (known after apply)
      + content             = "203.0.113.10"
      + created_on          = (known after apply)
      + id                  = (known after apply)
      + meta                = (known after apply)
      + modified_on         = (known after apply)
      + name                = "www"
      + proxiable           = (known after apply)
      + proxied             = true
      + settings            = (known after apply)
      + tags                = (known after apply)
      + tags_modified_on    = (known after apply)
      + ttl                 = 1
      + type                = "A"
      + zone_id             = "<YOUR_ZONE_ID>"
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

cloudflare_dns_record.www: Creating...
cloudflare_dns_record.www: Creation complete after 0s

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

After creation, verify the DNS record:

```sh
dig www.example.com
```

Test the web server response:

```sh
curl https://www.example.com
```

```sh output
Hello, this is 203.0.113.10!
```

To see the full results returned from the API call:

```sh
terraform show
```

You can also check the Cloudflare dashboard and go to the **DNS** > **Records** page.

<DashButton url="/?to=/:account/home" />
