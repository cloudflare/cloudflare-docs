---
_build:
  publishResources: false
  render: never
  list: never
---

## Prerequisites

To ensure changes made in this tutorial take effect quickly, update the Time to Live (TTL) value of the existing MX records on your domains to five minutes. Do this on all the domains you will be deploying. 

Changing the TTL value instructs DNS servers on how long to cache this value before requesting an update from the responsible name server. You need to change the TTL value before changing your MX records to Cloudflare Area 1. This will ensure that changes take effect quickly and can also be reverted quickly if needed. If your DNS manager does not allow for a TTL of five minutes, set it to the lowest possible setting.

To check your existing TTL, open a terminal window and run the following command against your domain:

```sh
$ dig mx <YOUR_DOMAIN>

; <<>> DiG 9.10.6 <<>> mx <YOUR_DOMAIN>
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39938
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;domain.		IN	MX

;; ANSWER SECTION:
<YOUR_DOMAIN>.	300	IN	MX	5 mailstream-central.mxrecord.mx.
<YOUR_DOMAIN>.	300	IN	MX	10 mailstream-east.mxrecord.io.
<YOUR_DOMAIN>.	300	IN	MX	10 mailstream-west.mxrecord.io.
```

In the above example, TTL is shown in seconds as `300` (or five minutes). 

If you are using Cloudflare for DNS, you can leave the [TTL setting as **Auto**](/dns/manage-dns-records/reference/ttl/).

Below is a list with instructions on how to edit MX records for some popular services:

- **Cloudflare**: [Set up email records](/dns/manage-dns-records/how-to/email-records/)
- **GoDaddy**: [Edit an MX Record](https://www.godaddy.com/help/edit-an-mx-record-19235)
- **AWS**: [Creating records by using the Amazon Route 53 console](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)
- **Azure**: [Create DNS records in a custom domain for a web app](https://learn.microsoft.com/en-us/azure/dns/dns-web-sites-custom-domain)