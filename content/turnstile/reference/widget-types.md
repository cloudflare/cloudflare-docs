---
title: Widget types
pcx_content_type: reference
weight: 7
layout: single
---

# Widget types 

Every instance of Turnstile belongs to a Turnstile widget. It is configured on a per-widget level. Every widget has a mode, a label, a sitekey, and a secret key. 

The 3 modes for Turnstile are **Managed**, **Non-Interactive**, and **Invisible**.

## Managed (recommended)

Cloudflare will use information from the visitor to decide if an interactive challenge should be used. If we show an interaction, the user will be prompted to check a box (no images or text to decipher).

### Light mode

![Managed challenge](/images/turnstile/light-verify.png)
![Verifying the challenge](/images/turnstile/light-verifying.png)
![Successful managed challenge](/images/turnstile/light-success.png)

### Dark mode

![Managed challenge](/images/turnstile/dark-verify.png)
![Verifying the challenge](/images/turnstile/dark-verifying.png)
![Successful managed challenge](/images/turnstile/dark-success.png)

## Non-Interactive

Users will see a widget with a loading bar while the browser challenges run. Users will never be required or prompted to interact with the widget. 

### Light mode

![Verifying the challenge](/images/turnstile/light-verifying.png)
![Successful managed challenge](/images/turnstile/light-success.png)

### Dark mode

![Verifying the challenge](/images/turnstile/dark-verifying.png)
![Successful managed challenge](/images/turnstile/dark-success.png)

## Invisible

Users will not see a widget or any indication that an invisible browser challenge is in progress. Invisible challenges should take a few seconds to complete. 
