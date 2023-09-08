---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360059485272-Troubleshooting-Page-Shield
title: Troubleshooting
weight: 10
---

# Troubleshooting

## Why do I not see scripts after I activated Page Shield?

If you recently [activated](/page-shield/get-started/) Page Shield, you may see a delay in reporting.

Cloudflare creates reports based on a sample of your application traffic. These reports need a certain amount of traffic to be statistically valid.

## Why do I see scripts that I do not recognize?

Scripts often reference other scripts outside your application.

But, if you see unexpected scripts on your Script Monitor dashboard, check them for signs of malicious activity.

## Why do I see warnings in my browser's developer tools related to Content Security Policy (CSP)?

Page Shield uses a Content Security Policy (CSP) report-only directive to gather a list of all scripts running on your application.

Some browsers display scripts being reported as warnings in the console pane of their developer tools. For example:

```txt
[Report Only] Refused to execute inline script because it violates
the following Content Security Policy directive: "script-src 'none'".

Either the 'unsafe-inline' keyword, a hash ('sha256-RFWPLDbv2BY+rCkDzsE+0fr8ylGr2R2faWMhq4lfEQc='), or a nonce ('nonce-...') 
is required to enable inline execution.
```

You can safely ignore these warnings, since they are related to the reports that Page Shield requires to detect loaded scripts. For more information, refer to [How Page Shield works](/page-shield/how-it-works/).

## Do I have access to Page Shield?

Some customers do. For more details, refer to [Availability](/page-shield/#availability).

### How do I set up Page Shield?

For help setting up Page Shield, refer to our [get started guide](/page-shield/get-started/).
