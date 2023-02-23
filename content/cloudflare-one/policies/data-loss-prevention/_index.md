---
pcx_content_type: concept
title: Data Loss Prevention
weight: 5
---

# Data Loss Prevention

Cloudflare Data Loss Prevention (DLP) complements [Secure Web Gateway](/cloudflare-one/policies/filtering/) by inspecting HTTP traffic for the presence of sensitive data such as social security numbers and credit card numbers. 

DLP scans the entire HTTP body, which may include uploaded or downloaded Microsoft Office documents (Office 2007 and later), PDFs, chat messages, forms, and other web content. Visibility varies depending on the site or application. DLP does not scan non-HTTP traffic such as email, nor does it scan any traffic that bypasses Cloudflare Gateway (for example, traffic that matches a [_Do Not Inspect_](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) rule).

## Feature availability

Data Loss Prevention is only available on Enterprise plans.
