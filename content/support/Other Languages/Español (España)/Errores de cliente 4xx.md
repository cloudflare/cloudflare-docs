---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003014512-Errores-de-cliente-4xx
title: Errores de cliente 4xx
---

# Errores de cliente 4xx

## Descripción

En general, los códigos 4xx son respuestas de error que especifican un problema del cliente. Posiblemente un problema en la red.  

-   Pueden utilizarse como respuesta a cualquier método de solicitud.

-   El servidor de origen debe incluir una explicación, que debe mostrar el agente de usuario, con la excepción de una solicitud `HEAD`.

Cloudflare mostrará los siguientes errores directamente desde el servidor de origen.

### **400 Bad Request (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor no puede procesar o no procesará la solicitud debido a algo que se percibe como un error del cliente (p. ej., sintaxis de una solicitud mal formulada, estructura de un mensaje de solicitud no válida, o enrutamiento de una solicitud engañosa).

### **401 Unauthorized (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

La solicitud no se ha enviado con las credenciales de autenticación pertinentes.

-   El servidor debe enviar al menos un control en forma de un campo de encabezado `WWW-Authenticate` según la [Sección 4.1](https://tools.ietf.org/html/rfc7235#section-4.1).
-   El cliente puede enviar una segunda solicitud con las mismas credenciales y, posteriormente, si el control es idéntico al anterior, el servidor facilitará una entidad para ayudar al cliente a encontrar las credenciales necesarias.

### **402 Payment Required (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Los estándares RFC aún no han implementado este error, pero lo reservan para su uso futuro.

### **403 Forbidden (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Si aparece un error 403 sin la marca Cloudflare, este siempre se devuelve directamente desde el servidor web de origen, no desde Cloudflare, y suele estar relacionado con reglas de permisos en el servidor.

Los principales motivos para este error son:  
1\. Las reglas de permisos que has configurado o un error en las reglas .htaccess que has configurado.  
2\. Las reglas Mod\_security.  
3\. Las reglas de denegación de IP.

Debido a que Cloudflare no puede acceder directamente a su servidor, ponte en contacto con el proveedor de alojamiento para obtener ayuda con la solución de errores 403 y la corrección de reglas. Debes asegurarte de que no se bloqueen [las IP de Cloudflare](https://www.cloudflare.com/ips).

Cloudflare mostrará respuestas de error 403 si la solicitud infringe una regla WAF predeterminada que se haya habilitado para todos los dominios de Cloudflare con una nube naranja, o si esta solicitud infringe una regla WAF habilitada para esa zona en particular. Obtén más información en [¿En qué consiste Web Application Firewall?](https://support.cloudflare.com/hc/en-us/articles/200172016) Cloudflare también mostrará la respuesta de error 403:Forbidden para las conexiones SSL a dominios o subdominios que no estén cubiertos por ningún certificado SSL cargado ni de Cloudflare.

Si aparece una respuesta 403 con la marca Cloudflare en el texto de respuesta, este es el código de respuesta HTTP devuelto junto con algunas de nuestras funciones de seguridad:

-   Páginas de bloqueo y control de Web Application Firewall
-   Controles de nivel de protección básica
-   Mayoría de códigos de error de Cloudflare 1xxx
-   La comprobación de integridad del navegador
-   Si estás intentando acceder a un segundo nivel de subdominios (p. ej., `*.*.ejemplo.com`) a través de Cloudflare con el certificado emitido por Cloudflare, aparecerá un error HTTP 403 en el navegador, ya que estos nombres de host no están presentes en el certificado.

Si tienes alguna pregunta, ponte en contacto con el servicio de asistencia de Cloudflare e incluye una captura de pantalla del mensaje que aparezca, o copia todo el texto de la página en un ticket de asistencia.

### **404 Not Found (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor de origen no ha podido encontrar el recurso solicitado o se ha negado a hacerlo. En general, implica que el servidor de host no ha podido encontrar el recurso. Para gestionar una versión más permanente de este error, se debe utilizar un código de error 410.

Habitualmente, estos errores ocurren cuando se escribe de manera incorrecta un URL en tu sitio, cuando un vínculo de otra página está dañado, cuando una página que existía con anterioridad se traslada o se elimina, o se produce un error cuando un motor de búsqueda indexa tu sitio. Para un sitio típico, estos errores representan el 3 % del total de las visualizaciones de la página, pero las plataformas de análisis tradicionales como Google Analytics no suelen hacerles un seguimiento.

Los propietarios de sitios web generalmente implementan una página personalizada que aparece cuando se produce este error. Por ejemplo, [Implementación de páginas 404 personalizadas en Apache](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache).

Cloudflare no genera errores 404 en los sitios web de los clientes; solo redirigimos la solicitud mediante nuestro proxy desde el servidor de origen. Si aparece un error 404 en tu sitio con tecnología Cloudflare, deberás ponerte en contacto con tu proveedor de alojamiento para obtener ayuda.

### **405 Method Not Allowed (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor de origen conoce el recurso solicitado, pero el método de solicitud utilizado no es compatible.

-   El servidor de origen también debe facilitar un encabezado `Allow` con una lista de destinos compatibles para ese recurso.

Un ejemplo sería una solicitud POST en un recurso inalterable, donde solo se acepta la solicitud GET.

### **406 Not Acceptable (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El recurso no se encuentra disponible en el origen que se adhiere a los encabezados de negociación establecidos anteriormente (p. ej., mediante los encabezados`Accept-Charset` y `Accept-Language`)

Este código de estado puede reemplazarse simplemente ofreciendo el método menos preferido al agente-usuario, en lugar de generar este error.

### **407 Authentication Required (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

El cliente no ha enviado la autenticación requerida con la solicitud.

### **408 Request Timeout (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor de origen no ha recibido la solicitud completa en lo que se considera un tiempo razonable.

-   De manera implícita, el servidor no desea esperar y quiere continuar con la conexión.

-   No se utiliza mucho porque, en general, los servidores eligen la opción de conexión “cerrada”.

### **409 Conflict (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La solicitud no se ha completado debido a un conflicto con el estado actual del recurso. En general, ocurre con una solicitud PUT en la que varios clientes intentan editar el mismo recurso.

-   El servidor _debe_ generar una carga útil que incluya la información suficiente para que el cliente reconozca la fuente del conflicto.
-   Los clientes pueden y deben reintentar la solicitud nuevamente.

Cloudflare generará y mostrará una respuesta de error 409 para un [Error 1001: Error de resolución de DNS](https://support.cloudflare.com/hc/articles/360029779472#error1001).

### **410 Gone (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El recurso solicitado ya no existe de manera permanente en el origen.

-   El servidor sugiere eliminar los enlaces que hagan referencia al recurso.
-   El servidor no está calificado para utilizar este código de estado en una respuesta 404, ni se requiere que tenga esta respuesta durante un periodo determinado de tiempo.

### **411 Length Required (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El cliente no ha definido el `Content-Length` (tamaño del contenido) del cuerpo de la solicitud en los encabezados y este dato es necesario para obtener el recurso.

-   El cliente puede reenviar la solicitud después de añadir el campo de encabezado.

### **412 Precondition Failed (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

El servidor rechaza la solicitud porque el recurso no ha cumplido con las condiciones especificadas por el cliente.

Como ejemplo del control de versiones, un cliente modifica un recurso existente y, por lo tanto, establece el encabezado `If-Unmodified-Since` para que coincida con la fecha en la que el cliente ha descargado el recurso y empezado a editar. Si el recurso ha sido editado (probablemente por otro cliente) después de esta fecha y antes de cargar las ediciones, se generará esta respuesta, ya que la fecha de la última edición será posterior a la fecha establecida en el encabezado `If-Unmodified-Since` por el cliente.

Cloudflare generará esta respuesta. Para obtener más información, consulte: [Encabezados ETag](https://support.cloudflare.com/hc/en-us/articles/218505467).

### **413 Payload Too Large (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor se niega a procesar la solicitud porque la carga útil enviada desde el cliente es mayor que la que el servidor deseaba aceptar. El servidor tiene la opción de cerrar la conexión.

-   Si el rechazo solo ocurre de forma temporal, luego el servidor debe enviar un encabezado `Retry-After` para especificar el momento en el que el cliente debe intentar la solicitud de nuevo.

### **414 URI Too Long (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Rechazo del servidor debido a que el URI era demasiado extenso para su procesamiento. Por ejemplo, si un cliente intenta realizar una solicitud GET con un URI inusualmente largo después de una solicitud POST, esto podría considerarse un riesgo de seguridad y se produciría un error 414.

Cloudflare generará esta respuesta para un URI superior a 32KB.

### **415 Unsupported Media Type (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor se niega a procesar el formato de la carga útil actual. Una forma de identificar y solucionar este problema sería analizar los encabezados `Content-Type` o `Content-Encoding` enviados en la solicitud del cliente.

### **417 Expectation Failed (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor no cumple los requisitos especificados en el encabezado `Expect` de la solicitud del cliente.

### **429 Too Many Requests (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

El cliente ha enviado demasiadas solicitudes en el tiempo especificado de acuerdo con el servidor. Con frecuencia, esto se conoce como «limitación de tráfico». El servidor puede responder con información que permita al solicitante volver a intentarlo después de un periodo determinado de tiempo.

Cloudflare generará y enviará este código de estado cuando una solicitud tenga una [limitación de tráfico](https://www.cloudflare.com/rate-limiting/). Si los visitantes de tu sitio reciben estos códigos de error, podrás verlos en las [Analíticas de Rate Limiting](https://support.cloudflare.com/hc/en-us/articles/115003414428-Rate-Limiting-Analytics).

### **451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

El servidor no puede enviar el recurso debido a acciones legales.

En general, los motores de búsqueda (p. ej., Google) e ISP (p. ej., ATT) se ven afectados por este código de respuesta, y no el servidor de origen.

-   La respuesta debe incluir una explicación en el cuerpo de la respuesta con detalles de la demanda legal.

### **499 Client Close Request**

El código de respuesta específico de Nginx para indicar el momento en que el cliente ha cerrado la conexión mientras el servidor aún estaba procesando su solicitud. De este modo, el servidor no puede devolver un código de estado.

-   Este error aparece en [Enterprise Log Share](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) y en el análisis de códigos de estado para clientes Enterprise.
