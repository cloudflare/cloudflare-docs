---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/221327488-Warum-wurde-meine-Domain-aus-Cloudflare-gel%C3%B6scht-
title: Warum wurde meine Domain aus Cloudflare gelöscht 
---

# Warum wurde meine Domain aus Cloudflare gelöscht? 



## Überblick

Domains werden in der Regel aus den folgenden Gründen gelöscht:

-   Ein Benutzer mit Zugriff auf die Domain hat sie entfernt.
-   Die Nameserver verweisen nicht mehr auf Cloudflare. Cloudflare überwacht kontinuierlich die Domainregistrierung.
-   Die Domain wurde nicht authentifiziert (seit 60 Tagen ausstehend).

___

## Schritt 1 Überprüfen Sie die Prüfprotokolle in Ihrem Cloudflare-Konto

Die Cloudflare-**Prüfprotokolle** enthalten Informationen zum Löschen von Domains.  Überprüfen Sie [mithilfe der Prüfprotokolle](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-) weitere Informationen zur Funktion der **Prüfprotokolle**.

1.  Melden Sie sich im Cloudflare Dashboard an.
2.  Klicken Sie auf das entsprechende Cloudflare-Konto, in dem die gelöschte Domain vorhanden war.
3.  Klicken Sie in der zweiten Navigationsleiste von oben auf **Prüfprotokoll**.
4.  Geben Sie für **Domain** den Domainnamen ein, der gelöscht wurde.
5.  Klicken Sie auf eine _Delete_\-**Aktion** und stellen Sie sicher, dass bei **Ressource** _Accont_ steht.
6.  Beachten Sie das **Datum**, die **Benutzer-IP-Adresse** und den **Benutzer**, der die Domain gelöscht hat.
7.  Wenn die **Benutzer-IP-Adresse**_127.0.0.1_ lautet oder keine Daten enthält, wurde die Löschung automatisch von den Systemen von Cloudflare durchgeführt: Weiter zu Schritt 2 

{{<Aside type="note">}}
*Löschen* ist eine **Aktion** , die das Löschen von Domains
kennzeichnet, aber häufig auch zum Löschen anderer Kontoeinstellungen
verwendet wird. Stellen Sie daher sicher, dass die **Ressource** die
*Zone* enthält.
{{</Aside>}}

___

## Schritt 2 Überprüfen Sie, ob bei der Domain-Registrierung Cloudflare-Nameserver aufgelistet sind

{{<Aside type="tip">}}
Domain-Registrierungen für Domains, die ein Cloudflare-CNAME-Setup
verwenden, müssen nicht geprüft werden.
{{</Aside>}}

1\. Verwenden Sie entweder die mit Ihrem Betriebssystem gelieferte kommandozeilenbasierte „whois“-Anwendung oder eine Website wie [whois.icann.org](https://whois.icann.org/en) oder [www.whois.net](https://www.whois.net/).

-   Wenn Sie die Nameserver-Details für Ihre Domain nicht finden können, wenden Sie sich an Ihren Domain-Registrar oder Domain-Provider, um die Domain-Registrierungsinformationen bereitzustellen.
-   Stellen Sie sicher, dass die Nameserver von Cloudflare die einzigen beiden Nameserver sind, die in den Domain-Registrierungsdetails aufgeführt sind.
-   Stellen Sie sicher, dass die Nameserver in der Domainregistrierung richtig geschrieben sind.

2\. Stellen Sie sicher, dass die Nameserver genau mit den Nameservern übereinstimmen, die im Abschnitt **Cloudflare-Nameserver** der Cloudflare-App **DNS** angegeben sind.

3\. Wenn Sie falsche Informationen feststellen, melden Sie sich beim Portal Ihres Domainanbieters an, um Aktualisierungen vorzunehmen, oder wenden Sie sich an Ihren Domainanbieter, um Unterstützung zu erhalten.

___

## Schritt 3 Überprüfen Sie, ob die Domainauflösung Cloudflare-Nameserver verwendet

{{<Aside type="tip">}}
Domain-Registrierungen für Domains, die ein Cloudflare-CNAME-Setup
verwenden, müssen nicht geprüft werden.
{{</Aside>}}

1\. Verwenden Sie Befehlszeilentools oder Tools von Drittanbietern, um zu überprüfen, ob die Nameserver von Cloudflare konfiguriert sind:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Die Option +trace gibt detaillierte Informationen, wenn die DNS-Antwort fehlschlägt. Diese Informationen können bei der Behebung des Problems mit Ihrem DNS-Anbieter hilfreich sein.

Die Option @8.8.8.8 gibt Ergebnisse vom öffentlichen DNS-Resolver von Google zurück. Die Ergebnisse bestätigen, ob öffentliche Resolver eine DNS-Antwort erhalten.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Einige Online-Dienste (wie zum Beispiel [whatsmydns.net](https://www.whatsmydns.net/)) prüfen auf DNS-Auflösung weltweit.

-   Stellen Sie sicher, dass die beiden Nameserver von Cloudflare die einzigen Nameserver sind, die in den Abfrageergebnissen zurückgegeben werden.
-   Stellen Sie sicher, dass keine falsch geschriebenen Nameserver vorhanden sind.
-   Stellen Sie sicher, dass die Nameserver genau mit den Nameservern übereinstimmen, die im Abschnitt **Cloudflare-Nameserver** der Cloudflare-App **DNS** angegeben sind.

2\. Wenn Sie falsche Informationen feststellen, melden Sie sich beim Portal Ihres Domainanbieters an, um Aktualisierungen vorzunehmen, oder wenden Sie sich an Ihren Domainanbieter, um Unterstützung zu erhalten.

3\. Wenn die Registrierungsdaten für Nameserver und Domain korrekt sind, wenden Sie sich an Ihren Domain-Provider, um zu überprüfen, ob kürzlich Probleme mit der DNS-Weitergabe aufgetreten sind.

{{<Aside type="note">}}
Einige Registrare stellen mehr als zwei Nameserver bereit. Verwenden Sie
jedoch nur die beiden in der DNS-App Ihres Cloudflare-Kontos
bereitgestellten.
{{</Aside>}}

___

## Wiederherstellung einer gelöschten Domain

Stellen Sie eine gelöschte Domain über den Link **\+ Site hinzufügen** rechts in der oberen Navigationsleiste im Cloudflare-Dashboard wieder her.Die Domain muss wie eine neue Domain hinzugefügt werden.

{{<Aside type="warning">}}
Der Cloudflare-Support kann DNS oder Einstellungen für gelöschte Domains
nicht wiederherstellen.
{{</Aside>}}

___

## Verwandte Ressourcen

-   [Sekundäre Nameserver](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-) (Enterprise-Feature)
-   [CNAME-Setup](/dns/zone-setups/partial-setup) (Business- und Enterprise-Feature)
-   [So ändern Sie Nameserver auf Cloudflare](/dns/zone-setups/full-setup/setup)
