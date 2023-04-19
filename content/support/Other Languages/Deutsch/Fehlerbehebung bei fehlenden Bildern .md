---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200169906-Fehlerbehebung-bei-fehlenden-Bildern
title: Fehlerbehebung bei fehlenden Bildern
---

# Fehlerbehebung bei fehlenden Bildern



## Übersicht

Wenn auf Ihrer Website Bilder fehlen, sollten Sie die folgenden Schritte durchführen und gleichzeitig den Bildladevorgang in einer privaten Browser-Registerkarte nach jedem Schritt erneut testen:

-   [Löschen Sie die URL](https://support.cloudflare.com/hc/articles/200169246#h_fb40387b-d068-4c38-96fc-29d05d35e81e) der Datei mit dem fehlenden Bild aus dem Cache.
-   [Deaktivieren Sie Cloudflare vorübergehend](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753).
-   Deaktivieren Sie **Rocket Loader** über die **Speed**\-App des Cloudflare Dashboards.
-   Deaktivieren Sie **Mirage** über die **Speed**\-App des Cloudflare Dashboards.

{{<Aside type="note">}}
**Mirage** ist nur für Domains mit einem kostenpflichtigen
Cloudflare-Plan verfügbar.
{{</Aside>}}

-   [Informieren Sie den Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476) über das Problem und ob es durch Deaktivierung von **Rocket Loader** oder **Mirage** gelöst wird.

___

## Verwandte Ressourcen

[Welche Funktion hat Rocket Loader?](https://support.cloudflare.com/hc/articles/200168056)
[Welche Funktion hat Mirage?](https://support.cloudflare.com/hc/articles/200403554)
