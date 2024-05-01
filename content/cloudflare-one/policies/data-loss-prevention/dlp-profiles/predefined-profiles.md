---
pcx_content_type: reference
title: Predefined profiles
weight: 2
---

# Predefined profiles

Cloudflare Zero Trust provides predefined DLP profiles for common types of sensitive data. Some profiles include built-in validation checks to increase detection granularity. Additionally, you can configure [advanced settings](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/advanced-settings/) for predefined profiles.

## Credentials and secrets

The following secrets are validated with regex.

- Google Cloud Platform keys
- AWS keys
- Azure API keys
- SSH keys

## Financial information

Credit card numbers begin with a six or eight-digit Issuer Identification Number (IIN) and are followed by up to 23 additional digits. CVVs are not validated.

{{<table-wrap>}}

| Detection entry                  | Notes                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------- |
| American Express Card Number     | Validated using [Luhn's algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). |
| American Express Text            | Text matching `amex` or `american express`.                                       |
| Diners Club Card Number          | Validated using Luhn's algorithm.                                                 |
| Generic CVV Card Number          | Validated with regex.                                                             |
| Mastercard Card Number           | Validated using Luhn's algorithm.                                                 |
| Mastercard Text                  | Text matching `mastercard`.                                                       |
| Union Pay Card Number            | Validated using Luhn's algorithm.                                                 |
| Union Pay Text                   | Text matching `union pay`.                                                        |
| Visa Card Number                 | Validated using Luhn's algorithm.                                                 |
| Visa Text                        | Text matching `visa`.                                                             |
| United States ABA Routing Number | Validated algorithmically with checksum.                                          |
| IBAN                             | Validated with checksum.                                                          |

{{</table-wrap>}}

## Health information

The following diagnosis and medication names are checked for surrounding ASCII characters to prevent false positives.

- FDA active ingredients
- FDA drug names
- ICD-10 FY2023 short descriptions

## National identifiers

Detections are validated algorithmically when possible.

{{<table-wrap>}}

| Detection entry                                      | Notes                                                                                                                                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| United States SSN Numeric Detection                  | Commonly used separators are required to match the detection entry. For example, `000-00-0000` matches but `000000000` does not. Social security numbers do not adhere to algorithmic validation. |
| Social Security Number Text                          | Text matching `ssn` or `social security`.                                                                                                                                                         |
| Australia Tax File Number                            | Validated with checksum.                                                                                                                                                                          |
| Canada Social Insurance Number                       | Validated using Luhn's algorithm.                                                                                                                                                                 |
| France Social Security Number                        | Validated with regex.                                                                                                                                                                             |
| Hong Kong Identity Card (HKIC) Number                | Validated with checksum.                                                                                                                                                                          |
| Indonesia Identity Card Number                       | Validated with regex.                                                                                                                                                                             |
| Malaysian National Identity Card Number              | Validated with regex.                                                                                                                                                                             |
| Philippines Unified Multi-Purpose ID (UMID) Number   | Validated with regex.                                                                                                                                                                             |
| Singapore National Registration Identity Card Number | Validated with checksum.                                                                                                                                                                          |
| Taiwan National Identification Number                | Validated with checksum.                                                                                                                                                                          |
| Thai Identity Card Number                            | Validated with checksum.                                                                                                                                                                          |
| United Kingdom NHS Number                            | Validated with checksum.                                                                                                                                                                          |
| United Kingdom National Insurance Number             | Validated with regex.                                                                                                                                                                             |

{{</table-wrap>}}

## Source code

The following programming languages are validated with natural language processing (NLP).

- C
- C++
- C#
- Go
- Haskell
- Java
- JavaScript
- Lua
- Python
- R
- Rust
- Swift
