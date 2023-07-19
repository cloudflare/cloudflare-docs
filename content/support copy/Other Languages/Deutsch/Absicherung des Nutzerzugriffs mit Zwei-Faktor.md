---
pcx_content_type: troubleshooting
language_tag: german
title: Absicherung des Nutzerzugriffs mit Zwei-Faktor-Authentifizierung (2FA)
source: https://support.cloudflare.com/hc/de/articles/200167906-Absicherung-des-Nutzerzugriffs-mit-Zwei-Faktor-Authentifizierung-2FA-
title: Absicherung des Nutzerzugriffs mit Zwei-Faktor-Authentifizierung (2FA) 
---

# Absicherung des Nutzerzugriffs mit Zwei-Faktor-Authentifizierung (2FA) 



## Übersicht

Durch Zwei-Faktor-Authentifizierung (2FA) können Kontoinhaber eine zusätzliche Sicherheitsebene bei der Anmeldung für Cloudflare-Konten schaffen. Dieser zusätzliche Authentifizierungsschritt bedeutet, dass Sie einerseits etwas angeben müssen, das Sie wissen (etwa ein Cloudflare-Passwort) und andererseits etwas, das Sie haben (etwa einen Authentifizierungscode von einem Mobilgerät). 

{{<Aside type="note">}}
Cloudflare-Nutzerkonten, die für die Verwendung von Single Sign-On (SSO)
konfiguriert sind, können keine 2FA konfigurieren.
{{</Aside>}}

Damit Sie auf jeden Fall sicheren Zugang zu Ihrem Konto bekommen, auch wenn Ihr Mobilgerät gerade nicht greifbar ist (z. B. wenn Sie sich ein neues Smartphone angeschafft haben), bietet Cloudflare auch Backup-Codes zum Herunterladen an. 

{{<Aside type="tip">}}
Wenn Sie die Backup-Codes heruntergeladen haben, sollten Sie sie an
einem sicheren Ort aufbewahren.
{{</Aside>}}

Nur Superadministratoren können 2FA bei Cloudflare-Konten aktivieren. Als Kontoinhaber wird Ihnen automatisch die Rolle des Superadministrators zugewiesen. Nach der Aktivierung von 2FA müssen alle Mitglieder des Cloudflare-Kontos 2FA auf ihren Mobilgeräten konfigurieren.

{{<Aside type="note">}}
Bei Free-, Pro- und Business-Kunden kann es nur einen Superadministrator
geben. Enterprise-Kunden können mehrere Superadministratoren haben und
[weitere Mitgliederrollen
zuweisen](https://support.cloudflare.com/hc/articles/205065067).
{{</Aside>}}

___

## Zwei-Faktor-Authentifizierung für Ihr Cloudflare-Konto aktivieren

{{<Aside type="warning">}}
Superadministratoren können die **2FA-Erzwingung** aktivieren, sodass
alle Mitglieder 2FA aktivieren müssen. Sollten Sie kein
Superadministrator sein, werden Sie zur Aktivierung von 2FA gezwungen,
bevor Sie die Einladung annehmen, einem Cloudflare-Konto als Mitglied
beizutreten.
{{</Aside>}}

So aktivieren Sie die Zwei-Faktor-Authentifizierung für Ihr Cloudflare-Konto:

1\. Melden Sie sich im Cloudflare Dashboard an.

2\. Klicken Sie unter dem Dropdown **Mein Profil** auf **Mein Profil**.

3\. Klicken Sie auf die Registerkarte **Authentifizierung**. 

4\. Scrollen Sie nach unten zum Abschnitt **Zwei-Faktor-Authentifizierung** und setzen Sie dort den Schalter auf _Ein_.

![2FA_enable.png](/images/support/2FA_enable.png)

___

## Zwei-Faktor-Authentifizierung für Ihre Cloudflare-Anmeldung konfigurieren

Alle Cloudflare-Kontoinhaber müssen 2FA aktivieren. Wenn Sie kein Superadministrator sind,

-   dann müssen Sie 2FA einschalten, bevor Sie die Einladung, Mitglied bei einem Cloudflare-Konto zu werden, annehmen können.
-   Wählen Sie Ihre bevorzugte Authentifizierungs-App aus und laden Sie sie auf Ihr Mobilgerät herunter. Hierfür stehen viele Apps zur Verfügung, zum Beispiel [Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0) und [Authy](https://authy.com/features/). Sie sehen dann einen QR-Code. 

So aktivieren Sie 2FA:

1\. Scannen Sie den QR-Code mit Ihrem Mobilgerät und geben Sie den Code in der Authentifizierungs-App ein.

2\. Geben Sie Ihr Cloudflare-Passwort ein und klicken Sie dann auf **Weiter**.

-   Wenn Sie den QR-Code nicht scannen können, klicken Sie auf **Kann QR-Code nicht scannen, alternativen Schritten folgen**, um Ihre Authentifizierungs-App manuell zu konfigurieren.

![2FA_scan_QR_code.png](/images/support/2FA_scan_QR_code.png)

3\. Geben Sie Ihr Passwort ein und klicken Sie erneut auf **Weiter**. Anschließend sehen Sie Ihre Backup-Prüfcodes.

4\. Wenn Sie die Backup-Codes bekommen haben, sollten Sie sie an einem sicheren Ort aufbewahren. Klicken Sie auf **Herunterladen**, **Drucken** oder **Kopieren**, um die Codes zu speichern, und dann auf **Weiter**.

![2FA_review_and_backup_codes_v2.png](/images/support/2FA_review_and_backup_codes_v2.png)

Sie können Ihre Backup-Codes auf dem folgenden Bildschirm neu erzeugen, außerdem jederzeit in der Registerkarte **Authentifizierung**. 

5\. Klicken Sie zur Fertigstellung auf dem Einrichtungsbildschirm für die Backup-Codes auf **Weiter**. Wie Sie sehen, ist **Zwei-Faktor-Authentifizierung** jetzt _eingeschaltet_.

6\. Sie haben auch die Möglichkeit, einen neuen Satz Backup-Codes anzufordern. Klicken Sie auf **Jetzt neu erzeugen**, um einen neuen Satz Zwei-Faktor-Backup-Codes zu speichern.

![2FA_configuration_complete.png](/images/support/2FA_configuration_complete.png)

___

## Zwei-Faktor-Authentifizierung für Ihr Cloudflare-Konto deaktivieren

Nur Superadministratoren können 2FA bei Cloudflare-Konten deaktivieren. Dadurch wird 2FA für alle Kontomitglieder deaktiviert. 

So deaktivieren Sie 2FA für Ihr Cloudflare-Konto:

1\. Melden Sie sich im Cloudflare Dashboard an.

2\. Klicken Sie unter dem Dropdown **Mein Profil** auf **Mein Profil**.

3\. Klicken Sie auf die Registerkarte **Authentifizierung**.

4\. Scrollen Sie nach unten zum Abschnitt **Zwei-Faktor-Authentifizierung** und setzen Sie dort den Schalter auf _Aus_. Sie sehen nun einen Bestätigungsbildschirm.

5\. Geben Sie Ihr Passwort und einen Code der Authentifizierungs-App oder einen Backup-Code ein und klicken Sie dann auf **Deaktivieren**.

![2FA_disable.png](/images/support/2FA_disable.png)

___

## Verlorenen Zugang zu Zwei-Faktor-Authentifizierung bei Cloudflare wiederherstellen

{{<Aside type="warning">}}
Sicherheitsschlüssel können nur mit Browsern verwendet werden, die das
WebAuthn-Protokoll unterstützen.
{{</Aside>}}

Die häufigsten Probleme im Zusammenhang mit 2FA entstehen, wenn man keinen Zugang zu einem Mobilgerät oder Authentifizierungscode mehr hat. In den meisten Fällen können Sie das Problem dadurch lösen, dass Sie einen Backup-Code benutzen oder in der Dokumentation Ihrer bevorzugten Authentifizierungs-App nachschlagen.

Bei der Einrichtung von 2FA wurden Sie aufgefordert, Ihre Backup-Codes an einem sicheren Ort aufzubewahren. So stellen Sie den Zugang mit einem Backup-Code von Cloudflare wieder her:

1\. Holen Sie sich den Backup-Code von dem Ort, an dem Sie ihn gespeichert oder aufbewahrt haben.

2\. Rufen Sie die Cloudflare-Anmeldeseite auf.

3\. Geben Sie den Backup-Code im Anmeldebildschirm ein und klicken Sie dann auf **Anmelden**.

![2FA_backup_code_login_annontated.png](/images/support/2FA_backup_code_login_annontated.png)

4\. Ein Backup-Code wird ungültig, wenn er benutzt wurde.

5.  Wenn Sie versuchen, einen Backup-Code noch einmal einzugeben, oder wenn Sie einen falschen Code eingeben, sehen Sie unten auf dem Bildschirm eine Fehlermeldung. Nach mehreren Fehlversuchen werden Sie aufgefordert, sich erneut anzumelden.

Links zu den Dokumentationen einiger gängiger Authentifizierungs-Apps:

-   [Google Authenticator](https://support.google.com/accounts/answer/185834?hl=en&ref_topic=2954345)
-   [Authy](https://www.authy.com/phones/change/)

Wenn Sie sich weiterhin nicht bei Ihrem Cloudflare-Konto anmelden können, [wenden Sie sich an den Support](mailto:support@cloudflare.com) und geben Sie dabei folgende Informationen an:

-   Die Liste der Domains (eine oder mehrere) in Ihrem Konto
-   Die IP-Adressen/CNAME-Einträge für die Webserver, die mit den jeweiligen Domains verknüpft sind (eine oder mehrere)
-   Der Name Ihres Hosting-Anbieters für jede dieser Domains (eine oder mehrere)
-   Die Original-Nameserver bei Ihrem Domain-Registrar für jede dieser Domains (eine oder mehrere)
-   (Optional) Die Telefonnummer, mit der Sie Authy auf Ihrem Konto bei Cloudflare.com aktiviert haben 

___

## Verwandte Themen

-   [Dokumentation für Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [Dokumentation für Authy](https://authy.com/help/)
-   [Einrichtung von Multi-User-Konten auf Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare)
