---
pcx_content_type: troubleshooting
title: Creating a Page Rule
weight: 1
---

# Creating a Page Rule

The steps to create a page rule are:

1.  Log in to the Cloudflare dashboard.
2.  Select the domain where you want to add the page rule.
3.  Click the **Rules** app.
4.  In the **Page Rules** tab, click **Create Page Rule**. The _Create Page Rule for <your domain>_ page opens.
5.  Under **If the URL matches**, enter the URL or URL pattern that should match the rule. [_Learn more about wildcard matching_](/rules/page-rules/wildcard-matching-page-rule/)
6.  Next, under **Then the settings are:** click **+ Add a Setting** and select the desired setting from the dropdown. You can include more than one setting per rule. Learn more about settings on the [Page Rule Settings page](/rules/page-rules/page-rule-settings/).
7.  In the **Order** dropdown, specify the desired order: _First, Last_ or _Custom_.
8.  To save, click one of the following options:
    -   **Save as Draft** to save the rule and leave it disabled.
    -   **Save and Deploy** to save the rule and enable it immediately.

{{<Aside type="note">}}
**Note:** We do not support non-ASCII characters (e.g. punycode/unicode
domain) in Page Rules. Instead, you could URL-encode the string using
[Punycode converter](https://www.punycoder.com/ "Punycode converter"),
for example, and this will work.
{{</Aside>}}

{{<Aside type="tip">}}
Consult [Recommended Page Rules to
Consider](/rules/page-rules/tutorials/recommended-page-rules-to-consider/)
for ideas about the types of page rules you can create.
{{</Aside>}}

