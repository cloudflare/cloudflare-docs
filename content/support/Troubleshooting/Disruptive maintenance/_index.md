---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360060050511-Disruptive-Maintenance-Windows
title: Disruptive Maintenance Windows
---
 
# Disruptive Maintenance

## Scheduled Maintenance Windows

Maintenances will be published on the status page using a _calendar_ that is updated on a daily basis.

During these maintenance windows, customers may experience a slight increase in latency to the edge location which is under maintenance.

{{<Aside type="note">}}
All dates in the calendar are in UTC Timezone.
{{</Aside>}}

### Maintenance Calendar links

[Download iCal](https://calendar.google.com/calendar/ical/c_83vui762nfm498l9a0ciojbju0%40group.calendar.google.com/public/basic.ics "Download iCal")
[Add to Google Calendar](https://calendar.google.com/calendar/u/0?cid=Y184M3Z1aTc2Mm5mbTQ5OGw5YTBjaW9qYmp1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t "Add to Google Calendar")

### Notifications

Scheduled maintenances can also be sent out via [Cloudflare Notifications](/notifications/).

## Unplanned Maintenance

Cloudflare operates a redundant [Anycast network](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/) that is capable of automatically removing locations from our network if they require unplanned maintenance or experience an emergency event. In such cases, traffic will be rerouted automatically to alternative locations.

To check for unplanned maintenance, you can confirm at all times if a location was re-routed by verifying if its status is listed as "Re-routed" in our status page https://www.cloudflarestatus.com. Exceptionally, an incident may be declared for maintenance at a location, in which case updates will be available in our status page at https://www.cloudflarestatus.com.

## Interconnections at locations under maintenance
If you have a CNI connection (internal link) with Cloudflare at a re-routed location, it may become temporarily unavailable during planned or unplanned maintenance, and regular internet routing may be used instead to reach your network.

In the Magic family of products, the routing is defined explicitly using static routes (internal link) to send traffic to the specified tunnels, with customer-configured priorities. If you have a CNI tunnel, we strongly recommend that you also add routes to an alternative tunnel, such as a fallback Internet tunnel, to make sure your traffic can be routed at all times.