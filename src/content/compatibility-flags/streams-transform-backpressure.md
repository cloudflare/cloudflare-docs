---
_build:
publishResources: false
render: never
list: never

name: "Apply TransformStream backpressure fix"
sort_date: "2024-12-16"
enable_date: "2024-12-16"
enable_flag: "fixup-transform-stream-backpressure"
disable_flag: "original-transform-stream-backpressure"
---

The original implementation of `TransformStream` included a bug that would
cause backpressure signaling to fail after the first write to the transform.
Unfortunately, the fix can cause existing code written to address the bug to
fail. Therefore, the `fixup-transform-stream-backpressure` compat flag is
provided to enable the fix.

The fix is enabled by default with compatibility dates of 2024-12-16 or later.

To restore the original backpressure logic, disable the fix using the
`original-transform-stream-backpressure` flag.
