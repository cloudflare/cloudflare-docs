---
_build:
  publishResources: false
  render: never
  list: never
---

Extended email addresses (also known as plus addresses) are variants of an existing email address with `+` or `.` modifiers. Many email providers, such as Gmail and Outlook, deliver emails intended for an extended address to its original address. For example, providers will deliver emails sent to `contact+123@example.com` or `con.tact@example.com` to `contact@example.com`.

By default, Gateway will either filter only exact matches or all extended variants depending on the type of firewall policy and action used:

{{<details header="DNS policies">}}

| Action             | Behavior                             |
| ------------------ | ------------------------------------ |
| Allow              | Match exact address only             |
| Block              | Match exact address and all variants |
| Override           | Match exact address and all variants |
| Safe Search        | Match exact address and all variants |
| YouTube Restricted | Match exact address and all variants |

{{</details>}}

{{<details header="Network policies">}}

| Action           | Behavior                             |
| ---------------- | ------------------------------------ |
| Allow            | Match exact address only             |
| Audit SSH        | Match exact address and all variants |
| Block            | Match exact address and all variants |
| Network Override | Match exact address only             |

{{</details>}}

{{<details header="HTTP policies">}}

| Action         | Behavior                             |
| -------------- | ------------------------------------ |
| Allow          | Match exact address only             |
| Block          | Match exact address and all variants |
| Do Not Inspect | Match exact address only             |
| Do Not Isolate | Match exact address only             |
| Do Not Scan    | Match exact address only             |
| Isolate        | Match exact address and all variants |

{{</details>}}

To force Gateway to match all email address variants, go to **Settings** > **Network** > **Firewall** and turn on **Match email variants**. This settings applies to all Gateway policies.
