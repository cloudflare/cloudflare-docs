---
order: 5
---

# Applications

Cloudflare for Teams can secure self-hosted and SaaS applications with Zero Trust rules.

Learn how to secure your applications, and how to configure one dashboard for your users to reach all the applications you've secured behind Teams:

<DirectoryListing path="/applications"/>

## Automatic `cloudflared` authentication

<TableWrap>

| Before you start |
| ------------------- |
| Ensure you have an automated service relying on `cloudflared` authentication |
| Ensure you have an active IdP session when logging in through `cloudflared` |

</TableWrap>

When you log into Access through `cloudflared`, your browser prompts you to allow access by 
displaying this page:

![Access browser page](../static/documentation/applications/non-http/access-page.png)

To avoid seeing this page every time you authenticate through `cloudflared`, you can toggle on *Enable automatic `cloudflared` authentication* when adding a [self-hosted application](/applications/configure-apps/self-hosted-apps#protect-self-hosted-applications).

This option will still prompt a browser window in the background, but the authentication will be automatic.

<Aside>

This should only be enabled if a [service token](/identity/service-auth/service-tokens) cannot be used for your automated service. 
</Aside>