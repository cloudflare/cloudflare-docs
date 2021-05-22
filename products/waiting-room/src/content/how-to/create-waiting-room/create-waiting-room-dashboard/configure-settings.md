---
order: 0
type: overview
pcx-content-type: configuration
---

# Configure settings from the Cloudflare dashboard

To configure settings for a waiting room, select the **Settings** tab in the **Create Waiting Room** page.

![Waiting Rooms Settings](../../../static/wr-create-waiting-room-settings.png)

The table below describes the **Settings** fields that you can configure in the dashboard, and indicates the equivalent Waiting Room API parameter for each setting.

<table style="width:100%">
  <thead>
    <tr>
      <td colspan="2" style="width:30%"><strong>Settings</strong></td>
      <td colspan="2" style="width:70%"><strong>Notes</strong></td>
    </tr>
    <tr>
      <td style="width:15%"><strong>Dashboard Setting</strong></td>
      <td style="width:15%"><strong>API parameter</strong></td>
      <td style="width:15%"><strong>Required?</strong></td>
      <td style="width:30%"><strong>Description</strong></td>
      <td style="width:25%"><strong>Best practices</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td><code>name</code></td>
      <td>Yes</td>
      <td>Unique waiting room name.</td>
      <td></td>
    </tr>
    <tr>
      <td>Hostname</td>
      <td><code>host</code></td>
      <td>Yes</td>
      <td>Host name for which the waiting room will be applied (no wildcards).</td>
      <td>Do not include <code>http://</code> or <code>https://</code>.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td><code>path</code></td>
      <td>No</td>
      <td>Case-sensitive path of the waiting room. The waiting room will be enabled for all subpaths. Wildcards and query parameters are not supported.</td>
      <td>If your server does not allow letter casing, use numbers in your <code>path</code> or redirect traffic with a Page Rule.</td>
    </tr>
    <tr>
      <td>Total active users</td>
      <td><code>total_active_users</code></td>
      <td>Yes</td>
      <td>The maximum number of active sessions allowed in <code>host/path</code> at a given time.</td>
      <td>Set to 75% to 80% of origin traffic capacity and adjust as needed. Adjustments may affect estimated wait time shown to end users.</td>
    </tr>
    <tr>
      <td>New users per minute</td>
      <td><code>new_users_per_minute</code></td>
      <td>Yes</td>
      <td>Amount of new users per minute that can be allowed into <code>host/path</code>, less than or equal to target concurrent users.</td>
      <td></td>
    </tr>
    <tr>
      <td>Session duration</td>
      <td><code>session_duration</code></td>
      <td>No</td>
      <td>The amount of time in minutes that a user who left <code>host/path</code> can come directly back without having to go into the Waiting Room.</td>
      <td></td>
    </tr>
    <tr>
      <td>Description</td>
      <td><code>description</code></td>
      <td>No</td>
      <td>Description of the Waiting Room.</td>
      <td></td>
    </tr>
  </tbody>
</table>

<Aside type='note' header='Note'>

You can configure only one Waiting Room per `host/path` combination.
</Aside>

## Next steps

Click **Next** or the **Customization** tab to modify the waiting room page design.
