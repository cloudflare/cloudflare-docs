---
pcx_content_type: how-to
title: Change categorization
weight: 4
---

# Change categorization

Cloudflare sorts domains into categories based on their content and security type. You can request categorization changes via the [Cloudflare dashboard](#change-categorization-via-the-cloudflare-dashboard), [Cloudflare Radar](#radar-feedback), or the [API](#api).

For a detailed list of categories, refer to [Domain categories](/cloudflare-one/policies/gateway/domain-categories/).

## Change categorization via the Cloudflare dashboard

When you search for a domain, you can request to change its categorization under the **Domain Overview**.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Security Center** > **Investigate**.
3. Select **Request to change categorization**.
4. Choose whether to change a security or a content category.
5. Select **Submit** to submit your request for review after you have selected the categories.

The interface will not allow a domain to have more than two content categories associated with it. To change the proposed categories, remove some of the selected categories.

Once the reports have been reviewed and actioned by the Cloudflare team, the new categories will be visible in Investigate and in Cloudflare Radar.

Requesting a change to **Security** Categories will trigger a deeper investigation on the Cloudflare side to confirm that the submission is valid.

Requesting a **Content** Category change also requires Cloudflare validation but the turnaround time for these submissions is usually lower as it requires less investigation.

The category change requests will be revised by the Cloudflare team, depending on the type of change. Check back to see if the change was implemented

{{<Aside type="note">}}
There is no guarantee the category change will be approved.
{{</Aside>}}

## Radar feedback

To request recategorization via Cloudflare Radar, submit feedback in [Radar Domain Categorization](https://radar.cloudflare.com/domains/feedback).

## API

You can request categorization changes by creating a [miscategorization API Token](/api/operations/miscategorization-create-miscategorization).

1. [Create an API token](/fundamentals/api/get-started/create-token/) with permission to edit your Intel account:

    | **Permissions** |       |      |
    | --------------- | ----- | ---- |
    | Account         | Intel | Edit |

    | **Account Resources** |              |
    | --------------------- | ------------ |
    | Include               | All accounts |

2. Make a call to the [miscategorization endpoint](/api/operations/miscategorization-create-miscategorization) including the domain name and any categories you would like to add or remove. For example:

    ```bash
    curl https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/miscategorization> \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" \
    --data '{
      "content_adds": [
        82
      ],
      "content_removes": [
        155
      ],
      "indicator_type": "domain",
      "ip": null,
      "security_adds": [
        117,
        131
      ],
      "security_removes": [
        83
      ],
      "url": "example.com"
    }'
    ```
