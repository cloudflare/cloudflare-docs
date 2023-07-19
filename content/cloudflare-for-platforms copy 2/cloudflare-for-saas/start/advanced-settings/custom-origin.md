---
pcx_content_type: concept
title: Custom origin server
weight: 4
---

# Custom origin server

{{<render file="_custom-origin-server-definition.md">}}

{{<render file="_ssl-for-saas-plan-limitation.md">}}

## Requirements

To use a custom origin server, you need to meet the following requirements:

- Your fallback proxy zone has an entitlement for Custom Origin Servers.
- Each custom origin needs to be a valid hostname with a proxied (orange-clouded) A, AAAA, or CNAME record in your account's DNS. You cannot use an IP address.

## Use a custom origin

To use a custom origin, select that option when [creating a new custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/) in the dashboard or include the `"custom_origin_server": your_custom_origin_server` parameter when using the API [POST command](/api/operations/custom-hostname-for-a-zone-create-custom-hostname).

## SNI rewrites

When Cloudflare establishes a connection to your default origin server, the `Host` header and [SNI](/fundamentals/glossary/#server-name-indication-sni) will both be the value of the original custom hostname.

However, if you configure that custom hostname with a custom origin, the value of the SNI will be that of the custom origin and the `Host` header will be the original custom hostname. Since these values will not match, you will not be able to use the [Full (strict)](/ssl/origin-configuration/ssl-modes/full-strict/) on your origins.

To solve this problem, you can contact your account team to request an entitlement for **SNI rewrites**.

### SNI rewrite options

Choose how your custom hostname populates the SNI value with SNI rewrites:

- **Origin server name** (default): Sets SNI to the custom origin

  - If custom origin is `custom-origin.com`, then the SNI is `custom-origin.com`.

- **Host header**: Sets SNI to the host header (or a host header override)

  - If wildcards are not enabled and the hostname is `example.com`, then the SNI is `example.com`.
  - If wildcards are enabled, the hostname is `example.com`, and a request comes to `www.example.com`, then the SNI is `www.example.com`.

- **Subdomain of zone**: Choose what to set as the SNI value (custom hostname or any subdomain)
  - If wildcards are not enabled and a request comes to `example.com`, choose whether to set the SNI as `example.com` or `www.example.com`.
  - If wildcards are enabled, you set the SNI to `example.com`, and a request comes to `www.example.com`, then the SNI is `example.com`.

{{<Aside type="warning" header="Important">}}

* Currently, SNI Rewrite is not supported for wildcard custom hostnames. Subdomains covered by a wildcard custom hostname send the custom origin server name as the SNI value.

* SNI overrides defined using an Origin Rule will take precedence over SNI rewrites.

{{</Aside>}}

### Set an SNI rewrite

To set an SNI rewrite in the dashboard, choose your preferred option from **Origin SNI value** when [creating a custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/).

To set an SNI rewrite via the API, set the `custom_origin_sni` parameter when [creating a custom hostname](/api/operations/custom-hostname-for-a-zone-create-custom-hostname):

- **Custom origin name** (default): Applies if you do not set the parameter
- **Host header**: Specify `":request_host_header:"`
- **Subdomain of zone**: Set to `"example.com"` or another subdomain of the custom hostname
