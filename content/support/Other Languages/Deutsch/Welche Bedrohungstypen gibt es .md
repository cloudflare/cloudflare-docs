---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/204191238-Welche-Bedrohungstypen-gibt-es-
title: Welche Bedrohungstypen gibt es 
---

# Welche Bedrohungstypen gibt es? 

Cloudflare klassifiziert die Bedrohungen, die blockiert werden oder eine Challenge erzeugen. Um Ihnen dabei zu helfen, den Traffic Ihrer Website besser zu verstehen, misst die Metrik „Type of Threats Mitigated” (Bekämpfte Bedrohungstypen) auf der Analytics-Seite die Bedrohungen, die blockiert wurden oder eine Challenge erzeugten, anhand der folgenden Kategorien:

**Schädlicher Browser:  
**Die Quelle der Anfrage war nicht legitim oder die Anfrage selbst war böswillig. Benutzern wird eine [1010-Fehlerseite](https://support.cloudflare.com/hc/articles/360029779472#error1010) im Browser angezeigt.

Die Browserintegritätsprüfung von Cloudflare sucht nach üblichen HTTP-Headern, die am häufigsten von Spammern missbraucht werden, und verweigert den Zugriff auf Ihre Seite. Außerdem zeigt sie Benutzern eine Challenge an, die keinen User Agent oder einen nicht standardmäßigen User Agent (auch häufig von Bots, Crawlern oder Besuchern verwendet) haben.

[Hier erfahren Sie mehr über die Browserintegritätsprüfung.](https://support.cloudflare.com/hc/en-us/articles/200170086-What-does-the-Browser-Integrity-Check-do-)

**Blockierter Hotlink**:  
„Hotlink Protection“ stellt sicher, dass andere Websites nicht Ihre Bandbreite nutzen können, indem sie Seiten aufbauen, die mit Bildern verknüpft sind, die auf Ihrem Ursprungsserver gehostet werden. Dieses Feature kann von Cloudflare-Kunden aktiviert und deaktiviert werden.

[Hier erfahren Sie mehr über Hotlink Protection.](https://support.cloudflare.com/hc/en-us/articles/200170026)

**Challenge für Person**:  
Besuchern wurde eine CAPTCHA-Challenge-Seite angezeigt, die nicht bestanden wurde.

_Hinweis: Eine CAPTCHA-Seite ist ein schwer lesbares Wort oder einen Reihe von Zahlen, die nur von einem Menschen gelesen werden können. Falls die Eingabe falsch ist, wird die Anfrage blockiert._

**Challenge für Browser**:  
Ein Bot hat eine ungültige Antwort auf die JavaScript-Challenge gegeben (was in den meisten Fällen nicht passiert: Bots reagieren normalerweise nicht auf Challenges, weshalb „fehlgeschlagene“ JavaScript-Challenges nicht protokolliert würden).

_Hinweis: Bei einer JavaScript-Challenge wird Ihnen für_ _ca. fünf Sekunden eine Interstitialseite angezeigt, während Cloudflare eine Reihe von mathematischen Challenges durchführt, um sicherzustellen, dass der Besucher eine legitime Person ist._

**Schädliche IP:  
**Eine Anfrage kam von einer IP-Adresse, der Cloudflare aufgrund des Bedrohungswerts nicht vertraut.

Cloudflare verwendet Bedrohungswerte, die aus Quellen wie Project Honeypot sowie aus dem Traffic unserer eigenen Communitys stammen, um zu bestimmen, ob ein Besucher legitim oder böswillig ist. Wenn ein legitimer Besucher eine Challenge besteht, hilft dies dabei, den Bedrohungswert aufgrund des vorher beobachteten negativen Verhaltens von dieser IP-Adresse auszugleichen. Unser System lernt anhand dieser Aktivität, wer eine Bedrohung darstellt. Eigentümer von Websites können den Bedrohungswert jederzeit in den Sicherheitseinstellungen von Cloudflare überschreiben.

**Länderblockierung**:  
Anfragen aus Ländern, die aufgrund der in der Firewall App festgelegten Benutzerkonfiguration blockiert wurden.

[Hier erfahren Sie, wie Sie Länder mit der Firewall App blockieren können.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**IP-Blockierung (Benutzer)**:  
Anfragen von spezifischen IP-Adressen, die aufgrund der in der Firewall App festgelegten Benutzerkonfiguration blockiert wurden.

[Hier erfahren Sie, wie Sie IPs mit der Firewall App blockieren können.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**IP-Bereichsblockierung (/16)**:  
Ein /16-IP-Bereich, der aufgrund der in der Firewall App festgelegten Benutzerkonfiguration blockiert wurde.

[Hier erfahren Sie, wie Sie IPs mit der Firewall App blockieren können.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**IP-Bereichsblockierung (/24)**:  
Ein /24-IP-Bereich, der aufgrund der in der Firewall App festgelegten Benutzerkonfiguration blockiert wurde.

[Hier erfahren Sie, wie Sie IPs mit der Firewall App blockieren können.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**Neues CAPTCHA (Benutzer):  
**Challenge auf Grundlage der Benutzerkonfigurationen, die für die IP des Besuchers in der WAF oder der Firewall App festgelegt wurden.

[Hier erfahren Sie mehr über Challenges für Besucher mit der WAF.](https://support.cloudflare.com/hc/en-us/articles/200172236-How-do-I-manage-whether-the-WAF-blocks-a-visitor-or-challenges-them-with-a-challenge-page-)

**CAPTCHA-Fehler**:  
Anfragen von einem Bot, der die Challenge nicht bestanden hat.

_Hinweis: Eine CAPTCHA-Seite ist ein schwer lesbares Wort oder einen Reihe von Zahlen, die nur von einem Menschen gelesen werden können. Falls die Eingabe falsch ist, wird die Anfrage blockiert._

**Bot-Anfrage:  
**Eine Anfrage von einem Bot.

**Nicht klassifiziert:**  
Nicht klassifizierte Bedrohungen umfassen eine Reihe von automatischen Blockierungen, die nicht mit der Browserintegritätsprüfung (Schädlicher Browser) zusammenhängen. Diese Bedrohungen stehen in der Regel im Zusammenhang mit Hotlink Protection und andere Aktionen, die aufgrund der Zusammensetzung der Anfrage (und nicht ihres Inhalts) am Netzwerkrand stattfinden.

„Nicht klassifiziert“ erfasst eine Reihe von Bedingungen, unter denen wir häufige Bedrohungen im Zusammenhang mit Hotlink Protection sowie bestimmte Fälle von IP-Reputation und spezifische Anfragen, die an der Cloudflare Edge blockiert werden, bevor sie Ihre Server erreichen, gruppieren.
