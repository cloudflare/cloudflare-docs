---
pcx_content_type: how-to
title: SAML | OneLogin
weight: 4
---

# SAML | OneLogin

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an SAML identity provider.

## Set up OneLogin (SAML)

To set up OneLogin (SAML) as your identity provider:

1.  Log in to your OneLogin admin portal.

1.  Select **Apps** > **Add Apps**.

1.  Under **Find Applications**, search for **Cloudflare Access**.

1.  Select the result sponsored by **Cloudflare, Inc**. You can customize the name or logo.

1.  Select **Save**. You can change this information at any time.

1.  Select the **Configuration** tab.

1.  In the **Cloudflare Access Authorization Domain** field, paste your [team domain](/cloudflare-one/glossary/#team-domain).

1.  Select the **Parameters** tab, select **Add Parameter** and enter your values for **Cloudflare Access Field**.

1.  Select the **Access** tab

1.  In Roles, use the mapping to programmatically and automatically assign users that can access the application.

    ![OneLogin SAML Application Access interface with available Roles listed](/images/cloudflare-one/identity/onelogin/onelogin-saml-6.png)

1.  Select the **SSO** tab.

1.  Copy the OneLogin **SAML 2.0 Endpoint (HTTP)** to the Cloudflare Single Sign On URL.

1.  Copy the OneLogin **Issuer URL** to the Cloudflare **IdP Entity ID**.

1.  Copy the **X.509 Certificate** to the Cloudflare **Signing Certificate**.

    ![OneLogin SAML Application SSO interface with SAML2.0 sign on method, Issuer URL, and X.509 Certificate](/images/cloudflare-one/identity/onelogin/onelogin-saml-7.png)

1.  In Zero Trust, go to **Settings** > **Authentication**.

1.  Under **Login methods**, select **Add new**.

1.  Select SAML.

1.  Input the details from your OneLogin account in the fields. We suggest that you name the attributes the same in both OneLogin and Cloudflare.

    If other headers and SAML attribute names were added to OneLogin, be sure to add them to Cloudflare under **SAML attributes** and **SAML header attributes** in the **Optional configurations** menu.

1.  Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to the login method you want to test.

## Download SP metadata (optional)

OneLogin SAML allows administrators to upload metadata files from the service provider.

To add a metadata file to your OneLogin SAML configuration:

1.  Download your unique SAML metadata file at the following URL, replacing `<your-team-name>` with your [team name](/cloudflare-one/glossary/#team-name):

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

    The link returns a web page with your SAML SP data in XML format.

1.  Save the file as an XML document.

1.  Upload the XML document to **OneLogin**.

## Example API configuration

```json
{
  "config": {
    "issuer_url": "https://app.onelogin.com/saml/metadata/1b84ee45-d4fa-4373-8853-abz438942123",
    "sso_target_url": "https://sandbox.onelogin.com/trust/saml2/http-post/sso/123456",
    "attributes": ["email"],
    "email_attribute_name": "",
    "sign_request": false,
    "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
  },
  "type": "saml",
  "name": "onelogin saml example"
}
```
