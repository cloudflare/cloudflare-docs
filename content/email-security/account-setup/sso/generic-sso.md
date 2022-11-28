---
title: Generic SSO guide
pcx_content_type: how-to
weight: 1
meta:
    title: Generic single sign-on integration guide
---

# Generic single sign-on integration guide

For added security and convenience, Cloudflare Area 1 offers support for SAML-based single sign-on (SSO) logins. Organizations are able to choose between having users access Area 1 with a username and password plus a two-factor authentication (2FA) code, or using an SSO provider, such as OneLogin or Okta.

## SAML configuration options

- **Identity Provider initiated (IdP-initiated) SAML**: IdP-initiated configurations (like OneLogin) require that the IdP be accessible to the Area 1 infrastructure in order to successfully authenticate users. At the most basic level the user selects an application from their IdP, and the IdP communicates with the OneLogin portal using a SAML assertion to provide identity information for the user requesting to login to the Area 1 Security portal.

- **Service Provider Initiated (SP-initiated) SAML**: SP-initiated configurations are the most common SAML authentication mechanisms. The main difference compared to IdP is that the service provider (like Area 1) does not require any direct connection to the IdP in order to authenticate a user. The user's browser provides the ability for the SAML exchange to occur but the SP and the IdP do not directly communicate with each other.

## Area 1 SAML setup

If you do not have one already, start by selecting and setting up an SSO provider, such as Onelogin or Okta in your Area 1 dashboard. This SSO provider will manage the user interface and settings for your organization.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** > **SSO**.

3. Enable the **Single Sign on** option.

4. In **SSO Enforcement**, choose one of the following settings:
    - **None**: Each user can choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).
    - **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to login using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.
    - **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.

5. In **SAML SSO Domain** enter the domain that points to your SSO provider.

6. In **METADATA XML** paste the SAML XML metadata settings from your provider. These settings (and even their exact text descriptions) are in different locations depending on your SSO provider.

## Identity Provider SAML setup

Below is a generic guide to successfully set up an identify provider based SAML. These options might change depending on your IdP provider.

1. **Log in** to your SAML provider and access its setup section.

2. In **Single sign on URL** section, enter `https://horizon.area1security.com/api/users/saml`. Make sure to enable the option **Use this for Recipient URL and Destination URL** if available.

3. For **Audience URI (SP Entity ID)**, enter `https://horizon.area1security.com`

4. Leave **Default RelayState** blank.

5. In **Name ID format** field, select **Email Address**.

6. In **Application username**, choose **Email**.

7. In **Update application username on**, select **Create and update**.

8. For **Response**, select **Signed**.

9. In **Assertion signature** select **Unsigned**.

10. For **Signature Algorithm**, choose **RSA-SHA1**.

11. In **Digest Algorithm** select **SHA1**.

12. For **Assertion Encryption**, select the **Unencrypted** option.

13. If present, make sure you leave **Enable Single Logout** disabled.

14. In **Assertion Inline Hook**, select None (disabled).

15. For **Authentication context class** choose **PasswordProtectedTransport**.

16. In **Honor Force Authentication** select **Yes** to make sure it is enabled.

17 In **SAML Issuer ID** enter `http://www.okta.com/${org.externallKey}`.

18. In the **Attribute Statements section**, make sure you enter the email address the user already has in the Area 1 portal.

19. When you are finished with configuring the IdP setup, download the metafile. Copy and paste it into the **METADATA XML** field in the [SSO section](https://horizon.area1security.com/settings/single-sign-on) of Area 1’s dashboard.

[include screenshots here]

The [above configuration](#identity-provider-saml-setup) is sufficient if you are configuring an IdP-initiated SAML setup. However, if you are configuring an SP-initiated setup, please continue with the below setup.

For other custom SAML setup where the service provider XML metadata is essential, you can use a third-party tool to generate the XML Metadata.

### Use OneLogin’s SAML tool to build SP metadata

1. Go to [OneLogin’s SAML](https://www.samltool.com/idp_metadata.php) tool page.

2. For **EntityId** and **Attribute Consume Service Endpoint (HTTP-POST)** fields, enter `https://horizon.area1security.com/api/users/saml`.

3. The remaining fields are optional and can be left blank.


Troubleshooting:

1) Check to see if the user exists in Area 1 portal
2) Check to see if you are using email address as an attribute
3) Check to see if you are using SHA 1
4) Check to see if encryption is set to 2048
