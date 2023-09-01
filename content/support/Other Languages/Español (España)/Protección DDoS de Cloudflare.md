---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200172676-Protecci%C3%B3n-DDoS-de-Cloudflare
title: Protección DDoS de Cloudflare
---

# Protección DDoS de Cloudflare



## Información general

Un ataque de denegación de servicio distribuido (DDoS) intenta desactivar un servicio en línea utilizado por usuarios finales.  Cloudflare ofrece en todos los planes un servicio de mitigación ilimitada de ataques DDoS en las capas 3, 4 y 7. No facturamos por tamaño de ataque y no tenemos un límite de tamaño, tipo o duración de ataque.

La red de Cloudflare está diseñada para supervisar y mitigar  [ataques DDoS](https://www.cloudflare.com/ddos) a gran escala de forma automática. Almacenar tu contenido en la memoria caché de Cloudflare también protege tu sitio web de ataques DDoS pequeños, pero los activos no almacenados en la memoria caché requieren una respuesta [manual adicional al ataque DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/).

Además, Cloudflare ayuda a mitigar los ataques DDoS más pequeños:

-   Para las zonas de cualquier plan, cuando la tasa de errores HTTP está por encima del nivel de sensibilidad _Alta_ (por defecto) del umbral de tasa de 1.000 errores por segundo. Puedes disminuir el nivel de sensibilidad [configurando el conjunto de reglas administradas de protección contra ataques DDoS HTTP](/ddos-protection/managed-rulesets/http).

-   Para las zonas de los planes Business y Enterprise, Cloudflare realiza una comprobación adicional para mejorar la precisión de la detección: la tasa de errores por segundo también debe ser al menos cinco veces superior a los niveles de tráfico normales.

Cloudflare determina la tasa de error basándose en todos los errores HTTP en el rango 52X (error interno del servidor) y en el rango 53X, excepto [error 530](https://support.cloudflare.com/hc/articles/115003011431#530error).

Las mitigaciones de ataques de inundaciones HTTP se muestran en el panel de control de análisis de firewall como eventos DDoS HTTP. Estos eventos también están disponibles en los [registros de Cloudflare](/logs/).

Actualmente, para las mitigaciones de DDoS basadas en la tasa de error HTTP, los clientes no pueden excluir códigos de error HTTP específicos.

Puedes consultar más información sobre ataques comunes de DDoS y DDoS en el Centro de aprendizaje de Cloudflare. También puedes revisar los casos prácticos de DDoS en la sección de recursos relacionados al final de este artículo.

___

## Conjunto de reglas administradas de protección contra ataques DDoS HTTP de Cloudflare

El conjunto de reglas administradas de DDoS HTTP de Cloudflare es un conjunto de reglas preconfiguradas que se utilizan para relacionar los patrones y herramientas de ataques conocidos, así como los patrones sospechosos, los incumplimientos de protocolo, las solicitudes que provocan errores de origen, el tráfico excesivo que llega al origen/memoria caché y los vectores de ataque adicionales en la capa de aplicación en el perímetro. El conjunto de reglas está disponible para los clientes suscritos a cualquier plan de Cloudflare y se activa por defecto.

Si esperas grandes picos de tráfico legítimo, plantéate la posibilidad de personalizar la configuración de tu protección DDoS para evitar falsos positivos, donde el tráfico legítimo se identifica erróneamente como tráfico de ataque y, en consecuencia, se bloquea o cuestiona.

Puedes encontrar más información sobre el conjunto de reglas administradas de DDoS HTTP de Cloudflare y los ajustes de configuración en el [portal para desarrolladores de Cloudflare](/ddos-protection/managed-rulesets/http).

Para más información sobre las acciones llevadas a cabo por los sistemas de protección de ataques DDoS HTTP, consulta [Parámetros de protección de ataques DDoS HTTP: Acción](/ddos-protection/managed-rulesets/http/override-parameters#action).

___

## Conjunto de reglas administradas de protección contra ataques DDoS en la capa de red de Cloudflare

El conjunto de reglas administradas de protección contra ataques DDoS en la capa de red de Cloudflare es un conjunto de reglas preconfiguradas que se utilizan para coincidir con vectores de ataque DDoS conocidos en los niveles 3 y 4 del modelo OSI. El conjunto de reglas está disponible para los clientes suscritos a cualquier plan de Cloudflare y se activa por defecto.

Puedes encontrar más información sobre el conjunto de reglas administradas de protección contra ataques DDoS en la capa de red de Cloudflare y los ajustes de configuración en el [portal para desarrolladores de Cloudflare](/ddos-protection/managed-rulesets/network).

Para más información sobre las acciones llevadas a cabo por los sistemas de protección contra ataques DDoS a las capas 3 y 4, consulta [Parámetros de protección contra ataques DDoS de la capa de red: Acción](/ddos-protection/managed-rulesets/network/override-parameters#action).

___

## Determina si estás bajo ataque DDoS

Las señales frecuentes de que estás bajo ataque DDoS incluyen:

-   Tu sitio está desconectado y responde muy lento a las solicitudes.
-   Hay picos inesperados en el gráfico de **solicitudes a través de Cloudflare** o **ancho de banda** en tu aplicación **Analytics** de Cloudflare.
-   Hay solicitudes extrañas en los registros de tu servidor web de origen que no coinciden con el comportamiento normal de los visitantes.

{{<Aside type="note">}}
Si estás siendo blanco de un ataque DDoS, consulta nuestra guía sobre
[cómo responder a un ataque
DDoS](https://support.cloudflare.com/hc/es-es/articles/200170196-I-am-under-DDoS-attack-what-do-I-do-).
{{</Aside>}}

___

## ¿Me está atacando Cloudflare?

Hay dos escenarios comunes en los que se percibe de manera falsa que Cloudflare está atacando tu sitio:

-   A menos que restaures las direcciones IP de los visitantes originales, las direcciones IP de Cloudflare aparecen en los registros de tu servidor para todas las solicitudes proxy.
-   El atacante está falsificando las IP de Cloudflare. Cloudflare solo envía tráfico a tu servidor web de origen a través de unos puertos específicos, a menos que utilices Cloudflare Spectrum.

Lo ideal, ya que Cloudflare es un proxy inverso, es que tu proveedor de hospedaje observe el tráfico de ataque que se conecta desde las [direcciones IP de Cloudflare](https://www.cloudflare.com/ips/). En cambio, si ves conexiones de direcciones IP que no pertenecen a Cloudflare, el ataque se dirige contra tu servidor web de origen. Cloudflare no puede detener los ataques directamente a tu dirección IP de origen porque el tráfico omite la red de Cloudflare.

{{<Aside type="tip">}}
Si un atacante apunta directamente a tu servidor web de origen, solicita
a tu proveedor de hospedaje que cambie tus IP de origen y actualiza la
información de IP en tu aplicación **DNS** de Cloudflare. Confirma que
todos los registros DNS posibles sean de nube naranja y que tus
servidores de nombre sigan apuntando a Cloudflare (a no ser que uses una
configuración de CNAME) antes de cambiar tu IP de origen.
{{</Aside>}}

___

## Recursos relacionados

-   [Cómo responder a los ataques DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [Prácticas recomendadas: medidas preventivas de DDoS](https://support.cloudflare.com/hc/articles/200170166)
-   [Cómo usar los registros de Cloudflare para investigar el tráfico DDoS (solo Enterprise)](https://support.cloudflare.com/hc/es-es/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [¿Qué es un ataque DDoS?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
-   [Cómo funcionan los ataques de amplificación DNS](http://blog.cloudflare.com/deep-inside-a-dns-amplification-ddos-attack)

### Casos prácticos:

-   [Cómo lanzar un ataque DDoS de 65 Gbps y cómo detenerlo](http://blog.cloudflare.com/65gbps-ddos-no-problem)
-   [El alto al fuego no detiene un ciberataque](http://blog.cloudflare.com/ceasefires-dont-end-cyberwars)
-   [Reflexiones sobre ataques](https://blog.cloudflare.com/reflections-on-reflections/)
-   [SSPD (Stupidly Simple DDoS Protocol) genera ataques DDoS de 100 Gbps](https://blog.cloudflare.com/ssdp-100gbps/)
-   [Memcrashed: gandes ataques de amplificación desde el puerto UDP 11211](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/)
-   [La causa real de grandes ataques DDoS: usurpación de IP](https://blog.cloudflare.com/the-root-cause-of-large-ddos-ip-spoofing/)
