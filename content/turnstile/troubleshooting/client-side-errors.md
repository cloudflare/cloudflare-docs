---
title: Client-side error codes
pcx_content_type: reference
weight: 3
layout: wide
---

# Client-side error codes

There are instances where Turnstile may encounter problems, invoking `error-callback`. Refer to the list of [common error codes](#error-codes) below for troubleshooting steps to address them.

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

## Error codes

An error callback will retrieve an error code as its first parameter. Error codes are separated by the first three numbers into `error-code` families.

{{<Aside type="note">}}
When an error code is marked with `***`, it means that the remaining numbers can be ignored and are for internal use.
{{</Aside>}}

|  <div style="width:130px">Error code</div> | Description | Retry | Troubleshooting |
| --- | --- | --- | --- |
| `100***` | Initialization Problems: There was a problem initializing Turnstile before a challenge could be started. | No | This could be caused by an old instance of the challenge that was solved. It is advised to reload the page and restart Turnstile. On continuous failures, this is indicative of an automated device. |
| `102***` | Invalid Parameters: The visitor sent an invalid parameter as part of the challenge towards Turnstile. | Yes | It is advised to retry the challenge. On continuous failures, this is indicative of an automated device. |
| `102***`<br>`103***`<br>`104***`<br>`106***` | Invalid Parameters: The visitor sent an invalid parameter as part of the challenge towards Turnstile. | Yes | It is advised to retry the challenge. On continuous failures, this is indicative of an automated device and you must verify the visitor’s authenticity by other means. |
| `105***` | Turnstile API Compatibility: Turnstile was invoked in a deprecated or invalid way. | No | It is advised to refer to the [Turnstile documentation](/turnstile/) again and refresh the page to obtain the most recent Turnstile version. |
| `110100` <br> `110110` | Invalid {{<glossary-tooltip term_id="sitekey">}}sitekey{{</glossary-tooltip>}}: Turnstile was invoked with an invalid sitekey or a sitekey that is no longer active. | No | Verify if the sitekey provided is still active via the [Cloudflare dashboard](https://dash.cloudflare.com/). |
| `110200` | Unknown domain: Domain not allowed. | No | Turnstile was used on a domain that was not allowed for this widget to be used on. Ensure that the domain is allowed in the widget configuration via the [Cloudflare dashboard](https://dash.cloudflare.com/). |
| `110420` | Invalid action: This error occurs when an unsupported or incorrectly formatted action is submitted. | No | Ensure that the action conforms to the specified structure and contains only valid characters and adheres to the documented length limitations. Refer to [client-side configurations](/turnstile/get-started/client-side-rendering/#configurations) for more information. | 
| `110430` | Invalid cData: This error in Turnstile refers to an issue encountered when processing Custom Data (cData). This error occurs when the cData provided does not adhere to the expected format or contains invalid characters. | No | Ensure that the cData conforms to the specified structure and contains only valid characters and adheres to the documented length limitations. Refer to [client-side configurations](/turnstile/get-started/client-side-rendering/#configurations) for more information. |
| `110500` | Unsupported browser: The visitor is using an unsupported browser. | No | Encourage the visitor to upgrade their browser or verify otherwise. Refer to [Supported Browsers](/waf/reference/cloudflare-challenges/#browser-support) for more information. |
| `110510` | Inconsistent user-agent: The visitor provided an inconsistent user-agent throughout the process of solving Turnstile. | No | The visitor may have browser extensions or settings enabled to spoof their user-agent and should disable them to proceed. |
| `11060*` | Challenge timed out: The visitor took too long to solve the challenge and the challenge timed out. | Yes | Retry the challenge. The visitor also may have a system clock set to a wrong date. |
| `11062*` | Challenge timed out: This error is for visible mode only. The visitor took too long to solve the interactive challenge and the challenge became outdated. | Yes | Reset the widget and re-initialize it to give the visitor the chance to solve the widget again. |
| `120***` | Internal Errors for Cloudflare Employees. | No | Only encountered by Cloudflare Support Engineers while debugging. |
| `200010` | Invalid caching: Some portion of Turnstile was accidentally cached. | No | Encourage the visitor to clear their cache. |
| `200100` | Time problem: The visitor's clock is incorrect. | No | Encourage the visitor to set their clock to the correct time. |
| `300***` | Generic client execution error: An unspecified error occurred in the visitor while they were solving a challenge. | Yes | Potentially an automated visitor. Retry the challenge. Upon multiple subsequent failures, verify the visitor otherwise. |
| `600***` | Challenge execution failure: A visitor failed to solve a Turnstile Challenge. Also used by [failing testing sitekey](/turnstile/troubleshooting/testing/). | Yes | Potentially an automated visitor. Retry the challenge. Upon multiple subsequent failures, verify the visitor otherwise. |