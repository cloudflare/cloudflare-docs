---
pcx_content_type: how-to
title: Enable Consent Management
weight: 1
meta:
    title: Enable the Consent Management Platform (CMP)
---

# Enable the Consent Management Platform (CMP)

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Go to **Zaraz** > **Consent**.
3. Enable **Enable Consent Management**.
4. Fill the information pertaining to **Administrator identity**, **Company street address**, and **Administrator email address**. This information is required under GDPR, and without it the consent modal will not work.
5. Select **Add new Purpose**. Give your new Purpose a name and a description.
6. In **Assign purpose to tools**, match tools to purposes by selecting one of the Purposes previously created from the drop-down menu. Do this for all your tools.

Your Consent Management Platform is ready. Your website should now display a modal asking for consent for the tools you have configured.

## Next steps

If the default consent modal does not suit your website's design, you can use the [Custom CSS tool](/zaraz/consent-manager/custom-css) to add your own custom designs.