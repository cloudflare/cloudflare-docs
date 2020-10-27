---
order: 40
---

# Multiple hostnames

Argo Tunnel has a 1-1 relationship of tunnel to hostname. Tunnels can only accept traffic for one hostname for each instance of Tunnel. Typically if you want to run Tunnel for multiple hostnames, such as foo.example.com and bar.example.com, you need to run multiple Tunnel clients side by side.

There is one way to workaround this and run one Tunnel instance that can accept traffic across multiple hostnames, if the hostnames are on the same domain and same Level. (aka foo.example.com can be CNAME'd to bar.example.com, but not foo.com or foo.bar.example.com)

To begin, start Tunnel on one hostname. Next, navigate to the  DNS tab in the Cloudflare dashboard. Create CNAME records from the other hostnames you'd like to be passed back to Tunnel that point to the Tunnel with the original hostname.

For example, if you would like to run Tunnel on foo.example.com as well as bar.example.com but don't want to run multiple instances of Tunnel, you can do:

1. Install Tunnel and run it on foo.example.com.
2. Open up the DNS editor in the Cloudflare dashboard.
3. Add a CNAME record for bar.example.com so that it points to foo.example.com. (Name would be foo and value would be bar.example.com)
4. Done. You can continue to point CNAME records to foo.example.com and as Cloudflare receives those requests, it will send the packets back to your origin server running Tunnel.
