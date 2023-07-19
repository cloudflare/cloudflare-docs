---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/203471284-Probleme-mit-der-Anmeldung-und-dem-Konto
title: Probleme mit der Anmeldung und dem Konto 
---

# Probleme mit der Anmeldung und dem Konto 



## Haben Sie Ihre E-Mail-Adresse vergessen?

#### **Enterprise Plan**

Wenn Sie die mit Ihrem Konto verknüpfte E-Mail-Adresse vergessen haben, wenden Sie sich an Ihren Customer Success Manager.

#### **Free, Pro und Business Plan**

Wenn Sie die mit Ihrer Anwendung verknüpfte E-Mail-Adresse vergessen haben:

1\. Gehen Sie auf [](http://dash.cloudflare.com/forgot-email)[E-Mail-Adresse vergessen?](https://dash.cloudflare.com/forgot-email)

2\. Geben Sie Ihren Domain-Namen ein.

3\. Cloudflare sendet eine E-Mail an die Adresse, die Ihrem Domain-Namen zugeordnet ist. Wenn Sie nicht innerhalb von 20 Minuten eine E-Mail erhalten, überprüfen Sie Ihren Spam-Ordner. Die Nachricht wird von `no-reply@cloudflare.com` oder `noreply@notify.cloudflare.com` gesendet.

{{<Aside type="note">}}
Dieser Vorgang hat keine Auswirkungen auf Ihr Konto und Ihre
E-Mail-Adresse wird an niemanden weitergegeben.
{{</Aside>}}

Wenn Sie immer noch nicht auf die mit Ihrem Cloudflare-Konto verknüpfte E-Mail-Adresse zugreifen können, müssen Sie [Ihre Domain auf ein anderes Konto verschieben](https://support.cloudflare.com/hc/articles/204615358).

Dies ist notwendig, damit Cloudflare das Hijacking von Konten verhindern kann.

___

## Haben Sie Ihr Passwort vergessen?

Wenn Sie Ihr Kontopasswort vergessen haben:

1\. Gehen Sie auf [](http://dash.cloudflare.com/forgot-email)[Passwort zurücksetzen](https://dash.cloudflare.com/password-reset).

2\. Geben Sie Ihre E-Mail-Adresse ein.

3\. Sie sollten eine E-Mail von Cloudflare erhalten. Wenn Sie innerhalb von 20 Minuten keine E-Mail erhalten, überprüfen Sie Ihren Spam-Ordner. Die Nachricht wird von `no-reply@cloudflare.com` oder `noreply@notify.cloudflare.com` gesendet.

4\. Klicken Sie auf den Link zum Zurücksetzen des Passworts. Dieser Link läuft nach zwei Stunden ab.

{{<Aside type="tip">}}
Cloudflare empfiehlt starke Passwörter. Die Mindestanforderungen sind:

-   Das Passwort muss mindestens 8 Zeichen lang sein.
-   Das Passwort muss eine Ziffer enthalten.
-   Das Passwort muss ein Sonderzeichen enthalten.
{{</Aside>}}

{{<Aside type="note">}}
Wenn Sie immer noch keinen Zugriff auf Ihr Konto haben, schauen Sie sich
in der
[Cloudflare-Community](https://community.cloudflare.com/t/i-cannot-login-to-my-account/27823)
nach Hilfe um.
{{</Aside>}}

___

## Probleme mit der Zwei-Faktor-Authentifizierung?

Es kann vorkommen, dass ein Mobilgerät, ein Sicherheitsschlüssel oder ein Authentifizierungscode für Sie nicht mehr verfügbar ist.

#### **Backup-Codes verwenden**

In der Regel können Sie diese Probleme dadurch lösen, dass Sie einen Backup-Code verwenden oder einen Backup-Code von Ihrer bevorzugten Authentifizierungs-App abrufen.

{{<Aside type="tip">}}
In der Dokumentation von Google finden Sie Informationen zur
[Übertragung von „Google Authenticator"-Codes von einem Android-Gerät
auf ein
anderes](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0).
{{</Aside>}}

Nach der Einrichtung der 2FA wurden Sie gebeten, Ihre Backup-Codes an einem sicheren Ort aufzubewahren. So stellen Sie den Zugang mit einem Backup-Code von Cloudflare wieder her:

1\. Rufen Sie den Backup-Code von dem Ort ab, an dem Sie ihn gespeichert haben.

2\. Rufen Sie die Cloudflare-Anmeldeseite auf.

3\. Tragen Sie den Backup-Code im Anmeldebildschirm ein und klicken Sie dann auf **Anmelden**.

{{<Aside type="note">}}
Ein Backup-Code wird ungültig, wenn er benutzt wurde.
{{</Aside>}}

#### **2FA deaktivieren**

Wenn Sie oder ein anderer Kontoinhaber noch Zugriff auf Ihr Cloudflare-Konto haben, können Sie [Ihre 2FA-Einstellungen](https://dash.cloudflare.com/?to=/:account/members) deaktivieren.

#### **Ihr Konto wiederherstellen**

Wenn Sie nicht mehr auf Ihr 2FA-Konto oder Ihre Backup-Codes zugreifen können, verwenden Sie ein verifiziertes Gerät, um einen temporären Zugangscode anzufordern.

1\. Melden Sie sich beim [Cloudflare-Dashboard](https://dash.cloudflare.com/login) an.

2\. Klicken Sie auf der Seite **Zwei-Faktor-Authentifizierung** auf **Sie können nicht auf Ihr 2FA-Gerät oder Ihre Backup-Codes zugreifen?**.

3\. Klicken Sie auf **Wiederherstellung beginnen**.

4\. Verifizieren Sie mit einem temporären Zugangscode die mit Ihrem Konto verknüpfte E-Mail-Adresse.

5\. Verifizieren Sie Ihr Gerät mit einem Gerät, mit dem Sie sich zuvor angemeldet haben. Wenn Sie Ihre Cookies häufig löschen oder sich von einer anderen IP-Adresse aus anmelden, wird sich unser System nicht mehr an Ihr Gerät erinnern und Sie müssen für die Verifizierung ein anderes Gerät verwenden.

6\. Aus Sicherheitsgründen müssen Sie 3 bis 5 Tage nach Abschluss der Verifizierung warten, bis Sie Ihren vorläufigen Zugangscode erhalten.

#### **Benötigen Sie noch zusätzliche Hilfe?**

Wenn Sie immer noch Probleme mit der Zwei-Faktor-Authentifizierung haben, folgen Sie den Anweisungen in der Phase **Gerät verifizieren** von **Ihr Konto wiederherstellen**.

___

## Sie können Ihre E-Mail nicht verifizieren?

Sobald Sie sich für ein Cloudflare-Konto angemeldet haben, sollten Sie eine E-Mail mit einem Link erhalten, über den Sie Ihr E-Mail-Konto verifizieren.

Wenn Sie die Seite **Dieser Link ist nicht gültig** (This link is not valid) sehen, versuchen Sie, den Link:

-   in einem anderen Browser anzuklicken
-   im aktuellen Browser im Inkognito-Modus anzuklicken

___

## Ihre Cloudflare-E-Mail-Adresse oder Ihr Passwort ändern

#### **E-Mail-Adresse ändern**

So ändern Sie die E-Mail-Adresse, die mit Ihrem Cloudflare Konto verknüpft ist:

1\. Gehen Sie zu Ihrem [Profil](https://dash.cloudflare.com/?to=/:account/profile).

2\. Wählen Sie Ihr Konto aus.

3\. Wählen Sie im Menü **E-Mail-Adresse** die Option **E-Mail-Adresse ändern** aus.

3\. Geben Sie in diesem Dialog unter **Neue E-Mail-Adresse** Ihre neue E-Mail-Adresse ein. Wiederholen Sie sie unter **E-Mail-Adresse bestätigen**. Geben Sie dann Ihr aktuelles Passwort ein.

5\. Klicken Sie auf **Speichern**.

#### **Passwort ändern**

1\. Gehen Sie zu Ihrem [Profil](https://dash.cloudflare.com/?to=/:account/profile).

2\. Wählen Sie Ihr Konto aus.

3\. Wählen Sie **Authentifizierung**.

4\. Unter **Passwort** klicken Sie auf **Ändern**.

5\. Ändern Sie Ihr Passwort und klicken Sie auf **Speichern**.

{{<Aside type="note">}}
Sie sollten außerdem in Betracht ziehen, Ihre [API-Schlüssel und
-Token](https://support.cloudflare.com/hc/articles/200167836) zu ändern,
um Ihr Konto besser zu schützen.
{{</Aside>}}

___

## Ein kompromittiertes Konto wieder sicher machen

Wenn Sie verdächtige Aktivitäten innerhalb Ihres Cloudflare-Kontos bemerken, sollten Sie Ihr Konto mit [diesen Schritten](/fundamentals/get-started/basic-tasks/account-security/securing-a-compromised-account/) absichern.

___

## Anmeldeoptionen

Sie können sich auf dem [Cloudflare-Dashboard](https://dash.cloudflare.com/login) auf verschiedene Arten anmelden:

-   **E-Mail und Passwort**: Geben Sie zur Anmeldung Ihre E-Mail Adresse und Ihr Passwort ein.
-   **Single Sign On (SSO):** Geben Sie Ihre E-Mail-Adresse ein (vorausgesetzt, Ihr Administrator hat [SSO als Anmeldeoption konfiguriert](/cloudflare-one/applications/configure-apps/dash-sso-apps/)).
-   **Mit Apple anmelden**:
    -   _E-Mail-Adresse des Cloudflare-Kontos ist auch die Apple-ID:_: Sie können sich entweder mit Ihrer E-Mail-Adresse und Ihrem Passwort oder mit Apple anmelden.
    -   _E-Mail-Adresse des Cloudflare-Kontos ist nicht die Apple-ID_: Es wird ein neues Cloudflare-Konto erstellt, wenn Sie sich mit Apple anmelden. Wenn Sie sich bei einem bestehenden Konto anmelden möchten, [ändern Sie Ihre E-Mail-Adresse](https://support.cloudflare.com/hc/de/articles/203471284-Probleme-mit-der-Anmeldung-und-dem-Konto#12345679) so, dass sie mit der Adresse Ihrer Apple-ID übereinstimmt.

{{<Aside type="note">}}
Wenn Sie sich bei Ihrem Cloudflare-Nutzerkonto mit Single Sign-On (SSO)
anmelden, können Sie sich nicht mit Apple anmelden.
{{</Aside>}}

___

## Verwandte Ressourcen

-   [Verschieben von Domains zwischen Cloudflare-Konten](https://support.cloudflare.com/hc/articles/204615358)
-   [Absicherung des Nutzerzugriffs mit Zwei-Faktor-Authentifizierung (2FA)](https://support.cloudflare.com/hc/articles/200167906)
-   [Umstellung Ihrer Domain-Nameserver auf Cloudflare](https://support.cloudflare.com/hc/articles/205195708)
-   [Verwaltung von API-Schlüssel und -Token](https://support.cloudflare.com/hc/articles/200167836)
