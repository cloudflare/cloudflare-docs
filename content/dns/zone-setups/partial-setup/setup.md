---
title: Setup
pcx-content-type: tutorial
weight: 1
meta:
  title: Set up a partial (CNAME) zone
---

# Set up a partial (CNAME) zone

{{<render file="_partial-setup-definition.md">}}

{{<Aside type="note">}}

A partial setup is only available to customers on a Business or Enterprise plan.

{{</Aside>}}

---

## Step 1 — Add your domain to Cloudflare

1.  Create a Cloudflare account and [add your domain](/fundamentals/get-started/setup/add-site/).

2.  For your **Plan**, choose **Business** or **Enterprise**.

3.  Add your domain to Cloudflare. You should land on the **Overview** page.

4.  Ignore the instructions to change your nameservers.

5.  For **Advanced Actions**, click **Convert to CNAME DNS Setup**.

    ![On your domain's overview page, click Convert to CNAME DNS Setup](/dns/static/dns_cname_setup.png)

6.  Click **Convert**.

7.  Save the information from the **Verification TXT Record**. If you lose the information, you can also access it by going to **DNS** > **Verification TXT Record**.

## Step 2 — Verify ownership for your domain

Once you [add your domain to Cloudflare](#step-1--add-your-domain-to-cloudflare), add the **Verification TXT Record** at your authoritative DNS provider. Cloudflare will verify the TXT record and send a confirmation email. This can take up to a few hours.

<details>
<summary>Example verification record</summary>
<div>

A verification record for `example.com` might be:

| Type | Name | Content |
| --- | --- | --- |
| TXT | `cloudflare-verify.example.com` | 966215192-518620144

</div>
</details>

That record must remain in place for as long as your domain is active on the partial setup on Cloudflare.

---

## Optional — Provision an SSL certificate

To provision a Universal SSL certificate through Cloudflare, follow [these instructions](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#non-authoritative-partial-domains).

If your domain is already live with a partial DNS setup — with Cloudflare or another DNS provider — you cannot use a TXT record for [Domain Control Validation](/ssl/edge-certificates/changing-dcv-method/methods/txt/). That domain's TXT record needs to be reserved for forwarding traffic to Cloudflare.

---

## Step 3 — Add DNS records

1.  In Cloudflare, [add an `A`, `AAAA`, or `CNAME` record](/dns/manage-dns-records/how-to/create-dns-records/).
2.  At your authoritative DNS provider:

    1.  Remove any existing `A`, `AAAA`, or `CNAME` records on the hostname you want to proxy to Cloudflare.

    2.  Add a `CNAME` record for `{your-hostname}.cdn.cloudflare.net`.

        <details>
        <summary>Example CNAME record in Cloudflare</summary>
        <div>

        The `CNAME` record for `www.example.com` would be:

        ```txt
        www.example.com CNAME www.example.com.cdn.cloudflare.net
        ```

        </div>
        </details>

    3.  Repeat this process for each subdomain proxied to Cloudflare.
