---
title: Letter of Authorization
pcx_content_type: concept
meta:
  title: Letter of Authorization (LOA)
---

# Letter of Authorization (LOA)

A letter of authorization (LOA) is a document that authorizes Cloudflare to announce a prefix(es) on behalf of another entity. The LOA is required by Cloudflare's transit providers so they can accept the routes Cloudflare advertises on behalf of another entity.

The letter must contain both the prefixes you are authorizing Cloudflare to announce and which ASN they will be announced under. Cloudflare can announce a prefix under your ASN or you are welcome to use Cloudflare's ASN. If you want to use Cloudflare's ASN, inform your account team and they will provide the AS number to put in the LOA document.

{{<Aside type="note" header="Note">}}

An LOA is a formal document which should be on company letterhead and contain a wet signature. The Letter of Authorization must be a PDF. Transit providers may reject the LOA if it is a JPG or PNG.

{{</Aside>}}

## LOA template

You can use the below template when creating an LOA document.

```txt
[COMPANY LETTERHEAD]

LETTER OF AUTHORIZATION ("LOA")

[DATE]


To whom it may concern:

[COMPANY NAME] (the "Company") authorizes Cloudflare, Inc. with AS[CF TO PROVIDE] to advertise the following IP address blocks / originating ASNs:

- - - - - - - - - - - - - - - - - - -
[Subnet & Originating ASN]
[Subnet & Originating ASN]
[Subnet & Originating ASN]
- - - - - - - - - - - - - - - - - - -

As a representative of the Company that is the owner of the aforementioned IP address blocks / originating ASNs, I hereby declare that I am authorized to sign this LOA on the Company’s behalf.

Should you have any questions please email me at [E-MAIL ADDRESS], or call: [TELEPHONE NUMBER]

Regards,


[SIGNATURE]


[NAME TYPED]
[TITLE]
[COMPANY NAME]
[COMPANY ADDRESS]
[COMPANY STAMP]
```
