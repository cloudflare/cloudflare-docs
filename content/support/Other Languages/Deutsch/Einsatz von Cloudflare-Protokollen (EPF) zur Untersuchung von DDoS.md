---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360020739772-Einsatz-von-Cloudflare-Protokollen-EPF-zur-Untersuchung-von-DDoS-Datenverkehr-nur-Enterprise-
title: Einsatz von Cloudflare-Protokollen (EPF) zur Untersuchung von DDoS-Datenverkehr (nur Enterprise) 
---

# Einsatz von Cloudflare-Protokollen (EPF) zur Untersuchung von DDoS-Datenverkehr (nur Enterprise) 



## Übersicht

Mit Cloudflare-Protokollen (vormals EPF) haben Sie Zugang auf nützliche Daten zur Analyse von Datenverkehr, der eventuell Muster aufweist, die auf einen DDoS-Angriff hinweisen können. Sie können diese Art von Analyse vornehmen, indem Sie Ihre Cloudflare-Protokolldaten sortieren. Gehen Sie zuerst die nachstehend aufgeführten Schritte durch und sehen Sie sich das Workflow-Beispiel an.

Bevor Sie beginnen, brauchen Sie:

-   [cat](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [Logpull-API für Cloudflare-Protokolle](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

## Schritt 1: Sammeln der nötigen Informationen vor Abfragen der Cloudflare-Protokolle

Stellen Sie die folgenden Informationen zusammen:

1.  E-Mail-Adresse des Zonenadministrators
2.  Zonenkennung (zu finden unter **Übersicht** > **Zonen-ID**)
3.  Client-API-Schlüssel
4.  Startzeit (Beispielformat: 1529171100)
5.  Endzeit (Beispielformat: 1529171100)

{{<Aside type="tip">}}
Für die Zwecke dieses Tutorials können Sie die folgende Website
benutzen, um Zeiten in Unix-Zeit zu konvertieren:
<https://www.epochconverter.com/>
{{</Aside>}}

___

## Schritt 2: Herunterladen und Speichern der Protokolle

Hinweis: Der Cloudflare-Endpunkt hat ein Zeitbereichslimit von 1 Stunde, und die Protokolldateigröße muss unter 1 GB pro Anfrage liegen. Wenn die Dateigröße 1 GB übersteigt, wird der Download bei 1 GB abgebrochen, auch wenn protokollierte Ereignisse aus dem angefragten Zeitbereich nicht enthalten sind. Um Abschneiden der Protokolle zu vermeiden, sollten Sie die Zeit von 1 Stunde in 45 Minuten usw. ändern, bis die Protokolldateigröße unter 1 GB liegt.

#### Option 1:

**Download \*aller\* Felder aus Cloudflare-Protokollen, Speichern in els.txt:**

Vorlage:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Beispiel (mit Werten):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Option 2:

**Download \*spezifischer\* Felder aus Cloudflare-Protokollen, Speichern in els.txt:  
**

Dieser Befehl enthält nur die folgenden Felder in den angefragten Protokollen: _CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, ClientASN_.

Die vollständige Liste mit Cloudflare-Protokollfeldern finden Sie [hier](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API). 

Vorlage:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

Beispiel (mit Werten):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## Schritt 3: Sortieren der Protokolle

Sortieren Sie die Protokolle nach Feldwerten und speichern Sie sie in einer Datei.Sortieren nach HTTP-200-Antworten, Ausgabe in eine Datei mit der Bezeichnung els-200.txt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

Sortieren nach HTTP-525-Antworten, Ausgabe in eine Datei mit der Bezeichnung els-525.txt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:525,&quot; &gt; els-525.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Woher kommt der** **Feldwert „:525,“****?**

Die Struktur _:525,_ (Doppelpunkt, Statuscode, Komma) ist eindeutig für das _EdgeResponseStatus_\-Feld. Wenn Sie einfach nach dem HTTP-Statuscode _525_ ohne Doppelpunkt und abschließendes Komma suchen, würden auch Protokolleinträge eingeschlossen, die die Ziffernfolge _525_ in anderen Feldern wie z. B. in _EdgeStartTimeStamp_ haben, das viele Zahlen enthält, zu denen auch die Ziffernfolge _525_ gehören könnte.

![](/images/support/12.png)

Hinweis: Die Ausgabedateien (els-200.txt und els-525.txt) sind im ursprünglichen Zustand nicht gut lesbar. Um sie in einem besser lesbaren Format zu sehen, sollten Sie im folgenden Befehl „jq“ verwenden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

**Zählen der** **Anfragen** **nach** **Feldern** **und Ausgabe in eine** **Datei**

In diesem Beispiel zählen wir Anfragen nach SSL-Protokollversion, die durch das _ClientSSLProtocol_\-Feld in den Cloudflare-Protokollen gekennzeichnet ist (beachten Sie nachstehend den Punkt vor dem Feldnamen).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientSSLProtocol els-200.txt |sort -n |uniq -c |sort -n &gt; ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Beispielausgaben:**

![](/images/support/11.png)

Die Felder _ClientRequestURI, ClientIP, ClientRequestUserAgent, ClientCountry_ und _ClientRequestHost_ sind gewöhnlich am nützlichsten zum Auffinden von Angriffsmustern in diesen Protokollen.

-   Durch Sortieren nach _ClientRequestUserAgent_ können Sie „User Agent Blocking“-Regeln aufstellen.
-   Durch Sortieren nach _ClientCountry_ können Sie Firewall-Regeln je nach Land aufstellen.
-   Durch Sortieren nach _ClientRequestURI_ können Sie „Rate Limiting“-Regeln für die Seiten mit der höchsten Anzahl von Anfragen aufstellen.

___

## Workflow-Beispiel

Oft werden Sie nach vielen Feldern sortieren müssen, um die Quelle eines Angriffs analysieren und identifizieren zu können. Sehen Sie sich zum Beispiel den folgenden Workflow an:

**Aktion 1**: Sortieren der heruntergeladenen Cloudflare-Protokolle nach _HTTP 200_\-Antwort, Ausgabe in els-200.txt.

**Grund**: Sie sind nicht an Antworten interessiert, die bereits von Cloudflare blockiert werden, d. h. Anfragen, die zu einer HTTP-Antwort _503_ oder _403_ führen. Eine Anfrage, die zu einer _200 HTTP_\-Antwort an unserer Edge führt, wird von Cloudflare nicht blockiert und geht wahrscheinlich durch bis zum Ursprung, wenn die Ressource nicht an Cloudflares Edge zwischengespeichert wird. Solche Anfragen – wenn es sich um böswillige Anfragen handelt – werden speziell gestaltet, um den Ursprung zu überlasten.

**Anleitung**:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt | grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
Aktion 2**: Sortieren Ihrer „nur HTTP 200“-Protokolle nach URI, Ausgabe in els-200-URI.txt.

**Grund**: Von den 200-Antworten wollen Sie die Seiten sehen, die am meisten angefragt werden.

**Anleitung**:

Auffinden der häufigsten URIs:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientRequestURI els-200.txt |sort -n |uniq -c |sort -n &gt; els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}

Wählen Sie einen URI aus dieser Liste und speichern Sie Protokolleinträge mit diesem URI in einer eigenen Datei. Ersetzen Sie dafür _/ClientRequestURI/path/to/something/_ im nachstehenden Befehl mit dem von Ihnen gewählten URI:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200.txt| grep &quot;/ClientRequestURI/path/to/something/&quot; &gt; els-200-URI-1.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
Aktion 3**: Zählen URI-spezifischer „nur HTTP 200“-Antworten nach IP-Adresse, Ausgabe in els-200-URI-1-Top-IP.txt

**Grund**: Sie wollen die häufigsten IP-Adressen sehen, die den URI anfragen und zu einer 200-Antwort führen.

**Anleitung:**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Ausgabe des Dateiinhalts:**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

Sie können 200-HTTP-Antworten sowohl nach Anfrage-URI als auch nach den IPs eingrenzen, die diese URIs anfragen. Sie könnten die Protokolle auch anders herum sortieren, indem Sie die Protokolleinträge nach den obersten IP-Adressen eingrenzen und dann sehen, welcher URI nach IP-Adresse am meisten angefragt wird.

{{<Aside type="note">}}
Beachten Sie: Nur weil Sie eine große Anzahl von Anfragen von einem
einzigen User-Agent oder IP sehen, bedeutet das nicht, dass der
Anfragende böswillig ist. 
{{</Aside>}}