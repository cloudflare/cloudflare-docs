---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/229666767-Cloudflares-IPv6-Support-verstehen-und-konfigurieren
title: Cloudflares IPv6-Support verstehen und konfigurieren 
---

# Cloudflares IPv6-Support verstehen und konfigurieren 



## IPv6-Support – Übersicht

Cloudflare bietet kostenlosen IPv6-Support für alle Domains, ohne dass zusätzliche Konfiguration oder Hardware erforderlich ist.

Wenn Ihr Ursprungswebserver nicht mit IPv6 kompatibel ist, ermöglicht Cloudflare das _Ausschalten_ der **IPv6 Compatibility**.

Wenn sich Clients über IPv6 mit Ihrer über den Cloudflare-Proxy geleiteten Domain verbinden, Ihr Ursprungswebserver jedoch ältere Software verwendet, die nur IPv4-formatierte IP-Adressen versteht, können Sie alternativ das unten erwähnte Cloudflare **Pseudo IPv4-Feature** verwenden.

___

## IPv6 Compatibility konfigurieren

Wenn Ihr Hosting-Provider IPv6 für Ihren Ursprungswebserver unterstützt, ermöglicht Ihnen die IPv6 Compatibility von Cloudflare beim Proxying von _AAAA_\-DNS-Einträgen das Routen von IPv6-Verbindungen durch das globale Netzwerk von Cloudflare.

Domains in Enterprise Plans können die IPv6 Compatibility im Cloudflare-Dashboard ein- und ausschalten:

1.  Melden Sie sich in Ihrem Cloudflare Konto an.
2.  Wählen Sie die entsprechende Domain.
3.  Klicken Sie auf die **Netzwerk**\-App.
4.  Schalten Sie die **IPv6 Compatibility** _Aus_ oder _Ein_.

{{<Aside type="tip">}}
Kunden mit Domains in den Free, Pro und Business Plans müssen die **IPv6
Compatibility** über die
[Cloudflare-API](/api/operations/zone-settings-change-i-pv6-setting)
aktualisieren.
{{</Aside>}}

Beachten Sie, dass Domains selbst bei deaktiviertem IPv6 IPv6-Traffic über das Tor-Netzwerk empfangen. Den gesamten IPv6-Traffic vollständig deaktivieren können Sie folgendermaßen:

-   Deaktivieren Sie **Onion Routing** über die Registerkarte **Edge-Zertifikate** in der Cloudflare **SSL/TLS**\-App. Lesen Sie [Cloudflare Tor-Support und Onion Routing verstehen](https://support.cloudflare.com/hc/articles/203306930).
-   Verwenden Sie eine Firewall-Regel, um _0:0:0:0:0:0:0:0/0_ mithilfe des Filters `ip.src in {::/0}` zu blockieren. Erfahren Sie, wie sie [in Cloudflare Firewall-Regeln erstellen](/firewall/cf-dashboard/create-edit-delete-rules/).

___

## Pseudo IPv4 aktivieren

Einige ältere Softwareprogramme zur Ursprungsserveranalyse und Betrugserkennung erwarten IP-Adressen in einem IPv4-Format und unterstützen keine IPv6-Adressen.

Um die Migration zu IPv6 zu unterstützen, bietet Cloudflares **Pseudo IPv4** einen IPv6-zu-IPv4-Übersetzungsdienst für alle Cloudflare-Domains.

**Pseudo IPv4** verwendet den [IPv4-Adressraum der Klasse E](https://tools.ietf.org/html/rfc1112#section-4), um möglichst viele eindeutige IPv4-Adressen bereitzustellen, die IPv6-Adressen entsprechen.

-   Beispiel IPv4-Adresse der Klasse E: `240.16.0.1`
-   Beispiel IPv6-Adresse: `2400:cb00:f00d:dead:beef:1111:2222:3333`

{{<Aside type="note">}}
IPv4-Adressen der Klasse E werden als experimentell bezeichnet und nicht
für den produktiven Internet-Traffic verwendet.
{{</Aside>}}

Die drei verfügbaren Optionen zum Konfigurieren von **Pseudo IPv4** sind:

-   _Aus_ Dies ist der Standardwert.
-   _Header hinzufügen_ Cloudflare fügt automatisch den `Cf-Pseudo-IPv4`\-Header mit einer IPv4-Adresse der Klasse E hinzu, die von der ursprünglichen IPv6-Adresse gehasht wurde.
-   _Header überschreiben_ Cloudflare überschreibt die vorhandenen `Cf-Connecting-IP`**\-** und `X-Forwarded-For`**\-**Header mit einer Pseudo IPv4**\-**Adresse, während die reale IPv6-Adresse in einem `Cf-Connecting-IPv6`**\-**Header beibehalten wird.

{{<Aside type="note">}}
Bei der Verwendung von *Header überschreiben* sind keine
Softwareänderungen auf Ihrem Ursprungswebserver erforderlich.
{{</Aside>}}

___

## IPv6-Netzwerkprobleme beheben

Stellen Sie dem [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476) die folgenden Informationen zur Verfügung, wenn es zu Problemen mit der IPv6-Konnektivität kommt:

-   Ein [Traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87), das die IPv6-Verbindungsprobleme demonstriert,
-   das [Cloudflare-Rechenzentrum, das Ihre Anfrage abwickelt](https://support.cloudflare.com/hc/articles/203118044#h_22b01241-01a5-4bed-a897-6e97cff5c288), wenn IPv6-Probleme auftreten, und
-   die Bestätigung, ob das Problem durch Deaktivieren der [IPv6 Compatibility](https://support.cloudflare.com/hc/articles/229666767#h_2fa0b554-3fd2-44a3-9a77-ee116c31b8c3) behoben wurde.

___

## Verwandte Ressourcen

-   [Sammeln von Informationen zur Fehlerbehebung bei Website-Problemen](https://support.cloudflare.com/hc/articles/203118044)
-   [Kontaktaufnahme mit dem Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476)
