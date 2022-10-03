---
pcx_content_type: concept
title: False Positive/Negative Feedback Loop
---

# False Positive/Negative Feedback Loop

The Bots Feedback Loop is an easy way for customers to send Cloudflare direct feedback in the case of Bot Management potentially scoring a request incorrectly. Before, customers could only report issues with bot scores via a support ticket or directly to their account team. 

Now, the Bots Feedback Loop allows users to submit feedback via the API. When a customer submits a False Negative or a False Positive report, Cloudflare manually analyzes this data and use it as a training dataset for our next Machine Learning model.

## Availability

Anyone who has access to Bot Analytics is able to submit feedback. Business and Enterprise customers who have Super Bot Fight Mode enabled will also be able to submit feedback. 

## False Positive

A false positive can happen if Cloudflare scores a request in the **automated** or **likely automated** range, but the request is from a human. An example might be if you’re using a novel browser and OS combination that we have not seen before on the internet. 

## False Negative

If Cloudflare is unable to detect a portion of automated traffic on your site, submitting a False Negative report will help us catch it in the future. 

## Submit a Report
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **Bots**.
Select **Report incorrect data**.

### Recommendations when submitting a false positive


### Recommendations when submitting a false negative


## API Example 

```json
---
header: Response
---
curl -X POST 'https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/bot_management/feedback' \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json" \
-d '{
    "type": "false_positive",
    "description": "Legitimate customers having low score",
    "expression": "(cf.bot_management.score le 46 and ip.geoip.asnum eq 132892 and http.host eq \"api-discovery.theburritobot.com\" and cf.bot_management.ja3_hash eq \"3fed133de60c35724739b913924b6c24\")",
    "first_request_seen_at": "2022-08-01T00:00:00Z",
    "last_request_seen_at": "2022-08-10T00:00:00Z",
    "requests": 100,
    "requests_by_score": {
      "1": 50,
      "10": 50
    },
    "requests_by_score_src": {
      "heuristics": 25,
      "machine_learning": 75
    },
    "requests_by_attribute": {
      "topIPs": [
        {
          "metric": "10.75.34.1",
          "requests": 100
        }
      ],
      "topUserAgents": [
        {
          "metric": "curl/7.68.0",
          "requests": 100
        }
      ]
    }
}'
 ```