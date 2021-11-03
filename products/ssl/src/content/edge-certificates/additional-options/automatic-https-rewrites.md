---
order: 12
pcx-content-type: concept
---

import AutomaticHTTPSRewritesDefinition from "../../_partials/_automatic-https-rewrites-definition.md"

# Automatic HTTPS Rewrites

<AutomaticHTTPSRewritesDefinition/>

## How to use Automatic HTTPS Rewrites

If your site contains links or references to HTTP URLs that are also available securely via HTTPS, Automatic HTTPS Rewrites can help. If you connect to your site over HTTPS and the lock icon is not present, or has a yellow warning triangle on it, your site may contain references to HTTP assets (“mixed content”).

Mixed content is often due to factors not under the website owner’s control such as embedded third-party content or complex content management systems. By rewriting URLs from “http” to “https”, Automatic HTTPS Rewrites simplifies the task of making your entire website available over HTTPS, helping to eliminate mixed content errors and ensuring that all data loaded by your website is protected from eavesdropping and tampering.

Enable **Automatic HTTPS Rewrites** via the **SSL/TLS** app to rewrite HTTP resources as HTTPS at Cloudflare without making any changes to the HTML source at your origin server.


## Limitations

The HTTP resources are checked to ensure they are accessible via HTTPS before a rewrite is applied. In cases where a resource is not available over HTTPS, Cloudflare cannot rewrite the URL.

Some resources are loaded by JavaScript or CSS via HTTP when the site is loaded in a browser. You will see mixed content warnings in those situations. To determine which URLs do not have HTTPS support, Cloudflare uses data from EFF’s HTTPS Everywhere and Chrome’s HSTS preload list. If your zone is not on one of these lists, only active content will be rewritten. Passive content (such as images) will not be rewritten and will still cause mixed content errors.

If a third-party domain supports HTTPS and is not rewritten automatically, you can manually change those links to relative links or HTTPS links.  Alternatively, you can ask the third-party domain owner to submit their site for inclusion in the HTTPS Everywhere rulesets, which [accept pull requests on GitHub](https://github.com/EFForg/https-everywhere/).

## Related Resources
* [How do I fix mixed content errors?](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-)
* [EFF's HTTPS Everywhere](https://www.eff.org/https-everywhere/faq#how-do-i-add-my-own-site-to-https-everywhere)
* [HSTS preload list](https://hstspreload.org/)