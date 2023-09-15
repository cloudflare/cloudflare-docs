---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003014432-HTTP-Statuscodes
title: HTTP-Statuscodes 
---

# HTTP-Statuscodes 

## HTTP-Statuscodes

Diese Dokumente repräsentieren Cloudflares Interpretation des Internetstandard-Verlaufsprotokolls für HTTP-Antwortcodes. Den Standardisierungszustand und Status dieses Protokolls finden Sie in der aktuellen Version der „offiziellen Internetprotokollstandards“ (STD 1). Wir haben auch alle benutzerdefinierten Cloudflare-Fehlercodes (52x) und andere häufig anzutreffende Statuscodes aufgenommen.

In diesen Artikeln beziehen wir uns ziemlich oft auf die folgenden Begriffe. Damit wir uns über die Bedeutungen einig sind, geben wir hier einige Definitionen:

**Server:** jede Partei, die eine Anfrage erhält und eine Antwort sendet. Entweder der Ursprungsserver oder Zwischenserver.

**Ursprungs-/Hostserver:** der Server am Endzielort. Dieser Server hostet den Inhalt der Website.

**Proxy-Server:** der/die Server, die zwischen dem Ursprungsserver und dem Client sitzen. Cloudflare ist zum Beispiel ein Proxy-Server.

**Client:** die Partei, die die Anfrage vornimmt. Gewöhnlich ein Endbenutzer, der auf einem Browser auf die Website zugreift. Es kann sich aber auch um einen API-Client oder jemand anderen handeln, der Ressourcen von der Website anfragt.

**Backend:** die Verbindungen, die nicht zu oder vom Client erfolgen, sondern zwischen dem/den Proxy-Server(n) und/oder dem Ursprungsserver.

**User-Agent:** die Maschine, die zum Senden der Anfrage verwendet wird. Es kann sich um einen Browser oder ein anderes Programm handeln, das Anfragen vornimmt (z. B. RESTful-API-Anfragen)

**Nutzlast:** die Antwort- oder Anfragedaten ohne die Header. Wird auch als Antwort-/Anfragetext bezeichnet.

**Hinweis zum Caching**: _Jeder HTTP-Statuscode, der standardmäßig zwischenspeicherbar ist, wird auch als von Cloudflare zwischenspeicherbar angesehen (d. h. soweit nicht durch die Methodendefinition oder ausdrückliche Cache-Steuerelemente anders angegeben). Cloudflare speichert HTTP-Antworten so wie jede Anfrage im Cache zwischen. Bei der Entscheidung, ob zwischengespeichert werden soll, berücksichtigt Cloudflare Page-Rules, Edge-TTL und Ursprungs-Header. Für weitere Informationen siehe [Wie stelle ich ein, was Cloudflare im Cache speichern soll?](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-) und [Was bedeutet Edge-TTL?](https://support.cloudflare.com/hc/en-us/articles/200168376)_

**HTTP-Statuscodes:**

**[1xx Information](https://support.cloudflare.com/hc/en-us/articles/115003013892/)**

**[2xx Erfolg](https://support.cloudflare.com/hc/en-us/articles/115003014192)**

**[3xx Umleitung](https://support.cloudflare.com/hc/en-us/articles/115003011091/)**

**[4xx Client-Fehler](https://support.cloudflare.com/hc/en-us/articles/115003014512/)**

**[5xx Server-Fehler](https://support.cloudflare.com/hc/en-us/articles/115003011431/)**
