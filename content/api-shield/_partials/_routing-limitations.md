---
_build:
  publishResources: false
  render: never
  list: never
---

The Target Endpoint cannot be routed to a Worker if the route is to the same zone.

You cannot change the method of a request. For example, a `GET` Source Endpoint will always send a `GET` request to the Target Endpoint.

You must use all of the variables in the Target Endpoint that appear in the Source Endpoint. For example, routing `/api/{var1}/users/{var2}` to `/api/users/{var2}` is not allowed and will result in an error since `{var1}` is present in the Source Endpoint but not in the Target Endpoint.