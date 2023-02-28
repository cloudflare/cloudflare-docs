---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

You can apply $1 policies to a growing list of popular web applications. Refer to [Application and app types](/cloudflare-one/policies/filtering/application-app-types) for more information.

| UI name | API example |
| -- | -- |
| Application | `any(app.ids[*] in {505}` |