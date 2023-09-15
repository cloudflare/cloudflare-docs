---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200169566-Fehlerbehebung-bei-Cloudflare-Domains-die-von-China-blockiert-werden
title: Fehlerbehebung bei Cloudflare-Domains, die von China blockiert werden 
---

# Fehlerbehebung bei Cloudflare-Domains, die von China blockiert werden 



## Übersicht

Um zu bestätigen, ob die Cloudflare-IPs, die Ihrer Domain zugeordnet sind, in China blockiert werden, müssen Sie dem [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476) die folgenden Details vorlegen:

1\. Ein [Traceroute zu Ihrer Domain](http://support.cloudflare.com/entries/22050846-how-do-i-run-a-traceroute) von einem Standort in China aus, um den Netzwerkpfad zu demonstrieren. 

2\. Die Ergebnisse des [Great Firewall Checkers](http://www.greatfirewallofchina.org/).

3\. Eine DNS-Auflösungsantwort für die Domain von einem Standort in China.  Dafür können Sie ein Tool wie [DNS Checker](https://dnschecker.org/) verwenden.

4\. Die Art des Inhalts Ihrer Website.  China zensiert manche Inhalte wie Pornographie, Spiele und bestimmte Arten politischer Diskussionen.

{{<Aside type="note">}}
Der Cloudflare-Support kann nur bestätigen, ob eine Domain von China
blockiert wird und hat keinen Einfluss auf die Freigabe.
{{</Aside>}}