---
_build:
  publishResources: false
  render: never
  list: never
---

- **None**: This setting allows each user to choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).
- **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to log in using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.
- **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.