---
title: Filter different views
pcx_content_type: how-to
---

# Filter different views

You can utilize different [Log filters](/logs/reference/filters/) to only view specific data from Magic Firewall.

## Filter by enabled or disabled rules

Use the filter examples below to filter your Magic Firewall traffic to display events for enabled or disabled rules.

The example below only displays fields relevant to Magic Firewall, and the filter only displays events for disabled rules.

```bash
curl -sS "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
  -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
  -H "X-Auth-Key: <CLOUDFLARE_API_KEY>" \
  -X POST \
  -d '{
    ...
    "logpull_options": "fields=ColoName,Datetime,Direction,IPDestinationAddress,IPDestinationSubnet,IPProtocol,IPSourceAddress,IPSourceSubnet,Outcome,RuleID,RulesetID,SampleInterval,Verdict",
    "filter": "{\"where\":{\"or\":[{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"},{\"key\":\"Outcome\",\"operator\":\"eq\",\"value\":\"pass\"},{\"key\":\"Verdict\",\"operator\":\"eq\",\"value\":\"drop\"}]}]}}"
  }'
```

The example below only displays fields relevant to Magic Firewall, and the filter only displays events for enabled rules.

```bash
curl -sS "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
    -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
    -H "X-Auth-Key: <CLOUDFLARE_API_KEY>" \
    -X POST \
    -d '{
      ...
      "logpull_options": "fields=ColoName,Datetime,Direction,IPDestinationAddress,IPDestinationSubnet,IPProtocol,IPSourceAddress,IPSourceSubnet,Outcome,RuleID,RulesetID,SampleInterval,Verdict",
      "filter": "{\"where\":{\"or\":[{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"},{\"or\":[{\"key\":\"Outcome\",\"operator\":\"eq\",\"value\":\"drop\"},{\"key\":\"Verdict\",\"operator\":\"eq\",\"value\":\"pass\"}]}]}]}}"
    }'
```

## Filter by allowed or blocked traffic

Use the filter examples below to filter your Magic Firewall traffic to display events for allowed or blocked traffic.

The example below only displays fields relevant to Magic Firewall, and the filter only displays events where no explicit action was taken, for example, a packet "fell through" Magic Firewall. This example does not have any rules applied.

```bash
  curl -sS "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
    -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
    -H "X-Auth-Key: <CLOUDFLARE_API_KEY>" \
    -X POST \
    -d '{
      ...
      "logpull_options": "fields=ColoName,Datetime,Direction,IPDestinationAddress,IPDestinationSubnet,IPProtocol,IPSourceAddress,IPSourceSubnet,Outcome,RuleID,RulesetID,SampleInterval,Verdict",
      "filter": "{\"where\":{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"eq\",\"value\":\"\"}]}}"
    }'
```

The example below only displays fields relevant to Magic Firewall, and the filter only displays events where explicit action was taken. The example includes both enabled and disabled Magic Firewall rules.

```bash
curl -sS "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
    -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
    -H "X-Auth-Key: <CLOUDFLARE_API_KEY>" \
    -X POST \
    -d '{
      ...
      "logpull_options": "fields=ColoName,Datetime,Direction,IPDestinationAddress,IPDestinationSubnet,IPProtocol,IPSourceAddress,IPSourceSubnet,Outcome,RuleID,RulesetID,SampleInterval,Verdict",
      "filter": "{\"where\":{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"}]}}"
    }'
```

## Filter by relevant fields to Magic Firewall

Use the examples below to filter out fields that are not relevant to traffic flowing through Magic Firewall. The example below only includes Magic Firewall events.

```bash
  curl -sS "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
    -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
    -H "X-Auth-Key: <CLOUDFLARE_API_KEY>" \
    -X POST \
    -d '{
      ...
      "logpull_options": "fields=ColoName,Datetime,Direction,IPDestinationAddress,IPDestinationSubnet,IPProtocol,IPSourceAddress,IPSourceSubnet,Outcome,RuleID,RulesetID,SampleInterval,Verdict",
      "filter": "{\"where\":{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"}}"
    }'
```