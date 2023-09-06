---
title: Create Edge Cache TTL page rules
pcx_content_type: how-to
weight: 2
---

# Create Edge Cache TTL page rules

## Get Started

Before you begin, you should understand two basic page rule behaviors:

- Only the highest priority matching page rule takes effect on a request.
- Page rules are prioritized in descending order in the Cloudflare dashboard, with the highest priority rule at the top.

Cloudflare recommends ordering your rules from most specific to least specific.

## Page Rules Explained

A page rule matches a URL pattern based on the following format (comprised of five segments): `<scheme>://<hostname><:port>/<path>?<query_string>`

A URL with five segments look similar to the example below.

`https://www.example.com:443/image.png?parameter1=value1`

The `scheme` and `port` segments are optional. If omitted, scheme matches both `http://` and `https:// protocols`. If no port is specified, the rule matches all ports.

You can disable a page rule at any time. While a rule is disabled, actions won’t trigger, but the rule still appears in the **Rules** > **Page Rules** tab, is editable, and counts against the number of rules allowed for your domain. The Save as Draft option creates a page rule that is disabled by default.

Page rules trigger certain actions when a request matches a defined URL pattern.

<table>
  <tbody>
    <th>Plan</th>
    <th>Page rules allowed</th>
    <tr>
      <td>Free</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Pro</td>
      <td>20</td>
    </tr>
    <tr>
      <td>Business</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Enterprise</td>
      <td>125</td>
    </tr>
  </tbody>
</table>

You can also [purchase additional rules](https://www.cloudflare.com/features-page-rules/) up to a maximum of 100 for domains in the Free, Pro, and Business plans.

## Create a page rule

1.  Log in to your Cloudflare dashboard.
2.  Select the domain where you want to add the page rule.
3.  Select **Rules**.
4.  In the **Page Rules** tab, select **Create Page Rule**. The **Create Page Rul**e for `<your domain>` dialog opens.
5.  Under **If the URL matches**, enter the URL or URL pattern that should match the rule. Learn more about wildcard matching
6.  Under **Then the settings are**, select **Add a Setting**.
7.  Select an option from the dropdown. You can include more than one setting per rule. Learn more about settings in the summary below.
8.  From the **Order** dropdown, specify the desired order: **First**, **Last**, or **Custom**.
9.  Choose a save option:

- **Save as Draft** to save the rule and leave it disabled. Note that disabled rules count towards the number of rules allowed for your domain.
- **Save and Deploy** to save the rule and enable it immediately.

{{<Aside type="note" header="Note">}}

We do not support non-ASCII characters (for example, punycode/unicode domain) in Page Rules. Instead, you can URL-encode the string using [Punycode converter](https://www.punycoder.com/) as a workaround.

{{</Aside>}}

## Edit existing page rules

1.  Log in to your Cloudflare dashboard.
2.  Select the domain where you want to edit your page rule.
3.  Select **Rules**.
4.  In the **Page Rules** tab, locate the rule to edit.
5.  Proceed to make the necessary changes, as follows:
    - To enable or disable a rule, switch the toggle **On/Off**.
    - To modify the URL pattern, settings, or order, select the **Edit** button (wrench icon). In the dialog, enter the information you want to change.

## Delete a rule

1.  Log in to your Cloudflare dashboard.
2.  Select the domain where you want to edit your page rule.
3.  Select **Rules**.
4.  In the **Page Rules** tab, locate the rule to edit.
5.  Select the **Delete** button (wrench icon) and confirm the deletion when prompted.

## Cache by device type (Enterprise only)

Enterprise domains can cache content by device type to target visitors with content appropriate to their device. Cloudflare evaluates the User-Agent header in the HTTP request to identify the device type and identifies each device type with a case insensitive match to the regex below:

- Mobile: `(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera\ mini|avantgo|mobilesafari|docomo|KAIOS)`
- Tablet: `(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))`
- Desktop: Everything else not matched above.

1.  Log in to your Cloudflare account.
2.  Select the appropriate domain.
3.  Select **Rules** > **Page Rules**.
4.  Select **Create Page Rule**.
5.  Enter the URL to cache by device type.
6.  Choose the **Cache By Device Type** setting.
7.  Select **On**.
8.  Select **Save and Deploy**.

Once enabled, Cloudflare sends a `CF-Device-Type` HTTP header to your origin with a value of either `mobile`, `tablet`, or `desktop` for every request to specify the visitor’s device type. If your origin responds with the appropriate content for that device type, Cloudflare only caches the resource for that specific device type.

To purge resources using Cache By Device Type, you must [purge by Cache-Tag](/cache/how-to/purge-cache/purge-by-tags/).

## Cache Everything

Caching additional content at Cloudflare requires a **Cache Everything** Page Rule. Without creating a Cache Everything Page Rule, dynamic assets are never cached even if a [public Cache-Control header](/cache/concepts/cache-control/) is returned. When combined with an Edge Cache TTL > 0, **Cache Everything** removes cookies from the origin web server response.

{{<Aside type="warning" header="Warning">}}

Do not use **Cache Everything** for admin sections of your website or for pages that require a login. To prevent Cloudflare from caching specific URLs, create a page rule with **Cache Level** set to **Bypass**. Next, drag that rule above the **Cache Everything** Page Rule in the dashboard so that the **Bypass** rule is above the **Cache Everything**.

{{</Aside>}}

1.  Log in to your Cloudflare account.
2.  Choose the appropriate domain.
3.  Select **Rules** > Page **Rules**.
4.  Select **Create Page Rule**.
5.  Under **If the URL matches**, create a URL pattern to differentiate your website’s static versus dynamic content.
6.  Under **Then the settings are**, choose **Cache Level**.
7.  For **Select Cache Level**, choose the **Cache Everything** submenu setting.
8.  Select **Save and Deploy**.
9.  Verify your resources are cached by checking the [cache response returned by Cloudflare](/cache/concepts/default-cache-behavior/#cloudflare-cache-responses).

Cloudflare caches XML responses when using Cache Everything. By default, jquery's getScript explicitly bypasses cache by appending a timestamp query string [unless the behavior is disabled](http://api.jquery.com/jQuery.getScript/). For further details on how to adjust Cloudflare’s behavior for query strings, refer to our article on [Caching Levels](/cache/how-to/set-caching-levels/).
