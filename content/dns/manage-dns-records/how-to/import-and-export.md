---
pcx_content_type: how-to
title: Import and export records
weight: 2
---

# Import and export records

Use import and export to have more control over your DNS records and make processes like migrating a domain or bulk editing [record comments](/dns/manage-dns-records/reference/record-attributes/) easier.

## Import records

{{<Aside type="warning">}}
{{<render file="_zone-file-size-limit.md">}}
{{</Aside>}}

### Format your zone file

Create a [BIND zone file](https://en.wikipedia.org/wiki/Zone_file) for your domain. If you need help, use a [third-party tool](https://pgl.yoyo.org/as/bind-zone-file-creator.php).

If you are using certain record types — for example, `CNAME`, `DNAME`, `MX`, `NS`, `PTR`, or `SRV` records — make sure that the **content** of those records contains fully qualified domain names (which end in a trailing period like `example.com.`). For more details, refer to [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035#section-5.1) or this [post on Stack Exchange](https://superuser.com/questions/348282/fqdn-format-in-bind-zone#348284).

### Import zone file to Cloudflare


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To import a zone file using the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS** > **Records**.
3.  Select **Import and Export**.
4.  For **Import DNS records**, select your [formatted file](#format-your-zone-file).
5.  If you do not want [applicable records](/dns/manage-dns-records/reference/proxied-dns-records/) proxied, unselect **Proxy imported DNS records**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To import records using the API, send a [POST request](/api/operations/dns-records-for-a-zone-import-dns-records) with a properly [formatted file](#format-your-zone-file).

{{</tab>}}
{{</tabs>}}

---

## Export records

You can also bulk export records from Cloudflare.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To export records using the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS** > **Records**.
3.  Select **Import and Export**.
4.  Select **Export**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To export records using the API, send a [GET request](/api/operations/dns-records-for-a-zone-export-dns-records).

{{</tab>}}
{{</tabs>}}

---

## DNS record attributes

When exporting or importing a zone file, Cloudflare formats [comments and tags](/dns/manage-dns-records/reference/record-attributes/) using the following structure, appending the attributes as inline comment using the `;` character after each record in accordance with [RFC 1035 section 5](https://datatracker.ietf.org/doc/html/rfc1035#section-5-1):

| Combination | Description |
| --- | --- |
| **Only tags** | Tag names contain a [small set](/dns/manage-dns-records/reference/record-attributes/#tags) of characters.<br/><br/>Additionally, tag values must be contained by a double quote (`"`) if they contain `"`, `=`, `,`, or `\`. When enclosed within double quotes (`"`), tag values are represented as JSON strings, so other quotes within the value can be escaped as `\"`.<br/><br/>A tag with an empty value can be represented either as `my-tag-name:""`, `my-tag-name:`, or `my-tag-name`. |
| **Only a comment** | Comments have [fewer limitations](/dns/manage-dns-records/reference/record-attributes/#comments) on characters, meaning that the comment is included verbatim.<br/><br/>If the comment includes the string `cf_tags=`, you need to include an additional ` cf_tags=` at the end of the line. |
| **Comment and tags** | The zone file comment would be of the form ; `<comment>` cf_tags=`<tags>`, as described above. Note the added space character before `cf_tags=`. |
| **Neither attribute** | The comment in the zone file may be empty or omitted entirely. Comments in the zone file that do not immediately follow a record are also ignored. |

```txt
---
header: Example zone file
---
; Only tags
a.example.com.  60  IN  A   1.1.1.1 ;   cf_tags=awesome
b.example.com.  60  IN  A   1.1.1.1 ;   cf_tags=tag1,tag2:value2,tag3:"value,with,commas",tag4:"value with \"escaped\" quotation marks"

; Only a comment
c.example.com.  60  IN  A   1.1.1.1 ; just a comment without tags
d.example.com.  60  IN  A   1.1.1.1 ; this comment contains cf_tags= as text cf_tags=

; Comments and tags
e.example.com.  60  IN  A   1.1.1.1 ; simple example cf_tags=important,ticket:THIS-12345
f.example.com.  60  IN  A   1.1.1.1 ; this is the comment cf_tags=tag1:value1,tag2:value2,tag-without-value,another-tag-without-value,tag-with-quoted-value:"because of the comma, quotes are needed"

; Neither attribute
g.example.com.  60  IN  A   1.1.1.1
```
