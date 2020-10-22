---
order: 3
---

# Certificate authority specific

--------

## DigiCert

These codes are rooted on the /v4/zones/:zone_id/custom_hostnames API endpoint. They will be reported in the validation_errors attribute of the ssl attribute for a custom_hostname resource.

HTTP Status Code|Error|Status|Reason
----------------|-----|------|------
201 Created on POST; 202 Accepted on PATCH; 200 OK on GET|%s reported as potential risk: google_safe_browsing|pending_validation|Google maintains a list of URLs that contain malware or phishing. If the domain submitted for validation matches any domain in a Google URL it will fail the risk check.
201 Created on POST; 202 Accepted on PATCH; 200 OK on GET|%s reported as potential risk: risky_keywords|pending_validation|Risky Keywords are a set of Digicert Rules for domains that have potential risk to us or our customers. If the domain submitted for validation matches any of the risky keyword rules it will fail the risk check. (some example rules: "contains google.com", "ends with amazon.com", "equals bing.com")
201 Created on POST; 202 Accepted on PATCH; 200 OK on GET|%s reported as potential risk: phishtank|pending_validation|Phishtank maintains a list of URLs that contain malware or phishing. If the domain submitted for validation matches any domain in a Phishtank URL it will fail the risk check.
201 Created on POST; 202 Accepted on PATCH; 200 OK on GET|Domain validation failed for %s|pending_validation|Could be multiple reasons, with most common reason being that the DCV tokens have expired. DCV tokens have a TTL of 30 days.
201 Created on POST; 202 Accepted on PATCH; 200 OK on GET|Issuance blocked by a CAA error for %s|pending_issuance|The Certification Authority Authorization (CAA) DNS Resource Record allows a DNS domain name holder to specify one or more Certification Authorities (CAs) authorized to issue certificates for that domain. CAA Resource Records allow a public Certification Authority to implement additional controls to reduce the risk of unintended certificate mis-issue.
201 Created on POST; 202 Accepted on PATCH; 200 OK on GET|Issuance blocked due to the Common Name being too long (over %d characters).|pending_issuance|Common names are restricted to 64 characters, per RFC5280, while subject alternative names (SANs) can be up to 255 characters in length.
