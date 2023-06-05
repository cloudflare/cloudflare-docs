---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003687931-Advertencia-sobre-la-exposici%C3%B3n-de-tu-direcci%C3%B3n-IP-de-origen-a-trav%C3%A9s-de-los-registros-DNS
title: Advertencia sobre la exposición de tu dirección IP de origen a través de los registros DNS
---

# Advertencia sobre la exposición de tu dirección IP de origen a través de los registros DNS



## Información general

Cuando tus registros DNS están en la nube naranja, Cloudflare acelera y protege tu sitio.

Una consulta dig en tu dominio raíz de nube naranja devuelve una dirección IP de Cloudflare. De este modo, la dirección IP de tu servidor de origen permanece oculta al público. Recuerda que los beneficios de la nube naranja solo se aplican al tráfico HTTP.

En determinadas circunstancias, el panel de **registros DNS** en la aplicación **DNS** del panel de control de Cloudflare muestra una advertencia cada vez que tienes registros DNS en la nube gris que puedan exponer la dirección IP de tu servidor de origen. Esta advertencia no bloquea ni afecta de ningún modo el tráfico dirigido a tu sitio.

Cuando se expone la dirección IP de tu servidor, este es más vulnerable a los ataques directos. Todavía es posible (pero más difícil) que los atacantes determinen la dirección IP de tu servidor de origen durante el redireccionamiento mediante proxy a Cloudflare.

A continuación te presentamos dos casos donde podrías ver una advertencia de exposición de dirección IP en Cloudflare.

___

## Caso 1: los registros DNS que deberían estar en la nube naranja

Si ves la siguiente advertencia:

_`Este registro expone la dirección IP de tu servidor de origen. Para ocultar tu dirección IP de origen e incrementar la seguridad de tu servidor, haz clic en la nube gris para cambiarla a naranja.{0}`_

Cloudflare recomienda poner el registro en la nube naranja para que cualquier consulta dig en ese registro devuelva una dirección IP de Cloudflare, y la dirección IP de tu servidor de origen permanezca oculta al público.

Para aprovechar los beneficios de rendimiento y seguridad de Cloudflare, recomendamos tener en la nube naranja los registros DNS que manejan el tráfico HTTP, incluidos los registros A, AAAA y CNAME.

___

## Caso 2: registros DNS que necesitan estar en la nube gris

Cuando tienes un registro  A, AAAA, _CNAME_ o MX  en la nube gris que apunta al mismo servidor de origen que aloja tu sitio, Cloudflare muestra una de las advertencias siguientes:

_`Un registro A, AAA, CNAME o MX se dirige a tu servidor de origen y expone tu IP de origen.`_

_`Este registro expone la dirección IP de tu servidor de origen, lo que puede dejarla vulnerable ante la denegación de servicio.`_

{{<Aside type="note">}}
Cloudflare ahora admite el redirecconamiento mediante proxy del registro
\'\*\' comodín para la gestión de DNS en todos los planes de clientes.
Antes solo se ofrecía a los planes Enterprise.
{{</Aside>}}

Una consulta _dig_ en estos registros revela la dirección IP de tu servidor de origen. Esta información facilita a los posibles atacantes dirigirse directamente a tu servidor de origen.

Sin embargo, hay momentos en los que algunos de tus registros DNS necesitan permanecer en la nube gris. Por ejemplo:

-   Cuando debes alojar varios servicios (por ejemplo, un sitio web y un correo electrónico) en el mismo servidor físico.

Para mitigar este riesgo, te recomendamos lo siguiente:

-   Analiza el impacto de alojar varios servicios en el mismo servidor de origen en aquellos casos en los que es inevitable tener registros DNS en la nube gris.
-   Coloca en la nube naranja todos los registros que comparten la misma dirección IP que tu dominio raíz y pueden redirigirse mediante proxy de manera segura a través de Cloudflare.
