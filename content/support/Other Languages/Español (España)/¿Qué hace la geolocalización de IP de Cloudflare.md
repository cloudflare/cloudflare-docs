---
pcx_content_type: troubleshooting
language_tag: spanish
title: ¿Qué hace la geolocalización de IP de Cloudflare?
---

# ¿Qué hace la geolocalización de IP de Cloudflare?

## ¿Qué hace la geolocalización de IP de Cloudflare?

Puede activar la geolocalización de IP para que Cloudflare geolocalice los visitantes en su sitio web y le transmita el código de país en formato Alfa 2 de la norma ISO 3166-1. 

Encontrará la opción de geolocalización de IP en la aplicación **Network** del panel de Cloudflare.

La opción para geolocalización de IP se encuentra cerca de la parte inferior de la página:

![](/images/support/IPGeolocation2.png)

Una vez activada, Cloudflare añade un encabezado denominado «CF-IPCountry» a todas las solicitudes que realizamos en su sitio web. A continuación se incluyen un par de ejemplos de cómo acceder/almacenar este valor:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$country_code = $_SERVER[&quot;HTTP_CF_IPCOUNTRY&quot;]; // para acceder en PHP</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$country_code = $ENV{&quot;HTTP_CF_IPCOUNTRY&quot;}; # para acceder en Perl</span></div></span></span></span></code></pre>{{</raw>}}

Cloudflare incluye esta información para direcciones IPv4 e IPv6. Actualmente, la información de IPv4 es bastante completa, pero esperamos que los datos de IPv6 mejoren rápidamente.

{{<Aside type="note">}}
*XX*implica que no existe ningún dato para el país. T1 es un código de
país no estándar que se utiliza para la red Tor.
{{</Aside>}}