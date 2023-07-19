---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360038696631-Cloudflare-Network-Analytics-v1-verstehen
title: Cloudflare Network Analytics v1 verstehen 
---

# Cloudflare Network Analytics v1 verstehen 



## Überblick

Um die Network-Analytics-Ansicht aufzurufen, brauchen Sie:

-   einen Cloudflare Enterprise Plan
-   Cloudflare [Magic Transit](/magic-transit/) oder [Spectrum](/spectrum/).

Die Cloudflare-Ansicht **Network Analytics** bietet nahezu in Echtzeit Einblick in Traffic-Muster der Netzwerk- und Transport-Ebene sowie DDoS-Angriffe. Mit Network Analytics werden Daten auf Paket- und Bitebene visualisiert – dieselben Daten, die über die [GraphQL Analytics API](/analytics/graphql-api/) verfügbar sind.

{{<Aside type="note">}}
-   Hinweise zum neuen Network Analytics v2 (NAv2) Dashboard, das in der
    Beta-Version verfügbar ist, finden Sie unter [Cloudflare Network
    Analytics](/analytics/network-analytics/)
    in der Entwicklerdokumentation.
-   Es gibt auch eine neue Version der Network Analytics GraphQL API.
    Wenn Sie noch NAv1 verwenden, sollten Sie von NAv1 auf NAv2
    migrieren. Befolgen Sie dazu die
    [Migrationsanleitung](/analytics/graphql-api/migration-guides/network-analytics-v2/).
{{</Aside>}}

![Analytics-Bereich mit Zusammenfassung der Pakete pro Typ](/images/support/na-main-dashboard.png)

Mit Network Analytics wird böswilliger Traffic schneller gemeldet und untersucht. Sie können Daten nach diesen Parametern filtern:

-   von Cloudflare ergriffene Abwehrmaßnahmen
-   Quell-IP, Port, ASN
-   Ziel-IP und Port
-   Stadt und Land des Cloudflare-Rechenzentrums, in dem der Traffic beobachtet wurde
-   Größe, Typ, Rate und Dauer des Angriffs
-   TCP-Flag 
-   IP-Version
-   Protokoll

Mit Network Analytics können Sie schnell wichtige Informationen identifizieren:

-   Top-Angriffsvektoren, die auf das Netzwerk abzielen 
-   Traffic-Abwehr im Zeitverlauf, aufgeschlüsselt nach Maßnahmen 
-   Angriffsquelle, nach Land oder Rechenzentrum

___

## Network Analytics betrachten

Sie können die **Network Analytics** über die Startseite Ihres Cloudflare-Kontos aufrufen.

So rufen Sie die Ansicht **Network Analytics** auf:

1.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
2.  Wenn Sie mehrere Konten haben, wählen Sie ein Konto, das Zugriff auf Magic Transit oder Spectrum hat.
3.  Klicken Sie auf der **Startseite** des Kontos auf **Network Analytics**.

{{<Aside type="note">}}
Quell-IPs werden 30 Tage lang gespeichert. Berichtzeiträume, die älter
als 30 Tage sind, enthalten keine Quell-IP-Daten.
{{</Aside>}}

___

## In Network Analytics navigieren

### Zusammenfassung in der Kopfzeile und Seitenbereiche

Die Kopfzeile und die Seitenbereiche zeigen eine Zusammenfassung der Aktivität über den Zeitrahmen, der in der Dropdown-Liste **Zeitrahmen** ausgewählt wurde.

![Überschrift und Seitenleiste mit einer Zusammenfassung der Aktivitäten der letzten 24 Stunden](/images/support/na-navigate.png)

In der Kopfzeile werden die gesamten Pakete oder Bits und die Anzahl der erkannten und bekämpften Angriffe angezeigt. Wenn ein Angriff gerade stattfindet, steht in der Kopfzeile die maximale Rate von Paketen (oder Bits) und nicht die Gesamtanzahl.

Um die Ansicht der Daten umzuschalten, klicken Sie auf die Seitenbereiche **Pakete** oder **Bits** .

### Zeitrahmen für die Ansicht festlegen

In der Dropdown-Liste **Zeitrahmen** können Sie den Zeitbereich der über die Network Analytics angezeigten Daten ändern. Wenn Sie einen Zeitrahmen auswählen, wird die gesamte Ansicht aktualisiert und spiegelt nun Ihre Auswahl wider.

Wenn Sie _Letzte 30 Minuten_ auswählen, zeigt die Ansicht **Network Analytics** die Daten der letzten 30 Minuten an. Die Daten werden alle 20 Sekunden aktualisiert. Eine _Live_\-Benachrichtigung erscheint neben der Dropdown-Liste für die Statistik. Sie zeigt an, dass die Ansicht automatisch aktualisiert wird:

![Automatisches Aktualisieren in Network Analytics aktiviert](/images/support/hc-dash-Network_Analytics-auto_refresh.png)

Mit der Option _Benutzerdefinierter Bereich_ können Sie einen Zeitbereich von bis zu 30 Tagen über einen beliebigen Zeitraum der letzten 365 Tage angeben.

### Ansicht nach Durchschnittsrate oder Gesamtvolumen  

Wählen Sie eine Statistik aus der Dropdown-Liste aus, um zwischen _Durchschnittliche Rate_ und _Gesamtanzahl_ zu wechseln. 

### IP-Präfix-Ankündigungs-/Widerrufsereignisse anzeigen

Mit dem Umschaltfeld **Anmerkungen anzeigen** können Sie Anmerkungen für angekündigte/widerrufene IP-Präfix-Ereignisse in der Ansicht **Network Analytics** anzeigen oder ausblenden. Klicken Sie für weitere Details auf die jeweilige Anmerkung.

![Umschalttaste für die Anzeige von Anmerkungen im Diagramm der Network Analytics](/images/support/hc-dash-Network_Analytics-show_annotations.png)

### Zoomen in die Paket-Zusammenfassung 

Durch Klicken und Ziehen eines Diagrammbereichs können Sie ihn vergrößern. Auf diese Weise können Sie auf einen Zeitbereich von bis zu 3 Minuten heranzoomen.

![Zoomen in die Paket-Zusammenfassung ](/images/support/unnamed.gif)

Zum Herauszoomen klicken Sie im Auswahlfeld für den **Zeitbereich** auf das Symbol **X**.

___

## Filter auf Daten anwenden

Sie können den Umfang der in Network Analytics angezeigten Daten über mehrere Filter und Ausschlüsse anpassen.

Filter wirken sich auf alle Daten aus, die auf der Seite Netzwerk Analytics angezeigt werden.

Es gibt zwei Möglichkeiten, Network-Analytics-Daten zu filtern – verwenden Sie die Schaltfläche **Filter hinzufügen** oder klicken Sie auf einen der **Statistik-Filter**.

### Mit der Schaltfläche „Filter hinzufügen“

Klicken Sie auf die Schaltfläche **Filter hinzufügen**, um das Popover **Neuer Filter** zu öffnen. Geben Sie einen vollständigen Filterausdruck mit Feld, Operator und Wert an. Klicken Sie auf **Übernehmen**, damit die Ansicht aktualisiert wird.

Beachten Sie bei der Anwendung von Filtern die folgenden Hinweise:

-   Platzhalter werden nicht unterstützt.
-   Sie müssen die Werte nicht in Anführungszeichen setzen.
-   Wenn Sie eine ASN-Nummer angeben, lassen Sie das Präfix _AS_ weg. Geben Sie z. B. _1423_ anstelle von _AS1423_ ein.

### Einen Statistikfilter verwenden

Um auf der Grundlage des Datentyps zu filtern, der mit einer der Network Analytics-Statistiken verbunden ist, verwenden Sie die Schaltflächen **Filter** und **Ausschließen** (diese werden angezeigt, wenn Sie den Mauszeiger über die Statistik halten). 

In diesem Beispiel wird durch Klicken auf die Schaltfläche **Filter** der Bereich der Ansicht auf den Traffic eingegrenzt, der mit der Aktion _Genehmigen_ (Allow) verbunden ist.

### Eine Magic Firewall-Regel aus den angewendeten Filtern erstellen

{{<Aside type="note">}}
Dieses Feature ist nur für Magic Transit-Nutzer verfügbar.
{{</Aside>}}

Sie können eine [Magic Firewall](/magic-firewall)\-Regel erstellen, die den gesamten Traffic blockiert, der mit den ausgewählten Filtern in Network Analytics übereinstimmt. Die derzeit unterstützten Filter sind:

-   Ziel-IP
-   Protokoll
-   Quell-Rechenzentrum
-   Quell-IP
-   TCP-Flag

Andere Arten von Network Analytics-Filtern werden der neuen Regeldefinition nicht hinzugefügt. Sie können die Regel jedoch in der Magic Firewall weiter konfigurieren.

Gehen Sie wie folgt vor:

1\. Wenden Sie einen oder mehrere Filter in den Network Analytics an.

2\. Klicken Sie auf **Magic Firewall-Regel erstellen**. 

![Einen Firewall-Regel-Link in Network Analytics erstellen](/images/support/hc-dash-Network_Analytics-create_firewall_rule.png)

Der Editor für Magic Firewall-Regeln wird mit den ausgewählten Filtern und Werten angezeigt.

3\. Überprüfen Sie die Regeldefinition im Editor für Magic Firewall-Regeln.

4\. Klicken Sie auf **Neu hinzufügen**.

### Unterstützte Filterfelder, Operatoren und Werte 

In der folgenden Tabelle finden Sie den Umfang von Feldern, Operatoren und Werten, die Sie zum Filtern von Network Analytics verwenden können.

| Feld | Operator | Wert |
| --- | --- | --- |
| 
Aktion

 | 

Gleich

Ungleich

 | 

\- Zulassen: Traffic, der durch die automatisierten DDoS-Schutzsysteme von Cloudflare zugelassen ist. Kann auch Traffic enthalten, der durch Firewall-Regeln, Flowtrackd- und L7-Regeln bekämpft wird.

\- Blockieren: Traffic, der durch die automatisierten DDoS-Schutzsysteme von Cloudflare blockiert wird.

\- Verbindungs-Tracking: Gilt nur für L7, da Magic Transit vom Umfang ausgeschlossen ist und kein Conntrack jemals für Magic-Transit-Präfixe läuft.

\- Ratenbegrenzung: Kann pro Quell-IP, Subnetz oder beliebiger Verbindung angewendet werden. Die Entscheidung wird programmgesteuert auf heuristischer Grundlage getroffen.

\- Überwachen: Angriffe, die identifiziert wurden, aber entschieden wurde, sie nur zu beobachten und nicht mit einer Regel zu bekämpfen.

 |
| 

Angriffs-ID

 | 

Gleich

Ungleich

 | 

Nummer des Angriffs

 |
| 

Angriffsart

 | 

Gleich

Ungleich

 | 

UDP-Flood

SYN-Flood

ACK-Flood

RST Flood

LDAP Flood

Christmas Flood

FIN Flood

GRE Flood

ICMP Flood

 |
| 

Ziel-IP

 | 

Gleich

Ungleich

 | 

IP-Adresse

 |
| 

Ziel-Port

 | 

Gleich

Ungleich

Größer als

Größer oder gleich

Kleiner als

Kleiner oder gleich

 | 

Port-Nummer

Port-Bereich

 |
| 

IP-Bereich des Ziels

 | 

Gleich

Ungleich

 | 

IP-Bereich und Maske

 |
| 

IP-Version

 | 

Gleich

Ungleich

 | 

4 oder 6

 |
| 

Protokoll

 | 

Gleich

Ungleich

 | 

TCP

UDP

ICMP

GRE

 |
| 

Ursprungs-ASN,

 | 

Gleich

Ungleich

 | 

AS-nummer

 |
| 

Land der Quelle

 | 

Gleich

Ungleich

 | 

Name des Landes

 |
| 

Quell-Rechenzentrum

 | 

Gleich

Ungleich

 | 

Standort des Rechenzentrums

 |
| 

Quell-IP

 | 

Gleich

Ungleich

 | 

IP-Adresse

 |
| 

Quell-Port

 | 

Gleich

Ungleich

Größer als

Größer oder gleich

Kleiner als

Kleiner oder gleich

 | 

Port-Nummer

Port-Bereich

 |
| 

TCP-Flag

 | 

Gleich

Ungleich

Enthält

 | 

SYN, SYN-ACK, FIN, ACK, RST

 |

___

## Dimension zum Plotten auswählen

Sie können Network-Analytics-Daten entlang einer Vielzahl von Dimensionen darstellen. Standardmäßig werden in Network-Analytics Daten nach Aktion aufgeschlüsselt angezeigt.

Wählen Sie eine der **Zusammenfassungs**\-Registerkarten, wenn die Daten in einer anderen Dimension angezeigt werden sollen.

![Visualisierung von Daten über mehrere Dimensionen hinweg](/images/support/unnamed__1_.gif)

Sie können aus folgenden Optionen wählen:

-   Aktion
-   Angriffsart
-   Ziel-IP
-   Ziel-Port
-   IP-Version
-   Protokoll
-   Ursprungs-ASN,
-   Land der Quelle
-   Quell-Rechenzentrum
-   Quell-IP
-   Quell-Port
-   TCP-Flag

{{<Aside type="note">}}
Die Daten für Quell-ASN, Quell-IP, Quell-Port und TCP-Flag sind nur für
die letzten 24 Stunden verfügbar.
{{</Aside>}}

### Netzwerkanalyse-Filter teilen 

Wenn Sie auf der Network-Analytics-Seite Filter hinzufügen und einen Zeitbereich angeben, ändert sich die URL, um diese Parameter widerzuspiegeln.

Um Ihre Ansicht der Daten freizugeben, kopieren Sie die URL und senden Sie sie an andere Nutzer, damit diese mit der gleichen Ansicht arbeiten können.

![Auswählen der URL der Network Analytics-Seite](/images/support/hc-dashboard-network-analytics-6.png)

___

## Aktivitätsprotokoll betrachten

Das Network-Analytics-**Aktivitätsprotokoll** zeigt bis zu 500 Protokollereignisse im aktuell ausgewählten Zeitbereich, paginiert mit 10 Ergebnissen pro Seite und Zeitbereichsansicht. (Bei der [GraphQL-Analytics-API](/analytics/graphql-api/) gibt es diese Einschränkung nicht.) 

Ereignisdetails erreichen Sie über das Erweiterungs-Widget, das mit den Ereignissen verbunden ist.

### Spalten konfigurieren

Um zu konfigurieren, welche Spalten im Aktivitätsprotokoll angezeigt werden, klicken Sie auf die Schaltfläche **Spalten bearbeiten**. 

Diese Funktion ist besonders nützlich, wenn Sie einen DDoS-Angriff identifizieren möchten. Dabei können Sie unter anderem die gewünschten Attribute wie IP-Adressen, maximale Bitrate und Angriffs-ID angeben.

### Wichtigste Elemente anzeigen

In den Bereichen **Ursprungsland**, **Ursprung** und **Ziel** werden die obersten Elemente in jeder Ansicht angezeigt.

Die Anzahl der anzuzeigenden Elemente wählen Sie über die zugehörige Dropdown-Liste.

Um die wichtigsten Rechenzentren aufzurufen, wählen Sie in der Ansicht **Ursprungsland** aus der Dropdown-Liste _Rechenzentrum_ aus. Die Ansicht **Usprungs-Rechenzentrum** ersetzt die Ansicht **Ursprungsland** .

___

## Protokolldaten und Berichte exportieren

### Aktivitätsprotokolldaten exportieren 

Sie können bis zu 500 Rohereignisse aus dem Aktivitätsprotokoll auf einmal exportieren. Diese Option ist nützlich, wenn Sie Cloudflare-Daten mit Daten kombinieren und analysieren müssen, die in einem separaten System oder einer Datenbank gespeichert sind, z. B. in einem SIEM (Security Information and Event Management System).

Um Protokolldaten zu exportieren, klicken Sie auf **Exportieren**.

Wählen Sie entweder das CSV- oder das JSON-Format für die Wiedergabe der exportierten Daten. Der Name der heruntergeladenen Datei spiegelt den ausgewählten Zeitbereich wider, wobei folgendes Muster verwendet wird:

_network-analytics-attacks-\[startzeit\]-\[endzeit\].json_

### Einen Network-Analytics-Bericht exportieren 

Zum Drucken oder Herunterladen eines Snapshot-Berichts von **Network Analytics** gehen Sie so vor:

Klicken Sie auf **Bericht drucken**. In der Druckoberfläche Ihres Webbrowsers werden Optionen zum Drucken oder zum Speichern als PDF angezeigt.

___

## Einschränkungen

Für Network Analytics gelten derzeit folgende Einschränkungen:

-   Network Analytics v1 bietet Einblicke in [Denial of Service Daemon (DoSD)](https://blog.cloudflare.com/who-ddosd-austin/)\-Angriffe. Auch wenn die Ansicht der Daten zeitnah erfolgt, bietet es dennoch keine vollständige Ansicht aller Ereignisse. 
-   Die folgenden Datenquellen sind in Network Analytics v1 nicht verfügbar:
    -   Firewall-Regeln _(verfügbar in Network Analytics v2)_
    -   Regeln auf Anwendungsebene
    -   Gatekeeper und manuell angewendete Regeln
    -   [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/) (erweiterter TCP-Schutz) _(verfügbar in Network Analytics v2)_
    -   WARP-Traffic und Traffic mit [orangefarbener Wolke](https://support.cloudflare.com/hc/de/articles/205177068)
-   Daten von Cloudflare-Diensten, die als Proxy für Traffic dienen, z. B. CDN, sind in Network Analytics nicht verfügbar.

___

## Verwandte Ressourcen

-   [Cloudflare Network Analytics v2](/analytics/network-analytics/)
-   [Umstellung von Network Analytics v1 auf Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [Cloudflare GraphQL-API](/analytics/graphql-api/)
-   [Cloudflare Analytics: Ein kurzer Überblick](https://support.cloudflare.com/hc/articles/360037684111)
-   [IANA-Portnummern und Dienstnamen](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## Häufig gestellte Fragen

### Wie lange bewahrt Cloudflare die Daten im Network-Analytics-Portal auf?

Wenn Sie Network Analytics v2 (NAv2) verwenden, können Sie Daten über einen Zeitraum von **90 Tagen** abfragen.

Network Analytics v1 (NAv1) verwendet GraphQL-Knoten für Roll-ups von Daten in IP-Flows von einer Minute, einer Stunde und einem Tag. Im Knoten ipFlows1mGroups werden beispielsweise Daten minutenweise aggregiert.

In dieser Tabelle können Sie nachschlagen, welches Intervall von historischen Daten Sie in NAv1 abfragen können. Verwenden Sie die Spalte _**notOlderThan**_ (nicht älter als) als Indikator für die Aufbewahrungszeit.

| 
GraphQL-Datenknoten

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

Zeitbereichsauswahlen in Network Analytics

 | 

Anzahl der Datenpunkte

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroups

 | 

25 Stunden

 | 

30 Tage

 | 

30 Minuten

 | 

30

 |
| 

6 Stunden

 | 

71

 |
| 

12 Stunden

 | 

48

 |
| 

24 Stunden

 | 

96

 |
| 

ipFlows1dGroups

 | 

6 Monate

 | 

1 Jahr

 | 

1 Woche

 | 

168

 |
| 

1 Monat

 | 

30

 |

_**\*maxDuration**_ _definiert das Zeitfenster, das in einer Abfrage angefordert werden kann (je nach Datenknoten)._

_**\*\*notOlderThan**_ _schränkt ein, wie weit zurück im Datensatz man mit einer Abfrage suchen kann. Daran erkennt man, wie lange die Daten in unserer Datenbank bleiben._ 

Wenn Sie mit Angriffsprotokollen im Dashboard arbeiten, sollten Sie Folgendes beachten:

-   Wir speichern Angriffsprotokolle mit Start- und Endzeitstempeln, Paketen- und Bitstatistiken für die minimale, maximale und durchschnittliche Datenrate sowie Gesamtsummen, Angriffstypen und Aktionen. 
-   Quell-IP-Adressen werden als personenbezogene Daten betrachtet. Daher speichert Cloudflare sie nur 30 Tage lang. Nach 30 Tagen werden die Quell-IP-Adressen verworfen und die Protokolle werden zunächst in 1-Stunden-Gruppen und dann in 1-Tages-Gruppen zusammengefasst. Die 1-stündigen Roll-Ups werden für 6 Monate gespeichert. Die eintägigen Roll-Ups werden 1 Jahr lang aufbewahrt.

Weitere Informationen zur Abfrage und zum Zugriff auf Protokolldaten finden Sie unter [GraphQL Analytics API](/analytics/graphql-api/limits) . 

### Warum ist die Ziel-IP laut Network Analytics „nicht verfügbar“?

Die Ziel-IP wird als _nicht verfügbar_ angezeigt, wenn sie nicht in der Echtzeitsignatur enthalten ist, die von unseren [DDoS-Schutzsystemen](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/) generiert wurde. 

Um die Ziel-IP anzuzeigen, filtern Sie nach der **Angriffs-ID** und blättern Sie in den oberen Listenelementen zum Abschnitt **Ziel**. Wenn Sie nach einer bestimmten Angriffs-ID filtern, wird das gesamte Network Analytics-Dashboard zu einem Angriffsbericht.
