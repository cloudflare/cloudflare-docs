---
order: 4
pcx-content-type: how-to
---

# Edit and delete waiting rooms

You can manage your waiting rooms using the [Waiting Rooms dashboard](/how-to/waiting-room-dashboard) or the [API](/reference/waiting-room-api).

<Aside type="note">

For details about updating an active waiting room, see <a href="/reference/best-practices">Best practices</a>.

</Aside>

## Using the dashboard

### Edit a waiting room

1. In your application, go to **Traffic** > **Waiting Rooms**.
1. On a record, click **Edit**.
1. Click **Settings**.
1. Edit the settings. For a description of settings, refer to [Configuration settings](/reference/configuration-settings/).
1. Click **Next**. If you have access to [customized templates](../customize-waiting-room), you could also adjust the template.
9. Once you get to **Review**, click **Save**.

### Delete a waiting room

1. In your application, go to **Traffic** > **Waiting Rooms**.
1. On a record, click **Delete**.
1. Select **Delete** again.

## Using the API

### Edit a waiting room

[Replace](https://api.cloudflare.com#waiting-room-update-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.

```shell
PUT zones/{zone_identifier}/waiting_rooms/{identifier}
```

[Update](https://api.cloudflare.com#waiting-room-patch-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.

```shell
PATCH zones/{zone_identifier}/waiting_rooms/{identifier}
```

You only need to include the parameters that you want to update in the `data` field of the PATCH request.

### Delete a waiting room

Delete a waiting room by appending the following endpoint in the [Waiting Room API](https://api.cloudflare.com#waiting-room-delete-waiting-room) to the Cloudflare API base URL.

```shell
DELETE zones/{zone_identifier}/waiting_rooms/{identifier}
```
