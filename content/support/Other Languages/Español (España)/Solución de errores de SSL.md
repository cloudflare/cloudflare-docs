---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200170566-Soluci%C3%B3n-de-errores-de-SSL
title: Solución de errores de SSL
---

# Solución de errores de SSL



## Información general

Hasta que Cloudflare proporcione un certificado SSL para tu dominio, los siguientes errores aparecen en varios navegadores por el tráfico HTTPS:

**Firefox**

     _ssl\_error\_bad\_cert\_domain_     _Esta conexión no es confiable_

**Chrome**

     _Tu conexión no es privada_

**Safari**

     _Safari no puede verificar la identidad del sitio web_

**Edge/Internet Explorer**

     _Hay un problema con el certificado de seguridad de este sitio web_

Incluso con un certificado SSL de Cloudflare proporcionado para tu dominio, los navegadores más antiguos muestran errores acerca de certificados SSL no confiables porque no son [compatibles con el protocolo de indicación de nombre de servidor (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication#Support) utilizado por los certificados Universal SSL de Cloudflare.

Si ocurren errores de SSL al usar un navegador más nuevo, revisa estos motivos comunes de errores de SSL:

-   [Errores de bucle de redireccionamiento o errores HTTP 525 o 526](https://support.cloudflare.com/hc/es-es/articles/200170566-Soluci%C3%B3n-de-errores-de-SSL#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [Solo algunos de tus subdominios devuelven errores de SSL](https://support.cloudflare.com/hc/es-es/articles/200170566-Soluci%C3%B3n-de-errores-de-SSL#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [Tu certificado Universal SSL de Cloudflare no está activo](https://support.cloudflare.com/hc/es-es/articles/200170566-Soluci%C3%B3n-de-errores-de-SSL#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [Error de respuesta OCSP](https://support.cloudflare.com/hc/es-es/articles/200170566-Soluci%C3%B3n-de-errores-de-SSL#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [SSL vencido o errores de coincidencia de SSL](https://support.cloudflare.com/hc/es-es/articles/200170566-Soluci%C3%B3n-de-errores-de-SSL#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### Errores de bucle de redireccionamiento o errores HTTP 525 o 526

**Indicador**

Los visitantes observan [errores de bucle de redireccionamiento](https://support.cloudflare.com/hc/articles/115000219871) al navegar hacia tu dominio o ven errores [525](https://support.cloudflare.com/hc/articles/115003011431#525error) o [526](https://support.cloudflare.com/hc/articles/115003011431#526error). Estos errores ocurren cuando la opción de SSL actual de Cloudflare en la aplicación **SSL/TLS** no es compatible con la configuración de tu servidor web de origen.

**Solución**

En el caso de bucles de redireccionamiento, consulta nuestra guía sobre [solución de errores de bucle de redireccionamiento](https://support.cloudflare.com/hc/articles/115000219871).

Para resolver errores [525](https://support.cloudflare.com/hc/articles/115003011431#525error) o [526](https://support.cloudflare.com/hc/articles/115003011431#526error), consulta nuestra configuración de SSL recomendada a continuación. Por ejemplo, si tu servidor web de origen…

-   tiene un certificado válido de una autoridad de certificación o un [certificado Origin CA](https://support.cloudflare.com/hc/articles/115000479507) de Cloudflare, usa la opción _[Completo](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_ o _[Completo (estricto)](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_ de **SSL**;

-   tiene certificados SSL autofirmados, usa la [opción de **SSL** _Completo_](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057);

-   carece de certificados SSL instalados, usa la [opción de **SSL** _Flexible_](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef).

___

### Solo algunos de tus subdominios devuelven errores de SSL

**Indicador**Los [certificados Universal SSL](https://support.cloudflare.com/hc/articles/204151138) y los [certificados SSL exclusivos](https://support.cloudflare.com/hc/articles/228009108) de Cloudflare solo cubren el dominio de nivel raíz (_ejemplo.com_) y un nivel de subdominios (_\*.ejemplo.com_). Si los visitantes de tu dominio observan errores al acceder a un segundo nivel de subdominios en su navegador (tal como _dev.www.ejemplo.com_), pero no a un primer nivel de subdominios (tal como _www.ejemplo.com_), resuelve el problema mediante el uso de uno de los siguientes métodos:

**Solución**

-   Asegúrate de que el dominio esté al menos en un plan Business y carga un [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466) que cubra _dev.www.ejemplo.com_, o
-   compra un [certificado SSL exclusivo con nombres de host personalizados](https://support.cloudflare.com/hc/articles/228009108) que cubra _dev.www.ejemplo.com_, o
-   si tienes un certificado válido para el segundo nivel de subdominios en tu servidor web de origen, haz clic en el icono de nube naranja junto al nombre de host _dev.www_ en la aplicación **DNS** de Cloudflare para _ejemplo.com_.

___

### Tu certificado Universal SSL de Cloudflare no está activo

**Indicador**

A cada dominio activo de Cloudflare se le proporciona un [certificado Universal SSL](https://support.cloudflare.com/hc/articles/204151138). Si observas errores de SSL y no cuentas con un certificado de **tipo** _Universal_ dentro de la sección de **certificados perimetrales** de la aplicación **SSL/TLS** de Cloudflare para tu dominio, todavía no te proporcionaron el certificado Universal SSL.

{{<Aside type="note">}}
Los certificados SSL de Cloudflare solo se aplican al tráfico redirigido
mediante proxy a través de Cloudflare. Si ocurren errores SSL solo para
tus nombres de host que no se redirigen mediante proxy hacia Cloudflare,
redirígelos a través de Cloudflare.

-   Para dominios con configuración de DNS completo, haz clic en el
    icono de nube gris junto al nombre de host DNS en tu aplicación
    **DNS** de Cloudflare hasta que el icono sea de nube naranja.
-   Para dominios con configuración de CNAME, revisa nuestra guía sobre
    [añadir registros DNS a una configuración de
    CNAME](https://support.cloudflare.com/hc/articles/360020615111#h_836723523521544131668686).
{{</Aside>}}

Nuestros proveedores de SSL verifican cada solicitud de certificado SSL antes de que Cloudflare pueda emitir un certificado para un nombre de dominio. Este proceso puede tomar entre 15 minutos y 24 horas. Nuestros proveedores de certificados SSL a veces marcan un nombre de dominio para revisiones adicionales.

**Solución**

-   habilita Universal SSL en la aplicación **SSL/TLS** de Cloudflare,
-   compra un certificado [SSL exclusivo](https://support.cloudflare.com/hc/articles/228009108) o
-   carga un [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466) para Cloudflare.

Si tu certificado SSL de Cloudflare no se emite en un plazo de 24 horas desde la activación de tu dominio de Cloudflare:

-   Si tu servidor web de origen tiene un certificado SSL válido, [pausa temporalmente Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753) y
-   [abre un vale de asistencia](https://support.cloudflare.com/hc/en-us/requests/new) para proporcionar la siguiente información:  
    -   el nombre de dominio afectado, y
    -   una captura de pantalla de los errores que observas.

Pausar temporalmente Cloudflare permitirá que el tráfico HTTPS se sirva de manera apropiada desde tu servidor web de origen mientras el equipo de asistencia investiga el problema.

{{<Aside type="tip">}}
Si tu dominio se encuentra en una [configuración de CNAME
(parcial)](https://support.cloudflare.com/hc/articles/360020348832),
sigue nuestra guía sobre el [suministro de Universal SSL de Cloudflare
en una configuración de
CNAME](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509).
{{</Aside>}}

___

### Error de respuesta OCSP

**Indicador**Los visitantes de tu sitio observan un error de respuesta OCSP.

**Solución  
**  
El error se debe a la versión del navegador o a un problema que requiere atención de uno de los proveedores de SSL de Cloudflare. Para realizar un diagnóstico apropiado, [abre un vale de asistencia](https://support.cloudflare.com/hc/en-us/requests/new) con la siguiente información proporcionada por el visitante que observa el error del navegador:

1.  El resultado de _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_
2.  El resultado de _https://example.com/cdn-cgi/trace_ del navegador del visitante. Reemplaza _ejemplo.com_ con el nombre de dominio de tu sitio web.

___

### SSL vencido o errores de coincidencia de SSL

**Indicador  
**  
Los visitantes observan mensajes de error en su navegador acerca del vencimiento o los errores de coincidencia de SSL.

**Solución**

-   el nombre de dominio afectado, y
-   una captura de pantalla de los errores que observas.

___

## Recursos relacionados

-   [Errores de bucle de redireccionamiento](https://support.cloudflare.com/hc/articles/115000219871)
-   [Errores de contenido mixto](https://support.cloudflare.com/hc/articles/200170476)
