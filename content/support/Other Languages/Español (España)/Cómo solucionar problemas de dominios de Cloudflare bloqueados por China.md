---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200169566-C%C3%B3mo-solucionar-problemas-de-dominios-de-Cloudflare-bloqueados-por-China
title: Cómo solucionar problemas de dominios de Cloudflare bloqueados por China
---

# Cómo solucionar problemas de dominios de Cloudflare bloqueados por China



## Descripción

Para confirmar si tus IP de Cloudflare asociadas con tu dominio están bloqueadas en China, brinda los siguientes detalles a [asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

1\. Ejecución de [traceroute a tu dominio](http://support.cloudflare.com/entries/22050846-how-do-i-run-a-traceroute) desde un lugar en China para demostrar la ruta de red. 

2\. Los resultados del [Analizador del Gran Firewall](http://www.greatfirewallofchina.org/).

3\. La respuesta de la resolución de DNS para el dominio desde una ubicación en China.  Considera el uso de una herramienta como el [Analizador de DNS](https://dnschecker.org/).

4\. El tipo de contenido que tiene tu sitio.  China censura ciertos contenidos que incluyen pornografía, juegos de azar y algunas discusiones políticas.

{{<Aside type="note">}}
La asistencia de Cloudflare solo puede confirmar si un dominio está
bloqueado por China y no tiene control sobre el desbloqueo.
{{</Aside>}}