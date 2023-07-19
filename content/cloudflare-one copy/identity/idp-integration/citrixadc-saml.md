---
pcx_content_type: how-to
title: SAML | Citrix ADC
weight: 8
---

# SAML | Citrix ADC

Cloudflare Zero Trust can integrate with Citrix ADC (formerly Citrix NetScaler ADC) as a SAML IdP. Documentation from Citrix shows you [how to configure Citrix ADC as a SAML IdP](https://docs.citrix.com/en-us/citrix-adc/12-1/aaa-tm/saml-authentication/citrix-adc-saml-idp.html). These steps are specific to Cloudflare Zero Trust.

## Set up Citrix ADC (SAML)

To set up Citrix ADC (SAML) as your identity provider:

1.  First, you'll need to configure 2 SAML certificates:

    - A certificate to **terminate TLS at the vServer**. Ensure that the certificate is issued by a publicly trusted CA.
    - A certificate for **signing SAML assertions**.

    If you do not already have a certificate for signing SAML assertions, you can use a self-signed certificate generated on Citrix ADC by following these steps:

    1. Go to **Traffic Management** > **SSL**.
    1. Select **Create and Install a Server Test Certificate**.

1.  Select **Configuration** and enter a **Certificate File Name**, **Fully Qualified Domain Name**, and a select a **Country**.

    ![Citrix AD Create and Install Test Certificate interface with file name, domain name, and country](/images/cloudflare-one/identity/citrixadc/citrixadc-saml-2.png)

1.  Create a publicly accessible authentication vServer and configure the user identity source (like, local users, LDAP) by following this [Citrix documentation](https://docs.citrix.com/en-us/citrix-adc/12-1/aaa-tm/authentication-virtual-server/ns-aaa-setup-auth-vserver-tsk.html).

    For the rest of this example, the user refers to the IdP address `idp.yourdomain.com`.

## Add a new profile

1.  Go to **Security** > **AAA - Application Traffic** > **Policies** > **Authentication** > **Advanced Policies** > **SAML IDP** to add a new profile.

    Include the following required configuration details:

    | Field                              | Description                                                                            |
    | ---------------------------------- | -------------------------------------------------------------------------------------- |
    | **Name**                           | The certificate name you defined while [configuring SAML](#set-up-citrix-adc-saml)     |
    | **Assertion Consumer Service URL** | `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`                |
    | **IdP Certificate Name**           | The IdP certificate name you defined while [configuring SAML](#set-up-citrix-adc-saml) |
    | **Issuer Name**                    | `https://idp.<yourdomain>.com/saml/login`                                              |
    | **Service Provider ID**            | `https://idp.<yourdomain>.com/saml/login`                                              |
    | **Name ID Format**                 | EmailAddress                                                                           |
    | **Attribute 1**                    | `email = AAA.USER.ATTRIBUTE("email")`                                                  |

    Cloudflare Access currently sends the IdP address in place of the _Service Provider ID_ for the AuthN request.

1.  Create an Authentication Policy that refers to the Profile just created, and bind it to the authentication vServer mentioned above.

    ![Citrix AD Configure Authentication SAML IDP Policy](/images/cloudflare-one/identity/citrixadc/citrixadc-saml-4.png)

    To configure all of the above using just the CLI, run the following:

    ```json
    add authentication samlIdPProfile samlProf_CloudflareAccess \
        -samlIdPCertName SAML_Signing \
        -assertionConsumerServiceURL "https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback" \
        -samlIssuerName "https://idp.yourdomain.com/saml/login" \
        -rejectUnsignedRequests OFF \
        -NameIDFormat emailAddress \
        -Attribute1 email \
        -Attribute1Expr "AAA.USER.ATTRIBUTE(\"email\")" \
        -Attribute1Format Basic \
        -serviceProviderID "https://idp.yourdomain.com/saml/login"

    add authentication samlIdPPolicy samlPol_CloudflareAccess -rule true -action samlProf_CloudflareAccess
    bind authentication vserver nsidp -policy samlPol_CloudflareAccess
    ```

1.  In Zero Trust, go to **Settings** > **Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Configure the fields as follows:

    | Field                        | Description                                      |
    | ---------------------------- | ------------------------------------------------ |
    | **Name**                     | Your chosen name                                 |
    | **Single Sign On URL**       | The FQDN of the IdP, with the path `/saml/login` |
    | **IdP Entity ID/Issuer URL** | As above                                         |
    | **Signing Certificate**      | The public certificate from the NetScaler        |
    | **Email attribute name**     | This is listed under **Optional configurations** |

1.  Click **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and click **Test** next to the login method you want to test.
