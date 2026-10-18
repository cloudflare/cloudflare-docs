---
_build:
  publishResources: false
  render: never
  list: never

name: "Backward error and close propagation in pipeTo()"
sort_date: "2026-11-17"
enable_date: "2026-11-17"
enable_flag: "pipe_to_backward_propagation"
disable_flag: "no_pipe_to_backward_propagation"
---

When the `pipe_to_backward_propagation` flag is enabled, `pipeTo()` and `pipeThrough()` to a `WritableStream` created in JavaScript propagate errors and closure from the destination back to the source, as the [WHATWG Streams Standard](https://streams.spec.whatwg.org/#readable-stream-pipe-to) requires.

If the destination errors or closes while the pipe is waiting to read from the source, the pipe cancels the source (unless `preventCancel` is set), then rejects with the destination's error, or with a `TypeError` if the destination closed. If canceling the source fails, the pipe rejects with the cancel error instead.

Without the flag, the pipe still cancels the source in this case, but its promise resolves instead of rejecting. With `preventCancel: true`, the promise never settles. A failed cancel is not reported.
