---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115005254367-Abrechnung-f%C3%BCr-Lastverteilung
title: Abrechnung für Lastverteilung 
---

# Abrechnung für Lastverteilung 



## Preise für Cloudflare-Lastverteilung

Die Abonnements für Cloudflare-Lastverteilung sind ab 5–50 USD pro Monat erhältlich, je nach den ausgewählten Abonnementoptionen.

Sie können die Lastverteilung entsprechend Ihren spezifischen Anforderungen konfigurieren, basierend auf der Anzahl der Ursprungsserver, der Häufigkeit der Statusprüfung, der Anzahl der überprüften Regionen und dem Geo-Routing.

Mit dem 5-Dollar-Abonnement können Sie 2 Ursprungsserver-, 60-Sekunden-Statusprüfung und Prüfungen von einer (1) Region konfigurieren. Das ist ideal für unkomplizierte Lastverteilung oder Failover.

___

## Abrechnung der Cloudflare-Lastverteilung

Wenn aktiviert, wird die Cloudflare-Lastverteilung auf Kontoebene abgerechnet. Zusätzlich zum monatlichen Abonnement zählen wir die Anzahl der DNS-Anfragen („Abfragen“) für jeden konfigurierten Load Balancer pro Monat. Die ersten 500.000 Abfragen für alle Load Balancer in Ihrem Konto zusammen sind kostenfrei. Eine darüber hinausgehende Nutzung wird mit 0,50 USD pro angefangene 500.000 Abfragen berechnet.

Zum Beispiel:

-   81.451 DNS-Abfragen = Abonnement + 0 US-Dollar für die Nutzung.
-   511.881 DNS-Abfragen = Abonnement + 0,50 US-Dollar für die Nutzung.
-   2.994.155 DNS-Abfragen = Abonnement + 2,50 US-Dollar für die Nutzung.

Beachten Sie, dass die ersten 500.000 Abfragen auf allen aktiven Load Balancern in Ihrem Konto und nicht pro Website (Domain) basieren, da Load Balancer durch die Konfiguration eines CNAME-Eintrags über Websites hinweg gemeinsam genutzt werden können.

___

## Kostenpflichtige Nutzung der Lastverteilung

Die Nutzung wird als Abfrage von autoritativem [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) gegenüber den Nameservern von Cloudflare für jeden von Ihnen konfigurierten Load-Balanced-Hostnamen gezählt.

Sie können die Anzahl der Abfragen von autoritativem DNS reduzieren, indem Sie Load Balancer für Ihre HTTP(S)-Dienste als „mit Proxy“ (orangefarbene Wolke) konfigurieren. Dadurch wird die externe DNS-TTL auf 5 Minuten festgelegt. Die Failover-Leistung bleibt wie bei sehr kurzen DNS-TTLs erhalten. [Erfahren Sie mehr über die Vorteile von „mit Proxy“ (orangefarbene Wolke) gegenüber „ohne Proxy“ (graue Wolke).](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Abrechnung bei Enterprise-Kunden

Enterprise-Kunden werden die Dienste auf der Basis von Gesprächen mit dem Cloudflare Enterprise Sales-Team in Rechnung gestellt. Enterprise-Kunden haben auch Zugriff auf zusätzliche Features wie:

-   Ausführen von Statusprüfungen von [jedem Cloudflare-Datencenter](https://www.cloudflare.com/network/) aus (zur Erhöhung der Failover-Granularität)
-   Steuerung pro Rechenzentrum (Überschreiben der Ursprungsserver, die ein bestimmter Standort verwenden soll, und in welcher Reihenfolge)
-   5-Sekunden-Statusprüfungsintervall
-   Unterstützung für mehr als 20 Ursprungsserver
-   Cloudflare Enterprise Support (einschließlich E-Mail, Telefon und benannter Solutions Engineer rund um die Uhr)
