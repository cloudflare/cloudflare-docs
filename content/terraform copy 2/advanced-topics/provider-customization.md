---
pcx_content_type: reference
title: Provider customization
---

# Provider customization

Terraform communicates with cloud and global network provider APIs such as Cloudflare through modules known as providers. These providers are [installed automatically](/terraform/tutorial/initialize-terraform/#2-initialize-terraform-and-the-cloudflare-provider) when you run `terraform init` in a directory that has a `.tf` file containing a provider.

Typically, the only required parameters to the provider are those required to authenticate. However, you may want to customize the provider to your needs. The following section covers some [optional settings](https://www.terraform.io/docs/providers/cloudflare/#argument-reference) that you can pass to the Cloudflare Terraform provider.

## Adjust the default Cloudflare provider settings

{{<Aside type="note">}}
The examples below build on the [Cloudflare Terraform tutorial](/terraform/tutorial/).
{{</Aside>}}

You can customize the Cloudflare Terraform provider using configuration parameters, specified either in your `.tf` configuration files or via environment variables, such as `$CLOUDFLARE_RPS`. Using environment variables may make sense when running Terraform from a CI/CD system or when the change is temporary and does not need to be persisted in your configuration history.

### Increase the frequency of API requests

The `api.cloudflare.com` endpoint has a default rate limit of 1,200 calls per five minute period, or four requests per second (refer to [API Rate Limits](/fundamentals/api/reference/limits/)). Terraform will need to stay below the defined threshold or the Cloudflare API will respond with `HTTP 429 - Too Many Requests` responses. When this happens, the Cloudflare Terraform provider will back off before retrying.

Enterprise customers may request a limit increase by contacting their account team. You can then configure the Cloudflare Terraform provider to make API calls at a faster rate. For example, you can increase the API request frequency by setting environment variables:

```sh
# Remove requests-per-second (RPS) limit for API calls performed by Terraform (default: 4).
$ export CLOUDFLARE_RPS=
# Print logs from the API client using the default log library logger (default: false).
$ export CLOUDFLARE_API_CLIENT_LOGGING=true
# Maximum backoff period in seconds after failed API calls (default: 30).
$ export CLOUDFLARE_MAX_BACKOFF=20
```


