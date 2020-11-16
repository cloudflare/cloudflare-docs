---
title: Custom CSRs
order: 2
---

# Custom Certificate Signing Requests

## Success codes

Endpoint|Method|HTTP Status Code
--------|------|----
`/api/v4/zones/:zone_id/custom_csrs`|POST|201 Created
`/api/v4/zones/:zone_id/custom_csrs`|GET|200 OK
`/api/v4/zones/:zone_id/custom_csrs/:custom_csr_id`|GET|200 OK
`/api/v4/zones/:zone_id/custom_csrs/:custom_csr_id`|DELETE|200 OK

## Error codes

HTTP Status Code|API Error Code|Error Message
----------------|--------------|-------------
400|1400|Unable to decode the JSON request body. Please check your input and try again.
400|1401|Zone ID is required. Please check your input and try again.
400|1402|The request has no Authorization header. Please check your input and try again.
400|1405|Country field is required. Please check your input and try again.
400|1406|State field is required. Please check your input and try again.
400|1407|Locality field is required. Please check your input and try again.
400|1408|Organization field is required. Please check your input and try again.
400|1409|Common Name field is required. Please check your input and try again.
400|1410|The specified Common Name is too long. Maximum allowed length is %d characters. Please check your input and try again.
400|1411|At least one subject alternative name (SAN) is required. Please check your input and try again.
400|1412|Invalid subject alternative name(s) (SAN). SANs have to be smaller than 256 characters in length, cannot be IP addresses, cannot contain any special characters such as ~`!@#$%^&*()=+{}[]|\\;:'\",<>/? and cannot begin or end with a ‘-’ character. Please check your input and try again.
400|1413|Subject Alternative Names (SANs) with non-ASCII characters are not supported. Please check your input and try again.
400|1414|Reserved top domain subject alternative names (SAN), such as 'test', 'example', 'invalid' or 'localhost', is not supported. Please check your input and try again.
400|1415|Unable to parse subject alternative name(s) (SAN) - :reason. Please check your input and try again. Reasons: publicsuffix: cannot derive eTLD+1 for domain %q; publicsuffix: invalid public suffix %q for domain %q;
400|1416|Subject Alternative Names (SANs) ending in example.com, example.net, or example.org are prohibited. Please check your input and try again.
400|1417|Invalid key type. Only 'rsa2048' or 'p256v1' is accepted. Please check your input and try again.
400|1418|The custom CSR ID is invalid. Please check your input and try again.
401|1000|Unable to extract bearer token
401|1001|Unable to parse JWT token
401|1002|Bad JWT header
401|1003|Failed to verify JWT token
401|1004|Failed to get claims from JWT token
401|1005|JWT token does not have required claims
403|1403|No quota has been allocated for this zone. If you're already a paid SSL for SaaS customer, please contact your Customer Success Manager for additional provisioning. If you're not yet enrolled, please fill out this form and someone from our sales team will contact you: https://www.cloudflare.com/plans/enterprise/contact/.
403|1404|Access to generating CSRs has not been granted for this zone. If you're already a paid SSL for SaaS customer, please contact your Customer Success Manager for additional provisioning. If you're not yet enrolled, please fill out this form and someone from our sales team will contact you: https://www.cloudflare.com/plans/enterprise/contact/
404|1419|The custom CSR was not found.
409|1420|The custom CSR is associated with an active certificate pack. You will need to delete all associated active certificate packs before you can delete the custom CSR.
500|1500|Internal Server Error
