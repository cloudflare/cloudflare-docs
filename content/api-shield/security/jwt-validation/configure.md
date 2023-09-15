---
title: Configure
pcx_content_type: how-to
type: overview
layout: list
meta:
  title: Configure JWT Validation
---

# Configure JWT Validation

Use the Cloudflare API to configure [JWT Validation](/api-shield/security/jwt-validation/), which validates the integrity and validity of JWTs sent by clients to your API or web application.

1. Gather the information on the JWT issuer you want to verify tokens from.
2. Create a Token Validation Configuration JSON object.
3. `POST` the JSON object to the Cloudflare API to create a new security policy.
4. Observe requests that may be failing the new security policy.

## Required information

| Field name | Description | Example | Notes |
| --- | --- | --- | --- |
|  `token type` | This specifies the type of token to validate. | `jwt` | Only `jwt` is currently supported. | 
| `title` | A human-readable name for the configuration that allows to quickly identify the purpose of the configuration. | Production JWT configuration |
| `description ` | A human-readable description that gives more details than title which serves as a means to allow customers to better document the use of the configuration. | This configuration is used for all endpoints in endpoint management and checks the JWT in the authorization header.|
| `action` | How we should configure the firewall to act on the validation result. | `block` | possible: `log` or `block` |
| `enabled` | This enables or disables acting on the validation result. | `true` | possible: `true` or `false` |
| `allow_absent_token` | How API Shield should handle requests that do not have a JWT present. Setting this to `true` allows hybrid endpoints where JWTs, if present, must be valid, but JWTs are still allowed to be absent. | `true` | possible: `true` or `false` |
| `token_schema` | This describes where the JWT can be found on a request. Currently, we only support extracting them from headers. | See example below. |The type must be `header`. The name field denotes the header name from which to extract the JWT. |
| `credentials` | This describes the cryptographic public keys that should be used to validate JWTs. This field must be a JSON web key. | See example below. | See note below. |

{{<Aside type="note">}}
For `credentials`, we support `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, and `ES256`. RSA keys must be at least 2048-bit. Each JSON web key must have a “KID” which must be present in the JWT's header as well to allow  API Shield to match them. We allow up to 4 different keys in order to aid in key rollover.
{{</Aside>}}

## Create a Token Validation Configuration JSON object

Refer to the example below to view the configuration using information required for the setup. If you would like to create JWKs for testing, see [mkjwk JSON Web Key Generator](https://mkjwk.org/).

```json
{
    "token_type": "jwt",
    "title": "example title",
    "description": "example description",
    "action": "block",
    "allow_absent_token": true,
    "enabled": true,
    "token_schema": {
        "type": "header",
        "name": "authorization"
    },
    "credentials": {
        "keys": [
            {
                "kty": "EC",
                "use": "sig",
                "kid": "test",
                "x": "-0LNzBheJPn-Zy6JmanTIUX7xc3jgqU714IQY0oU6mw",
                "y": "KONxBybUcRsJQmtu17jMAHsILSw009AuU3ulfUGv3FI",
                "alg": "ES256"
            }
        ]
    }
}
```

## Send the configuration to Cloudflare's API

Use cURL or any other API client tool to send the new configuration to Cloudflare’s API to enable JWT Validation. Make sure to replace `{zoneID}` with the relevant zone ID and add your [authentication credentials](/fundamentals/api/get-started/create-token/) header.

```bash
---
header: Example using cURL
---
curl "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/token_validation" \
--header "Content-Type: application/json" \
--data '{
    "token_type": "jwt",
    "title": "example title",
    "description": "example description",
    "action": "block",
    "allow_absent_token": true,
    "enabled": true,
    "token_schema": {
        "type": "header",
        "name": "authorization"
    },
    "credentials": {
        "keys": [
            {
                "kty": "EC",
                "use": "sig",
                "kid": "test",
                "x": "-0LNzBheJPn-Zy6JmanTIUX7xc3jgqU714IQY0oU6mw",
                "y": "KONxBybUcRsJQmtu17jMAHsILSw009AuU3ulfUGv3FI",
                "alg": "ES256"
            }
        ]
    }
}'
```

The response will be in a Cloudflare `v4` response envelope and the result contains the created configuration. Note the rule ID in the response in order to view any requests failing the policy.

## Observe requests matching the policy

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Navigate to **Security** > **Events** to view the Firewall Events.
3. Filter for a specific rule ID. The rule ID used for filtering can be obtained from the response of a `GET` (`GET https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/token_validation`) request after having created a token configuration using the `POST` request. The rule ID will be present as soon as the rule has been correctly setup. 

## Maintenance

### Update the keys

It is best practice to rotate keys after some time. To support updating the keys, Cloudflare allows up to 4 keys per configuration. This allows you to add a second, new key to an already existing key. You can start issuing JWTs with the new key only and remove the old key after some time. Additionally, this feature allows the deployment of testing or development keys next to production keys.

The input to updating the keys is the same as when creating a configuration where you supplied the initial keys using the credentials key and needs to be a JWK. 

{{<Aside type="note">}} 
Cloudflare will remove any fields that are unnecessary from each key and will drop keys that we do not support. 

It is highly recommended to validate the output of the API call to check that the resulting keys appear as intended.
{{</Aside>}}

Use the `PUT` command to update keys. 

```bash
---
header: Example using cURL
---
curl --request PUT 'https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/token_validation/{configID}/credentials' \
--header 'Content-Type: application/json' \
--data '{
        "keys": [
            {
                "kty": "EC",
                "use": "sig",
                "kid": "test",
                "x": "-0LNzBheJPn-Zy6JmanTIUX7xc3jgqU714IQY0oU6mw",
                "y": "KONxBybUcRsJQmtu17jMAHsILSw009AuU3ulfUGv3FI",
                "alg": "ES256"
            },
            {
                "kty": "EC",
                "crv": "P-256",
                "kid": "test-2",
                "x": "iIbPRbOeLzjGPvv7iwmzCOTU03R0xDqbenp2D6GUcWo",
                "y": "tDkEh95PnfWwIXciCtdBBVA7wfghx_egmZ1Zcvu2lWw",
                "alg": "ES256"
            }
         ]
    }'
```

Make sure to replace `{zoneID}` with the relevant zone ID and add your [authentication credentials](/fundamentals/api/get-started/create-token/) header.

### Update parts of the configuration

You may want to first log requests that fail the policy in the firewall and only later block them. Similarly, requirements may change and other parts of the configuration need to be changed. To support this, we allow modifying parts of an existing configuration.

Use `PATCH` to update other configuration parameters. 

{{<Aside type="note">}} 
You can only modify the following fields with `PATCH`: `title`, `description`, `action`, `enabled`, and `allow_absent_token`. Use `PUT` to modify JWK material. 
{{</Aside>}}

```bash
---
header: Example using cURL
---
curl --request PATCH "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/token_validation/{configID}" \
--header "Content-Type: application/json" \
--data '{
    "description": "example description",
    "allow_absent_token": false,
}'
```
Make sure to replace `{zoneID}` with the relevant zone ID and add your [authentication credentials](/fundamentals/api/get-started/create-token/) header.

## How it works

### Acting on JWT Validation

JWT Validation manages the Cloudflare firewall on your behalf. There is no need to create firewall rules and customers may not create custom firewall rules with JWT validation properties. Your token validation configuration applies to the entire zone.

There are three properties in a token validation configuration that control how the firewall is configured: `enabled`, `action`, and `allow_absent_token`. Refer to the [required information for setup](/api-shield/security/jwt-validation/configure/#required-information) for example values of these fields.

| Property | Description | 
| --- | --- |
| `enabled` | This acts as a global on/off switch. |
| `allow_absent_token` | This enables a hybrid mode in which the firewall will not act on requests that completely lack a JWT. | 
| `action` | This allows to either block a request or log the request. |

### Performing JWT Validation

Here is an overview of how JWT Validation processes incoming requests:

1. We extract the JWT in accordance with the configuration from the incoming request.
2. We decode the JWT and look for the JWTs header KID claim.
3. We use the KID and ALG claim to find the correct keys in the list of supplied keys. 

  {{<Aside type="note">}}
  The absence of matching keys directly marks the JWT as invalid.
  {{</Aside>}}

4. We validate the authenticity of the JWT by checking the signature using the selected key.
5. Should the JWT contain an EXP claim (expiration time), we validate that the JWT is not expired. 

  {{<Aside type="note">}} 
  We allow a mismatch of up to 60 seconds to account for clock drifts between the Cloudflare network and the JWT issuer. A token may still be regarded as valid one minute after it was supposed to expire when both clocks are perfectly in sync.
  {{</Aside>}}

6. Should the JWT contain a NBF claim (not before time), we validate that the JWT is already valid. 

  {{<Aside type="note">}} 
  The same accuracy applies as for EXP claims.  As such, a token may be already regarded as valid one minute before its NBF claim in case of perfect synchronization between issuer and validator.
  {{</Aside>}}

7. The final validation result and whether a token was present at all is made available to the firewall which applies the policy’s configured action (`log`/`block`).
