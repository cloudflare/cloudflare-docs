---
pcx_content_type: faq
source: https://support.cloudflare.com/hc/en-us/articles/115000310832-Certification-Authority-Authorization-CAA-FAQ
title: Certification Authority Authorization (CAA) FAQ
---

# Certification Authority Authorization (CAA) FAQ

The following page answers common questions about Certification Authority Authorization (`CAA`) records.

---

## What is CAA and how can I create one?

{{<render file="_caa-records-definition.md">}}
<br/>

For more details, refer to [Create CAA records](/ssl/edge-certificates/caa-records/).

___

## How does Cloudflare evaluate CAA records?

`CAA` records are evaluated by a CA, not by Cloudflare.

{{<Aside type="note">}}
Setting a `CAA` record to specify one or more particular CAs does not affect which CA(s) Cloudflare uses to issue a Universal or Advanced SSL certificate for your domain.

You can specify CAs associated with Cloudflare certificates when [ordering an advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/). 

{{</Aside>}}

___

## What are the dangers of setting CAA records?

If you are part of a large organization or one where multiple parties are tasked with obtaining SSL certificates, [include `CAA` records](/ssl/edge-certificates/caa-records/) that allow issuance for all CAs applicable for your organization. Failure to do so can inadvertently block SSL issuance for other parts of your organization.

---

## What CAA records are added by Cloudflare?

{{<render file="_caa-records-added-by-cf.md">}}