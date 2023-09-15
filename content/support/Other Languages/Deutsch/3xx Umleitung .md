---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung
title: 3xx Umleitung 
---

# 3xx Umleitung 

**Übersicht**

3xx-Codes sind eine Klasse von Antworten, durch die vorgeschlagen wird, dass der User-Agent eine andere Vorgehensweise befolgt, um die vollständige angeforderte Ressource zu erhalten.

Der Umleitungsort sollte in einem der Folgenden eingestellt werden:

1.  Im Header-Feld `Location` in der Antwort – nützlich für automatisches Umleiten
2.  In der Nutzlast der Antwort mit einem Link (optional) zum Korrekturstandort

-   [300 Multiple Choices (Mehrfache Auswahl)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_300)
-   [301 Moved Permanently (Permanent verschoben)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_301)
-   [302 Found (Gefunden)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_302)
-   [303 See Other (Siehe andere)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_303)
-   [304 Not Modified (Nicht verändert)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_304)
-   [305 Use Proxy (Proxy verwenden)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_305)
-   [306 Switch Proxy (Proxy wechseln)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_306)
-   [307 Temporary Redirect (Temporäre Umleitung)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_307)
-   [308 Permanent Redirect (Permanente Umleitung)](https://support.cloudflare.com/hc/de/articles/115003011091-3xx-Umleitung#code_308)

**300 Multiple Choices (Mehrfache Auswahl)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Mehrere Optionen für die Ressource, die der Client befolgen kann. Es könnte zum Beispiel verwendet werden, um unterschiedliche Formatoptionen für Videos, Listendateien mit unterschiedlichen [Erweiterungen](https://en.wikipedia.org/wiki/File_extensions) oder [Begriffserklärungen](https://en.wikipedia.org/wiki/Word_sense_disambiguation) darzustellen.

**301 Moved Permanently (Permanent verschoben)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Permanente URL-Umleitung für die angeforderte Ressource.Der Zielressource wurde ein neuer permanenter URI zugewiesen, und alle zukünftigen Verweise auf diese Ressource müssen einen der eingeschlossenen URIs verwenden.

Cloudflare kann diese Antworten generieren und somit die Notwendigkeit umgehen, eine Anfrage auf die Antwort des Ursprungsservers durch Verwendung von Page-Rules zu senden. Unter [URL-Weiterleitung mit Page-Rules](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/) können Sie mehr darüber erfahren, wie Cloudflare bei der Generierung von Umleitungen helfen kann.

**302 Found (Gefunden) (auch bekannt als „Temporary Redirect“/„Temporäre Umleitung“)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Ähnlich einer 301-Umleitung, jedoch nur für vorübergehende Zwecke. Der User-Agent kann automatisch dem `Location`\-Header folgen, sollte jedoch nicht den aktuellen URI damit als 301 ersetzen.

Cloudflare kann diese Antworten generieren und somit die Notwendigkeit umgehen, eine Anfrage auf die Antwort des Ursprungsservers durch Verwendung von Page-Rules zu senden. Unter [URL-Weiterleitung mit Page-Rules](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/) können Sie mehr darüber erfahren, wie Cloudflare bei der Generierung von Umleitungen helfen kann.

**303 See Other (Siehe andere) (ab HTTP/1.1)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der User-Agent sollte eine GET\-Anfrage auf diese Umleitung folgen lassen. _Hinweis: Unterscheidet sich von 301 dahingehend, dass die Ressource bei der Umleitung nicht notwendigerweise dem entspricht, was angefordert wurde._

-   Ist als Antwort auf eine `POST/DELETE`\-Anfrage vorgesehen, um zu signalisieren, dass der Ursprungsserver Daten korrekt empfangen hat, und um angemessenes Cache-Verhalten zuzulassen.
-   Die ursprüngliche 303-Antwort ist nicht zwischenspeicherbar, aber die Antwort auf die 2. Anfrage (`GET`) ist es möglicherweise, weil sie sich unter einem anderen URI befindet.

**304 Not Modified (Nicht verändert)  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Signalisiert dem Client, dass die angeforderte Ressource im Cache verfügbar und gültig ist. Der Ursprungsserver hat die Ressource, die Gegenstand der Anfrage war, nicht geändert. Der Client kann die Nutzlast für die angegebene Ressource empfangen, ohne die Verbindung zum Ursprungsserver erneut herzustellen, und leitet daher die Anfrage zur Verwendung der gespeicherten Ressource um.  Anforderungen an einen Cache, der eine 304-Antwort empfängt, sind in  [Abschnitt 4.3.4 von \[RFC7234\]](https://tools.ietf.org/html/rfc7234#section-4.3.4) definiert.

Vor dieser Antwort hat der Client eine bedingte GET\- oder HEAD\-Anfrage gesendet, in der angegeben wird, welche Ressource zurzeit in ihm gespeichert ist. Der Server gibt dem Client das „OK“, diese Ressource als aktuellste Version zu verwenden, um den Umfang der Datenübertragung zwischen Client und Server zu reduzieren.

-   Darf keinen Nachrichtentext haben

-   Muss alle Header enthalten, die vor der gespiegelten 200-Antwort gesetzt worden wären: `Cache-Control, Content-Location, Date,  ETag, Expires` oder `Vary`.

Wenn Cloudflare eine Anfrage erhält, die abgelaufen ist und daher am Ursprung erneut überprüft werden muss, sendet Cloudflare eine 304-Antwort, um zu bestätigen, dass die Version in unserem Cache der Version am Ursprung entsprach. Die Antwort enthält den `CF-Cache-Status: REVALIDATED`\-Header, und Cloudflare bestätigt die Version mit dem `If-Modified-Since`\-Header. Weitere Informationen finden Sie unter: [ETag-Header](https://support.cloudflare.com/hc/en-us/articles/218505467)

**305 Use Proxy (Proxy verwenden) (veraltet)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Die Anfrage muss durch den im Location\-Header angegebenen Proxy-URI erfüllt werden, anstatt durch den Ursprung. Dieser Statuscode wurde aufgrund von Sicherheitsrisiken verworfen.

**306 Switch Proxy (Proxy wechseln) (veraltet)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Eine Benachrichtigung, dass folgende Anfragen kommen müssen, muss an den angegebenen Proxy geleitet werden.

**307 Temporary Redirect (Temporäre Umleitung)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Eine Umleitung ähnlich einer 302-Antwort, außer dass sich die Anfragemethode (z. B. GET, POST usw.) nicht von dem unterscheiden darf, was in der ursprünglichen Anfrage verwendet wurde, wenn die Umleitung automatisch befolgt wird.

-   Der User-Agent kann automatisch dem `Location`\-Header folgen, sollte aber den ursprünglichen URI nicht austauschen.

**308 Permanent Redirect (Permanente Umleitung) (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

Eine permanente Umleitung ähnlich einer 301-Antwort, außer dass sich die Anfragemethode (z. B. GET, POST usw.) nicht von dem unterscheiden darf, was in der ursprünglichen Anfrage verwendet wurde, wenn die Umleitung automatisch befolgt wird.

-   Der User-Agent sollte dem `Location`\-Header automatisch folgen.
-   Der User-Agent sollte den ursprünglichen URI durch den aktualisierten URI in der Location oder Nutzlast ersetzen.
