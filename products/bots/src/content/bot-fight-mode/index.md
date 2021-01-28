---
title: Bot Fight Mode
order: 200
---

# Getting started with Bot Fight Mode

Bot Fight Mode is a simple, free product that helps detect and mitigate bot traffic on your site. When enabled, the product:

- Identifies traffic matching patterns of known bots
- Issues computationally expensive challenges in response to these bots
- Notifies [Bandwidth Alliance](https://support.cloudflare.com/hc/articles/360016143912) partners (if applicable) to disable bots

Bot Fight Mode is available to all Cloudflare customers, and you can enable Bot Fight Mode from **Firewall** > **Tools**.

To prevent configuration overlap, customers who purchased Bot Management will not see Bot Fight Mode. 

## Considerations

Bot Fight Mode uses the same underlying technology that powers our [Bot Management](https://www.cloudflare.com/products/bot-management/) product.  Specifically, Bot Fight Mode:

- Protects entire sites without endpoint restrictions
- Cannot be customized, adjusted, or reconfigured via Firewall Rules
- Does not include access to advanced metrics, bot scores, or our Bot Analytics tool

Although Bot Fight Mode is designed to fight malicious actors on the Internet, it may challenge API or mobile app traffic. For more granular control, we recommend customers upgrade to Bot Management.

## Analytics

For avid users of Firewall Events, we encourage you to monitor the performance of Bot Fight Mode. Any requests challenged by this product will be labeled **Bot Fight Mode** in the **Service** field. This allows you to observe, analyze, and follow trends in your bot traffic over time.