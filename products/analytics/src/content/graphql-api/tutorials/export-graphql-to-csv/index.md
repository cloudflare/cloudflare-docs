---
pcx-content-type: interim
---

# Export GraphQL data to CSV

<Aside type="warning">

This tutorial uses Network Analytics v2 nodes. For more information on migrating from Network Analytics v1 to Network Analytics v2, refer to the [migration guide](/graphql-api/migration-guides/network-analytics-v2).

</Aside>

This tutorial shows how to create a Python script that queries the GraphQL API for Network Analytics data and then converts that data to comma-separated values (CSV) so that tools like [Splunk](https://www.splunk.com) can easily ingest and visualize it.

This example queries the `dosdAttackAnalyticsAdaptiveGroups` [data set](/graphql-api/features/data-sets).

## Set up script and authentication

<Aside type='note' header='Note'>

This tutorial assumes that you already have a Cloudflare API token for authentication to the Analytics GraphQL API.

If you do not already have one, see [_Configure an Analytics API token_](/graphql-api/getting-started/authentication/api-token-auth).

</Aside>

The first step is to set up the script and define the variables for authenticating to the Analytics GraphQL API using a Cloudflare API token. The script also provides variables to set the range of data to export. This example queries for a seven-day period that ended yesterday.

```python
---
header: Set up script and authentication
---
#!/usr/bin/env python3

import pandas as pd
from datetime import datetime, timedelta
import requests

url = 'https://api.cloudflare.com/client/v4/graphql/'
# Customize these variables.
file_dir = ''  # Must include trailing slash. If left blank,
# csv will be created in the current directory.
api_email = '[your email here]'
api_token = '[your API token here]'
api_account = '[your account ID here]'
# Set most recent day as yesterday by default.
offset_days = 1
# How many days worth of data do we want? By default, 7.
historical_days = 7
```

## Calculate the date and time _n_ days ago

The `get_datetime()` function takes a number of days (`num_days`), subtracts that value from now, and returns a `datetime` value corresponding to `num_days` ago.

```python
---
header: Calculate the date num_days ago
---
def get_datetime(num_days):
    today = datetime.utcnow().replace(microsecond=0)
    return today - timedelta(days=num_days)
```

The script uses `get_datetime()` with the `offset_days` and `historical_days` variables to calculate the appropriate date range (`min_date` and `max_date`) when it queries the Analytics GraphQL API.

## Query the Analytics GraphQL API

The `get_cf_graphql()` function assembles a request to the Analytics GraphQL API. The headers include the data for authentication.

The payload contains the GraphQL query. For help getting started with GraphQL queries, see [_Querying basics_](/graphql-api/getting-started/querying-basics).

Note that the braces used in the GraphQL query are doubled to escape them in Python’s f-string.

```python
---
header: Query the Network Analytics GraphQL API
---
def get_cf_graphql():
    headers = {
        'content-type': 'application/json',
        'X-Auth-Email': api_email,
        'Authorization': f'Bearer {api_token}',
    }
    # This variable replacement requires Python 3.6 or higher
    payload = '''{ \
      "query": \
        "query ipFlowEventLog( \
          $accountTag: string, \
          $filter: AccountDosdAttackAnalyticsAdaptiveGroupFilter_InputObject) { \
          viewer { \
            accounts( \
              filter: { accountTag: $accountTag } \
            ) { \
              dosdAttackAnalyticsAdaptiveGroups( \
                filter: $filter, \
                limit: 10000, \
                orderBy: [datetimeMinute_ASC] \
              ) { \
                dimensions { \
                  datetimeMinute \
                  attackId, \
                  attackDestinationIp, \
                  attackDestinationPort, \
                  attackMitigationType, \
                  attackSourcePort, \
                  attackType \
                }, \
                sum { \
                  bits, \
                  packets \
                } \
              } \
            } \
          } \
        }",''' + \
        f'''"variables": {{ "accountTag":"{api_account}", ''' + \
        f''' "filter": {{ "AND":[{{"datetime_geq":"{min_datetime.isoformat()}Z"}}, ''' + \
        f'''{{"datetime_leq": "{max_datetime.isoformat()}Z"}}] }} }} }}'''

    r = requests.post(url, data=payload, headers=headers)
    return r.text
```

## Convert the data to CSV

Use a tool such as the open-source [pandas](https://pandas.pydata.org/pandas-docs/stable/index.html) library (`pd`) to convert the GraphQL data to CSV. In this example, the `convert_to_csv()` function does a bit of JSON processing before conversion—normalizing the data, selecting only the desired data, and renaming the columns so that they are user friendly.

The result is output to file in the directory specified by `file_dir`.

```python
---
header: Convert the data to CSV
---
def convert_to_csv():
    # Parse JSON response in Pandas
    network_analytics = pd.read_json(raw_data)['data']['viewer']['accounts']
    # Flatten nested JSON data first
    network_analytics_normalized = pd.json_normalize(
        network_analytics, 'dosdAttackAnalyticsAdaptiveGroups')
    # Only select the columns we are interested in
    network_analytics_abridged = network_analytics_normalized[
        [
            'dimensions.attackId',
            'dimensions.attackMitigationType',
            'dimensions.attackType',
            'dimensions.attackDestinationIp',
            'dimensions.attackDestinationPort',
            'sum.bits',
            'sum.packets',
        ]
    ]  # Selecting only the data we want

    # Rename the columns to visually friendly names
    network_analytics_abridged.columns = [
        'Attack ID',
        'Action taken',
        'Attack type',
        'Destination IP',
        'Destination Port',
        'Total Bits',
        'Total Packets',
    ]  # Renaming columns
    network_analytics_abridged.to_csv(
        f"{file_dir}network-analytics-{min_datetime}.csv")


max_datetime = get_datetime(offset_days)
min_datetime = get_datetime(historical_days)

raw_data = get_cf_graphql()
convert_to_csv()
print("Successfully exported!")
```

## Complete script

```python
---
header: Cloudflare Analytics GraphQL to CSV
---
#!/usr/bin/env python3

import pandas as pd
from datetime import datetime, timedelta
import requests

url = 'https://api.cloudflare.com/client/v4/graphql/'
# Customize these variables.
file_dir = ''  # Must include trailing slash. If left blank,
# csv will be created in the current directory.
api_email = '[your email here]'
api_token = '[your API token here]'
api_account = '[your account ID here]'
# Set most recent day as yesterday by default.
offset_days = 1
# How many days worth of data do we want? By default, 7.
historical_days = 7


def get_datetime(num_days):
    today = datetime.utcnow().replace(microsecond=0)
    return today - timedelta(days=num_days)


def get_cf_graphql():
    headers = {
        'content-type': 'application/json',
        'X-Auth-Email': api_email,
        'Authorization': f'Bearer {api_token}',
    }
    # This variable replacement requires Python 3.6 or higher
    payload = '''{ \
      "query": \
        "query ipFlowEventLog( \
          $accountTag: string, \
          $filter: AccountDosdAttackAnalyticsAdaptiveGroupFilter_InputObject) { \
          viewer { \
            accounts( \
              filter: { accountTag: $accountTag } \
            ) { \
              dosdAttackAnalyticsAdaptiveGroups( \
                filter: $filter, \
                limit: 10000, \
                orderBy: [datetimeMinute_ASC] \
              ) { \
                dimensions { \
                  datetimeMinute \
                  attackId, \
                  attackDestinationIp, \
                  attackDestinationPort, \
                  attackMitigationType, \
                  attackSourcePort, \
                  attackType \
                }, \
                sum { \
                  bits, \
                  packets \
                } \
              } \
            } \
          } \
        }",''' + \
        f'''"variables": {{ "accountTag":"{api_account}", ''' + \
        f''' "filter": {{ "AND":[{{"datetime_geq":"{min_datetime.isoformat()}Z"}}, ''' + \
        f'''{{"datetime_leq": "{max_datetime.isoformat()}Z"}}] }} }} }}'''

    r = requests.post(url, data=payload, headers=headers)
    return r.text


def convert_to_csv():
    # Parse JSON response in Pandas
    network_analytics = pd.read_json(raw_data)['data']['viewer']['accounts']
    # Flatten nested JSON data first
    network_analytics_normalized = pd.json_normalize(
        network_analytics, 'dosdAttackAnalyticsAdaptiveGroups')
    # Only select the columns we are interested in
    network_analytics_abridged = network_analytics_normalized[
        [
            'dimensions.attackId',
            'dimensions.attackMitigationType',
            'dimensions.attackType',
            'dimensions.attackDestinationIp',
            'dimensions.attackDestinationPort',
            'sum.bits',
            'sum.packets',
        ]
    ]  # Selecting only the data we want

    # Rename the columns to visually friendly names
    network_analytics_abridged.columns = [
        'Attack ID',
        'Action taken',
        'Attack type',
        'Destination IP',
        'Destination Port',
        'Total Bits',
        'Total Packets',
    ]  # Renaming columns
    network_analytics_abridged.to_csv(
        f"{file_dir}network-analytics-{min_datetime}.csv")


max_datetime = get_datetime(offset_days)
min_datetime = get_datetime(historical_days)

raw_data = get_cf_graphql()
convert_to_csv()
print("Successfully exported!")
```
