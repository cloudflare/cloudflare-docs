---
pcx-content-type: concept
title: Access JWTs
weight: 5
layout: single
---

# Access JWTs

Cloudflare Access uses JSON Web Tokens (JWTs) to confirm a user’s identity before allowing or denying access to sensitive resources. Cloudflare securely creates these tokens through the OAUTH or SAML integration between Cloudflare Access and the configured identity provider.

Two tokens are generated:

- **Global session token**: a token generated for your [team domain](/cloudflare-one/glossary/#team-domain) that prevents a user from needing to login to each application. This token is stored at `https://<your-team-name>.cloudflareaccess.com` as a cookie labeled `CF_Authorization`.

- **Application token**: a token generated for each application that a user reaches. This token is stored on the application (for example, `https://jira.site.com`), as a cookie labeled `CF_Authorization`.

You can use the JWT to [validate requests](/cloudflare-one/identity/users/access-jwt/validating-json) on your origin.
