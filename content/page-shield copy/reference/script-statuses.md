---
pcx_content_type: reference
title: Statuses
weight: 2
meta:
  title: Script and connection statuses
---

# Script and connection statuses

Cloudflare classifies scripts and connections (also known as resources) according to the following:

* The number of times a script/connection was reported.
* Whether the script/connection is considered malicious or not.

Use Page Shield's dashboards to review the scripts loaded in your domain and the connections they make. For more information, refer to [Monitor active connections and scripts on your site](/page-shield/detection/monitor-connections-scripts/).

## Available statuses

* **Infrequent**: There are less than three reports for the script/connection. If there are no reports for a script/connection with _Infrequent_ status for five days, then Page Shield will delete all the information about the script/connection. Scripts with _Infrequent_ status appear only in the All Reported Scripts dashboard, and connections with _Infrequent_ status appear only in the All Reported Connections dashboard.
* **Active**: There are more than three reports for the script/connection.
* **Inactive**: A previously active script/connection was not reported in the last seven days. If the script/connection is reported again later, its status will change back to _Active_. If the script/connection is not reported for 30 days, Page Shield will delete all the information about it. Scripts with _Inactive_ status appear only in the All Reported Scripts dashboard, and connections with _Inactive_ status appear only in the All Reported Connections dashboard.

{{<Aside type="note">}}

All scripts and connections considered malicious will appear in the Monitors dashboard, regardless of their status.

Malicious script/connection detection is only available to Enterprise customers with a paid add-on.

{{</Aside>}}
