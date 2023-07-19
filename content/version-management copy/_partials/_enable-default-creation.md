---
_build:
  publishResources: false
  render: never
  list: never
---

Once you [enable](/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

- **Version Zero**, think about this as the configurations of your current zone. Part of your products currently visible in the navigation are going to be displayed under Versions and the other ones under Global Settings. Once default environments are created, Version Zero is automatically deployed to them, guaranteeing no disruption in your live traffic. This Version is also permanently editable. In case you decide to disable Zone Versioning, Version Zero will become your zone again. 
- **Global Settings**, you can find all the settings here that are not supported by Version Management.

{{<Aside type="warning">}}

Important: Any changes made to **Global Settings** will immediately apply to your zone and all versions of your zone, affecting live traffic.

{{</Aside>}}

On the Environments page, you can create default environments for **Production**, **Staging**, and **Development**.