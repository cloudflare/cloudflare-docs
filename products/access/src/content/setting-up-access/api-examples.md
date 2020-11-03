---
order: 8
---

# Access Rule API Examples

Access users can create policies, including individual rule blocks inside of group or policy bodies. For example, this simple policy allows all Cloudflare email account users, with the exception of one account:

```json
{
  "name": "allow cloudflare employees",
  "decision": "allow",
  "include": [
    {
      "email_domain": {
        "domain": "cloudflare.com"
      }
    }
  ],
  "exclude": [
    {
      "email": {
        "email": "notthisperson@cloudflare.com"
      }
    }
  ],
  "require": []
}
```

## Example rule configurations

These are commonly used rule configurations.

### Email

Allow a specific email address

```json
{
  "email": {
    "email": "james@example.com"
  }
}
```

### Email domain

Allow an entire email domain

```json
{
  "email_domain": {
    "domain": "cloudflare.com"
  }
}
```

### Country code

Allow specific countries

```json
{
  "geo": {
    "country_code": "US"
  }
}
```

### Authentication method

Allow access based on the "amr" identifier

```json
{
  "auth_method": {
    "auth_method": "hwk"
  }
}
```

### IP range

Allow an IP Range

```json
{
  "ip": {
    "ip": "127.0.0.1/32"
  }
}
```

### Access group

Use a pre-existing Access group

```json
{
  "group": {
    "id": "aa0a4aab-672b-4bdb-bc33-a59f1130a11f"
  }
}
```

### Everyone

Allow anyone to login

```json
{
  "everyone": {}
}
```

### mTLS Certificate

The request will need to present a valid certificate

```json
{
  "certificate": {}
}
```

### Common name

The request will need to present a valid certificate with an expected common name

```json
{
  "common_name": {
    "common_name": "james@example.com"
  }
}
```

### Service token

The request will need to present the correct service token headers

```json
{
  "service_token": {
    "token_id": "e9808c3a-705c-4afc-a507-6e4b083ff399"
  }
}
```

### Any valid service token

The request will need to present the headers for any service token created for this account

```json
{
  "any_valid_service_token": {}
}
```

### G Suite® Group

Allow members of a specific G Suite group:

```json
{
  "gsuite": {
    "email": "admins@mycompanygsuite.com",
    "identity_provider_id": "ca298b82-93b5-41bf-bc2d-10493f09b761"
  }
}
```

### GitHub™ Organization

Allow members of a specific GitHub organization:

```json
{
  "github-organization": {
    "name": "cloudflare",
    "identity_provider_id": "ca298b82-93b5-41bf-bc2d-10493f09b761"
  }
}
```

### Azure® Group

Allow members of an Azure Group. The ID is the group UUID (_`id`_) in Azure:

```json
{
  "azureAD": {
    "id": "86773093-5feb-48dd-814b-7ccd3676ff50",
    "identity_provider_id": "ca298b82-93b5-41bf-bc2d-10493f09b761"
  }
}
```

### Okta® Group

Allow members of an Okta Group:

```json
{
  "okta": {
    "name": "admins",
    "identity_provider_id": "ca298b82-93b5-41bf-bc2d-10493f09b761"
  }
}
```

### SAML Attribute

Allow users with specific SAML attributes:

```json
{
  "saml": {
    "attribute_name": "group",
    "attribute_value": "admins",
    "identity_provider_id": "ca298b82-93b5-41bf-bc2d-10493f09b761"
  }
}
```
