---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360020296512-H%C3%A4ufig-gestellte-Fragen-zu-DNS-Fehlerbehebung
title: Häufig gestellte Fragen zu DNS-Fehlerbehebung 
---

# Häufig gestellte Fragen zu DNS-Fehlerbehebung 



## Warum habe ich eine dc-######### Subdomain?

Die Subdomain dc-##### wird hinzugefügt, um einen Konflikt zu überwinden, der beim Auflösen Ihres SRV- oder _MX-Eintrags_ in eine Domain entsteht, die als Proxy für Cloudflare konfiguriert ist.

Daher erzeugt Cloudflare einen dc-##### DNS-Eintrag, der in die ursprüngliche IP-Adresse aufgelöst wird. Der Eintrag dc-##### stellt sicher, dass der Datenverkehr für Ihren MX- oder SRV-Eintrag nicht weitergeleitet wird (er wird direkt in Ihre Ursprungs-IP-Adresse aufgelöst), während der Cloudflare-Proxy für den gesamten anderen Datenverkehr funktioniert.

Angenommen, Ihre DNS-Einträge für E-Mails lauten vor der Verwendung von Cloudflare wie folgt:

`example.com MX example.com``example.com A 192.0.2.1`

Nach der Verwendung von Cloudflare und dem Proxy des _A-Eintrags_ liefert Cloudflare DNS-Antworten mit einer Cloudflare-IP (203.0.113.1 im folgenden Beispiel):

`example.com MX example.com``example.com A 203.0.113.1`

Da die Weiterleitung des E-Mail-Verkehrs an Cloudflare Ihre E-Mail-Dienste stören würde, erkennt Cloudflare diese Situation und erstellt einen dc-#####-Eintrag:

`example.com MX dc-1234abcd.example.com``dc-1234abcd.example.com A 192.0.2.1` `example.com A 203.0.113.1`

Das Entfernen des dc-######-Eintrags ist nur mit einer der folgenden Methoden möglich:

-   Wenn für die Domain keine E-Mail empfangen wurde, löschen Sie den _MX-Eintrag_.
-   Wenn E-Mails für die Domain empfangen werden, aktualisieren Sie den _MX-Eintrag_, um einen separaten _A-Eintrag_ für eine E-Mail-Subdomain aufzulösen, die nicht von Cloudflare weitergeleitet wird:

`example.com MX mail.example.com``mail.example.com A 192.0.2.1``example.com A 203.0.113.1`

{{<Aside type="warning">}}
Befindet sich Ihr Mailserver auf derselben IP-Adresse wie Ihr Webserver,
wird in Ihrem MX-Eintrag Ihre Ursprungs-IP-Adresse angezeigt.
{{</Aside>}}

___

## Warum geben DNS-Abfragen falsche Ergebnisse zurück?

Tools von Drittanbietern geben manchmal keine korrekten DNS-Ergebnisse zurück, wenn ein rekursiver DNS-Cache nicht aktualisiert werden kann. Löschen Sie in diesem Fall Ihren öffentlichen DNS-Cache mithilfe der folgenden Methoden:

-   [Löschen Ihres DNS-Caches in OpenDNS](http://www.opendns.com/support/cache/)
-   [Löschen Ihres DNS-Caches in Google](https://developers.google.com/speed/public-dns/cache)
-   [Lokales Löschen Ihres DNS-Caches](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## Kein A-, AAAA- oder CNAME-Eintrag gefunden?

Wenn _kein A-, AAAA- oder CNAME-Eintrag gefunden wird_, bedeutet das, dass in der Cloudflare-App **DNS** keine korrekten Einträge für die DNS-Auflösung vorhanden sind.

Fügen Sie die [fehlenden DNS-Einträge](/dns/manage-dns-records/how-to/create-dns-records) Ihrer Domain hinzu.

{{<Aside type="note">}}
Websites haben im Allgemeinen mindestens einen *A-Eintrag* , der auf die
IP-Adresse des Ursprungsservers verweist, normalerweise für die
Subdomain www und die Root-Domain.
{{</Aside>}}

___

## Warum habe ich folgende E-Mail erhalten: Ihre Namensserver haben sich geändert?

Wenn Cloudflare das DNS einer Domain hostet, überprüft es kontinuierlich, ob die Domain die Nameserver von Cloudflare für die DNS-Auflösung verwendet. Wenn die Nameserver von Cloudflare nicht verwendet werden, wird der Domain-Status in der Cloudflare-App **Überblick** von _Aktiv_ auf _Verschoben_ aktualisiert und eine E-Mail an den Kunden gesendet. Jede für mehr als 7 Tage _verschobene_ Domain wird gelöscht, es sei denn, die Domain wird wieder _aktiv_.

Schritte zur Behebung des Problems erfordern die Aktualisierung des DNS bei Ihrem Domain-Registrar, um die Cloudflare-Nameserver zu verwenden:

1.  Befolgen Sie die Schritte 2 und 3 in unserem Artikel zur [Fehlerbehebung für Domains](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-).
2.  Klicken Sie auf **Jetzt erneut prüfen** in der Cloudflare-Benutzeroberflächen-App **Übersicht**.

___

## Warum kann ich bestimmte TLDs nicht über die DNS-API hinzufügen?

Die DNS-API kann nicht verwendet werden für Domains mit .cf,.ga, .gq, .ml, oder .tk TLDs. Verwalten Sie solche TLDs über das Cloudflare Dashboard.Enterprise-Kunden können sich an [den Cloudflare-Support wenden](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730), um diese Einschränkung aufzuheben.
