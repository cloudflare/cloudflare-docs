---
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360035387431-Productos-de-detecci%C3%B3n-de-bots-de-Cloudflare-Preguntas-frecuentes
title: Productos de detección de bots de Cloudflare — Preguntas frecuentes
---

# Productos de detección de bots de Cloudflare — Preguntas frecuentes



## Información general

Las soluciones de Cloudflare contra bots identifican y mitigan el tráfico automatizado para proteger tu dominio de bots maliciosos.

Para obtener más información sobre estas soluciones y cómo configurarlas, consulta la [documentación para desarrolladores](https://developers.cloudflare.com/bots/).

___

## ¿Cómo detecta Cloudflare los bots?

Cloudflare utiliza varios métodos para detectar bots que varían según el plan. Para ver más detalles, consulta [productos de Cloudflare contra bots](https://developers.cloudflare.com/bots/about/plans).

___

## ¿Cómo puedo saber lo que incluye mi plan?

Para saber qué incluye tu plan, consulta nuestra [documentación para desarrolladores](https://developers.cloudflare.com/bots/about/plans).

___

## ¿Cómo configuro mi producto bot?

Para aprender a configurar tu producto de bots, consulta nuestra [documentación para desarrolladores](https://developers.cloudflare.com/bots/get-started).

___

## La regla administrada con Id. 100203 del WAF ha bloqueado de forma inesperada al bot Yandex.

Yandex actualiza sus bots con mucha frecuencia, por eso es posible que veas más falsos positivos mientras se propagan estos cambios. La regla administrada con Id. 100203 del WAF de Cloudflare bloqueará en ocasiones los bots nuevos y recientemente actualizados, ya que la lista de direcciones IP de los bots de Yandex aún no se ha sincronizado con los cambios más recientes de Yandex.

**Soluciones:**

-   Desactiva la regla administrada con Id. 100203 del WAF temporalmente,
-   crea una regla de firewall con la acción _Omitir_ para evitar la regla adminsitrada del WAF cuando una solicitud proviene de la  **IP Yandex**  y el agente de usuario contiene  **Yandex.** Consulta nuestra [documentación para desarrolladores](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions).

**Solución:**

Una vez que la nueva IP de Yandex se propaga a nuestro sistema, las solicitudes ya no se bloquearán. Este proceso puede tardar hasta 48 horas. Si ves que algún bot de Yandex sigue bloqueado después de 48 horas sin ningún cambio en el bot, ponte en contacto con [Soporte de Cloudflare](https://support.cloudflare.com/hc/es-es/articles/200172476-Contacting-Cloudflare-Support).

___

## ¿Cómo funciona el aprendizaje automático?

El aprendizaje automático supervisado selecciona ciertas variables (X) como género y edad y predice otra variable (Y) como los ingresos.

En Gestión de bots y el modo Super Bot Fight, las variables X son funciones de solicitud, mientras que la variable Y representa la probabilidad de resolver un CAPTCHA basado en valores X.

Cloudflare utiliza los datos de millones de solicitudes y vuelve a entrenar el sistema de forma periódica. Puedes conocer estos datos a partir de tus propios registros de solicitudes, como Cloudflare Logpull y Logpush, así como Firewall API.

___

## ¿Por qué veo una acción de desafío administrado para las reglas del firewall?

Cuando elijas desafiar a diferentes categorías de bots con el modo Bot Fight o el modo Super Bot Fight, verás los eventos de firewall con una **acción realizada** de **desafío gestionado**.

También puedes ver un desafío administrado como resultado de una [regla de firewall](https://support.cloudflare.com/hc/articles/200170136#managed-challenge).

___

## ¿Cuál es la diferencia entre la puntuación de amenazas y la puntuación de gestión de bots?

La diferencia es significativa:

-   La puntuación de amenazas (_cf.threat\_score_) es lo que Cloudflare utiliza para determinar la reputación de IP. Va de 0 (bueno) a 100 (malo).
-   La puntuación de gestión de bots (_cf.bot\_management.score)_ es lo que Cloudflare utiliza en la solución Gestión de bots para medir si la solicitud procede de un humano o de un script**.** Las puntuaciones varían de 1 (bot) a 99 (humano). Las puntuaciones más bajas indican que la solicitud proviene de un script, un servicio de API o un agente automatizado. Las puntuaciones más altas muestran que la solicitud proviene de un humano que utiliza un navegador web estándar de escritorio o móvil.

Estos campos están disponibles a través de las [Reglas de firewall de Cloudflare](https://developers.cloudflare.com/firewall/cf-firewall-rules).

___

## ¿Qué es cf.bot\_management.verified\_bot?

Una solicitud _cf.bot\_management.verified\_bot_ es un valor booleano que indica si dicha solicitud proviene de un bot permitido por Cloudflare.

Cloudflare ha creado una lista de permitidos de bots buenos y automatizados. Por ejemplo, motor de búsqueda de Google, Pingdom, entre otros.

Esta lista de permitidos se basa en la verificación de DNS inversa, lo que significa que las direcciones IP que permitimos realmente coinciden con el servicio solicitante. Además de esto, Cloudflare utiliza múltiples métodos de validación, incluido el bloqueo de aviso de envío por adelantado (ASN) y listas públicas. Si ninguno de estos tipos de validación está disponible para un cliente, utilizamos datos internos de Cloudflare y aprendizaje automático para identificar las direcciones IP legítimas de los bots buenos.

Para permitir el tráfico de bots buenos, usa el campo [Bot verificado](https://developers.cloudflare.com/ruleset-engine/rules-language/fields#dynamic-fields) en tu regla de firewall.

___


Cloudflare mantiene una lista de muestra de bots verificados en [Cloudflare Radar](https://radar.cloudflare.com/verified-bots).

Como operador del bot, para aparecer como bot verificado en Cloudflare, tu bot debe cumplir nuestra [política pública de bots verificados](https://developers.cloudflare.com/bots/reference/verified-bots-policy/). Si tu bot cumple estos criterios, envía esta [solicitud en línea](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

___

## ¿Qué información necesito para solucionar los problemas de mi solución contra bots?

Si experimentas errores con tu solución de bot y necesitas enviar una solicitud a Soporte de Cloudflare, incluye la siguiente información:

-   Id. de rayo
-   Direcciones IP
-   Reglas de firewall de Id., expresión de reglas, índices de resolución de CAPTCHA
-   Usuarios-agentes comunes entre los falsos positivos
-   Aviso de envío por adelantado (ASN) comunes entre falsos positivos
-   Capturas de pantalla de actividad extraña del firewall, como un pico enorme de tráfico cuestionado en el gráfico
-   URI o rutas problemáticas
-   Descripción aproximada de cómo está configurado tu dominio:
    -   ¿Es una zona SSL para SaaS y las otras no?
    -   ¿Se envía la mayor parte del tráfico de la API a un URI en particular?
    -   ¿Cuánto tráfico móvil esperas?

___


**Cómo desactivar la función BFM****/SBFM**

Si tienes algún problema con la función BFM/SBFM (p. ej. falso positivo), puedes desactivarla en **Seguridad** > **Bots**.

-   En los planes **gratuitos**, cambia la opción **modo Fight Bot** a **Desactivado**.
-   Si estás suscrito al plan **Pro**, haz clic en el enlace **Configurar el modo Super Bot Fight** y configura las funciones **Definitivamente automatizado** y **Bots verificados** como **Permitir**. Cambia las opciones **Protección de recursos estáticos** y **Detecciones de JavaScript** a **Desactivado**.
-   Si estás suscrito al plan **Business** o **Enterprise** (sin el complemento de gestión de bots), haz clic en el enlace **Configurar el modo Super Bot Fight** y configura las funciones  **Definitivamente automatizado**, **Probablemente automatizado** y  **Bots verificados** como **Permitir**. Cambia las opciones **Protección de recursos estáticos** y **Detecciones de JavaScript** a **Desactivado**.

___

## La función modo Super Bot Fight (SBFM) sigue bloqueando solicitudes aunque la función esté desactivada, ¿por qué?

Es un problema conocido y el equipo de bots está trabajando para resolverlo a corto plazo. Mientras tanto, hay una solución alternativa. Deberás ejecutar el siguiente comando de la API para comprobar y eliminar el conjunto de reglas del SBFM:

1\. Enumera los conjuntos de reglas existentes a nivel de zona.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2\. A partir del resultado del paso 1, busca el Id. del conjunto de reglas que está asociado a la configuración del SBFM de la zona. Deberías poder ver `"tipo": "zona "` y `"fase": "http_request_sbfm "`para ese conjunto de reglas.

3\. Utiliza el Id. del conjunto de reglas que has encontrado para eliminar el conjunto de reglas del SBFM.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Ten en cuenta que debes sustituir <clave> por tu propia clave de API, que puedes obtener en [Tokens de API](https://dash.cloudflare.com/profile/api-tokens).

___

## Recursos relacionados

-   [Gestión de bots de Cloudflare](https://developers.cloudflare.com/bots/) (Documentación para desarrolladores)
-   [Reglas del Firewall de Cloudflare](https://developers.cloudflare.com/firewall/cf-firewall-rules/) (Documentación para desarrolladores)
-   [Gestión de bots de Cloudflare: aprendizaje automático y más](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/) (Blog de Cloudflare)
-   [Detener los bots: lecciones prácticas del aprendizaje automático](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/) (Blog de Cloudflare)
