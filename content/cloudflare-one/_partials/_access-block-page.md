---
_build:
  publishResources: false
  render: never
  list: never
---

Under **Block pages**, choose what end users will see when they are denied access to the application:

  - **Cloudflare default**: Reload the [login page](/cloudflare-one/applications/custom-pages/#login-page) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.
  - **Redirect URL**: Redirect to the specified website.
  - **Custom page template**: Display a [custom block page](/cloudflare-one/applications/custom-pages/#block-page) hosted in Zero Trust.
