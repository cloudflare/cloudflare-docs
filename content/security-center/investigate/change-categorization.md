---
pcx_content_type: how-to
title: Change categorization
weight: 4
---

# Change categorization

Cloudflare sorts domains into categories based on their content and security type. You can request categorization changes via the [dashboard](#via-the-cloudflare-dashboard), [Cloudflare Radar](#via-cloudflare-radar), or the [API](#via-the-api).

For a detailed list of categories, refer to [Domain categories](/cloudflare-one/policies/gateway/domain-categories/).

## Via the Cloudflare dashboard

To request a categorization change via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Security Center** > **Investigate**.
3. Search for the domain you want to change.
4. In **Domain overview**, select **Request to change categorization**.
5. Choose whether to change a [security category](/cloudflare-one/policies/gateway/domain-categories/#security-categories) or a [content category](/cloudflare-one/policies/gateway/domain-categories/#content-categories).
6. Choose which categories you want to add or remove from the domain.

   {{<Aside type="note" header="Content category limit">}}
   A domain cannot have more than two associated content categories. To propose changes to categories of a domain with more than two existing categories, remove one or more of the existing categories.
   {{</Aside>}}

7. Select **Submit** to submit your request for review.

Requesting a security category change will trigger a deeper investigation by Cloudflare to confirm that the submission is valid. Requesting a content category change also requires Cloudflare validation, but the turnaround time for these submissions is usually shorter as it requires less investigation.

Your category change requests will be revised by the Cloudflare team depending on the type of change. If your requests have been reviewed and applied by the Cloudflare team, the new categories will be visible in the Cloudflare dashboard in **Security Center** > **Investigate**, as well as in [Cloudflare Radar](https://radar.cloudflare.com/).

{{<Aside type="warning">}}
Cloudflare does not guarantee the category change will be approved.
{{</Aside>}}

## Via Cloudflare Radar

To request recategorization via Cloudflare Radar, submit feedback in [Radar Domain Categorization](https://radar.cloudflare.com/domains/feedback).

## Via the API

To request a categorization change via the API:

1. [Create an API token](/fundamentals/api/get-started/create-token/) with permission to edit your Intel account.

    | **Permissions** |       |      |
    | --------------- | ----- | ---- |
    | Account         | Intel | Edit |

    | **Account Resources** |              |
    | --------------------- | ------------ |
    | Include               | All accounts |

2. Make a call to the [miscategorization endpoint](/api/operations/miscategorization-create-miscategorization) including the domain name and any categories you would like to add or remove. For example:

    ```bash
    curl https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/miscategorization \
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
