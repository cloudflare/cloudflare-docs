---
title: Client-Side Error Codes
pcx_content_type: reference
weight: 12
layout: single
---

# Turnstile Client-Side Errors

There are instances where Turnstile may encounter problems, leading to the `error-callback` to be invoked. This document aims to provide a list of common error codes along with troubleshooting steps to address them. 


## Error Handling

Turnstile provides the `error-callback` option for explicitly rendering widgets as well as the `data-error-callback` attribute on implicit rendering to provide a JavaScript callback to handle potential errors that occur.

Specifying an error callback is optional, and if no error callback is set, Turnstile will throw a JavaScript exception upon error.

If an error callback returns with a non-falsy result then Turnstile will be silent about the occurrence of the error and assume the error callback handled the error accordingly.
If the error callback returns no or a falsy result Turnstile will log a warning to the JavaScript console instead containing the error code.

An error callback will retrieve an error code as its first parameter.

## Retrying

Upon encountering a problem, Turnstile will - by default - automatically retry.
Consequently, when multiple subsequent failures due to retries are observed the error-callback can be invoked multiple times.

The retry behavior can be adjusted by setting the `retry` value to  `never` instead of the default `auto`. This will result in Turnstile not automatically retrying.
An implementation may call `turnstile.reset()` in their corresponding `error-callback`, to manually trigger a retry.

The interval in between retries of Turnstile can be configured by the 
`retry-interval` option. 


## Error Codes

An error callback will retrieve an error code as its first parameter.

Error codes are separated by their first 3 numbers into error-code families.

In the following table we list the available error codes.
Note that when an error code is marked with `***` it means that the remaining numbers can be ignored and are for internal use.


| Error Code | Description | Retry-able | Troubleshooting |
| --- | --- | --- | --- |

| `crashed` | A browser process crashed while trying to solve the challenge | yes | The challenge should be retried |
| `undefined_error` | An unspecific error error occurred with no specific error code associated | yes | The challenge should be retried |
| `100***` | Error Code Family Initialization Problems: There was a problem initializing Turnstile, before a challenge could be started. | no | This could be caused by an very old instance of the challenge that got solved. It is advised to reload the page and re-start Turnstile. On continuous failures this is indicative of an automated device. |
| `102***` | Error Code Family Invalid Parameters: The visitor send an invalid parameter as part of the challenge towards Turnstile. | yes | It is advised to re-try the challenge. On continuous failures this is indicative of an automated device. |
| `102***`, `103***`, `104***`,  `106***` | Error Code Family Invalid Parameters: The visitor send an invalid parameter as part of the challenge towards Turnstile. | yes | It is advised to re-try the challenge. On continuous failures this is indicative of an automated device. |
| `105***` | Error Code Family: Turnstile API Compatibility: Turnstile was invoked in a deprecated or invalid way. | no | It is advised to check the Turnstile Documentation again and to refresh the page to obtain the most recent Turnstile version. |
| `106***` | Error Code Family: Invalid Parameters: The visitor send unexpected invalid parameters to Turnstile. | no | Verify the visitor's authenticity by other means |
| `110100` and `110110` | Invalid Sitekey | no | Turnstile was invoked with an invalid sitekey or a sitekey that is no longer active. Check if the sitekey that was provided is still active |
| `110200` | Domain not allowed | no | Turnstile was used on a domain that was not allowed for this widget to be used on. Make sure that the domain Turnstile is intended to run on is allowed in the widget configuration |
| `110420` | This error occurs when an unsupported or incorrectly formatted action is submitted. | no | To resolve this error, ensure that the action conforms to the specified structure and contains only valid characters and adheres to the documented length limitations. |
| `110430` | This error occurs when an unsupported or incorrectly formatted action is submitted. | The "Invalid CDATA" error in Turnstile refers to an issue encountered when processing Custom Data (CDATA). This error occurs when the CDATA provided does not adhere to the expected format or contains invalid characters. | no | Ensure that the CDATA conforms to the specified structure and contains only valid characters and adheres to the documented length limitations. | 
| `110500` | The visitor is using an unsupported browser | no | Encourage the visitor to upgrade their browser or verify otherwise |
| `110510` | The visitor provided an inconsistent User-Agent throughout the process of solving Turnstile. | no | The visitor may have browser extensions or settings enabled to spoof their user agent and should disable them to proceed. |
| `110600` | The visitor took too long to solve the challenge | yes | Retry the challenge. The visitor additionally may have a system clock set to a wrong date. | 
| `120***` | Error Code Family: Internal Errors for Cloudflare Employees. | no | Only encountered by Cloudflare Support Engineers, while debugging | 
| `200010` | Invalid Caching: Some portion of Turnstile got accidentally cached | no | Encourage the visitor to clear their cache | 
| `200100` | Time Problem: The clock of the visitor is off | no | Encourage the visitor to set their clock to the correct time | 
| `300100` | Generic Client Execution Error. An unspecified error occurred in the visitor while they were solving a challenge. | yes | Potentially Automated Visitor. Retry the challenge, upon multiple subsequent failures, verify the visitor otherwise. |
| `600***` | Error Family Challenge Execution Failure: A visitor failed to solve a Turnstile Challenge. Also used by [always failing testing sitekey](/turnstile/reference/testing/). | yes | Potentially Automated Visitor. Retry the challenge, upon multiple subsequent failures, verify the visitor otherwise. |