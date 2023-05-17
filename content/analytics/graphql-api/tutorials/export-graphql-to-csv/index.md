---
pcx_content_type: tutorial
title: Export GraphQL data to CSV
layout: single
---

# Export GraphQL data to CSV

This tutorial shows how to create a Python script to query the GraphQL API for
Network Analytics data and convert the response to comma-separated values (CSV).
Produced CSV could be easily ingested by tools like [Splunk][6] for further
visualization and usage.

Therefore, this example queries the `ipFlows1mAttacksGroups` [dataset][1],
which contains minutely aggregates of Network Analytics attack activity.

{{<Aside type="warning" header="Warning">}}

This tutorial uses Network Analytics v1 (NAv1) nodes. These nodes are planned to
be deprecated on 2023-08-01. For more information on migrating from Network
Analytics v1 to Network Analytics v2, refer to the [migration guide][5].

[5]: /analytics/graphql-api/migration-guides/network-analytics-v2/

{{</Aside>}}

## Prerequisites

The tutorial requires a valid Cloudflare API Token with `Account Analytics:read`
permission. It also expects that account you are interested in is entitled to
access Network Analytics.

Scripts in this tutorial requires Python version 3.6 or higher.

If you are looking to configure a Cloudflare API Token for a specific account,
please refer to [Configure an Analytics API token][2]. Make sure you have access to the account.

## Set up a script with authentication

The first step is to set up the script and define the variables for further
authentication with the GraphQL API using a Cloudflare API token. The script
also provides variables to set the range of data to export.

This example queries for a seven-day period that ended yesterday.

```python
---
header: Set up script and authentication
---
#!/usr/bin/env python3

import pandas as pd
from datetime import datetime, timedelta
import requests

# the endpoint of GraphQL API
url = 'https://api.cloudflare.com/client/v4/graphql/'

# Customize these variables.
file_dir = ''  # Must include trailing slash. If left blank,
# csv will be created in the current directory.
api_token = '[your API token here]'
api_account = '[your account ID here]'
# Set most recent day as yesterday by default.
offset_days = 1
# How many days worth of data do we want? By default, 7.
historical_days = 7
```

## Calculate the date _n_ days ago

The `get_past_date()` function takes a number of days (`num_days`), subtracts
that value from today's date, and returns the date `num_days` ago.

```python
---
header: Calculates the datetime num_days ago and returns it in ISO format
---
def get_past_date(num_days):
    today = datetime.utcnow().date()
    return today - timedelta(days=num_days)
```

The script uses `get_past_date()` with the `offset_days` and `historical_days`
variables to calculate the appropriate date range (`min_date` and `max_date`)
when it queries the GraphQL API.

## Query the GraphQL API

The `get_cf_graphql()` function assembles and sends a request to the GraphQL
API. The headers will include the data for authentication.

The payload contains the GraphQL query. In this query, we would like to get a
list of the next fields for a given account and time range:

- attack ID
- attack type
- start time
- end time
- mitigation type
- avg, max rate of packets per second

To get started with GraphQL queries, please refer to [Querying basics][3].

The braces used in the GraphQL query are doubled to escape them in Python's
f-string.

GraphQL requires a query to be a single-line text, therefore we should remove
all newline symbols before sending it.

```python
---
header: Query the Network Analytics GraphQL API
---
def get_cf_graphql(start_date, end_date):
    assert(start_date <= end_date)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_token}'
    }
    # The GQL query we would like to use:
    payload = f'''{{"query":
      "query ipFlowEventLog($accountTag: string) {{
        viewer {{
          accounts(
            filter: {{ accountTag: $accountTag }}
          ) {{
            ipFlows1mAttacksGroups(
              filter: $filter
              limit: 10000
              orderBy: [min_datetimeMinute_ASC]
            ) {{
              dimensions {{
                attackId
                attackDestinationIP
                attackMitigationType
                attackType
              }}
              avg {{
                packetsPerSecond
              }}
              min {{
                datetimeMinute
              }}
              max {{
                datetimeMinute
                packetsPerSecond
              }}
            }}
          }}
        }}
      }}",
      "variables": {{
        "accountTag": "{api_account}",
        "filter": {{
          "AND":[
            {{
              "date_geq": "{start_date}"
            }},
            {{
              "date_leq": "{end_date}"
            }}
          ]
        }}
      }}
    }}'''

    r = requests.post(url, data=payload.replace('\n', ''), headers=headers)
    return r
```

## Convert the data to CSV

Use a tool such as the open-source [pandas][4] library (`pd`) to convert a
response from the GraphQL API (JSON) to CSV.

In this example, the `convert_to_csv()` function does some JSON processing
before conversion — normalizing the data, selecting only the desired data, and
renaming the columns so that they are user-friendly. The function also checks
whether the API responded successfully or we got an error.

The result is output to file in the directory specified by `file_dir`.

```python
---
header: Convert the data to CSV
---
def convert_to_csv(raw_data, start_date, end_date):
    data = pd.read_json(raw_data, dtype=False)['data']
    errors = pd.read_json(raw_data, dtype=False)['errors']

    # Check if we got any errors
    if errors.notna().any() or not 'viewer' in data or not 'accounts' in data['viewer']:
        print('Failed to retrieve data: GraphQL API responded with error:')
        print(raw_data)
        return

    # Flatten nested JSON data first
    network_analytics_normalized = pd.json_normalize(data['viewer']['accounts'], 'ipFlows1mAttacksGroups')

    if len(network_analytics_normalized) == 0:
        print('We got empty response')
        return

    network_analytics_abridged = network_analytics_normalized[[
      'dimensions.attackId',
      'min.datetimeMinute',
      'max.datetimeMinute',
      'dimensions.attackMitigationType',
      'dimensions.attackType',
      'dimensions.attackDestinationIP',
      'max.packetsPerSecond',
      'avg.packetsPerSecond']]
    # Rename the columns to get friendly names
    network_analytics_abridged.columns = [
      'Attack ID',
      'Started at',
      'Ended at',
      'Action taken',
      'Attack type',
      'Destination IP',
      'Max packets/second',
      'Avg packets/second']
    file = "{}network-analytics-{}-{}.csv".format(file_dir, start_date, end_date)
    network_analytics_abridged.to_csv(file)
    print("Successfully exported to {}".format(file))
```

## The final script

```python
---
header: Get Cloudflare Network Analytics via GraphQL API in CSV format
---
#!/usr/bin/env python3

import pandas as pd
from datetime import datetime, timedelta
import requests

# the endpoint of GraphQL API
url = 'https://api.cloudflare.com/client/v4/graphql/'

# Customize these variables.
file_dir = ''  # Must include trailing slash. If left blank,
# csv will be created in the current directory.
api_token = '[your API token here]'
api_account = '[your account ID here]'
# Set most recent day as yesterday by default.
offset_days = 1
# How many days worth of data do we want? By default, 7.
historical_days = 7

def get_past_date(num_days):
    today = datetime.utcnow().date()
    return today - timedelta(days=num_days)

def get_cf_graphql(start_date, end_date):
    assert(start_date <= end_date)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_token}'
    }
    # The GQL query we would like to use:
    payload = f'''{{"query":
      "query ipFlowEventLog($accountTag: string) {{
        viewer {{
          accounts(
            filter: {{ accountTag: $accountTag }}
          ) {{
            ipFlows1mAttacksGroups(
              filter: $filter
              limit: 10000
              orderBy: [min_datetimeMinute_ASC]
            ) {{
              dimensions {{
                attackId
                attackDestinationIP
                attackMitigationType
                attackType
              }}
              avg {{
                packetsPerSecond
              }}
              min {{
                datetimeMinute
              }}
              max {{
                datetimeMinute
                packetsPerSecond
              }}
            }}
          }}
        }}
      }}",
      "variables": {{
        "accountTag": "{api_account}",
        "filter": {{
          "AND":[
            {{
              "date_geq": "{start_date}"
            }},
            {{
              "date_leq": "{end_date}"
            }}
          ]
        }}
      }}
    }}'''

    r = requests.post(url, data=payload.replace('\n', ''), headers=headers)
    return r

def convert_to_csv(raw_data, start_date, end_date):
    data = pd.read_json(raw_data, dtype=False)['data']
    errors = pd.read_json(raw_data, dtype=False)['errors']

    # Check if we got any errors
    if errors.notna().any() or not 'viewer' in data or not 'accounts' in data['viewer']:
        print('Failed to retrieve data: GraphQL API responded with error:')
        print(raw_data)
        return

    # Flatten nested JSON data first
    network_analytics_normalized = pd.json_normalize(data['viewer']['accounts'], 'ipFlows1mAttacksGroups')

    if len(network_analytics_normalized) == 0:
        print('We got empty response')
        return

    network_analytics_abridged = network_analytics_normalized[[
      'dimensions.attackId',
      'min.datetimeMinute',
      'max.datetimeMinute',
      'dimensions.attackMitigationType',
      'dimensions.attackType',
      'dimensions.attackDestinationIP',
      'max.packetsPerSecond',
      'avg.packetsPerSecond']]
    # Rename the columns to get friendly names
    network_analytics_abridged.columns = [
      'Attack ID',
      'Started at',
      'Ended at',
      'Action taken',
      'Attack type',
      'Destination IP',
      'Max packets/second',
      'Avg packets/second']
    file = "{}network-analytics-{}-{}.csv".format(file_dir, start_date, end_date)
    network_analytics_abridged.to_csv(file)
    print("Successfully exported to {}".format(file))

start_date = get_past_date(offset_days + historical_days)
end_date = get_past_date(offset_days)

req = get_cf_graphql(start_date, end_date)
if req.status_code == 200:
    convert_to_csv(req.text, start_date, end_date)
else:
    print("Failed to retrieve data: GraphQL API responded with {} status code".format(req.status_code))
```

[1]: /analytics/graphql-api/features/data-sets/
[2]: /analytics/graphql-api/getting-started/authentication/api-token-auth/
[3]: /analytics/graphql-api/getting-started/querying-basics/
[4]: https://pandas.pydata.org/pandas-docs/stable/index.html
[6]: https://www.splunk.com
