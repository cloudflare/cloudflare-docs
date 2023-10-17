---
_build:
  publishResources: false
  render: never
  list: never
---

Depending on what you want to configure, choose one of the following DNS addresses for IPv6:

{{<details header="Use 1.1.1.1 resolver">}}

```txt
2606:4700:4700::1111
2606:4700:4700::1001
```

{{</details>}}

{{<details header="Block malware with 1.1.1.1 for Families">}}

```txt
2606:4700:4700::1112
2606:4700:4700::1002
```

{{</details>}}

{{<details header="Block malware and adult content with 1.1.1.1 for Families">}}

```txt
2606:4700:4700::1113
2606:4700:4700::1003
```

{{</details>}}
