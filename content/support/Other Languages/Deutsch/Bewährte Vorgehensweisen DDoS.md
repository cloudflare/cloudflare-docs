---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200170166-Bew%C3%A4hrte-Vorgehensweisen-DDoS-Vorbeugema%C3%9Fnahmen
title: Bewährte Vorgehensweisen DDoS-Vorbeugemaßnahmen 
---

# Bewährte Vorgehensweisen: DDoS-Vorbeugemaßnahmen 



## Überblick

Stellen Sie nach der Registrierung bei Cloudflare sicher, dass Ihre Website anhand der folgenden Empfehlungen vollständig auf mögliche DDoS-Angriffe vorbereitet ist.

### Verwenden Sie Cloudflare als Proxy für Ihre DNS-Einträge

Angreifer versuchen, Ihre Ursprungs-IP-Adresse zu identifizieren, um Ihren Ursprungswebserver ohne den Schutz von Cloudflare direkt anzugreifen. Verbergen Sie Ihre Ursprungs-IP-Adresse vor einem direkten Angriff, indem Sie den Traffic über Cloudflare als Proxy leiten.

Stellen Sie mit den folgenden Schritten maximalen Schutz für Ihre DNS-Einträge her:

1.  [Aktivieren Sie den Cloudflare-Proxy (orangefarbene Wolke).](https://support.cloudflare.com/hc/articles/200169626)
2.  Entfernen Sie DNS-Einträge, die für FTP oder SSH verwendet werden, und verwenden Sie stattdessen Ihre Ursprungs-IP, um FTP- oder SSH-Anfragen direkt auszuführen. Nutzen Sie alternativ [Cloudflare Spectrum](/spectrum/getting-started/) als Proxy für FTP und SSH.
3.  [Markieren Sie A-, AAAA- oder CNAME-Einträge für Ihren E-Mail-Server mit einer grauen Wolke.](https://support.cloudflare.com/hc/articles/200168876)
4.  Entfernen Sie Platzhalter-Einträge in Free-, Pro- oder Business-Domains, da diese Ihre Ursprungs-IP-Adresse offenlegen. [Cloudflare schützt Platzhalter-Einträge nur für Domains im Enterprise Plan](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries).

### Entfernen Sie eventuelle Beschränkungen oder Limitationen für Anfragen von Cloudflare-IPs

Sobald Sie den Traffic an Cloudflare weiterleiten, kommen die Verbindungen zu Ihrem Ursprungswebserver von [IP-Adressen von Cloudflare](http://www.cloudflare.com/ips). Daher ist es wichtig, dass Ihr Ursprungswebserver [Cloudflare-IPs](https://support.cloudflare.com/hc/articles/201897700) auf eine Whitelist setzt und explizit den Traffic blockiert, der nicht von Cloudflare oder den IP-Adressen Ihrer vertrauenswürdigen Partner, Anbieter oder Anwendungen stammt.

### Stellen Sie die ursprünglichen Besucher-IPs in Ihren Ursprungsserver-Protokollen wieder her.

Um die tatsächlichen IPs hinter einem Angriff anzuzeigen, müssen Sie [die ursprünglichen Besucher-IPs](https://support.cloudflare.com/hc/sections/200805497) in Ihren Ursprungsserver-Protokollen wieder herstellen. Andernfalls listet der gesamte Traffic die IP-Adressen von Cloudflare in Ihren Protokollen auf. Cloudflare zeichnet immer die ursprüngliche IP-Adresse des Besuchers [als HTTP-Header](https://support.cloudflare.com/hc/articles/200170986) in der Anfrage auf. Informieren Sie Ihren Hosting-Provider, dass Sie einen Reverse-Proxy verwenden und dass der gesamte Traffic von den IPs von Cloudflare kommen wird, wenn sie die aktuellen Verbindungen betrachten.

### Ändern Sie die Server-IP-Adressen, nachdem Sie die Website zu Cloudflare verschoben haben

Cloudflare verbirgt die IP-Adressen Ihres Ursprungsservers für den Traffic, für den Sie Cloudflare als Proxy verwenden. Als zusätzliche Sicherheitsmaßnahme empfehlen wir, dass Sie sich an Ihren Hosting-Provider wenden und neue Ursprungsserver-IPs anfordern.

{{<Aside type="note">}}
Für diese Maßnahme kann eine Gebühr anfallen, weshalb Sie dies auf
Grundlage des Risikos eines Angriffs auf Ihre Website mit Ihrem
Hosting-Provider besprechen sollten.
{{</Aside>}}

### Verwenden Sie Rate Limiting, um Brute-Force- und Layer-7-DDoS-Angriffe zu verhindern

Um als normale HTTP-Anfragen getarnte Angriffe zu vereiteln, können Website-Administratoren mit Rate Limiting fein abgestimmte Schwellenwerte für die Last festlegen, die sie für ihren Webserver erwarten. Richten Sie mit einem einfachen Klick ein grundlegendes Rate Limiting ein, um [Ihre Anmeldeseiten vor Brute-Force-Angriffen zu schützen](https://support.cloudflare.com/hc/articles/115001635128#3UWQC5PrVScHgEGRMobRMm).

Die Cloudflare Free, Pro und Business Plans enthalten 10.000 kostenlose Anfragen pro Monat. Weitere Informationen finden Sie in unserer Anleitung zu [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

___

## Verwandte Ressourcen

-   [Cloudflares DDoS-Schutz](https://support.cloudflare.com/hc/articles/200172676)
-   [Reaktion auf DDoS-Angriffe](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [Was ist ein DDoS-Angriff?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
