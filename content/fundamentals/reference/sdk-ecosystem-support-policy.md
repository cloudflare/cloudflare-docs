---
pcx_content_type: reference
title: SDK ecosystem support policy
weight: 5
---

# SDK ecosystem support policy

## Lifecycle

Unless otherwise stated in the code repository, Cloudflare only provides active support for the latest major version of a library or tool. The exception to this policy is for critical security fixes, which will be reviewed on a case-by-case basis and take the vulnerability, impact, and mitigation required into consideration.

We provide three primary stages of development: early access, active support, and end of life.

{{<Aside type="note">}}
These lifecycle stages may be known by different names however, the underlying principles are the same.
{{</Aside>}}

### Early access

During this stage, Cloudflare makes SDK changes available that we are seeking feedback on prior to releasing for general usage. Early access will  often include warning labels or caveats on functionality that is subject to change without notice. In general, early access SDKs are not suitable for production systems unless explicitly mentioned.

### Active support

During the active support stage, planned changes and support are offered for the library or tool.

### End of life

During the end of life stage, a new major version of the library or tool is released and Cloudflare marks the previous major version as no longer receiving improvements or bug fixes. If you continue to run end of life versions, support will be very limited.

![All lifecycle stages and their relation to one another](/images/fundamentals/support-policy.png "All lifecycle stages and their relation to one another")

## Previous or end of life versions

While Cloudflare cannot provide support for all older versions of our libraries or tools, we do not remove those versions so they can continued to be used without direct support.

## Versioning

The SDK ecosystem follows semantic versioning, which defines versions as follows:

- MAJOR version when there are backward-incompatible changes made.
- MINOR version when functionality is added in a backward compatible-manner.
- PATCH version for backward-compatible bug fixes (without any improvements).

{{<Aside type="warning">}}
As Cloudflare has recently swapped to [automatically generating our libraries using OpenAPI](https://blog.cloudflare.com/lessons-from-building-an-automated-sdk-pipeline), we have relaxed the strict versioning requirements on the libraries (Terraform is not changing). Minor releases _may_ contain breaking changes in the forms of method, structure ,or type renames as the service owners stabilize their schemas and iterate on usability improvements.

If this is not suitable for your use case, pin to a known good version or use the previous major version of the library.
{{</Aside>}}

Depending on your needs, you should ensure your application's package manager versioning is configured correctly. At a minimum, restrict installation to the current major version of the library or tool you are using to prevent any major version upgrades occurring automatically.

## Migration

Where possible, Cloudflare provides an automated approach to performing major version upgrades to limit the disruption using codemods. Review the library or tool-specific release notes for how to use these migration tools.

Alongside the automatic migration approach, we provide documentation on the changes that have taken place in case you need to make the changes manually.

## Related resources

- [Semantic versioning definitions](https://semver.org/)
- [Cloudflare's Terraform documentation](/terraform/)
