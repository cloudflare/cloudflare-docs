---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information
title: 1xx Information 
---

# 1xx Information 

## 1xx Information

**Übersicht**

1xx-Codes sind oft Zwischenantworten zur Weitergabe von Informationen zum Verbindungsstatus. Sie sind nicht für endgültige Anfrage- oder Antwortaktivitäten vorgesehen. Anforderungen an den Server:

-   Alle Antworten werden durch die erste leere Zeile nach der Statuszeile beendet.

-   Wird nicht für HTTP 1.0 verwendet. Der Ursprungsserver sollte nie eine 1xx-Antwort an einen HTTP-1.0-Client schicken

Cloudflare leitet alle diese Antworten weiter und generiert nie diese Antwort.

-   [100 Continue](https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information#code_100)
-   [101 Switching Protocols](https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information#code_101)
-   [102 Processing](https://support.cloudflare.com/hc/de/articles/115003013892-1xx-Information#code_102)

**100 Continue ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Bestätigung der ursprünglichen Anfrage zum Senden eines Antworttexts. Der Ursprungsserver ist bereit, die Anfrage anzunehmen (basierend auf den Anfrage-Headern). Dies wird zurückgegeben, bevor der Client für gewöhnlich den Antworttext sendet. Dadurch wird verhindert, dass Clients unnötige oder unbrauchbare Daten senden. Anforderungen an den Server: Wenn der Client den Header `Expect: 100-continue` sendet, muss der Server sofort entweder mit `100 Continue` antworten und weiter aus dem Eingabestream lesen oder einen anderen Antwortcode senden. Cloudflare verwendet Keep-Alive-Verbindungen, weswegen diese Antwort nicht nötig sein sollte.

**101 Switching Protocols ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Der Ursprungsserver akzeptiert die Anfrage des Clients zum Wechsel des Protokolls. Die Client-Anfrage enthielt entweder `Upgrade` in einem Header-Feld oder es gab eine Änderung im Anwendungsprotokoll, das für diese Verbindung verwendet wird. Wenn das Upgrade-Header-Feld verwendet wird, ist der Server bereit, auf ein Protokoll zu wechseln, das höher in der Prioritätenliste des Clients steht als das gegenwärtig verwendete Protokoll. Der Ursprungsserver muss auch mit einem `Upgrade`\-Header-Feld antworten, um das neue Protokoll anzugeben, zu dem die Verbindung wechselt. Es wird davon ausgegangen, dass dieser Wechsel sowohl für den Client als auch für den Server vorteilhaft sein wird. Beim häufigsten Anwendungsfall geht es um WebSockets. Für Informationen zu Cloudflares WebSockets siehe: [Cloudflare unterstützt jetzt WebSockets](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)

**102 Processing ([RFC2518](https://tools.ietf.org/html/rfc2518))**

Der Server hat die vollständige Antwort des Clients empfangen, rechnet aber damit, mehr Zeit für die Verarbeitung zu brauchen (z. B. über 20 Sekunden). Der Server muss eine endgültige Antwort senden, nachdem die Anfrage ausgeführt worden ist. Wird nur ab HTTP 1.1 verwendet.

Wenn Cloudflare innerhalb von maximal 100 Sekunden nach einem 102 keine Antwort empfängt, wird ein [Fehler 522: Connection Timed Out (Zeitüberschreitung der Verbindung)](https://support.cloudflare.com/hc/articles/115003011431#522error) generiert. 102-Antworten können verwendet werden, um einen [Fehler 524: A timeout error (Zeitüberschreitungsfehler)](https://support.cloudflare.com/hc/articles/115003011431#524error) zu verhindern.
