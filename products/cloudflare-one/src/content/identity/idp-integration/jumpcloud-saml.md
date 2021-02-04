---
order: 4
---

# SAML | Jumpcloud

JumpCloud provides [Directory-as-a-Service®](https://jumpcloud.com/daas-product/) to securely connect user identities to systems, apps, files, and networks. Cloudflare Access integrates with JumpCloud using the SAML protocol. [This documentation from JumpCloud](https://support.jumpcloud.com/customer/en/portal/topics/924865-applications-saml-sso-/articles) can help you configure applications within your JumpCloud deployment.

These steps focus on requirements specific to Teams.

## Set up Jumpcloud SAML

To set up JumpCloud SAML as your identity provider:

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

    When asked to enter a Distinguished Name or a DN to incorporate into your certificate request, you can leave some of these fields blank. Some fields have a default value. Enter a dot (`.`) in the field to leave it blank. For example:

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

1. In JumpCloud, select **Applications** in the left-side menu.

    ![JumpCloud Add Application](../../static/documentation/identity/jumpcloud/jumpcloud-saml-1.png)

1. Click the + icon at the top-left of the screen to add an application.
1. Choose the **SAML** option in **Application Types**.
1. Enter an application name in **Display Label**.
1. Enter an IdP entity in the **IDP IDENTITY ID** field.

    <Aside>
    The IdP entity can be anything, but must be unique. We suggest you reference something easily identified, such as your Cloudflare team domain, for example <code>https://your-team-name.cloudflareaccess.com/</code>.
    </Aside>

1. At the prompt, enter the IdP private key and IdP certificate you previously generated.
1. Set both the **SP entity ID** and **ACS URL** to the following callback URL, where `your-team-name` is your Cloudflare [team name](/glossary#team-name):

    ```text
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1. Under **SAML SUBJECT NAMEID**, choose **email**.
1. Set the **SAML SUBJECT NAMEID FORMAT** to:

    ```text
    urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
    ```

1. Under USER ATTRIBUTES enter `email` for the name and `email` for the value.
1. Leave other settings at default.
1. Click **save**.

    Remember to assign this application to users or groups.

    ![JumpCloud Application dialog](../../static/documentation/identity/jumpcloud/jumpcloud-saml-2.png)

1. On the Teams dashboard, navigate to **Access > Authentication**.

1. Click *+ Add* under **Login Methods**, and select SAML.

1. Input a **Name**, a **Single Sign on URL**, **IdP Entity ID or Issuer URL**, and **Signing Certificate**.

1. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to the login method you want to test.

## Example API configuration

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
