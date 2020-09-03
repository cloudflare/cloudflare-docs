---
title: "Activity Log"
alwaysopen: true
weight: 2
---

The Activity log allows you to see individual DNS queries made from your locations. You can use the Activity log to investigate anomalies in your network. You can search by the DNS query and investigate each query by clicking on a row.

![Gateway activity log](../static/teams-dash-activity-log.png)


When you click on the row, you can see information related to the identity that is making the DNS request and attributes relevant to the DNS queries. 

![Gateway activity log expanded](../static/teams-dash-activity-log-expanded.png)

## Explanation of the fields

### Request
The name of the domain that was queried.

### Request type
The DNS query type. [This page](https://en.wikipedia.org/wiki/List_of_DNS_record_types) contains a list of all the DNS query types.

### Action
What Action Gateway applied. For example: Allowed, Blocked etc.

### Source IP 
The public source IP of the DNS request.

### Time
The timestamp of the DNS query.

### Location
The location from where the DNS query was made.

### Protocol type
The protocol that was used to make the DNS query.

### Port
The port that was used to make the DNS request.

### Policies
The name of the policy if it applies to the DNS request.

### Categories
Category or categories associated with the DNS request.