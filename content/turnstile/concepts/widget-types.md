---
title: Widget types
pcx_content_type: reference
weight: 1
---

# Widget types 

Every instance of Turnstile belongs to a Turnstile widget. It is configured on a per-widget level. Every widget has a mode, a label, a {{<glossary-tooltip term_id="sitekey">}}sitekey{{</glossary-tooltip>}}, and a {{<glossary-tooltip term_id="secret key">}}secret key{{</glossary-tooltip>}}. 

The 3 modes for Turnstile are **Managed**, **Non-Interactive**, and **Invisible**.

## Managed (recommended)

This mode is fully managed by Cloudflare. It automatically chooses the appropriate action based on various signals and risk levels. Cloudflare will use the information from the visitor to decide if an interactive challenge should be used. Turnstile will only require interaction if a further check is necessary to verify that the visitor is human. When Turnstile shows an interaction, the user will be prompted to check a box (no images or text to decipher). This managed mode is ideal for users who want a simple configuration without needing to fine-tune the behavior. 

Refer to [appearance modes](/turnstile/get-started/client-side-rendering/#appearance-modes) to configure whether to have the widget be always visible or visible only when interaction is required. 

### Light mode

![Managed challenge](/images/turnstile/light-verify.png)
![Verifying the challenge](/images/turnstile/light-verifying.png)
![Successful managed challenge](/images/turnstile/light-success.png)

### Dark mode

![Managed challenge](/images/turnstile/dark-verify.png)
![Verifying the challenge](/images/turnstile/dark-verifying.png)
![Successful managed challenge](/images/turnstile/dark-success.png)

## Non-Interactive

Visitors will see a widget with a loading bar while the browser challenges run. Unlike managed mode, visitors will never be required or prompted to interact with the widget. This mode is ideal for users who want to prioritize visitor experience and do not want to add any friction with a Turnstile interaction.

### Light mode

![Verifying the challenge](/images/turnstile/light-verifying.png)
![Successful managed challenge](/images/turnstile/light-success.png)

### Dark mode

![Verifying the challenge](/images/turnstile/dark-verifying.png)
![Successful managed challenge](/images/turnstile/dark-success.png)

## Invisible

This mode is similar to non-interactive mode where visitors will never interact with the Turnstile widget. Visitors will not see a widget or any indication that an invisible browser challenge is in progress. Invisible challenges should take a few seconds to complete.