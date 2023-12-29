---
pcx_content_type: configuration
title: Console
meta:
  description: Supported methods of the `console` API in Cloudflare Workers
---

# `console`

The `console` object provides a set of methods to help you emit logs, warnings, and debug code.

All standard [methods of the `console` API](https://developer.mozilla.org/en-US/docs/Web/API/console) are present on the `console` object in Workers.

However, some methods are no ops — they can be called, and do not emit an error, but do not do anything. This ensures compatibility with libraries which may use these APIs.

The table below enumerates each method, and the extent to which it is supported in Workers.

All methods noted as "✅ supported" have the following behavior:

- They will be written to the console in local dev (`npx wrangler@latest dev`)
- They will appear in live logs, when tailing logs in the dashboard or running [`wrangler tail`](https://developers.cloudflare.com/workers/observability/log-from-workers/#use-wrangler-tail)
- They will create entries in the `logs` field of [Tail Worker](https://developers.cloudflare.com/workers/observability/tail-workers/) events and `Workers Trace Events
- They will create entries in the `logs` field of [Workers Trace Events](https://developers.cloudflare.com/logs/reference/log-fields/account/workers_trace_events/), which can be pushed to a destination of your choice via [Logpush](https://developers.cloudflare.com/workers/observability/logpush/).

Refer to [Log from Workers](https://developers.cloudflare.com/workers/observability/log-from-workers/) for more on debugging and adding logs to Workers.

| Method                                                                                                         | Behavior
|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [`console.assert()`](https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static)                   | ⚪ no op                                                           |
| [`console.clear()`](https://developer.mozilla.org/en-US/docs/Web/API/console/clear_static)                     | ⚪ no op in local dev, but in remote dev will clear console        |
| [`console.count()`](https://developer.mozilla.org/en-US/docs/Web/API/console/count_static)                     | ⚪ no op in local dev, but works in remote preview                 |
| [`console.countReset()`](https://developer.mozilla.org/en-US/docs/Web/API/console/countreset_static)           | ⚪ no op                                                           |
| [`console.createTask()`](https://developer.chrome.com/blog/devtools-modern-web-debugging/#linked-stack-traces) | Works in local dev, works in remote preview, throws in production  |
| [`console.debug()`](https://developer.mozilla.org/en-US/docs/Web/API/console/debug_static)                     | ✅ supported                                                       |
| [`console.dir()`](https://developer.mozilla.org/en-US/docs/Web/API/console/dir_static)                         | ⚪ no op                                                           |
| [`console.dirxml()`](https://developer.mozilla.org/en-US/docs/Web/API/console/dirxml_static)                   | ⚪ no op                                                           |
| [`console.error()`](https://developer.mozilla.org/en-US/docs/Web/API/console/error_static)                     | ✅ supported                                                       |
| [`console.group()`](https://developer.mozilla.org/en-US/docs/Web/API/console/group_static)                     | ⚪ no op (but in remote preview will correctly group in output)    |
| [`console.groupCollapsed()`](https://developer.mozilla.org/en-US/docs/Web/API/console/groupcollapsed_static)   | ⚪ no op                                                           |
| [`console.groupEnd`](https://developer.mozilla.org/en-US/docs/Web/API/console/groupend_static)                 | ⚪ no op                                                           |
| [`console.info()`](https://developer.mozilla.org/en-US/docs/Web/API/console/info_static)                       | ✅ supported                                                       |
| [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static)                         | ✅ supported                                                       |
| [`console.profile()`](https://developer.mozilla.org/en-US/docs/Web/API/console/profile_static)                 | ⚪ no op                                                           |
| [`console.profileEnd()`](https://developer.mozilla.org/en-US/docs/Web/API/console/profileend_static)           | ⚪ no op                                                           |
| [`console.table()`](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static)                     | ⚪ no op in local dev (but works in remote preview (??))           |
| [`console.time()`](https://developer.mozilla.org/en-US/docs/Web/API/console/time_static)                       | ⚪ no op (but in remote preview will tell you that the timer already exists, no matter what)          |
| [`console.timeEnd()`](https://developer.mozilla.org/en-US/docs/Web/API/console/timeend_static)                 | ⚪ no op                                                           |
| [`console.timeLog()`](https://developer.mozilla.org/en-US/docs/Web/API/console/timelog_static)                 | ⚪ no op                                                           |
| [`console.timeStamp()`](https://developer.mozilla.org/en-US/docs/Web/API/console/timestamp_static)             | ⚪ no op                                                           |
| [`console.trace()`](https://developer.mozilla.org/en-US/docs/Web/API/console/trace_static)                     | ⚪ no op (but in remote preview will throw exception)              |
| [`console.warn()`](https://developer.mozilla.org/en-US/docs/Web/API/console/warn_static)                       | ✅ supported                                                       |

