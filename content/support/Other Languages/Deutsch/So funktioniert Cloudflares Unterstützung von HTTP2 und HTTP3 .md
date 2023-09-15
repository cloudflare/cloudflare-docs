---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200168076-So-funktioniert-Cloudflares-Unterst%C3%BCtzung-von-HTTP-2-und-HTTP-3
title: So funktioniert Cloudflares Unterstützung von HTTP2 und HTTP3 
---

# So funktioniert Cloudflares Unterstützung von HTTP/2 und HTTP/3 



## Überblick

HTTP/2 und HTTP/3 beschleunigen den Seitenaufbau und sind für alle [Cloudflare-Tarife](http://www.cloudflare.com/plans) kostenlos.  HTTP/2 ist standardmäßig aktiviert und erfordert ein [SSL-Zertifikat im Edge-Netzwerk von Cloudflare](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0). Konfigurieren Sie HTTP/2 und HTTP/3 über die Cloudflare-App **Netzwerk**. Für Domains auf Free Plans kann HTTP/2 nicht deaktiviert werden.

Ein Browser und ein Webserver einigen sich automatisch auf das höchste verfügbare Protokoll. Somit hat HTTP/3 Vorrang vor HTTP/2. 

Um das für Ihre Verbindung verwendete Protokoll zu bestimmen, geben Sie _beispiel.com_/cdn-cgi/trace über einen Webbrowser oder Client ein. Ersetzen Sie dabei _beispiel.com_ durch Ihren Domainnamen. Sie erhalten mehrere Zeilen mit Daten. Wenn _http=h2_ in den Ergebnissen erscheint, erfolgte die Verbindung über HTTP/2. Andere mögliche Werte sind _http=http2+quic/99_ für HTTP/3 und _http=http/1.x_ für HTTP/1.x.

___

HTTP/2 verbessert Seitenladezeiten über:

-   Verbindungs-Multiplexing: ruft mehrere Ressourcen in einer einzigen Netzwerkanfrage ab. Antworten werden gesendet, wenn Ressourcen verfügbar sind, damit der Seitenaufbau nicht verlangsamt wird.
-   HTTP-Header-Komprimierung: komprimiert Header und vereinfacht HTTP-Anfragen, damit Header nicht erneut gesendet werden müssen.
-   HTTP/2 Server Push: Um die Seitenladegeschwindigkeit zu verbessern, stellt Cloudflare zusätzliche Ressourcen zur Verfügung, die ein Client im Cache speichern kann, ohne auf weitere Anfragen zu warten.

Hinweis:

-   Nicht alle Browser unterstützen HTTP/2 und verwenden dann stattdessen HTTP 1.x.
-   Verbindungs-Multiplexing erfolgt jeweils pro Domain.

___

## HTTP/3

HTTP/3 ermöglicht schnelle, zuverlässige und sichere Verbindungen.  Es verschlüsselt den Internet-Transport standardmäßig mit einem Google-Protokoll namens QUIC.  Aktivieren Sie HTTP/3 über die Cloudflare-App **Netzwerk**. 

Weitere Informationen finden Sie in unserer [HTTP/3-Dokumentation für Entwickler](/http3/).

___

## Server-Push

Durch die Server-Push-Funktion können Ursprungswebserver Ressourcen an den Client oder Webbrowser senden, ohne auf das Parsen von HTML für Verweise auf zusätzliche Assets wie Bilder, Stylesheets, JavaScript usw. zu warten. Server Push umgeht den üblichen Zyklus aus HTTP-Anfrage und Antwort für jedes Skript oder Stylesheet auf einer Seite. Server-Push ist für alle Cloudflare-Tarife verfügbar.

Server Push extrahiert URI-Referenzen innerhalb des Parameters rel=preload des **Link**\-Headers von Ihrem Ursprungsserver. Diese zusätzlichen URIs werden dann dem Kunden zur Verfügung gestellt.  Beispiel für **Link**\-Header:

`Link: < /images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

Server-Push ist auf 50 Assets pro Seite und 100 pro Verbindung begrenzt.

___

## Verwandte Ressourcen

-   [Vergangenheit, Gegenwart und Zukunft von HTTP/3](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [QUICening](https://blog.cloudflare.com/the-quicening/)
-   [Nehmen Sie sich ein Stück QUIC und Rust!](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

Informationen zur Browser-Unterstützung: 

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
