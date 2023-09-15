---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/205359838-No-puedo-a%C3%B1adir-mi-dominio-a-Cloudflare-
title: No puedo añadir mi dominio a Cloudflare…
---

# No puedo añadir mi dominio a Cloudflare…



## Paso 1: deshabilita DNSSEC.

Cloudflare no puede proporcionar una resolución de DNS autoritativo para un dominio cuando **DNSSEC** está habilitado en tu registrar de dominio. Puedes volver a habilitar **DNSSEC** después de que el dominio esté _Activo_ en Cloudflare, pero debes configurar **DNSSEC** mediante el uso de los [requisitos](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [DNSSEC](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) de [Cloudflare.](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)

{{<Aside type="note">}}
**DNSSEC** solo debe estar deshabilitado para los dominios con
configuración Completo, donde los servidores de nombres de Cloudflare
serán autoritativos.
{{</Aside>}}

Los síntomas posibles del **DNSSEC** habilitado en el registrar incluyen los siguientes:

-   El DNS no se resuelve después de cambiarse a los servidores de nombres de Cloudflare.
-   El estado de la respuesta de la consulta DNS es _SERVFAIL_.
-   El dominio permanece en un estado _Pendiente_ en la aplicación Información general de Cloudflare.

Ponte en contacto con tu proveedor de dominio si necesitas asistencia para deshabilitar **DNSSEC**. Si un _registro DS_ existe para el dominio, es probable que **DNSSEC** esté habilitado. Los _registros DS_ pueden revisarse a través de herramientas de terceros en línea, tales como [https://mxtoolbox.com/ds.aspx](https://mxtoolbox.com/ds.aspx), o a través del terminal de comando de línea:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ds cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

___

## Paso 2: registra el dominio.

Existen varios problemas de registro de dominio que evitarán que un dominio se añada a Cloudflare:

-   El dominio utiliza un dominio de primer nivel nuevo, que aún no se encuentra en la [Public Suffix List](https://publicsuffix.org/list/).
-   Puedes encontrar un error similar al siguiente:

_No pudimos identificar mal.psl-ejemplo como un dominio registrado. Asegúrate de estar proporcionando el dominio raíz y no un subdominio (p. ej., ejemplo.com, no subdominio.ejemplo.com) (Código: 1099)_

{{<Aside type="note">}}
Puedes encontrar las instrucciones para actualizar Public Suffix List en
<https://github.com/publicsuffix/list/wiki/Guidelines>
{{</Aside>}}

-   El dominio todavía no se registra por completo o los datos de registro no mencionan los servidores de nombre.

-   Ponte en contacto con tu registrador de dominio para actualizar los servidores de nombres en el registro.

A continuación, encontrarás posibles errores en el panel de control de Cloudflare que ocurren al añadir un dominio mal registrado a través de **+Añadir sitio**:

-   _dominioejemplo.com no es un dominio registrado (Código: 1049)_
-   _No se encontró información sobre el registrar y el alojamiento de dominio.ejemplo.com esta vez. Ponte en contacto con el equipo de asistencia de Cloudflare o inténtalo más tarde. (Código: 1110)_

___

## Paso 3: resuelve el DNS para el dominio raíz.

Antes de poder añadir un dominio a Cloudflare, el dominio debe devolver _registros NS_ para servidores de nombres válidos y en funcionamiento. Los _registros DS_ pueden revisarse a través de herramientas de terceros en línea, tales como [https://www.whatsmydns.net/#NS](https://www.whatsmydns.net/%23NS/), o a través del terminal de comando de línea con un comando dig:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ns cloudflare.comns3.cloudflare.com. ns4.cloudflare.com. ns5.cloudflare.com. ns6.cloudflare.com. ns7.cloudflare.com.</span></div></span></span></span></code></pre>{{</raw>}}

Además, el dominio debe devolver un _registro SOA_ válido cuando se consulte. Los _registros SOA_ pueden revisarse a través de herramientas de terceros en línea, tales como [https://www.whatsmydns.net/#SOA](https://www.whatsmydns.net/%23SOA/), o a través del terminal de comando de línea:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short soa cloudflare.comns3.cloudflare.com. dns.cloudflare.com. 2029202248 10000 2400 604800 300</span></div></span></span></span></code></pre>{{</raw>}}

___

## Paso 4: verifica si el dominio está prohibido en Cloudflare.

Cloudflare no permite que se añadan ciertos dominios, ya sea de manera permanente o temporal.  Mira las instrucciones a continuación para quitar cualquier tipo de prohibición.

{{<Aside type="note">}}
El equipo de asistencia de Cloudflare no puede expedir el vencimiento de
la prohibición temporal.
{{</Aside>}}

### Eliminación de una prohibición temporal

Cuando Cloudflare observa demasiados intentos de añadir un dominio a Cloudflare, devuelve un error:

_Error con la solicitud de Cloudflare: \[1105\] Esta zona está prohibida de manera temporal y, por el momento, no puede añadirse a Cloudflare. Ponte en contacto con el equipo de asistencia de Cloudflare._

Antes de ponerte en contacto con el equipo de asistencia de Cloudflare, espera tres horas antes de intentar añadir nuevamente el dominio a Cloudflare.

### Eliminación de una prohibición permanente

Presenta una solicitud ante el equipo de asistencia de Cloudflare si observas uno de los siguientes errores al añadir un dominio:

-   _Error: Esta zona está prohibida y, por el momento, no puede añadirse a Cloudflare. Ponte en contacto con el equipo de asistencia de Cloudflare. (Código: 1097)_
-   _Esta zona no puede añadirse a Cloudflare por el momento. Ponte en contacto con el equipo de asistencia de Cloudflare. (Código: 1093)_

{{<Aside type="tip">}}
Error (Código: 1093) o (Código: 1116) también puede significar que
incluiste un subdominio (unhost.ejemplo.com) en lugar del dominio raíz
(ejemplo.com) al añadir el dominio a Cloudflare.
{{</Aside>}}