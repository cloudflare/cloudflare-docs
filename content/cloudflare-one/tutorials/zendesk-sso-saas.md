---
updated: 2022-07-15
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Configure Zendesk SSO with Access for SaaS
---

# Configure Zendesk SSO with Access for SaaS

This tutorial covers how to configure Zendesk SSO with Access for SaaS.

For this tutorial, you will need:

- A Zero Trust Account
- An integrated identity provider (IdP)
- Admin access to your Zendesk account

**⏲️ Time to complete:**

20 minutes

## Configure Zendesk and Cloudflare

1.  Navigate to your Zendesk administrator dashboard, typically available at `<yourdomain>.zendesk.com/admin/security/sso`.

1.  In a separate tab or window, open the [Zero Trust Dashboard](https://dash.teams.cloudflare.com) and navigate to **Access** > **Applications**.

1.  Select _SaaS_ as the application type to begin creating a SaaS application.

1.  Input the following values in the Zero Trust application configuration:

    | Zero Trust field                   | Value                                           |
    |------------------------------------|-------------------------------------------------|
    | **Entity ID**                      | `https://<yoursubdomain>.zendesk.com`           |
    | **Assertion Consumer Service URL** | contents of **SAML SSO URL** in Zendesk account |
    | **Name ID Format**                 | Email                                           |

1.  (Optional) Configure these Attribute Statements to include a user’s first and last name:

    | Cloudflare attribute name | IdP attribute value                                               |
    |---------------------------|-------------------------------------------------------------------|
    | `<first name>`            | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname` |
    | `<last name>`             | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`   |

    Zendesk will [use the user's email address as their name](https://support.zendesk.com/hc/en-us/articles/203663676#topic_dzb_gl5_2v) if the name is not provided.

    ![Zendesk attributes](/cloudflare-one/static/zero-trust-security/zendesk-sso-saas/zendesk-attributes.png)

1. [Create an Access policy](/cloudflare-one/policies/access/) to determine who can access Zendesk.

1.  Copy the values from the Cloudflare IdP fields and add them to the following Zendesk fields:

    | Cloudflare IdP field                        | Zendesk field               |
    |---------------------------------------------|-----------------------------|
    | **SSO Endpoint**                            | **SAML SSO URL**            |
    | **Public Key** (transformed to fingerprint) | **Certificate Fingerprint** |

    To transform the public key into a fingerprint, use a [fingerprint calculator](https://www.samltool.com/fingerprint.php):

    <ol style="list-style-type: lower-alpha;">
    <li>Copy the public key value and paste it into <b>X.509 cert</b>.</li>
    <li>Wrap the value with <code>-----BEGIN CERTIFICATE-----</code> and <code>-----END CERTIFICATE-----</code>.</li>
    <li>Set <b>Algorithm</b> to SHA256 and select <b>Calculate Fingerprint</b>.</li>
    <li>Copy the <b>Formatted FingerPrint</b> value.</li>
    </ol>

    ![Zendesk fingerprint](/cloudflare-one/static/zero-trust-security/zendesk-sso-saas/zendesk-fingerprint.png)

1.  Go to `https://<yourdomain>.zendesk.com/admin/security/staff_members` and enable **External Authentication** > **Single Sign On**.

Users should now be able to log in to Zendesk if their Email address exists in the Zendesk user list.
