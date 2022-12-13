---
_build:
  publishResources: false
  render: never
  list: never
---

- **Development**: Meant to validate that changes work correctly. The default [traffic filters](/version-management/reference/traffic-filters/) are that the `cf.zone.name` matches your zone name, the `Edge Server IP` is a specific value, and that the request contains a cookie with `development=true`.
- **Staging**: Meant to test changes before sending to **Production**. The default [traffic filters](/version-management/reference/traffic-filters/) are that the `cf.zone.name` matches your zone name and the `Edge Server IP` is a specific value.
- **Production**: Meant to hold all settings applied to your zone. You cannot edit the [traffic filters](/version-management/reference/traffic-filters/) - which are just that the `cf.zone.name` is equal to your zone's name - and cannot delete this environment.