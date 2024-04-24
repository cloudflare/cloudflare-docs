---
_build:
  publishResources: false
  render: never
  list: never
---

A distributed denial-of-service (DDoS) attack is where a large number of computers or devices, usually controlled by a single attacker, attempt to access a website or online service all at once. This flood of traffic can overwhelm the website's origin servers, causing the site to slow down or even crash.

```mermaid
sequenceDiagram;
    participant User;
    participant Website;
    participant Server;
    participant Botnet;
    User->>Website: Requests to access site
    Website->>Origin Server: Processes user requests
    Botnet->>Origin Server: Sends a flood of traffic
    Origin Server-->>Website: Slows down due to traffic overload
    Origin Server-->>User: Unable to respond to user requests
```
<br/>