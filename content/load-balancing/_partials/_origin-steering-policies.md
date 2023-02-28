---
_build:
  publishResources: false
  render: never
  list: never
---

When you [create a pool](/load-balancing/how-to/create-pool/), you have to choose an option for **Origin Steering**:

- **Random**: Sends requests to origins purely based on [origin weights](#weights). Distributes traffic more accurately, but may cause requests from the same IP to hit different origins.
- **Hash**: Cloudflare sends requests to origins based on a combination of [origin weights](#weights) and previous requests from that IP address. Ensures requests from the same IP address will hit the same origin, but actual traffic distribution may differ from origin weights.