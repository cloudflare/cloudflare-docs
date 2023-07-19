---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/205359838-Ich-kann-meine-Domain-nicht-zu-Cloudflare-hinzuf%C3%BCgen-
title: Ich kann meine Domain nicht zu Cloudflare hinzufügen...
---

# Ich kann meine Domain nicht zu Cloudflare hinzufügen...



## Schritt 1 DNSSEC deaktivieren

Cloudflare kann keine autoritative DNS-Auflösung für eine Domain bereitstellen, wenn **DNSSEC** in Ihrem Domain-Registrar aktiviert ist. Sie können **DNSSEC** erneut aktivieren, nachdem die Domain _in Cloudflare aktiv_ ist. Sie müssen **DNSSEC** gemäß [Cloudflares](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [DNSSEC](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)[\-Anforderungen jedoch konfigurieren](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS).

{{<Aside type="note">}}
**DNSSEC** darf nur für Domains in vollständigen Setups deaktiviert
werden, in denen die Nameserver von Cloudflare maßgeblich sind.
{{</Aside>}}

Mögliche Symptome für die Aktivierung von **DNSSEC** bei der Registrierungsstelle sind:

-   DNS wird nach dem Wechsel zu Cloudflares Nameservern nicht aufgelöst.
-   Der Status der DNS-Abfrageantwort lautet _SERVFAIL_.
-   Die Domain bleibt in der Cloudflare-App „Übersicht“ im Status _Ausstehend_.

Wenden Sie sich an Ihren Domain-Anbieter, wenn Sie Unterstützung zum Deaktivieren von **DNSSEC** benötigen. Wenn für die Domain ein _DS-Eintrag_ vorhanden ist, ist wahrscheinlich **DNSSEC** aktiviert. _DS-Einträge_ können über Online-Tools von Drittanbietern wie [https://mxtoolbox.com/ds.aspx](https://mxtoolbox.com/ds.aspx) oder über ein Befehlszeilenterminal überprüft werden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ds cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

___

## Schritt 2 Die Domain registrieren

Es gibt mehrere Probleme bei der Domainregistrierung, die verhindern, dass eine Domain zu Cloudflare hinzugefügt wird:

-   Domain verwendet eine neue TLD (Top-Level-Domain), die noch nicht in der [öffentlichen Suffix-Liste](https://publicsuffix.org/list/) aufgeführt ist.
-   Möglicherweise wird ein Fehler angezeigt, der dem folgenden ähnelt:

_Bad.psl-example konnte nicht als registrierte Domain identifiziert werden. Stellen Sie sicher, dass Sie die Root-Domain und nicht die Subdomain (z. B. example.com, nicht subdomain.example.com) angeben (Code: 1099)_

{{<Aside type="note">}}
Anweisungen zum Aktualisieren der öffentlichen Suffix-Liste finden Sie
unter <https://github.com/publicsuffix/list/wiki/Guidelines>
{{</Aside>}}

-   Die Domain ist noch nicht vollständig registriert oder in den Registrierungsdaten sind keine Nameserver aufgeführt

-   Wenden Sie sich an Ihren Domain-Registrar, um die Nameserver in der Registrierung zu aktualisieren

Im Folgenden sind einige mögliche Fehler im Cloudflare-Dashboard aufgeführt, wenn Sie eine nicht ordnungsgemäß registrierte Domain über **\+ Site hinzufügen** hinzufügen:

-   _exampledomain.com ist keine registrierte Domain (Code: 1049)_
-   _Fehler beim Nachschlagen der Registrierungs- und Hosting-Informationen von exampledomain.com. Bitte wenden Sie sich an den Cloudflare-Support oder versuchen Sie es später erneut. (Code: 1110)_

___

## Schritt 3 DNS für die Root-Domain auflösen

Bevor eine Domain zu Cloudflare hinzugefügt werden kann, muss die Domain _NS-Einträge_ für gültige, funktionierende Nameserver zurückgeben. _NS-Einträge_ können über Online-Tools von Drittanbietern wie [https://www.whatsmydns.net/#NS/](https://www.whatsmydns.net/%23NS/) oder über ein Befehlszeilenterminal mit einem dig-Befehl überprüft werden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ns cloudflare.comns3.cloudflare.com. ns4.cloudflare.com. ns5.cloudflare.com. ns6.cloudflare.com. ns7.cloudflare.com.</span></div></span></span></span></code></pre>{{</raw>}}

Darüber hinaus muss die Domain bei der Abfrage einen gültigen _SOA-Eintrag_ zurückgeben. _SOA-Einträge_ können über Online-Tools von Drittanbietern wie [https://www.whatsmydns.net/#SOA/](https://www.whatsmydns.net/%23SOA/) oder über ein Befehlszeilenterminal überprüft werden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short soa cloudflare.comns3.cloudflare.com. dns.cloudflare.com. 2029202248 10000 2400 604800 300</span></div></span></span></span></code></pre>{{</raw>}}

___

## Schritt 4 Überprüfen, ob die Domain in Cloudflare gesperrt ist

Cloudflare verbietet das dauerhafte oder vorübergehende Hinzufügen bestimmter Domains.  Befolgen Sie die nachstehenden Anweisungen, um eine der beiden Arten der Sperre zu entfernen.

{{<Aside type="note">}}
Der Cloudflare-Support kann den Ablauf der vorübergehenden Sperre nicht
beschleunigen.
{{</Aside>}}

### Aufhebung einer vorübergehenden Sperre

Wenn Cloudflare zu viele Versuche beobachtet, eine Domain zu Cloudflare hinzuzufügen, wird ein Fehler zurückgegeben:

_Fehler bei Cloudflare-Anfrage: \[1105\] Diese Zone ist vorübergehend gesperrt und kann derzeit nicht zu Cloudflare hinzugefügt werden. Wenden Sie sich an den Cloudflare-Support._

Warten Sie 3 Stunden, bevor Sie sich an den Cloudflare-Support wenden, bevor Sie versuchen, die Domain erneut zu Cloudflare hinzuzufügen.

###
Aufhebung einer dauerhaften Sperre

Senden Sie eine Anfrage an den Cloudflare-Support, wenn beim Hinzufügen einer Domain einer der folgenden Fehler auftritt:

-   _Fehler: Diese Zone ist gesperrt und kann derzeit nicht zu Cloudflare hinzugefügt werden. Wenden Sie sich an den Cloudflare-Support. (Code: 1097)_
-   _Diese Zone kann derzeit nicht zu Cloudflare hinzugefügt werden. Wenden Sie sich an den Cloudflare-Support. (Code: 1093)_

{{<Aside type="tip">}}
Fehler (Code: 1093) oder (Code: 1116) kann auch bedeuten, dass Sie beim
Hinzufügen der Domain zu Cloudflare eine Subdomain
(somehost.example.com) anstelle der Root-Domain (example.com) angegeben
haben.
{{</Aside>}}