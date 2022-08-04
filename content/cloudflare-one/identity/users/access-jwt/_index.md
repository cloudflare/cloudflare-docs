---
pcx-content-type: concept
title: Access JWTs
weight: 5
layout: single
---

# Access JWTs

Cloudflare Access uses JSON Web Tokens (JWTs) to confirm a user’s identity before allowing or denying access to sensitive resources. Cloudflare securely creates these tokens through the OAUTH or SAML integration between Cloudflare Access and the configured identity provider.

Two tokens are generated:

- **Global session token**: a token generated when a user logs in to Access. This token is stored as a cookie at your [team domain](/cloudflare-one/glossary/#team-domain) (for example, `https://<your-team-name>.cloudflareaccess.com`) and prevents a user from needing to log in to each application.

- **Application token**: a token generated for each application that a user reaches. This token is stored as a cookie on the application (for example, `https://jira.site.com`) and may be used to [validate requests](/cloudflare-one/identity/users/access-jwt/validating-json) on your origin.
