---
order: 12
---

# PingIdentity® SAML

The PingOne® and PingFederate® offerings from PingIdentity require the SAML integrator for integration with Cloudflare Access. The [PingFederate](https://docs.pingidentity.com/bundle/pingfederate-100/page/ejm1564002949565.html) and [PingOne](https://docs.pingidentity.com/bundle/p14c/page/als1564020488261.html)  documentation explains how to configure applications. These steps focus on the requirements specific to Cloudflare Access.

## Set up PingIdentity as your IdP

To set up PingIdentity as your IdP:

1. Log in to your dashboard **Ping** and navigate to **Applications**.
1. Click **Add Application**.
1. Select **New SAML Application**.
1. Complete the fields for name, description, and category.

    These can be any value. A prompt displays to select a signing certificate to use.

1. In the **SAML attribute configuration** dialog select **Email attribute > urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress**.

    <Aside>

    There is an additional setting for PingFederate prior to 9.0.
    </Aside>

2. In the **Signature Policy** tab, disable the option to **Always Sign Assertion**.
3. Leave the option enabled for **Sign Response As Required**.

    This ensures that SAML destination headers are sent during the integration.

    In versions 9.0 above, you can leave both of these options enabled.

4. A prompt displays to download the SAML metadata from Ping.

    This file shares several fields with Cloudflare Access so you don’t have to input this data.

5. Navigate to **Cloudflare Access**, scroll to **Login Methods**, click **Add** and select the **SAML icon.**
6. Upload the metadata file in the **Add a SAML identity provider**.

    <Aside>

    If you are using a self-hosted deployment of PingFederate and a separate IdP or directory service, change the auto-populated value in the <strong>IdP Entity ID</strong> field. The metadata file sets it to a domain that you control.
    </Aside>

7. Enter the following URL in the **IdP Entity ID** field.

    Replace “your-domain” with the authentication domain listed in Cloudflare Access, and include the callback in the path:

    ```txt
    https://your-domain.cloudflareaccess.com/cdn-cgi/access/callback
    ```

8. Confirm that the fields set by the metadata file are accurate.
9. Click **Save** and then **Test**.

    On successful connection to your PingIdentity deployment, a confirmation displays.

    ![Successful connection](../../static/ping/ping-saml-1.png)

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1. Download your unique SAML metadata file at the following URL:

    ```txt
    https://auth-domain.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

1. Replace authentication domain with your account’s **Login Page Domain** found in the **Access** tab in **Cloudflare Access**.

    The link returns a web page with your SAML SP data in XML format.

1. Save the file as an XML document.
1. Upload the XML document to your **PingIdentity** account.

## Example API Configuration

```json
{
    "config": {
        "issuer_url": "https://example.cloudflareaccess.com/cdn-cgi/access/callback",
        "sso_target_url": "https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?idpid=aebe6668-32fe-4a87-8c2b-avcd3599a123",
        "attributes": ["PingOne.AuthenticatingAuthority", "PingOne.idpid"],
        "email_attribute_name": "",
        "sign_request": false,
        "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
        },
    "type": "saml",
    "name": "ping saml example"
}
```
