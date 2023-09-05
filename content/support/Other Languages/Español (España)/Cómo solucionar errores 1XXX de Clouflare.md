---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360029779472-C%C3%B3mo-solucionar-errores-1XXX-de-Clouflare
title: Cómo solucionar errores 1XXX de Clouflare
---

# Cómo solucionar errores 1XXX de Clouflare



## Información general

Los errores que se describen en este documento pueden ocurrir al visitar un sitio web redirigido mediante proxy por Cloudflare. Consulta la [documentación de la API de Cloudflare](https://api.cloudflare.com/) si deseas más información sobre la API de Cloudflare o los errores del panel de control. Los errores HTTP 409, 530, 403 y 429 son los códigos de error de HTTP que se devuelven en el encabezado de estado de HTTP a modo de respuesta. Los errores 1XXX aparecen en el cuerpo HTML de la respuesta.

{{<Aside type="note">}}
Las **[páginas de errores
personalizados](https://support.cloudflare.com/hc/articles/200172706)**
de Cloudflare permiten a los clientes cambiar la apariencia de las
páginas de error predeterminadas que se analizan en este artículo.
{{</Aside>}}

Si las soluciones para cada descripción de error que se muestran a continuación no resuelven el error, [ponte en contacto con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

{{<Aside type="note">}}
Solo el propietario del sitio puede contactar con Cloudflare para
recibir asistencia técnica. Busca información de contacto para un
dominio a través de la [base de datos
Whois](https://whois.icann.org/en/lookup).
{{</Aside>}}

{{<Aside type="note">}}
Todos los usuarios de los planes Pro, Business y Enterprise disponen de
soporte por correo electrónico. Los usuarios de los planes Business y
Enterprise también tienen acceso a soporte por chat. Si necesitas más
ayuda, consulta [nuestros planes](https://www.cloudflare.com/plans/).
{{</Aside>}}

___

## Error 1000: El DNS se dirige a una IP prohibida

### Causas habituales

Cloudflare detuvo una solicitud por una de las siguientes razones:

-   Un registro A dentro de tu aplicación DNS de Cloudflare apunta a una [dirección IP de Cloudflare](https://www.cloudflare.com/ips/) o un origen Load Balancer apunta a un registro mediante proxy.
-   Tu DNS de Cloudflare A o registro CNAME se dirige a otro proxy inverso (como un servidor web nginx que utiliza la función proxy\_pass) que redirige la solicitud a Cloudflare una segunda vez.
-   El encabezado de la solicitud X-Forwarded-For tiene más de 100 caracteres.
-   La solicitud incluye dos encabezados X-Forwarded-For.
-   Un problema de indicación del nombre del servidor (SNI) o un desajuste en el origen.

### Solución

-   Si un registro A en tu aplicación DNS de Cloudflare se dirige a una [dirección IP de Cloudflare](https://www.cloudflare.com/ips/), actualiza la dirección IP en la dirección IP de tu servidor web de origen.
-   Hay un proxy inverso en tu origen que devuelve la solicitud a través del proxy de Cloudflare. En lugar de utilizar un proxy inverso, ponte en contacto con tu proveedor de hospedaje o administrador del sitio para configurar un redireccionamiento HTTP a tu origen.

___

## Error 1001: Error de resolución de DNS

### Causas habituales

-   Se envió una solicitud web a la dirección IP de Cloudflare para un dominio no existente de Cloudflare.
-   Un dominio externo que no está utilizando Cloudflare tiene un registro CNAME para un dominio activo en Cloudflare.
-   El destino del registro CNAME del DNS no se resuelve.
-   Un registro CNAME en tu aplicación DNS de Cloudflare requiere una solución a través de un proveedor de DNS que está actualmente desconectado.
-   [Always Online](/cache/how-to/always-online/) está activado para un dominio de [nombre de servidor personalizado (SSL para SaaS](/ssl/ssl-for-saas)).

### Solución

Un dominio que no es de Cloudflare no puede generar un registro CNAME para un dominio Cloudflare, salvo que el dominio que no es de Cloudflare se añada a una cuenta de Cloudflare.

Intentar acceder directamente a los registros DNS utilizados para las [configuraciones CNAME de Cloudflare](/dns/zone-setups/partial-setup) también provoca un error 1001 (por ejemplo: _www.ejemplo.com.cdn.cloudflare.net_).

Desactiva [Always Online](/cache/how-to/always-online/#enable-always-online) si utilizas [nombres de servidor personalizados (SSL para SaaS)](/ssl/ssl-for-saas).

___

## Error 1002: El DNS se dirige a una IP prohibida

### Causas habituales

-   Un registro DNS en tu aplicación DNS de Cloudflare se dirige a una de las [direcciones IP de Cloudflare](https://www.cloudflare.com/ips/).
-   Un destino incorrecto se especifica con un registro CNAME en tu aplicación DNS de Cloudflare.
-   Tu dominio no se encuentra en Cloudflare, pero tiene un registro CNAME que se envía a un dominio de Cloudflare.

### Solución

Actualizar tu registro _A_ o _CNAME_ de Cloudflare para que apunte a tu dirección IP de origen en lugar de a una dirección IP de Cloudflare:

1.  Ponte en contacto con tu proveedor de hospedaje para confirmar tu dirección IP de origen o el destino del registro CNAME.
2.  Inicia sesión en tu cuenta de Cloudflare.
3.  Selecciona el dominio que genera el error 1002.
4.  Selecciona la aplicación de **DNS**.
5.  Haz clic en **Valor** para que se actualice el registro _A_.
6.  Actualiza el registro _A_.

Para garantizar que tu servidor web de origen no redireccione mediante proxy sus propias solicitudes a través de Cloudflare, configura tu servidor web de origen para resolver tu dominio Cloudflare para:

-   La dirección IP NAT’d.
-   La dirección IP pública del servidor web de origen.

___

## Error 1002: Restringido

### Causas habituales

El dominio de Cloudflare corrige una dirección IP local o rechazada o una dirección IP no asociada con el dominio.

### Solución

Si eres propietario del sitio web:

1.  Confirma tus direcciones IP del servidor web de origen con tu proveedor de hospedaje.
2.  Inicia sesión en tu cuenta de Cloudflare.
3.  Actualiza los registros A en la aplicación DNS de Cloudflare con la dirección IP que confirmó tu proveedor de hospedaje.

___

## Error 1003 Acceso denegado. Acceso directo de IP no permitido

### Causas habituales

Un cliente o navegador accede de manera directa a una [dirección IP de Cloudflare](https://www.cloudflare.com/ips).

### Solución

Consulta el nombre de dominio del sitio web en tu URL en lugar de la dirección IP de Cloudflare.

___

## Error 1004: Servidor no configurado para servir el tráfico web

### Causas habituales

-   El personal de Cloudflare desactivó el redireccionamiento mediante proxy para el dominio por abuso o violaciones a las condiciones de servicio.
-   Los cambios del DNS aún no se han propagado o los _registros A_ del propietario del sitio apuntan a [direcciones IP de Cloudflare](https://www.cloudflare.com/ips).

### Solución

Si el problema persiste más de 5 minutos, [ponte en contacto con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

___

## Errores 1006, 1007, 1008 o 1106: Acceso denegado. Este sitio ha prohibido tu dirección IP

### Causas habituales

Un cliente de Cloudflare bloqueó el tráfico de tu cliente o navegador.

{{<Aside type="note">}}
El error 1006 también se origina en la aplicación **Workers** de Cloudflare en la pestaña **Vista previa** cuando un cliente usa **[Bloqueo de zona](/waf/tools/zone-lockdown/)** u otra función de seguridad de Cloudflare para bloquear las direcciones IP de la plataforma de Google Cloud de la que depende la pestaña **Vista previa**.
{{</Aside>}}

### Solución

Solicita al propietario del sitio web que investigue sus configuraciones de seguridad de Cloudflare o que permita la dirección IP de tu cliente. Como el propietario del sitio web bloqueó tu solicitud, el departamento de Soporte de Cloudflare no puede anular las configuraciones de seguridad de un cliente.

___

## Errores 1009: Acceso denegado. País o región prohibidos

### Causas habituales

El propietario del sitio web (p.ej. ejemplo.com) ha prohibido que el país o la región de tu dirección IP acceda al sitio web.

### Solución

Asegúrate de que tu dirección IP está autorizada en la función de seguridad [Reglas de Access de IP](https://support.cloudflare.com/hc/es-es/articles/217074967-Configuring-IP-Access-Rules).

___

## Error 1010: El propietario de este sitio web ha prohibido tu acceso en función de la firma de tu navegador

### Causas habituales

El propietario de un sitio web bloqueó tu solicitud por el navegador web de su cliente.

### Solución

Notifica al propietario del sitio web del bloqueo. Si no encuentras información para contactar con el propietario del sitio web, busca los datos de contacto del dominio en la [base de datos Whois](https://whois.icann.org/en/lookup). Los propietarios de sitios desactivan la  **comprobación de integridad** del **explorador** a través de la pestaña **Configuración** de la aplicación de  **firewall**.

{{<Aside type="note">}}
Como el propietario del sitio web realizó el bloqueo, el departamento de
Soporte de Cloudflare no puede anular las configuraciones de seguridad
de un cliente.
{{</Aside>}}

___

## Error 1011: Acceso denegado (Hotlink denegado)

### Causas habituales

Una solicitud se hace para un recurso que utiliza [protección hotlink de Cloudflare](https://support.cloudflare.com/hc/articles/200170026)

### Solución

Notifica al propietario del sitio web del bloqueo. Si no encuentras información para contactar con el propietario del sitio web, busca los datos de contacto del dominio en la [base de datos Whois](https://whois.icann.org/en/lookup).  La **protección Hotlink** se administra a través de la aplicación **Scrape Shield** de Cloudflare.

{{<Aside type="note">}}
Como el propietario del sitio web realizó el bloqueo, el departamento de
Soporte de Cloudflare no puede anular las configuraciones de seguridad
de un cliente.
{{</Aside>}}

___

## Error 1012: Acceso denegado

### Causas habituales

Un propietario de un sitio web prohíbe el acceso en función de la actividad maliciosa que se detecte del ordenador o la red del visitante (dirección IP). La causa más probable es un virus o un contagio por malware en el ordenador del visitante.

### Solución

Actualiza tu software de antivirus y ejecuta un análisis completo del sistema. Cloudflare no puede anular las configuraciones de seguridad que el propietario del sitio ha establecido para el dominio. Para solicitar acceso al sitio web, ponte en contacto con el propietario del sitio para que permita tu dirección IP. Si no encuentras información para contactar con el propietario del sitio web, busca los datos de contacto del dominio en la [base de datos Whois](https://whois.icann.org/en/lookup).

{{<Aside type="note">}}
Como el propietario del sitio web realizó el bloqueo, el departamento de
Soporte de Cloudflare no puede anular las configuraciones de seguridad
de un cliente.
{{</Aside>}}

___

## Error 1013: El nombre del servidor HTTP y el nombre de servidor TLS SNI no coinciden

### Causas habituales

El nombre del servidor que envía el cliente o el navegador a través de la [indicación de nombre de servidor](/fundamentals/glossary#server-name-indication-sni) (SNI) no es compatible con el encabezado del servidor de la solicitud.

### Solución

El error 1013 habitualmente se origina por los siguientes motivos:

-   Tu navegador local tiene configurado el encabezado de servidor SNI incorrecto.
-   Un tráfico de red SSL de redireccionamiento mediante proxy produjo una incompatibilidad entre la SNI y el encabezado del servidor de la solicitud.

Haz una prueba de incompatibilidad de la SNI a través de una herramienta en línea como: [SSl Shopper](https://www.sslshopper.com/ssl-checker.html)

Facilita la siguiente información a Soporte de Cloudflare:

1.  Un [archivo HAR](https://support.cloudflare.com/hc/articles/203118044) capturado mientras se duplica el error.

___

## Error 1014: Registro CNAME prohibido entre usuarios

### Causas habituales

Por defecto, Cloudflare prohíbe un _registro CNAME_ de DNS entre dominios en diferentes cuentas de Cloudflare. _Los registros CNAME_ se permiten dentro de un dominio (_www.ejemplo.com_ con CNAME a _api.ejemplo.com_) y entre zonas en la misma cuenta de usuario (_www.ejemplo.com_ con CNAME a _www.ejemplo.net_) o utilizando nuestra solución [Cloudflare para SaaS1](https://www.cloudflare.com/saas/).

{{<Aside type="warning">}}
[Cloudflare Apps](https://www.cloudflare.com/apps/) no es compatible por
ahora con [SSL para
SaaS](/ssl/ssl-for-saas/), por lo que
cualquier aplicación que utilice un dominio configurado en nuestra
solución para SaaS puede enviar un mensaje de error 1014.
{{</Aside>}}

### Solución

Para permitir la resolución del registro CNAME a un dominio en una cuenta de Cloudflare diferente, el propietario del dominio de destino CNAME debería utilizar [Cloudflare para SaaS](https://www.cloudflare.com/saas/), más específicamente nuestra solución [SSL para SaaS](/ssl/ssl-for-saas/) .

___

## Error 1015: Se está limitando tu velocidad

### Causas habituales

El propietario del sitio implementó la función de [limitación de velocidad](https://support.cloudflare.com/hc/articles/115001635128) que afecta el tráfico de tu visitante.

{{<Aside type="note">}}
*Imposible de purgar* es otro código de error 1015 que se relaciona con
la [purga de caché de
Cloudflare](/cache/how-to/purge-cache).
Reintenta borrar la memoria caché y ponte en contacto con [Soporte de
Cloudflare](https://support.cloudflare.com/hc/articles/200172476) si
persiste el error.
{{</Aside>}}

### Solución

-   Si eres un visitante del sitio, ponte en contacto con el propietario del sitio para solicitar la exclusión de la función de limitación de velocidad de tu IP.
-   Si eres el propietario del sitio, revisa los [umbrales de la función de Limitación de velocidad de Cloudflare](https://support.cloudflare.com/hc/articles/115001635128) y ajusta tu configuración de limitación de velocidad.
-   Si tu limitación de velocidad bloquea las solicitudes en un periodo corto de tiempo, 1 segundo por ejemplo, trata de aumentar el periodo de tiempo a 10 segundos.

{{<Aside type="tip">}}
Si esperas que Cloudflare Worker supere los límites de velocidad
consulta la [documentación de
Workers](/workers/platform/limits) a
modo de guía.
{{</Aside>}}

___

## Error 1016: Error de DNS de origen

### Causas habituales

Cloudflare no puede corregir la dirección IP del servidor web de origen.

Las causas más habituales del error 1016 son las siguientes:

-   Falta el _registro A_ de DNS que menciona la dirección IP de origen.
-   Un _registro CNAME_ en el DNS de Cloudflare apunta a un dominio externo irrecuperable.
-   Los nombres del servidor de origen (CNAME) en tu [Load Balancer](/load-balancing/) predeterminado de Cloudflare, la región y el conjunto de soluciones alternativas son irresolubles. Utiliza un grupo de servidores de reserva configurado con una dirección IP de origen como recurso por si el resto de grupos no estuvieran disponibles.
-   Cuando se crea una aplicación de Spectrum con un origen CNAME, primero debes crear un CNAME en el lado del DNS de Cloudflare que apunte al origen. Consulta [Orígenes de CNAME Spectrum](/spectrum/how-to/cname-origins) para más información.

### Solución

Para solucionar el error 1016:

1.  Comprueba que tu configuración de DNS de Cloudflare incluye un _registro A_ que apunta a una dirección IP válida que se resuelve a través de una [herramienta de búsqueda de DNS](https://dnschecker.org/).
2.  Para un registro CNAME que se dirige a un dominio diferente, asegúrate de que el dominio de destino resuelva a través de una [herramienta de búsqueda de DNS](https://dnschecker.org/).

___

## Error 1018: No se pudo encontrar el servidor

### Causas habituales

-   El dominio de Cloudflare se activó recientemente y existe un retraso que propaga las configuraciones del dominio a la red perimetral de Cloudflare.
-   El dominio de Cloudflare se creó a través de un socio de Cloudflare (p. ej., un proveedor de hospedaje) y el DNS del proveedor falló.

{{<Aside type="note">}}
El error 1018 se devuelve a través de un código de respuesta HTTP 409.
{{</Aside>}}

### Solución

Ponte en contacto con [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) y facilita los siguientes datos:

1.  Tu nombre de dominio.
2.  Una captura de pantalla del error 1018, incluido el **RayID** mencionado en el mensaje de error.
3.  El horario y la zona horaria en que ocurrió el error 1018.

___

## Error 1019: Error de servidor de registro

### Causas habituales

Un script de Worker hace referencia a sí mismo de manera recurrente.

### Solución

Asegúrate de que tu aplicación Cloudflare Worker no acceda a una URL que llame al mismo script de Workers.

___

## Error 1020 Acceso denegado:

### Causas habituales

Las reglas de firewall de un cliente de Cloudflare bloquean a un cliente o navegador.

### Solución

Si no eres el propietario del sitio web, facilita una captura de pantalla al propietario del sitio web del mensaje de error 1020 que recibiste.

Si eres el propietario del sitio web:

1.  Consigue una captura de pantalla del error 1020 de tu cliente
2.  Busca en el [**Registro de eventos de firewall**](/waf/analytics) en la pestaña **Descripción general** de tu aplicación de **firewall** de Cloudflare para ver el **RayID** o la dirección IP del cliente en el mensaje de error 1020 del visitante.

{{<Aside type="note">}}
Convierte la indicación de fecha y hora de UTC (tiempo universal
coordinado) del error 1020 a tu zona horaria local cuando busques en
**Registro de eventos de firewall**.
{{</Aside>}}

3. Evalúa la causa del bloqueo y actualiza la **Regla de firewall** o permite la dirección IP del visitante en las [**Reglas de acceso IP**](https://support.cloudflare.com/hc/articles/217074967).

___

## Error 1023: No se pudo encontrar el servidor

### Causas habituales

-   Si el propietario acaba de registrarse en Cloudflare, la información del sitio web puede tardar unos minutos en distribuirse por nuestra red global. Algo está mal en la configuración del sitio.
-   Por lo general, esto sucede cuando las cuentas se han registrado con una organización asociada (por ejemplo, un proveedor de hospedaje) y el DNS del proveedor falla.

{{<Aside type="note">}}
El error 1018 se devuelve a través de un código de respuesta HTTP 409.
{{</Aside>}}

### Solución

Ponte en contacto con [Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) y facilita los siguientes datos:

1.  Tu nombre de dominio.
2.  Una captura de pantalla del error 1023, incluido el **RayID** mencionado en el mensaje de error.
3.  El horario y la zona horaria en que ocurrió el error 1018.

___

## Error 1025: Vuelve a comprobarlo más tarde

### Causas habituales

No se atiende una solicitud porque el dominio ha alcanzado [los límites del plan para la aplicación Cloudflare Workers](/workers/platform/limits).

### Solución:

Compra el plan Workers ilimitado a través de la [página Planes](https://dash.cloudflare.com/redirect?account=workers/plans) en el panel de control de Workers.

___

## Error 1033: Error de Argo Tunnel

### Causas habituales

Has solicitado una página en un sitio web (`tunnel.ejemplo.com`) que está en la red de Cloudflare. El servidor (`tunnel.ejemplo.com`) está configurado como un Argo Tunnel y Cloudflare no puede resolverlo actualmente.

### Solución

-   **Si eres un visitante del sitio web**: por favor, inténtalo de nuevo en unos minutos.
-   **Si eres el propietario del sitio web**: comprueba que _cloudflared_ está funcionando y puede llegar a la red. Si lo deseas, puedes habilitar [el equilibrio de carga](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb) para tu túnel.

___

## Error 1034: IP de perímetro restringida

### Causas habituales

Los clientes que anteriormente apuntaban sus dominios a `1.1.1.1` recibirán ahora el **error 1034**. Esto se debe a una nueva comprobación de validación del perímetro en los sistemas de Cloudflare para evitar una mala configuración o un posible abuso.

### Solución

Asegúrate de que los registros DNS apunten a direcciones IP que controlas, y en el caso de que se necesite una dirección IP de marcado de posición para las configuraciones "sin origen", utiliza la dirección reservada IPv6 `100::` o la dirección reservada IPv4 `192.0.2.0`.

___

## Error 1035: Reescritura de solicitud no válida (ruta URI no válida)

### Causas habituales

El valor o la expresión de tu ruta URI reescrita no es válida.

Este error también se produce cuando el destino de la reescritura de la URL es una ruta en`/cdn-cgi/`.

### Solución

Asegúrate de que la ruta URI reescrita no está vacía y comienza con el carácter `/` (barra).

Por ejemplo, la siguiente expresión de reescritura de ruta URI no es válida:

`concat(lower(ip.geoip.country), http.request.uri.path)`

Para corregir la expresión anterior, añade un prefijo`/`:

`concat("/", lower(ip.geoip.country), http.request.uri.path)`

___

## Error 1036: Reescritura de solicitud no válida (se ha excedido la longitud máxima)

### Causas habituales

El valor o la expresión de tu ruta URI o cadena de consulta reescrita es demasiado larga.

### Solución

Utiliza un valor o expresión más corta para el nuevo valor de la cadena de ruta/consulta URI.

___

## Error 1037: Regla de reescritura no válida (no se ha podido evaluar la expresión)

### Causas habituales

No se pudo evaluar la expresión de la regla de reescritura. Hay varias causas para este error, pero puede significar que un elemento de la expresión contenía un valor indefinido cuando se evaluó.

Por ejemplo, recibirás un mensaje de error 1037 cuando utilices la siguiente expresión dinámica de reescritura de URL y el encabezado `X-Source` no se incluya en la solicitud:

`http.request.headers["x-source"][0]`

### Solución

Asegúrate de que todos los elementos de la expresión de reescritura estén definidos. Por ejemplo, si haces referencia a un valor de encabezado, asegúrate de que el encabezado esté configurado.

___

## Error 1040: Reescritura de solicitud no válida (no se permite la modificación del encabezado)

### Causas habituales

Estás intentando modificar un encabezado HTTP cuyas reglas de modificación del encabezado de solicitud HTTP no pueden cambiar.

### Solución

Asegúrate de que no estás intentando modificar uno de los [encabezados de solicitud HTTP reservados](/rules/transform#http-request-header-modification-rules).

___

## Error 1041: Reescritura de solicitud no válida (valor del encabezado no válido)

### Causas habituales

El valor del encabezado agregado/modificado es demasiado largo o contiene caracteres que no están permitidos.

### Solución

-   Utiliza un valor o una expresión más corta para definir el valor del encabezado.
-   Elimina los caracteres que no están permitidos. Consulta la sección [Formato de los nombres y valores de los encabezados de las solicitudes HTTP](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values) en Documentación para desarrolladores para obtener más información sobre los caracteres permitidos.

___

## Error 1101: Error de renderización

### Causas habituales

Cloudflare Worker arroja una excepción de JavaScript en tiempo de ejecución.

### Solución:

[Facilita los detalles correspondientes del problema](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16) a Soporte de Cloudflare.

___

## Error 1102: Error de renderización

### Causas habituales

Cloudflare Worker supera el [Límite de tiempo de CPU](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions). El tiempo de CPU es el tiempo de ejecución de un código (por ejemplo, bucles, análisis JSON, etc.) El tiempo empleado en las solicitudes de red (búsqueda, respuesta) no se computa para el tiempo de CPU.

### Solución

Ponte en contacto con el desarrollador de tu código de Workers para optimizar el código y reducir el uso de CPU en los scripts activos de Workers.

___

## Error 1104: Nuestro sistema ya ha aceptado una variación de esta dirección de correo electrónico. Solo se permite una variación.

### Causas habituales

Este error puede ocurrir si se ha añadido un correo electrónico con alguna variación del correo electrónico que estás intentando añadir. Por ejemplo, _mi+usuario@ejemplo.com_ y _mi.usuario@ejemplo.com_ se tratarán igual en nuestro sistema.

### Solución

Inicia sesión como el antiguo usuario y cambia el correo electrónico a una dirección "desechable", de esta forma se reconocerá el nuevo correo electrónico.

___

## Error 1200: Límite de conexión de la memoria caché

### Causas habituales

Hay demasiadas solicitudes en cola en el perímetro de Cloudflare a la espera de ser procesadas por tu servidor web de origen. Este límite protege los sistemas de Cloudflare.

### Solución

Ajusta tu servidor web de origen para que acepte las conexiones entrantes más rápido. Ajusta la configuración de la memoria caché para mejorar las tasas de aciertos de caché, de modo que lleguen menos solicitudes a tu servidor web de origen.  Ponte en contacto con tu proveedor de hospedaje para obtener asistencia.

___

## Recursos relacionados

-   [Cómo contactar con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Cómo personalizar las páginas de error de Cloudflare](https://support.cloudflare.com/hc/articles/200172706)
