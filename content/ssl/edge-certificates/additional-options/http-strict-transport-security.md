---
pcx-content-type: how-to
type: overview
title: HTTP Strict Transport Security (HSTS)
weight: 4
layout: list
---

import HSTSDefinition from "../../\_partials/\_hsts-definition.md"

# HTTP Strict Transport Security (HSTS)

<HSTSDefinition/>

HSTS adds an HTTP header that directs [compliant web browsers](/ssl/ssl-tls/browser-compatibility/) to:

*   Transform HTTP links to HTTPS links
*   Prevent users from bypassing SSL browser warnings

Before enabling HSTS, review the [requirements](#requirements).

<Aside type="note">

For more background information on HSTS, see the <a href="https://blog.cloudflare.com/enforce-web-policy-with-hypertext-strict-transport-security-hsts/">introductory blog post</a>.

</Aside>

***

## Requirements

In order for HSTS to work as expected, you need to:

*   Have enabled HTTPS before HSTS so browsers can accept your HSTS settings
*   Keep HTTPS enabled so visitors can access your site

Once you enabled HSTS, avoid the following actions to ensure visitors can still access your site:

*   Changing your DNS records from [Proxied to DNS only](/dns/manage-dns-records/reference/proxied-dns-records)
*   [Pausing Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753) on your site
*   Pointing your nameservers away from Cloudflare
*   Redirecting HTTPS to HTTP
*   Disabling SSL (invalid or expired certificates or certificates with mismatched host names)

<Aside type="warning">

If you remove HTTPS before disabling HSTS or before waiting for the duration of the original <strong>Max Age Header</strong> specified in your Cloudflare HSTS configuration, your website becomes inaccessible to visitors for the duration of the Max Age Header or until you enable HTTPS.

</Aside>

## Enable HSTS

To enable HSTS for your website:

1.  Log in to the Cloudflare dashboard and select your account.

2.  Select your website.

3.  Go to **SSL/TLS** > **Edge Certificates**.

4.  For **HTTP Strict Transport Security (HSTS)**, click **Enable HSTS**.

5.  Read the dialog and click **I understand**.

6.  Click **Next**.

7.  Configure the [HSTS settings](#configuration-settings).

8.  Click **Save**.

## Disable HSTS

To disable HSTS on your website:

1.  Log in to the Cloudflare dashboard and select your account.
2.  Select your website.
3.  Go to **SSL/TLS** > **Edge Certificates**.
4.  For **HTTP Strict Transport Security (HSTS)**, click **Enable HSTS**.
5.  Set the **Max Age Header** to **0 (Disable)**.
6.  If you previously enabled the **No-Sniff** header and want to remove it, set it to **Off**.
7.  Click **Save**.

## Configuration settings

<table style="width:100%">
<thead>
    <tr>
        <th>Name</th>
        <th>Required</th>
        <th>Description</th>
        <th>Options</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Enable HSTS (Strict-Transport-Security)</td>
        <td>Yes</td>
        <td>Serves HSTS headers to browsers for all HTTPS requests.</td>
        <td>Off / On</td>
    </tr>
    <tr>
        <td>Max Age Header (max-age)</td>
        <td>Yes</td>
        <td>Specifies duration for a browser HSTS policy and requires HTTPS on your website.</td>
        <td>Disable, or a range from 1 to 12 months</td>
    </tr>
    <tr>
        <td>Apply HSTS policy to subdomains (includeSubDomains)</td>
        <td>No</td>
        <td>Applies the HSTS policy from a parent domain to subdomains. Subdomains are inaccessible if they do not support HTTPS.</td>
        <td>Off / On</td>
    </tr>
    <tr>
        <td>Preload</td>
        <td>No</td>
        <td>Permits browsers to automatically preload HSTS configuration. Prevents an attacker from downgrading a first request form HTTPS to HTTP. Preload can make a website without HTTPS completely inaccessible.</td>
        <td>Off / On</td>
    </tr>
    <tr>
        <td>No-Sniff Header</td>
        <td>No</td>
        <td>Sends the <code>X-Content-Type-Options: nosniff</code> header to prevent Internet Explorer and Chrome from automatically detecting a content type other than those explicitly specified by the Content-Type header.</td>
        <td>Off / On</td>
    </tr>
</tbody>
</table>

<Aside type='note'>

Once HSTS <strong>Preload</strong> is configured, submit requests for addition to each browser’s preload list. Chrome, Firefox/Mozilla, and Safari use the Chrome preload list. A minimum <strong>Max Age Header</strong> of 12 months is required for inclusion in HSTS preload lists.

</Aside>
