---
order: 8
pcx-content-type: how-to
---

# Support mobile traffic

A waiting room can also support mobile traffic by sending information via a JSON object.

Since the format is controlled by the `Accept` header, a single waiting room can handle both mobile and web traffic.

<Aside type="note">

Only certain customers can enable JSON responses for their waiting rooms. For more details, see our <a href="/about/plans">Plans</a> page.

</Aside>

## Step 1 — Enable JSON response

To enable a JSON response:
- **Via the dashboard**: When [customizing a waiting room](/how-to/customize-waiting-room), Toggle **JSON Response** to **On**.
- **Via the API**: When [creating a waiting room](https://api.cloudflare.com/#waiting-room-create-waiting-room), set `json_response_enabled` to `true`.

## Step 2 — Set up mobile app

When you 

Cookie jar

## Step 3 — Get JSON data
