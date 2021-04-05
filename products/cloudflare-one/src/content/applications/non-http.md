---
order: 4
---

# Add non-HTTP applications

You can connect applications to Cloudflare for Teams over a number of different protocols.

* [Connect through Acccss using a CLI](/tutorials/cli)
* [Connect through Access over RDP](/tutorials/rdp)
* [Connect through Access over SSH](/tutorials/ssh)
* [Connect through Access using kubectl](/tutorials/kubectl)
* [Connect through Access over SMB](/tutorials/smb)

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



