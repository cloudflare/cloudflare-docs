---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360059485272-Troubleshooting-Page-Shield
title: Troubleshooting Page Shield
---

# Troubleshooting Page Shield



### Why do I not see scripts after I activated Page Shield?

If you recently activated Page Shield, you may see a delay in reporting. 

Cloudflare creates reports based on a sample of your application traffic. These reports need a certain amount of traffic to be statistically valid.

### Why do I see scripts that I do not recognize?

Scripts often reference other scripts outside your application.

But, if you see unexpected scripts on your Script Monitor dashboard, check them for signs of malicious activity.

### Why do I see warnings in my browser's developer tools related to Content Security Policy (CSP)?

Page Shield uses a Content Security Policy (CSP) report-only directive to gather a list of all scripts running on your application.

Some browsers display scripts being reported as warnings in the console pane of their developer tools. For example:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[Report Only] Refused to execute inline script because it violates the following Content Security Policy directive: &quot;script-src 'none'&quot;. Either the 'unsafe-inline' keyword, a hash ('sha256-RFWPLDbv2BY+rCkDzsE+0fr8ylGr2R2faWMhq4lfEQc='), or a nonce ('nonce-...') is required to enable inline execution.</span></div></span></span></span></code></pre>{{</raw>}}

You can safely ignore these warnings, since they are related to the reports that Page Shield requires to detect loaded scripts. For more information, refer to [Page Shield's developer documentation](/page-shield/how-it-works/).

### Do I have access to Page Shield?

To learn more about availability, visit our [developer documentation](/page-shield/).

### How do I set up Page Shield?

For help setting up Page Shield, visit our [developer documentation](/page-shield/get-started).
