---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/203464660-Cloudflare-mit-Shopify-verwenden
title: Cloudflare mit Shopify verwenden 
---

# Cloudflare mit Shopify verwenden 



## Überblick


![Diagramm, das zeigt, wie O2O für Shopify-Händler auf Cloudflare funktioniert.](/support/static/hc-ext-shopify_o2o.png)

___

## O2O für Ihre Shopify-Website aktivieren

Die Aktivierung von O2O ist nur beim Cloudflare Enterprise Plan verfügbar.

Um O2O in Ihrem Konto zu aktivieren, benötigen Sie entweder einen A- oder CNAME-DNS-Eintrag, der die Domain Ihres Shops auf die Domain shops.myshopify.com verweist. Setzen den Eintrag auf die orange Wolke.

Nachdem Sie den DNS-Eintrag mit aktiviertem Proxy hinzugefügt haben, kontaktieren Sie Ihr Kontoteam, um O2O auf Ihrer Shop-Domain aktivieren zu lassen.

___

## Best Practices

Bei der Verwendung mit O2O können bestimmte Cloudflare-Funktionen den Traffic-Fluss zu Ihrem Shopify-Shop unterbrechen oder Ihren Besuchern falsche Daten anzeigen, was bedeutet, dass Sie dies tun sollten:

-   Verwenden Sie die folgenden Cloudflare-Funktionen nicht:
    -   [HTML-Caching](https://developers.cloudflare.com/cache/)
    -   [Benutzerdefinierte Firewall-Regeln](https://developers.cloudflare.com/firewall/)
    -   [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [Lastverteilung](https://developers.cloudflare.com/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
    -   [Page Rules](https://support.cloudflare.com/hc/articles/218411427): Falsch konfigurierte Page Rules, die mit der für Shopify verwendeten Subdomain übereinstimmen, können den Fluss der E-Commerce-Besucher auf Ihrer Website blockieren oder verzerren.
    -   [DNS-CAA-Einträge](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/caa-records): Shopify stellt SSL/TLS-Zertifikate für Händlerdomains mit Let's Encrypt aus. Wenn Sie DNS-CAA-Einträge hinzufügen, müssen Sie Let's Encrypt als Zertifizierungsstelle (CA) auswählen, da HTTPS-Verbindungen sonst fehlschlagen können.

___

## Weitere Hilfe

Wenn Sie als Shopify-Händler Ihr eigenes Cloudflare-Konto einrichten, wenden Sie sich für Hilfe bei der Lösung von Problemen an Ihr Kontoteam oder den Cloudflare-Support. Wenn Cloudflare ein technisches Problem nicht lösen kann, wird es sich an Shopify wenden.

-   [Kontaktaufnahme mit dem Cloudflare-Support](https://support.cloudflare.com/hc/de/articles/200172476-Contacting-Cloudflare-Support)
