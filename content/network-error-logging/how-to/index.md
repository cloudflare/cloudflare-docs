---
title: How to
pcx-content-type: how-to
meta:
  title: View Reports
---

# View Reports

Use NEL reports to view information such as:

- Why a request failed
- The country a request failed from
- The last mile network a request failed from
- The Cloudflare data center the request was most likely meant for

{{<render file="_beta.md">}}

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/).
2.  Click **Analytics** > **Origin Reachability**.

Click a tab under **Reachability summary** to view specific information related to your Origin ASN, Origin, IP, or data center. Hover over a location on the map to view the number of reachable requests.

Under **Reachability by data center**, click a location under Data Centers to filter reachability by a specific location.

## Run a traceroute to origin

Run a traceroute from a specific data center to an origin IP to for information on the number of packets sent and the amount of time it took.

1.  Under **From**, choose a data center.
2.  Under **To**, choose an origin IP.
3.  Click **Run**.

The results display in a table below, and you can optionally export the data to a .CSV format by clicking **Export as CSV**.

To view the log fields available for NEL, refer to [NEL reports](/logs/reference/log-fields/zone/nel_reports/).
