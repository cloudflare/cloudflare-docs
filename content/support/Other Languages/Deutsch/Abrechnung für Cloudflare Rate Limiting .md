---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115000272247-Abrechnung-f%C3%BCr-Cloudflare-Rate-Limiting
title: Abrechnung für Cloudflare Rate Limiting 
---

# Abrechnung für Cloudflare Rate Limiting 



Enterprise-Kunden wird ein im Vertrag festgelegter Festpreis berechnet. Alle anderen Tarife erzeugen [Kosten auf Grundlage der Nutzung](https://support.cloudflare.com/hc/en-us/articles/115004555148), was folgendermaßen in der monatlichen Abonnementrechnung aufgeführt wird:

Die ersten 10.000 kostenpflichtigen Anfragen für Ihre Websites sind kostenlos. Danach werden 0,05 $ pro 10.000 Anfragen berechnet. Wenn Sie z. B. 35.000 gute bzw. zulässige Anfragen haben, die einer Regel für Rate Limiting entsprechen:

-   1–10.000 sind kostenlos.
-   10.001–20.000 kosten 0,05 $
-   20.001–30.000 kosten 0,05 $
-   30.001–35.000 kosten 0,05 $ (die Anfragen werden nicht anteilig berechnet, auch wenn Sie nur einen Teil der bereits bezahlten 10.000 Anfragen nutzen)

Zum nächsten [Abrechnungstermin](https://support.cloudflare.com/hc/en-us/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2) werden Ihnen insgesamt 0,15 $ für Rate Limiting berechnet. Diese Gebühr erscheint als Einzelposten auf Ihrer Rechnung, wobei die Gesamtanzahl der abgerechneten Anfragen aufgeführt wird.

Bitte beachten Sie, dass die ersten 10.000 Anfragen sich auf alle Websites Ihres Kontos beziehen, d. h. Sie erhalten keine 10.000 kostenlosen Anfragen pro Website. Wenn Sie eine Website mit 20.000 und eine mit 30.000 Anfragen haben, beträgt Ihre Rechnung 0,20 $ für die 50.000 Anfragen, nicht 0,15 $.

___

## Kostenpflichtige Nutzung des Rate Limiting

Rate Limiting wird auf Grundlage der Anzahl guter (nicht blockierter) Anfragen auf all Ihren Websites berechnet, die mit Ihren festgelegten Regeln übereinstimmen. Jede Anfrage wird nur einmal berechnet, d. h. Anfragen, die mit mehreren Regeln übereinstimmen, werden nicht mehrfach berechnet.

Wenn z. B. eine Regel mit example.com/ratelimit/\* übereinstimmt und Clients blockiert, die mehr als 30 Anfragen pro Minute senden, geschieht Folgendes:

-   Client A sendet 20.000 Anfragen an example.com/ratelimit/foo in einer Frequenz von 10 Anfragen pro Minute. Alle Anfragen werden zugelassen.
-   Client B sendet 90.000 Anfragen an example.com/ratelimit/bar, normalerweise in einer Frequenz von 10 Anfragen pro Minute, aber mit Spitzen von über 30 Anfragen pro Minute. 60.000 dieser Anfragen werden während der Spitzen blockiert und 30.000 werden zugelassen, wenn die Frequenz geringer ist.
-   Client C sendet 20.000 Anfragen an example.com/elsewhere in einer Frequenz von 40 Anfragen pro Minute. Obwohl dies den Schwellenwert überschreitet, stimmt dies nicht mit dem Regelpfad überein. Daher werden alle 20.000 Anfragen zugelassen.

In diesem Beispiel sind 50.000 (30.000 + 20.000) Anfragen abrechenbar: Die Clients A und B senden Anfragen, die mit der Regel übereinstimmen, aber einige der Anfragen von Client B wurden blockiert und sind somit nicht kostenpflichtig. Die Gesamtkosten betragen (50.000 - 10.000) \* 0,05 $ = 0,20 $.

| 
**Client**

 | 

**Anfragen-URL**

 | 

**Anfragen**

 | 

**Ergebnis**

 | 

**Monatliche Kosten**

 |
| --- | --- | --- | --- | --- |
| A | example.com/ratelimit/foo | 20.000 mit 10 Anfragen pro Minute | URL-Muster stimmt überein, aber Schwellenwert wird nicht überschritten. Alle Anfragen werden zugelassen. | 

(2-1)\* 0,05 $ = 0,05 $

_Es werden nur 10.000 Anfragen berechnet, weil die ersten 10.000 Anfragen keine Kosten verursachen._

 |
| B |  example.com/ratelimit/bar | 

90.000:

60.000 mit 30 Anfragen pro Minute + 30.000 unter 30 Anfragen pro Minute

 | URL-Muster stimmt überein. Regel blockiert 60.000 Anfragen und lässt 30.000 zu. | 3\* 0,05 $ = 0,15 $ |
| C |  example.com/elsewhere | 20.000 mit 40 Anfragen pro Minute | URL-Muster stimmt nicht überein. Regel wird nicht angewendet. Alle Anfragen werden zugelassen. | 0,00 $ |
|  **Berechnete Gesamtkosten:** | 0,20 $ |
