---
updated: 2020-12-13
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Troubleshoot user login details
---

# Troubleshoot user login details

Cloudflare Access provides a user-facing portal, the [App Launcher](https://blog.cloudflare.com/announcing-the-cloudflare-access-app-launch/), which displays all applications that a user can reach in a single view. The same portal also can be used by a member of your team to gather diagnostic information about their account for troubleshooting.

**🗺️ This tutorial covers how to:**

- Configure the App Launcher
- Visit the App Launcher as an end user
- Review login diagnostics as an end user

**⏲️Time to complete:**

10 minutes

---

## Configure the App Launcher

1.  On the Zero Trust Dashboard, navigate to **Settings > Authentication**.

1.  Under **App Launcher**, click the **Manage**.

    The App Launcher works like other Access policies - you can define who is able to reach the App Launcher. When users visit the App Launcher, Cloudflare Access will display only the applications they have permission to reach.

1.  To define who is able to use the App Launcher, add a new rule.

    ![Add Rule](/cloudflare-one/static/zero-trust-security/user-diagnostics/add-new-rule.png)

1.  Once you have defined at least one rule, click **Save**. Your rule will appear under the **App Launcher rules** list.

    ![Add Rule](/cloudflare-one/static/zero-trust-security/user-diagnostics/app-launcher-rules.png)

1.  Click **Save** to finalize your edits.

## Visiting the Access App Launcher

The Cloudflare Access App Launcher is available to users at your [team domain](/cloudflare-one/glossary/#team-domain). When users visit that domain, they will be prompted to login. Once authenticated, Cloudflare Access will display the applications they can access.

![Add Rule](/cloudflare-one/static/zero-trust-security/user-diagnostics/app-launcher.png)

## Find user diagnostics

You can build rules in Cloudflare Access based on identity, device, multifactor method, country, and other signals. Troubleshooting why someone cannot login can be done by gathering details about their Cloudflare Access signals.

Your users can check their authentication status by clicking their name in the top-right corner of the App Launcher and selecting **Account**.

![Add Rule](/cloudflare-one/static/zero-trust-security/user-diagnostics/click-name.png)

The `Account` page will list everything that Cloudflare Access knows about that current user session.

![Add Rule](/cloudflare-one/static/zero-trust-security/user-diagnostics/above-fold.png)

When available, Access will list the multifactor method used by the user if the identity provider supports `amr` sharing.

![Add Rule](/cloudflare-one/static/zero-trust-security/user-diagnostics/below-fold.png)

Users can also copy the data to share it with an administrator. The data is structured as `json`; you can find an example output below. You can use this information to compare against application policies to determine why a user might not be able to reach an application.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;103616583934998960058&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Sam Rhea&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;email&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;srhea@cloudflare.com&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;idp&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;7d373bcc-73cb-4d52-97a7-099a93b5587f&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;type&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;google&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;geo&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;country&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;PT&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;user_uuid&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;78f51e22-2a9f-4f51-a60f-bf97d097fb59&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;devicePosture&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;account_id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;1c787a4e7a6972171826b9c0bdd5a4ee&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;auth_cert&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;ip&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;85.XXX.XXX.XX&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
