---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200172906-Wie-kann-ich-mich-auf-einen-erwarteten-Anstieg-im-Datenverkehr-vorbereiten-
title: Wie kann ich mich auf einen erwarteten Anstieg im Datenverkehr vorbereiten 
---

# Wie kann ich mich auf einen erwarteten Anstieg im Datenverkehr vorbereiten? 

## Wie kann ich mich auf einen erwarteten Anstieg im Datenverkehr vorbereiten?

**Stellen Sie wie folgt sicher, dass Ihre Website auch Datenverkehrsspitzen toleriert:**

**Gehen Sie über Standard-Caching-Verfahren hinaus und optimieren Sie Ihre Website-Geschwindigkeit**

Standardmäßig speichert Cloudflare[statische Inhalte](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-) wie Bilder, CSS und JavaScript im Cache. Sie können unser Caching jedoch erweitern und auch HTML einschließen. Erstellen Sie hierzu Ihre eigenen[Seitenregeln](http://blog.cloudflare.com/introducing-pagerules-fine-grained-feature-co/).

![Screen_Shot_2017-03-09_at_16.54.36.png](/images/support/Screen_Shot_2017-03-09_at_16.54.36.png)

Im Abschnitt "Page Rules" (Seitenregeln) Ihres Kontos können Sie für Ihre gesamte Website oder nur einen Ausschnitt daraus ein Muster einrichten und danach die Option "Cache Everything" (Alles zwischenspeichern) aktivieren. Mit einer Seitenregel und der Option "Cache Everything" stellen Sie   sicher, dass Cloudflare HTML vollständig in unserem Edge-Netzwerk zwischenspeichert. Roundtrips zu Ihrem Ursprungs-Webserver sind dann nicht mehr nötig.

Eine solche benutzerdefinierte Seitenregel ist beispielsweise die ideale Lösung, wenn Sie während der Urlaubssaison eine Kampagne ausführen. Wenn die Option "Cache Everything" aktiviert ist, bedient Cloudflare Ihre gesamte Website und entlastet Ihren Server dadurch vollständig. Schneller kann Ihre Website nicht werden.

Business-Kunden können mit diesen erweiterten Caching-Methoden auch statische Inhalte dynamischer HTML-Websites zwischenspeichern, um die Last ihrer Server zu verringern. Sie verwenden hierzu die Seitenregel "Bypass Cache on Cookie" (Cache bei Vorhandensein eines Cookies umgehen).

Bevor ein Besucher einen Artikel in den Warenkorb legt, sich anmeldet oder einen Kommentar hinzufügt, wird dessen Zugriff als anonymer Seitenaufruf betrachtet. Wenn Sie diese Art von Seitenaufrufen im Cache speichern, entlasten Sie Ihren Server erheblich und zwar auch dann, wenn Ihre Website dynamisch ist. Nähere Informationen hierzu erhalten Sie im folgenden Blog-Beitrag, der eine gute Übersicht bietet:  [Caching anonymer Seitenaufrufe](https://blog.cloudflare.com/caching-anonymous-page-views/).  

Zu diesem Thema gibt es auch verschiedene Tutorials, die Sie schrittweise zum Ziel führen:

-   [Caching anonymer Seitenaufrufe mit WordPress oder WooCommerce](https://support.cloudflare.com/hc/en-us/articles/236166048)
-   [Caching anonymer Seitenaufrufe mit Magento 1 und Magento 2](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [Wie speichere ich statisches HTML im Cache?](https://support.cloudflare.com/hc/en-us/articles/200172256-How-do-I-cache-static-HTML-)

In Seitenregeln können Sie auch den Ablauf der Edge-Cache-TTL festlegen. Damit legen Sie fest, wie lange Cloudflare Ressourcen im Edge-Cache aufbewahrt.

****Fragen Sie Ihren Hosting-Provider nach den Grenzen Ihres Hosting-Plans****

Auch wenn Cloudflare den größten Teil der Last Ihrer Website durch Caching und Filterung der Anforderungen verlagert, wird ein Teil des Datenverkehrs nach wie vor über Ihren Host übertragen. Nur wenn Sie die Grenzen Ihres Hosting-Plans kennen, können Sie Engpässe, die aus diesem Plan entstehen, verhindern.

Wenn Ihnen die Grenzen Ihres Plans bewusst sind, können Sie eine Funktion wie die  [Ratenbegrenzung](https://www.cloudflare.com/rate-limiting/)  verwenden, um die Anzahl der Anforderungen eines jeden Benutzers an Ihre Website einzuschränken.

**Nutzen Sie die Cloudflare IP-Adressen zu Ihrem Vorteil**

Verhindern Sie Angriffe auf Ihre Website während Spitzenzeiten proaktiv, indem Sie Ihre Firewall so konfigurieren, dass sie beispielsweise während der Urlaubssaison nur Datenverkehr von Cloudflare IP-Adressen akzeptiert. Indem Sie nur  [Cloudflare IPs](https://www.cloudflare.com/ips)akzeptieren, verhindern Sie, dass potenzielle Angreifer Zugriff auf Ihre eigentliche IP-Adresse erhalten und Ihre Website mit diesem Wissen ausschalten.

Die Nutzer der [Apache-Erweiterung Mod\_cloudflare](https://www.cloudflare.com/technical-resources/#mod_cloudflare)können dies durch einfaches Hinzufügen von_DenyAllButCloudFlare_ zu ihrer Apache-Konfiguration erreichen.

**Nehmen Sie Cloudflare IPs in Ihre Whitelist auf**

Cloudflare fungiert für Ihre Website als Reverse-Proxy. Alle Verbindungen gehen also von Cloudflare-IP-Adressen aus. Eine Einschränkung der Cloudflare-IPs kann daher zu Problemen beim Benutzerzugriff auf Ihre Website führen. Die Liste der Cloudflare-IPs finden Sie hier:  [https://www.cloudflare.com/ips](https://www.cloudflare.com/ips)
