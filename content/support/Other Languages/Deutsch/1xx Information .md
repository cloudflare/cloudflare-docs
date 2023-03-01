---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information
title: 1xx Information 
---

# 1xx Information 

## 1xx Information

**Übersicht**


-   Alle Antworten werden durch die erste leere Zeile nach der Statuszeile beendet.

-   Wird nicht für HTTP 1.0 verwendet. Der Ursprungsserver sollte nie eine 1xx-Antwort an einen HTTP-1.0-Client schicken

Cloudflare leitet alle diese Antworten weiter und generiert nie diese Antwort.

-   [100 Continue](https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information#code_100)
-   [101 Switching Protocols](https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information#code_101)
-   [102 Processing](https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information#code_102)

**100 Continue ([RFC7231](https://tools.ietf.org/html/rfc7231))**


**101 Switching Protocols ([RFC7231](https://tools.ietf.org/html/rfc7231))**


**102 Processing ([RFC2518](https://tools.ietf.org/html/rfc2518))**

Der Server hat die vollständige Antwort des Clients empfangen, rechnet aber damit, mehr Zeit für die Verarbeitung zu brauchen (z. B. über 20 Sekunden). Der Server muss eine endgültige Antwort senden, nachdem die Anfrage ausgeführt worden ist. Wird nur ab HTTP 1.1 verwendet.

Wenn Cloudflare innerhalb von maximal 100 Sekunden nach einem 102 keine Antwort empfängt, wird ein [Fehler 522: Connection Timed Out (Zeitüberschreitung der Verbindung)](https://support.cloudflare.com/hc/articles/115003011431#522error) generiert. 102-Antworten können verwendet werden, um einen [Fehler 524: A timeout error (Zeitüberschreitungsfehler)](https://support.cloudflare.com/hc/articles/115003011431#524error) zu verhindern.
