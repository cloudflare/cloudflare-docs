# Configuration

## Schema Validation Setup

**Upload schema (Dashboard):**
```
Security > API Shield > Schema validation > Add validation
- Upload .yml/.yaml/.json (OpenAPI v3.0)
- Endpoints auto-added to Endpoint Management
- Action: Log/Block/None
```

**Change default action:**
```
Security > API Shield > Settings > Schema validation
Per-endpoint: Filter → ellipses → Change action
```

**Fallthrough rule** (catch-all unknown endpoints):
```
Security > API Shield > Settings > Fallthrough > Use Template
- Select hostnames
- Create rule with cf.api_gateway.fallthrough_triggered
```

**Body inspection:** Supports `application/json`, `*/*`, `application/*`. Disable origin MIME sniffing to prevent bypasses.

## JWT Validation

**Setup token config:**
```
Security > API Shield > Settings > JWT Settings > Add configuration
- Name: "Auth0 JWT Config"
- Location: Header/Cookie + name (e.g., "Authorization")
- JWKS: Paste public keys from IdP
```

**Create validation rule:**
```
Security > API Shield > API Rules > Add rule
- Hostname: api.example.com
- Deselect endpoints to ignore
- Token config: Select config
- Enforce presence: Ignore or Mark as non-compliant
- Action: Log/Block/Challenge
```

**Rate limit by JWT claim:**
```wirefilter
lookup_json_string(http.request.jwt.claims["{config_id}"][0], "sub")
```

**Special cases:**
- Two JWTs, different IdPs: Create 2 configs, select both, "Validate all"
- IdP migration: 2 configs + 2 rules, adjust actions per state
- Bearer prefix: API Shield handles with/without
- Nested claims: Dot notation `user.email`

## Mutual TLS (mTLS)

**Setup:**
```
SSL/TLS > Client Certificates > Create Certificate
- Generate CF-managed CA (all plans)
- Upload custom CA (Enterprise, max 5)
```

**Configure mTLS rule:**
```
Security > API Shield > mTLS
- Select hostname(s)
- Choose certificate(s)
- Action: Block/Log/Challenge
```

**Test:**
```bash
openssl req -x509 -newkey rsa:4096 -keyout client-key.pem -out client-cert.pem -days 365
curl https://api.example.com/endpoint --cert client-cert.pem --key client-key.pem
```

## Session Identifiers

Critical for Sequence Mitigation + analytics. Configure header/cookie that uniquely IDs API users.

**Examples:** JWT sub claim, session token, API key, custom user ID header

**Configure:**
```
Security > API Shield > Settings > Session Identifiers
- Type: Header/Cookie
- Name: "X-User-ID" or "Authorization"
```

## Terraform

```hcl
# Session identifier
resource "cloudflare_api_shield" "main" {
  zone_id = var.zone_id
  auth_id_characteristics {
    type = "header"
    name = "Authorization"
  }
}

# Add endpoint
resource "cloudflare_api_shield_operation" "users_get" {
  zone_id  = var.zone_id
  method   = "GET"
  host     = "api.example.com"
  endpoint = "/api/users/{id}"
}

# JWT validation rule
resource "cloudflare_ruleset" "jwt_validation" {
  zone_id = var.zone_id
  name    = "API JWT Validation"
  kind    = "zone"
  phase   = "http_request_firewall_custom"

  rules {
    action = "block"
    expression = "(http.host eq \"api.example.com\" and not cf.api_gateway.jwt_claims_valid)"
    description = "Block invalid JWTs"
  }
}
```
