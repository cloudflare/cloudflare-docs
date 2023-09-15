---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/217912538-Mein-DNS-funktioniert-nicht
title: Mein DNS funktioniert nicht 
---

# Mein DNS funktioniert nicht 



## Symptome

Nachfolgend sind einige der häufigsten DNS-Fehlermeldungen aufgeführt, die in Internetbrowsern (wie Safari oder Chrome) angezeigt werden könnten:

-   _This site can’t be reached. (Diese Website kann nicht erreicht werden.)_
-   _This webpage is not available. (Diese Webseite ist nicht verfügbar.)_
-   _err\_name\_not\_resolved (Abk. für Fehler: Name nicht aufgelöst)_
-   _Can't find the server. (Server nicht gefunden.)_
-   [_Fehler 1001: DNS resolution error (Fehler 1001: DNS-Auflösungsfehler)_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## Häufigste Ursachen und Lösungen

Nachfolgend sind die häufigsten Ursachen für DNS-Auflösungsfehler sowie geeignete Lösungen aufgeführt.

### Falsch geschriebene Domain oder Subdomain

Stellen Sie sicher, dass die Domain oder Subdomain in der Anforderungs-URL keine Schreibfehler enthält.

### Fehlende DNS-Einträge

Vergewissern Sie sich, dass in der **DNS**\-App Ihres Cloudflare Dashboards die erforderlichen DNS-Einträge stehen. Dazu gehören die folgenden Einträge:

-   Die Root-Domain (z. B. _beispiel.de_)
-   Alle vorhandenen Subdomains (z. B. _www.beispiel.de, blog.beispiel.de_ usw.)

{{<Aside type="tip">}}
Wenn Sie ein [partielles
Setup](/dns/zone-setups/partial-setup)
haben, stellen Sie sicher, dass Ihre DNS-Einträge auch bei Ihren
autoritativen Nameservern vorhanden sind.
{{</Aside>}}

Erfahren Sie mehr über das Einrichten von A- und CNAME-[DNS-Einträgen](/dns/manage-dns-records/how-to/create-dns-records).

### Vor dem Hinzufügen der Domain zu Cloudflare wurde DNSSEC nicht deaktiviert

Wenn Sie bei Ihrem Domain-Provider [DNSSEC nicht deaktiviert](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269) haben, bevor Sie die Domain zu Cloudflare hinzufügen, kommt es zu einem DNS-Auflösungsfehler.

### Nameserver zeigen nicht mehr auf Cloudflare

Wenn Sie DNS-Einträge über die **DNS**\-App in Ihrem Cloudflare-Dashboard verwalten und Ihre Domain nicht mehr auf Nameserver von Cloudflare zeigt, wird die DNS-Auflösung unterbrochen. Dies kann vorkommen, wenn Ihr Domain-Registrar die Nameserver für Ihre Domain so umschaltet, dass sie nun auf seine eigenen standardmäßigen Nameserver zeigen.Um festzustellen, ob das der Fall ist, müssen Sie [überprüfen, ob Ihre Domain Cloudflares Nameserver verwendet](https://support.cloudflare.com/hc/articles/4426809598605).

### Nicht aufgelöste IP-Adresse

In seltenen Fällen scheitert der DNS-Resolver auf dem Client, von dem die URL angefordert wird, daran, einen DNS-Eintrag in eine gültige IP-Adresse aufzulösen. Laden Sie die Seite nach einer kurzen Wartezeit einfach erneut, um zu sehen, ob das Problem dadurch verschwindet.Für dieses Problem ist Cloudflare nicht verantwortlich, aber die Verwendung von [Cloudflares DNS-Resolver](/1.1.1.1/setup/) kann möglicherweise helfen.Wenden Sie sich an Ihren Hosting-Provider und bitten Sie um weitere Hilfe bei Ihrem aktuellen DNS-Resolver.
