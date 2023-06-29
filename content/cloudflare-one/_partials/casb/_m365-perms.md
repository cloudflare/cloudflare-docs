---
_build:
  publishResources: false
  render: never
  list: never
---

## Integration permissions

For the Microsoft 365 integration to function, Cloudflare CASB requires the following delegated Microsoft Graph API permissions:

- `Application.Read.All`
- `Calendars.Read`
- `Domain.Read.All`
- `Group.Read.All`
- `InformationProtectionPolicy.Read.All`
- `MailboxSettings.Read`
- `offline_access`
- `RoleManagement.Read.All`
- `User.Read.All`
- `UserAuthenticationMethod.Read.All`
- `Files.Read.All`
- `AuditLog.Read.All`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Microsoft Graph permissions documentation](https://docs.microsoft.com/en-us/graph/permissions-reference).
