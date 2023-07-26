---
pcx_content_type: how-to
title: Change categorization
weight: 4
---

# Change categorization

Domains are sorted into categories by their content and security type. Refer to [domain categories](/cloudflare-one/policies/gateway/domain-categories/) for more information. You can request categorization changes in three ways:

## API

You can request categorization changes by creating a [miscategorization API Token](/api/operations/miscategorization-create-miscategorization).

## Radar feedback

You can use [Cloudflare Radar](https://radar.cloudflare.com/domains/feedback) to submit feedback to request recategorization.

## Change categorization via the Cloudflare dashboard

When you search for a domain, you can request to change its categorization under the **Domain Overview**.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Security Center** > **Investigate**.
3. Select **Request to change categorization**.
4. Choose whether to change a security or a content category.
5. Select **Submit** to submit your request for review after you have selected the categories.

{{<Aside type="note">}}
The interface will not allow a domain to have more than two content categories associated with it. To change the proposed categories, remove some of the selected categories.
{{</Aside>}}

Once the reports have been reviewed and actioned by the Cloudflare team, the new categories will be visible in Investigate and in Cloudflare Radar.

Requesting a change to **Security** Categories will trigger a deeper investigation on the Cloudflare side to confirm that the submission is valid.

Requesting a **Content** Category change also requires Cloudflare validation but the turnaround time for these submissions is usually lower as it requires less investigation.

The category change requests will be revised by the Cloudflare team, depending on the type of change. Check back to see if the change was implemented

{{<Aside type="note">}}
There is no guarantee the category change will be approved.
{{</Aside>}}