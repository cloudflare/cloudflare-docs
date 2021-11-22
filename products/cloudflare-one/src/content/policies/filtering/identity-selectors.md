---
order: 5
pcx-content-type: reference
---

# Create identity-based policies

With Cloudflare for Teams, you can create Secure Web Gateway policies that filter outbound traffic down to the user identity level. To do that, you can build DNS, HTTP or Network policies using a set of **identity-based selectors**. These selectors require Gateway with WARP mode to be enabled in the Cloudflare for Teams WARP client, and the user to be enrolled in the organization via the WARP client:

## User Email

Use this selector to create identity-based DNS rules based on a user’s email.

| UI name | API example value |
| -- | -- |
| User Email | `identity.email == "user-name@company.com"` |

## User Name

Use this selector to create identity-based DNS rules based on an IdP username for a particular user in the IdP.

| UI name | API example |
| -- | -- |
| User Name | `identity.name == "user-name"` |

## User Group IDs

Use this selector to create identity-based DNS rules based on an IdP group ID of which the user is configured as a member in the IdP.

| UI name | API example |
| -- | -- |
| User Group IDs | `identity.groups.id == "12jf495bhjd7893ml09o"` |

## User Group Email

Use this selector to create identity-based DNS rules based on an IdP group email address of which the user is configured as a member in the IdP.

| UI name | API example |
| -- | -- |
| User Group Email | `identity.groups.id == "contractors@company.com"` |

## User Group Names

Use this selector to create identity-based DNS rules based on an IdP group name of which the user is configured as a member in the IdP.

| UI name | API example |
| -- | -- |
| User Group Email | `identity.groups.name == "\"finance\""` |

## SAML Attributes

Specify a value from the SAML Attribute Assertion.

| UI name | API example |
| -- | -- |
| SAML Attributes | `identity.saml_attributes == "\"finance\""` |