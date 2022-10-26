---
pcx_content_type: reference
title: Predefined DLP Profiles
weight: 1
---

# Predefined DLP Profiles

Cloudflare Zero Trust provides predefined DLP Profiles for common types of sensitive data. A DLP Profile is a collection of regular expressions (also known as detection entries) that Gateway will match on when scanning your HTTP traffic. Some detection entries include built-in validation checks to increase detection granularity.

## Financial information

- Credit card numbers begin with a six or eight-digit Issuer Identification Number (IIN) and are followed by up to 23 additional digits. Credit card numbers must adhere to Luhn's algorithm as a method of validation.
- ABA routing numbers and IBAN are validated algorithmically with check digits.

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
| United States ABA Routing Number | `\b\d{9}\b` |
| IBAN | `\b([A-Z]{2}[ \-]?[0-9]{2})[ \-]?([A-Z0-9]{4}[ \-]?){1,7}[A-Z0-9]{1,4}\b` |
{{</table-wrap>}}

## National identifiers

- Detections are validated algorithmically when possible. Some detections such as United States SSNs do not adhere to algorithmic validation.
- Commonly used separators are required to match the detection entry. For example, `000-00-0000` matches a United States SSN but `000000000` does not.

{{<table-wrap>}}
| Detection entry | Regex |
|---|---|
| United States SSN Numeric Detection | `\b\d{3}[-\. ]\d{2}[-\. ]\d{4}\b`|
| 'Social Security Number' Text | `(?i:\bs\.?s\.?(?:n\|#)\|\bsocial security\b)` |
| Australia Tax File Number | `\b\d{2,3}([- ])?\d{3}([- ])?\d{3}\b` |
| Canada Social Insurance Number | `\b\d{3}[-\. ]\d{3}[-\. ]\d{3}\b` |
| France Social Security Number | `\b[1278]\d{2}(0[1-9]\|1[0-2]\|20)(\d{2}\|2[AB])\d{3}\d{3}\d{2}\b` |
| Singapore National Registration Identity Card Number | `\b[FGMST]\d{7}[ABCDEFGHIJKLMNPQRTUWXZ]\b` |
| Taiwan National Identification Number | `\b[A-Z][12]\d{8}\b` |
| United Kingdom NHS Number | `\b\d{3}[- ]\d{3}[- ]\d{4}\b` |
| United Kingdom National Insurance Number | `\b(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:[ ]?\d[ ]?){6}[A-D]?\b` |
{{</table-wrap>}}
