---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360016450871-Abrechnung-f%C3%BCr-Cloudflare-Stream
title: Abrechnung für Cloudflare Stream 
---

# Abrechnung für Cloudflare Stream 



[Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091) ist eine Video-on-Demand-Plattform für die Entwicklung von Videoanwendungen. Die Preise basieren auf Nutzung und Speicherbedarf, wie unten beschrieben.

An Nutzer übertragene Videominuten:

-   1,00 USD pro 1.000 Minuten und Monat

Auf Cloudflare Stream gespeicherte Videominuten:

-   5,00 USD pro 1.000 Minuten
-   im Voraus berechnet

___

## Abrechnung für Cloudflare Stream

Cloudflare Stream wird monatlich abgerechnet. Da die Abrechnung von Stream nutzungsbasiert erfolgt, werden Ihnen die im Vormonat abgerufenen bzw. gespeicherten Minuten berechnet. So enthält beispielsweise Ihre Rechnung für September die Gebühren für die Stream-Nutzung im August.

Die Gebühren werden auf volle 1.000 Minuten aufgerundet. Unten einige Kostenbeispiele auf der Grundlage übertragener und gespeicherter Minuten:

| **Minuten** | **Aufgerundet zu** | **Anfallende Gebühren** |
| --- | --- | --- |
| 
1.999 an Nutzer übertragen

 | 

2.000 Minuten

 | 

2,00 $

 |
| 

3.001 auf Stream gespeichert

 | 

4.000 Minuten

 | 

20,00 $

 |
| Gesamtgebühr für den Zeitraum | 

22,00 $

 |

Damit Sie Stream nutzen können, muss eine gültige Zahlungsmethode bei Ihrem Cloudflare-Konto gespeichert sein. Cloudflare Stream überträgt keine Videos mehr, wenn wir einen Zahlungsverzug erkennen. Wenn Sie die Zahlungen nicht wieder aufnehmen, werden die von Ihnen hochgeladenen Stream-Videos nach 30 Tagen gelöscht.

___

## Kostenpflichtige Minuten bei Cloudflare Stream

Die kostenpflichtigen Minuten entsprechen der Videozeit, die von Cloudflare an Ihre Besucher übertragen wurde.

Wenn der Besucher ein Video lädt, ohne es sich anzusehen, berechnet Cloudflare die Übertragung des Videos trotzdem. Wenn der Browser des Besuchers das Video jedoch lokal zwischenspeichert, berechnet Cloudflare nicht die Zeit, die er mit dem Betrachten des Videos verbringt. Mit anderen Worten, wenn der Besucher sich das Video mehrmals ansieht, berechnen wir die weiteren Male nicht mehr.

Wenn Sie das Attribut _Preload_ (beschrieben in der [API-Dokumentation](/stream/video-playback/player-api/) für Stream) im Einbettungscode angeben, berechnen wir die Zeit für das Vorabladen des Videos. Beachten Sie, dass das Preload-Verhalten je nach Browser unterschiedlich ist. Manche Browser laden nur einige Sekunden des Videos vorab, andere laden das ganze Video. Dieses Vorabladen kann zur Optimierung der Videoqualität zwar sinnvoll sein, Sie sollten aber überlegen, ob es in Ihrem Anwendungsfall angemessen ist.

Sie können die kostenpflichtigen Minuten für Cloudflare Stream im Cloudflare Dashboard ansehen und damit schätzen, wie hoch die Gebühren für die übertragenen Minuten sein werden.

Wenn Sie sich ansehen möchten, wie viele Stream-Minuten betrachtet wurden, gehen Sie so vor: 

1.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
2.  Klicken Sie unter dem Dropdown **Mein Profil** auf **Abrechnung**. Sie sehen eine Liste der Domains, die mit Ihrem Cloudflare-Konto verknüpft sind.
3.  Wählen Sie die Domain aus, für die Stream aktiviert ist.
4.  Klicken Sie im linken Navigationsbereich auf **Kostenpflichtige Nutzung**. Sie sehen eine Grafik, die Ihren momentanen täglichen Traffic wiedergibt.
5.  Wählen Sie im Dropdown über der Grafik **Vormonat** aus und klicken Sie auf **Monat bisher**. Nun sehen Sie die Nutzung im Vormonat.![stream_billing_subcriptions_previous_month.png](/support/static/stream_billing_subcriptions_previous_month.png)

{{<Aside type="note">}}
Wir planen, in naher Zukunft auch die gesamte Speicherbelegung im
Cloudflare Dashboard darzustellen.
{{</Aside>}}

___

-   [Die Videoplattform Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Entwicklerdokumentation zu Cloudflare Stream](/stream/getting-started/)
