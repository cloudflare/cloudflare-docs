---
pcx-content-type: how-to
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
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">PUT zones/{zone_identifier}/waiting_rooms/{identifier}</span></div></span></span></span></code></pre>{{</raw>}}

[Update](https://api.cloudflare.com#waiting-room-patch-waiting-room) a configured waiting room by appending the following endpoint to the Cloudflare API base URL.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">PATCH zones/{zone_identifier}/waiting_rooms/{identifier}</span></div></span></span></span></code></pre>{{</raw>}}

You only need to include the parameters that you want to update in the `data` field of the PATCH request.

### Delete a waiting room

Delete a waiting room by appending the following endpoint in the [Waiting Room API](https://api.cloudflare.com#waiting-room-delete-waiting-room) to the Cloudflare API base URL.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DELETE zones/{zone_identifier}/waiting_rooms/{identifier}</span></div></span></span></span></code></pre>{{</raw>}}
