---
pcx_content_type: how-to
title: Zendesk
---

# Configure Zendesk SSO with Access for SaaS

This guide covers how to configure Zendesk SSO with Access for SaaS.

## Prerequisites

- A Zero Trust Account
- An integrated identity provider (IdP)
- Admin access to your Zendesk account

## Configure Zendesk and Cloudflare

1. Go to your Zendesk administrator dashboard, typically available at `<yourdomain>.zendesk.com/admin/security/sso`.

2. In a separate tab or window, open [Zero Trust](https://one.dash.cloudflare.com), select your account, and go to **Access** > **Applications**.

3. Select **Add an application**, then choose _SaaS_.

4. Input the following values in the Zero Trust application configuration:

   | Zero Trust field                   | Value                                           |
   | ---------------------------------- | ----------------------------------------------- |
   | **Entity ID**                      | `https://<yoursubdomain>.zendesk.com`           |
   | **Assertion Consumer Service URL** | contents of **SAML SSO URL** in Zendesk account |
   | **Name ID Format**                 | _Email_                                         |

5. (Optional) Configure these Attribute Statements to include a user’s first and last name:

   | Cloudflare attribute name | IdP attribute value                                               |
   | ------------------------- | ----------------------------------------------------------------- |
   | `<first name>`            | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname` |
   | `<last name>`             | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`   |

   Zendesk will [use the user's email address as their name](https://support.zendesk.com/hc/en-us/articles/203663676#topic_dzb_gl5_2v) if the name is not provided.

6. To determine who can access Zendesk, [create an Access policy](/cloudflare-one/policies/access/).

7. Copy the values from the Cloudflare IdP fields and add them to the following Zendesk fields:

   | Cloudflare IdP field                        | Zendesk field               |
   | ------------------------------------------- | --------------------------- |
   | **SSO Endpoint**                            | **SAML SSO URL**            |
   | **Public Key** (transformed to fingerprint) | **Certificate Fingerprint** |

   To transform the public key into a fingerprint, use a [fingerprint calculator](https://www.samltool.com/fingerprint.php):

   1. Copy the public key value and paste it into **X.509 cert**.

   2. Wrap the value with `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

   3. Set **Algorithm** to _SHA256_ and select **Calculate Fingerprint**.

   4. Copy the **Formatted FingerPrint** value.

8. Go to `https://<yourdomain>.zendesk.com/admin/security/staff_members` and enable **External Authentication** > **Single Sign On**.

Users should now be able to log in to Zendesk if their Email address exists in the Zendesk user list.
