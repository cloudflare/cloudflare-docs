---
_build:
  publishResources: false
  render: never
  list: never

---

| Precedence | Selector | Operator      | Value              | Action |
| ---------- | -------- | ------------- | ------------------ | ------ |
| 1          | Host     | is            | `example.com`      | Block  |
| 2          | Host     | is            | `test.example.com` | Allow  |
| 3          | Domain   | matches regex | `.\`               | Block  |
