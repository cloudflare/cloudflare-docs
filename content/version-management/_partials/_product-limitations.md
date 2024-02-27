---
_build:
  publishResources: false
  render: never
  list: never
---

Version Management does not currently support or have limited support for the following products or features: 
- [Waiting Room](/waiting-room/)
  - Users active on the site may be placed back in the queue.
  - Users in the queue may lose their place in line.
  - Traffic may exceed limits.
- [China Network](/china-network/)
  - Regardless of the version deployed to production, traffic in China will always target the root zone.
  - Other incompatibility issues with Access and ICP licenses.
- [WAF Attack Score](/waf/about/waf-attack-score/)
  - WAFML settings are not cloned when a new zone version is created.
- [API Shield](/api-shield/)
  - Some API Shield settings are not cloned when a new zone version is created.
  - Customers are allowed to opt-in to remove the UI block that prevents enabling Version Management.
- [Cache](/workers/runtime-apis/cache/)
  - Cache settings are versioned, but cache keys are not.
  - Caching a new URL on staging would cache it for production as well.
  - Purging cache on staging would purge it on production too.
  - Promoting a new version to production would wipe all exiting cache.
- [Workers Cache API](/workers/runtime-apis/cache/)
  - Product incompatibility issues.
  - Workers Cache API does not work with Version Management.
- [Cache Rules](/cache/how-to/cache-rules/) when used with [Cloudflare Images](/images/)
  - Product incompatibility issues.
  - Image Resizing does not work with `additional_cacheable_ports` Cache Rule setting and Zone Versioning.
- [Domain Scoped Roles](/fundamentals/setup/manage-members/roles/#domain-scoped-roles)
  - Domain Scoped Roles apply only to your root zone.
  - Once a new version is created, these roles do not copy over and they lose access to versions.
- [Security Insights](/security-center/security-insights/)
  - Security findings are not shown when Zone Versioning is enabled and the first version is deployed to production.
- [Network Error Logging](/network-error-logging/)
  - NEL settings are not cloned when a new version is created.
- [Wrangler](/workers/wrangler/)
  - If a version has a worker route, it might disappear when a worker is deployed via Wrangler.
  - If two versions have the same custom domains, the worker might randomly choose between them.
- [Cloudflare API](/api/)
  - Zone Version Management does not currently expose a public API.
  - Customers can only use Version Management through the Cloudflare dashboard.
- [Terraform](/terraform/)
  - Zone Version Management does not currently support Terraform.
  - Customers should either use Terraform or Version Management.