---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/203118044-Sammeln-von-Informationen-zur-Fehlerbehebung-bei-Website-Problemen
title: Sammeln von Informationen zur Fehlerbehebung bei Website-Problemen 
---

# Sammeln von Informationen zur Fehlerbehebung bei Website-Problemen 



## Übersicht

Es ist wichtig, zur Diagnose eines Problems so viele Informationen wie möglich zu sammeln und [dem Cloudflare-Support angemessene Details zu liefern](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16). In diesem Artikel wird erklärt, wie Sie Informationen zur Fehlerbehebung sammeln, die vom Cloudflare-Support häufig verlangt werden.

{{<Aside type="note">}}
Aus Gründen der Sicherheit und der Haftung kann der Cloudflare-Support
keine Konfigurationsänderungen im Auftrag von Kunden vornehmen.
{{</Aside>}}

___

## Erstellen einer HAR-Datei

In einem HTTP-Archiv (HAR) werden alle Web-Browser-Anfragen gespeichert, einschließlich der Anfrage- und Antwort-Header, des Inhalts und der Seitenladedauer.

{{<Aside type="warning">}}
Eine HAR-Datei kann vertrauliche Informationen wie Passwörter,
Zahlungsinformationen und private Schlüssel enthalten. Beseitigen Sie
sensible Informationen aus einer HAR-Datei manuell mit einem
Text-Editor, bevor Sie die Datei dem Cloudflare-Support zur Verfügung
stellen.
{{</Aside>}}

Gegenwärtig können nur Chrome und Firefox standardmäßig auf das HAR-Feature zugreifen. Andere Browser erfordern entweder eine Erweiterung oder können keine HAR-Datei erstellen. Befolgen Sie bei der Installation einer Browser-Erweiterung die Anweisungen des Anbieters der Erweiterung.

1\. Klicken Sie auf einer Browser-Seite die rechte Maustaste an und wählen Sie **Element untersuchen**.

2\. Die Entwickler-Tools erscheinen entweder unten oder an der linken Seite des Browsers. Klicken Sie die Registerkarte **Netzwerk** an. ![gathering_har_file_network.png](/images/support/gathering_har_file_network.png)

3\. Markieren Sie **Protokoll erhalten**.

4\. Klicken Sie auf „Aufzeichnen“.

 ![gathering_har_file_record.png](/images/support/gathering_har_file_record.png)

5\. Browsen Sie zu der URL, die Probleme verursacht. Sobald das Problem auftritt, klicken Sie mit der rechten Maustaste auf eines der Elemente in der Registerkarte **Netzwerk** und wählen Sie **Alles als HAR mit Inhalt speichern**.

 ![save_har_with_content.png](/images/support/save_har_with_content.png)

 6. Fügen Sie die HAR-Datei an Ihr Support-Ticket an.

1\. Wählen Sie aus dem Anwendungsmenü **Tools** > **Web Developer** > **Netzwerk** oder drücken Sie _Ctrl+Shift+I_ (Windows/Linux) bzw. _Cmd+Option+I_ (OS X).

2\. Browsen Sie zu der URL, die Probleme verursacht.

3\. Nachdem das Problem dupliziert wurde, klicken Sie die rechte Maustaste an und wählen Sie **Alles als HAR speichern**.

1\. Navigieren Sie zu den **Entwickler-Tools** (verwenden Sie _F12_ als Tastenkürzel) und wählen Sie die Registerkarte **Netzwerk**.

2\. Browsen Sie zu der URL, die Probleme verursacht.

3\. Nachdem das Problem dupliziert wurde, klicken Sie auf **Als HAR exportieren** und danach auf **Speichern unter...**.

1\. Achten Sie darauf, dass in Safari ein Menü **Entwickeln** oben im Browser-Fenster erscheint. Andernfalls gehen Sie zu **Safari** > **Einstellungen** > **Erweitert** und wählen Sie **Entwickeln-Menü in Menüleiste anzeigen**.

2\. Navigieren Sie zu **Entwickeln** > **Web Inspector anzeigen**.

3\. Browsen Sie zu der URL, die Probleme verursacht.

4\. Halten Sie Strg gedrückt, klicken Sie auf eine Ressource in Web Inspector, und klicken Sie dann auf **HAR exportieren**.

___

## Identifizieren des Cloudflare-Rechenzentrums für Ihre Anfrage

[Eine Karte unserer Rechenzentren](https://www.cloudflare.com/network-map) wird nach Kontinent sortiert auf der [Cloudflare-Statusseite](https://www.cloudflarestatus.com/) angezeigt. Bei dem Drei-Buchstaben-Code hinter dem Namen des Rechenzentrums handelt es sich um den [IATA-Code](http://en.wikipedia.org/wiki/IATA_airport_code) des nächsten größeren internationalen Flughafens. Um das Cloudflare-Rechenzentrum zu ermitteln, das Anfragen für Ihren Browser verarbeitet, gehen Sie zu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  http://www.example.com/cdn-cgi/trace </span></div></span></span></span></code></pre>{{</raw>}}

Ersetzen Sie _www.example.com_ durch Ihren Domain- und Hostnamen.  Beachten Sie das **Colo**\-Feld der Ausgabe.

___

## Fehlerbehebung von Anfragen mit cURL

cURL ist ein Befehlszeilentool zum Senden von HTTP/HTTPS-Anfragen und ist nützlich für die Fehlerbehebung bei:

-   HTTP/HTTPS-Performance
-   HTTP-Fehlermeldungen
-   HTTP-Headern
-   APIs
-   Vergleich von Server-/Proxyantworten
-   SSL-Zertifikaten

{{<Aside type="note">}}
cURL ist standardmäßig nicht in Windows installiert und erfordert einen
[Installationsassistenten](http://curl.haxx.se/dlwiz/).
{{</Aside>}}

Führen Sie den folgenden Befehl aus, um eine Standard-HTTP-GET-Anfrage an Ihre Website zu senden (ersetzen Sie _www.example.com_ durch Ihren Domain- und Hostnamen):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null http://www.example.com/</span></div></span></span></span></code></pre>{{</raw>}}

Bei diesem cURL-Befehlsbeispiel wird eine Ausgabe mit den HTTP-Antwort- und Anfrage-Headern zurückgegeben, jedoch wird die Seitentextausgabe verworfen. Die cURL-Ausgabe bestätigt die HTTP-Antwort und gibt an, ob Cloudflare gegenwärtig Datenverkehr für die Site als Proxy weiterleitet. Die Anwesenheit des **CF-RAY**\-Headers in der Antwort bestätigt, dass die Anfrage über den Cloudflare-Proxy geleitet wurde:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CF-Ray: 5097b5640cad8c56-LAX</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
In den [cURL-Befehlsoptionen](https://curl.haxx.se/docs/manpage.html)
finden Sie Informationen zu weiteren Funktionalitäten.
{{</Aside>}}

Erweitern Sie die nachstehenden Abschnitte für Tipps zur Fehlerbehebung bei HTTP-Fehlern, Performance, Caching und SSL/TLS-Zertifikaten:

Bei der Behebung von HTTP-Fehlern in Antworten von Cloudflare sollten Sie prüfen, ob Ihr Ursprung die Fehler durch direktes Senden von Anfragen an Ihren Ursprungswebserver verursacht hat. Zur Behebung von HTTP-Fehlern sollten Sie eine cURL direkt an die IP-Adresse Ihres Ursprungswebservers senden (unter Umgehung von Cloudflares Proxy):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --Header &quot;Host: example.com&quot; http://203.0.113.34/</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
Wenn Sie mehrere Ursprungswebserver haben, sollten Sie jeden einzelnen
testen, um sicherzugehen, dass es keine Unterschiede bei den Antworten
gibt. Wenn Sie das Problem bei direkter Verbindung mit Ihrem
Ursprungswebserver bemerken, wenden Sie sich für Hilfe bitte an Ihren
Hosting-Provider.
{{</Aside>}}

Wenn Sie zum Beispiel bei Datenverkehr, der über den Cloudflare-Proxy weitergeleitet wird, einen [HTTP-520-Fehler](https://support.cloudflare.com/hc/articles/115003011431#520error) erhalten, sollten Sie eine cURL zum Ursprungswebserver ausführen, um zu überprüfen, ob leere Antworten gesendet werden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --resolve www.example.com:80:203.0.113.34 http://www.example.com/* Added www.example.com:80:203.0.113.34 to DNS cache* Hostname www.example.com was found in DNS cache* Trying 203.0.113.34...* Connected to www.example.com (127.0.0.1) port 80 (#0)&gt; GET / HTTP/1.1&gt; Host: www.example.com&gt; User-Agent: curl/7.43.0&gt; Accept: */*&gt;* Empty reply from server</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
Benutzen Sie beim Testen von HTTPS das Flag *\--insecure*, um die
Überprüfung des von Ihrem Ursprungswebserver vorgelegten SSL-Zertifikats
zu überspringen, soweit Sie kein gültiges Zertifikat haben, das von
einer echten Zertifizierungsstelle installiert wurde.
{{</Aside>}}

cURL misst die Latenz oder Performance-Verschlechterung für HTTP/HTTPS-Anfragen über die cURL-Optionen [_\-w_ oder _\--write-out_](https://curl.haxx.se/docs/manpage.html#-w). Beim unten stehenden cURL-Beispiel werden mehrere Performance-Vektoren bei der Anfragen-Transaktion gemessen, z. B. Dauer von TLS-Handshakes, DNS-Lookup, Umleitungen, Übertragungen usw.:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://example.com/ -w &quot;\nContent Type: %{content_type} \\nHTTP Code: %{http_code} \\nHTTP Connect:%{http_connect} \\nNumber Connects: %{num_connects} \\nNumber Redirects: %{num_redirects} \\nRedirect URL: %{redirect_url} \\nSize Download: %{size_download} \\nSize Upload: %{size_upload} \\nSSL Verify: %{ssl_verify_result} \\nTime Handshake: %{time_appconnect} \\nTime Connect: %{time_connect} \\nName Lookup Time: %{time_namelookup} \\nTime Pretransfer: %{time_pretransfer} \\nTime Redirect: %{time_redirect} \\nTime Start Transfer: %{time_starttransfer} \\nTime Total: %{time_total} \\nEffective URL: %{url_effective}\n&quot; 2&gt;&amp;1</span></div></span></span></span></code></pre>{{</raw>}}

[Eine Erklärung zu dieser Timing-Ausgabe](https://blog.cloudflare.com/a-question-of-timing/) finden Sie im Cloudflare-Blog.

{{<Aside type="tip">}}
Wie das vorhergehende Beispiel zeigt, lassen sich sauberere Ergebnisse
erzielen, wenn eine neue Zeile mit **\\n** vor jeder Variablen
gekennzeichnet wird. Andernfalls werden alle Metriken zusammen in einer
einzigen Zeile dargestellt.
{{</Aside>}}

cURL hilft, die HTTP-Antwort-Header zu überprüfen, von denen das Zwischenspeichern beeinflusst wird. Insbesondere sollten Sie bei der Behandlung von Problemen mit Cloudflare-Caching mehrere HTTP-Header überprüfen:

-   CF-Cache-Status
-   Cache-control/Pragma
-   Expires
-   Last-Modified
-   S-Maxage

{{<Aside type="note">}}
Näheres zu [Cloudflares
Cachingverhalten](https://support.cloudflare.com/hc/articles/202775670)
finden Sie im Cloudflare Hilfe-Center.
{{</Aside>}}

#### Überprüfung von Zertifikaten mit cURL

Der folgende cURL-Befehl zeigt das SSL-Zertifikat, das von Cloudflare während einer HTTPS-Anfrage vorgelegt wird (ersetzen Sie _www.example.com_ durch Ihren Domain- und Hostnamen):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://www.example.com/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
2*\>&1 \| egrep -v \"\^{.\*\$\|\^}.\*\$\|\^\\\* http.\*\$\" *bereinigt
und analysiert die Informationen zu TLS-Handshake und Zertifikat.
{{</Aside>}}

Überprüfen Sie das Ursprungszertifikat (falls installiert) und ersetzen Sie _203.0.113.34_ durch die tatsächliche IP-Adresse Ihres Ursprungswebservers und _www.example.com_ durch Ihren Domain- und Hostnamen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --Header &quot;Host: www.example.com&quot; http://203.0.113.34/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Test von TLS-Versionen

Bei der Behandlung von Problemen des Browser-Supports oder bei der Bestätigung der unterstützten TLS-Versionen können Sie mit cURL eine spezifische TLS-Version testen, indem Sie eine der folgenden Optionen zu Ihrer cURL hinzufügen:

-   \--tlsv1.0
-   \--tlsv1.1
-   \--tlsv1.2
-   \--tlsv1.3

___

## Vorübergehende Deaktivierung von Cloudflare

Deaktivieren Sie Cloudflare vorübergehend, um Datenverkehr direkt an Ihren Ursprungswebserver anstatt an Cloudflares Reverse-Proxy zu senden. Für gestoppte Domains sind keine Cloudflare-Services wie SSL oder WAF aktiviert.  Als Alternative zum globalen Stopp von Cloudflare können die Datensätze, die Datenverkehr in Ihrer Cloudflare-**DNS**\-App empfangen, mit einer [grauen Wolke](https://support.cloudflare.com/hc/articles/200169626) markiert werden.

{{<Aside type="tip">}}
Bei der Behandlung von Problemen beim Caching kann als Alternative zum
Stoppen von Cloudflare der
[Entwicklungsmodus](https://support.cloudflare.com/hc/articles/200168246)
verwendet werden, bei dem nur Cloudflares Cache umgangen wird.
{{</Aside>}}

So deaktivieren Sie Cloudflare vorübergehend:

1.  Navigieren Sie im Cloudflare Dashboard zur Registerkarte **Übersicht**.
2.  Klicken Sie auf **Cloudflare auf der Website aussetzen** unten rechts auf der Seite unter **Erweiterte Aktionen**.

{{<Aside type="note">}}
Es dauert maximal 5 Minuten, um Cloudflare anzuhalten, und diese
Vorgehensweise sollte der Änderung Ihrer Nameserver vorgezogen werden,
weil die Änderung der Nameserver Propagierungsverzögerungen von mehreren
Stunden bewirken kann.
{{</Aside>}}

___

## Ausführung eines Traceroute

Traceroute ist ein Netzwerk-Diagnosetool, das die Routing-Latenz von Paketen in einem Netzwerk misst. Die meisten Betriebssysteme unterstützen den _Traceroute_\-Befehl. Wenn Sie Konnektivitätsprobleme mit Ihrer über den Cloudflare-Proxy geleiteten Website haben und den [Cloudflare-Support um Hilfe bitten](https://support.cloudflare.com/hc/articles/200172476), ist es wichtig, dass Sie dabei die Ausgabe einer Traceroute-Ausführung vorlegen.

{{<Aside type="tip">}}
Timeouts sind für Ping-Ergebnisse möglich, weil Cloudflare Ping-Anfragen
begrenzt.
{{</Aside>}}

Nachfolgend finden Sie die Anweisungen zur Ausführung von Traceroute auf verschiedenen Betriebssystemen. Ersetzen Sie in den Beispielen _www.example.com_ durch Ihren Domain- und Hostnamen:

1.  Öffnen Sie das **Startmenü**.
2.  Klicken Sie auf **Ausführen**.
3.  Um die Befehlszeilenschnittstelle zu öffnen, geben Sie **cmd** ein und klicken Sie dann auf **OK**.
4.  Geben Sie bei der Eingabeaufforderung Folgendes ein:  
    Für IPv4:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
    Für IPv6:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert -6 www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Drücken Sie auf **Enter**.
6.  Sie können die Ergebnisse zum Speichern in eine Datei kopieren oder in ein anderes Programm einfügen.

1.  Öffnen Sie ein Terminalfenster.
2.  Geben Sie bei der Eingabeaufforderung Folgendes ein:  
    Für IPv4:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
    Für IPv6:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute -6 www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  Sie können die Ergebnisse zum Speichern in eine Datei kopieren oder in ein anderes Programm einfügen.

1.  Öffnen Sie die Anwendung **Netzwerkdienstprogramm**.
2.  Klicken Sie auf die Registerkarte **Traceroute**.
3.  Geben Sie die _Domain-_ oder _IP-Adresse_ in das entsprechende Eingabefeld ein und klicken Sie auf **Trace**.
4.  Sie können die Ergebnisse zum Speichern in eine Datei kopieren oder in ein anderes Programm einfügen.

Alternativ können Sie bei Verwendung des Mac-OS-Terminalprogramms auch die oben beschriebenen Traceroute-Anweisungen für Linux befolgen.

___

## Hinzufügen des CF-RAY-Headers zu Ihren Protokollen

Der **CF-RAY**\-Header verfolgt eine Website-Anfrage durch das Cloudflare-Netzwerk. Geben Sie bei einer Fehlerbehebung den **CF-RAY** einer Website-Anfrage an den Cloudflare-Support weiter. Sie können **CF-RAY** auch zu Ihren Protokollen hinzufügen, wenn Sie die Konfiguration Ihres Ursprungswebservers mit dem folgenden Ausschnitt bearbeiten, der der Marke Ihres Webservers entspricht:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t \&quot;%r\&quot; %&gt;s %b \&quot;%{Referer}i\&quot; \&quot;%{User-agent}i\&quot; %{CF-Ray}i&quot; cf_custom</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">log_format cf_custom '$remote_addr - $remote_user [$time_local]  ''&quot;$request&quot; $status $body_bytes_sent ''&quot;$http_referer&quot; &quot;$http_user_agent&quot; ''$http_cf_ray';</span></div></span></span></span></code></pre>{{</raw>}}

___

## Verwandte Ressourcen

-   [Kontaktaufnahme mit dem Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476)
-   [Behebung von Cloudflare-HTTP-5XX-Fehlern](https://support.cloudflare.com/hc/articles/115003011431)
-   [Diagnose von Netzwerkproblemen mit MTR und Traceroute](https://www.digitalocean.com/community/tutorials/how-to-use-traceroute-and-mtr-to-diagnose-network-issues)
-   [cURL-Befehlszeilentool](https://curl.haxx.se/)
