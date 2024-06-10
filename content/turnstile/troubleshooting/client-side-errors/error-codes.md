---
title: Error codes
pcx_content_type: troubleshooting
weight: 2
layout: wide
---

# Error codes

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
| `110500` | Unsupported browser: The visitor is using an unsupported browser. | No | Encourage the visitor to upgrade their browser or verify otherwise. Refer to [supported browsers](/waf/reference/cloudflare-challenges/#browser-support) for more information. |
| `110510` | Inconsistent user-agent: The visitor provided an inconsistent user-agent throughout the process of solving Turnstile. | No | The visitor may have browser extensions or settings enabled to spoof their user-agent and should disable them to proceed. |
| `11060*` | Challenge timed out: The visitor took too long to solve the challenge and the challenge timed out. | Yes | Retry the challenge. The visitor also may have a system clock set to a wrong date. |
| `11062*` | Challenge timed out: This error is for visible mode only. The visitor took too long to solve the interactive challenge and the challenge became outdated. | Yes | Reset the widget and re-initialize it to give the visitor the chance to solve the widget again. |
| `120***` | Internal Errors for Cloudflare Employees. | No | Only encountered by Cloudflare Support Engineers while debugging. |
| `200010` | Invalid caching: Some portion of Turnstile was accidentally cached. | No | Encourage the visitor to clear their cache. |
| `200100` | Time problem: The visitor's clock is incorrect. | No | Encourage the visitor to set their clock to the correct time. |
| `300***` | Generic client execution error: An unspecified error occurred in the visitor while they were solving a challenge. | Yes | Potentially an automated visitor. Retry the challenge. Upon multiple subsequent failures, verify the visitor otherwise. |
| `600***` | Challenge execution failure: A visitor failed to solve a Turnstile Challenge. Also used by [failing testing sitekey](/turnstile/troubleshooting/testing/). | Yes | Potentially an automated visitor. Retry the challenge. Upon multiple subsequent failures, verify the visitor otherwise. |

## Error code `300***` and `600***`

Error code family `300***` and `600***` (e.g. "`600010`: The generic_challenge_failure") is a response generated by the Turnstile in situations where a potential bot or unusual visitor behavior is detected. 

You can troubleshoot these error codes using the following recommendations: 

{{<render file="_troubleshooting-steps.md">}}