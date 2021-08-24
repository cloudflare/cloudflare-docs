---
updated: 2021-03-09
category: 🔐 Zero Trust
difficulty: Intermediate
pcx-content-type: tutorial
---

# Salesforce with Access for SaaS configuration

**🗺️ This tutorial covers how to:**
* Configure Salesforce as a SaaS application in Teams
* Force logins to Salesforce through Cloudflare's Zero Trust rules

**⏲️ Time to complete:**

15 minutes

## Before you start
1. You'll need admin access to a Salesforce account

---

## Set up Salesforce as a SaaS application in Teams

1. On the [Teams dashboard](https://dash.teams.cloudflare.com), navigate to **Access > Applications**.
1. Select the SaaS application type. 
1. Next, select *Salesforce* from the **Application** drop-down menu.
1. Fill the remaining fields as follows:
    * **Entity ID**: https://[YOUR_SFDC_DOMAIN].my.salesforce.com
    * **Assertion consumer service URL**: https://[YOUR_SFDC_DOMAIN].my.salesforce.com
    * **Name ID format**: Email
1. Click **Next**.
1. Set the desired policy configuration for user access.
1. Click Add application.
1. Next, take note of the **SSO endpoint**, the **Access Entity ID or Issuer**, and the **Public Key**.

![Setup SaaS IdPs](../static/documentation/applications/saas-integrate.png)

## Create a certificate file

1. Paste the **Public key** in VIM or another code editor.
1. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1. Set the file extension as `.crt` and save.


## Enable Single Sign-On in Salesforce

1. In Salesforce, ensure your users have **Federation IDs**.

 <Aside>
 The Federation ID is found under Manage Users > Users in Setup. The Federation ID should match the email address of the user authenticating via Access.
 </Aside>

   ![Salefsorce configuration](../static/zero-trust-security/access/salesforce.png)

1. Navigate to **Security Controls > Single Sign-On Settings**.
1. Set the following global settings:
    * **SAML Enabled:** true
    * **Make federation ID case-insensitive:** true



## Create a new SAML Single-Sign On configuration

1. Create a new SAML Single-Sign On configuration
Configure as follows:
  * **Name:** (this is what you want your users to see on sign in)
  * **API name:** (this will pre-populate)
  * **Issuer:** `<your-team-name>.cloudflareaccess.com`, where your-team-name is your [team name](/glossary#team-name).
  * **Identity Provider Certificate**: upload the `.crt` certificate file you’ve created in the previous step. 
  * **EntityID**: `https://[YOUR_SFDC_DOMAIN].my.salesforce.com`
  * **SAML Identity type:** Assertion contains the Federation ID from the User object
  * **Identity Provider Login URL**: This is the SSO endpoint provided in the Teams dashboard for that application.

1. Click **Save**.

  ![Salefsorce configuration](../static/zero-trust-security/access/salesforce-sso.png)
  
1. From the navigation panel on the left, click **Domain Management** > **My Domain** and select your domain.
1. At the bottom, find **Authentication Configuration**. Click **Edit** and select your Authentication Service you created.
1. (Optional) To force all users to sign in through Cloudflare Access:
    1. Click **Security Controls** > **Single Sign-On Settings** > **Edit**. 
    1. Click `Disable login with Salesforce credentials`.
