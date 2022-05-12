---
pcx-content-type: reference
title: Script statuses
weight: 1
---

# Script statuses

Cloudflare classifies scripts according to the following:

* The number of times a script was reported.
* Whether the script is considered malicious or not.

Use Page Shield's dashboards to review the scripts loaded in your domain. For more information, refer to [Monitor scripts on your site](/page-shield/use-dashboard/monitor-scripts/).

## Available statuses 

* **Infrequent**: There are less than three reports for the script. If there are no reports for a script with _Infrequent_ status for five days, then Page Shield will delete all the information about the script. Scripts with _Infrequent_ status appear only in the All Reported Scripts dashboard.
* **Active**: There are more than three reports for the script.
* **Inactive**: A previously active script was not reported in the last seven days. If the script is reported again later, its status will change back to _Active_. If the script is not reported for 30 days, Page Shield will delete all the information about the script. Scripts with _Inactive_ status appear only in the All Reported Scripts dashboard.
* **CDN-CGI**: The script is hosted behind a `/cdn-cgi/` endpoint. Scripts with _CDN-CGI_ status appear only in the All Reported Scripts dashboard.

{{<Aside type="note">}}

All scripts considered malicious will appear in the Active Scripts dashboard, regardless of their status. 

Malicious script detection is available to Enterprise customers with a paid add-on.

{{</Aside>}}
