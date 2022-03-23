---
pcx-content-type: how-to
title: SAML | OneLogin
weight: 4
---

# SAML | OneLogin

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an SAML identity provider.

## Set up OneLogin (SAML)

To set up OneLogin (SAML) as your identity provider:

1.  Log in to your OneLogin admin portal.

1.  Select **Apps > Add Apps**.

1.  Under **Find Applications**, search for **Cloudflare Access**.

1.  Select the result sponsored by **Cloudflare, Inc**.

    ![OneLogin SAML Find Applications](/cloudflare-one/static/documentation/identity/onelogin/onelogin-saml-2.png)

    You can customize the name or logo.

1.  Select **Save**. You can change this information at any time.

1.  Select the **Configuration** tab.

1.  In the **Cloudflare Access Authorization Domain** field, paste your [team domain](/cloudflare-one/glossary/#team-domain).

1.  Select the **Parameters** tab, click **Add Parameter** and enter your values for **Cloudflare Access Field**.

    ![OneLogin SAML Application Parameters](/cloudflare-one/static/documentation/identity/onelogin/onelogin-saml-5.png)

1.  Select the **Access** tab

1.  In Roles, use the mapping to programmatically and automatically assign users that can access the application.

    ![OneLogin SAML Application Access](/cloudflare-one/static/documentation/identity/onelogin/onelogin-saml-6.png)

1.  Select the **SSO** tab.

1.  Copy the OneLogin **SAML 2.0 Endpoint (HTTP)** to the Cloudflare Single Sign On URL.

1.  Copy the OneLogin **Issuer URL** to the Cloudflare **IdP Entity ID**.

1.  Copy the **X.509 Certificate** to the Cloudflare **Signing Certificate**.

    ![OneLogin SAML Application SSO](/cloudflare-one/static/documentation/identity/onelogin/onelogin-saml-7.png)

1.  On the Zero Trust dashboard, navigate to **Settings > Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Select SAML.

1.  Input the details from your OneLogin account in the fields. We suggest that you name the attributes the same in both OneLogin and Cloudflare.

    If other headers and SAML attribute names were added to OneLogin, be sure to add them to Cloudflare under **SAML attributes** and **SAML header attributes** in the **Optional configurations** menu.

1.  Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to the login method you want to test.

## Download SP metadata (optional)

OneLogin SAML allows administrators to upload metadata files from the service provider.

To add a metadata file to your OneLogin SAML configuration:

1.  Download your unique SAML metadata file at the following URL, replacing `<your-team-name>` with your [team name](/cloudflare-one/glossary/#team-name):
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://&ltyour-team-name&gt.cloudflareaccess.com/cdn-cgi/access/saml-metadata</span></div></span></span></span></code></pre>{{</raw>}}

    The link returns a web page with your SAML SP data in XML format.

1.  Save the file as an XML document.

1.  Upload the XML document to **OneLogin**.

## Example API configuration
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;config&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;issuer_url&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https://app.onelogin.com/saml/metadata/1b84ee45-d4fa-4373-8853-abz438942123&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;sso_target_url&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https://sandbox.onelogin.com/trust/saml2/http-post/sso/123456&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;attributes&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;email&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;email_attribute_name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;sign_request&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">false</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;idp_public_cert&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;type&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;saml&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;onelogin saml example&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
