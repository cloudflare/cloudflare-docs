---
order: 4
---

# Locations

## What is a Location?

Locations are physical entities like offices, homes, retail stores, movie theaters or data centers. The fastest way to start sending DNS queries from a location and protect it from security threats is by changing the DNS resolvers at the router to the dedicated IPv6 addresses for those locations.

If you don’t have IPv6 network, you can set up a location by adding the source IP for the location and changing the DNS resolvers to

* **172.64.36.1**
* **172.64.36.2**

If you want to send your DNS queries over an encrypted connection, you can use the hostname that we provide in the dashboard to send queries using DNS over HTTPS.

## How does Gateway determine the location of a DNS query?

Gateway uses different ways to match a DNS query to locations depending on the type of request and network. This is how Gateway determines the location of a DNS query:

![Determine location](../../../static/documentation/policies/gateway-determine-location-dns.png)

Here is a step by step flow of how Gateway determines the location for an incoming DNS query:

### Step 1: Encrypted queries check and lookup based on hostname
Check if the DNS query is using DNS over HTTPS or DNS over TLS. If yes, lookup location by the unique hostname. If not, go to step 2.

### Step 2: IPv4 check and lookup based on source IPv4 address
Check if the DNS query is sent over IPv4. If yes, lookup location by the source IPv4 address. If no, go to step 3.

### Step 3: Lookup based on IPv6
If the query is in this step, it means that the DNS query is using IPv6. Gateway will lookup the location associated with the DNS query based on the destination IPv6 address.

## IPv4
Gateway uses the public source IPv4 address of your network to identify your location, apply policies and log the DNS requests. When you go through onboarding, or in our location tab, the dashboard automatically identifies the public source IP address.

If you are using Cloudflare Gateway as part of a Teams Gateway Enterprise or Teams Enterprise subscription, you can manually enter the IP address and netmask of your location. The IP address for the location from which you are interfacing with the Teams dashboard will populate the IP address field. Use this as a quick reference for the location or type in the public IP address and CIDR notation for the new location.

On your router or if you are using a device or a daemon, forward DNS queries to the following IP addresses:

* **172.64.36.1**
* **172.64.36.2**

## IPv6
When you create a location, your location will receive a unique IPv6 address. Cloudflare Gateway will identify your location based on this unique IPv6 address.

On your router/device/forwarder/daemon forward DNS queries to the corresponding IPv6 address for the location.

## Configure a location

1. On the Teams dashboard, navigate to the **Locations** tab.  
You will see the location you set up during your Gateway onboarding listed there.

![Gateway Begin Setup](../../../static/documentation/policies/dash-additional-location.png)

2. Click on **Add a location**.

3. Add a **location name** and IP address.  

![Gateway Begin Setup](../../../static/documentation/policies/add-location-name.png)

If the location you are sending requests from is only using IPv6 or sending all DNS requests using DNS over HTTPS, click **Delete** on the right side of the IP address field, as the field is not required.

4. Click on **Add location**.

5. Your location will now appear in the **Locations** tab, along with the others you have setup.

![Gateway Begin Setup](../../../static/documentation/policies/two-locations.png)

## Find a location's DoH subdomain
DoH subdomains (previously known as a unique ids) are aligned to locations. Locations and corresponding DoH subdomains have policies associated with them.

1. Visit your Teams dashboard to fetch the **DoH subdomain** from your location.
Navigate to the **Locations** page to visualize your location.

2. If you have more than one location set up, you will see a list of all your locations.

3. Expand the location card for the location which you'd like to retrieve the corresponding DoH subdomain.

4. Get the subdomain of the DNS over HTTPS hostname (previously known as a unique ID). In the example below, the ID is: `9y65g5srsm`.

5. Take note of the **DoH subdomain**.

![Get unique subdomain](../../../static/documentation/faq/locations-doh.png)