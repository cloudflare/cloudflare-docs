---
_build:
  publishResources: false
  render: never
  list: never
---

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. In the top navigation bar, click **Add site**.
3. Enter your website’s apex domain (`example.com`) and then click **Add Site**.
    
    {{<Aside type="note">}}
If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).

Additionally, Cloudflare requires your `apex domain` to be one level below a valid TLD defined in the [Public Suffix List (PSL)](https://github.com/publicsuffix/list/blob/master/public_suffix_list.dat).
    {{</Aside>}}
    
4. Select your plan level. For more details on features and pricing, refer to [our Plans page](https://www.cloudflare.com/plans/#compare-features).
5. Review your DNS records.

    {{<render file="_dns-scan-intro.md" productFolder="dns" >}} <br />

    1. {{<render file="_dns-scan-procedure.md" productFolder="dns" >}}

        {{<render file="_dns-nxdomain-warning.md" productFolder="dns" >}}

    2. If you find any missing records, [manually add](/dns/manage-dns-records/how-to/create-dns-records/) those records.
    3. Depending on your site setup, you may want to adjust the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) for certain `A`, `AAAA`, or `CNAME` records.
    4. Click **Continue**.

6. Go through the **Quick Start Guide** and when you have finished, click **Finish**.
