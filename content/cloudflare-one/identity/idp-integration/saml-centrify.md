---
pcx-content-type: how-to
title: SAML | Centrify
weight: 1
---

# SAML | Centrify

Centrify secures access to infrastructure, DevOps, cloud, and other modern enterprise so you can prevent the #1 cause of breaches – privileged access abuse.

## Set up Centrify (SAML)

To set up SAML with Centrify as your identity provider:

1.  Log in to your **Centrify** admin portal and click **Apps**.

    ![Centrify Apps page](/cloudflare-one/static/documentation/identity/saml-centrify/saml-centrify-1.png)

1.  Select **Add Web Apps**.

1.  Click the **Custom** tab.

1.  Next to the **SAML** icon click **Add**.

    ![Centrify Settings Add Application details page](/cloudflare-one/static/documentation/identity/saml-centrify/saml-centrify-3.png)

1.  Enter the required information for your application.

1.  Click **Save**.

1.  Click **Settings** in the left pane.

1.  In the middle menu pane, select **Trust**.

1.  Choose the **Manual Configuration** option.

1.  In the **SP Entity ID** and **Assertion Consumer Service (ACS) URL fields**, enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://&ltyour-team-name&gt.cloudflareaccess.com/cdn-cgi/access/callback</span></div></span></span></span></code></pre>{{</raw>}}

1.  Click **Save**.

1.  In the middle menu pane, select **User Access**.

1.  Click **Add**. The **Select Role** dialog displays.

    ![Centrify Settings Select Role dialog](/cloudflare-one/static/documentation/identity/saml-centrify/saml-centrify-6.png)

1.  Complete your roles access assignments. The Role rules display on the **User Access** card.

    ![Centrify Added Roles list](/cloudflare-one/static/documentation/identity/saml-centrify/saml-centrify-7.png)

1.  In the middle menu pane, select **SAML Response**.

1.  Click **Active > Add** to create a new **Attribute Name**, **Email**.

    ![Centrify Settings Email Attribute](/cloudflare-one/static/documentation/identity/saml-centrify/saml-centrify-9.png)

1.  Enter the user email addresses in the **Attribute Value** field.

1.  Click **Save**.

1.  Select **Settings** again from the left menu pane, and **Trust**.

1.  Select the **Manual Configuration** option.

1.  On the Zero Trust dashboard, navigate to **Settings > Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Select SAML.

1.  Copy and paste the corresponding information from Centrify into the fields.

1.  Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to the login method you want to test.

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1.  Download your unique SAML metadata file at the following URL:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://&ltyour-team-name&gt.cloudflareaccess.com/cdn-cgi/access/saml-metadata</span></div></span></span></span></code></pre>{{</raw>}}

    Replace `<your-team-name>` with your [team name](/cloudflare-one/glossary/#team-name).

1.  Save the file in XML format.

1.  Upload the XML document to your **Centrify** account.

## Example API configuration
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;config&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;issuer_url&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https://abc123.my.centrify.com/baaa2117-0ec0-4d76-84cc-abccb551a123&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;sso_target_url&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https://abc123.my.centrify.com/applogin/appKey/baaa2117-0ec0-4d76-84cc-abccb551a123/customerId/abc123&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;attributes&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;email&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;email_attribute_name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;sign_request&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">false</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;idp_public_cert&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;type&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;saml&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;centrify saml example&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
