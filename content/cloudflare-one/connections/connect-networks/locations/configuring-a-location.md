---
pcx-content-type: how-to
title: Add locations
weight: 2
---

# Add locations

To add a location to Cloudflare Zero Trust:

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Gateway** > **Locations**.

2.  Click **Add a location**.

3.  Choose a name for your location.

4.  You may not need the IPv4 address field if:

*   The location you're adding only uses IPv6
*   Users will be sending all DNS requests from this location using DNS over HTTPS via a browser
*   You will be deploying the [WARP client](/cloudflare-one/connections/connect-devices/warp/)

If any of the above apply to your case, click **Delete** to the right of the IPv4 field.

   {{<Aside>}}

If you're using an Enterprise plan, you'll be able to manually change the IPv4 address.

   {{</Aside>}}

![Add location](/cloudflare-one/static/documentation/connections/add-location.png)

1.  Select any policies you want to apply to this location.

2.  If you'd like to set this location as default, check the **Set as a Default Location** checkbox.

3.  Click **Add location**.

4.  This will show you your location's details, and instructions on how to change DNS resolvers on your router, browser, or OS.

    ![Location setup](/cloudflare-one/static/documentation/connections/location-setup-instructions.png)

5.  Click **Done**.

Your location is now listed under **Gateway > Locations**.

![Location added](/cloudflare-one/static/documentation/connections/added-location.png)
