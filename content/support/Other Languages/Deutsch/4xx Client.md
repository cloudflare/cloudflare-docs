---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler
title: 4xx Client-Fehler 
---

# 4xx Client-Fehler 

**Übersicht**

4xx-Codes sind normalerweise Fehlerantworten, die auf ein Problem beim Client hinweisen. Möglicherweise handelt es sich um Netzwerkprobleme.  

-   Sie können als Antwort auf jede Anfragemethode verwendet werden.

-   Der Ursprungsserver sollte eine Erklärung hinzufügen, die vom User-Agent mit Ausnahme einer `HEAD`\-Anfrage angezeigt werden sollte.

Cloudflare leitet diese Fehler direkt vom Ursprungsserver weiter.

-   [400 Bad Request (Ungültige Anfrage)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_400)  
-   [401 Unauthorized (Nicht autorisiert)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_401)
-   [402 Payment Required (Zahlung erforderlich)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_402)
-   [403 Forbidden (Verboten)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_403)
-   [404 Not Found (Nicht gefunden)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_404)
-   [405 Method Not Allowed (Unzulässige Methode)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_405)
-   [406 Not Acceptable (Nicht annehmbar)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_406)
-   [407 Authentication Required (Authentifizierung erforderlich)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_407)  
-   [408 Request Timeout (Anfrage-Timeout)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_408)  
-   [409 Conflict (Konflikt)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_409)
-   [410 Gone (Nicht vorhanden)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_410)
-   [411 Length Required (Länge erforderlich)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_411)
-   [412 Precondition Failed (Vorbedingungsfehler)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_412)  
-   [413 Payload Too Large (Nutzlast zu groß)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_413)
-   [414 URI Too Long (URI zu lang)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_414)
-   [415 Unsupported Media Type (Nicht unterstützter Medientyp)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_415)
-   [417 Expectation Failed (Unerwartetes Verhalten)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_417)
-   [429 Too Many Requests (Zu viele Anfragen)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_429)
-   [451 Unavailable For Legal (Aus rechtlichen Gründen nicht verfügbar)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_451)
-   [499 Client Close Request (Client-Anfrage zum Schließen)](https://support.cloudflare.com/hc/de/articles/115003014512-4xx-Client-Fehler#code_499)

**400 Bad Request (Ungültige Anfrage)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Server verarbeitet die Anfrage nicht, da ein Clientfehler erkannt wurde (z. B. fehlerhafte Anfragensyntax, ungültiges Framing der Anfragennachricht oder ein irreführendes Anfragenrouting.

**401 Unauthorized (Nicht autorisiert) (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

Die Anfrage wurde nicht mit angemessenen Authentifizierungsdaten gesendet.

-   Der Server muss mit mindestens einer Challenge in Form eines `WWW-Authenticate`\-Header-Felds antworten, siehe [Abschnitt 4.1](https://tools.ietf.org/html/rfc7235#section-4.1)
-   Der Client kann eine zweite Anfrage mit den gleichen Daten senden. Wenn die Challenge mit der vorherigen übereinstimmt, stellt der Server eine Entität zur Verfügung, mit der der Client die erforderlichen Anmeldedaten finden kann.

**402 Payment Required (Zahlung erforderlich)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Bisher nicht durch RFC-Standards implementiert, aber für zukünftige Verwendung reserviert

**403 Forbidden (Verboten)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Wenn Sie einen Fehler 403 ohne Cloudflare-Branding erhalten, wird dieser immer direkt vom Ursprungswebserver und nicht von Cloudflare zurückgegeben und bezieht sich im Allgemeinen auf die Berechtigungsregeln auf Ihrem Server.

Die Hauptgründe für diesen Fehler sind:  
1\. Von Ihnen festgelegte Berechtigungsregeln oder ein Fehler in den von Ihnen festgelegten .htaccess-Regeln  
2\. Mod\_security-Regeln.  
3\. IP-Verweigerungsregeln

Da Cloudflare nicht direkt auf Ihren Server zugreifen kann, wenden Sie sich bitte an Ihren Hosting-Provider, um Unterstützung bei der Behebung von 403-Fehlern und dem Korrigieren von Regeln zu erhalten. Sie sollten sicherstellen, dass die [IPs von Cloudflare](https://www.cloudflare.com/ips) nicht blockiert werden.

Cloudflare gibt 403-Antworten, wenn die Anfrage entweder gegen eine WAF-Standardregel, die für alle mit orangefarbener Wolke versehenen Cloudflare-Domains gilt, oder eine WAF-Regel für diese bestimmte Zone verstößt. Unter [Welche Funktion hat die Web Application Firewall?](https://support.cloudflare.com/hc/en-us/articles/200172016) erfahren Sie weitere Einzelheiten. Cloudflare sendet auch eine „403 Forbidden“-Antwort für SSL-Verbindungen mit Subdomains oder Domains, die nicht von einem Cloudflare-Zertifikat oder einem hochgeladenen SSL-Zertifikat abgedeckt werden.

Wenn im Antworttext eine 403-Antwort mit Cloudflare-Branding angezeigt wird, ist dies der HTTP-Antwortcode, der zusammen mit vielen unserer Sicherheitsmerkmale zurückgegeben wird:

-   „Web Application Firewall“-Challenge und Blockieren von Seiten
-   Basisschutz-Challenges
-   Die meisten 1xxx-Cloudflare-Fehlercodes
-   Die Browserintegritätsprüfung
-   Wenn Sie versuchen, über Cloudflare mit dem von Cloudflare ausgestellten Zertifikat auf eine zweite Ebene von Subdomains (z. B. `*.*.beispiel.com`) zuzugreifen, dann wird ein HTTP-403-Fehler im Browser angezeigt, da diese Hostnamen nicht im Zertifikat vorhanden sind.

Wenden Sie sich bei Fragen an den Cloudflare-Support. Fügen Sie einen Screenshot der angezeigten Nachricht bei oder kopieren Sie den gesamten Text auf der Seite in ein Support-Ticket.

**404 Not Found (Nicht gefunden)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Ursprungsserver hat die angefragte Ressource nicht gefunden oder die Suche verweigert. Das heißt normalerweise, dass der Hostserver die Ressource nicht finden konnte. Für eine permanentere Version dieses Fehlers sollte ein Fehlercode 410 verwendet werden.

Diese Fehler treten gewöhnlich auf, wenn jemand eine URL auf Ihrer Website falsch eingibt, wenn ein fehlerhafter Link von einer anderen Seite vorhanden ist, wenn eine Seite, die zuvor existierte, verschoben oder entfernt wurde, oder wenn bei der Indexierung Ihrer Website ein Fehler auftritt. Bei einer typischen Website machen diese Fehler ca. 3 % der gesamten Seitenansichten aus, sie werden aber von herkömmlichen Analytics-Plattformen wie Google Analytics oft nicht verfolgt.

Eigentümer von Websites implementieren normalerweise eine benutzerdefinierte Seite, die bei der Generierung dieses Fehlers angezeigt wird. Zum Beispiel wie in [Implementierung benutzerdefinierter 404-Seiten in Apache](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache) dargelegt.

Cloudflare generiert keine 404-Fehler für Websites von Kunden, wir erfüllen nur eine Proxyfunktion für die Anfrage vom Ursprungsserver. Wenn Sie einen 404-Fehler für eine Ihrer Websites, für die Sie Cloudflare verwenden, sehen, sollten Sie sich an Ihren Hosting-Provider wenden, um Hilfe zu erhalten.

**405 Method Not Allowed (Unzulässige Methode)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Ursprungsserver kennt die angefragte Ressource, aber die Anfragemethode wird nicht unterstützt.

-   Der Ursprungsserver muss auch einen `Allow`\-Header mit einer Liste der unterstützten Ziele für diese Ressource bereitstellen.

Ein Beispiel wäre ein POST auf einer unveränderlichen Ressource, die daher nur GET akzeptiert.

**406 Not Acceptable (Nicht annehmbar)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Die Ressource ist nicht am Ursprungsserver verfügbar, der Aushandlungs-Header einhält, die im Vorfeld festgelegt wurden (z. B. über `Accept-Charset`\- und `Accept-Language`\-Header)

Dieser Statuscode kann einfach ersetzt werden, indem man dem User-Agent die weniger bevorzugte Methode sendet, anstatt den Fehler zu generieren.

**407 Authentication Required (Authentifizierung erforderlich)  (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

Der Client hat nicht die erforderliche Authentifizierung mit der Anfrage gesendet.

**408 Request Timeout (Anfrage-Timeout)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Ursprungsserver hat innerhalb des akzeptierten Zeitrahmens nicht die vollständige Anfrage erhalten.

-   Es ist impliziert, dass der Server nicht warten und die Verbindung aufrechterhalten wird.

-   Dieser Fehlercode wird nicht häufig verwendet, weil Server normalerweise die Verbindungsoption „Schließen“ wählen.

**409 Conflict (Konflikt)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Die Anfrage ist nicht vollständig, weil ein Konflikt mit dem aktuellen Zustand der Ressource besteht. Dies kommt normalerweise bei PUT\-Anfragen vor, bei der mehrere Clients versuchen, die gleiche Ressource zu bearbeiten.

-   Der Server _sollte_ eine Nutzlast generieren, die ausreichende Informationen für den Client enthält, damit dieser die Ursache des Konflikts erkennen kann.
-   Clients können und sollten die Anfrage erneut versuchen.

Cloudflare generiert und sendet eine 409\-Antwort für einen [Fehler 1001: DNS Resolution Error (DNS-Auflösungsfehler)](https://support.cloudflare.com/hc/articles/360029779472#error1001).

**410 Gone (Nicht vorhanden)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Die angefragte Ressource fehlt dauerhaft auf dem Ursprungsserver.

-   Der Server schlägt vor, die Links zu entfernen, die sich auf die Ressource beziehen.
-   Der Server ist nicht qualifiziert, um diesen Statuscode bei einer 404-Antwort zu verwenden und ist nicht verpflichtet, diese Antwort für einen bestimmten Zeitraum zu haben.

**411 Length Required (Länge erforderlich)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Client hat die `Content-Length` des Anfragetexts in den Headern nicht definiert, was jedoch erforderlich ist, um die Ressource abzurufen.

-   Der Client kann die Anfrage erneut senden, nachdem das Header-Feld hinzugefügt wurde.

**412 Precondition Failed (Vorbedingungsfehler)  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Der Server lehnt die Anfrage ab, da die Ressource die vom Client festgelegten Bedingungen nicht erfüllt.

Bei der Versionskontrolle modifiziert ein Client z. B. eine vorhandene Ressource und stellt den Header `If-Unmodified-Since` daher so ein, dass er dem Datum entspricht, an dem der Client die Ressource heruntergeladen und damit begonnen hat, sie zu bearbeiten. Falls die Ressource nach diesem Datum und vor dem Upload der Änderungen bearbeitet wurde (wahrscheinlich von einem anderen Client), wird diese Antwort generiert, da die letzte Änderung nach dem in `If-Unmodified-Since` vom Client festgelegten Datum stattfindet.

Cloudflare sendet diese Antwort. Weitere Informationen finden Sie unter: [ETag-Header](https://support.cloudflare.com/hc/en-us/articles/218505467)

**413 Payload Too Large (Nutzlast zu groß)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Weigerung des Servers, die Anfrage zu bearbeiten, da die vom Client gesendete Nutzlast größer ist, als der Server bereit ist anzunehmen. Der Server hat die Möglichkeit, die Verbindung zu beenden.

-   Falls diese Weigerung nur unregelmäßig vorkommt, sollte der Server einen `Retry-After`\-Header senden, um anzugeben, wann der Client die Anfrage erneut versuchen sollte.

**414 URI Too Long (URI zu lang)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Weigerung des Servers, da der URI für die Verarbeitung zu lang war. Wenn ein Client beispielsweise eine GET\-Anfrage mit ungewöhnlich langem URI nach einem POST sendet, könnte dies auf ein Sicherheitsrisiko hindeuten, woraufhin ein 414 generiert wird.

Cloudflare generiert diese Antwort für URIs über 32 KB

**415 Unsupported Media Type (Nicht unterstützter Medientyp)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Weigerung des Servers, das Format der aktuellen Nutzlast zu verarbeiten. Eine Möglichkeit zur Identifizierung und Behebung des Problems ist der `Content-Type`\- oder `Content-Encoding`\-Header in der Clientanfrage.

**417 Expectation Failed (Unerwartetes Verhalten)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Der Server erfüllt die im `Expect`\-Header angegebenen Anforderungen der Clientanfrage nicht.

**429 Too Many Requests (Zu viele Anfragen) (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

Der Client hat laut Server zu viele Anfragen innerhalb eines festgelegten Zeitraums gesendet. Dies wird häufig als „Rate Limiting“ bezeichnet. Der Server kann mit Informationen antworten, die es dem Anfragesteller ermöglichen, es nach einem festgelegten Zeitraum erneut zu versuchen.

Cloudflare generiert und sendet diesen Statuscode, wenn [Rate Limiting](https://www.cloudflare.com/rate-limiting/) für eine Anfrage angewendet wird. Falls Besucher Ihrer Website diesen Fehler erhalten, können Sie dies unter [Rate Limiting Analytics](https://support.cloudflare.com/hc/en-us/articles/115003414428-Rate-Limiting-Analytics) einsehen.

**451 Unavailable For Legal Reason (Aus rechtlichen Gründen nicht verfügbar) (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

Der Server kann die Ressource aus rechtlichen Gründen nicht liefern.

Normalerweise sind Suchmaschinen (z. B. Google) und ISPs (z. B. ATT) und nicht der Ursprungsserver von dieser Antwort betroffen.

-   Die Antwort sollte eine Erklärung im Text enthalten, die Einzelheiten zur rechtlichen Situation enthält.

**499 Client Close Request (Client-Anfrage zum Schließen)**

Nginx-spezifischer Antwortcode, um darauf hinzuweisen, dass die Verbindung vom Client unterbrochen wurde, während der Server noch immer diese Anfrage bearbeitet. Daher sendet der Server diesen Statuscode zurück.

-   Dies wird in [Enterprise Log Share](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) und den Statuscode-Analytics für Enterprise-Kunden angezeigt.
