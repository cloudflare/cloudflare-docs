---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200170786-Wiederherstellen-von-urspr%C3%BCnglichen-Besucher-IPs
title: Wiederherstellen von ursprünglichen Besucher-IPs
---

# Wiederherstellen von ursprünglichen Besucher-IPs



## Überblick

{{<Aside type="warning">}}
Cloudflare aktualisiert und unterstützt *mod\_cloudflare* ab Version
**Debian 9** und **Ubuntu 18.04 LTS** des Linux-Betriebssystems nicht
mehr. Wir empfehlen jetzt
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
für Kunden, die Apache-Webserver verwenden. Kunden, die das
*mod\_cloudflare* Package zusammenstellen möchten, können die [Codebasis
von GitHub herunterladen](https://github.com/cloudflare/mod_cloudflare).
{{</Aside>}}

Wenn Ihr [Website-Traffic durch das Cloudflare-Netzwerk geroutet wird](https://support.cloudflare.com/hc/articles/205177068), fungieren wir als Reverse-Proxy. Dadurch kann Cloudflare die Seitenladezeiten verringern, weil Pakete effizienter geroutet und statische Ressourcen (Bilder, JavaScript, CSS usw.) zwischengespeichert werden. Wenn Sie also auf Anfragen antworten und diese protokollieren, gibt Ihr Ursprungsserver eine [Cloudflare-IP-Adresse](https://www.cloudflare.com/ips/) zurück.

Wenn Sie zum Beispiel Anwendungen installieren, die die eingehende IP-Adresse des ursprünglichen Besuchers brauchen, wird standardmäßig eine Cloudflare-IP-Adresse protokolliert. Die IP-Adresse des ursprünglichen Besuchers erscheint in einem angefügten HTTP-Header mit der Bezeichnung [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986). Wenn Sie unsere [Webserver-Anleitung](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq) befolgen, können Sie die ursprüngliche Besuchs-IP-Adresse auf Ihrem Ursprungsserver protokollieren. Ist dieser HTTP-Header nicht verfügbar, wenn Anfragen Ihren Ursprungsserver erreichen, überprüfen Sie Ihre [Transform Rules](/rules/transform/) und [Managed Transforms](/rules/transform/managed-transforms/)\-Konfiguration.

Das folgende Diagramm zeigt die verschiedenen Arten, wie IP-Adressen mit und ohne Cloudflare behandelt werden.

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### Überblick

Cloudflare aktualisiert und unterstützt _mod\_cloudflare_ nicht mehr.Wenn Sie jedoch einen Apache-Webserver mit einem Betriebssystem wie **Ubuntu Server 18.04** und **Debian 9 Stretch** verwenden, können Sie _mod\_remoteip_ verwenden, um die ursprüngliche IP-Adresse Ihres Besuchers zu protokollieren.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Da dieses Modul von einer externen Partei erstellt wurde, können wir keinen technischen Support für Probleme mit dem Plug-in geben.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Zur Installation von _mod\_remoteip_ auf Ihrem Apache-Webserver:

1\. Aktivieren Sie _mod\_remoteip_ durch den folgenden Befehl:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\. Aktualisieren Sie die Website-Konfiguration, um RemoteIPHeader _CF-Connecting-IP_ einzuschließen, z. B. `/etc/apache2/sites-available/000-default.conf`


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\. Update kombiniert _LogFormat_\-Eintrag in `apache.conf`, _%h_ durch _%a in_ ersetzt in `/etc/apache2/apache2.conf.` Wenn Ihr aktuelles _LogFormat_ zum Beispiel wie folgt aussieht


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

würden Sie _LogFormat_ wie folgt aktualisieren:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. Definieren Sie vertrauenswürdige Proxy-Adressen durch Erstellen von `/etc/apache2/conf-available/remoteip.conf`, indem Sie folgenden Code und [Cloudflare-IPs](https://www.cloudflare.com/ips/) eingeben:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (example IP address)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (example IP address)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repeat for all Cloudflare IPs listed at [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. Aktivieren Sie die Apache-Konfiguration:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Enabling conf remoteip.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Um die neue Konfiguration zu aktivieren, müssen Sie Folgendes ausführen:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reload</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. Testen Sie die Apache-Konfiguration:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Syntax OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. Starten Sie Apache neu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Weitere Informationen zu *mod\_remoteip* , finden Sie in der
[Apache-Dokumentation](https://httpd.apache.org/docs/2.4/mod/mod_remoteip.html "Apache Module mod_remoteip").
{{</Aside>}}

___

## mod\_cloudflare.

{{<Aside type="warning">}}
Cloudflare aktualisiert und unterstützt *mod\_cloudflare* ab Version
**Debian 9** und **Ubuntu 18.04 LTS** des Linux-Betriebssystems nicht
mehr. Wir empfehlen jetzt
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
für Kunden, die Apache-Webserver verwenden. Kunden, die das
*mod\_cloudflare* Package zusammenstellen möchten, können die [Codebasis
von GitHub herunterladen](https://github.com/cloudflare/mod_cloudflare).
{{</Aside>}}


Sie können mod\_cloudflare auf zwei Arten installieren: indem Sie die Apache-Erweiterung von GitHub herunterladen oder indem Sie Code zu Ihrem Ursprungs-Webserver hinzufügen.

### Pakete oder Skripte von GitHub herunterladen

Wenn Sie einen Apache-Webserver verwenden, können Sie mod\_cloudflare von [GitHub](https://github.com/cloudflare/mod_cloudflare) herunterladen.

### Hinzufügen von Code zu Ihrem Ursprungswebserver

Wenn Sie mod\_cloudflare nicht installieren können oder kein Cloudflare-Plug-in für Ihre Content-Management-System-Plattform verfügbar ist, um die IP des ursprünglichen Besuchers wiederherzustellen, fügen Sie diesen Code zu Ihrem Ursprungswebserver in oder vor dem <body> Tag auf einer Seite hinzu, die die IPs des ursprünglichen Besuchers benötigt:

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>`

Dieser Befehl macht die IP-Adresse nur für Skripte verfügbar, die sie brauchen. Die IPs werden nicht in Ihren eigentlichen Server-Protokollen gespeichert.

### Apache

Um _mod\_cloudflare_ zu entfernen, müssen Sie die Apache-Konfigurationszeile, die _mod\_cloudflare_ lädt, auskommentieren.

Dies ist je nach Linux-Distribution unterschiedlich, aber die meisten Nutzer sollten `in /etc/apache2` suchen können, um die folgende Zeile zu finden:

`LoadModule cloudflare_module`

Markieren Sie diese Zeile als Kommentar oder entfernen Sie sie. Wenn Sie dann Apache neu starten, sollte _mod\_cloudflare_ nicht mehr vorhanden sein.

Bei Ubuntu oder Debian sollten Sie Folgendes sehen:

`file/etc/apache2/mods-enabled/cloudflare.load`

Löschen Sie diese Datei, um _mod\_cloudflare_ zu entfernen, und starten Sie dann Apache neu.

### Nginx

Mod\_cloudflare wird durch Änderung der [nginx-Konfigurationsdatei](http://nginx.org/en/docs/http/ngx_http_realip_module.html)`nginx.conf` mit dem `ngx_http_realip_module` installiert.

Um _mod\_cloudflare_ zu entfernen, müssen Sie diese Zeile als Kommentar markieren oder entfernen. Wenn Sie dann nginx neu starten, _sollte mod\_cloudflare nicht mehr vorhanden sein__._

{{<Aside type="note">}}
Um *mod\_cloudflare* von anderen Webservertypen zu entfernen, sehen Sie
bitte in Ihrer Webserver-Dokumentation nach, wie Module entfernt werden.
{{</Aside>}}

___

## Anweisungen für Webserver

Im Folgenden finden Sie Anweisungen, wie Sie Ihren Webserver so konfigurieren, dass er die IPs der ursprünglichen Besucher auf der Grundlage Ihres Webservers protokolliert:

{{<Aside type="warning">}}
Cloudflare aktualisiert und unterstützt *mod\_cloudflare* ab Version
**Debian 9** und **Ubuntu 18.04 LTS** des Linux-Betriebssystems nicht
mehr. Wir empfehlen jetzt
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
für Kunden, die Apache-Webserver verwenden. Kunden, die das
*mod\_cloudflare* Package zusammenstellen möchten, können die [Codebasis
von GitHub herunterladen](https://github.com/cloudflare/mod_cloudflare).
{{</Aside>}}

1.  Stellen Sie sicher, dass Folgendes installiert ist:
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.  Klonen Sie Folgendes, um die aktuellste Version von _mod\_cloudflare_ zu erhalten:
    -   Red Hat/Fedora/Debian/Ubuntu:`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Konvertieren Sie die .c-Datei mit dem Apache-Erweiterungstool in ein Modul:
    -   Red Hat/Fedora/Debain/Ubuntu:`apxs -a -i -c mod_cloudflare.c`
4.  Führen Sie einen Neustart durch und überprüfen Sie, ob das Modul aktiv ist:
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu:`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  Falls sich Ihr Webserver hinter einem Load Balancer befindet, fügen Sie Ihrer Apache-Konfiguration (gewöhnlich httpd.conf) die folgende Zeile hinzu und ersetzen Sie 123.123.123.123 mit der IP-Adresse Ihres Load Balancers:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[insert your load balancer’s IP address]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Verwenden Sie die [`ngx_http_realip_module` NGINX-Module](http://nginx.org/en/docs/http/ngx_http_realip_module.html) und die folgenden Konfigurationsparameter:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1 (Beispiel-IP-Adresse)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(für alle Cloudflare-IPs wiederholen, die auf [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/) gelistet sind)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#verwenden Sie einen der folgenden zwei</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Diese Liste der Präfixe muss regelmäßig aktualisiert werden. Die vollständige Liste veröffentlichen wir bei den [Cloudflare IP-Adressen](https://www.cloudflare.com/ips).

{{<Aside type="note">}}
Um die ursprüngliche Besucher-IP-Adresse in Ihre Protokolle
einzuschließen, fügen Sie die Variablen \$http\_cf\_connecting\_ip und
\$http\_x\_forwarded\_for in der log\_format-Anweisung hinzu.
{{</Aside>}}

Siehe auch: [Cloudflare und NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/).

{{<Aside type="warning">}}
Cloudflare aktualisiert und unterstützt *mod\_cloudflare* ab Version
**Debian 9** und **Ubuntu 18.04 LTS** des Linux-Betriebssystems nicht
mehr. Wir empfehlen jetzt
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
für Kunden, die Apache-Webserver verwenden. Kunden, die das
*mod\_cloudflare* Package zusammenstellen möchten, können die [Codebasis
von GitHub herunterladen](https://github.com/cloudflare/mod_cloudflare).
{{</Aside>}}

1.  Führen Sie das folgende Skript aus, um mod\_cloudflare als Teil von EasyApache zu installieren: `bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  Bei der Installation müssen Sie Ihren Apache mit dem neuen mod\_cloudflare-Plug-in neu kompilieren.

Bei Verwendung von Railgun (oder anderer Reverse-Proxy-Software wie z. B. Varnish) kommen Benutzeranfragen von Ihrem Railgun-Server anstatt von Cloudflare. Da Anfragen nicht direkt von Cloudflare kommen, stellen hinzugefügte Mods Besucher-IP-Adressen nicht standardmäßig wieder her.

1.  Um dies zu beheben, öffnen Sie Ihre Apache-Konfiguration. Diese finden Sie normalerweise in `/etc/apache2/apache2.conf`, `/etc/httpd/httpd.conf`, `/usr/local/apache/conf/httpd.conf` oder an einem anderen Ort je nach Konfiguration. Wenn Sie unsicher sind, fragen Sie Ihren Hosting-Anbieter.
2.  Ganz am Ende fügen Sie Folgendes hinzu:`CloudflareRemoteIPTrustedProxy railgun_address`Wenn sich Ihr Railgun-Server also auf 127.0.0.1 befindet, sieht das so aus:`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  Wenn Sie mehr als einen Server zur Liste Ihrer vertrauenswürdigen Proxys hinzufügen müssen, können Sie das am Ende tun:CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

Um Lighttpd die Server-IP-Adresse für die Zugriffsprotokolle und für Ihre Anwendung automatisch neu schreiben zu lassen, können Sie eine der beiden nachstehenden Lösungen verwenden.

1.  Öffnen Sie Ihre **lighttpd.conf** Datei und fügen Sie _mod\_extforward_ zur _server.modules_ Liste hinzu. Es muss **nach**_mod\_accesslog_ kommen, um die echte IP in den Zugriffsprotokollen anzuzeigen
2.  Fügen Sie den folgenden Codeblock an beliebiger Stelle in der Datei **lighttpd.conf** nach der Liste der Servermodule ein und starten Sie dann Lighttpd neu


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (example IP address)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot;trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(für alle Cloudflare IPs wiederholen, die unter [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/) aufgeführt sind)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
Wenn Ihr Ursprung über IPv6 mit dem Internet verbunden ist, funktioniert
**\$HTTP\[\"remoteip"\]** nicht. Es ist bei aktiviertem IPv6 für den
Abgleich mit den entfernten IP-Bereichen erforderlich. Die oben
aufgeführte Methode funktioniert nicht, wenn versucht wird, IP-Bereiche
weiterzuleiten. Als Alternativlösung fügen Sie die folgenden Zeilen zu
lighttpd.conf hinzu:
`extforward.forwarder = ( "all" => "trust" ) extforward.headers = ("CF-Connecting-IP")`
{{</Aside>}}

1.  Wechseln Sie zu Ihrer LiteSpeed-Webverwaltungskonsole.
2.  Aktivieren Sie die Option „Use Client IP in Header in Configuration“.
3.  Sobald sie aktiviert ist, zeigen Ihre Zugriffsprotokolle die korrekten IP-Adressen, und sogar PHPs `$_SERVER['REMOTE_ADDR']`\-Variable enthält die echte Client-IP-Adresse anstatt einer Cloudflare-IP-Adresse. Dies löst allein schon die meisten Probleme, auf die Sie treffen könnten, wenn Cloudflare auf Websites mit PHP-Aktivierung aktiviert wird (z. B. WordPress oder vBulletin installs).

##### Für IIS 7 8:

Befolgen Sie die Anweisungen [hier](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115).

##### Für IIS 8.5 10:

Ab IIS 8.5 ist benutzerdefinierte Protokollierung eine integrierte Option. Siehe [Erweiterte IIS-Protokollierung](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85)

1.  Doppelklicken Sie in IIS-Manager auf **Logging** im _Actions_\-Menü der Website, auf der Sie arbeiten.
2.  Wählen Sie nach dem Start **W3C** als Format und klicken Sie dann auf **Select Fields** neben dem Format-Dropdownmenü im _Log File_\-Unterabschnitt.
3.  Klicken Sie auf **Add Field** und fügen Sie es im Header _CF-Connecting-IP_ hinzu.
4.  Klicken Sie auf **Ok**. Sie sollten Ihren neuen Eintrag unter **Custom Fields** sehen. Klicken Sie auf **Apply**, wenn Sie zurück im _Logging_\-Fenster sind.

1.  Wenn die Operation erfolgreich war, sollte die Protokolldatei jetzt einen Unterstrich haben:Sie sollten die Änderung auch in den folgenden Feldern sehen:
2.  Starten Sie die Website neu, dann W3SVC, dann die gesamte Instanz, wenn sich die Änderung nicht sofort zeigt.Wenn Sie die erweiterte Protokollierung in IIS 8.5+ verwenden, wird die **ursprüngliche Besucher-IP** auf der Anwendungsebene nicht wiederhergestellt.

Damit Tomcat7 die ursprüngliche Benutzer-IP-Adresse automatisch in Ihren Zugriffsprotokollen und in Ihrer Anwendung wiederherstellt, müssen Sie `%{CF-Connecting-IP}i`in Ihrem Protokollschema hinzufügen.

Zum Beispiel könnten Sie den folgenden Block zu Ihrer `server.xml` Datei.

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>`

Daraufhin würden Ihre Protokolle so aussehen:

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

Sehen Sie sich dieses Drittanbieter-Tutorial zur Wiederherstellung der ursprünglichen Besucher-IP-Adresse mit [Magento und Cloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/) an.

Cloudflare hat zwar diese [Magento-Erweiterung](https://marketplace.magento.com/) nicht geschrieben, aber einige unserer Kunden fanden sie hilfreich.

Da dieses Plug-in von einer externen Partei erstellt wurde, können wir keinen technischen Support für Probleme mit dem Plug-In geben.

Befolgen Sie diese Anweisungen, um korrekte IP-Zuordnung zu ermöglichen, wenn eine „Invision Power Board 3“-Installation durch Cloudflare ausgeführt wird:

Melden Sie sich beim ACP Ihrer IPB-Installation an:

1.  Klicken Sie auf **System**.
2.  Klicken Sie unter „Overview“ auf **Security**.
3.  Klicken Sie unter „Security Center“ auf **Security Settings**.Prüfen Sie, dass _Trust IP addresses provided by proxies?_ (Von Proxys bereitgestellte IP-Adressen vertrauen?) auf grün geschaltet ist.

##### IPB4-Beschreibung von _Trust IP addresses provided by proxies?_

Wenn Ihre Netzwerkumgebung bedeutet, dass Anfragen durch einen Proxy (wie in einer Intranet-Situation in einem Büro oder einer Universität oder einem Servercluster mit Lastverteilung) gehandhabt werden, müssen Sie eventuell diese Einstellung aktivieren, damit die korrekte IP-Adresse verwendet wird. Bei Aktivierung kann jedoch ein böswilliger Benutzer das System missbrauchen, sodass eine falsche IP-Adresse angegeben wird. In den meisten Umgebungen sollte diese Einstellung deaktiviert bleiben.

Informationen zur Wiederherstellung der ursprünglichen Besucher-IP-Adresse mit Simple Machines (SMF) finden Sie in den [Foren zu Simple Machines](https://custom.simplemachines.org/mods/index.php?mod=2502).

Wenn Sie einen Apache-Server verwenden, würden wir empfehlen, [mod\_cloudflare](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) zu installieren, um die Besucher-IP-Adresse für Ihre Protokolle wiederherzustellen.

Wenn Sie für die Installation eines Mods nicht auf Server zugreifen können, dann können Sie vielleicht [den Kern](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406) ändern.

Neuere Versionen von MyBB enthalten eine Option zur Prüfung von Benutzer-IP-Adressen.

`Admin CP > Configuration > Server and Optimization Options > Scrutinize User's IP address? > Yes`

Alternativ können Sie das [Cloudflare-Management-Plug-in](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin) installieren, das für MyBB 1.6 erhältlich ist.

##### MyBB 1.6.0, 1.6.1, 1.6.2, or 1.6.3

1.  Navigieren Sie zu `./inc/functions.php`.
2.  Gehen Sie zu Zeile 2790.
3.  Ersetzen Sie:`if(isset($_SERVER['REMOTE_ADDR']))`durch:`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  Ersetzen Sie dann:`$ip = $_SERVER['REMOTE_ADDR'];`durch:`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

Ein Mitglied des Vanilla-Teams hat ein [Cloudflare-Plug-in für Vanilla](https://open.vanillaforums.com/addon/cloudflaresupport-plugin) zur Wiederherstellung der ursprünglichen Besucher-IP-Adresse in den Protokolldateien für selbstgehostete Websites geschrieben.

Da dieses Plug-in von einer externen Partei erstellt wurde, können wir keinen technischen Support für Probleme mit dem Plug-In geben.MediaWiki

1.  Öffnen Sie `includes/GlobalFunctions.php`. Ändern Sie ungefähr in Zeile 370 Folgendes:`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`zu`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  Öffnen Sie `includes/ProxyTools.php`. Suchen Sie ungefähr in Zeile 79:`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`und ersetzen Sie es durch:`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`Der zweite Schritt betrifft nur MediaWiki-Versionen bis 1.18.0. Neuere Versionen von MediaWiki haben vollständig neu geschriebene ProxyTools.php, und der folgende Code ist nicht mehr vorhanden.
3.  Suchen Sie ungefähr in Zeile 80:`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`Speichern Sie die Änderungen und laden Sie sie auf Ihren Ursprungswebserver hoch.

##### Für Versionen um 1.27.1:

1.  Gehen Sie zu Zeile 1232 in `GlobalFunctions.php` und ändern Sie `REMOTE_ADDR` zu `HTTP_CF_CONNECTING_IP`.
2.  Gehen Sie dann zu `WebRequest.php` und ändern Sie in Zeile 1151 bis 1159 `REMOTE_ADDR` zu `HTTP_CF_CONNECTING_IP`.

Ein Xenforo-Benutzer hat ein [Plug-in für Cloudflare](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/) erstellt.

Da dieses Plug-in von einer externen Partei erstellt wurde, können wir keinen technischen Support für Probleme mit dem Plug-In geben.

1.  Öffnen Sie `library/config.php`.
2.  Fügen Sie am Ende Folgendes hinzu:`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  Laden Sie die Änderungen hoch und überschreiben Sie die alten Einstellungen.

Eine externe Partei hat ein [Modul für Cloudflare und PunBB](http://punbb.informer.com/forums/post/147539/#p147539) erstellt, das die ursprüngliche Besucher-IP wiederherstellt.

Da dieses Plug-in von einer externen Partei erstellt wurde, können wir keinen technischen Support für Probleme mit dem Plug-In Cherokee server geben.

1.  Starten Sie `cherokee-admin` auf Ihrem Server.
2.  Navigieren Sie zum **Cherokee Administration Interface** in Ihrem Webbrowser.
3.  Wählen Sie den **virtuellen Server** für die Domain, die von Cloudflare betreut wird.
4.  Aktivieren Sie auf der Registerkarte _Protokollierung_ für Ihren gewählten **virtuellen Server** Weitergeleitete IPs akzeptieren.
5.  Geben Sie im Feld _Von Hosts akzeptieren_[Cloudflares IP-Adressen](https://www.cloudflare.com/ips/) ein.

Sie können die IP-Adresse korrigieren, indem Sie das Feld `PHP IP Server Param` in der Livezilla-Serverkonfiguration zu `HTTP_CF_CONNECTING_IP` ändern.

Zur Wiederherstellung der Besucher-IP für DataLife Engine:

1.  Öffnen Sie:/engine/inc/include/functions.inc.phpSuchen Sie:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Ändern Sie es zu:`$db_ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  Suchen Sie:`$ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Ändern Sie es zu:`$ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  Öffnen Sie:/engine/modules/addcomments.phpSuchen Sie:`$_SERVER['REMOTE_ADDR'],`Ändern Sie es zu:`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  Suchen Sie:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Ändern Sie es zu:`$db_ip_split = explode( ".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`

Ein externer Entwickler hat eine [Cloudflare-Erweiterung für TYPO3](https://extensions.typo3.org/extension/cloudflare/) erstellt, die die ursprüngliche Besucher-IP in Ihren Protokollen wiederherstellt. Mit der Erweiterung können Sie außerdem Ihren Cloudflare-Cache löschen.

Da dieses Plug-in von einer externen Partei erstellt wurde, können wir keinen technischen Support für Probleme mit dem Plug-In geben.

Wenn Sie die Hosting-Control-Panel VestaCP verwenden, laufen gleichzeitig Nginx und Apache auf Ihrem Server. Anfragen werden durch Nginx als Proxy weitergeleitet, bevor sie Apache erreichen.

Wegen dieses Nginx-Proxys brauchen Sie die Anweisungen zur Konfiguration von Nginx, damit die echte Besucher-IP-Adresse zurückgegeben wird. [Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) für Apache wird nur gebraucht, wenn der Nginx-Server für manche Anfragen deaktiviert wird. Wenn [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) zu Apache hinzugefügt wird, entsteht kein Konflikt mit der Nginx-Serverkonfiguration.

Ein externer Entwickler hat ein Modul zur Wiederherstellung von Besucher-IPs mit der Bezeichnung [node\_cloudflare](https://github.com/keverw/node_CloudFlare) erstellt.

___

## Wiederherstellung der ursprünglichen Besucher-IP mit HAProxy

Um die ursprüngliche Client-IP im X\_FORWARDD\_FOR-Header zu extrahieren, müssen Sie die folgende Konfiguration in HAProxy verwenden:

1.  Erstellen Sie eine Textdatei CF`_ips.lst` mit allen IP-Bereichen von https://www.cloudflare.com/en-gb/ips/
2.  Stellen Sie sicher, dass Sie die `Option forwardfor` in HAProxy deaktivieren.

HAProxy-Konfiguration:

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)] if from_cf cf_ip_hdr`

___

## Verwandte Ressourcen

-   [HTTP-Anfragenheader](/fundamentals/get-started/http-request-headers)
-   [Regeln transformieren](/rules/transform/)
