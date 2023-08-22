---
title: Client-side error codes
pcx_content_type: reference
weight: 12
layout: single
---

# Turnstile client-side error codes

There are instances where Turnstile may encounter problems, invoking `error-callback`. Refer to the list of [common error codes](/turnstile/reference/client-side-errors/#error-codes) below for troubleshooting steps to address them. 


## Error Handling

The `error-callback` option for explicitly rendering widgets and the `data-error-callback` attribute on implicit rendering provides a JavaScript callback to handle potential errors that occur.

Specifying an error callback is optional. If no error callback is set, Turnstile will throw a JavaScript exception upon error.

If an error callback returns with a non-falsy result, Turnstile will assume that the error callback handled the error accordingly.

If the error callback returns with a `no` or a falsy result, Turnstile will log a warning to the JavaScript console containing the error code.

An error callback will retrieve an error code as its first parameter.

## Retrying

By default, Turnstile will automatically retry upon encountering a problem. When subsequent failures due to retries are observed, the error callback can be invoked multiple times.

You can adjust the retry behavior by setting the `retry` value to `never` instead of the default `auto`. This will result in Turnstile not automatically retrying.
An implementation may call `turnstile.reset()` in their corresponding `error-callback` to manually trigger a retry.

The interval in between retries of Turnstile can be configured by the `retry-interval` option. 

## Error Codes

An error callback will retrieve an error code as its first parameter. Error codes are separated by the first three numbers into `error-code` families.

{{<Aside type="note">}} 
When an error code is marked with `***`, it means that the remaining numbers can be ignored and are for internal use.
{{</Aside>}}

| Error Code | Description | Retry | Troubleshooting |
| --- | --- | --- | --- |
| `crashed` | A browser process crashed while trying to solve the challenge. | Yes | The challenge should be retried. |
| `undefined_error` | An unspecific error error occurred with no specific error code associated. | Yes | The challenge should be retried. |
| `100***` | Error Code Family Initialization Problems: There was a problem initializing Turnstile before a challenge could be started. | No | This could be caused by an old instance of the challenge that was solved. It is advised to reload the page and restart Turnstile. On continuous failures, this is indicative of an automated device. |
| `102***` | Error Code Family Invalid Parameters: The visitor sent an invalid parameter as part of the challenge towards Turnstile. | Yes | It is advised to retry the challenge. On continuous failures, this is indicative of an automated device. |
| `102***` `103***` `104***` `106***` | Error Code Family Invalid Parameters: The visitor sent an invalid parameter as part of the challenge towards Turnstile. | Yes | It is advised to retry the challenge. On continuous failures, this is indicative of an automated device. |
| `105***` | Error Code Family: Turnstile API Compatibility: Turnstile was invoked in a deprecated or invalid way. | No | It is advised to refer to the [Turnstile documentation](/turnstile/) again and refresh the page to obtain the most recent Turnstile version. |
| `106***` | Error Code Family: Invalid Parameters: The visitor sent unexpected invalid parameters to Turnstile. | No | Verify the visitor's authenticity by other means. |
| `110100` `110110` | Invalid sitekey | No | Turnstile was invoked with an invalid sitekey or a sitekey that is no longer active. Verify if the sitekey provided is still active. |
| `110200` | Domain not allowed. | No | Turnstile was used on a domain that was not allowed for this widget to be used on. Ensure that the domain Turnstile is intended to run on is allowed in the widget configuration. |
| `110420` | This error occurs when an unsupported or incorrectly formatted action is submitted. | No | Ensure that the action conforms to the specified structure and contains only valid characters and adheres to the documented length limitations. |
| `110430` | This error occurs when an unsupported or incorrectly formatted action is submitted. The "Invalid CDATA" error in Turnstile refers to an issue encountered when processing Custom Data (CDATA). This error occurs when the CDATA provided does not adhere to the expected format or contains invalid characters. | No | Ensure that the CDATA conforms to the specified structure and contains only valid characters and adheres to the documented length limitations. | 
| `110500` | The visitor is using an unsupported browser. | No | Encourage the visitor to upgrade their browser or verify otherwise. |
| `110510` | The visitor provided an inconsistent user-agent throughout the process of solving Turnstile. | No | The visitor may have browser extensions or settings enabled to spoof their user agent and should disable them to proceed. |
| `110600` | The visitor took too long to solve the challenge | Yes | Retry the challenge. The visitor additionally may have a system clock set to a wrong date. | 
| `120***` | Error Code Family: Internal Errors for Cloudflare Employees. | No | Only encountered by Cloudflare Support Engineers while debugging. | 
| `200010` | Invalid Caching: Some portion of Turnstile was accidentally cached. | No | Encourage the visitor to clear their cache. | 
| `200100` | Time Problem: The visitor's clock is incorrect. | No | Encourage the visitor to set their clock to the correct time. | 
| `300100` | Generic Client Execution Error. An unspecified error occurred in the visitor while they were solving a challenge. | Yes | Potentially Automated Visitor. Retry the challenge. Upon multiple subsequent failures, verify the visitor otherwise. |
| `600***` | Error Family Challenge Execution Failure: A visitor failed to solve a Turnstile Challenge. Also used by [failing testing sitekey](/turnstile/reference/testing/). | Yes | Potentially Automated Visitor. Retry the challenge. Upon multiple subsequent failures, verify the visitor otherwise. |