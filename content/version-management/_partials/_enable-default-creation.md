---
_build:
  publishResources: false
  render: never
  list: never
---

Once you [enable](/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

- **Version Zero** of your zone, which duplicates all existing settings that are compatible with version management. Since this version is initially applied to your [read-only Production environment](/version-management/reference/read-only-environments/), you cannot edit any settings.
- **Version 1** of your zone, which is the same as **Version Zero** but its settings can be [updated](/version-management/how-to/versions/#change-settings-in-a-version) and [applied](/version-management/how-to/environments/#change-environment-version) to environments.
- **Global Settings**, which controls the settings that are not compatible with version management. 

Any changes made to **Global Settings** will immediately apply to your zone and all versions of your zone.

Cloudflare also automatically creates environments for **Production**, **Staging**, and **Development**.