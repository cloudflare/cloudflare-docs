---
_build:
  publishResources: false
  render: never
  list: never
---

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device and/or if the device or software are configured in a particular way.

| UI name | API example |
| --- | --- |
| Passed Device Posture Checks | `any(device_posture.checks.failed[*] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})`, `any(device_posture.checks.passed[*] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})"`  |