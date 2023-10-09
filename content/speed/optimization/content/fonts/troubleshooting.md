---
pcx_content_type: troubleshooting
title: Troubleshooting
---

# Troubleshooting

## Validate the Fonts feature is working

To test that the Fonts feature is working correctly, follow these steps:

1. With the Fonts feature disabled, navigate to your webpage and open the network panel of the developer console. For Chrome, right click on the webpage and select **Inspect**. This will open the developer console. Then navigate to the Network tab within the console.
2. Reload the page.
3. In the network tab, you should see a request to `fonts.googleapis.com`, and a request to `fonts.gstatic.com`. This means that Google Fonts are being downloaded for this page. If you do not see these requests, either your webpage is not using Google Fonts, or your hosting provider might be optimizing the Google Fonts in some other way.
4. Enable the Fonts feature and wait for a few seconds.
5. Reload the page.
6. In the network panel, you should now be able to see a request to your zone on the `/cf-fonts/` pathname. The requests to `fonts.googleapis.com` and `fonts.gstatic.com` should have disappeared. This means the feature is working correctly.

## Feature is not working

In order for the feature to work, the response HTML (when the feature is disabled) must include a link tag with `href` pointing to `fonts.googleapis.com`. You can easily check this on the browser by viewing the source code of the webpage. As an example of what to look for, the following link tag is for the Roboto Google Font:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
``` 

If the tag does not exist in the HTML, but you are still sure that your page is using Google Fonts, it might be that your hosting provider is optimizing your Google Fonts on the server. This can prevent Cloudflare Fonts from working properly.

## Other issues with Cloudflare Fonts

If you experience any issues or have questions while using Cloudflare Fonts, refer to the [Cloudflare Community](https://community.cloudflare.com/) pages or contact [Cloudflare support](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) for assistance. We are here to help you resolve any challenges you may encounter.