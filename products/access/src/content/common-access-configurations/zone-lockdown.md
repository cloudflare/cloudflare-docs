---
order: 5
---

# Migrate from Zone Lockdown

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Some teams use Cloudflare's Zone Lockdown feature alongside their Virtual Private Network deployment to only allow IP ranges in that VPN to connect to applications. This model relies on IP ranges, rather than identity, to control who can reach sensitive applications.

Cloudflare Access can replace Zone Lockdown deployments with a zero-trust model built on your team's SSO. The migration takes less than 10 minutes. Once cutover, end users can deprecate their VPN client and administrators have more granular control and logging over user connections.

## Zone Lockdown

[Zone Lockdown](https://support.cloudflare.com/hc/en-us/articles/115001595131-Understanding-Cloudflare-Zone-Lockdown
) specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL.  Zone Lockdown allows multiple destinations in a single rule as well as IPv4 and IPv6 addresses.  IP addresses not specified in the Zone Lockdown rule are denied access to the specified resources.

## Migration to Cloudflare Access

With Zone Lockdown enabled, your team has already completed [many of the steps required](/getting-started/) to set up Cloudflare Access. Replacing the IP rules with identity-based rules requires the following additional steps.

<Aside>

In both Zone Lockdown and Cloudflare Access, you must ensure that your origin can only accept connects from authenticated requests. Secure your origin with [Argo Tunnel](/setting-up-access/argo-tunnel/) or by [validating JSON Web Tokens](/advanced-management/validating-json/) to prevent unauthorized connections.
</Aside>

1. Navigate to the [Teams dashboard](https://dash.teams.cloudflare.com/). Enable Cloudflare Access for your account.
1. [Integrate](/authentication/configuring-identity-providers/) your organization's identity provider.
1. Selecting `Applications` to begin building an identity-based policy.
1. Choose the hostname protected by Zone Lockdown today. [Add an Access policy](/getting-started/applications/) to only allow connections from users in your organization. Test the connection from an IP allowed by your Zone Lockdown policy.
1. Return to the Firewall tab of the Cloudflare dashboard and remove the Zone Lockdown policies.