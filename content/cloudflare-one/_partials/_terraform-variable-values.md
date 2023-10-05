---
_build:
  publishResources: false
  render: never
  list: never
---

1. In your configuration directory, create a `.tfvars` file:

    ```sh
    $ touch terraform.tfvars
    ```

    Terraform will automatically use these variables if the file is named `terraform.tfvars`, otherwise the variable file will need to be manually passed in.

2. Add the following variables to `terraform.tfvars`. Be sure to modify the example with your own values.

    ```txt
    ---
    filename: terraform.tfvars
    ---
    cloudflare_zone           = "example.com"
    cloudflare_zone_id        = "023e105f4ecef8ad9ca31a8372d0c353"
    cloudflare_account_id     = "372e67954025e0ba6aaa6d586b9e0b59"
    cloudflare_email          = "user@example.com"
    cloudflare_token          = "y3AalHS_E7Vabk3c3lX950F90_Xl7YtjSlzyFn_X"
    gcp_project_id            = "testvm-123"
    zone                      = "us-central1-a"
    machine_type              = "e2-medium"
    ```

{{<Aside type="warning">}}
 To prevent accidentally exposing sensitive credentials, do not save `terraform.tfvars` in your version control system. For example, if your version control is git, add `terraform.tfvars` to your `.gitignore` file.
{{</Aside>}}