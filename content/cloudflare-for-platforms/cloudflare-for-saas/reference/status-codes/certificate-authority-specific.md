---
pcx_content_type: reference
title: Certificate authority specific
weight: 4
---

# Certificate authority specific

Certain certificate authorities have specific error codes.

## DigiCert

These codes are rooted on the `/v4/zones/:zone_id/custom_hostnames` API endpoint. They will be reported in the `validation_errors` attribute of the ssl attribute for a `custom_hostname` resource.

### pending_validation errors

- **HTTP Status Code:** 201 Created on POST; 202 Accepted on PATCH; 200 OK on GET
  - **Error:** %s reported as potential risk: google_safe_browsing
  - **Status:** pending_validation
  - **Reason:** Google maintains a list of URLs that contain malware or phishing. If the domain submitted for validation matches any domain in a Google URL, it will fail the risk check.

- **HTTP Status Code:** 201 Created on POST; 202 Accepted on PATCH; 200 OK on GET
  - **Error:** %s reported as potential risk: risky_keywords
  - **Status:** pending_validation
  - **Reason:** Risky Keywords are a set of DigiCert Rules for domains that have potential risk to us or our customers. If the domain submitted for validation matches any of the risky keyword rules it will fail the risk check. (some example rules: "contains google.com", "ends with amazon.com", "equals bing.com")

- **HTTP Status Code:** 201 Created on POST; 202 Accepted on PATCH; 200 OK on GET
  - **Error:** %s reported as potential risk: phishtank
  - **Status:** pending_validation
  - **Reason:** Phishtank maintains a list of URLs that contain malware or phishing. If the domain submitted for validation matches any domain in a Phishtank URL, it will fail the risk check.

- **HTTP Status Code:** 201 Created on POST; 202 Accepted on PATCH; 200 OK on GET
  - **Error:** Domain validation failed for %s
  - **Status:** pending_validation
  - **Reason:** Could be multiple reasons, with the most common reason being that the DCV tokens have expired.

### pending_issuance errors

- **HTTP Status Code:** 201 Created on POST; 202 Accepted on PATCH; 200 OK on GET
  - **Error:** Issuance blocked by a CAA error for %s
  - **Status:** pending_issuance
  - **Reason:** The Certification Authority Authorization (CAA) DNS Resource Record allows a DNS domain name holder to specify one or more Certification Authorities (CAs) authorized to issue certificates for that domain. CAA Resource Records allow a public Certification Authority to implement additional controls to reduce the risk of unintended certificate mis-issue.

- **HTTP Status Code:** 201 Created on POST; 202 Accepted on PATCH; 200 OK on GET
  - **Error:** Issuance blocked due to the Common Name being too long (over %d characters).
  - **Status:** pending_issuance
  - **Reason:** Common names are limited to 64 characters and subject alternative names (SANs) are limited to 255 characters.
