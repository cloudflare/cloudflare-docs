---

order: 2
---

# Configuring Access with Terraform

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

[Terraform](https://www.terraform.io/) is a tool for building, changing, and versioning infrastructure and provides components and documentation for building [Cloudflare resources](https://www.terraform.io/docs/providers/cloudflare/). Listed below are examples to help you get started with building Access with Terraform. For a more detailed guide on configuring Cloudflare and Terraform, visit our [Getting Started with Terraform and Cloudflare](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/) blog post.

## Create an Application

__NOTE:__ If you haven't installed Terraform, you can do so [here](https://learn.hashicorp.com/terraform/getting-started/install.html).

Before we can do anything, we'll need to create an Access application. Here is an example configuration:
```
provider "cloudflare" {}

variable "domain" {
  default = "example.com"
}

variable "zone_id" {
  default = <CLOUDFLARE_ZONE_ID>
}

resource "cloudflare_access_application" "cf_app" {
  zone_id          = var.zone_id
  name             = "My Example App"
  domain           = var.domain
  session_duration = "24h"
}
```

Next, we need to export our environment variables and secrets:
```
$ export CLOUDFLARE_EMAIL=<CLOUDFLARE_EMAIL>
$ export CLOUDFLARE_API_KEY=<CLOUDFLARE_API_KEY>
```

Now we can run a `terraform plan` which will output any proposed changes. Make sure to review the plan carefully:
```
$ terraform plan

Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_access_application.cf_app will be created
  + resource "cloudflare_access_application" "cf_app" {
      + aud              = (known after apply)
      + domain           = "example.com"
      + id               = (known after apply)
      + name             = "My Example App"
      + session_duration = "24h"
      + zone_id          = "1ce82492016e71df631bf4af9c02587f"
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

If your plan looks accurate and you're comfortable moving forward, you can apply these changes using the `apply` command:
```
$ terraform apply --auto-approve

cloudflare_access_application.cf_app: Creating...
cloudflare_access_application.cf_app: Creation complete after 2s [id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## Create a Policy

After you've created an application, you can start creating policies and attaching them to applications:
```
resource "cloudflare_access_policy" "cf_policy" {
  application_id = cf_app.id
  zone_id        = var.zone_id
  name           = "Example Policy"
  precedence     = "1"
  decision       = "allow"

  include {
    email = ["test@example.com"]
  }
}
```

Next, we'll run a `terraform plan`:
```
$ terraform plan

Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_access_application.cf_app: Refreshing state... [id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_access_policy.cf_policy will be created
  + resource "cloudflare_access_policy" "cf_policy" {
      + application_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      + decision       = "allow"
      + id             = (known after apply)
      + name           = "My Example Policy"
      + precedence     = 1
      + zone_id        = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

      + include {
          + email = [
              + "test@example.com",
            ]
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

If the changes look accurate and you're comfortable moving forward, you can run the `apply` command:
```
$ terraform apply --auto-approve
```

### Configuring an Identity Provider

The example below shows how you can configure an identity provider and attach it to a policy:
```
resource "cloudflare_access_identity_provider" "github_oauth" {
  account_id = <CLOUDFLARE_ACCOUNT_ID>
  name       = "GitHub OAuth"
  type       = "github"
  config {
    client_id     = <GITHUB_CLIENT_ID>
    client_secret = <GITHUB_CLIENT_SECRET>
  }
}

resource "cloudflare_access_policy" "cf_policy" {
  application_id = cloudflare_access_application.cf_app.id
  zone_id        = var.zone_id
  name           = "My Example Policy"
  precedence     = "1"
  decision       = "allow"

  include {
    email = ["test@example.com"]
    github {
      name                 = "My GitHub Org"
      identity_provider_id = cloudflare_access_identity_provider.github_oauth.id
    }
  }
}
```
