---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/206049798-Was-ist-Response-Buffering-
title: Was ist Response Buffering 
---

# Was ist Response Buffering? 

## Was ist Response Buffering?

Der Unterschied zwischen Pufferung und Streaming

Eine Datei zu streamen bedeutet, Teile einer Datei in den Speicher zu laden und die Datei an den Endbenutzer zu senden, während sie empfangen wird.

Eine Datei zu puffern bedeutet, eine vollständige Datei in den Speicher zu laden und die Datei erst dann an den Endbenutzer zu senden, wenn die vollständige Datei in den Speicher geladen ist.

Standardmäßig führt Cloudflare das Streaming von Dateien aus. Streaming verbessert die Bereitstellung großer Dateien, indem es die Zeit minimiert, die der Endbenutzer auf das erste Datenbyte warten muss.

Webdienste, die viele kleine Pakete senden, können von Response Buffering profitieren. Es trägt dazu bei, die Zeit zu verkürzen, die ein Client auf ein kleines Paket warten muss, weil er die Daten alle auf einmal empfängt.

Was bewirkt das Feature Response Buffering?

Standardmäßig sendet Cloudflare Pakete direkt nach Erhalt an den Client. Bei aktiviertem Response Buffering wartet Cloudflare auf den Erhalt der gesamte Datei, bevor sie an den Endbenutzer weitergeleitet wird.

Verwenden Sie Antwortpufferung, wenn Sie es vorziehen, dass Cloudflare dem Client mit einem Mal eine vollständige Nutzlast liefert.

Wer kann von Response Buffering profitieren?

Response Buffering ist gut für Kunden, die die Bereitstellung vieler kleiner Elemente an den Endbenutzer beschleunigen möchten.

Wie aktiviere ich Response Buffering?

Response Buffering ist in der Network App des Cloudflare-Dashboard verfügbar.

![](/images/support/Screen_Shot_2015-06-30_at_3.45.52_PM.png)

Für wen ist Response Buffering verfügbar?

Response Buffering ist für alle Enterprise-Kunden verfügbar. Wenn Sie ein Upgrade zu Enterprise durchführen möchten, [wenden Sie sich an das Cloudflare-Team](https://www.cloudflare.com/enterprise-service-request).
