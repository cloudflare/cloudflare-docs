---
_build:
  publishResources: false
  render: never
  list: never

name: "Pedantic Web Platform Tests (WPT) compliance"
sort_date: "2025-07-15"
enable_flag: "pedantic_wpt"
disable_flag: "non_pedantic_wpt"
---

The `pedantic_wpt` flag enables strict compliance with Web Platform Tests (WPT)
in Workers. Initially this only effects `Event` and `EventTarget` APIs but
will be expanded to other APIs in the future. There is no default enable
date for this flag.
