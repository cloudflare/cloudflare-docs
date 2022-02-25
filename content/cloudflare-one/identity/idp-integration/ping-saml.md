---
pcx-content-type: how-to
title: SAML | PingIdentity®
weight: 7
---

# SAML | PingIdentity®

The PingOne® and PingFederate® offerings from PingIdentity require the SAML integrator for integration with Cloudflare Access. The [PingFederate](https://docs.pingidentity.com/bundle/pingfederate-100/page/ejm1564002949565.html) and [PingOne](https://docs.pingidentity.com/bundle/p14c/page/als1564020488261.html) documentation explains how to configure applications. These steps focus on the requirements specific to Cloudflare Access.

## Set up PingIdentity (SAML)

To set up PingIdentity (SAML) as your identity provider:

1.  Log in to your dashboard **Ping** and navigate to **Applications**.

2.  Click **Add Application**.

3.  Select **New SAML Application**.

4.  Complete the fields for name, description, and category.

    These can be any value. A prompt displays to select a signing certificate to use.

5.  In the **SAML attribute configuration** dialog select **Email attribute > urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress**.

     {{<Aside>}}

    There is an additional setting for PingFederate prior to 9.0.

     {{</Aside>}}

6.  In the **Signature Policy** tab, disable the option to **Always Sign Assertion**.

7.  Leave the option enabled for **Sign Response As Required**.

    This ensures that SAML destination headers are sent during the integration.

    In versions 9.0 above, you can leave both of these options enabled.

8.  A prompt displays to download the SAML metadata from Ping.

    This file shares several fields with Cloudflare Access so you do not have to input this data.

9.  On the Zero Trust dashboard, navigate to **Settings > Authentication**.

10. Under **Login methods**, click **Add new**.

11. Select SAML.

12. In the **IdP Entity ID** field, enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

13. Fill the other fields with values from your Ping dashboard.

14. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to the login method you want to test.

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1.  Download your unique SAML metadata file at the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

    Replace `<your-team-name>`  with your [team name](/cloudflare-one/glossary/#team-name).

    The link returns a web page with your SAML SP data in XML format.

2.  Save the file as an XML document.

3.  Upload the XML document to your **PingIdentity** account.

## Example API configuration

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
