---
source: https://support.cloudflare.com/hc/en-us/articles/4424646531597-Using-Cloudflare-with-WP-Engine
title: Using Cloudflare with WP Engine
---

# Using Cloudflare with WP Engine



## Overview

Cloudflare partners with WP Engine to provide WP Engine customers’ websites with Cloudflare’s performance and security benefits. Cloudflare’s Enterprise plans are still available for WP Engine customers that choose to use their own Cloudflare accounts to proxy web traffic. For those customers, enabling Cloudflare with your own account in addition to WP Engine’s Cloudflare benefits is called Orange-to-Orange (O2O). O2O applies both your and WP Engine’s security settings.

Website visitor →  End customer Cloudflare (CF) Proxy → WP Engine CF Proxy → WP Engine Origin  

![In an orange to orange topology, Cloudflare Enterprise customers can apply their own account security settings to WP Engine.](/support/static/o2o.png)

### **Benefits**

O2O benefits include your own version of Cloudflare’s WAF, Bot Management, and Waiting Room.  Additionally, O2O routing also enables you to take advantage of Cloudflare zones specifically customized for WP Engine traffic.

___

## Enabling O2O for your WP Engine Website

Enabling O2O is only available on the Cloudflare Enterprise plan.

To enable O2O on your account, you need to configure a CNAME DNS record that points your Hostname to the domain xx.**wpewaf.com** (Global Edge Security) or xx.**wpenginepowered.com** (Advanced Network). Set **Proxy status** to **Proxied**.

___

## Best practices

Certain Cloudflare features, when used with O2O, can interrupt the flow of traffic to your WP Engine site or display incorrect data to your visitors. Review best practices before using the following features:

### **Caching**

Customers should disable caching for all hostnames that are routed through WP Engine’s Cloudflare zones. Traffic for other hostnames that are not CNAME’d to WP Engine’s zone can remain cached on the customer’s zone.

By default, caching of HTML pages is disabled. Customers should not enable caching of HTML because WP Engine performs its own caching outside of Cloudflare.

#### **Page Rules**

Incorrectly configured Page Rules that match the subdomain used for WP Engine may block or interfere with the flow of visitors to your website.

### **Workers**

Similar to Page Rules, Workers may interfere with the flow of traffic to your website.  Write Workers with caution. We recommend excluding the subdomain used with WP Engine from the Worker route.

### **Argo Smart Routing**

Argo Smart Routing is not compatible for customers that have O2O configured. Traffic for other hostnames that are not CNAME’d to WP Engine’s zones can receive the benefits of Argo smart routing.  If you are using Global Edge Security which runs Argo natively, Argo Smart Routing will be less effective for O2O traffic.

### **Load Balancing**

Load Balancing is not compatible with O2O for customers.

Cloudflare cannot fix any configuration issues with the above features for O2O.

___

## For additional help

If you are a WP Engine customer setting up your own Cloudflare account, contact your Cloudflare account team or Cloudflare Support for help in resolving issues. Cloudflare will refer to WP Engine if there are technical issues that Cloudflare cannot resolve.

### **Frequently asked questions**

For questions about WP Engine specific setup, please refer to [**https://wpengine.com/support/advanced-network/**](https://wpengine.com/support/advanced-network/)

### **How do I resolve SSL Errors?** 

If you see SSL errors, check to see if you have a CAA record.  If you do have a CAA record, check that it permits SSL certificates to be issued by "digicert.com" and "letsencrypt.org".  Here is a helpful [Cloudflare support article](https://support.cloudflare.com/hc/articles/115000310832-Certification-Authority-Authorization-CAA-FAQ#h_645975761191543365946939).
