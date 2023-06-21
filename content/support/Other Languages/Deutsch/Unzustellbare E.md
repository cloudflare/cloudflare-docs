---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200168876-Unzustellbare-E-Mail-bei-der-Verwendung-von-Cloudflare
title: Unzustellbare E-Mail bei der Verwendung von Cloudflare 
---

# Unzustellbare E-Mail bei der Verwendung von Cloudflare 

{{<Aside type="warning">}}
DNS-Einträge für E-Mails müssen in der DNS-App auf dem Cloudflare
Dashboard mit dem grauen Wolkensymbol versehen sein.
{{</Aside>}}

## Fehlerbehebungstipps

{{<Aside type="note">}}
Wenden Sie sich an Ihren E-Mail-Administrator oder E-Mail-Provider, um
sicherzustellen, dass Sie gültige DNS-Einträge haben.
{{</Aside>}}

Wenn Sie die [Best Practices für Cloudflare MX-Einträge](https://support.cloudflare.com/hc/de/articles/200168876-Unzustellbare-E-Mail-bei-der-Verwendung-von-Cloudflare#h.sf43uhyy1ztk) befolgen und immer noch Probleme mit dem Senden und Empfangen von E-Mails haben, befolgen Sie diese Schritte zur Fehlerbehebung:

### Fehlen DNS-Einträge?

Wenden Sie sich an Ihren E-Mail-Administrator um zu bestätigen, dass die DNS-Einträge für Ihre Domain korrekt sind. Weitere Informationen zum [Verwalten von DNS-Einträgen in Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151) finden Sie in unserem Handbuch, wenn Sie Unterstützung beim Hinzufügen oder Bearbeiten von DNS-Einträgen benötigen.

{{<Aside type="note">}}
Der Cloudflare Support kann keine DNS-Einträge in Ihrem Konto ändern.
{{</Aside>}}

###   
Verwenden Sie Cloudflare nicht als Proxy für E-Mail-bezogene DNS-Einträge.

Falls Sie einen _MX-Eintrag_ von „mail.domain.com“ haben, muss der _A-Eintrag_ für „mail.domain.com“ ein graues Wolkensymbol neben dem DNS-_A-Eintrag_ haben, wie im Supporthandbuch für die [Verwaltung von DNS-Einträgen in Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151) beschrieben.

### Wenden Sie sich für Unterstützung an Ihren E-Mail-Provider.

Falls Ihre E-Mail kurz nach der Bearbeitung von DNS-Einträgen nicht funktioniert, wenden Sie sich für weitere Unterstützung an Ihren E-Mail-Administrator oder E-Mail-Provider, damit der Cloudflare Support die Daten zu dem Problem erhalten kann.

___

## Best Practices für MX-Einträge in Cloudflare

Befolgen Sie diese Richtlinien, um eine erfolgreiche Zustellung Ihres E-Mail-Traffics sicherzustellen.

-   Versehen Sie Ihre E-Mail-bezogenen DNS-Einträge mit einem grauen Wolkensymbol, damit Cloudflare keine Proxyfunktion für Ihren E-Mail-Traffic übernimmt.
-   Verwenden Sie für den E-Mail-Traffic und den HTTP/HTTPS-Traffic separate IP-Adressen. Cloudflare empfiehlt, nicht aufeinanderfolgende IPs aus verschiedenen IP-Bereichen zu verwenden.
-   Da Cloudflare keine standardmäßige Proxyfunktion für E-Mail-Traffic übernehmen kann, legen Sie die IP-Adresse Ihres Ursprungswebservers offen. Die Informationen in Ihrer Ursprungs-IP-Adresse würden es Angreifern ermöglichen, die Sicherheitsmerkmale von Cloudflare zu umgehen und Ihren Webserver direkt anzugreifen.
-   Konfigurieren Sie _MX-Einträge_ nicht für eine Rootdomain, für die Cloudflare eine Proxyfunktion übernimmt.
-   Viele Hostinganbieter geben den Namen der Rootdomain im Inhalt des _MX-Eintrags_ an. Wenn Sie DNS von Cloudflare verwenden, geben Sie eine Subdomain wie „mail.example.com“ im Inhalt des _MX-Eintrags_ an und erstellen Sie einen separaten _A-Eintrag_ für „mail.example.com“ in Cloudflare, um auf die IP-Adresse Ihres Mailservers zu verweisen.

{{<Aside type="warning">}}
Wenn Sie einen *MX-Eintrag* für eine Rootdomain haben, für die
Cloudflare eine Proxyfunktion übernimmt, haben potenzielle Angreifer
Zugriff auf die IP-Adresse Ihres Ursprungswebservers. Unter [Warum habe
ich eine dc-\#\#\#\#\#\#\#\#\#
Subdomain?](https://support.cloudflare.com/hc/en-us/articles/200168536-Why-do-I-have-a-dc-subdomain-) finden
Sie weitere Details.
{{</Aside>}}