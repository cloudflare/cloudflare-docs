---
title: Publish applications with Terraform
pcx_content_type: overview
weight: 1
layout: learning-unit
---

This guide covers how to use the [Cloudflare Terraform provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) to quickly publish and secure a private application. In the following example, we will add a new public hostname route to an existing Cloudflare Tunnel, configure how `cloudflared` proxies traffic to the application, and secure the application with Cloudflare Access.

## Prerequisities

- [Add your domain to Cloudflare](/learning-paths/zero-trust-web-access/initial-setup/add-site/)
- [Configure an IdP integration](/learning-paths/zero-trust-web-access/initial-setup/configure-idp/)
- [Create a Cloudflare Tunnel](/learning-paths/zero-trust-web-access/connect-private-applications/create-tunnel/#create-a-tunnel) via the Zero Trust dashboard
- Install the [Terraform client](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) (refer to the [minimum required permissions](/cloudflare-one/connections/connect-networks/deploy-tunnels/deployment-guides/terraform/#3-create-a-cloudflare-api-token))

## 1. Create a Terraform configuration directory

{{<render file="terraform/_config-directory.md" productFolder="cloudflare-one">}}

## 2. Declare providers and variables

Create a `.tf` file and copy-paste the following example. Fill in your API token, account and zone information, and Tunnel ID.

{{<details header="Find the Tunnel ID" open="false">}}
1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Networks** > **Tunnels**.
2. Select the tunnel name.
3. Copy the **Tunnel ID**.
{{</details>}}

```txt
---
filename: variables.tf
---
terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = "<API-TOKEN>"
}

variable "account_id" {
  default = "<ACCOUNT-ID>"
}

variable "zone_id" {
  default = "<ZONE-ID>"
}

variable "zone_name" {
  default = "mycompany.com"
}

variable "tunnel_id" {
  default = "<TUNNEL-ID>"
}
```

{{<Aside type="warning">}}
To prevent accidentally exposing your Cloudflare credentials, do not save this file in your version control system. Learn more about [tracking a Terraform configuration](/terraform/tutorial/track-history/).
{{</Aside>}}

## 3. Configure Cloudflare resources

Add the following resources to your Terraform configuration.

### Add public hostname route to Cloudflare Tunnel

Using the [`cloudflare_tunnel_config`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/tunnel_config) resource, create an ingress rule that maps your application to a public DNS record. This example makes `localhost:8080` available on `app.mycompany.com`, sets the [Connect Timeout](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#connecttimeout), and enables [Access JWT validation](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#access).

```txt
---
filename: resources.tf
---
resource "cloudflare_tunnel_config" "example_config" {
  account_id = var.account_id
  tunnel_id  = var.tunnel_id

  config {
    ingress_rule {
      hostname = "app.${var.zone_name}"
      service  = "http://localhost:8080"
      origin_request {
        connect_timeout = "2m0s"
        access {
          required  = true
          team_name = "myteam"
          aud_tag   = [cloudflare_access_application.example_app.aud]
        }
      }
    }
    ingress_rule {
      # Respond with a `404` status code when the request does not match any of the previous hostnames.
      service  = "http_status:404"
    }
  }
}
```

{{<Aside type="note">}}
Public hostname configurations must include a catch-all ingress rule at the bottom of the file.
{{</Aside>}}

### Create an Access application

Using the [`cloudflare_access_application`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/access_application) resource, add the application to Cloudflare Access.

```txt
resource "cloudflare_access_application" "example_app" {
  zone_id                   = var.zone_id
  name                      = "Example application"
  domain                    = "app.${var.zone_name}"
  type                      = "self_hosted"
  session_duration          = "24h"
  auto_redirect_to_identity = false
}
```

### Create an Access policy

Using the [`cloudflare_access_policy`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/access_application) resource, create a policy to secure the application. The folloiwng policy will only allow access to users who authenticate through your identity provider.

```txt
resource "cloudflare_access_policy" "example_policy" {
  application_id    = cloudflare_access_application.example_app.id
  zone_id           = var.zone_id
  name              = "Example policy"
  precedence        = "1"
  decision          = "allow"

  include {
    login_method = ["<IDP-UUID>"]
  }

}

```

## 4. Deploy Terraform

{{<render file="terraform/_deploy-terraform.md" productFolder="cloudflare-one">}}

Users can now access the private application by going to the public URL and authenticating with Cloudflare Access. You can view your new tunnel route, Access application, and Access policy in [Zero Trust](https://one.dash.cloudflare.com). The new DNS record is shown in the [Cloudflare dashboard](https://dash.cloudflare.com).

{{<Aside type="note">}}
If you need to modify the Access application, Access policy or DNS record, you must make the changes via Terraform. Changes made via the dashboard will break Terraform’s state. To prevent this from happening, [set the dashboard to read-only](/cloudflare-one/api-terraform/#set-dashboard-to-read-only).
{{</Aside>}}