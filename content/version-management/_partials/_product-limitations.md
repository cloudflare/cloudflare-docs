---
_build:
  publishResources: false
  render: never
  list: never
---

Version Management does not currently support or have limited support for the following products or features: 

{{<details header="API Shield">}}
- Some [API Shield](/api-shield/) configurations are not cloned when a new zone version is created.
- Customers are allowed to opt-in to remove the UI block that prevents enabling Version Management.
{{</details>}}

{{<details header="Authenticated Origin Pull">}}
- [Authenticated Origin Pull](/ssl/origin-configuration/authenticated-origin-pull/) does not work with Zone Versioning.
- Accessing your domain from an allowlisted IP returns a Cloudflare 520 error.
{{</details>}}

{{<details header="Cache">}}
- [Cache](/workers/runtime-apis/cache/) configurations are versioned, but cache keys are not.
- Caching a new URL on staging would cache it for production as well.
- Purging cache on staging would purge it on production too.
- Promoting a new version to production would wipe all exiting cache.
{{</details>}}

{{<details header="Cache Rules when used with Cloudflare Images">}}
- [Image Resizing](/images/) does not work with the `additional_cacheable_ports` [Cache Rule](/cache/how-to/cache-rules/) setting and Zone Versioning.
- If you use `additional_cacheable_ports` with Image Resizing, the image will be resized every time it is requested and will result in low performance. 
{{</details>}}

{{<details header="Workers Cache API">}}
- [Workers Cache API](/workers/runtime-apis/cache/) does not work with Version Management.
- If you use the Workers Cache API with Zone Versioning, you might encounter unexpected caching behaviours.
{{</details>}}

{{<details header="China Network">}}
- Regardless of the version deployed to production, traffic in China will always target the root zone.
- Other incompatibility issues with Access and ICP licenses.
{{</details>}}

{{<details header="Cloudflare API">}}
- Zone Version Management does not currently expose a public [API](/api/).
- Customers can only use Version Management through the [Cloudflare dashboard](https://dash.cloudflare.com/).
{{</details>}}

{{<details header="Domain-scoped Roles">}}
- [Domain-scoped Roles](/fundamentals/setup/manage-members/roles/#domain-scoped-roles) apply only to your root zone.
- Once a new version is created, these roles do not copy over and they lose access to versions.
{{</details>}}

{{<details header="Image Transformations">}}
- Changes made to [Image Transformations](/images/transform-images/#transform-images) are not cloned when a new zone version is created.
{{</details>}}

{{<details header="Network Error Logging">}}
- [Network Error Logging](/network-error-logging/) configurations are not cloned when a new version is created.
{{</details>}}

{{<details header="Page Shield">}}
- [Page Shield](/page-shield/) is not available for versioning and is only configurable under your Global Configuration.
{{</details>}}

{{<details header="Security Insights">}}
- [Security Insights](/security-center/security-insights/) are not shown when Zone Versioning is enabled and the first version is deployed to production.
{{</details>}}

{{<details header="Terraform">}}
- Zone Version Management does not currently support [Terraform](/terraform/).
- Customers should either use Terraform or Version Management.
{{</details>}}

{{<details header="WAF Attack Score">}}
- [WAF Attack Score](/waf/about/waf-attack-score/) configurations are not cloned when a new zone version is created.
{{</details>}}

{{<details header="Waiting Room">}}
- [Waiting Room](/waiting-room/) users active on the site may be placed back in the queue.
- Waiting Room users in the queue may lose their place in line.
- Traffic may exceed limits.
{{</details>}}

{{<details header="Wrangler">}}
- If a version has a Worker route, it might disappear when a Worker is deployed via [Wrangler](/workers/wrangler/).
- If two versions have the same custom domains, the Worker might randomly choose between them.
{{</details>}}