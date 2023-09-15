---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360037684251-Cloudflare-Site-Analytics-verstehen
title: Cloudflare Site Analytics verstehen
---

# Cloudflare Site Analytics verstehen



## Überblick

Die Cloudflare-Dashboard-App (Site) **Analytics** ist ein wichtiger Bestandteil der gesamten Cloudflare-Analytics-Produktlinie. Insbesondere erhalten Sie über diese App eine Vielzahl von Metriken, die auf Website- oder Domainebene erfasst werden.

___

## Ihre Website Analytics betrachten

So können Sie sich Metriken für Ihre Website ansehen:

1.  Melden Sie sich im Cloudflare Dashboard an.
2.  Klicken Sie auf das entsprechende Cloudflare**\-Konto** für Ihre Website und wählen Sie dann die **Domain** aus.
3.  Klicken Sie anschließend auf die **Analytics**\-App.

Nach dem Laden zeigt die Analytics-App eine Reihe von Registerkarten für **Traffic**, **Sicherheit**, **Performance**, **DNS**, **Workers** und **Protokolle** an (nur Enterprise-Domains). Im Abschnitt _Ihre Website-Metriken betrachten_ weiter unten erfahren Sie, was die angezeigten Metriken bedeuten.

![Benutzeroberfläche der Analytics-App im Cloudflare-Dashboard, die Daten zum Web-Traffic anzeigt](/images/support/hc-dash-analytics-dashboard_overview.png)

Kunden mit den Tarifen Pro, Business und Enterprise sehen die neuesten Web Analytics unter der Registerkarte „Traffic“.

![Screenshot der Benutzeroberfläche im Cloudflare Analytics-Dashboard für Pro-, Business- und Enterprise-Kunden.](/images/support/hc-dash-analytics-web_traffic.png)

{{<Aside type="note">}}
Im Artikel [„Cloudflare Analytics: Ein kurzer
Überblick"](https://support.cloudflare.com/hc/articles/360037684111 "Cloudflare Analytics: Ein kurzer Überblick")
erhalten Sie allgemeine Informationen über alle Analytics-Angebote von
Cloudflare. Sie lernen auch die Eigenschaften der von Cloudflare
erfassten und verarbeiteten Daten besser kennen.
{{</Aside>}}

___

## Ihre Website-Metriken betrachten

In diesem Abschnitt beschreiben wir die in jeder Registerkarte der Analytics-App verfügbaren Metriken. Bevor Sie fortfahren, beachten Sie, dass jede Registerkarte Folgendes enthalten kann:

-   ein oder mehrere Bedienfelder zur weiteren Kategorisierung der zugrunde liegenden Metriken, sowie
-   ein Dropdown-Menü (oben rechts im Bedienfeld) zur Filterung von Metriken über einen bestimmten Zeitraum. Der Zeitraum, den Sie auswählen können, kann je nach Cloudflare-Tarif Ihrer Domain variieren.

Im Folgenden finden Sie eine Übersicht über die einzelnen Registerkarten der Analytics-App.

### Traffic

#### Free Plan

Diese Metriken umfassen sowohl legitime Nutzeranfragen als auch Crawler und Bedrohungen. Die Registerkarte „Traffic“ enthält die folgenden Bereiche:

-   **Web-Traffic**: zeigt Metriken für _Anfragen_, _Bandbreite_, _Eindeutige Besucher_ und [_Statuscodes_](https://support.cloudflare.com/hc/articles/206973867-Status-code-metrics-in-Cloudflare-Site-Analytics) an. Beachten Sie: Wenn Sie Cloudflare Workers verwenden, finden Sie die Subanfragen-Analytics unter der Registerkarte **Workers**.
-   **Web-Traffic-Anfragen nach Land**: eine interaktive Karte, die die Anfragen nach Land aufteilt.  Dieser Bereich enthält auch eine Datentabelle für **Länder/Regionen mit dem meisten Traffic**. Hier werden die Länder mit den meisten Anfragen angezeigt (bis zu fünf, falls diese Daten vorhanden sind).
-   **Ihre Statistiken teilen**: ermöglicht das Teilen aktueller Site-Statistiken in sozialen Medien (Twitter) für _Gesparte Bytes,_ _Bediente SSL-Anfragen_ und _Blockierte Angriffe_.

#### Pro, Business und Enterprise Plan

{{<Aside type="note">}}
Datenschutzgerechte Web-Traffic-Analytics sind in den Tarifen Pro,
Business und Enterprise verfügbar.
{{</Aside>}}

Die Analytics basieren auf den Edge-Protokollen von Cloudflare, sodass keine Skripte oder Tracker von Drittanbietern erforderlich sind. Die Registerkarte „Traffic“ enthält die folgenden Metriken:

-   **Besuche** – Ein Besuch ist definiert als ein Seitenaufruf, der von einer anderen Website oder einem direkten Link ausgeht. Cloudflare prüft, wo der HTTP-Referent nicht mit dem Hostnamen übereinstimmt. Ein Besuch kann aus mehreren Seitenaufrufen bestehen. 
-   **Seitenaufrufe**: Ein Seitenaufruf ist definiert als eine erfolgreiche HTTP-Antwort mit dem Inhaltstyp HTML.
-   **Anfragen**: eine HTTP-Anfrage. Ein typischer Seitenaufruf erfordert eine Vielzahl von Anfragen.
-   **Datenübertragung**: Summe der in Anfragen übertragenen HTTP-Daten.

Für detailliertere Metriken können Sie **Filter hinzufügen**. Sie können jede Metrik auch nach nach folgenden Kategorien filtern: **Referer**, **Host**, **Land**, **Pfad**, **Statuscode**, **Statuscode des Ursprungs**, **Browser**, **Betriebssystem** oder **Gerätetyp**. 

Um den Zeitraum zu ändern, verwenden Sie das Dropdown-Menü auf der rechten Seite über dem Diagramm. Sie können das Diagramm auch durch Ziehen vergrößern.

{{<Aside type="note">}}
Wenn Sie sich von den neuen Web-Traffic-Analytics abmelden möchten,
klicken Sie im linken Teil der Seite auf **Zurück zur alten Erfahrung
wechseln**.
{{</Aside>}}

### Sicherheit

Für diese Registerkarte können die Anzahl und die Art der Diagramme je nach vorhandenen Daten und Kundenplan variieren. Die meisten Metriken in dieser Registerkarte stammen von der Cloudflare-Firewall-App. Es gibt folgende Bereiche:

-   **Bedrohungen**: zeigt eine Datenzusammenfassung und ein Bereichsdiagramm mit Bedrohungen gegen die Website an.
-   **Bedrohungen nach Land**: eine interaktive Karte, in der die Länder hervorgehoben sind, aus denen die Bedrohungen stammen. Sie enthält auch Datentabellen mit Statistiken über **Länder/Regionen mit den häufigsten Bedrohungen** und **häufigste Crawler/Bots.**
-   **Durchsatzbegrenzung** (Add-on-Dienst): zeigt ein Liniendiagramm, das übereinstimmende und blockierte Anfragen basierend auf Durchsatzbegrenzungen hervorhebt. Weitere Informationen finden Sie unter [Analytics zur Durchsatzbegrenzung](https://support.cloudflare.com/hc/de/articles/115003414428-Rate-Limiting-Analytics).
-   **Übersicht**: zeigt eine Reihe von Tortendiagrammen für: **gestoppte Bedrohungen insgesamt**, **Traffic Served Over SSL** und **bekämpfte Bedrohungstypen**. Falls verfügbar, wird unter dem erweiterbaren Link **Details** eine Tabelle mit numerischen Daten ausgegeben.

### Performance

Die unter dieser Registerkarte aggregierten Metriken umfassen mehrere Cloudflare-Dienste. Es gibt folgende Bereiche:

-   **Performance am Ursprung (Argo)** (Add-on-Dienst): zeigt Metriken rund um die Antwortzeit zwischen dem Cloudflare-Edge-Netzwerk und den Ursprungsservern in den letzten 48 Stunden an. Weitere Informationen finden Sie unter [Argo-Analytics](https://support.cloudflare.com/hc/articles/115001255631-Argo-Analytics).
-   **Übersicht**: liefert eine Reihe von Tortendiagrammen für: **verwendete Client-HTTP-Version**, **gesparte Bandbreite** und **Übersicht über die Inhaltstypen**. Falls verfügbar, wird unter dem erweiterbaren Link **Details** eine Tabelle mit numerischen Daten ausgegeben.

### DNS

In der Registerkarte „DNS“ werden verschiedene Statistiken für DNS-Abfragen angezeigt. Beachten Sie, dass die Metriken verfügbar sind, solange Cloudflare der autoritative DNS-Server der Website ist – auch wenn Cloudflare nicht als Proxy für die Website dient. Daher werden für Sites mit einem [CNAME-Setup](https://support.cloudflare.com/hc/articles/360020348832-Understanding-a-CNAME-Setup) keine DNS-Metriken angeboten.

Unter der Registerkarte „DNS“ sind folgende Metrikbereiche verfügbar:

-   **DNS-Abfragen**: bietet mehrere Bereichsdiagramme und Datentabellen für DNS-Datensatzmetriken, einschließlich Abfragen nach _Antwortcode_, _Datensatztyp_ sowie Datensätze, die eine _NXDOMAIN_\-Antwort zurückgeben (DNS-Datensatz existiert nicht). Sie können nach einem oder mehreren DNS-Datensätzen filtern. Geben Sie dazu die Datensatznamen (z. B. www.example.com) in das Dropdown-Menü im oberen Bereich der Seite ein.
-   **DNS-Abfragen nach Rechenzentrum**: zeigt Ihnen, wie die DNS-Abfragen über die Rechenzentren von Cloudflare verteilt sind. Metriken werden als interaktive Karten und Datentabellen angezeigt und enthalten Statistiken für _Traffic_, _NXDOMAIN_ und _NOERROR_.

### Workers

Dieser Bereich enthält Metriken für Cloudflare Workers. Weitere Informationen finden Sie unter [Cloudflare-Analytics mit Workers](https://support.cloudflare.com/hc/articles/360007553512-Cloudflare-analytics-with-Workers).

### Protokolle

Die Registerkarte „Protokolle“ ist kein Feature der Metriken. Aber Kunden des Enterprise Plans können den Dienst [Cloudflare Logs Logpush](/logs/about/) aktivieren. Mit Logpush können Sie Daten herunterladen und mit einem Analysetool Ihrer Wahl analysieren.

___

## Verwandte Ressourcen

-   [Cloudflare Analytics: Ein kurzer Überblick](/analytics)
-   [Die GraphQL-API der Cloudflare Analytics](/analytics/)
