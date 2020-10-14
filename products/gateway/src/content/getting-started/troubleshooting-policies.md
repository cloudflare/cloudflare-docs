---
order: 6
---

# Troubleshooting

## Locations

### Find a location DoH Subdomain
DoH subdomains (previously known as a unique id) are aligned to locations. Locations and corresponding DoH subdomains have policies associated with them.

1. Visit your Teams dashboard to fetch the **DoH subdomain** from your location.
Navigate to the **Locations** page to visualize your location.

![Go to teams dash](../static/go-to-teams-dashboard.png)

2. If you have more than one location set up, you will see a list of all your locations.

![Go to locations page](../static/go-to-locations-page.png)

3. Expand the location card for the location which you'd like to retrieve the corresponding DoH subdomain.

![Expand location card](../static/expand-location-card.png)

4. Get the subdomain of the DNS over HTTPS hostname (previously known as a unique ID). In the example below, the ID is: `fix7p31bzg`.

5. Take note of the **DoH subdomain**.

![Get unique subdomain](../static/unique-gateway-id.png)

### Your source IPv4 address is taken
![Source IP taken](../static/source-ip-taken.png)
If you are seeing this, you may be connected to a network where someone else in the same network signed up for Cloudflare Gateway before you did. 

If your network supports IPv6, you can still use Cloudflare Gateway's DNS filtering by sending DNS queries over IPv6. You can also use the DNS over HTTPS hostname to send queries using a DNS over HTTPS client.

## Analytics

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

## Policies

### You added a domain to the block list but you can still resolve it

#### 1. Policy update is still in progress
After you update your policy, Cloudflare updates the new setting across all of our data centers around the world. It takes about 60 seconds to update the policy when you make a change.

#### 2. DNS records are cached
If it takes longer than 60 seconds and you are still seeing that you can successfully resolve a domain then the DNS record is probably getting cached in your browser or in your operating system. DNS records for domains can be cached from anywhere between five minutes to a few hours. Here is how you can flush the DNS cache in your browser and/or your operating system:

##### Mac OSX 10.9 and Later

1. Launch the Terminal application
2. Run the following command and hit enter:
`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

##### Mac OSX 10.8 and Earlier

1. Launch Terminal (under Applications/Utilities)
2. Run the following command and hit enter:
`sudo killall -HUP mDNSResponder`

##### Windows

1. Right-click Command Prompt and select Run as Administrator.
2. Run the following command and hit enter:
`ipconfig /flushdns`

##### Linux

1. Open a terminal window.
2. Run the following command and hit enter:
`sudo service network-manager restart`

##### Safari

Use the instructions in the Mac section to flush the DNS cache for Safari. 

##### Google Chrome

1. In a new tab, type the following into the address bar and hit enter: `chrome://net-internals/#dns`
2. Click the button labeled "clear host cache"

##### Firefox

1. Type `about:config` in Firefox’s address bar and acknowledge the warning that appears
2. Find an entry called `network.dnsCacheExpiration` and set its value to `0` (If there’s no such entry, create a new integer item with the name above and a value of 0)
3. Now go back and change the value to `3600`

#### 3. Your device using another DNS resolver
If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. As a result, the domain you are trying to block is still accessible from your device. Please make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.

#### 4. The policy is not assigned to a location
If your policy is not assigned to a location and you send a DNS query from that location, Gateway will not apply that policy. Assign a policy to a location to make sure the desired policy is applied when you send a DNS query from that location.