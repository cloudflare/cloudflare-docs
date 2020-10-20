---
order: 2
---

# Configuration data

The following sections outline customer configuration data required for Cloudflare to set up Cloudflare Network Interconnect for your organization.

## Private Network Interconnect

To set up a private network interconnect (PNI), which uses a physical cross-connect to link your network to Cloudflare, list the peering facilities at which you want to interconnect and the desired link size for each.

### Requirements

When specifying PNI locations, be sure your list satisfies these requirements:

* Locations must be accessible from one of [Cloudflare's peering locations](https://www.peeringdb.com/net/4224).

* To set up a cross-connect in a metropolitan area network (MAN) where you are in a physical location that Cloudflare is not, you must purchase Equinix Metro Connect or a similar product that interconnects locations.

  For example, if Cloudflare has a peering facility in NY5 and you are in NY1, you must use Metro Connect to cross-connect from NY1 to NY5.

* The smallest compatible link size for PNI is 10G. (You do not need to use the entire 10G, however.)

### Example PNI configuration data

| Private peering facility | Link size |
|--------------------------|-----------|
| Equinix GVA01            | 10G       |

## Virtual Partner Network Interconnect

To set up a virtual partner network interconnect (vPNI), list the locations you want to interconnect as well as the desired link size, number of VLANs, and rate limit.

### Requirements

You must choose locations that our [Network Interconnect Partner Program](https://www.cloudflare.com/network-interconnect-partnerships/) supports.

### Example vPNI configuration data

| Location      | Link size | VLANs | Rate limit |
|---------------|-----------|-------|------------|
| GVA           | 1G        | 300   | 0          |

## Internet exchange point

To set up an interconnection using an Internet exchange point (IXP), you must initiate the order with the desired exchange and notify Cloudflare once the link is active.

Provide Cloudflare with a list of the IXPs at which you want to interconnect.

### Example IXP configuration data

| Location         |
|------------------|
| EdgeIX Australia |
