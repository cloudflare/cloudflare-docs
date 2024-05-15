---
title: Configure JWT claims
pcx_content_type: how-to
type: overview
layout: wide
weight: 3
meta:
  title: Configure JWT claims with Transform Rules
---

# Configure JWT claims with Transform Rules

You can forward information from [JSON Web Token (JWT)](/api-shield/security/jwt-validation/) to the origin in a header by creating [Transform Rules](/rules/transform/) using claims that Cloudflare has verified via the JSON Web Token.

Claims are available through the `http.request.jwt.claims` firewall fields.

For example, the following expression will extract the user claim from a token processed by the Token Configuration with `TOKEN_CONFIGURATION_ID`:

```json

lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "claim_name")

```

​​Refer to [Configure JWT Validation](/api-shield/security/jwt-validation/configure/) for more information about creating a Token Configuration.

## Create a Transform Rule

As an example, to send the header `x-send-jwt-claim-user` request header to the origin, you must create a Transform Rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Rules** > **Transform Rules**.
3. Select **Modify Request Header** > **Create rule**.
4. Enter a rule name and a filter expression, if applicable.
5. Choose **Set dynamic**.
6. Set the header name.
7. Set the value to `lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "user")`, where `<TOKEN_CONFIGURATION_ID>` is your token configuration ID found in JWT Validation.