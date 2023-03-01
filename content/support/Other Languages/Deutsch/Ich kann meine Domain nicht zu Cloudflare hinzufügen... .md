---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/205359838-Ich-kann-meine-Domain-nicht-zu-Cloudflare-hinzuf%C3%BCgen-
title: Ich kann meine Domain nicht zu Cloudflare hinzufügen... 
---

# Ich kann meine Domain nicht zu Cloudflare hinzufügen... 



## Schritt 1 DNSSEC deaktivieren

Cloudflare kann keine autoritative DNS-Auflösung für eine Domain bereitstellen, wenn **DNSSEC** in Ihrem Domain-Registrar aktiviert ist. Sie können **DNSSEC** erneut aktivieren, nachdem die Domain _in Cloudflare aktiv_ ist. Sie müssen **DNSSEC** gemäß [Cloudflares](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [DNSSEC](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)[\-Anforderungen jedoch konfigurieren](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS).

Mögliche Symptome für die Aktivierung von **DNSSEC** bei der Registrierungsstelle sind:

-   DNS wird nach dem Wechsel zu Cloudflares Nameservern nicht aufgelöst.
-   Der Status der DNS-Abfrageantwort lautet _SERVFAIL_.
-   Die Domain bleibt in der Cloudflare-App „Übersicht“ im Status _Ausstehend_.



{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ds cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

___

## Schritt 2 Die Domain registrieren

Es gibt mehrere Probleme bei der Domainregistrierung, die verhindern, dass eine Domain zu Cloudflare hinzugefügt wird:

-   Domain verwendet eine neue TLD (Top-Level-Domain), die noch nicht in der [öffentlichen Suffix-Liste](https://publicsuffix.org/list/) aufgeführt ist.
-   Möglicherweise wird ein Fehler angezeigt, der dem folgenden ähnelt:

_Bad.psl-example konnte nicht als registrierte Domain identifiziert werden. Stellen Sie sicher, dass Sie die Root-Domain und nicht die Subdomain (z. B. example.com, nicht subdomain.example.com) angeben (Code: 1099)_

-   Die Domain ist noch nicht vollständig registriert oder in den Registrierungsdaten sind keine Nameserver aufgeführt

-   Wenden Sie sich an Ihren Domain-Registrar, um die Nameserver in der Registrierung zu aktualisieren

Im Folgenden sind einige mögliche Fehler im Cloudflare-Dashboard aufgeführt, wenn Sie eine nicht ordnungsgemäß registrierte Domain über **\+ Site hinzufügen** hinzufügen:

-   _exampledomain.com ist keine registrierte Domain (Code: 1049)_
-   _Fehler beim Nachschlagen der Registrierungs- und Hosting-Informationen von exampledomain.com. Bitte wenden Sie sich an den Cloudflare-Support oder versuchen Sie es später erneut. (Code: 1110)_

___

## Schritt 3 DNS für die Root-Domain auflösen



{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ns cloudflare.comns3.cloudflare.com. ns4.cloudflare.com. ns5.cloudflare.com. ns6.cloudflare.com. ns7.cloudflare.com.</span></div></span></span></span></code></pre>{{</raw>}}

Darüber hinaus muss die Domain bei der Abfrage einen gültigen _SOA-Eintrag_ zurückgeben. _SOA-Einträge_ können über Online-Tools von Drittanbietern wie [https://www.whatsmydns.net/#SOA/](https://www.whatsmydns.net/%23SOA/) oder über ein Befehlszeilenterminal überprüft werden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short soa cloudflare.comns3.cloudflare.com. dns.cloudflare.com. 2029202248 10000 2400 604800 300</span></div></span></span></span></code></pre>{{</raw>}}

___

## Schritt 4 Überprüfen, ob die Domain in Cloudflare gesperrt ist



Wenn Cloudflare zu viele Versuche beobachtet, eine Domain zu Cloudflare hinzuzufügen, wird ein Fehler zurückgegeben:



###   
Aufhebung einer dauerhaften Sperre

Senden Sie eine Anfrage an den Cloudflare-Support, wenn beim Hinzufügen einer Domain einer der folgenden Fehler auftritt:

-   _Fehler: Diese Zone ist gesperrt und kann derzeit nicht zu Cloudflare hinzugefügt werden. Wenden Sie sich an den Cloudflare-Support. (Code: 1097)_
-   _Diese Zone kann derzeit nicht zu Cloudflare hinzugefügt werden. Wenden Sie sich an den Cloudflare-Support. (Code: 1093)_
