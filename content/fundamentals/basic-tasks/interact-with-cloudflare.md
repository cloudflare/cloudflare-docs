---
pcx_content_type: concept
title: Interacting with Cloudflare
---

# How to interact with Cloudflare

Once you [set up an account](/fundamentals/setup/account/), you have several ways to interact with Cloudflare.

## Without code

If you prefer working without code, you can manage your account and domain settings through the [Cloudflare dashboard](https://dash.cloudflare.com/login).

{{<Aside type="note">}}

If your domain was added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

{{</Aside>}}

## With code

For those who prefer to interact with Cloudflare programmatically, you can use several methods:

| Resource                                                                               | Docs                                                                 | Description                                                                    |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Cloudflare API](/fundamentals/api/)                                                   | [API docs](/api/)                                                    | RESTful API based on HTTPS requests and JSON responses.                        |
| [Terraform](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) | [Terraform docs](/terraform/)                                        | Configure Cloudflare using HashiCorp’s Infrastructure as Code tool, Terraform. |
| [cloudflare-go](https://github.com/cloudflare/cloudflare-go)                           | [README](https://github.com/cloudflare/cloudflare-go#readme)         | The official Go library for the Cloudflare API.                                |
| [cloudflare-typescript](https://github.com/cloudflare/cloudflare-typescript)           | [README](https://github.com/cloudflare/cloudflare-typescript#readme) | The official Typescript library for the Cloudflare API.                        |
| [cloudflare-python](https://github.com/cloudflare/cloudflare-python)                   | [README](https://github.com/cloudflare/cloudflare-python#readme)     | The official Python library for the Cloudflare API.                            |
