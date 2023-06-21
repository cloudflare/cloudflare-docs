---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003013892-1xx-Informativo
title: 1xx Informativo
---

# 1xx Informativo

## 1xx Informativo

**Descripción**

Los códigos 1xx siempre son respuestas provisorias para compartir información del estado de conexión. No están diseñados para una solicitud final ni una acción de respuesta. Requisitos del servidor:

-   Todas las respuestas finalizan con la primera línea vacía después de la línea de estado

-   No se utiliza para HTTP 1.0. El servidor de origen nunca debe enviar una respuesta 1xx al cliente HTTP 1.0

Cloudflare enviará todas estas respuestas y nunca genera esta respuesta.

-   [100 Continuar](https://support.cloudflare.com/hc/es-es/articles/115003013892-1xx-Informativo#code_100)
-   [101 Protocolos de conmutación](https://support.cloudflare.com/hc/es-es/articles/115003013892-1xx-Informativo#code_101)
-   [102 Procesamiento](https://support.cloudflare.com/hc/es-es/articles/115003013892-1xx-Informativo#code_102)

**100 Continuar ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Confirmación de la solicitud inicial para enviar un cuerpo de la respuesta. El servidor de origen está dispuesto a aceptar la solicitud (en función de los encabezados de la solicitud). Se devuelve antes de que el cliente normalmente envíe el cuerpo de la respuesta. Esto evita que los clientes envíen datos innecesarios o inútiles. Exigido por el servidor: Si el cliente envía el encabezado`Expect: 100-continue`, el servidor debe responder de inmediato con `100 Continue` y seguir leyendo del flujo de entrada o enviar otro código de respuesta. Cloudflare utiliza conexiones Keep-Alive, por lo tanto, esta respuesta no sería necesaria

**101 Protocolos de conmutación ([RFC7231](https://tools.ietf.org/html/rfc7231))**

El servidor de origen acepta la solicitud del cliente para conmutar protocolos. La solicitud del cliente contenía `Upgrade` en un campo de encabezado o hubo un cambio en el protocolo de la aplicación que se utiliza en esta conexión. Si utilizas el campo de encabezado Upgrade, el servidor ha acordado actualizar a un protocolo que se encuentra en una posición más elevada dentro de la lista de prioridades del cliente que el protocolo que se utiliza actualmente. El servidor de origen también debe responder con un campo de encabezado `Upgrade` para indicar los nuevos protocolos a los que se cambiará la conexión. Se supone que este cambio será conveniente para el cliente y el servidor. El caso práctico más frecuente es con websockets. Para obtener más información cobre websockets de Cloudflare, consulta: [Cloudflare ahora admite websockets](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)

**102 Procesamiento ([RFC2518](https://tools.ietf.org/html/rfc2518))**

El servidor ha recibido la respuesta completa del cliente, pero espera dedicar más tiempo a procesar ( por ej., > 20 segundos). El servidor debe enviar una respuesta final una vez que se completa la solicitud. Se utiliza solo para HTTP 1.1 y superior.

Si Cloudflare no recibe una respuesta en 100 segundos o menos después de un 102, se generará un [Error 522: Se ha agotado](https://support.cloudflare.com/hc/articles/115003011431#522error) el tiempo de espera de la conexión Las respuestas 102 se pueden utilizar para evitar el [Error 524: Error de tiempo de espera](https://support.cloudflare.com/hc/articles/115003011431#524error).
