---
_build:
  publishResources: false
  render: never
  list: never
---

| Expression | Action |
| --- | --- |
| `(http.user_agent contains "App_Name 2.0") and (cf.bot_management.ja3_hash eq df669e7ea913f1ac0c0cce9a201a2ec1) and (ip.src in $mobile_app_ips)` | *Allow* |