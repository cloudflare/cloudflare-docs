---
pcx_content_type: reference
title: Predefined profiles
weight: 2
---

# Predefined profiles

Cloudflare Zero Trust provides predefined DLP profiles for common types of sensitive data. Some profiles include built-in validation checks to increase detection granularity.

## Financial information

Credit card numbers begin with a six or eight-digit Issuer Identification Number (IIN) and are followed by up to 23 additional digits. Credit card numbers must adhere to Luhn's algorithm as a method of validation.

{{<table-wrap>}}

| Detection entry                  | Notes                                                                |
| -------------------------------- | -------------------------------------------------------------------- |
| American Express Card Number     |                                                                      |
| American Express Text            | Text matching `amex` or `american express`.                          |
| Diners Club Card Number          |                                                                      |
| Generic CVV Card Number          |                                                                      |
| Mastercard Card Number           |                                                                      |
| Mastercard Text                  | Text matching `mastercard`.                                          |
| Union Pay Card Number            |                                                                      |
| Union Pay Text                   | Text matching `union pay`.                                           |
| Visa Card Number                 |                                                                      |
| Visa Text                        | Text matching `visa`.                                                |
| United States ABA Routing Number | ABA routing numbers are validated algorithmically with check digits. |
| IBAN                             | IBAN are validated algorithmically with check digits.                |

{{</table-wrap>}}

## National identifiers

Detections are validated algorithmically when possible.

{{<table-wrap>}}

| Detection entry                                      | Notes                                                                                                                                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| United States SSN Numeric Detection                  | Commonly used separators are required to match the detection entry. For example, `000-00-0000` matches but `000000000` does not. Social security numbers do not adhere to algorithmic validation. |
| Social Security Number Text                          | Text matching `ssn` or `social security`.                                                                                                                                                         |
| Australia Tax File Number                            |                                                                                                                                                                                                   |
| Canada Social Insurance Number                       |                                                                                                                                                                                                   |
| France Social Security Number                        |                                                                                                                                                                                                   |
| Singapore National Registration Identity Card Number |                                                                                                                                                                                                   |
| Taiwan National Identification Number                |                                                                                                                                                                                                   |
| United Kingdom NHS Number                            |                                                                                                                                                                                                   |
| United Kingdom National Insurance Number             |                                                                                                                                                                                                   |

{{</table-wrap>}}

## Credentials and secrets

{{<table-wrap>}}

| Detection entry            | Notes |
| -------------------------- | ----- |
| Google Cloud Platform keys |       |
| AWS keys                   |       |
| Azure API keys             |       |
| SSH keys                   |       |

{{</table-wrap>}}
