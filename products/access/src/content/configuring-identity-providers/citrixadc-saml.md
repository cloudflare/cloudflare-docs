---
order: 12
---

# Citrix ADC SAML

Cloudflare Access can integrate with Citrix ADC (formerly Citrix NetScaler ADC) as a SAML IdP. Documentation from Citrix shows you [how to configure Citrix ADC as a SAML IdP](https://docs.citrix.com/en-us/citrix-adc/12-1/aaa-tm/saml-authentication/citrix-adc-saml-idp.html). These steps are specific to Access.

## Configure SAML

1. Configure 2 SAML certificates:
   * A certificate to terminate TLS at the vServer.

        <Aside>

        Ensure that the certificate is issued by a publicly trusted CA.
        </Aside>

   * A certificate for signing SAML assertions. If you do not already have a certificate for signing SAML assertions, you can use a self-signed certificate generated on Citrix ADC by following these steps:

     1. Navigate to **Traffic Management > SSL**.
     2. Select **Create and Install a Server Test Certificate**.

    ![Citrix AD Configuration](../static/citrixadc/citrixadc-saml-1.png)

2. Select **Configuration** and enter a **Certificate File Name**, **Fully Qualified Domain Name**, and a select a **Country**.

    ![Citrix AD Create and Install Test Certificate](../static/citrixadc/citrixadc-saml-2.png)
3. Create a publicly accessible authentication vServer and configure the user identity source (like, local users, LDAP) by following this [Citrix documentation](https://docs.citrix.com/en-us/citrix-adc/12-1/aaa-tm/authentication-virtual-server/ns-aaa-setup-auth-vserver-tsk.html).

    For the rest of this example, the user refers to the IdP address `idp.yourdomain.com`.

4. Navigate to **Security > AAA - Application Traffic > Policies > Authentication > Advanced Policies > SAML IDP** to add a new profile.

    Include the following required configuration details:

   * **Name:** This is the IdP certificate name you defined in Step 1.
   * **Assertion Consumer Service URL:**

    ```txt
    https://example.cloudflareaccess.com/cdn-cgi/access/callback
    ```

   * **IdP Certificate Name:** This is the certificate name you defined in Step 1.
   * **Issuer Name:** `https://idp.<yourdomain>.com/saml/login`
   * **Service Provider ID:** `https://idp.<yourdomain>.com/saml/login`
   * **Name ID Format:** EmailAddress
   * **Attribute 1:** `email = AAA.USER.ATTRIBUTE("email")`

    Cloudflare Access currently sends the IdP address in place of the _Service Provider ID_ for the AuthN request.

    ![Citrix AD Configure Authentication SAML IDP Profile](../static/citrixadc/citrixadc-saml-3.png)

5. Create an Authentication Policy that refers to the Profile just created, and bind it to the authentication vServer mentioned above.

    ![Citrix AD Configure Authentication SAML IDP Policy](../static/citrixadc/citrixadc-saml-4.png)

    To configure all of the above using just the CLI, run the following:

    ```json
    add authentication samlIdPProfile samlProf_CloudflareAccess \
        -samlIdPCertName SAML_Signing \
        -assertionConsumerServiceURL "https://example.cloudflareaccess.com/cdn-cgi/access/callback" \
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

6. Navigate to your **Cloudflare** dashboard, select the **Access** app, and click **Login Methods**.

    ![Access Login Methods](../static/citrixadc/citrixadc-saml-5.png)

7. Select **SAML** from the identity provider options.

    ![Access SAML IdP](../static/citrixadc/citrixadc-saml-6.png)

8. Configure the fields as follows:
   * **Provider Name:** Your choice of name
   * **Single Sign On URL:** The FQDN of the IdP, with the path `/saml/login`
   * **IdP Entity ID/Issuer URL:** As above
   * **Signing Certificate:** Paste in the public certificate you export from the NetScaler
   * **Email attribute name:** Email address

    ![Edit your SAML identity provider](../static/citrixadc/citrixadc-saml-7.png)

9. Click **Save.**
10. Click **Test**.

    This tests your SAML integration and provides descriptive errors if Access cannot authenticate with your Citrix ADC deployment.

11. On success, return to the _Edit SAML Identity Provider_ screen and click **Save**.
12. Click **Close**.
