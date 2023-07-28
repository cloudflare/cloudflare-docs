---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360000841472-Mehrere-Websites-automatisch-in-Cloudflare-aufnehmen
title: Mehrere Websites automatisch in Cloudflare aufnehmen 
---

# Mehrere Websites automatisch in Cloudflare aufnehmen 



## Überblick

Wenn Sie mehrere Sites (10 oder mehr) gleichzeitig in Cloudflare aufnehmen möchten, können Sie dies über die Cloudflare API tun. Mehrere Websites gleichzeitig aufzunehmen, kann aus folgenden Gründen nützlich sein:

{{<Aside type="note">}}
Wenn Sie mehr als 50 Domains gleichzeitig aufzunehmen versuchen, werden
alle weiteren Domains blockiert, bis sie verarbeitet wurden.
{{</Aside>}}

-   Sie können mehrere Domains betreiben, die auf eine einzige kanonische Domain zurückgreifen, z. B. Domains in verschiedenen Ländern (.com.au, .co.uk usw.), die Sie durch Cloudflare schützen möchten.
-   Wenn Sie eine Agentur oder IT-Beratung sind und im Auftrag Ihrer Kunden mehrere Domains verwalten. (Hinweis: Sie sollten unser [Cloudflare-Partnerprogramm](https://www.cloudflare.com/partners/) in Betracht ziehen!)
-   Wenn Sie eine vorhandene Gruppe von Websites auf Cloudflare verschieben.

Mit der API können Sie schnell und effizient mehrere Sites hinzufügen, insbesondere wenn Sie bereits damit vertraut sind, [Ihre Nameserver zu ändern](/dns/zone-setups/full-setup/setup) oder [einen DNS-Eintrag hinzuzufügen.](/dns/manage-dns-records/how-to/create-dns-records)

___

## Voraussetzungen

{{<Aside type="note">}}
Mit Ihrem Cloudflare-Konto dürfen nicht mehr ausstehende Websites als
aktive Websites verknüpft sein. Wir empfehlen Ihnen zu warten, bis die
ausstehenden Websites verarbeitet wurden, bevor Sie weitere Domains
hinzufügen.
{{</Aside>}}

Wenn Sie mehrere Websites automatisch in Cloudflare aufnehmen möchten, brauchen Sie:

-   ein bestehendes Konto bei Cloudflare ([Registrieren](https://www.cloudflare.com/a/signup) / [Anmelden](https://www.cloudflare.com/a/login))
-   Grundkenntnisse der Befehlszeile
-   installiertes curl (bei macOS und Linux standardmäßig vorhanden)
-   Ihren [API-Schlüssel](https://support.cloudflare.com/hc/de/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-) für Cloudflare
-   eine Liste der Domains, die Sie hinzufügen möchten, jeweils in einer separaten Zeile (durch Zeilenumbruch getrennt) – z. B. „domains.txt“

___

## Domains über die API aufnehmen

Cloudflare besitzt eine API mit vollem Funktionsumfang (siehe [Dokumentation](https://api.cloudflare.com/)). Mit dieser API können automatisch neue Domains erstellt und DNS-Einträge, Page Rules und unsere umfangreichen Sicherheitseinstellungen konfiguriert werden. Mit dieser API werden wir die gleichzeitige Aufnahme mehrerer Domains automatisieren.

Öffnen Sie Ihre Terminalanwendung (z. B. Terminal oder Terminal.app) und legen Sie Ihren API-Schlüssel und Ihre E-Mail-Adresse fest:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

Dann schreiben wir eine einfache for-Schleife, die jeden Domainnamen übernimmt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do \  curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \  -H &quot;Content-Type: application/json&quot; \  &quot;https://api.cloudflare.com/client/v4/zones&quot; \  --data '{&quot;account&quot;: {&quot;id&quot;: &quot;id_of_that_account&quot;}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

Der Schlüssel „jump\_start“ bewirkt, dass Cloudflare automatisch versucht, nach gängigen DNS-Einträgen zu suchen – z. B. „www“, „mail“, „blog“ und viele andere – damit Sie diese nicht von Hand konfigurieren müssen (Sie sollten sich trotzdem vergewissern, dass wir sie alle gefunden haben). _id\_of\_that\_account_ finden Sie in der App Cloudflare-**Übersicht** unter **Account ID**.

Die API gibt eine Antwort zurück, in der die [Nameserver enthalten sind, die Sie bei Ihrem Registrar ändern müssen](https://support.cloudflare.com/hc/de/articles/206455647-How-do-I-change-my-domain-nameservers-) (bei dem Sie die Domain registriert haben).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;example.com&quot;, &quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;, &quot;lucy.ns.cloudflare.com&quot; ], &quot;original_name_servers&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;, &quot;ns-cloud-e2.googledomains.com&quot;, &quot;ns-cloud-e3.googledomains.com&quot;, &quot;ns-cloud-e4.googledomains.com&quot; ], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

Beachten Sie den Schlüssel „name\_servers“ in der Antwort. Dieses ist dasselbe eindeutige Paar für alle Websites, die Sie unter Ihrem Konto hinzufügen, z. B.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> &quot; chad.ns.cloudflare.com&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;lucy.ns.cloudflare.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> ]</span></div></span></span></span></code></pre>{{</raw>}}

Kopieren Sie Ihre Werte (nicht die vorstehenden!) und [aktualisieren Sie die Nameserver](https://support.cloudflare.com/hc/de/articles/206455647-How-do-I-change-my-domain-nameservers-) bei Ihrem Registrar.

___

## Domains über flarectl (das Cloudflare-Befehlszeilentool) aufnehmen

Sie können Domains auch mit flarectl aufnehmen, dem offiziellen Befehlszeilentool von Cloudflare. Sie können ein [vorbereitetes Paket für Ihr Betriebssystem (Windows, macOS / Darwin, Linux) herunterladen](https://github.com/cloudflare/cloudflare-go/releases) und Domains erstellen, die dieses verwenden.

Sie müssen zuerst Ihre API-Anmeldeinformationen festlegen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

… und dann den folgenden Befehl in flarectl ausführen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

Danach können Sie die Nameserver für jede Domain über „flarectl zone list“ erhalten:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Hilfe oder Tipps dazu bekommen Sie in der [Cloudflare Community](https://community.cloudflare.com/).

___

## Häufige Probleme

Wenn bei diesem Prozess Fehler ausgegeben werden, ist die Domain möglicherweise nicht registriert (oder gerade erst registriert), eine Subdomain oder anderweitig ungültig. Die folgenden Artikel behandeln die häufigsten Fälle:

-   [Warum kann ich meine Domain nicht in Cloudflare aufnehmen?](https://support.cloudflare.com/hc/de/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [Seite gesperrt](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
