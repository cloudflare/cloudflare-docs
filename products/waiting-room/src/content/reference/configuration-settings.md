---
order: 1
pcx-content-type: reference
type: overview
---

# Configuration settings

You can customize a variety of options for your waiting rooms.

<ButtonGroup>
  <Button type="primary" href="#dashboard-settings">Dashboard settings</Button>
  <Button type="secondary" href="#additional-details">Additional details</Button>
</ButtonGroup>

## Dashboard settings

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
      <td>The maximum number of active sessions allowed in <code>host/path</code> at a given time (must be greater than 200).</td>
      <td>Set to 75% of origin traffic capacity and adjust as needed. Adjustments may affect estimated wait time shown to end users.</td>
    </tr>
    <tr>
      <td>New users per minute</td>
      <td><code>new_users_per_minute</code></td>
      <td>Yes</td>
      <td>A <a href="#new-users-per-minute">threshold</a> of users per minute that can be allowed into <code>host/path</code>, greater than 200 and less than or equal to <strong>total active users</strong>.</td>
      <td>Set to 100% of peak traffic to ensure users are only queued when necessary</td>
    </tr>
    <tr>
      <td>Session duration</td>
      <td><code>session_duration</code></td>
      <td>No</td>
      <td>The amount of time in minutes (between 1 and 30) that a user who left <code>host/path</code> can come <a href="#session-duration">directly back</a> without having to go into the waiting room. Defaults to 5 minutes.</td>
      <td></td>
    </tr>
    <tr>
      <td>Description</td>
      <td><code>description</code></td>
      <td>No</td>
      <td>Description of the waiting room.</td>
      <td></td>
    </tr>
     <tr>
      <td>Disable session renewal</td>
      <td><code>disable_session_renewal</code></td>
      <td>No</td>
      <td>Only available to Enterprise customers with purchase. If true, users only have <code>session duration</code> minutes to browse your site. If false, a user's session cookie is renewed on every request.</td>
      <td></td>
    </tr>
  </tbody>
</table>

<Aside type='note' header='Note'>

You can configure only one waiting room per `host/path` combination.
</Aside>

## Additional details

### New users per minute

When you configure `new users per minute`, this value **is not** the number of users added per minute.

Instead, it is the threshold of users allowed per minute (less than or equal to the number of `total active users`). You should set this value at 100% of your expected peak traffic to ensure users are only queued when necessary.

### Session duration

Session duration improves user experience in two ways.

First, it prevents visitors from having to pass through a waiting room twice for the same transaction. For example, a visitor might want to make a purchase at `example.com`. There's a lot of traffic at `example.com`, so they queue in the waiting room before entering the online store. After a period of time, they leave the waiting room and enter the online store. They make a purchase and leave the online store.

However, they forgot to add a note to the order or request a receipt. As long as their [session cookie](/reference/waiting-room-cookie) is still valid (for the length of time specified by the `session duration`), they can re-enter your application without having to re-queue in the waiting room.

Second, session duration lets your waiting room create a dynamic outflow from your application (in addition to dynamic inflow). A user's session cookie expires after a period of inactivity, meaning that new spots can open up as soon as space becomes available and estimated wait times are lower and more accurate.
