---
title: Client-side errors
pcx_content_type: troubleshooting
weight: 3
---

# Client-side error codes

There are instances where Turnstile may encounter problems, invoking `error-callback`. Refer to the list of [common error codes](/turnstile/troubleshooting/client-side-errors/error-codes/) for troubleshooting steps to address them.

## Error handling

The `error-callback` option for explicitly rendering widgets and the `data-error-callback` attribute on implicit rendering provides a JavaScript callback to handle potential errors that occur.

Specifying an error callback is optional. If no error callback is set, Turnstile will throw a JavaScript exception upon error.

If an error callback returns with a non-falsy result, Turnstile will assume that the error callback handled the error accordingly.

If the error callback returns with a `no` or a falsy result, Turnstile will log a warning to the JavaScript console containing the error code.

An error callback will retrieve an error code as its first parameter.

## Retry

By default, Turnstile will automatically retry upon encountering a problem. When subsequent failures due to retries are observed, the error callback can be invoked multiple times.

You can adjust the retry behavior by setting the `retry` value to `never` instead of the default `auto`. This will result in Turnstile not automatically retrying. If there is any issue or error verifying the visitor, the widget will not retry and will remain in the respective failure state.

An implementation may call `turnstile.reset()` in the corresponding `error-callback` to manually trigger a retry.

The interval in between retries of Turnstile can be configured by the `retry-interval` option.

## Interactivity

If the user fails to engage with an interactive challenge within a reasonable timeframe, the timeout callback function is triggered.

For instance, in a scenario where the Turnstile widget is implemented within a lengthy form that may require several minutes to complete, the interactive challenge within the widget becomes outdated if it remains unaddressed for an extended period.

In such instances, the `timeout-callback` of the widget is activated, enabling the widget to reset itself as needed.