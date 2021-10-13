---
pcx-content-type: interim
---

# Export GraphQL data to CSV

This tutorial shows how to create a Python script to query the GraphQL API for
Network Analytics data and convert the response to comma-separated values (CSV).
Produced CSV could be easily ingested by tools like Splunk for further
visualization and usage.

Therefore, this example queries the `ipFlows1mAttacksGroups` [data set][1],
which containes minutely aggregates of Network Analytics attack activity.

## Set up a script with authentication

<Aside type='note' header='Note'>

There are two ways to authentificate the request to GraphQL API:

1. with `Authorization` header, that should contain a pre-generated API Token
   prefixed with `Bearer `, ie:
   ```
   Authorization: Bearer <api-token>
   ```
2. with `X-Auth-Email` and `X-Auth-Key` headers.

This tutorial assumes that you already have a Cloudflare Token and will show you
how to use it to authentificate the request to the GraphQL API.

If you do not have one, please check how to [_configure_][2] an API token.

The query we use in the tutorial requires an API Token with `Account
Analytics:read` permission. It also requires that account you're interested in
entitled to access Network Analytics.

The scripts below require python3.6 or higher.

</Aside>

The first step is to set up the script and define the variables for further
authentication with the GraphQL API using a Cloudflare API token. The script
also provides variables to set the range of data to export.

This example queries for a seven-day period that ended yesterday.

```python
---
header: Set up script and authentication
---
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

The `get_date()` function takes a number of days (`num_days`), subtracts that
value from today's date, and returns the date `num_days` ago.

```python
---
header: Calculate the date num_days ago
---
def get_date(num_days):
    today = datetime.utcnow().date()
    return today - timedelta(days=num_days)

```

The script uses `get_date()` with the `offset_days` and `historical_days`
variables to calculate the appropriate date range (`min_date` and `max_date`)
when it queries the GraphQL API.

## Query the GraphQL API

The `get_cf_graphql()` function assembles and sends a request to the GraphQL
API. The headers will include the data for authentication.

The payload contains the GraphQL query. In this query, we would like to get a
list of the next fields for a given account and time range:

* attack ID
* attack type
* start time
* end time
* mitigation type
* avg, max rate of packets per second

To get started with GraphQL queries, please see [_Querying basics_][3].

Please note: the braces used in the GraphQL query are doubled to escape them in
Python.

Keep also in mind, that GraphQL requires a query to be a single-line text,
therefore we should remove all newline symbols before sending it.

```python
---
header: Query the Network Analytics GraphQL API
---
def get_cf_graphql():
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
              "date_geq": "{min_date}"
            }},
            {{
              "date_leq": "{max_date}"
            }}
          ]
        }}
      }}
    }}'''

    r = requests.post(url, data=payload.replace('\n', ''), headers=headers)
    return r.text
```

## Convert the data to CSV

Use a tool such as the open-source [pandas][4] library (`pd`) to convert a
response from the GraphQL API (JSON) to CSV.

In this example, the `convert_to_csv()` function does a bit of JSON processing
before conversion—normalizing the data, selecting only the desired data, and
renaming the columns so that they are user-friendly.

The result is output to file in the directory specified by `file_dir`.

```python
---
header: Convert the data to CSV
---
def convert_to_csv():
    # Parse JSON response in Pandas
    network_analytics = pd.read_json(raw_data)['data']['viewer']['accounts']
    # Flatten nested JSON data first
    network_analytics_normalized = pd.json_normalize(network_analytics, 'ipFlows1mAttacksGroups')
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
      'Start date/time',
      'End date/time',
      'Action taken',
      'Attack type',
      'Destination IP',
      'Max packets/second',
      'Avg packets/second']
    network_analytics_abridged.to_csv("{}network-analytics-{}.csv".format(file_dir, min_date))
 
max_date = get_date(offset_days)
min_date = get_date(historical_days)
 
raw_data = get_cf_graphql()
convert_to_csv()
```

## The final script

```python
---
header: Get Cloudflare Network Analytics via GraphQL API in CSV format
---
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
 
def get_date(num_days):
    today = datetime.utcnow().date()
    return today - timedelta(days=num_days)
 
def get_cf_graphql():
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
              "date_geq": "{min_date}"
            }},
            {{
              "date_leq": "{max_date}"
            }}
          ]
        }}
      }}
    }}'''

    r = requests.post(url, data=payload.replace('\n', ''), headers=headers)
    return r.text
 
def convert_to_csv():
    # Parse JSON response in Pandas
    network_analytics = pd.read_json(raw_data)['data']['viewer']['accounts']
    # Flatten nested JSON data first
    network_analytics_normalized = pd.json_normalize(network_analytics, 'ipFlows1mAttacksGroups')
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
      'Start date/time',
      'End date/time',
      'Action taken',
      'Attack type',
      'Destination IP',
      'Max packets/second',
      'Avg packets/second']
    network_analytics_abridged.to_csv("{}network-analytics-{}.csv".format(file_dir, min_date))
 
max_date = get_date(offset_days)
min_date = get_date(historical_days)
 
raw_data = get_cf_graphql()
convert_to_csv()
```

[1]: /graphql-api/features/data-sets
[2]: /graphql-api/getting-started/authentication/api-token-auth
[3]: /graphql-api/getting-started/querying-basics
[4]: <https://pandas.pydata.org/pandas-docs/stable/index.html>