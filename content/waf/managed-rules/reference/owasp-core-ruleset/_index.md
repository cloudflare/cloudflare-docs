---
pcx_content_type: configuration
title: Cloudflare OWASP Core Ruleset
weight: 3
---

# Cloudflare OWASP Core Ruleset

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the [OWASP ModSecurity Core Rule Set](https://owasp.org/www-project-modsecurity-core-rule-set/) (CRS). Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate a [threat score](/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score) and execute an action based on that score. When a rule in the ruleset matches a request, the threat score increases according to the rule score. If the final threat score is greater than the configured [score threshold](/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold), Cloudflare executes the action configured in the last rule of the ruleset.

## Resources

{{<directory-listing>}}
