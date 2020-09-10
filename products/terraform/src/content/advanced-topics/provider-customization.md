# Provider customization

Terraform communicates with cloud and edge provider APIs such as Cloudflare through modules known as "providers". These providers are [installed automatically](/tutorial/hello-world/#2-initializing-terraform-and-the-cloudflare-provider) when you run `terraform init` in a directory that has a `.tf` file containing a provider. Typically, the only required parameters to the provider are what's requried to authenticate. In many cases, however, it may make sense to customize the provider to your needs. Below we examine some of the [optional settings](https://www.terraform.io/docs/providers/cloudflare/#argument-reference) that can be passed to the Cloudflare Provider.

## Adjusting the default Cloudflare provider settings

<Aside>

The examples below build on the [Cloudflare Terraform tutorial](/tutorial).

</Aside>

The Cloudflare Terraform provider can be customized through the use of configuration parameters, specified either in your `.tf` configuration files or via environment variables, e.g., `$CLOUDFLARE_RPS`. Using environment variables may make sense when running Terraform from a CI/CD system, or when the change is temporary and doesn't need to be persisted in your configuration history.

### i. Increasing the frequency of API requests

The `api.cloudflare.com` endpoint has a default rate limit of 1200 calls per 5 minute period (as of time of writing; see rate limiting section under [Requests](https://api.cloudflare.com/#getting-started-requests) for updates). Enterprise customers may request this limit be increased by contacting their Customer Success Manager.

Even with an updated rate limit, Terraform will need to stay under this threshold otherwise the Cloudflare API will respond with `HTTP 429/Too Many Requests` responses. When it does, the Cloudflare Terraform provider will back off before retrying. All of these figures can be customized, as shown below.

```sh
$ export CLOUDFLARE_RPS=
$ export CLOUDFLARE_API_CLIENT_LOGGING=true
```
