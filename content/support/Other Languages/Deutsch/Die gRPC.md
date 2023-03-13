---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360050483011-Die-gRPC-Unterst%C3%BCtzung-von-Cloudflare
title: Die gRPC-Unterstützung von Cloudflare 
---

# Die gRPC-Unterstützung von Cloudflare 



## Überblick

Das gRPC-Protokoll wurde 2015 von Google entwickelt und dient der Erstellung von effizienten APIs mit kleineren Nutzlasten für eine geringere Bandbreitennutzung, eine geringere Latenz und schnellere Implementierungen. Cloudflare unterstützt gRPC zum Schutz Ihrer APIs auf allen gRPC-Endpunkten mit orangefarbener Wolke.

Die Ausführung von gRPC-Traffic auf Cloudflare ist mit den meisten Cloudflare-Produkten kompatibel, einschließlich WAF, Bot Management und Page Rules. gRPC-Unterstützung ist für alle Cloudflare-Tarife ohne zusätzliche Gebühren verfügbar. Es können jedoch Gebühren für gRPC-Traffic über Zusatzprodukte wie Argo Smart Routing, WAF und Bot Management anfallen. Die gRPC-Unterstützung wurde weitgehend getestet und gilt als stabil, Fehler sind jedoch noch möglich. Melden Sie unerwartetes Verhalten bitte an den [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476).

___

## Voraussetzungen

-   Ihr gRPC-Endpunkt muss auf Port 443 hören.
-   Ihr gRPC-Endpunkt muss TLS und HTTP/2 unterstützen.
-   HTTP/2 muss über ALPN angekündigt werden.
-   Verwenden Sie _application/grpc_ oder _application/grpc+<message type_ (z. B. _application/grpc+proto_) für den **Content-Type**\-Header von gRPC-Anfragen.

___

## Einschränkungen

Bei folgenden Produkten gibt es Funktionseinschränkungen mit gRPC-Anfragen:

-   **Argo Tunnel** unterstützt derzeit kein gRPC.
-   **Cloudflare Access** unterstützt keinen gRPC-Traffic, der über den Reverse-Proxy von Cloudflare gesendet wird. gRPC-Traffic wird von Access ignoriert, wenn gRPC in Cloudflare aktiviert ist. Wir empfehlen: Deaktivieren Sie gRPC für alle sensiblen Ursprungsserver, die durch Access geschützt sind, oder aktivieren Sie eine andere Methode zur Authentifizierung des gRPC-Traffics zu Ihren Ursprungsservern.

___

## gRPC aktivieren

Zur Aktivierung von gRPC gehen Sie so vor:

{{<Aside type="note">}}
Aktivieren Sie die [orangefarbene Wolke bei der
Domain](https://support.cloudflare.com/hc/articles/200169626), auf der
Ihr gRPC-Endpunkt gehostet wird.
{{</Aside>}}

1.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
2.  Wählen Sie die entsprechende Domain.
3.  Klicken Sie auf die **Netzwerk**\-App.
4.  Aktivieren Sie **gRPC**.
