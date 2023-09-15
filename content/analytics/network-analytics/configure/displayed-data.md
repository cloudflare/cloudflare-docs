---
title: Adjust the displayed data
pcx_content_type: how-to
weight: 3
meta:
  title: Adjust the data displayed in Network Analytics
---

# Adjust the displayed data

## Select the appropriate tab

To perform a broad analysis of layer 3/4 traffic and DDoS attacks, use the **All traffic** tab.

To focus on a specific mitigation system, select one of the [other available tabs](/analytics/network-analytics/understand/main-dashboard/#available-tabs). The tabs displayed in the dashboard depend on your Cloudflare services.

## Select high-level metric

To toggle your view of the data, select the **Total packets** or **Total bytes** side panels.

![Network Analytics side panels allowing you to use packets or bits/bytes as the base unit for the dashboard.](/images/analytics/network-analytics/high-level-metrics.png)

The selected metric will determine the base units (packets or bits/bytes) used in the several dashboard analytics panels.

## Select a dimension

Under **Packets summary** or **Bits summary**, select one of the [available dimensions](/analytics/network-analytics/understand/main-dashboard/#available-dimensions) to view the data along that dimension. The default dimension is **Action**.

## Apply filters

You can apply multiple filters and exclusions to adjust the scope of the data displayed in Network Analytics.
Filters affect all the data displayed in the dashboard.

There are two ways to filter Network Analytics data: select **Add filter** or select one of the stat filters.

### Select Add filter

Select **Add filter** to open the **New filter** popover. Specify a field, an operator, and a value to complete your filter expression. Select **Apply** to update the view.

{{<Aside type="note" header="Notes about filtering">}}
When applying filters, observe these guidelines:
* Wildcards are not supported.
* You do not need to wrap values in quotes.
* When specifying an ASN number, leave out the `AS` prefix. For example, enter `1423` instead of `AS1423`.
{{</Aside>}}

### Select a stat filter

To filter based on the type of data associated with one of the Network Analytics stats, use the **Filter** and **Exclude** buttons that display when you hover over the stat.

## Create a Magic Firewall rule from the applied filters

{{<Aside type="note">}}
This feature is only available to Magic Transit and Magic WAN users.
{{</Aside>}}

Select **Create Magic Firewall rule** to create a [Magic Firewall](/magic-firewall/) rule that will block all traffic matching the selected filters in Network Analytics.

Note that some filters will not be added to the new Magic Firewall rule definition. However, you can further configure the rule in Magic Firewall.

## Show IP prefix events

Enable the **Show annotations** toggle to show or hide annotations for advertised/withdrawn IP prefix events in the **Network Analytics** view. Select each annotation to get more details.

![Network Analytics chart displaying IP prefix-related annotations.](/images/analytics/network-analytics/view-annotations.png)

