---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360020991331-Hinzuf%C3%BCgen-herstellerspezifischer-DNS-Eintr%C3%A4ge-zu-Cloudflare
title: Hinzufügen herstellerspezifischer DNS-Einträge zu Cloudflare 
---

# Hinzufügen herstellerspezifischer DNS-Einträge zu Cloudflare 



## Hinzufügen von DNS-Einträgen für Anbieter

Für diesen Artikel sind Vorkenntnisse in der Verwaltung von DNS-Einträgen über das Cloudflare-Dashboard erforderlich.  Weitere Informationen finden Sie in Cloudflares Artikel zur [Verwaltung von DNS-Einträgen](https://support.cloudflare.com/hc/en-us/articles/360019093151).

  
**Google**

Fügen Sie die folgenden MX-Einträge hinzu:

| **Name** | **TTL** | **Eintragstyp** | **Priorität**  | **Ziel** |
| --- | --- | --- | --- | --- |
| @ | Auto | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

Nach dem Hinzufügen sehen die DNS-Einträge in der Cloudflare-App **DNS** ungefähr wie folgt aus:

[Testen Sie die Google Apps-E-Mail-Konfiguration](https://toolbox.googleapps.com/apps/checkmx/check).

Fügen Sie einen _CNAME-Eintrag_ für die Google App Engine zu Cloudflare DNS hinzu.

Lautet die Domain beispielsweise _www.example.com_, sieht der _CNAME-Eintrag_ ungefähr folgendermaßen aus:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www CNAME  ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

Informationen zum Konfigurieren einer Weiterleitung für eine Google Apps-Domain finden Sie im [Google-Handbuch zur URL-Weiterleitung](https://support.google.com/a/answer/53340?hl=en).

**Amazon**

AWS-Kunden müssen die Nameserver ihrer Domain so aktualisieren, dass sie auf die Cloudflare-Nameserver verweisen, die in der App **Overview** des Cloudflare-Dashboards aufgeführt sind:

1.  Melden Sie sich bei AWS an.
2.  Klicken Sie oben rechts in der Navigationsleiste auf **Mein Konto**.
3.  Wählen Sie in der Dropdown-Liste **AWS Management Console** aus.
4.  Klicken Sie auf **Services** und wählen Sie **Route 53** aus.
5.  Aktualisieren Sie Nameserver an zwei Stellen:
    
    -   Klicken Sie auf **Gehostete Zonen** und wählen Sie die Domain aus, die mit den Nameservern von Cloudflare aktualisiert werden soll.
    -   Bearbeiten Sie die Nameserver, um auf die Nameserver von Cloudflare zu verweisen.
    
      
    -   Klicken Sie auf **Registrierte Domains**.
    -   Wählen Sie die Domain aus, die mit den Nameservern von Cloudflare aktualisiert werden soll.
    -   Klicken Sie auf **Nameserver hinzufügen oder bearbeiten**.

Lesen Sie in der Dokumentation von Amazon nach, wie Sie [](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[einen Amazon S3-Bucket](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html) erstellen.

Notieren Sie sich die vollständige Host-URL, die dem Bucket zugewiesen ist.

Fügen Sie einen _CNAME-Eintrag_ für den AWS-Bucket in Cloudflare DNS hinzu. Wenn die vollständige Host-URL des Buckets beispielsweise _files.example.com_ lautet, fügen Sie einen _CNAME-Eintrag_ hinzu, der folgendem ähnelt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Dateien  CNAME  files.example.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

Informationen zu [SES und Überprüfungseinstellungen finden Sie in der Amazon-Dokumentation](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html).

Suchen Sie die von Amazon bereitgestellten _TXT_\- und _CNAME_\-Bestätigungseinträge.

Fügen Sie die Einträge zu Cloudflare DNS hinzu.  Wenn die Cloudflare-Domain beispielsweise _example.com_ lautet, ähneln die DNS-Einträge den folgenden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot;verificationstring._domainkey.example.com  CNAME  verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

Weitere Informationen zur ELB-Konfiguration bei Amazon finden Sie in der [ELB-Hilfe von Amazon](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html).

1.  Fügen Sie Cloudflare einen _CNAME-Eintrag_ für den Hostnamen hinzu, beispielsweise: _elb_
2.  Ersetzen Sie in der Cloudflare-App **DNS** den **Domainnamen** durch das ELB-Ziel:  
    _  
    <AWS-Hostname>. <Region>._elb.amazonaws.com ist das richtige _CNAME_\-Zielformat  
    (beispielsweise: _my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com).
3.  Wenden Sie sich an den AWS-Support, um den _AWS-Hostnamen_ oder die _Region zu ermitteln_.

**Microsoft**

Befolgen Sie die Anweisungen von Microsoft zum [Konfigurieren der Azure DNS-Einstellungen](https://www.windowsazure.com/en-us/develop/net/common-tasks/custom-dns-web-site/).

Fügen Sie die erforderlichen Azure-Einträge zu Cloudflare-DNS hinzu.

Wenn die Domain beispielsweise _example.com_ lautet, sieht das Eintragsformat folgendermaßen aus:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  A  203.0.113.1www.example.com  CNAME  example.azurewebsites.net</span></div></span></span></span></code></pre>{{</raw>}}

Informationen zu Verifizierungseinträgen finden Sie in der Azure-Dokumentation zum [Erstellen von Domain-Verifizierungseinträgen](https://docs.microsoft.com/en-us/office365/admin/dns/create-dns-records-for-azure-dns-zones?view=o365-worldwide#add-a-txt-record-for-verification).

**Verschiedene Anbieter**

Sie können Cloudflare für die Verwendung mit ClickFunnels konfigurieren.  Für diesen Vorgang müssen Ihre Cloudflare-DNS-Einstellungen aktualisiert werden.

In den folgenden Artikeln von ClickFunnels wird beschrieben, wie Sie die beiden Dienste für Ihre Site am besten konfigurieren:

-   [Hinzufügen einer Cloudflare-Subdomain](https://help.clickfunnels.com/hc/en-us/articles/360005906774-Adding-A-Cloudflare-Subdomain-)
-   [Cloudflare-CNAME-Eintrag](https://help.clickfunnels.com/hc/en-us/articles/360005906094-Cloudflare-CNAME-Record)

In den folgenden Beispielen wird beschrieben, wie Sie Cloudflare richtige Zoho-DNS-Einträge hinzufügen. Ersetzen Sie in allen Beispielen _example.com_ durch den tatsächlichen Domainnamen:

-   Hinzufügen von Zoho _MX-Einträgen_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  MX  mx.zohomail.com (setzen Sie die Priorität auf 10)example.com MX  mx2.zohomail.com (setzen Sie die Priorität auf 20)</span></div></span></span></span></code></pre>{{</raw>}}

-   (Optional) So fügen Sie einen _SPF-Eintrag_ hinzu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   (Optional) Um über eine [benutzerdefinierte Zoho-URL](https://adminconsole.wiki.zoho.com/domains/CustomURL.html) auf E-Mails zuzugreifen, fügen Sie einen _CNAME-Eintrag_ hinzu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">E-Mail  CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   (Optional) So fügen Sie einen [Zoho-Domain-Validierungseintrag hinzu](https://www.zoho.com/mail/help/adminconsole/domain-verification.html):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

Informationen zum Hinzufügen des CNAME-Eintrags zu Cloudflare finden Sie in der Dokumentation zu [Unbounce](https://documentation.unbounce.com/hc/en-us/articles/204011950).

Normalerweise ähneln die DNS-Einträge der folgenden Liste. Ersetzen Sie _example.com_ durch den tatsächlichen Domainnamen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">E-Mail  CNAME  sendgrid.netexample.com  SPF  v=spf1 a mx include:sendgrid.net ~allexample.com  TXT  v=spf1 a mx include:sendgrid.net ~allmtpapi._domainkey.EXAMPLE.com  CNAME  dkim.sendgrid.net.smtpapi._domainkey.e.EXAMPLE.COM  CNAME  dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

-   Informationen zur DNS-Konfiguration finden Sie in [WPEngines Dokumentation](http://wpengine.com/support/how-to-configure-your-dns/).
-   Bestimmen Sie, ob Sie einen _A_ oder _CNAME-Eintrag_ zu Cloudflare DNS hinzufügen möchten:  
    [Ermitteln Ihrer IP-Adresse bei WPengine](http://wpengine.com/support/find-ip/)

  

-   Weitere Informationen zum Hinzufügen der Einträge finden Sie in der Cloudflare-Dokumentation zur [Verwaltung von DNS-Einträgen](https://support.cloudflare.com/hc/en-us/articles/360019093151).

Siehe Nings Dokumentation zu [benutzerdefinierten Domains und DNS-Einträgen](http://www.ning.com/help/?p%3D2870).

Wenn die benutzerdefinierte Ning-Domain _www.example.com_ lautet, fügen Sie einen _CNAME_ und einen _A-Eintrag_ wie folgt hinzu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.example.com  CNAME  example.ning.com.example.ning.com  A  208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

Sobald Ning die Domain überprüft hat, ändern Sie das graue Wolkensymbol in ein orangefarbenes Wolkensymbol für die Ning-DNS-Einträge, damit der Datenverkehr an Cloudflare weitergeleitet werden kann.

In der SmugMug-Dokumentation finden Sie die neuesten Informationen zu den Anforderungen für DNS-Einträge. Fügen Sie _CNAME-Einträge_ für SmugMug ähnlich folgenden hinzu:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Foto CNAME domains.smugmug.comFotos CNAME domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

Sobald SmugMug die Domain überprüft hat, ändern Sie das graue Wolkensymbol in ein orangefarbenes Wolkensymbol für die SmugMug-DNS-Einträge, damit der Datenverkehr an Cloudflare weitergeleitet werden kann.

Weitere Informationen zu den Anforderungen für DNS-Einträge finden Sie in [Mandrills Artikel zu DNS-Einträgen](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-).

Mandrill erfordert das Hinzufügen von _SPF_ und _DKIM-Einträgen_. Beziehen Sie die DNS-Eintragswerte von Mandrill.

Fügen Sie die _SPF_\- und _DKIM-Einträge_ als _TXT-Einträge_ in der Cloudflare-DNS-App hinzu.

Wenn beispielsweise _example.com_ die Mandrill-Domain ist, fügen Sie DNS-Einträge wie die folgenden hinzu.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 include:spf.mandrillapp.com ?allmandrill._domainkey.example.com  TXT  v=DKIM1\; (Werte von Mandrill)</span></div></span></span></span></code></pre>{{</raw>}}

Konfigurieren Sie Rackspace CloudFiles über _CNAME-Eintrag_. Lesen Sie die [Rackspace CloudFiles-Dokumentation](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container) [.](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)

Bestätigen Sie das richtige _CNAME_\-Ziel mit Rackspace-Unterstützung.

Ein beispielhafter _CNAME-Eintrag_ sieht folgendermaßen aus:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rack  CNAME  e0978.r18.cf2.rackcdn.com</span></div></span></span></span></code></pre>{{</raw>}}

Wenn _example.com_ die benutzerdefinierte Domain ist, fügen Sie Cloudflare DNS-Einträge hinzu, ähnlich den folgenden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  A  66.6.44.4www.example.com  CNAME  domains.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## Verwandte Ressourcen

[Verwaltung von Cloudflare-DNS-Einträgen](https://support.cloudflare.com/hc/en-us/articles/360019093151)

[CNAME-Umwandlung](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
