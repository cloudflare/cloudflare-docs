---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg
title: 2xx Erfolg 
---

# 2xx Erfolg 

**Übersicht**

2xx-Codes bezeichnen erfolgreiche Antworten. Gewöhnlich bedeutet das, dass die vom Client angeforderte Aktion erfolgreich empfangen, verstanden und akzeptiert wurde.

-   [200 OK](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_200)
-   [201 Created (Erstellt)](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_201)
-   [202 Accepted (Angenommen)](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_202)
-   [203 Non-Authoritative Information (Nicht autorisierte Information)](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_203)
-   [204 No Content (Kein Inhalt)](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_204)
-   [205 Reset Content (Inhalt zurücksetzen)](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_205)
-   [206 Partial Content (Teilweiser Inhalt)](https://support.cloudflare.com/hc/de/articles/115003014192-2xx-Erfolg#code_206)

**200 OK** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Jedermanns Lieblingsantwort: Die Anfrage war erfolgreich.

Die Antwortnutzlast hängt von der verwendeten Anfragemethode ab. Der erwartete Antworttext für die jeweilige Anfragemethode sieht wie folgt aus:

-   GET: die Header und Daten, die der angeforderten Ressource entsprechen
-   HEAD: nur die Header, die der angeforderten Ressource entsprechen, ohne die eigentlichen Daten
-   POST: der Status oder die Ergebnisse, die aus dieser Aktion gewonnen wurden

Eine 200-Antwort _sollte_ immer eine Nutzlast haben, muss aber nicht. Ein Ursprungsserver kann also eine 200-Antwort mit Null-Länge generieren. Um die RFC-Standards einzuhalten, sollte in diesem Fall eine 204-Antwort generiert werden (Ausnahme: CONNECT).

Standardmäßig zwischenspeicherbar durch Proxy-Server und Browser. Soweit nicht von Cloudflares [Cache-Steuerelementen](https://support.cloudflare.com/hc/en-us/articles/202775670) spezifiziert, werden [statische Ressourcen](https://support.cloudflare.com/hc/en-us/articles/200172516) mit dieser Antwort standardmäßig 2 Stunden lang an unserer Edge zwischengespeichert.  

**201 Created (Erstellt)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Die Anfrage war erfolgreich, und eine oder mehr neue Ressourcen werden erstellt. Es ist zu erwarten, dass der Standort der neuen Ressource entweder am Standort\-Header-Feld oder durch den URI der Anfrage vorhanden ist. Gewöhnlich beschreibt und verweist die Nutzlast auf Links zu der neu generierten Ressource.

-   Siehe [RFC 7231, Abschnitt 7.2](https://tools.ietf.org/html/rfc7231#section-7.2) für eine Erklärung von Bedeutung und Zweck von Validierungs-Header-Feldern wie ETag und Last-Modified in einer 201-Antwort.

**202 Accepted (Angenommen)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Die Anfrage wurde akzeptiert und wird gegenwärtig durch den Ursprungsserver verarbeitet.  Abhängig von den Spezifikationen des Servers kann der Client auf die Anfrage reagieren oder auch nicht, während die Verarbeitung stattfindet.

**203 Non-Authoritative Information (Nicht autorisierte Information)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Optionale Ersetzung des Statuscodes 200, um zu erklären, dass die Anfrage erfolgreich war, jedoch nicht direkt vom Ursprungsserver kam. Die ursprüngliche Antwort des Ursprungsservers wurde von einem Proxy- oder Zwischen-Server geändert. Zum Beispiel können 203-Codes verwendet werden, um den Client zu informieren, dass diese Ressource bei einem Proxy zwischengespeichert wurde, sodass eine ähnliche zukünftige Anfrage womöglich diesen Cache-Server mit dieser identischen Ressource trifft. Oder es kann ein Header, der nur für den lokalen Ursprungsserver gilt, entfernt werden.

-   Die Antwort ist standardmäßig zwischenspeicherbar, aber Cloudflare speichert sie nicht im Cache.
-   Cloudflare generiert sie nie selbst, kann sie aber von anderen Proxys weiterleiten, soweit vorhanden. Cloudflare berücksichtigt die Antworten des Ursprungs mit den folgenden Ausnahmen: [Wie behandelt Cloudflare HTTP-Anfrage-Header?](https://support.cloudflare.com/hc/en-us/articles/200170986)

**204 No Content (Kein Inhalt) ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Die angeforderten Aktionen wurden korrekt am Ursprungsserver ausgeführt. Der übliche Anwendungsfall tritt in Dokument-Editoren auf: Die „Speichern“-Aktion wird zum Ursprungsserver gesendet, es muss jedoch keine Nutzlast an den Client zurückgegeben werden. Es kann trotzdem wünschenswert sein, den Benutzer zu benachrichtigen, dass der Speichervorgang erfolgreich war.

-   Bei Rückgabe einer 204-Antwort darf es nie eine Nutzlast geben.
-   Die Antwort ist standardmäßig zwischenspeicherbar, aber Cloudflare speichert sie nicht im Cache.

**205 Reset Content (Inhalt zurücksetzen)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Ursprungsserver schlägt vor, dass der Client die Ansicht auf ihren ursprünglichen Zustand vor der Anfrage zurücksetzt. Wird oft in Formularen oder anderen Eingabevorlagen verwendet, bei denen eine Nutzlast in der Anfrage gesendet wird, der Ursprungsserver erfolgreich gearbeitet hat und jetzt den Browser benachrichtigt, dass weitere Eingaben zulässig sind.

-   Eine 205-Antwort darf nie eine Nutzlast zurückgeben. Es sind nur eine Inhaltslänge von 0 oder aufgeteilte Antworten zulässig, die unmittelbar von einer Schließen- oder Nullbyte-Antwort gefolgt werden.

**206 Partial Content (Teilweiser Inhalt) (**[**RFC 7233**](https://tools.ietf.org/html/rfc7233)**)**

Die Anfrage nach einem Teil einer Ressource war erfolgreich und befindet sich in der Nutzlast. Die Anfrage muss den Bereich auf eine der folgenden Arten angegeben haben:

1.  Eine einzelne Teilanfrage mit HTTP-Headern einschließlich Inhaltsbereich gefolgt von der Größe. (Wenn in der Antwort vorhanden, muss der Header genau gleich den Oktetts in der Nutzlast sein.) Z. B. `Content Range: bytes 21010-47021/47022`
2.   Mehrere Blöcke mit `Content-Type: multipart/byteranges` im HTTP-Header einschließlich Inhaltsbereichsfelder für jeden Teil einzeln, jedoch _nicht_ im Antwort**\-HTTP-Header**. Es ist auch eine Grenze entsprechend [RFC 7233, Abschnitt 4.1](https://tools.ietf.org/html/rfc7233%23section-4.1) erforderlich, z. B.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Partial Content     Date: Wed, 15 Nov 1995 06:25:24 GMT     Last-Modified: Wed, 15 Nov 1995 04:58:08 GMT     Content-Length: 1741     Content-Type: multipart/byteranges; boundary=THIS_STRING_SEPARATES     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 500-999/8000     ...the first range...     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 7000-7999/8000     ...the second range     --THIS_STRING_SEPARATES--</span></div></span></span></span></code></pre>{{</raw>}}

 206-Antworten sind nützlich für Clients, die größere Dateien verarbeiten, für die aufgeteilte oder unterbrochene Downloads mit mehreren gleichzeitigen Streams erforderlich sind, um die Latenz zu verbessern.
