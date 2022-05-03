---
pcx-content-type: how-to
title: Manage load balancers
weight: 4
---

# Manage load balancers

{{<render file="_load-balancer-definition.md">}}

For more details about load balancers, refer to [Load balancers](/load-balancing/understand-basics/load-balancers/).

## Create a load balancer

### Via the dashboard

{{<render file="_load-balancer-create.md">}}

### Via the API

{{<render file="_load-balancer-create-api.md">}}

### Sharing your load balancer with other sites

You can share your load balancer with other sites in your account by [creating a canonical name (`CNAME`) record](/dns/manage-dns-records/how-to/create-dns-records/). This is useful for sharing configurations with multiple other domains so you do not have to create new load balancers for each site.

You can also configure separate load balancers for each domain and reuse monitors and pools. This is especially useful for changing the failover order for different domains, such as when your `example.co.uk` server has a different failover priority from `example.com` or `example.com.au`.

---

## Edit a load balancer

### Via the dashboard

To edit a load balancer in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  On a specific load balancer, click **Edit**.
3.  While going through the [creation workflow](#create-a-load-balancer), update settings as needed.
4.  On the **Review** step, click **Save**.

### Via the API

To update specific settings without having to resubmit the entire configuration, use a [PATCH](https://api.cloudflare.com/#load-balancers-patch-load-balancer) request. For broader changes, use a [PUT](https://api.cloudflare.com/#load-balancers-update-load-balancer) request.

---

## Delete a load balancer

If you delete or disable a load balancer, your origin's response to requests will depend on your [existing DNS records](/load-balancing/reference/dns-records/#disabling-a-load-balancer).

### Via the dashboard

To delete a load balancer in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  On a specific load balancer, click **Delete**.

### Via the API

To delete a load balancer using the API, send a [DELETE](https://api.cloudflare.com/#load-balancers-delete-load-balancer) request.
