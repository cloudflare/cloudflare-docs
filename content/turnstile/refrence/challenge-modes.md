---
title: Challenge Modes
pcx_content_type: reference
weight: 6
layout: single
---

# Challenge Modes

Every instance of Turnstile belongs to a Turnstile widget. It is configured on a per-widget level instead of the traditional per-zone level. Every widget has a mode, a sitekey, and a secret key. 

The 3 modes for Turnstile are **Managed**, **Non-Interactive**, and **Invisible**.

## Managed

A challenge that may require user interaction.

![Managed challenge](/turnstile/static/images/turnstile-managed.png)
![Verifying the challenge](/turnstile/static/images/turnstile-verifying.png)
![Successful managed challenge](/turnstile/static/images/turnstile-success.png)

## Non-Interactive

A non-interactive challenge where once it is invoked, it is executed and requires no user interaction.

![Verifying the challenge](/turnstile/static/images/turnstile-verifying.png)
![Successful managed challenge](/turnstile/static/images/turnstile-success.png)

## Invisible

An invisible challenge that does not require any user interaction.

