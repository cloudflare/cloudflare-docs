---
order: 3
---

# Troubleshooting Locations

### Your source IPv4 address is taken
![Source IP taken](../static/source-ip-taken.png)
You may see this if you are connected to a network where someone else in the same network signed up for Cloudflare Gateway before you did.

If your network supports IPv6, you can still use Cloudflare Gateway's DNS filtering by sending DNS queries over IPv6. You can also use the DNS over HTTPS hostname to send queries using a DNS over HTTPS client.

If you think someone else is wrongfully using this IPv4 address, please [let us know](https://forms.gle/MUtjTheQh24MRY2aA)

### You are not seeing analytics on the Overview page
![Overview empty](../static/gateway-dash-overview-empty.png)

You may not see analytics on the Overview page for the following reasons:

##### 1. You are not sending DNS queries to Gateway
Verify that the destination IP addresses you are sending DNS queries to are correct. You can check the destination IP addresses for your location by going to your locations page and then expanding the location:

![Location With Destinations](../static/expanded-location-with-destinations.png)

##### 2. You are using other DNS resolvers
If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. Please make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.

##### 3. The source IPv4 address for your location is incorrect
If you are using IPv4, check the source IPv4 address that you entered for the location matches with the network's source IPv4 address.

##### 4. Analytics is not available yet
It takes some time to generate the analytics for Cloudflare Gateway. If you are not seeing anything even after 5 minutes, please file a support ticket.
