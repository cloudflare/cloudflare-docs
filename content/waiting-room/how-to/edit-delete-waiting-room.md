---
pcx_content_type: how-to
title: Edit and delete waiting rooms
weight: 5
---

# Edit and delete waiting rooms

You can manage your waiting rooms using the [Waiting Rooms dashboard](/waiting-room/how-to/waiting-room-dashboard/) or the [API](/waiting-room/reference/waiting-room-api/).

{{<Aside type="note">}}For details about updating an active waiting room, refer to [Best practices](/waiting-room/reference/best-practices/).{{</Aside>}}

## Using the dashboard

### Edit a waiting room

1.  In your application, go to **Traffic** > **Waiting Rooms**.
2.  On a record, click **Edit**.
3.  Click **Settings**.
4.  Edit the settings. For a description of settings, refer to [Configuration settings](/waiting-room/reference/configuration-settings/).
5.  Click **Next**. If you have access to [customized templates](/waiting-room/how-to/customize-waiting-room/), you could also adjust the template.
6.  Once you get to **Review**, click **Save**.

### Delete a waiting room

1.  In your application, go to **Traffic** > **Waiting Rooms**.
2.  On a record, click **Delete**.
3.  Select **Delete** again.

## Using the API

### Edit a waiting room

[Replace](https://api.cloudflare.com#waiting-room-update-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.

```bash
PUT zones/{zone_identifier}/waiting_rooms/{identifier}
```

[Update](https://api.cloudflare.com#waiting-room-patch-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.

```bash
PATCH zones/{zone_identifier}/waiting_rooms/{identifier}
```

You only need to include the parameters that you want to update in the `data` field of the PATCH request.

### Delete a waiting room

Delete a waiting room by appending the following endpoint in the [Waiting Room API](https://api.cloudflare.com#waiting-room-delete-waiting-room) to the Cloudflare API base URL.

```bash
DELETE zones/{zone_identifier}/waiting_rooms/{identifier}
```
