---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360029779472-Cloudflare-1XXX-Fehler-beheben
title: Cloudflare-1XXX-Fehler beheben 
---

# Cloudflare-1XXX-Fehler beheben 



## Überblick

Die in diesem Dokument beschriebenen Fehler können beim Besuch einer Website auftreten, für die Cloudflare als Proxy dient. Für Cloudflare-API- oder Dashboard-Fehler siehe unsere [Cloudflare-API-Dokumentation](https://api.cloudflare.com/). HTTP-Fehler 409, 530, 403, 429 sind die HTTP-Fehlercodes, die im HTTP-Status-Header für eine Antwort zurückgegeben werden. 1XXX-Fehler erscheinen im HTML-Textkörper der Antwort.

{{<Aside type="note">}}
Auf Cloudflares **[Custom Error
Pages](https://support.cloudflare.com/hc/articles/200172706)** können
Kunden das Aussehen der standardmäßigen Fehlerseiten ändern, die in
diesem Artikel beschrieben werden.
{{</Aside>}}

Wenn der Fehler durch die Lösungen in den jeweiligen nachstehenden Fehlerbeschreibungen nicht behoben werden kann, [wenden Sie sich bitte an den Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476).

{{<Aside type="note">}}
Nur der Websitebesitzer kann Cloudflare für technischen Support
kontaktieren. Kontaktinformationen für eine Domain finden Sie in der
[Whois-Datenbank](https://whois.icann.org/en/lookup).
{{</Aside>}}

{{<Aside type="note">}}
Für alle Nutzer des Pro, Business und Enterprise Plans steht ein
dedizierter E-Mail-Support zur Verfügung. Nutzer der Business und
Enterprise Pläne können außerdem den Chat-Support nutzen. Wenn Sie
zusätzliche Unterstützung benötigen, werfen Sie einen Blick auf [unsere
Pläne](https://www.cloudflare.com/plans/).
{{</Aside>}}

___

## Fehler 1000: DNS zeigt auf verbotene IP

### Häufige Ursachen

Cloudflare hat die Anfrage aus einem der folgenden Gründe gestoppt:

-   Ein A-Eintrag in Ihrer Cloudflare-DNS-App verweist auf eine [Cloudflare-IP-Adresse](https://www.cloudflare.com/ips/) oder ein Load Balancer-Ursprung verweist auf einen Proxy-Eintrag.
-   Der A- oder CNAME-Eintrag Ihrer Cloudflare-DNS verweist auf einen anderen Reverse-Proxy (z. B. einen Nginx-Webserver, der die proxy\_pass-Funktion verwendet), der dann die Anfrage ein zweites Mal an Cloudflare weiterleitet.
-   Der X-Forwarded-For-Header der Anfrage ist länger als 100 Zeichen.
-   Die Anfrage enthält zwei X-Forwarded-For-Header.
-   Ein Problem mit der Server Name Indication (SNI) oder eine Unstimmigkeit am Ursprung.

### Lösung

-   Wenn ein A-Eintrag in Ihrer Cloudflare-DNS-App auf eine [Cloudflare-IP-Adresse](https://www.cloudflare.com/ips/) zeigt, sollten Sie als IP-Adresse die IP-Adresse Ihres Ursprungswebservers eintragen.
-   An Ihrem Ursprung sitzt ein Reverse-Proxy, der die Anfrage durch den Cloudflare-Proxy zurücksendet. Anstatt einen Reverse-Proxy zu verwenden, sollten Sie Ihren Hosting-Provider oder Website-Administrator bitten, eine HTTP-Umleitung an Ihrem Ursprung zu konfigurieren.

___

## Fehler 1001: DNS resolution error (DNS-Auflösungsfehler)

### Häufige Ursachen

-   Eine Web-Anfrage für eine nicht vorhandene Cloudflare-Domain wurde an eine Cloudflare-IP-Adresse gesendet.
-   Eine externe Domain, die nicht über Cloudflare läuft, hat einen CNAME-Eintrag zu einer auf Cloudflare aktiven Domain.
-   Das Ziel des DNS-CNAME-Eintrags lässt sich nicht auflösen.
-   Ein CNAME-Eintrag in Ihrer Cloudflare-DNS-App erfordert eine Auflösung durch einen DNS-Provider, der zurzeit offline ist.
-   [Always Online](/cache/how-to/always-online/) ist für eine Domain mit [benutzerdefiniertem Hostnamen (SSL für SaaS)](/ssl/ssl-for-saas) aktiviert.

### Lösung

Eine Cloudflare-fremde Domain kann sich nicht per CNAME auf eine Cloudflare-Domain beziehen, es sei denn, die Cloudflare-fremde Domain wird zu einem Cloudflare-Konto hinzugefügt.

Der direkte Zugriffsversuch auf DNS-Einträge, die für [Cloudflare CNAME-Setups](/dns/zone-setups/partial-setup) verwendet werden, führt ebenfalls zu Fehler 1001 (zum Beispiel:_www.beispiel.com.cdn.cloudflare.net_).

Deaktivieren Sie [Always Online](/cache/how-to/always-online/#enable-always-online), wenn Sie [benutzerdefinierte Hostnamen (SSL für SaaS)](/ssl/ssl-for-saas/) verwenden.

___

## Fehler 1002: DNS zeigt auf verbotene IP

### Häufige Ursachen

-   Ein DNS-Eintrag in Ihrer Cloudflare-DNS-App verweist auf eine der [IP-Adressen von Cloudflare](https://www.cloudflare.com/ips/).
-   Für einen CNAME-Eintrag in Ihrer Cloudflare-DNS-App wurde ein falsches Ziel angegeben.
-   Ihre Domain ist nicht auf Cloudflare, hat aber einen CNAME, der auf eine Cloudflare-Domain verweist.

### Lösung

Ändern Sie Ihren Cloudflare-_A-_ oder _CNAME-Eintrag_ so, dass er auf Ihre Ursprungs-IP-Adresse statt auf eine Cloudflare-IP-Adresse verweist:

1.  Kontaktieren Sie Ihren Hosting-Provider, um Ihre Ursprungs-IP-Adresse oder das Ziel des CNAME-Eintrags zu bestätigen.
2.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
3.  Wählen Sie die Domain, die den Fehler 1002 erzeugt.
4.  Wählen Sie die **DNS**\-App aus.
5.  Klicken Sie auf **Wert**, damit der _A_\-Eintrag aktualisiert wird.
6.  Ändern Sie den _A_\-Eintrag.

Um sicherzustellen, dass Ihr Ursprungswebserver seine eigenen Anfragen nicht über Cloudflare weiterleitet, sollten Sie Ihren Ursprungswebserver so konfigurieren, dass Ihre Cloudflare-Domain aufgelöst wird in:

-   die interne NAT-IP-Adresse oder
-   die öffentliche IP-Adresse des Ursprungswebservers.

___

## Fehler 1002: Eingeschränkt

### Häufige Ursache

Die Cloudflare-Domain wird in eine lokale oder unzulässige IP-Adresse oder eine IP-Adresse, die nicht mit der Domain verknüpft ist, aufgelöst.

### Lösung

Wenn Sie der Besitzer der Website sind:

1.  Wenden Sie sich an Ihren Hosting-Provider, um die IP-Adressen Ihres Ursprungswebservers zu bestätigen.
2.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
3.  Aktualisieren Sie die A-Einträge in der Cloudflare-DNS-App auf die IP-Adresse, die von Ihrem Hosting-Provider bestätigt wurde.

___

## Fehler 1003 Zugriff verweigert: Direkter IP-Zugriff nicht erlaubt

### Häufige Ursache

Ein Client oder Browser hat direkt auf eine [Cloudflare-IP-Adresse](https://www.cloudflare.com/ips) zugegriffen.

### Lösung

Rufen Sie im Browser den Website-Domain-Namen in Ihrer URL auf, nicht die Cloudflare-IP-Adresse.

___

## Fehler 1004: Host nicht für Webtraffic konfiguriert

### Häufige Ursachen

-   Cloudflare-Mitarbeiter haben die Proxyfunktion für die Domain aufgrund von Missbrauch oder Verstößen gegen die Servicebedingungen deaktiviert.
-   DNS-Änderungen wurden noch nicht verteilt oder die DNS-_A-Einträge_ des Websitebesitzers verweisen auf [Cloudflare-IP-Adressen](https://www.cloudflare.com/ips).

### Lösung

Wenn das Problem länger als 5 Minuten andauert, [kontaktieren Sie bitte den Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476).

___

## Fehler 1006, 1007, 1008 oder 1106 Zugriff verweigert: Ihre IP-Adresse wurde gesperrt

### Häufige Ursachen

Ein Cloudflare-Kunde hat den Traffic von Ihrem Client oder Browser blockiert.

{{<Aside type="note">}}
Fehler 1006 tritt auch in der Cloudflare-**Workers**-App unter der **Vorschau**-Registerkarte auf, wenn ein Kunde **[Zone Lockdown](/waf/tools/zone-lockdown/)** oder ein anderes Cloudflare-Sicherheitsmerkmal verwendet, um die IPs der Google-Cloud-Plattform zu blockieren, von denen die
**Vorschau**-Registerkarte abhängt.
{{</Aside>}}

### Lösung

Fordern Sie den Websitebesitzer auf, seine Cloudflare-Sicherheitseinstellungen zu überprüfen oder die IP-Adresse Ihres Clients zuzulassen. Der Websitebesitzer hat Ihre Anfrage blockiert und der Cloudflare-Support kann die Sicherheitseinstellungen eines Kunden nicht überschreiben.

___

## Fehler 1009 – Zugriff verweigert: Land oder Region gesperrt

### Häufige Ursachen

Der Eigentümer der Website (z. B. example.com) hat den Zugriff auf die Website für IP-Adressen aus Ihrem Land oder Ihrer Region gesperrt.

### Lösung

Achten Sie darauf, dass Ihre IP-Adresse unter dem Sicherheitsmerkmal [IP-Access-Regeln](https://support.cloudflare.com/hc/de/articles/217074967-Configuring-IP-Access-Rules) zugelassen ist.

___

## Fehler 1010: Der Besitzer dieser Website hat Ihren Zugriff anhand der Signatur Ihres Browsers gesperrt.

### Häufige Ursache

Ein Website-Besitzer hat Ihre Anfrage basierend auf dem Webbrowser Ihres Clients blockiert.

### Lösung

Benachrichtigen Sie den Websitebesitzer über die Sperrung. Sie finden keine Möglichkeit, den Websitebesitzer zu kontaktieren? Suchen Sie über die [Whois-Datenbank](https://whois.icann.org/en/lookup) nach Kontaktinformationen für die Domain. Als Websitebesitzer können Sie die **Browser**\-**Integritätsprüfung** über die Registerkarte **Einstellungen** der **Firewall**\-App deaktivieren.

{{<Aside type="note">}}
Der Websitebesitzer hat die Blockierung vorgenommen und der
Cloudflare-Support kann die Sicherheitseinstellungen eines Kunden nicht
überschreiben.
{{</Aside>}}

___

## Fehler 1011: Zugriff verweigert (Hotlinking verweigert)

### Häufige Ursache

Es wird eine Ressource angefordert, für die [Cloudflare Hotlink Protection](https://support.cloudflare.com/hc/articles/200170026) eingesetzt wird.

### Lösung

Benachrichtigen Sie den Websitebesitzer über die Sperrung. Sie finden keine Möglichkeit, den Websitebesitzer zu kontaktieren? Suchen Sie über die [Whois-Datenbank](https://whois.icann.org/en/lookup) nach Kontaktinformationen für die Domain.  **Hotlink-Schutz** wird über die Cloudflare-App **Scrape Shield** verwaltet.

{{<Aside type="note">}}
Der Websitebesitzer hat die Blockierung vorgenommen und der
Cloudflare-Support kann die Sicherheitseinstellungen eines Kunden nicht
überschreiben.
{{</Aside>}}

___

## Fehler 1012: Zugriff verweigert

### Häufige Ursache

Ein Websitebesitzer verbietet Zugriff aufgrund böswilliger Aktivität, die vom Computer des Besuchers oder dem Netzwerk (ip\_address) ausgeht. Die wahrscheinlichste Ursache ist eine Virus- oder Malware-Infizierung auf dem Computer des Besuchers.

### Lösung

Aktualisieren Sie Ihre Antivirensoftware und führen Sie einen vollständigen Systemscan aus. Cloudflare kann die vom Websitebesitzer für die Domain eingestellten Sicherheitseinstellungen nicht überschreiben. Um Zugriff auf die Website anzufordern, müssen Sie den Websitebesitzer kontaktieren, damit er Ihre IP-Adresse auf seine Genehmigungsliste setzt. Sie finden keine Möglichkeit, den Websitebesitzer zu kontaktieren? Suchen Sie über die [Whois-Datenbank](https://whois.icann.org/en/lookup) nach Kontaktinformationen für die Domain.

{{<Aside type="note">}}
Der Websitebesitzer hat die Blockierung vorgenommen und der
Cloudflare-Support kann die Sicherheitseinstellungen eines Kunden nicht
überschreiben.
{{</Aside>}}

___

## Fehler 1013: Keine Übereinstimmung zwischen HTTP-Hostname und TLS-SNI-Hostname

### Häufige Ursache

Der vom Client oder Browser durch [Server Name Indication](/fundamentals/glossary#server-name-indication-sni) (SNI) gesendete Hostname stimmt nicht mit dem Host-Header der Anfrage überein.

### Lösung

Fehler 1013 wird in der Regel durch Folgendes verursacht:

-   Ihr lokaler Browser stellt den falschen SNI-Host-Header ein, oder
-   ein Netzwerk, das SSL-Traffic weiterleitet, hat einen Konflikt zwischen SNI und dem Host-Header der Anfrage verursacht.

Ob ein SNI-Konflikt vorliegt, können Sie mit einem Online-Tool wie dem [SSL Shopper](https://www.sslshopper.com/ssl-checker.html) prüfen.

Legen Sie dem Cloudflare-Support die folgenden Informationen vor:

1.  eine [HAR](https://support.cloudflare.com/hc/articles/203118044)\-Datei, die beim Reproduzieren des Fehlers erstellt wurde.

___

## Fehler 1014: CNAME benutzerübergreifend gesperrt

### Häufige Ursache

Standardmäßig verbietet Cloudflare einen DNS-_CNAME-Eintrag_ zwischen Domains in verschiedenen Cloudflare-Konten. _CNAME-Einträge_ sind erlaubt innerhalb einer Domain (_www.beispiel.com_ CNAME auf _api.beispiel.com_) und über Zonen innerhalb desselben Nutzerkontos (_www.beispiel.com_ CNAME auf _www.beispiel.net_) oder mit der Lösung [Cloudflare for SaaS](https://www.cloudflare.com/saas/).

{{<Aside type="warning">}}
[Cloudflare Apps](https://www.cloudflare.com/apps/) werden derzeit nicht
von [SSL für SaaS](/ssl/ssl-for-saas/)
unterstützt, daher kann jede App, die eine auf unserer SaaS-Lösung
konfigurierte Domain verwendet, 1014-Fehler verursachen.
{{</Aside>}}

### Lösung

Um die Auflösung eines CNAME-Eintrags für eine Domain in einem anderen Cloudflare-Konto zu ermöglichen, muss der Domaininhaber des CNAME-Ziels [Cloudflare for SaaS](https://www.cloudflare.com/saas/) verwenden, genauer gesagt unsere [SSL für SaaS](/ssl/ssl-for-saas/)\-Lösung.

___

## Fehler 1015: Für Sie gilt die Durchsatzbegrenzung

### Häufige Ursache

Der Websitebesitzer hat [Durchsatzbegrenzung](https://support.cloudflare.com/hc/articles/115001635128) implementiert. Dies beeinträchtigt Ihren Besucher-Traffic.

{{<Aside type="note">}}
*Löschen kann nicht ausgeführt werden* ist ein weiterer 1015-Fehlercode,
der mit dem [Löschen des
Cloudflare-Caches](/cache/how-to/purge-cache)
zu tun hat. Versuchen Sie erneut, den Cache zu löschen, und kontaktieren
Sie den
[Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476),
wenn die Fehler weiterhin auftreten.
{{</Aside>}}

### Lösung

-   Wenn Sie ein Websitebesucher sind, sollten Sie den Websitebesitzer kontaktieren, um zu beantragen, dass Ihre IP vom Rate Limiting ausgeschlossen wird.
-   Wenn Sie der Websitebesitzer sind, überprüfen Sie die [Cloudflare-Schwellenwerte für die Durchsatzbegrenzung](https://support.cloudflare.com/hc/articles/115001635128) und passen Sie die Konfiguration Ihrer Durchsatzbegrenzung an.
-   Wenn Anfragen in kurzer Zeit (z. B. in 1 Sekunde) von Ihrer Durchsatzbegrenzung blockiert werden, sollten Sie den Zeitraum versuchsweise auf 10 Sekunden erhöhen.

{{<Aside type="tip">}}
Wenn Sie damit rechnen, dass ein neuer Cloudflare-Worker die
Durchsatzbegrenzung überschreitet, finden Sie Hinweise dazu in der
[Workers-Dokumentation](/workers/platform/limits).
{{</Aside>}}

___

## Fehler 1016: DNS-Fehler am Ursprung

### Häufige Ursache

Cloudflare kann die IP-Adresse des Ursprungswebservers nicht auflösen.

Häufige Ursachen für Fehler 1016 sind:

-   Ein DNS-_A-Eintrag_, in dem die Ursprungs-IP-Adresse genannt wird, fehlt.
-   Ein _CNAME-Eintrag_ im Cloudflare-DNS verweist auf eine nicht auflösbare externe Domain.
-   Die Ursprungs-Hostnamen (CNAMEs) in den Standard-, Region- und Fallback-Pools Ihres Cloudflare [Load Balancers](/load-balancing/) sind nicht auflösbar. Verwenden Sie einen mit einer Ursprungs-IP konfigurierten Fallback-Pool als Backup, falls alle anderen Pools nicht verfügbar sind.
-   Wenn Sie eine Spectrum-App mit einem CNAME-Ursprung erstellen, müssen Sie zunächst einen CNAME auf der Cloudflare-DNS-Seite erstellen, der auf den Ursprung verweist. Weitere Informationen finden Sie unter [Spectrum-CNAME-Ursprünge](/spectrum/how-to/cname-origins)

### Lösung

Zur Behebung von Fehler 1016:

1.  Überprüfen Sie, ob Ihre Cloudflare-DNS-Einstellungen einen _A-Eintrag_ enthalten, der auf eine gültige IP-Adresse zeigt, die über ein [DNS-Lookup-Tool](https://dnschecker.org/) aufgelöst wird.
2.  Wenn ein CNAME-Eintrag auf eine andere Domain zeigt, müssen Sie sicherstellen, dass die Ziel-Domain aufgelöst wird. Hierfür können Sie ein [DNS-Lookup-Tool](https://dnschecker.org/) verwenden.

___

## Fehler 1018: Host konnte nicht gefunden werden

### Häufige Ursachen

-   Die Cloudflare-Domain wurde kürzlich aktiviert und es gibt eine Verzögerung bei der Übertragung der Domain-Einstellungen zum Cloudflare-Edge-Netzwerk.
-   Die Cloudflare-Domain wurde über einen Cloudflare-Partner erstellt (z. B. einen Hosting-Provider) und das DNS des Providers ist ausgefallen.

{{<Aside type="note">}}
Fehler 1018 wird über einen HTTP-409-Antwortcode zurückgegeben.
{{</Aside>}}

### Lösung

Wenden Sie sich mit den folgenden Angaben an den [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476):

1.  Ihren Domain-Namen
2.  Ein Screenshot des Fehlers 1018, einschließlich der in der Fehlermeldung erwähnten **RayID**
3.  Die Zeit, zu der der Fehler 1018 aufgetreten ist, und die Zeitzone

___

## Fehler 1019: Compute-Server-Fehler

### Häufige Ursache

Ein Cloudflare-Worker-Skript verweist rekursiv auf sich selbst.

### Lösung

Stellen Sie sicher, dass Ihr Cloudflare-Worker nicht auf eine URL zugreift, die dasselbe Workers-Skript aufruft.

___

## Fehler 1020: Zugriff verweigert

### Häufige Ursache

Ein Client oder Browser wird von den Firewall-Regeln eines Cloudflare-Kunden blockiert.

### Lösung

Wenn Sie nicht der Websitebesitzer sind, sollten Sie dem Websitebesitzer einen Screenshot der Fehlermeldung 1020 vorlegen, die Sie empfangen haben.

Wenn Sie der Websitebesitzer sind:

1.  Holen Sie einen Screenshot des Fehlers 1020 von Ihrem Kunden ein.
2.  Durchsuchen Sie das [**Protokoll der Firewall-Ereignisse**](/waf/analytics) in der Registerkarte **Übersicht** Ihrer Cloudflare **Firewall**\-App nach der **RayID**\- oder Client-IP-Adresse aus der 1020-Fehlermeldung des Besuchers.

{{<Aside type="note">}}
Konvertieren Sie bei der Suche im **Firewall-Events-Protokoll** den
UTC-Zeitstempel des Fehlers 1020 in Ihre lokale Zeitzone.
{{</Aside>}}

3\. Stellen Sie die Ursache der Blockierung fest und ändern Sie entweder die **Firewall-Regel** oder lassen Sie die IP-Adresse des Besuchers in den [**IP-Zugriffsregeln**](https://support.cloudflare.com/hc/articles/217074967) zu.

___

## Fehler 1023: Host konnte nicht gefunden werden

### Häufige Ursachen

-   Hat sich der Benutzer gerade erst bei Cloudflare registriert, kann es einige Minuten dauern, bis die Informationen der Website über unser globales Netzwerk verteilt werden. Die Konfiguration der Website ist fehlerhaft.
-   Das kommt normalerweise vor, wenn Konten bei einem Partner (z. B. einem Hostingprovider) registriert wurden und das DNS des Providers fehlschlägt.

{{<Aside type="note">}}
Fehler 1023 wird über einen HTTP-409-Antwortcode zurückgegeben.
{{</Aside>}}

### Lösung

Wenden Sie sich mit den folgenden Angaben an den [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476):

1.  Ihren Domain-Namen
2.  Ein Screenshot des Fehlers 1023, einschließlich der in der Fehlermeldung erwähnten **RayID**
3.  Die Zeit, zu der der Fehler 1023 aufgetreten ist (mit Zeitzone)

___

## Fehler 1025: Bitte später wieder versuchen

### Häufige Ursache

Eine Anfrage wird nicht bearbeitet, weil die Domain die [Tariflimits für Cloudflare Workers](/workers/platform/limits) erreicht hat.

### Lösung:

Erwerben Sie den unbegrenzten Workers-Tarif über unsere [Tarifseite](https://dash.cloudflare.com/redirect?account=workers/plans) auf dem Workers-Dashboard.

___

## Fehler 1033: Fehler im Argo Tunnel

### Häufige Ursache

Sie haben eine Seite auf einer Website angefordert (`tunnel.beispiel.com`), die sich im Cloudflare-Netzwerk befindet. Der Host (`tunnel.beispiel.com`) ist als Argo-Tunnel konfiguriert und Cloudflare kann ihn derzeit nicht auflösen.

### Lösung

-   **Wenn Sie Besucher dieser Website sind**: Bitte versuchen Sie es in ein paar Minuten erneut.
-   **Wenn Sie der Besitzer dieser Website sind**: Überprüfen Sie, ob _cloudflared_ ausgeführt wird und das Netzwerk erreicht werden kann. Möglicherweise sollten Sie [Load Balancing](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb) für Ihren Tunnel aktivieren.

___

## Fehler 1034: Edge-IP eingeschränkt

### Häufige Ursache

Kunden, die ihre Domains bisher auf `1.1.1.1` verwiesen haben, erhalten nun den **Fehler 1034**. Dies liegt an einer neuen Edge-Validierungsprüfung in den Systemen von Cloudflare, um Fehlkonfigurationen und/oder möglichen Missbrauch zu verhindern.

### Lösung

Stellen Sie sicher, dass die DNS-Einträge auf IP-Adressen verweisen, die Sie kontrollieren, und verwenden Sie die reservierte IPv6-Adresse `100::` oder die reservierte IPv4-Adresse `192.0.2.0`, falls eine Platzhalter-IP-Adresse für „ursprungslose“ Setups erforderlich ist.

___

## Fehler 1035: Ungültiger Anfrage-Rewrite (ungültiger URL-Pfad)

### Häufige Ursache

Der Wert oder Ausdruck Ihres umgeschriebenen URL-Pfads ist ungültig.

Dieser Fehler tritt auch auf, wenn das Ziel des URL-Rewrites ein Pfad unter `/cdn-cgi/` ist.

### Lösung

Stellen Sie sicher, dass der umgeschriebene URL-Pfad nicht leer ist und mit dem Zeichen `/` (Schrägstrich) beginnt.

Zum Beispiel ist der folgende Rewrite-Ausdruck eines URL-Pfads ungültig:

`concat(lower(ip.geoip.country), http.request.uri.path)`

Korrigieren Sie den obigen Ausdruck, indem Sie ein Präfix `/` hinzufügen:

`concat("/", lower(ip.geoip.country), http.request.uri.path)`

___

## Fehler 1036: Ungültiger Anfrage-Rewrite (maximale Länge überschritten)

### Häufige Ursache

Der Wert oder Ausdruck des neu geschriebenen URL-Pfads oder des Abfrage-Strings ist zu lang.

### Lösung

Verwenden Sie einen kürzeren Wert oder Ausdruck für den neuen URL-Pfad/Abfrage-String-Wert.

___

## Fehler 1037: Ungültige Rewrite-Regel (Ausdruck konnte nicht ausgewertet werden)

### Häufige Ursache

Der Ausdruck der Rewrite-Regel konnte nicht ausgewertet werden. Für diesen Fehler gibt es mehrere Ursachen, aber er kann bedeuten, dass ein Ausdruckselement bei der Auswertung einen undefinierten Wert enthielt.

So erhalten Sie beispielsweise Fehler 1037, wenn Sie den folgenden dynamischen URL-Rewrite-Ausdruck verwenden und der `X-Source`\-Header nicht in der Anfrage enthalten ist:

`http.request.headers["x-source"][0]`

### Lösung

Stellen Sie sicher, dass alle Elemente Ihres Rewrite-Ausdrucks definiert sind. Wenn Sie sich beispielsweise auf einen Header-Wert beziehen, dann muss der Header unbedingt gesetzt sein.

___

## Fehler 1040: Ungültiger Anfrage-Rewrite (Header-Änderung nicht erlaubt)

### Häufige Ursache

Sie versuchen, einen HTTP-Header zu bearbeiten, den die Änderungsregeln für HTTP-Anfrage-Header (HTTP Request Header Modification Rules) nicht bearbeiten können.

### Lösung

Überprüfen Sie, dass Sie nicht versuchen, einen der [reservierten HTTP-Anfrage-Header](/rules/transform#http-request-header-modification-rules) zu bearbeiten.

___

## Fehler 1041: Ungültiger Anfrage-Rewrite (ungültiger Header-Wert)

### Häufige Ursachen

Der hinzugefügte/bearbeitete Header-Wert ist zu lang oder er enthält unzulässige Zeichen.

### Lösung

-   Verwenden Sie zum Definieren des Header-Werts einen kürzeren Wert oder Ausdruck.
-   Entfernen Sie alle unzulässigen Zeichen. Weitere Informationen zu zulässigen Zeichen finden Sie unter [Format der HTTP-Anfrage-Header-Namen und -Werte](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values) in der Entwicklerdokumentation.

___

## Fehler 1101: Wiedergabefehler

### Häufige Ursache

Ein Cloudflare-Worker löst eine JavaScript-Runtime-Exception aus.

### Lösung:

Legen Sie dem Cloudflare-Support [entsprechende Details für das Problem](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16) vor.

___

## Fehler 1102: Wiedergabefehler

### Häufige Ursache

Ein Cloudflare-Worker überschreitet ein [CPU-Zeitlimit](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions). Die CPU-Zeit ist die Zeit, die mit der Ausführung von Code verbracht wird (z. B. Schleifen, JSON-Parsing usw.). Die Zeit, die mit Netzwerkanfragen verbracht wird (Abrufen, Antworten), zählt nicht zur CPU-Zeit.

### Lösung

Wenden Sie sich an den Entwickler Ihres Workers-Codes, um den Code für eine Reduzierung der CPU-Auslastung in den aktiven Workers-Skripten optimieren zu lassen.

___

## Fehler 1104: Eine Variation dieser E-Mail-Adresse ist bereits in unserem System vorhanden. Es ist nur eine Variation erlaubt.

### Häufige Ursache

Dieser Fehler kann auftreten, wenn eine E-Mail-Adresse mit einer Variation der E-Mail-Adresse, die Sie hinzufügen möchten, bereits angelegt wurde. Zum Beispiel werden _my+user@example.com_ und _my.user@example.com_ in unserem System gleich behandelt.

### Lösung

Melden Sie sich als alter Nutzer an und ändern Sie die E-Mail-Adresse in eine „Wegwerfadresse“. So wird die neue E-Mail-Adresse frei.

___

## Fehler 1200: Cache-Verbindungslimit

### Häufige Ursache

An der Edge von Cloudflare stehen zu viele Anfragen in der Warteschlange und warten auf die Verarbeitung durch Ihren Ursprungs-Webserver. Dieses Limit schützt die Cloudflare-Systeme.

### Lösung

Rüsten Sie Ihren Ursprungswebserver so auf, dass eingehende Verbindungen schneller angenommen werden können. Passen Sie Ihre Caching-Einstellungen so an, dass die Cache-Trefferraten besser werden, damit weniger Anfragen Ihren Ursprungs-Webserver erreichen. Wenden Sie sich für Unterstützung an Ihren Hosting-Provider oder Webadministrator.

___

## Verwandte Ressourcen

-   [Kontaktaufnahme mit dem Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Anpassung der Cloudflare-Fehlerseiten](https://support.cloudflare.com/hc/articles/200172706)
