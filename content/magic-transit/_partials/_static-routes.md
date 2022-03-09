---
_build:
  publishResources: false
  render: never
  list: never
---

## Static routes

Magic Transit uses the static routes you provide to route traffic through GRE tunnels. A route with a lower **Priority** value is used as the preferred route, and routes with the same priority value use equal-cost multi-path (ECMP) packet forwarding to route traffic.

You can also create and edit static routes using [Magic Transit Static Routes API](https://api.cloudflare.com/#magic-transit-static-routes-properties).

### Create a static route

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **Static routes configuration**, click **Configure**.
3.  On the **Static Routes** page, click **Create** to add a new route.
4.  Enter the information for your route.
5.  While optional, we highly recommend testing your route before adding it by clicking **Test routes**.
6.  If your test was successful, click **Add routes** when you are done.

### Edit a static route

1.  After navigating to the **Static routes configuration** page, click **Edit** next to the route you want to modify.
2.  Enter the updated route information and click **Edit routes** when you are done.