---
order: 12
---

# JumpCloud SAML

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

JumpCloud provides [Directory-as-a-Service®](https://jumpcloud.com/daas-product/) to securely connect user identities to systems, apps, files, and networks. Cloudflare Access integrates with JumpCloud using the SAML protocol. [This documentation from JumpCloud](https://support.jumpcloud.com/customer/en/portal/topics/924865-applications-saml-sso-/articles) can help you configure applications within your JumpCloud deployment.

## Set up JumpCloud SAML for Access

These steps focus on requirements specific to Access.

To set up JumpCloud SAML as your IdP in Access:

1. Generate a SAML certificate.

    **Tip:** JumpCloud requires that you provide your own certificates for signing SAML assertions. Self-signed certificates are acceptable.

    If you do not have a certificate, this command generates one using OpenSSL:

    ```bash
    $ openssl genrsa -out samlidp.key 2048 ; openssl req -new -x509 -sha256 -key samlidp.key -out samlidp.crt -days 1095
    Generating RSA private key, 2048 bit long modulus
    .................................................................................+++++
    ......................+++++
    e is 65537 (0x010001)
    ```

    When asked to enter a Distinguished Name or a DN to incorporate into your certificate request there are a lot of fields. You can leave some of these fields blank. Some fields have a default value. Enter a dot (`.`) in the field to leave it blank. For example:

    ```bash
    -----
    Country Name (2 letter code) [AU]:.
    State or Province Name (full name) [Some-State]:.
    Locality Name (eg, city) []:.
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:.
    Organizational Unit Name (eg, section) []:.
    Common Name (e.g. server FQDN or YOUR name) []:JumpCloud SAML IdP
    Email Address []:
    ```

2. In JumpCloud, select **Applications** in the left-side menu.

    ![JumpCloud Add Application](../../static/jumpcloud/jumpcloud-saml-1.png)

3. Click the + icon at the top-left of the screen to add an application.
4. Choose the **SAML** option in **Application Types**.
5. Enter an application name in **Display Label**.
6. Enter an IdP entity in the **IDP IDENTITY ID** field.

    **Tip:** The IdP entity can be anything, but must be unique. It is suggested to reference something easily identified, such as your Cloudflare authentication domain.

    **For example:** `https://example.cloudflareaccess.com/`

7. At the prompt, enter the IdP private key and IdP certificate you previously generated.
8. Set both the SP entity ID and ACS URL to your Cloudflare Access URL.

    **For example:** `https://example.cloudflareaccess.com/cdn-cgi/access/callback`

9. Under **SAML SUBJECT NAMEID** choose **email**.
10. Set the **SAML SUBJECT NAMEID FORMAT** to:

    ```txt
    urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
    ```

11. Under USER ATTRIBUTES enter “email” for the name and “email” for the value.
12. Leave other settings at default.
13. Click **save**.

    Remember to assign this application to users or groups.

    ![JumpCloud Application dialog](../../static/jumpcloud/jumpcloud-saml-2.png)

14. Open the application configuration and select the **export metadata** link at the bottom right of the dialog.

    This file provides Cloudflare Access several required fields so you don’t have to manually input them.

15. In your **Cloudflare Access** dashboard, scroll to the **Login Methods** card, click **Add**, and select **SAML**.

    ![Cloudflare Access Select IdP](../../static/jumpcloud/jumpcloud-saml-3.png)

    The _Add a **SAML** identity provider_ dialog displays.

    ![Add a SAML identity provider](../../static/jumpcloud/jumpcloud-saml-4.png)

16. Click **Drop/Select Metafile to upload** your metadata file.
17. Click **Save**.
18. Click **Test**.

    This tests your SAML integration and provides descriptive errors if Access cannot authenticate with your JumpCloud deployment.

    ![Successful connection](../../static/jumpcloud/jumpcloud-saml-5.png)

19. On success, return to the _Edit SAML Identity Provider_ dialog and click **Save**.

## Example API Config

```json
{
 "config": {
  "issuer_url": "jumpcloud",
  "sso_target_url": "https://sso.myexample.jumpcloud.com/saml2/cloudflareaccess",
  "attributes": [
   "email",
   "name",
   "username"
  ],
  "email_attribute_name": "",
        "sign_request": false,
  "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
 },
 "type": "saml",
 "name": "jumpcloud saml example"
}
