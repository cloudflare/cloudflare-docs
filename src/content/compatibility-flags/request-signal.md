---
name: "Enable `Request.signal` for incoming requests"
sort_date: "2025-05-22"
enable_flag: "enable_request_signal"
disable_flag: "disable_request_signal"
---

When you use the `enable_request_signal` compatibility flag, you can attach an event listener to [`Request`](/workers/runtime-apis/request/) objects, using the [`signal` property](https://developer.mozilla.org/en-US/docs/Web/API/Request/signal). This allows you to perform tasks when the request to your Worker is canceled by the client.