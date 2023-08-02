---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/218411427-Cloudflare-Page-Rules-verstehen-und-konfigurieren-Tutorial-f%C3%BCr-Page-Rules-
title: Cloudflare Page Rules verstehen und konfigurieren (Tutorial für Page Rules) 
---

# Cloudflare Page Rules verstehen und konfigurieren (Tutorial für Page Rules) 



## Überblick

Sie können eine Page Rule definieren, um eine oder mehrere Aktionen auszulösen, wenn ein bestimmtes URL-Muster übereinstimmt. Page Rules sind in der App  **Rules** in der Registerkarte **Page Rules** verfügbar.

{{<Aside type="warning">}}
Page Rules erfordern einen „[mit
Proxy](/dns/manage-dns-records/reference/proxied-dns-records)"
markierten DNS-Eintrag, damit die Page Rule funktioniert. Page Rules
gelten nicht für Hostnamen, die nicht im DNS vorhanden sind oder nicht
an Cloudflare weitergeleitet werden.
{{</Aside>}}

Wie viele Page Rules standardmäßig zulässig sind, hängt vom Domain-Plan ab, wie im Folgenden dargestellt.

| **Tarif** | **Erlaubte Page Rules** |
| --- | --- |
| 
Free

 | 

3

 |
| 

Pro

 | 

20

 |
| 

Business

 | 

50

 |
| 

Enterprise

 | 

125

 |

Sie können [zusätzliche Regeln](https://www.cloudflare.com/features-page-rules/) für Domains in den Free, Pro und Business Plans erwerben (maximal 100).

___

## Vor den ersten Schritten

Es ist wichtig, zwei grundlegende Verhaltensweisen von Page Rules zu verstehen:

-   Nur die übereinstimmende Page Rule mit der höchsten Priorität wird bei einer Anfrage wirksam.
-   Die Page Rules werden im Cloudflare-Dashboard in absteigender Reihenfolge priorisiert, wobei die Regel mit der höchsten Priorität ganz oben steht.

{{<Aside type="tip">}}
Cloudflare empfiehlt, Ihre Regeln von der spezifischsten zur
allgemeinsten anzuordnen.
{{</Aside>}}

Bei einer Page Rule wird ein URL-Muster abgeglichen. Dabei gilt folgendes Format (zusammengesetzt aus fünf Segmenten): <scheme>://<hostname><:port>/<path>?<query\_string>

Eine URL mit diesen Segmenten sieht beispielsweise so aus:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

Die Segmente _scheme_ und _port_ sind optional. Wenn _scheme_ weggelassen wird, gilt die Regel für die Protokolle _http://_ und _https://_. Wenn kein _port_ angegeben ist, gilt die Regel für alle Ports.

Sie können eine Page Rule jederzeit deaktivieren. Solange eine Regel deaktiviert ist, werden keine Aktionen ausgelöst, aber die Regel wird immer noch in der App **Rules** in der Registerkarte **Page Rules** angezeigt, kann bearbeitet werden und wird bei der Anzahl der für Ihre Domain erlaubten Regeln berücksichtigt. Mit der Option _Als Entwurf speichern_ wird eine Page Rule erstellt, die standardmäßig deaktiviert ist.

___

## Eine Page Rule erstellen

Die Schritte zum Erstellen einer Page Rule sind:

1.  Melden Sie sich im Cloudflare Dashboard an.
2.  Wählen Sie die Domain aus, für die Sie die Page Rule hinzufügen möchten.
3.  Klicken Sie auf die App **Rules**.
4.  Klicken Sie in der Registerkarte **Page Rules** auf **Page Rule erstellen**. Das Dialogfeld _Page Rule für <Ihre Domain> erstellen_ wird geöffnet.
5.  Geben Sie unter **Wenn die URL übereinstimmt mit** die URL oder das URL-Muster ein, für das die Regel gelten soll. [_Weitere Informationen über den Platzhalterabgleich_](https://support.cloudflare.com/hc/de/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  6\. Klicken Sie als Nächstes unter **Dann sehen die Einstellungen folgendermaßen aus**: auf **+ Eine Einstellung hinzufügen** und wählen Sie die gewünschte Einstellung aus der Dropdown-Liste aus. Sie können mehr als eine Einstellung pro Regel hinzufügen. Weitere Informationen zu Einstellungen finden Sie [unten in der Zusammenfassung](https://support.cloudflare.com/hc/de/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ).
7.  Geben Sie in der Dropdown-Liste **Reihenfolge** die gewünschte Reihenfolge an: _Erste, Letzte_ oder _Benutzerdefiniert_.
8.  Klicken Sie zum Speichern auf eine der folgenden Optionen:
    -   **Als Entwurf speichern,** um die Regel zu speichern und deaktiviert zu lassen.
    -   **Speichern und bereitstellen**, um die Regel zu speichern und sofort zu aktivieren.

{{<Aside type="note">}}
**Hinweis:** Wir unterstützen keine Nicht-ASCII-Zeichen (z. B.
Punycode/Unicode-Domains) in den Page Rules. Stattdessen könnten Sie die
Zeichenfolge mit
dem [Punycode-Converter](https://www.punycoder.com/ "Punycode-Konverter")
als URL codieren. So wird es funktionieren.
{{</Aside>}}

{{<Aside type="tip">}}
Unter den [Empfohlenen Page
Rules](https://support.cloudflare.com/hc/de/articles/224509547 "Empfohlene Page Rules")
finden Sie Ideen zu den verschiedenen Arten von Page Rules, die Sie
erstellen können.
{{</Aside>}}

___

## Eine Page Rule bearbeiten

So ändern Sie eine bestehende Page Rule:

1.  Melden Sie sich im Cloudflare Dashboard an.
2.  Wählen Sie die Domain aus, für die Sie die Page Rule ändern möchten.
3.  Klicken Sie auf die App **Rules**.
4.  Suchen Sie in der Registerkarte **Page Rules** die Regel, die Sie bearbeiten möchten.
5.  Nehmen Sie die erforderlichen Änderungen wie folgt vor:
    -   Um eine Regel zu aktivieren oder zu deaktivieren, klicken Sie auf den **Ein/Aus**\-Schalter.
    -   Um das URL-Muster, die Einstellungen oder die Reihenfolge zu ändern, klicken Sie auf die Schaltfläche **Bearbeiten** (Schraubenschlüsselsymbol). Geben Sie im Dialogfeld die Informationen ein, die Sie ändern möchten.
    -   Um eine Regel zu entfernen, klicken Sie auf die Schaltfläche **Löschen** (x-Symbol) und bestätigen Sie im Dialogfeld **Bestätigen** mit **OK**.

___

## Platzhalterabgleich und Referenzierung verstehen

Mit dem Sternchen (\*) können Sie in jedem URL-Segment bestimmte Muster erkennen. Zum Beispiel würde


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/t*st</span></div></span></span></span></code></pre>{{</raw>}}

dies erkennen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_example.com/foo/\*_ stimmt nicht mit example.com/foo überein.  _example.com/foo\*_ aber schon.

### Hilfreiche Tipps

-   Damit sowohl _http_ als auch _https_ erfasst werden, schreiben Sie einfach _example.com_. Es ist nicht notwendig, _\*.example.com_ zu schreiben.
-   Um jede Seite einer Domain zu erfassen, schreiben Sie _example.com/\*_. Einfach nur _example.com_ zu schreiben, funktioniert nicht.
-   Um jede Seite einer Domain und ihrer Subdomains zu erfassen, schreiben Sie \*_example.com/\*_. Einfach nur _example.com_ zu schreiben, funktioniert nicht.
-   Ein Platzhalter (\*) in der URL einer Page Rule steht auch für null Zeichen und kann jeden Teil der URL einschließen, einschließlich der Abfragezeichenfolge.

### Refererenzierung des Platzhalterabgleichs

Sie können einen abgeglichenen Platzhalter später über die Syntax _$X_ referenzieren. _X_ gibt den Index eines glob-Musters an. Dabei repräsentiert $1 die erste Platzhalter-Übereinstimmung, $2 die zweite Platzhalter-Übereinstimmung und so weiter.

Dies ist besonders nützlich bei der Einstellung _Weiterleitungs-URL_. Zum Beispiel:

Sie könnten dies:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

weiterleiten an:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/$1/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

Diese Regel würde erkennen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://cloud.example.com/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

und am Ende weiterleiten an:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/cloud/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

Um ein literales _$_\-Zeichen in der Weiterleitungs-URL zu verwenden, setzen Sie einen Backslash (\\) davor: _\\$_.

{{<Aside type="warning">}}
Vermeiden Sie Weiterleitungen, bei der die Domain auf sich selbst als
Ziel verweist. Dies kann zu einem Fehler durch Endlos-Weiterleitung
führen, wodurch Ihre Website nicht mehr für Besucher bereitgestellt
werden kann.
{{</Aside>}}

___

## Zusammenfassung der Page-Rule-Einstellungen

Die Einstellungen steuern die Aktion, die Cloudflare ausführt, sobald eine Anfrage mit dem in einer Page Rule definierten URL-Muster übereinstimmt. Mit den Einstellungen können Sie mehrere Cloudflare-Features in mehreren Dashboard-Apps aktivieren und deaktivieren. Beachten Sie dazu Folgendes:

-   Einige Einstellungen erfordern für die Domain einen Pro, Business oder Enterprise Plan.
-   Sie können mehr als eine Einstellung angeben, die beim Auslösen der Regel angewendet werden soll.

Nachfolgend finden Sie die vollständige Liste der verfügbaren Einstellungen in der Reihenfolge, in der sie in der Benutzeroberfläche von **Cloudflare Page Rules** erscheinen.

| 
**Einstellung**

 | 

**Beschreibung**

 | 

**Tarife**

 |
| --- | --- | --- |
| 

Immer HTTPS verwenden

 | 

Aktivieren oder deaktivieren Sie das Feature **[Immer HTTPS verwenden](/ssl/edge-certificates/additional-options/always-use-https)** auf der Registerkarte **Edge-Zertifikate** in der **Cloudflare SSL/TLS**\-App. Wenn diese Option aktiviert ist, wird jede _http://_\-URL durch eine 301-Weiterleitung in _https://_ konvertiert.

Wenn diese Option nicht angezeigt wird, haben Sie kein aktives **Edge-Zertifikat**.

 | 

-   Alle

 |
| 

Auto Minify

 | 

Geben Sie an, welche Dateierweiterungen automatisch minimiert werden sollen. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/200168196).

 | 

-   Alle

 |
| 

Automatic HTTPS Rewrites

 | 

Aktivieren oder deaktivieren Sie das Feature **Cloudflare Automatic HTTPS Rewrites** auf der Registerkarte **Edge-Zertifikate** in der **Cloudflare SSL/TLS**\-App. [Mehr dazu hier](/ssl/edge-certificates/additional-options/automatic-https-rewrites).

 | 

-   Alle

 |
| 

Browser-Cache-TTL

 | 

Steuert, wie lange in Client-Browsern zwischengespeicherte Ressourcen gültig bleiben. Sowohl die Cloudflare-Benutzeroberfläche als auch die API verbieten die Einstellung der **Browser-Cache-TTL** auf _0_ für Nicht-Enterprise-Domains. [Mehr dazu hier](/cache/how-to/edge-browser-cache-ttl/).

 | 

-   Alle

 |
| 

Browserintegritätsprüfung

 | 

Der Browser des Besuchers wird auf Header überprüft, die mit Spammern oder bestimmten Bots in Verbindung gebracht werden. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/200170086).

 | 

-   Alle

 |
| 

Bypass Cache on Cookie

 | 

Der Cache wird umgangen und Ressourcen werden vom Ursprungsserver abgerufen, wenn ein regulärer Ausdruck mit einem in der Anfrage vorhandenen Cookie-Namen übereinstimmt.

Wenn Sie sowohl diese Einstellung als auch die Einstellung _Cache on Cookie_ zu derselben Page Rule hinzufügen, hat _Cache on Cookie_ Vorrang vor _Bypass Cache on Cookie_.

_Weitere Informationen zur eingeschränkten Unterstützung regulärer Ausdrücke finden Sie weiter unten._

 | 

-   Business
-   Enterprise

 |
| 

Cache nach Gerätetyp

 | 

Zwischengespeicherte Inhalte werden basierend auf dem Gerätetyp des Besuchers getrennt. [Mehr dazu hier.](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only)

 | 

-   Enterprise

 |
| 

Cache Deception Armor

 | 

Schutz vor Webcache-Betrugsangriffen, während statische Assets weiterhin zwischengespeichert werden können. Bei dieser Einstellung wird überprüft, ob die URL-Erweiterung mit dem zurückgegebenen _Inhaltstyp_ übereinstimmt. [Mehr dazu hier.](/cache/cache-security/cache-deception-armor/)

 | 

-   Alle

 |
| 

Cache-Schlüssel

 | 

Wird auch als _Custom Cache Key_ bezeichnet.

Hiermit kann man bei der Entscheidung, welche Ressourcen zwischengespeichert werden sollen, genau festlegen, welche Variablen berücksichtigt werden sollen. Auf diese Weise können Kunden anhand anderer Faktoren als der URL bestimmen, was zwischengespeichert werden soll. [Mehr dazu hier](/cache/how-to/cache-keys/).

 | 

-   Enterprise

 |
| 

Cache-Stufe

 | 

Wendet benutzerdefiniertes Caching basierend auf der ausgewählten Option an:

**Bypass**: Cloudflare speichert nicht im Cache.

**Keine Abfragezeichenfolge**: Liefert Ressourcen aus dem Cache, wenn keine Abfragezeichenfolge vorhanden ist.

**Abfragezeichenfolge ignorieren**: Liefert dieselbe Ressource an alle, unabhängig von der Abfragezeichenfolge.

**Standard**: Speichert alle statischen Inhalte mit einer Abfragezeichenfolge im Cache.

**Alles zwischenspeichern**: Behandelt alle Inhalte als statisch und speichert alle Dateitypen im Cache, nicht nur die [standardmäßig von Cloudflare zwischengespeicherten Inhalte](/cache/concepts/default-cache-behavior/#default-cached-file-extensions). Respektiert Cache-Header vom Ursprungswebserver, es sei denn, **Edge-Cache-TTL** ist ebenfalls in der Page Rule festgelegt. In Kombination mit **Edge-Cache-TTL** > _0_ entfernt **Alles zwischenspeichern** Cookies aus der Antwort des Ursprungswebservers.  


 | 

-   Alle

 |
| 

Cache on Cookie

 | 

Die Option _Alles zwischenspeichern_ (Einstellung _Cache-Stufe_) wird auf Grundlage eines Abgleichs regulärer Ausdrücke mit einem Cookie-Namen angewendet.

Wenn Sie sowohl diese Einstellung als auch _Bypass Cache on Cookie_ zu derselben Page Rule hinzufügen, hat _Cache on Cookie_ Vorrang vor _Bypass Cache on Cookie_.

 | 

-   Business
-   Enterprise

 |
| 

Cache-TTL nach Statuscode

 | 

Enterprise-Kunden können die Cache-Time-to-Live (TTL) auf der Grundlage des Antwortstatus des Ursprungs-Webservers festlegen. Die Cache-TTL bezieht sich auf die Dauer, die eine Ressource im Cloudflare-Netzwerk verbleibt, bevor sie als veraltet („stale“) markiert oder aus dem Cache entfernt wird. Statuscodes werden vom Ursprung einer Ressource zurückgegeben.   Das Festlegen der Cache-TTL auf der Grundlage des Antwortstatus überschreibt das Standard-Cache-Verhalten (Standard-Caching) für statische Dateien und überschreibt die vom Ursprungs-Webserver gesendeten Cache-Anweisungen. Um nicht-statische Assets zu cachen, legen Sie mit einer Page Rule die Cache-Stufe „Cache Everything“ (alles zwischenspeichern) fest. Die Einstellung von „no-store“ (nicht speichern) Cache-Control oder eine niedrige TTL (mit max-age/s-maxage) erhöht die Anfragen an die Ursprungs-Webserver und reduziert die Performance. [Mehr erfahren](https://support.cloudflare.com/hc/de/articles/360043842472-Configuring-cache-TTL-by-status-code).

 | 

-   Enterprise

 |
| 

Apps deaktivieren

 | 

Alle aktiven **Cloudflare-Apps** werden deaktiviert.

 | 

-   Alle

 |
| 

Performance deaktivieren

 | 

Deaktivierung von:

-   [Auto Minify](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   Alle

 |
| 

Railgun deaktivieren

 | 

Das Feature **Railgun** der Cloudflare **Speed**\-App wird deaktiviert.

 | 

-   Business
-   Enterprise

 |
| 

Sicherheit deaktivieren

 | 

Deaktivierung von:

-   [E-Mail-Adressenverschleierung](https://support.cloudflare.com/hc/articles/200170016)
-   [Durchsatzbegrenzung (ältere Version)](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [Serverseitige Ausschlüsse](https://support.cloudflare.com/hc/articles/200170036)
-   [URL (Zone) Lockdown](/waf/tools/zone-lockdown/)
-   [WAF-verwaltete Regeln (ältere Version)](https://support.cloudflare.com/hc/articles/200172016)

 |

-   Alle

 |
| 

Edge-Cache-TTL

 | 

Hier können Sie angeben, wie lange eine Ressource im Cloudflare-Edge-Netzwerk zwischengespeichert werden soll. _Edge Cache TTL_ ist in den Antwort-Headern nicht sichtbar. Die minimale _Edge Cache TTL_ hängt vom Tariftyp ab.

Free: 2 Stunden  
Pro: 1 Stunde  
Business: 1 Sekunde  
Enterprise: 1 Sekunde

 | 

-   Alle

 |
| 

E-Mail-Adressenverschleierung

 | 

Ein- oder Ausschalten des Features **Cloudflare-E-Mail-Verschleierung** der App **Cloudflare Scrape Shield**. [Mehr dazu hier.](https://support.cloudflare.com/hc/articles/200170016)

 | 

-   Alle

 |
| 

Umleitungs-URL

 | 

Leitet eine URL mithilfe einer _HTTP 301/302-Weiterleitung_ zu einer anderen weiter. _Siehe oben unter [Platzhalterabgleich und Referenzierung verstehen](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)._

 | 

-   Alle

 |
| 

Host-Header-Überschreibung

 | 

Einen bestimmten Host-Header anwenden. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/206652947).

 | 

-   Enterprise

 |
| 

IP Geolocation-Header

 | 

Cloudflare fügt einen _CF-IPCountry_\-HTTP-Header hinzu, der den Ländercode enthält, der dem Besucher entspricht.

 | 

-   Alle

 |
| 

Mirage

 | 

Ein- oder Ausschalten des Features **Cloudflare Mirage** der Cloudflare **Speed**\-App. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/200403554).

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

Opportunistic Encryption

 | 

Aktivieren oder deaktivieren Sie das Feature **Cloudflare Opportunistic Encryption** auf der Registerkarte **Edge-Zertifikate** in der **Cloudflare SSL/TLS**\-App. [Mehr dazu hier](/ssl/edge-certificates/additional-options/opportunistic-encryption).

 | 

-   Alle

 |
| Ursprungs-Cache-Steuerung | Die [Ursprungs-Cache-Steuerung](/cache/concepts/cache-control/) ist standardmäßig für Free-, Pro- und Business-Domains aktiviert und für Enterprise-Domains standardmäßig deaktiviert. | 

-   Alle

 |
| 

Ursprungsserver-Fehlerseite Pass-thru

 | 

Ein- oder Ausschalten von Cloudflare-Fehlerseiten, die aufgrund von vom Ursprungsserver gesendeten Problemen generiert werden. Wenn diese Einstellung aktiviert ist, werden vom Ursprung generierte Fehlerseiten angezeigt.

 | 

-   Enterprise

 |
| 

Polish

 | 

Optionen des Features **Polish** der Cloudflare **Speed**\-App anwenden. [Mehr dazu hier](/images/polish).

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

Query String Sort

 | 

Ein- oder Ausschalten der Neusortierung von Abfragezeichenfolgen. Wenn Abfragezeichenfolgen dieselbe Struktur haben, wird das Caching verbessert. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/206776797).

 | 

-   Enterprise

 |
| 

Resolve Override

 | 

Die Ursprungsadresse wird in den in dieser Einstellung angegebenen Wert geändert. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/206190798).

 | 

-   Enterprise

 |
| 

Starke ETags respektieren

 | 

Ein- oder Ausschalten von Byte-für-Byte-Äquivalenzprüfungen zwischen dem Cloudflare-Cache und dem Ursprungsserver. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/218505467).

 | 

-   Enterprise

 |
| 

Response Buffering

 | 

Ein- oder Ausschalten der Einstellung, ob Cloudflare auf die gesamte Datei vom Ursprungsserver warten soll, bevor es die Datei an den Website-Besucher weiterleitet. Standardmäßig sendet Cloudflare Pakete an den Client, sobald sie vom Ursprungsserver eintreffen.

 | 

-   Enterprise

 |
| 

Rocket Loader

 | 

Ein- oder Ausschalten von **Cloudflare Rocket Loader** in der Cloudflare-App **Speed****.** [Mehr dazu hier.](https://support.cloudflare.com/hc/articles/200168056)

 | 

-   Alle

 |
| 

Sicherheitsstufe

 | 

Steuern Sie die Optionen des Features **Sicherheitsstufe** über die **Sicherheits**\-App. [Mehr erfahren](https://support.cloudflare.com/hc/articles/200170056).

 | 

-   Alle

 |
| 

Serverseitige Ausschlüsse

 | 

Ein- oder Ausschalten der Funktion **Serverseitige Ausschlüsse** der Cloudflare **Scrape-Shield**\-App. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/200170036).

 | 

-   Alle

 |
| 

SSL

 | 

Steuern Sie Optionen für das Feature **SSL** auf der Registerkarte **Edge-Zertifikate** in der Cloudflare **SSL/TLS**\-App. [Mehr erfahren](/ssl/origin-configuration/ssl-modes).

 | 

-   Alle

 |
| 

True-Client-IP-Header

 | 

Ein- oder Ausschalten der Funktion **True-Client-IP-Header** der Cloudflare **Netzwerk**\-App. [Mehr dazu hier](https://support.cloudflare.com/hc/articles/206776727).

 | 

-   Enterprise

 |
| 

Web Application Firewall (ältere Version)

 | 

Aktivieren oder deaktivieren Sie die **WAF-verwalteten Regeln**, wie unter **Sicherheit** > **WAF** > **Verwaltete Regeln** definiert. [Mehr erfahren](https://support.cloudflare.com/hc/articles/200172016).

Sie können einzelne WAF-verwaltete Regeln nicht über Page Rules aktivieren oder deaktivieren.

 | 

-   Pro
-   Business
-   Enterprise

 |

___

## Bekannte Probleme

**Problem bei der Konfiguration von Page Rules führt zu** „**_Fehler 500 (Interner Serverfehler)_****“**

**Grundlegende Ursache:** Dies kann auf ein Konfigurationsproblem bei einer Page Rule zurückzuführen sein. Wenn Sie eine Page Rule erstellen, die zwei Platzhalter verwendet, wie z. B. eine _URL-Weiterleitungsregel_, ist es möglich, eine Regel zu erstellen, die den zweiten Platzhalter mit dem Platzhalter $2 erwähnt. Siehe das folgende Beispiel:

![Beispiel für die Konfiguration einer Page Rule mit zwei Platzhaltern. Die Weiterleitungs-URL enthält eine Wildcard $2, die durch den Inhalt ersetzt wird, auf den die zweite ](/images/support/page-rule-create.png)

Wenn Sie dieselbe Regel aktualisieren, können Sie eine Wildcard im Feld **Wenn die URL übereinstimmt** entfernen und die Regel speichern. Siehe das folgende Beispiel:

![Konfiguration der fehlerhaften Page Rule mit einer einzelnen Wildcard zutrifft, wobei jedoch weiterhin die Wildcard $2 in der Weiterleitungs-URL verwendet wird. Die Konfiguration sorgt dafür, ](/images/support/page-rule-update.png)

Wenn Sie dies tun, verweist der Platzhalter $2 auf eine Wildcard, die nicht mehr existiert, sodass ein „_Error 500 (Internal server error)_“ ausgegeben wird, wenn eine URL die Page Rule auslöst.

**Lösung**: Aktualisieren Sie die Page Rule und entfernen Sie den Verweis _$2_ auf die zweite Wildcard. Wenn es nur einen Platzhalter gibt, dann kann nur _$1_ verwendet werden.

___

## Zusätzliche Details

### Einstellung Bypass Cache on Cookie

Diese Einstellung ist für Business- und Enterprise-Kunden verfügbar.

Die Einstellung **Bypass Cache on Cookie** unterstützt einfache reguläre Ausdrücke (Regex) in dieser Form:

-   Einen Pipe-Operator (dargestellt durch |), um mehrere Cookies mit boolescher _ODER_\-Logik abzugleichen. Beispielsweise würde bypass=.\*_|PHPSESSID=.\*_ den Cache umgehen, wenn entweder ein Cookie namens „bypass“ oder „PHPSESSID“ gesetzt würde, unabhängig vom Wert des Cookies.
-   Den Platzhalter-Operator (dargestellt durch .\*). Der Wert „t.\*st=“ in einer Regel würde also sowohl ein Cookie namens „test“ als auch ein Cookie namens „teeest“ erkennen.

Zu den Einschränkungen gehören:

-   150 Zeichen pro Cookie-Regex
-   12 Platzhalterzeichen pro Cookie-Regex
-   1 Platzhalterzeichen zwischen jedem Pipe-Zeichen (|) im Cookie-Regex

In den folgenden Artikeln erfahren Sie, wie Sie **Bypass-Cache on Cookie** auf verschiedenen Plattformen konfigurieren:

-   [Caching anonymer Seitenaufrufe mit WordPress oder WooCommerce](https://support.cloudflare.com/hc/articles/236166048)
-   [Caching anonymer Seitenaufrufe mit Magento 1 und Magento 2](https://support.cloudflare.com/hc/articles/236168808)
-   [Wie speichere ich statisches HTML im Cache?](https://support.cloudflare.com/hc/articles/202775670)

**Hinweis:** Wenn Sie sowohl diese Einstellung als auch die Einstellung _Cache on Cookie_ (nur Enterprise) in dieselbe Page Rule aufnehmen, hat _Cache on Cookie_ Vorrang vor _Bypass Cache on Cookie_.

### Zonennamen müssen mit einem Schrägstrich enden

Beim Speichern einer Page Rule stellt Cloudflare sicher, dass nach jedem Vorkommen des aktuellen Zonennamens im Feld **Wenn die URL übereinstimmt** ein Schrägstrich steht. Wenn der aktuelle Zonenname zum Beispiel `example.com` lautet, dann:

-   wird `example.com` als `example.com/` gespeichert
-   `example.com/path/example.com` wird als `example.com/path/example.com/` gespeichert

Beachten Sie, dass `example.com/some-path/cloudflare.com` _ohne_ einen abschließenden Schrägstrich gespeichert wird, da der Zonenname nicht `cloudflare.com` lautet.

### Von Page Rules unterstützte Netzwerkports

Wenn Sie einen Port im Page-Rule-Feld **Wenn die URL übereinstimmt** angeben, muss es sich um einen der folgenden Ports handeln:

-   Einer der HTTP/HTTPS-Ports, die [mit dem Proxy von Cloudflare kompatibel](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy) sind.
-   Ein benutzerdefinierter Port einer [Cloudflare Spectrum](/spectrum/) HTTPS-Anwendung.

### Page Rules mit Workers verwenden

Wenn die URL der aktuellen Anfrage sowohl mit einer Page Rule als auch mit einer [benutzerdefinierten Route von Workers](/workers/platform/routes) übereinstimmt, werden einige Einstellungen der Page Rules nicht angewendet. Einzelheiten zur Verwendung von Page Rules mit Workers finden Sie unter [Workers: Page Rules in der Dokumentation für Entwickler](/workers/configuration/workers-with-page-rules/).

___

## Verwandte Ressourcen

-   [Empfohlene Page Rules](https://support.cloudflare.com/hc/articles/224509547)
-   [Welche Subdomains eignen sich für orangefarbene bzw. graue Wolken?](https://support.cloudflare.com/hc/de/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [Wie verwende ich „Alles zwischenspeichern“ mit Cloudflare?](https://support.cloudflare.com/hc/articles/202775670)
-   [Wie speichere ich statisches HTML im Cache?](https://support.cloudflare.com/hc/articles/200172256)
-   [Offline-Fehlermeldung beim Aktualisieren oder beim Zugriff auf den Admin-Bereich meines Content Management Systems](https://support.cloudflare.com/hc/articles/200169526)
