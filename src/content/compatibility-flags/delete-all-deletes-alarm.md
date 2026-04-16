---
_build:
  publishResources: false
  render: never
  list: never

name: "Durable Object `deleteAll()` deletes alarms"
sort_date: "2026-02-24"
enable_date: "2026-02-24"
enable_flag: "delete_all_deletes_alarm"
disable_flag: "delete_all_preserves_alarm"
---

With the `delete_all_deletes_alarm` flag set, calling `deleteAll()` on a Durable Object's storage will delete any active alarm in addition to all stored data. Previously, `deleteAll()` only deleted user-stored data, and alarms required a separate `deleteAlarm()` call to remove. This change applies to both KV-backed and SQLite-backed Durable Objects.
