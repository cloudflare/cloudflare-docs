---
pcx_content_type: reference
title: Predefined DLP Profiles
weight: 1
---

# Predefined DLP Profiles

Cloudflare Zero Trust provides predefined DLP Profiles for common types of sensitive data. A DLP Profile is a collection of regular expressions (also known as detection entries) that Gateway will match on when scanning your HTTP traffic. Some detection entries include built-in validation checks to increase detection granularity.

## Credit cards

Credit card numbers begin with a six or eight-digit Issuer Identification Number (IIN) and are followed by up to 23 additional digits. Numbers must adhere to Luhn's algorithm as a method of validation.

{{<table-wrap>}}
| Detection entry | Regex |
|---|---|
| American Express Card Number | `\b3[47]\d{2}([-\. ])?\d{6}([-\. ])?\d{5}\b` |
| American Express Text | `(?i:\bamex\b\|\bamerican express\b)` |
| Diners Club Card Number | `\b3(?:0[0-5]\|[68][0-9])[0-9]{11}\\b` |
| Generic CVV Card Number | `\bcvv(?::\|no:?\|#\|)? ?\d{3,4}\b` |
| Mastercard Card Number | `\b(5[1-5][0-9]{2}([-\. ])?[0-9]{4}([-\. ])?[0-9]{4}([-\. ])?[0-9]{4})\|(2(22[1-9]([-\. ])?\d{4}([-\. ])?\d{4}([-\. ])?\d{4}\|2[3-9]\d{1}([-\. ])?\d{4}([-\. ])?\d{4}([-\. ])?\d{4}\|[3-6]\d{2}([-\. ])?\d{4}([-\. ])?\d{4}([-\. ])?\d{4}\|7[0-1]\d{1}([-\. ])?\d{4}([-\. ])?\d{4}([-\. ])?\d{4}\|720([-\. ])?\d{4}([-\. ])?\d{4}([-\. ])?\d{4}))\b` |
| Mastercard Text | `(?i:\bmastercard\b)` |
| Union Pay Card Number | `\b(62[0-9]{14,17})\b` |
| Union Pay Text | `(?i:\bunion pay\b)` |
| Visa Card Number | `\b4\d{3}([-\. ])?\d{4}([-\. ])?\d{4}([-\. ])?\d{4}\b` |
| Visa Text | `(?i:\bvisa\b)` |
{{</table-wrap>}}

## U.S. Social Security numbers

Social Security numbers must resemble the format `xxx-xx-xxxx`. Separators are required, so 000-00-0000 will match but 000000000 will not. SSNs do not adhere to any algorithmic validation.

{{<table-wrap>}}
| Detection entry | Regex |
|---|---|
| SSN Numeric Detection | `\b\d{3}[-\. ]\d{2}[-\. ]\d{4}\b`|
| SSN Text | `(?i:\bs\.?s\.?(?:n\|#)\|\bsocial security\b)` |
{{</table-wrap>}}
