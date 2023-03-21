---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/203464660-Cloudflare-con-Shopify
title: Cloudflare con Shopify
---

# Cloudflare con Shopify



## Información general

Cloudflare se asocia con Shopify para ofrecer a todos los sitios web de comercio electrónico de Shopify los beneficios de rendimiento y seguridad de Cloudflare. Los comerciantes de Shopify también pueden utilizar su propia cuenta de Cloudflare para redireccionar mediante proxy el tráfico web a través de Cloudflare con un plan Enterprise. Orange-to-Orange (O2O) es la función que te permite activar Cloudflare con tu propia cuenta y aprovecharte de los beneficios de nuestra red en Shopify. O2O aplica tanto tu configuración de seguridad como la de Shopify.

![Diagrama de cómo funciona O2O para los comerciantes de Shopify en Cloudflare.](/support/static/hc-ext-shopify_o2o.png)

___

## Habilita O2O para tu sitio web de Shopify

La activación de O2O solo está disponible en el plan Enterprise de Cloudflare.

Para habilitar O2O en tu cuenta, necesitas un registro A o DNS CNAME que dirija el dominio de tu tienda al dominio shops.myshopify.com. Registro en la nube naranja.

Después de añadir el registro DNS con proxy habilitado, contacta con tu equipo de cuenta para habilitar O2O en el dominio de tu tienda.

___

## Prácticas recomendadas

Cuando se utiliza con O2O, determinadas funciones de Cloudflare pueden interrumpir el flujo de tráfico a tu tienda de Shopify o mostrar datos incorrectos a tus visitantes, lo que significa que:

-   No debes utilizar las siguientes funciones de Cloudflare:
    -   [Almacenamiento en caché de HTML](https://developers.cloudflare.com/cache/)
    -   [Reglas de firewall personalizadas](https://developers.cloudflare.com/firewall/)
    -   [Limitación de velocidad](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [Load Balancing](https://developers.cloudflare.com/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   Debes tener cuidado con las siguientes funciones de Cloudflare:
    -   [Reglas de página](https://support.cloudflare.com/hc/articles/218411427): las reglas de página mal configuradas que coinciden con el subdominio utilizado para Shopify pueden bloquear o alterar el flujo de visitantes a tu sitio web.
    -   [Workers](https://developers.cloudflare.com/workers/): Al igual que las reglas de página, Workers puede interrumpir el flujo de tráfico a tu sitio web, reduciendo de esta manera los ingresos. Escribe Workers con cuidado. Es recomendable excluir el subdominio utilizado con Shopify de la ruta de Workers.
    -   [Registros DNS CAA](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/caa-records): Shopify usa Let's Encrypt para emitir certificados SSL/TLS para dominios de comercio electrónico. Si añades algún registro DNS CAA, debes seleccionar Let's Encrypt como autoridad de certificación (CA), de lo contrario las conexiones HTTPS pueden fallar.

{{<Aside type="note">}}
Cloudflare no puede solucionar ningún problema de configuración con las
funciones anteriores para O2O.
{{</Aside>}}

___

## ¿Necesitas más ayuda?

Si tienes una tienda en línea en Shopify y configuras tus propias cuentas de Cloudflare, ponte en contacto con tu equipo de cuenta o con Soporte de Cloudflare para que te ayuden a resolver los problemas. Cloudflare recurrirá a Shopify si hay problemas técnicos que Cloudflare no pueda resolver.

-   [Cómo contactar con Soporte de Cloudflare](https://support.cloudflare.com/hc/es-es/articles/200172476-Contacting-Cloudflare-Support)
