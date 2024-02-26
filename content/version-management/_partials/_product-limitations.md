---
_build:
  publishResources: false
  render: never
  list: never
---

Version Management does not currently support or have limited support for the following products or features: 

{{<details header="API Shield">}}
- Some API Shield settings are not cloned when a new zone version is created.
- Customers are allowed to opt-in to remove the UI block that prevents enabling Version Management.
{{</details>}}

{{<details header="Cache">}}
- Cache settings are versioned, but cache keys are not.
- Caching a new URL on staging would cache it for production as well.
- Purging cache on staging would purge it on production too.
- Promoting a new version to production would wipe all exiting cache.
{{</details>}}

{{<details header="Cache Rules when used with Cloudflare Images">}}
- Product incompatibility issues.
- Image Resizing does not work with `additional_cacheable_ports` Cache Rule setting and Zone Versioning.
{{</details>}}

{{<details header="Workers Cache API">}}
- Product incompatibility issues.
- Workers Cache API does not work with Version Management.
{{</details>}}

{{<details header="China Network">}}
- Regardless of the version deployed to production, traffic in China will always target the root zone.
- Other incompatibility issues with Access and ICP licenses.
{{</details>}}

{{<details header="Cloudflare API">}}
- Zone Version Management does not currently expose a public API.
- Customers can only use Version Management through the Cloudflare dashboard.
{{</details>}}

{{<details header="Domain-scoped Roles">}}
- Domain Scoped Roles apply only to your root zone.
- Once a new version is created, these roles do not copy over and they lose access to versions.
{{</details>}}

{{<details header="Network Error Logging">}}
- Network Error Logging settings are not cloned when a new version is created.
{{</details>}}

{{<details header="Security Insights">}}
- Security findings are not shown when Zone Versioning is enabled and the first version is deployed to production.
{{</details>}}

{{<details header="Terraform">}}
- Zone Version Management does not currently support Terraform.
- Customers should either use Terraform or Version Management.
{{</details>}}

{{<details header="WAF Attack Score">}}
- WAFML settings are not cloned when a new zone version is created.
{{</details>}}

{{<details header="Waiting Room">}}
- Users active on the site may be placed back in the queue.
- Users in the queue may lose their place in line.
- Traffic may exceed limits.
{{</details>}}

{{<details header="Wrangler">}}
- If a version has a worker route, it might disappear when a worker is deployed via Wrangler.
- If two versions have the same custom domains, the worker might randomly choose between them.
{{</details>}}