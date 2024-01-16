---
_build:
  publishResources: false
  render: never
  list: never
---

Extended email addresses (also known as plus addresses) are the addition of `+` or `.` modifiers to an email address. Many email providers support emails sent to extended email addresses to be delivered to the same inbox. For example, possible extended email addresses for `contact@example.com` include `contact+123@example.com` or `con.tact@example.com`.

Depending on which firewall policy type and action you use, Gateway will either filter only exact matches or all extended variants.

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
