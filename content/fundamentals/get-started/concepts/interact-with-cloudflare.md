---
pcx-content-type: concept
title: Interacting with Cloudflare
weight: 4
---

# How to interact with Cloudflare

Once you [set up an account](/fundamentals/get-started/basic-tasks/account-setup/), you have several ways to interact with Cloudflare.

## Without code

For those who prefer "point and click" solutions, you can manage your account and domain settings through the [Cloudflare dashboard](https://dash.cloudflare.com/login).

{{<Aside type="note">}}

If your domain was added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

{{</Aside>}}

## With code

For those who prefer to interact with Cloudflare programmatically, you can use several methods:

| Resource | Docs | Description
| --- | --- | --- |
| [Cloudflare API](https://api.cloudflare.com/#getting-started-endpoints) | [API docs](/api/) | RESTful API based on HTTPS requests and JSON responses. |
| [Terraform](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) | [Terraform docs](/terraform/) | Configure Cloudflare using HashiCorp’s “Infrastructure as Code” tool, Terraform. |
| [Cloudflare Go](https://github.com/cloudflare/cloudflare-go) | [README](https://github.com/cloudflare/cloudflare-go#readme) | A Go library for interacting with Cloudflare's API v4. |