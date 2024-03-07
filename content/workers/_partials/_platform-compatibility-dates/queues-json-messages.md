---
_build:
  publishResources: false
  render: never
  list: never

name: "Queues send messages in `JSON` format"
sort_date: "2024-03-18"
enable_date: "2024-03-18"
enable_flag: "queues_json_messages"
disable_flag: "no_queues_json_messages"
---

With the `queues_json_messages` flag set, Queue bindings will serialize values passed to `send()` or `sendBatch()` into JSON format by default (when no specific `contentType` is provided).