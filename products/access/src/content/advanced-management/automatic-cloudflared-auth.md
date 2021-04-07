---
order: 3
---

# Automatic `cloudflared` authentication

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>


<Aside>

This should only be enabled if a [service token](/access-service-auth/service-tokens) cannot be used for your automated service. 
</Aside>

<TableWrap>

| Before you start |
| ------------------- |
| Ensure you have an automated service relying on `cloudflared` authentication |
| Ensure you have an active IdP session when logging in through `cloudflared` |

</TableWrap>

When you log into Access through `cloudflared`, your browser prompts you to allow access by 
displaying this page:

![Access browser page](../static/access-page.png)

To avoid seeing this page every time you authenticate through `cloudflared`, you can toggle on *Enable automatic `cloudflared` authentication* when adding a [self-hosted application](/getting-started/applications#protect-a-self-hosted-application).

This option will still prompt a browser window in the background, but the authentication will be automatic.
