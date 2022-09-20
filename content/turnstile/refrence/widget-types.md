---
title: Widget Types
pcx_content_type: reference
weight: 8
layout: single
---

# Widget Types

Every instance of Turnstile belongs to a Turnstile widget. It is configured on a per-widget level. Every widget has a mode, a label, a sitekey, and a secret key. 

The 3 modes for Turnstile are **Managed**, **Non-Interactive**, and **Invisible**.

## Managed

A challenge that may require light user interaction.

### Light mode

![Managed challenge](/turnstile/static/images/light-verify.png)
![Verifying the challenge](/turnstile/static/images/light-verifying.png)
![Successful managed challenge](/turnstile/static/images/light-success.png)

### Dark mode

![Managed challenge](/turnstile/static/images/dark-verify.png)
![Verifying the challenge](/turnstile/static/images/dark-verifying.png)
![Successful managed challenge](/turnstile/static/images/dark-success.png)

## Non-Interactive

A non-interactive challenge where once it is invoked, it is executed and requires no user interaction.

### Light mode

![Verifying the challenge](/turnstile/static/images/light-verifying.png)
![Successful managed challenge](/turnstile/static/images/light-success.png)

### Dark mode

![Verifying the challenge](/turnstile/static/images/dark-verifying.png)
![Successful managed challenge](/turnstile/static/images/dark-success.png)

## Invisible

An invisible challenge that does not require any user interaction.

