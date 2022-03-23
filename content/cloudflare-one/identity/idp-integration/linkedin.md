---
pcx-content-type: how-to
title: LinkedIn
weight: 13
---

# LinkedIn

Cloudflare Access allows your users to use LinkedIn as their identity provider (IdP).

## Set up LinkedIn as an IdP

Configuring LinkedIn as a Cloudflare Access IdP requires a LinkedIn account.

To configure LinkedIn as an IdP:

1.  Go to [the LinkedIn Developer Portal](https://www.linkedin.com/developers).

1.  Click **Create App**.

    ![LinkedIn Create App button](/cloudflare-one/static/documentation/identity/linkedin/lin1.png)

1.  Sign in to your LinkedIn account. The **Create an app** screen displays.

    ![LinkedIn Create an app page](/cloudflare-one/static/documentation/identity/linkedin/lin3.png)

1.  Enter an **App name** for your application.

1.  Enter the URL for your business page.

1.  Click **Upload a logo** and navigate to your company logo image file.

1.  Click **OK**.

1.  (optional) Select the **Share on LinkedIn** option to announce that your clients can use LinkedIn to access your app.

    ![LinkedIn Create an app Share Sign in options](/cloudflare-one/static/documentation/identity/linkedin/lin4.png)

1.  Select the **Sign In with LinkedIn** option.

1.  Click the **API Terms of Use** link to read the terms of use.

1.  If you agree to the terms, check the **I have read and agree to these terms** option.

1.  Click **Create app**.

1.  Go to your account Settings page.

    ![LinkedIn account settings](/cloudflare-one/static/documentation/identity/linkedin/lin5.png)

1.  Click the **Auth** tab.

1.  Copy the **Client ID** and **Client Secret**.

1.  On the Zero Trust dashboard, navigate to **Settings > Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Select **LinkedIn** as your IdP.

1.  In the **App ID** and **Client secret** fields, input the **Client ID** and **Client secret** values you've copied from the Application credentials tab in the LinkedIn Developer Portal.

1.  Click **Save**.

1.  In the **LinkedIn** **Auth** tab, scroll to **OAuth 2.0 settings** and click the **pencil icon** to edit the settings.

    ![LinkedIn OAuth 2.0 settings](/cloudflare-one/static/documentation/identity/linkedin/lin8.png)

1.  Enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://&ltyour-team-name&gt.cloudflareaccess.com/cdn-cgi/access/callback</span></div></span></span></span></code></pre>{{</raw>}}

To test that your connection is working, in the Zero Trust dashboard, navigate to **Authentication > Login methods** and click **Test** next to LinkedIn.

## Example API configuration
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;config&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;client_id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltyour client id&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;client_secret&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltyour client secret&gt&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;type&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;linkedin&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my example idp&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
