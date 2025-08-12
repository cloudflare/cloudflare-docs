---
pcx_content_type: troubleshooting
title: Error 1016
source: null
---

## Error 1016: Origin DNS error

This error indicates that Cloudflare cannot resolve the origin web server's IP address.

### Common cause

Common causes for error `1016` are:

- A missing DNS A record that mentions origin IP address.
- A CNAME record in the Cloudflare DNS points to an unresolvable external domain.
- The origin hostnames (CNAMEs) in your Cloudflare [Load Balancer](/load-balancing/) default, region, and fallback pools are unresolvable. Use a fallback pool configured with an origin IP as a backup in case all other pools are unavailable.
- When creating a Spectrum app with a CNAME origin, you need first to create a CNAME on the Cloudflare DNS side that points to the origin. Please see [Spectrum CNAME origins](/spectrum/get-started/#create-a-spectrum-application-using-a-cname-record) for more details.
- There is no DNS record for the hostname in the target [Partial (CNAME) setup zone](/dns/zone-setups/partial-setup/) of a Workers subrequest ([Fetch API](/workers/runtime-apis/fetch/)).

### Resolution

To resolve error `1016`:

1. Verify your Cloudflare DNS settings include an A record that points to a valid IP address that resolves via a [DNS lookup tool](https://dnschecker.org/).
2. For a CNAME record pointing to a different domain, ensure that the target domain resolves via a [DNS lookup tool](https://dnschecker.org/).
3. For a Workers subrequest to a Partial (CNAME) setup zone, ensure that the hostname exists on the Cloudflare zone (and not only at the authoritative DNS).

## Error 1016 in the context of SSL for SaaS

Cloudflare returns a `1016` error when the [custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/) cannot be routed or proxied.

### Common cause

- Custom hostname ownership validation is not complete.
- Fallback origin is not [correctly set](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#1-create-fallback-origin).
- A wildcard custom hostname has been created, but the requested hostname is associated with a domain that exists in Cloudflare as a standalone zone.
- There is no DNS record for the hostname in the Cloudflare for SaaS target zone.

### Resolution

1. To check validation status, run an API call to [search for a certificate by hostname](/cloudflare-for-platforms/cloudflare-for-saas/start/common-api-calls/) and check the verification error field: `"verification_errors": ["custom hostname does not CNAME to this zone."]`. The error will be resolved once the status is `active`.
2. Confirm that you have created a DNS record for the [fallback origin](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) and also set the fallback origin.
3. The [hostname priority](/ssl/reference/certificate-and-hostname-priority/#hostname-priority) for the standalone zone will take precedence over the wildcard custom hostname. This behavior applies even if there is no DNS record for this standalone zone hostname. Use a specific hostname instead of a wildcard or [remove the standalone zone from Cloudflare](/fundamentals/manage-domains/remove-domain/).
4. Make sure that each hostname that needs to be served by the Cloudflare for SaaS parent zone has been added as an individual custom hostname and has the status `active`.

## Workers

If you encounter this error with a Worker, you might be using the [Fetch API in a partial zone setup](/workers/platform/known-issues/#fetch-api-in-cname-setup).
