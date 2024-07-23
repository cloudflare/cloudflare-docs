---
_build:
  publishResources: false
  render: never
  list: never
  inputParameters: param1 ;; param2
---

1. In Miro, select your profile picture > **Settings** > $1.
2. Turn on **SSO/SAML**.
3. Fill in the following fields:
    - **SAML Sign-in URL**: SSO endpoint from application configuration in Cloudflare Zero Trust
    - **Key x509 Certificate**: Public key from application configuration in Cloudflare Zero Trust
4. In **Domain**, enter the domain you want to configure SSO for and select **Enter**.
5. $2 an email address from that domain and select **send verification**.
6. Once you receive a verification email, select the link in the email, then select **Save**. When the domain is successfully configured, the **VERIFY EMAIL** label next to the domain in the SSO/SAML configuration page will disappear.
7. If you have additional domains you want to configure SSO for, follow steps 2.4-2.6.