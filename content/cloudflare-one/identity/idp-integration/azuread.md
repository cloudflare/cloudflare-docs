---
pcx-content-type: how-to
title: Microsoft Azure AD®
weight: 13
---

# Microsoft Azure AD®

You can integrate Microsoft Azure AD® (Active Directory) with Cloudflare Zero Trust and build rules based on user identity and group membership. Users will authenticate with their Azure AD credentials and connect to Zero Trust.

1.  Sign in to [the Azure dashboard](https://portal.azure.com/).

1.  Click **Azure Active Directory** in the Azure Services section.

![Azure AD Select AD](/cloudflare-one/static/documentation/identity/azure/pick-azure-ad.png)

1.  In the left side menu, navigate to **Manage** > **App registrations**.

1.  Click **+ New registration**.

![Azure AD New Registration](/cloudflare-one/static/documentation/identity/azure/click-new-reg.png)

1.  Name your application and enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://&ltyour-team-name&gt.cloudflareaccess.com/cdn-cgi/access/callback</span></div></span></span></span></code></pre>{{</raw>}}

    Click **Register**.

![Azure AD Cloudflare Access App](/cloudflare-one/static/documentation/identity/azure/name-app.png)

1.  On the following screen, copy the `Application (client) ID` and `Directory (tenant ID`. You will need to input these values into the Cloudflare dashboard.

![Azure AD IDs](/cloudflare-one/static/documentation/identity/azure/client-directory-ids.png)

1.  In the left hand panel, click **Certificates & Secrets** to create an Application Secret.

![Azure AD Certs and Secrets](/cloudflare-one/static/documentation/identity/azure/certs-and-secrets.png)

1.  Click **+ New client secret**. Name the client secret and choose an expiration. Click **Add**.

![Azure AD Certs and Secrets](/cloudflare-one/static/documentation/identity/azure/name-client-cert.png)

Copy the `Value` field of the client secret. Treat this value like a password. This example leaves the value visible so the values in Azure can be seen in the Access configuration.

![Azure AD Certs and Secrets](/cloudflare-one/static/documentation/identity/azure/client-cert-value.png)

1.  In the left hand panel, select **API permissions**. Click **Add a permission**.

![Azure AD API Permissions](/cloudflare-one/static/documentation/identity/azure/api-perms.png)

1.  Click **Microsoft Graph**.

![Azure AD API Permissions](/cloudflare-one/static/documentation/identity/azure/microsoft-graph.png)

1.  Select Delegated permissions. You will need to toggle 7 specific permissions in the next page. Once toggled, click **Add permissions**.

    - email
    - openid
    - profile
    - offline_access
    - User.Read
    - Directory.Read.All
    - Group.Read.All

![Azure AD API Permissions](/cloudflare-one/static/documentation/identity/azure/request-perms.png)

1.  On the next page, click the button that begins **Grant Admin Consent for ...**.

![Azure AD API Permissions](/cloudflare-one/static/documentation/identity/azure/configured-perms.png)

1.  On the Zero Trust dashboard, navigate to **Settings > Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Choose **Azure AD** on the next page.

1.  Input the `Application ID`, `Application secret`, and `Directory ID` values from Azure.

If you are using Azure AD groups, toggle **Support Groups** slider **On** in the **Edit your Azure AD identity provider** window.

1.  Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to Azure AD.

![Azure AD Test](/cloudflare-one/static/documentation/identity/azure/valid-test.png)

## Using AzureAD Groups

AzureAD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`. In the example below, the group named "Admins" has an ID of `61503835-b6fe-4630-af88-de551dd59a2`.

![Azure AD Test Connection](/cloudflare-one/static/documentation/identity/azure/object-id.png)

To configure Access to use Azure groups, make sure you toggle on the **Support groups** switch as you set up Azure AD on your Zero Trust dash.

This will enable you to select **Azure AD groups** when creating or editing a group. When asked for the **Azure group ID**, you must input the `Object Id`.

![Azure AD Test Connection](/cloudflare-one/static/documentation/identity/azure/configure-group-n.png)

## Example API Configuration
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;config&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;client_id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltyour client id&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;client_secret&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltyour client secret&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;directory_id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltyour azure directory uuid&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;support_groups&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;type&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;azureAD&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my example idp&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
