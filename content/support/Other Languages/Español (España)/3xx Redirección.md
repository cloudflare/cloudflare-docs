---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n
title: 3xx Redirección
---

# 3xx Redirección

**Descripción**

Los códigos 3xx son una clase de respuestas que sugieren que el agente-usuario debe seguir otro plan de acción para obtener el recurso solicitado completo.

El redireccionamiento de la ubicación se debe configurar en:

1.  El campo de encabezado de `Location` (Ubicación) en la respuesta, útil para la redirección automática
2.  La carga útil de la respuesta con un hipervínculo (opcional) para la ubicación de la corrección

-   [300 Múltiple](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_300)
-   [301 Moved Permanently](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_301)
-   [302 Found](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_302)
-   [303 See Other](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_303)
-   [304 Not Modified](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_304)
-   [305 Use Proxy](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_305)
-   [306 Switch Proxy](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_306)
-   [307 Temporary Redirect](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_307)
-   [308 Permanent Redirect](https://support.cloudflare.com/hc/es-es/articles/115003011091-3xx-Redirecci%C3%B3n#code_308)

**300 Multiple Choices** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Múltiples opciones para el recurso que el cliente puede seguir. Por ejemplo, se podría utilizar para presentar diferentes opciones de formatos de video, enumerar archivos con diferentes [extensiones](https://en.wikipedia.org/wiki/File_extensions), o [desambiguación del significado de la palabra](https://en.wikipedia.org/wiki/Word_sense_disambiguation).

**301 Moved Permanently** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

URL permanente redirecciona hacia los recursos solicitados.Al recurso de destino se le ha asignado un nuevo URI permanente y las referencias futuras a este recurso deben usar uno de los URI adjuntos.

Cloudflare puede generar estas respuestas, y de esta manera evita la necesidad de enviar una solicitud a la respuesta del servidor de origen a través del uso de Page rules. Lee más sobre cómo Cloudflare puede generar redireccionamientos a [Reenvíos de un URL de Page Rules](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**302 Found (también conocido como redireccionamiento temporario)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Similar a un redireccionamiento 301, pero solo con objetivos temporarios. El agente-usuario puede seguir automáticamente el encabezado de `Location`, pero no debe reemplazar el actual URI por este como una 301.

Cloudflare puede generar estas respuestas, y de esta manera evita la necesidad de enviar una solicitud a la respuesta del servidor de origen a través del uso de Page rules. Lee más sobre cómo Cloudflare puede generar redireccionamientos a [Reenvíos de un URL de Page Rules](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**303 See Other (desde HTTP/1.1)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El agente-usuario debería seguir este redireccionamiento con una solicitudGET. _Nota: se diferencia de 301 en que el recurso en el redireccionamiento no es necesariamente equivalente a lo que se solicitó_

-   Para utilizar en respuesta a una solicitud `POST/DELETE` para indicar que el servidor de origen recibió correctamente los datos y para permitir el almacenamiento adecuado en caché.
-   La respuesta 303 original no se puede almacenar en caché, pero sí la respuesta a la segunda solicitud (`GET`), ya que se encuentra bajo un URI diferente.

**304 Not Modified  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Indica al cliente que el recurso solicitado está disponible y es válido en el almacenamiento en caché. El servidor de origen no ha modificado el recurso por el que consultó la solicitud. El cliente puede recibir la carga útil para el recurso especificado sin conectarse de nuevo al servidor de origen, de esta manera, se redirige la solicitud para usar el recurso almacenado.  Los requisitos de un almacenamiento caché que recibe una respuesta 304 se definen en la [Sección 4.3.4 de \[RFC7234\]](https://tools.ietf.org/html/rfc7234#section-4.3.4).

Antes de esta respuesta, el cliente envió una solicitud condicional GET o HEAD que especifica qué recurso tiene actualmente almacenado. El servidor le da el “OK” al cliente para usar este recurso en la versión más actualizada para reducir el volumen de la transmisión de datos entre el cliente y el servidor.

-   No debe tener cuerpo de mensaje

-   Debe contener alguno de los encabezados que se habrían establecido antes de la respuesta 200 reflejada: `Cache-Control, Content-Location, Date, ETag, Expires`, o `Vary`.

Cuando se hace una solicitud obsoleta a Cloudflare, que se deba revalidar en el origen, Cloudflare enviará una respuesta 304 para confirmar que la versión en nuestro almacenamiento caché coincida con la versión en el origen. La respuesta incluirá el `CF-Cache-Status: Encabezado REVALIDATED`. y Cloudflare confirma la versión mediante el uso del encabezado `If-Modified-Since` . Para obtener más información, consulte: [Encabezados ETag](https://support.cloudflare.com/hc/en-us/articles/218505467).

**305 Use Proxy (desestimado)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La solicitud se debe cumplir a través del URI del servidor proxy especificado en el encabezado Location en lugar de hacerlo a través del origen. Este código de estado se ha desestimado debido a los riesgos de seguridad.

**306 Switch Proxy (desestimado)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Notificación que indica que las siguientes solicitudes se deben dirigir al servidor proxy especificado.

**307 Temporary Redirect** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Un redireccionamiento similar a una respuesta 302, salvo que el método de solicitud (por ej., GET, POST..) no debe diferir de lo que se utilizó en la solicitud original si sigue automáticamente al redireccionamiento.

-   El agente-usuario puede automáticamente seguir el encabezado `Location`, pero no debe reemplazar al URI original  

**308 Permanent Redirect (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

Un redireccionamiento permanente similar a una respuesta 301, salvo que el método de solicitud (por ej., GET, POST..) no debe diferir de lo que se utilizó en la solicitud original si sigue automáticamente el redireccionamiento.

-   El agente-usuario debe seguir automáticamente el encabezado `Location`
-   El agente-usuario debe reemplazar el URI original con el actualizado en Location o carga útil
