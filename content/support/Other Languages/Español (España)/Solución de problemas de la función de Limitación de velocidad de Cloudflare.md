---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115000546328-Soluci%C3%B3n-de-problemas-de-la-funci%C3%B3n-de-Limitaci%C3%B3n-de-velocidad-de-Cloudflare
title: Solución de problemas de la función de Limitación de velocidad de Cloudflare
---

# Solución de problemas de la función de Limitación de velocidad de Cloudflare



## Información general

Algunos problemas comunes de configuración de la función de **limitación de velocidad** impiden que las solicitudes coincidan correctamente como:

-   **Incluir esquemas de protocolo HTTP o HTTPS en patrones de reglas** (como _https://ejemplo.com/\*_). Para restringir las reglas de manera que coincidan solo con el tráfico HTTP o HTTPS, utiliza la matriz de esquemas en la coincidencia de solicitud, p. ej. _"esquemas": \[ "HTTPS" \]_
-   **Olvidar un carácter de barra invertida (/)**. La **Limitación de velocidad** de Cloudflare solo procesa las solicitudes para la página de inicio (como _ejemplo.com_ y _ejemplo.com/_) como equivalente, pero ninguna otra ruta (como _ejemplo.com/ruta/_ y _ejemplo.com/ruta_)_._ Para hacer coincidir las rutas de solicitud con y sin la barra invertida, utiliza una coincidencia comodín (como _ejemplo.com/ruta\*_) 
-   **Incluir una cadena de consulta o etiquta de anclaje** (como _ejemplo.com/ruta?foo=barra_ o _ejemplo.com/ruta#sección1_). Una regla como _ejemplo.com/ruta_ coincidirá con las solicitudes de _ejemplo.com/ruta?foo=barra_.
-   **Anular un límite de velocidad con** [**Reglas de Access de IP**](https://support.cloudflare.com/hc/articles/217074967).
-   **Incluir un número de puerto** (como _ejemplo.com:8443/api/_). El producto de límite de velocidad no considera los números de puerto dentro de las reglas y esto afecta a las reglas. Al eliminar el número de puerto de la URL, la regla de límite de velocidad se activará como estaba previsto.

Además, hay algunos errores comunes que impiden configurar la función de **limitación de velocidad** a través de la API de Cloudflare:  

-   _La decodificación aún no se ha implementado_: indica que a tu solicitud le falta el encabezado _Content-Type: application/json_. Añade el encabezado a tu solicitud de API para solucionar el problema.
-   _Ratelimit.api.not\_entitled_: los clientes Enterprise deben ponerse en contacto con su equipo de cuenta de Cloudflare antes de añadir reglas.
-   Puedes consultar otros errores en la [documentación de la API](https://api.cloudflare.com/#rate-limits-for-a-zone-errors). Si no estás seguro de un error en particular, [ponte en contacto con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) facilitándoles la solicitud de API fallida una vez hayas ocultado tu clave de API.

{{<Aside type="note">}}
El parámetro **origen\_tráfico** solo puede establecerse en los planes
Enterprise. La configuración **origen\_tráfico** = *falso* para una
regla en un dominio de plan gratuito, Pro o Enterprise se convierte
automáticamente en **origen\_tráfico** = *verdadero*.
{{</Aside>}}

___

## Limitaciones

La limitación de velocidad está diseñada para limitar los picos de tráfico que superan una tasa definida por el usuario. El sistema no está diseñado para permitir que un número concreto de solicitudes lleguen al servidor de origen. Puede haber casos en los que se presente un retraso entre la detección de la solicitud y la actualización del contador interno. Debido a este retraso (que puede ser hasta de unos segundos), el exceso de solicitudes podría llegar al servidor de origen antes de que se aplique una acción en el perímetro (como bloquear o desafiar).

___

## Recursos relacionados

-   [Configuración de la función de Limitación de velocidad de Cloudflare](https://support.cloudflare.com/hc/articles/115001635128)
