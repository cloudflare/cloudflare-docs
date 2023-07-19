---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003011431-C%C3%B3mo-solucionar-errores-5XX-de-Cloudflare
title: Cómo solucionar errores 5XX de Cloudflare
---

# Cómo solucionar errores 5XX de Cloudflare



## Información general

Para solucionar los problemas de la mayoría de los errores 5XX, el plan de acción correcto es contactar primero con el proveedor de alojamiento o administrador del sitio para resolver problemas o recopilar datos.

{{<Aside type="note">}}
El equipo de soporte de Cloudflare solo brinda asistencia al propietario
del dominio. Si eres un visitante del sitio, notifica el problema al
propietario del sitio.
{{</Aside>}}

### Detalles del error que se deben proporcionar al proveedor de alojamiento

1.  Código y mensaje de error 5XX específicos
2.  Hora y zona horaria donde ocurrió el error 5XX
3.  La URL que dio como resultado el error HTTP 5XX (por ejemplo: `https://www.ejemplo.com/images/icons/image1.png`)

{{<Aside type="note">}}
La causa del error no siempre se encuentra en los registros de errores
del servidor de origen. Comprueba los registros de todos los
equilibradores de carga, cachés, proxies o firewalls entre Cloudflare y
el servidor web de origen.
{{</Aside>}}

Dentro de la descripción de cada error se indican los detalles adicionales que debes proporcionar a tu proveedor de alojamiento o al administrador del sitio. [Las páginas de errores personalizados](https://support.cloudflare.com/hc/articles/200172706)  de Cloudflare cambian la apariencia de las páginas de errores predeterminados que se analizan en este artículo.

{{<Aside type="note">}}
Todos los usuarios de los planes Pro, Business y Enterprise disponen de
soporte por correo electrónico. Los usuarios de los planes Business y
Enterprise también tienen acceso a soporte a través de chat. Si
necesitas más ayuda, consulta [nuestros
planes](https://www.cloudflare.com/plans/).
{{</Aside>}}

___

## Análisis de errores

Los análisis de errores por dominio están disponibles en el portal de soporte de tu cuenta.  Los análisis de errores permiten conocer los errores generales por código de error HTTP y proporcionan las URL, las respuestas, las direcciones IP del servidor de origen y los centros de datos de Cloudflare necesarios para diagnosticar y resolver el problema.  Los análisis de errores se basan en una muestra de tráfico del 1 %.

Para ver los análisis de errores:

-   Accede al portal de soporte de Cloudflare.  Consulta las [instrucciones sobre la creación de una incidencia](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) para obtener información sobre cómo acceder al portal de soporte.
-   Desplázate hacia abajo hasta la sección **Análisis de errores**.
-   Haz clic en **Consultar análisis de errores**.
-   Escribe el dominio a investigar.
-   Se muestra un gráfico de **Errores a lo largo del tiempo**.
-   Haz clic en un código de estado en la tabla debajo del gráfico para ampliar los detalles del error de tráfico.

___

## Error 500: Error interno del servidor

Por lo general, el tipo de error 500 indica un problema con el servidor web de origen.  _Error al establecer_ _la conexión de la base de datos_ es un mensaje de error HTTP 500 común generado por tu servidor web de origen.  [Contacta con tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)  para que te ayude a encontrar la solución.

**Solución**

[Proporciona detalles a tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para que te ayude a solucionar el problema.

Sin embargo, si el error 500 contiene “cloudflare” o “cloudflare-nginx” en el cuerpo de la respuesta HTML, facilita la siguiente información a  [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

1.  Tu nombre de dominio
2.  El horario y la zona horaria en que ocurrió el error 500
3.  El resultado de _www.ejemplo.com/cdn-cgi/trace_ desde el navegador donde se observó el error 503 (sustituye _www.ejemplo.com_ por tu dominio y nombre de servidor reales)

{{<Aside type="note">}}
Si observas páginas vacías o en blanco cuando visitas tu sitio web,
confirma si el problema ocurre cuando [detienes temporalmente
Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753)
y ponte en contacto con tu proveedor de alojamiento para obtener ayuda.
{{</Aside>}}

___

## Error 502: Puerta de enlace no válida o error 504: Tiempo de espera agotado para la puerta de enlace

Se muestra un error HTTP 502 o 504 cuando Cloudflare no se puede conectar con tu servidor web de origen.

Existen dos causas posibles:

-   (Causa más habitual) [502/504 de tu servidor web de origen](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)
-   [502/504 de Cloudflare](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_845d633d-0842-4315-9dd2-53185cc4e1de)

### 502/504 de tu servidor web de origen

Cloudflare devuelve un error HTTP 502 o 504 considerado de Cloudflare cuando tu servidor web de origen responde con un error HTTP 502 de puerta de enlace no válida o error 504 de tiempo de espera agotado para la puerta de enlace:

![Ejemplo de un error 502 con marca Cloudflare.](/images/support/image1.png)

**Solución**

Ponte en contacto con tu proveedor de alojamiento para solucionar los problemas de estas causas habituales en tu servidor web de origen:

-   Asegúrate de que el servidor de origen responda las solicitudes para el nombre del servidor y el dominio en el URL del visitante que generó el error 502 o 504.
-   Investiga las cargas excesivas del servidor, las caídas o los fallos de red.
-   Identifica las aplicaciones o los servicios con tiempo de espera agotado o bloqueado.

### 502/504 de Cloudflare

Un error 502 o 504 que se origina en Cloudflare aparece de la siguiente manera:

![Ejemplo de error 502 sin marca.](/images/support/image5.png)

Si el error no hace mención a “cloudflare,” ponte en contacto con tu proveedor de alojamiento para obtener ayuda sobre los errores [502/504 desde tu origen](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b).

**Solución**

Para evitar demoras en el procesamiento de tu consulta, proporciona estos detalles a [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

1.  Hora y zona horaria donde ocurrió el problema.
2.  La URL que dio como resultado la respuesta HTTP 502 o 504 (por ejemplo:_https://www.ejemplo.com/images/icons/image1.png_)
3.  Resultado de la consulta a  _www.ejemplo.com/cdn-cgi/trace_ (sustituye _www.ejemplo.com_ por el dominio y el nombre del servidor que causó el error HTTP 502 o 504)

___

## Error 503: Servicio temporalmente no disponible

El error HTTP 503 ocurre cuando tu servidor web de origen está sobrecargado. Existen dos causas posibles por mensaje de error:

-   El error no contiene “cloudflare” o “cloudflare-nginx” en el cuerpo de la respuesta HTML.

**Resolución**: ponte en contacto con tu proveedor de alojamiento para comprobar si ha limitado las solicitudes a tu servidor web de origen.

-   El error contiene “cloudflare” o “cloudflare-nginx” en el cuerpo de la respuesta HTML.

**Resolución**: se ha producido un problema de conectividad en un centro de datos de Cloudflare. Proporciona la siguiente información a [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

1.  Tu nombre de dominio
2.  El horario y la zona horaria en que ocurrió el error 503
3.  El resultado de _www.ejemplo.com/cdn-cgi/trace_ desde el navegador donde se observó el error 503 (sustituye _www.ejemplo.com_ por tu dominio y nombre de servidor reales)

___

## Error 520: El servidor web muestra un error desconocido

El error 520 ocurre cuando el servidor de origen devuelve una respuesta vacía, desconocida o inesperada a Cloudflare.

**Solución**

{{<Aside type="note">}}
Una solución rápida mientras se investigan más a fondo los errores 520
es configurar el registro como
[DNS-solo](/dns/manage-dns-records/reference/proxied-dns-records)
en la aplicación Cloudflare **DNS** o bien [detener temporalmente
Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753).
{{</Aside>}}

[Ponte en contacto con tu proveedor de alojamiento o administrador del sitio](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) y solicita un análisis de los registros de error de tu servidor web de origen para detectar fallos y comprobar las siguientes causas frecuentes:

-   Fallo en la aplicación del servidor web de origen
-   [Direcciones IP de Cloudflare](https://www.cloudflare.com/ips) que no están permitidas en tu servidor de origen
-   Encabezados que superan 16 KB (habitualmente se debe al exceso de cookies)
-   Una respuesta vacía del servidor web de origen que no tiene código de estado HTTP o cuerpo de la respuesta
-   Faltan encabezados de respuesta o el servidor web de origen no devuelve las [respuestas adecuadas para el error HTTP](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).
    -   `upstream cerró prematuramente la conexión mientras leía el encabezado de la respuesta de upstream` es un error común que podemos notar en nuestros registros. Esto indica que el servidor web de origen tenía problemas que hicieron que Cloudflare generara errores 520.

{{<Aside type="note">}}
Prevalecen los errores 520 con ciertas aplicaciones PHP que producen la
caída del servidor web de origen.
{{</Aside>}}

Si continúan los errores 520 después de ponerte en contacto con tu proveedor de alojamiento o administrador del sitio, proporciona la siguiente información a [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

-   Las URL completos del recurso solicitado cuando ocurrió el error
-   Cloudflare **cf-ray** del mensaje de error 520
-   Resultado de _http://www.ejemplo.com/cdn-cgi/trace_ (sustituye _www.ejemplo.com_ por tu nombre de servidor y el dominio donde se produjo el error 520)
-   Dos [archivos HAR](https://support.cloudflare.com/hc/articles/203118044):
    -   uno con Cloudflare activado en tu sitio web, y
    -   el otro con [Cloudflare temporalmente desactivado](https://support.cloudflare.com/hc/articles/200169176).

___

## Error 521: El servidor web no funciona

El error 521 ocurre cuando el servidor web de origen rechaza las conexiones de Cloudflare. Las soluciones de seguridad en tu servidor de origen pueden bloquear las conexiones legítimas de ciertas [direcciones IP de Cloudflare](https://www.cloudflare.com/ips).

Las dos causas más comunes de los errores 521 son:

-   Aplicación del servidor web de origen desconectada
-   Solicitudes de Cloudflare bloqueadas

**Solución**

[Ponte en contacto con tu administrador del sitio o proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para eliminar estas causas comunes:

-   Asegúrate de que tu servidor web de origen tenga capacidad de respuesta
-   Analiza los registros de error del servidor web de origen para identificar los fallos o interrupciones de la aplicación del servidor web.
-   Confirma que [las direcciones IP de Cloudflare](https://www.cloudflare.com/ips) no estén bloqueadas o limitadas
-   Permite todos los [rangos de direcciones IP de Cloudflare](https://www.cloudflare.com/ips) en el firewall de tu servidor web de origen u otro software de seguridad
-   Confirma que, si tienes el modo **SSL/TLS** configurado en **Completo** o **Completo (Estricto**) — has instalado un [certificado de origen de Cloudflare](/ssl/origin-configuration/origin-ca)
-   Consulta más información sobre la solución de problemas en la [Comunidad de Cloudflare](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461).

___

## Error 522: Se ha agotado el tiempo de espera de la conexión

El error 522 ocurre cuando se agota el tiempo de espera de Cloudflare al intentar conectarse con el servidor web de origen. Existen dos tiempos de espera diferentes que causan el error HTTP 522 en función de cuándo ocurren entre Cloudflare y el servidor web de origen:

1.  Antes de que se establezca una conexión, el servidor web de origen no devuelve SYN+ACK a Cloudflare dentro de los 15 segundos posteriores al envío de SYN por parte de Cloudflare.
2.  Después de que se establezca una conexión, el servidor web de origen no confirma (ACK) la solicitud de recurso de Cloudflare en 90 segundos.

{{<Aside type="note">}}
Se produce un [error HTTP 524](#524error) si el servidor web de origen
confirma (*ACK*) la solicitud de recursos una vez establecida la
conexión, pero no envía una respuesta a tiempo.
{{</Aside>}}

**Solución**

[Ponte en contacto con tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para verificar las siguientes causas comunes en tu servidor web de origen:

-   (La causa más común) [Las direcciones IP de Cloudflare](https://www.cloudflare.com/ips/)  están limitadas o bloqueadas en .htaccess, iptables, o firewalls. Confirma que tu proveedor de alojamiento permite las direcciones IP de Cloudflare.
-   Un servidor web de origen sobrecargado o desconectado interrumpirá las solicitudes entrantes.
-   Las [Keepalives](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) se desconectan en el servidor web de origen.
-   La dirección IP de origen en tu aplicación  **DNS** de Cloudflare no coincide con la dirección IP que actualmente proporcionó tu proveedor de alojamiento a tu servidor web de origen.
-   Los paquetes se descartaron en tu servidor web de origen.

Si utilizas [Cloudflare Pages](/pages/), comprueba que tienes configurado un dominio personalizado y que tu registro CNAME apunta a tu dominio Pages personalizado. Las instrucciones sobre cómo configurar un dominio Pages personalizado están disponibles [aquí](/pages/getting-started#adding-a-custom-domain).

Si nada de lo anterior soluciona el problema, solicita la siguiente información a tu proveedor de alojamiento o administrador del sitio antes de ponerte en [contacto con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476):

-   Un [MTR o traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) de tu servidor web de origen a una  [dirección IP de Cloudflare](http://www.cloudflare.com/ips) que se conecta frecuentemente a tu servidor web de origen antes de que ocurra el problema. Identifica una dirección IP de conexión de Cloudflare en los registros del servidor web de origen.
-   Detalles de la investigación del proveedor de alojamiento como los registros o conversaciones pertinentes con el proveedor de alojamiento.

___

## Error 523: No se puede conectar con el servidor

El error 523 se produce cuando Cloudflare no puede contactar con su servidor web de origen. Esto suele ocurrir cuando un dispositivo de red entre Cloudflare y el servidor web de origen no tiene una ruta hacia la dirección IP de origen.

**Resolución** [Contacta con tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para excluir las siguientes causas comunes en tu servidor web de origen:

-   Confirma que la dirección IP de origen correcta se encuentre en la lista de los registros A o AAAA en tu aplicación DNS de Cloudflare.
-   Soluciona los problemas de enrutamiento de Internet entre tu origen y Cloudflare, o con el origen en sí.

{{<Aside type="note">}}
Si tu proveedor de alojamiento cambia con frecuencia la dirección IP de
tu servidor web de origen, consulta la documentación de Cloudflare en
[actualizaciones de DNS
dinámicas](/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses).
{{</Aside>}}

Si nada de lo anterior permite una solución, solicita la siguiente información a tu proveedor de alojamiento o administrador del sitio:

-   Un [MTR o traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) de tu servidor web de origen a una [dirección IP de Cloudflare](http://www.cloudflare.com/ips) que se conecta frecuentemente a tu servidor web de origen antes de que ocurra el problema. Identifica una dirección IP de conexión de Cloudflare de los registros del servidor web de origen.
-   Si utilizas Railgun a través de un socio de alojamiento de Cloudflare,  [ponte en contacto con tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para solucionar los errores 523.
-   Si gestionas tu instalación de Railgun, proporciona lo siguiente a:
    -   Un [traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) a tu servidor web de origen desde tu servidor Railgun.
    -   El archivo syslog más reciente de tu servidor Railgun.

___

## Error 524: Tiempo de espera agotado

El error 524 indica que Cloudflare se conectó correctamente con el servidor web de origen, pero el origen no brindó una respuesta HTTP antes de que el tiempo de la conexión predeterminada de 100 segundos se agotara. Esto puede suceder si tu servidor simplemente está tardando más tiempo de lo normal porque tiene demasiado que hacer (por ejemplo, una consulta de datos voluminosa) o porque el servidor tiene dificultades con los recursos y no puede devolver ningún dato a tiempo.

**Solución**

Estas son las opciones que sugerimos para solucionar este problema:

-   Implementar el sondeo de estado de los procesos HTTP de gran tamaño para evitar que se produzca este error.
-   [Ponte en contacto con tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para descartar las siguientes causas comunes en tu servidor web de origen:
    -   Un proceso de larga duración en tu servidor web de origen.
    -   Un servidor web de origen sobrecargado.

{{<Aside type="note">}}
Registrar el tiempo de respuesta de la solicitud en tu servidor web de
origen ayuda a identificar la causa de la ralentización de los recursos.
Ponte en contacto con tu proveedor de alojamiento o administrador del
sitio para obtener asistencia en la adaptación de formatos de registro o
en la búsqueda de documentación de registro relacionada para tu marca de
servidor web como
[Apache](http://httpd.apache.org/docs/current/mod/mod_log_config.html) o
[Nginx](http://nginx.org/en/docs/http/ngx_http_log_module.html#log_format).
{{</Aside>}}

-   Los clientes Enterprise pueden aumentar el tiempo de espera 524 hasta 6 000 segundos utilizando el punto final de la API [proxy\_read\_timeout](https://api.cloudflare.com/#zone-settings-change-proxy-read-timeout-setting).
-   Si ejecutas con regularidad solicitudes HTTP que tardan más de 100 segundos en finalizar (por ejemplo, exportaciones de grandes volúmenes de datos), traslada esos procesos a un subdominio sin proxy (con nube gris) en la aplicación  **DNS** de Cloudflare.
-   Si el error 524 ocurre en un dominio que utiliza Railgun de Cloudflare, asegúrate de que _lan.timeout_ se haya establecido por encima de los 30 segundos y reinicia el servicio de railgun.

___

## Error 525: El protocolo de enlace SSL ha fallado

Los errores 525 indican que el protocolo de enlace SSL entre Cloudflare y el servidor web de origen ha fallado. El error 525 ocurre cuando estas dos condiciones son auténticas:

1.  El [protocolo de enlace SSL](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) falla entre Cloudflare y el servidor web de origen, y
2.  [_El modo SSL_ _Completo_ o](/ssl/origin-configuration/ssl-modes) **Completo (Estricto)** está configurado en la pestaña **Información general** de tu aplicación **SSL/TLS de Cloudflare**.

**Solución**

[Ponte en contacto con tu proveedor de alojamiento](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) para descartar las siguientes causas comunes en tu servidor web de origen:

-   Ningún certificado SSL válido instalado
-   El puerto 443 (u otro puerto seguro) no está abierto
-   Sin soporte [SNI](https://support.cloudflare.com/hc/articles/360026016272)
-   Las [suites de cifrado](/ssl/ssl-tls/cipher-suites) aceptadas por Cloudflare no coinciden con las suites de cifrado admitidas por el servidor web de origen

{{<Aside type="tip">}}
Si ocurren errores 525 de manera intermitente, analiza los registros de
error del servidor web de origen para determinar la causa. Configura
Apache para [log mod\_ssl
errors](https://cwiki.apache.org/confluence/display/HTTPD/DebuggingSSLProblems#Enable_SSL_logging).
Además, nginx incluye errores SSL en su registros de error estándar,
pero posiblemente requiera un [mayor nivel de
registro](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).
{{</Aside>}}

**Controles adicionales**

-   Comprueba si tienes un certificado instalado en tu servidor de origen. Puedes consultar [este artículo](https://support.cloudflare.com/hc/es-es/articles/203118044-Gathering-information-for-troubleshooting-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4) para obtener más detalles sobre cómo realizar algunas pruebas. En caso de que no tengas ningún certificado, puedes crear e instalar el [certificado CA de origen de Cloudflare](/ssl/origin-configuration/origin-ca) gratuito. Utiliza los certificados CA de origen para cifrar el tráfico entre Cloudflare y tu servidor web de origen.
-   [Revisa las suites de cifrado](/ssl/ssl-tls/cipher-suites) que utiliza tu servidor para asegurarte de que coinciden con lo que admite Cloudflare.
-   Revisa en los registros de errores de tu servidor las marcas de tiempo en que aparecen en los errores 525 para comprobar si hay errores que puedan estar causando que la conexión se restablezca durante el protocolo de enlace SSL.

___

## Error 526: Certificado SSL no válido

El error 526 ocurre cuando estas dos condiciones son auténticas:

1.  Cloudflare no puede validar el certificado SSL en tu servidor web de origen, y
2.  [_SSL_)](/ssl/origin-configuration/ssl-modes#full-strict) **Completo (Estricto)** está configurado en la pestaña **Información general** de tu aplicación **SSL/TLS** de Cloudflare.

**Solución**

{{<Aside type="tip">}}
Para una posible solución rápida, configura **SSL** en el modo
*Completo*  en lugar de *Completo (Estricto)* en la pestaña
**Información general** de la aplicación **SSL/TLS** de Cloudflare para
el dominio.
{{</Aside>}}

solicita a tu administrador de servidor o proveedor de alojamiento que analice los certificados SSL del servidor web de origen y verifique que:

-   El certificado no esté vencido
-   El certificado no esté anulado
-   El certificado esté firmado por una   [A](https://support.cloudflare.com/hc/articles/360026016272)[utoridad de certificación](https://support.cloudflare.com/hc/articles/360026016272) (no autofirmado)
-   El nombre de dominio solicitado o de destino y el nombre de servidor se encuentran en el  **Nombre común** o **Nombre alternativo del firmante** del certificado
-   Tu servidor web de origen acepta conexiones al puerto SSL443
-   [Pausa Cloudflare temporalmente](https://support.cloudflare.com/hc/articles/200169176) y visita [https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com](https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com) (sustituye www.ejemplo.com por tu nombre de servidor y dominio) para verificar que no existan problemas con el certificado SSL de origen:

![Pantalla que muestra un certificado SSL sin errores.](/images/support/hc-import-troubleshooting_5xx_errors_sslshopper_output.png)

Si el servidor de origen utiliza un certificado autofirmado, configura el dominio para utilizar _SSL_ _Completo_ en lugar de _SSL Completo (Estricto)_. Consulta las [configuraciones SSL recomendadas para tu origen](/ssl/origin-configuration/ssl-modes).

___

## Error 527: Error entre Railgun Listener y el servidor de origen

Un error 527 indica una conexión interrumpida entre Cloudflare y tu [servidor Railgun de origen (rg-listener)](https://support.cloudflare.com/hc/articles/200168406). Las causas más habituales son:

-   Interferencia del firewall
-   Incidentes de red o pérdida de paquetes entre el servidor Railgun y Cloudflare

{{<Aside type="note">}}
Para obtener más detalles que permitan solucionar los problemas,
[aumenta el registro de
Railgun](https://support.cloudflare.com/hc/articles/218444227).
{{</Aside>}}

Entre las causas habituales de los errores 527 se incluyen:

-   [Tiempos de espera de la conexión](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c559b9e5-a342-47ed-bfae-66e10e42aade)
-   [Tiempo de espera de LAN agotado](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_f8e4890c-9459-4c9a-a4ab-e9b44fa16dbf)
-   [Rechazos de conexión](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_2e3e4251-3642-4fce-bbcf-1a45bb2b2c11)
-   [Errores vinculados a TLS/SSL](https://support.cloudflare.com/hc/es-es/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c30fe02c-98f2-4cbf-af8c-bafa9b4f5b8f)

Si te pones en contacto con soporte de Cloudflare, proporciona la siguiente información de Railgun Listener:

-   El contenido completo del archivorailgun.conf 
-   El contenido completo del archivorailgun-nat.conf
-   Archivos de registro Railgun que detallan los errores observados

### Tiempos de espera de la conexión

Los siguientes errores de registro de Railgun indican un fallo en la conexión entre Railgun Listener y tu servidor web de origen:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">no response from origin (timeout) 0.0.0.0:80/example.com</span></div></span></span></span></code></pre>{{</raw>}}

**Solución**

Ponte en contacto con tu proveedor de alojamiento y obtén ayuda para realizar una prueba de los problemas de conectividad entre tu servidor web de origen y tu Railgun Listener. Por ejemplo, un comando netcat prueba la conectividad cuando se ejecuta desde Railgun Listener al servidor web de origen _SERVERIP_ y _PORT_ (80 para HTTP o 443 para HTTPS):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nc -vz SERVERIP PORT</span></div></span></span></span></code></pre>{{</raw>}}

### Tiempo de espera de LAN agotado

El siguiente error de registro de Railgun Listener se genera si el servidor web de origen no envía una respuesta HTTP a Railgun Listener en el tiempo de espera predeterminado de 30 segundos:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span></span></span></code></pre>{{</raw>}}

El tiempo se ajusta por el parámetro lan.timeout del archivorailgun.conf.

**Solución**

Incrementa el límite _lan.timeout_ en _railgun.conf_, o revisa la configuración del servidor web. Ponte en contacto con tu proveedor de alojamiento para confirmar si el servidor web de origen está sobrecargado.

### Rechazos de conexión

Los siguientes errores aparecen en los registros de Railgun cuando se rechazan las solicitudes de Railgun Listener:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Error al obtener la página: dial tcp 0.0.0.0:80: connection refused</span></div></span></span></span></code></pre>{{</raw>}}

**Solución**

Permite la dirección IP de tu Railgun Listener en el firewall de tu servidor web de origen.

### Errores vinculados a TLS/SSL

Los siguientes errores aparecen en los registros de Railgun si fallan las conexiones TLS:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/ejemplo.com: remote error: handshake failure</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/ejemplo.com: dial tcp 0.0.0.0:443:connection refused</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 127.0.0.1:443/www.ejemplo.com: x509: certificate is valid for</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com, not www.ejemplo.com</span></div></span></span></span></code></pre>{{</raw>}}

**Solución**

Si ocurren errores TLS/SSL, verifica lo siguiente en el servidor web de origen y asegúrate de que:

-   El puerto 443 esté abierto
-   El servidor web de origen presente un certificado SSL
-   El SAN o nombre común del certificado SSL del servidor web de origen contenga el nombre de servidor solicitado
-   **SSL** está configurado como [Completo  o Completo (Estricto)](/ssl/origin-configuration/ssl-modes) en la pestaña **Información general** de la aplicación Cloudflare **SSL/TLS** 

{{<Aside type="tip">}}
Si el certificado SSL de tu servidor web de origen está autofirmado,
[configura *validate.cert=0* en
*railgun.conf*](https://support.cloudflare.com/hc/articles/219336007).
{{</Aside>}}

___

## Error 530

El error HTTP 530 se devuelve acompañado de la visualización de un error 1XXX. Busca el error  [XXX específico en el centro de ayuda de Cloudflare](https://support.cloudflare.com/hc/sections/200820298) para obtener información sobre la solución de problemas.

___

## Recursos relacionados

-   [Cómo recopilar información para solucionar problemas en el sitio](https://support.cloudflare.com/hc/es-es/articles/203118044)
-   [Cómo contactar con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Cómo personalizar las páginas de error de Cloudflare](https://support.cloudflare.com/hc/articles/200172706)
-   [Diagnóstico y uso de MTR/Traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Consejos de la comunidad de Cloudflare](https://community.cloudflare.com/tag/communitytip)
