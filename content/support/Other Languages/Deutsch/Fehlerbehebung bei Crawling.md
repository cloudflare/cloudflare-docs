---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200169806-Fehlerbehebung-bei-Crawling-Fehlern
title: Fehlerbehebung bei Crawling-Fehlern 
---

# Fehlerbehebung bei Crawling-Fehlern 



## Übersicht

Cloudflare setzt Suchmaschinen-Crawler und -Bots auf Whitelists. Wenn Sie Crawling-Probleme oder Cloudflare-Challenges für den Suchmaschinen-Crawler oder -Bot beobachten, sollten Sie den [Cloudflare-Support kontaktieren](https://support.cloudflare.com/hc/articles/200172476) und dabei die Informationen angeben, die Sie bei der Behebung der Crawling-Fehler mit den in dieser Anleitung beschriebenen Methoden sammeln.

___

## Einstellung der Crawling-Frequenz für Google und Bing

Um die CDN-Performance zu optimieren, weisen Google und Bing Websites, die CDN-Dienste nutzen, spezielle Crawling-Frequenzen zu. Spezielle Crawling-Frequenzen wirken sich nicht nachteilig auf die Suchmaschinenoptimierung (SEO) und die-Ergebnisseiten von Suchmaschinen (SERPs) aus. Befolgen Sie die nachstehenden Richtlinie, um Ihre Crawling-Frequenzen für Bing und Google zu ändern:

-   Um die Crawling-Frequenz für Google zu ändern, sollten Sie die [Google-Dokumentation durchsehen](https://support.google.com/webmasters/answer/48620?hl=en).
-   Zur Änderung Ihrer Crawling-Frequenz für Bing finden Sie Hilfe in der Bing-Dokumentation:

-   [Bing-Crawling-Steuerung](https://www.bing.com/webmaster/help/crawl-control-55a30302)
-   [Crawling-Verzögerung und der Bing-Crawler](https://blogs.bing.com/webmaster/2009/08/10/crawl-delay-and-the-bing-crawler-msnbot)

___

## Verhinderung von Crawling-Fehlern

Gehen Sie die folgenden Empfehlungen zur Verhinderung von Crawler-Fehlern durch:

-   Überwachen Sie die Performance und Verfügbarkeit Ihrer Website mit dem Tool eines Drittanbieters:
    -   [StatusCake](http://www.statuscake.com/)
    -   [Pingdom](http://www.pingdom.com/)
    -   [Monitor.Us](http://www.monitor.us/)
    -   [Updown](http://beta.updown.io/)

-   Blockieren Sie IP-Adressen von Google-Crawlern nicht mit **Firewall Rules** oder **IP Access Rules** innerhalb von Cloudflares **Firewall**\-App.

{{<Aside type="tip">}}
Bestätigen Sie, dass eine IP-Adresse zu Google gehört, indem Sie Googles
Dokumentation zur [Überprüfung von
Googlebot-IP-Adressen](https://support.google.com/webmasters/bin/answer.py?answer=80553)
konsultieren.
{{</Aside>}}

-   Blockieren Sie die USA nicht mit **Firewall Rules** oder **IP Access Rules** innerhalb von Cloudflares **Firewall**\-App.
-   Blockieren Sie User-Agents von [Google](https://support.google.com/webmasters/answer/1061943) oder [Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0) nicht in .htaccess, Ihrer Serverkonfiguration, [robots.txt](http://support.google.com/webmasters/bin/answer.py?answer=35303) oder der Web-Applikation.

{{<Aside type="tip">}}
Google setzt zum Crawling Ihrer Website [unterschiedliche
User-Agents](https://support.google.com/webmasters/answer/1061943) ein.
Sie können [Ihre robots.txt über Google
testen](https://support.google.com/webmasters/answer/6062598?hl=en).
{{</Aside>}}

-   Lassen Sie kein Crawling von Dateien im /cdn-cgi/-Verzeichnis zu. Dieser Pfad wird intern von Cloudflare verwendet, und Google stößt bei seinem Crawling auf Fehler. Lassen Sie kein Crawling von cdn-cgi über robots.txt zu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Disallow: /cdn-cgi/</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Fehler für cdn-cgi wirken sich nicht auf Website-Rangfolgen aus.
{{</Aside>}}

-   Stellen Sie sicher, dass Ihre [robot.txt-Datei den AdSense-Crawler zulässt](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=1061943).
-   [Stellen Sie die ursprünglichen Besucher-IP-Adressen](https://support.cloudflare.com/hc/articles/200170916) in Ihren Server-Protokollen wieder her.

___

Die Schritte zur Fehlerbehebung für die am häufigsten gemeldeten Crawling-Fehler sind unten aufgeführt.

### HTTP-4XX-Fehler

[HTTP-4XX-Fehler](https://support.cloudflare.com/hc/articles/115003014512) sind der häufigste Typ von Crawling-Fehlern. Cloudflare übermittelt diese Fehler von Ihrem Webserver an Google. Diese Fehler werden aus unterschiedlichen Gründen verursacht, z. B. durch eine fehlende Seite auf Ihrem Webserver oder einen falsch formatierten Link in Ihrer HTML. Die Lösung hängt von dem aufgetretenen Problem ab.

### HTTP-5XX-Fehler

[HTTP-5XX-Fehler](https://support.cloudflare.com/hc/articles/115003011431) weisen darauf hin, dass entweder bei Cloudflare oder Ihrem Ursprungswebserver ein interner Fehler aufgetreten ist. Um das Auftreten von Crawling-Fehlern mit Website-Ausfällen zu korrelieren, sollten Sie den Zustand Ihres Ursprungswebservers überwachen. Durch Überwachung des Zustands Ihrer Website sowohl über Cloudflare als auch direkt über die IPs Ihres Ursprungswebserver lässt sich bestimmen, ob Fehler aufgrund von Cloudflare oder aufgrund Ihres Ursprungswebserver aufgetreten sind.

### DNS-Fehler

Abhängig davon, ob Ihre Domain über ein Full- oder ein CNAME-Setup auf Cloudflare ist, sind die Schritte bei der Fehlerbehebung unterschiedlich. Um zu überprüfen, welches Setup Ihre Domain verwendet, sollten Sie ein Terminal öffnen und den folgenden Befehl ausführen (ersetzen Sie _www.example.com_ durch Ihre Cloudflare-Domain):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short SOA www.example.com</span></div></span></span></span></code></pre>{{</raw>}}

Bei Domains mit einem CNAME-Setup enthält die resultierende Antwort cdn.cloudflare.net. Zum Beispiel:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com.cdn.cloudflare.net.</span></div></span></span></span></code></pre>{{</raw>}}

Bei Domains mit einem Full-Setup enthält die resultierende Antwort die cloudflare.com-Domain in den aufgeführten Nameservern. Zum Beispiel:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  josh.ns.cloudflare.com. dns.cloudflare.com. 2013050901 10000 2400 604800 3600</span></div></span></span></span></code></pre>{{</raw>}}

Sobald Sie bestätigt haben, wie Ihre Domain mit Cloudflare eingerichtet wurde, können Sie mit den Schritten zur Fehlerbehebung für Ihr jeweiliges Domain-Setup fortfahren.

**CNAME**

Kontaktieren Sie Ihren Hosting-Provider, um DNS-Fehler zu untersuchen und das Datum anzugeben, an dem Google auf DNS-Fehler gestoßen ist. Überprüfen Sie außerdem die [Cloudflare-Systemstatus](http://www.cloudflare.com/system-status)\-Seite auf Netzwerkausfälle an dem Datum, an dem Google auf die Fehler gestoßen ist.

**Full**

[Kontaktieren Sie den Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476) und geben Sie das Datum und die Uhrzeit des Moments an, an dem Google die Fehler beobachtet hat.

### Anforderung von Unterstützung bei der Fehlerbehebung

Wenn Ihre Crawling-Fehler durch die obigen Schritte zur Fehlerbehebung nicht gelöst werden, sollten Sie die folgenden Schritte durchgehen, um Crawler-Fehler als .csv-Datei von Ihrem Google-Webmaster-Tools-Dashboard zu exportieren. Schließen Sie diese .csv-Datei mit ein, wenn Sie den [Cloudflare-Support kontaktieren](https://support.cloudflare.com/hc/articles/200172476).

1.  Melden Sie sich bei Ihrem Google Webmaster-Tools-Konto an und navigieren Sie zum Abschnitt **Zustand** der betroffenen Domain.
2.  Klicken Sie in der linken Navigationsleiste auf **Crawling-Fehler**.
3.  Klicken Sie auf **Download**, um die Liste der Fehler als .csv-Datei zu exportieren.
4.  Geben Sie die heruntergeladene .csv-Datei an den Cloudflare-Support weiter.

___

## Verwandte Ressourcen

[Googles Dokumentation zu Crawling-Fehlern und Fehlerbehebung](https://support.google.com/webmasters/answer/7440203#not_found_404)
