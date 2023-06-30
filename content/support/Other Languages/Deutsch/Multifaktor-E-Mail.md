---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003614752-Multifaktor-E-Mail-Authentifizierung
title: Multifaktor-E-Mail-Authentifizierung 
---

# Multifaktor-E-Mail-Authentifizierung 



## Überblick

Cloudflare arbeitet mit einer Multifaktor-Authentifizierungsmethode (MFA), um die Kontosicherheit zusätzlich zu erhöhen.  Durch MFA wird verhindert, dass ein Konto übernommen wird, wenn ein Angreifer unbefugten Zugang zu einem Konto erhält, weil das Passwort offengelegt wurde oder leicht zu erraten war.

Cloudflare zweifelt einen Anmeldeversuch an, wenn der Nutzer die korrekten Anmeldedaten von einer unbekannten IP-Adresse aus eingibt.

![Alte URL: https://support.cloudflare.com/hc/article_attachments/360035322751/account_access_email.png
Artikel-IDs: 115003614752 | Multifaktor-E-Mail-Authentifizierung
](/images/support/hc-import-account_access_email.png)

Bei einer zweifelhaften Anmeldung sendet Cloudflare einen Code an die für das Konto bei uns gespeicherte E-Mail-Adresse. Dieser Code kann nur einmal verwendet werden und verfällt nach 30 Minuten. Wenn der korrekte Code über das Dashboard eingegeben wird, wird die betreffende IP gespeichert, und weitere Anmeldeversuche von der gleichen IP-Adresse werden 90 Tage lang nicht angezweifelt.

![Alte URL: https://support.cloudflare.com/hc/article_attachments/360035323072/login_authentication.png
Artikel-IDs: 115003614752 | Multifaktor-E-Mail-Authentifizierung
](/images/support/hc-import-login_authentication.png)

Wenn Sie „Diesen Computer merken“ ankreuzen, werden die Anmeldungen von diesem Gerät/Browser aus im Rahmen der MFA bis zu 14 Tage lang nicht mehr angezweifelt. Nach 14 Tagen beginnt Cloudflare erneut, die IP-Adresse bei Anmeldungen von diesem Gerät/Browser aus zu überprüfen.

{{<Aside type="note">}}
Die E-Mail-MFA kann nur durch die Aktivierung der
[Zwei-Faktor-Authentifizierung](https://support.cloudflare.com/hc/de/articles/200167906)
deaktiviert werden.
{{</Aside>}}

___

## Fehlerbehebung bei MFA

E-Mails von Cloudflare werden vom E-Mail-Dienst des Empfängers manchmal als Spam aussortiert. Wenn Sie ein Authentifizierungstoken erwarten, sollten Sie im Spam-Ordner nach E-Mails von Cloudflare sehen und einen Filter konfigurieren, durch den E-Mails von _no-reply@notify.cloudflare.com_ _**durchgelassen werden.**_

In anderen Fällen kann es vorkommen, dass die E-Mails vom E-Mail-Dienst des Empfängers zurückgewiesen werden. Cloudflare wird dann erneut versuchen, die E-Mail zu senden, aber nach einigen Versuchen wird Ihre E-Mail-Adresse gekennzeichnet und es werden keine weiteren E-Mails ausgesandt.

Wenn Sie keine E-Mail erhalten, obwohl Sie sich vergewissert haben, dass Ihr E-Mail-Dienst die E-Mails von Cloudflare nicht aussortiert, wenden Sie sich bitte an den [Cloudflare Support](https://support.cloudflare.com/requests/new).

___

## Verwandte Ressourcen

-   [Absicherung des Nutzerzugriffs mit Zwei-Faktor-Authentifizierung](https://support.cloudflare.com/hc/de/articles/200167906)
