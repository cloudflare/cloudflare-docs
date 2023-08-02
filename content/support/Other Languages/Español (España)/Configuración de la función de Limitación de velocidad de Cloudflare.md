---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115001635128-Configuraci%C3%B3n-de-la-funci%C3%B3n-de-Limitaci%C3%B3n-de-velocidad-de-Cloudflare
title: Configuración de la función de Limitación de velocidad de Cloudflare
---

# Configuración de la función de Limitación de velocidad de Cloudflare



## Información general

La función de **Limitación de velocidad** de Cloudflare identifica y mitiga automáticamente tasas de solicitud elevadas, ya sea para una URL específica o para todo un dominio. Las tasas de solicitud se calculan localmente en los centros de datos individuales de Cloudflare. Los usos más comunes de la **limitación de velocidad** son: [protección DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/), [protección contra ataques de fuerza bruta](https://www.cloudflare.com/learning/bots/brute-force-attack/), limitación de acceso a las búsquedas de foros, llamadas API o recursos que implican operaciones que exigen un uso intensivo de datos en su origen. 

Una vez que una dirección IPv4 individual o un rango de IPv6 /64 supera un umbral de regla, se bloquean más solicitudes al servidor web de origen con una respuesta HTTP 429, que incluye un encabezado **Reintentar más tarde** para indicar cuándo el cliente puede reanudar el envío de solicitudes.

{{<Aside type="note">}}
Para los clientes que utilizan la versión anterior de las reglas de
limitación de velocidad (cuya documentación está en la base de
conocimiento de Soporte de Cloudflare), los recursos almacenados en
caché y los rastreadores conocidos de los motores de búsqueda están
exentos de tus reglas de limitación de velocidad. Por lo tanto, no
afectan a la clasificación [SEO de tu sitio
web](/fundamentals/get-started/basic-tasks/improve-seo/).
Sin embargo, si estás utilizando la [nueva versión de reglas de
limitación de
velocidad](/waf/rate-limiting-rules/)
(cuya documentación está en nuestra sección de documentación para
desarrolladores), debes asegurarte de que tus reglas de limitación de
velocidad no afecten a los bots buenos conocidos, para que la
clasificación SEO de tu sitio web no se vea afectada. Para más
información, consulta [Mejorar el
SEO](/fundamentals/get-started/basic-tasks/improve-seo/).
{{</Aside>}}

{{<Aside type="note">}}
¿Intentas activar Limitación de velocidad? [Activar Limitación de
velocidad](https://dash.cloudflare.com/?to=/:account/:zone/firewall/tools).
{{</Aside>}}

___

## Análisis

Puedes ver los análisis de la función limitación de velocidad en **Analytics** > **Seguridad**. Este análisis utiliza líneas continuas que representan el tráfico que coincide con las solicitudes simuladas y líneas discontinuas que representan las solicitudes reales bloqueadas. Los registros generados por una regla de limitación de velocidad solo son visibles para los clientes Enterprise a través de los [registros de Cloudflare](/logs/). 

Cloudflare devuelve un error HTTP 429 para las solicitudes bloqueadas.  Los clientes Enterprise pueden consultar los detalles de las solicitudes bloqueadas por ubicación en **Códigos de estado** en el panel de control de análisis disponible en **Analytics** > **Tráfico**. 

{{<Aside type="note">}}
El error HTTP 429 incluye 429 respuestas devueltas desde el origen si el
servidor web de origen también aplica su propia limitación de velocidad.
{{</Aside>}}

___

## Prestaciones de la limitación de velocidad según plan

{{<Aside type="note">}}
**Limitación de velocidad** es un servicio adicional para todos los
planes de cliente, disponible en **Seguridad** \> **WAF** \> **Reglas de
limitación de velocidad**.
{{</Aside>}}

El número de reglas de limitación de velocidad permitidas depende del plan del dominio:

| Plan | N.° de reglas | Acciones | Duración de la acción | Periodo de la solicitud |
| --- | --- | --- | --- | --- |
| Gratuito | 1 | Bloquear | 1 minuto o 1 hora | 10 segundos o 1 minuto |
| Pro | 10 | Bloquear, CAPTCHA heredado (Legacy CAPTCHA), desafiar con JS, desafío gestionado o registro | 1 minuto o 1 hora | 10 segundos o 1 minuto |
| Business | 15 | Bloquear, CAPTCHA heredado (Legacy CAPTCHA), desafiar con JS, desafío gestionado o registro | 1 minuto, 1 hora o 24 horas | 10 segundos, 1 minuto o 10 minutos |
| Enterprise | 100 | Bloquear, CAPTCHA heredado (Legacy CAPTCHA), desafiar con JS, desafío gestionado o registro | Cualquier duración indicada entre 10 segundos y 86 400 segundos (24 horas) | Cualquier valor introducido entre 10 segundos y 3 600 segundos (1 hora). |

La función de limitación de velocidad de Cloudflare admite varios niveles de control de configuración en función del plan Cloudflare del dominio. La siguiente tabla muestra lo que puedes hacer según el plan al que estés suscrito:

| 
N.º

 | 

Tarea

 | 

Disponible en

 |
| --- | --- | --- |
| 

1

 | 

Configurar una regla básica de limitación de velocidad

 | 

Todos los planes

 |
| 

2

 | 

Configurar Criterios Avanzados

 | 

Planes Business y Enterprise

 |
| 

3

 | 

Configuración Respuesta Avanzada

 | 

Planes Business y Enterprise

 |
| 

4

 | 

Configuración opción Omitir

 | 

Plan Enterprise

 |

___

## Elementos de una regla de limitación de velocidad

Una regla de limitación de velocidad consta de tres elementos distintos. Haz clic en un elemento para desplegar los detalles:

Las solicitudes entrantes se emparejan en función de:

#### **La ruta de solicitud**

Por ejemplo:

-   http://ejemplo.com/ejemplo
-   http://ejemplo.com/ejemplo/\*

La ruta de solicitud no distingue entre mayúsculas y minúsculas. Los modelos no pueden coincidir con el contenido después de las cadenas de consulta (_?_) o los anclajes (_#_). Un asterisco (_\*_) coincide con cualquier secuencia de caracteres, incluida una secuencia vacía. Por ejemplo:

-   \*.ejemplo.com/\* coincide con cualquier ruta en cualquier subdominio de ejemplo.com
-   \*ejemplo.com/ejemplo.html coincide con ejemplo.html en ejemplo.com o con cualquier subdominio de ejemplo.com
-   \* coincide con cualquier página de tu sitio

Una solicitud para _ejemplo.com/ruta_ no es lo mismo que _ejemplo.com/ruta/_. La única excepción a esta regla es la página de inicio, _ejemplo.com_ coincide con _ejemplo.com/_.

#### **Esquema de solicitud**

_HTTP_ o _HTTPS_. Si no se especifica ninguno, ambos coinciden y la regla mostrará _\_ALL\__.

#### **Método de solicitud**

_POST_ o _GET_. Si no se especifica ninguno, todos los métodos coinciden y la regla mostrará _\_ALL\__.

#### **(opcional) Código de respuesta de origen**

Por ejemplo, haz coincidir una regla de **limitación de velocidad** solo cuando se devuelva el código de error HTTP 401 o 403 desde el servidor web de origen. Una regla activada que coincida con los criterios del código de respuesta bloquea las solicitudes posteriores de ese cliente, independientemente del código de respuesta de origen.

Una regla puede coincidir con el número y el periodo de tiempo de todas las solicitudes que realice el mismo cliente:

#### **Cantidad de solicitudes**

Especifica un mínimo de dos solicitudes. Para el bloqueo de solicitudes individuales, haz que la ruta no esté disponible, configurando, por ejemplo, tu servidor web de origen para que devuelva un código de error 403.

#### **Periodo de la solicitud**

Una regla se activa cuando las solicitudes de un cliente superan el umbral durante la duración especificada.

 

La mitigación de reglas consiste en:

#### **Acción de mitigación**

Las acciones de limitación de velocidad se basan en el plan del dominio, tal y como se menciona en **Prestaciones de la función de Limitación de velocidad según plan**:

-   **Bloquear:** Cloudflare emite un código de error HTTP 429 cuando se supera el límite.
-   **CAPTCHA heredado** **\-** El visitante debe superar un desafío de CAPTCHA. Si lo consigue, Cloudflare permite la solicitud.
-   **Desafío JS**: el visitante debe pasar un desafió JavaScript de Cloudflare. Si lo consigue, Cloudflare permite la solicitud.
-   **Registrar-** Las solicitudes se registran en [Registros de Cloudflare](https://support.cloudflare.com/hc/articles/216672448). De este modo, se ayuda a probar las reglas antes de aplicarlas.

#### **Duración de la prohibición**

Si se establece un tiempo de vencimiento inferior al limite, la API lo aumenta automáticamente para igualar el limite. 

Las personas que accedan a la función de **limitación de velocidad** reciben una página HTML por defecto si no se especifica una [página de error personalizada](https://support.cloudflare.com/hc/articles/200172706). Además, los clientes Business y Enterprise pueden especificar tipos de respuesta en la propia regla. Ver _Tarea 3: configurar Respuesta Avanzada_ más adelante.

___

## Identificación de los umbrales del límite de velocidad

Para identificar un limite general en la función de **Limitación de velocidad** de Cloudflare, divide 24 horas de solicitudes de sitios web no almacenadas en caché entre los visitantes únicos de esas mismas 24 horas. A continuación, divídelo por la media estimada de minutos de una visita. Finalmente, multiplica ese valor por 4 (o más) para establecer un límite aproximado por minuto para todo tu sitio. Un valor más alto de 4 está bien porque la mayoría de los ataques están en un orden de magnitud superior a las tasas de tráfico habitual.

Para identificar los límites de velocidad de URL para una URL específica, utiliza 24 horas de solicitudes no almacenadas en caché y visitantes únicos para la URL específica. Ajusta los límites según los informes de los usuarios y tu propia monitorización.

___

## Tarea 1: configurar una regla básica de limitación de velocidad

Haz clic para desplegar los detalles sobre la creación de los dos tipos comunes de regla de **Limitación de velocidad** de Cloudflare.

La función **Limitación de velocidad** incluye la herramienta **Proteger tu inicio de sesión** que con un solo clic crea una regla para bloquear durante 15 minutos al cliente que envía más de 5 solicitudes POST en un plazo de 5 minutos. Esta herramienta es suficiente para bloquear la mayoría de los intentos de inicio de sesión de fuerza bruta.

1.  Inicia sesión en tu cuenta de Cloudflare.
2.  Selecciona el dominio que quieres proteger.
3.  Ve a **Seguridad > WAF > Reglas de limitación de velocidad**.
4.  En **Limitación de velocidad**, haz clic en **Proteger tu inicio de sesión**.
5.  Escribe el **nombre de regla** y **la URL de inicio de sesión** en el cuadro de diálogo **Proteger tu inicio de la sesión**.
6.  Haz clic en **Guardar.**
7.  El **nombre de regla** aparece en su lista de reglas de **limitación de velocidad**.

1\. Inicia sesión en el panel de control de Cloudflare.

2\. Selecciona el dominio correspondiente.

3\. Ve a **Seguridad** > **WAF** > **Reglas de limitación de velocidad**.

4\. Haz clic en **Crear una regla personalizada**.  Aparecerá un cuadro de diálogo en el que puedes escribir información detallada de tu nueva regla.

![Crea un diálogo emergente de una regla de limitación de velocidad con un ejemplo de configuración de regla. La regla bloqueará las solicitudes de las direcciones IP que superen las 150 solicitudes por minuto en el plazo de una hora.](/images/support/previous-rate-limiting-create-rule.png)

5\. Escribe un **nombre de la regla** descriptivo.

6\. En la opción **Si el tráfico coincidente con la URL**, selecciona un esquema HTTP del menú desplegable así como una URL.

7\. En **desde la misma dirección IP supera**, escribe un número entero mayor que 1 para representar el número de solicitudes en un periodo de muestreo.

8\. En **solicitudes por**, selecciona el periodo de muestreo (el periodo durante el cual se cuentan las solicitudes). Los dominios de los planes Enterprise pueden escribir manualmente cualquier duración entre 10 segundos y 3 600 segundos (1 hora).

9\. En el menú desplegable **A continuación**, elige una de las acciones disponibles según tu plan. Revisa la sección _Mitigación de reglas_ de _Elementos de una regla de limitación de velocidad_ para obtener más información.

10\. Si has seleccionado _bloquear_ o _registrar_ para que **coincida con el tráfico de ese visitante**, selecciona durante cuánto tiempo se aplicará la opción una vez que se haya activado un umbral. Los dominios de los planes Enterprise pueden escribir cualquier tiempo entre 10 segundos y 86.400 segundos (24 horas).

11\. Para activar tu nueva regla, haz clic en **Guardar e implementar**.

La nueva regla aparece en la lista de reglas de limitación de velocidad.

En general, al configurar un umbral inferior:

1.  No cambies las reglas existentes y añade una nueva regla con el umbral más bajo.
2.  Una vez que se haya implementado la nueva regla, espera a que pase la duración de la acción de la regla anterior antes de eliminarla.

Si configuras un umbral más alto (debido al bloqueo de clientes legítimos), aumenta el umbral dentro de la regla existente.

___

## Tarea 2: configurar Criterios Avanzados (solo para planes Business y Enterprise)

La opción **Criterios avanzados** configura qué métodos HTTP, respuestas de encabezado y códigos de respuesta de origen coinciden con tu regla de limitación de velocidad.

Para configurar tus criterios avanzados para una regla nueva o existente, sigue estos pasos:

1\. Despliega el menú **Criterios avanzados**.

![Campos disponibles al configurar Criterios avanzados para una regla de limitación de velocidad.](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. Selecciona un valor del menú desplegable **Método(s)**. El valor por defecto es _CUALQUIERA_, que coincide con todos los métodos HTTP.

3\. Filtra por **encabezado(s) de respuesta HTTP**. Haz clic en **Añadir campo de respuesta de encabezado** para incluir los encabezados devueltos por tu servidor web de origen.

El encabezado **CF-Cache-Status** aparece por defecto para que Cloudflare entregue los recursos almacenados en caché en lugar de limitar la velocidad de esos recursos. Para limitar la velocidad de los recursos almacenados en caché, elimina este encabezado haciendo clic en el botón **X** o activa **Aplicar también límite de velocidad a los recursos en caché**.

Si tienes más de un encabezado en **Encabezados(s) de respuesta HTTP**, se aplica una lógica booleana _Y_. Para excluir un encabezado, utiliza la opción _No iguales_. Cada encabezado no distingue entre mayúsculas y minúsculas.

4\. En **Código(s) de respuesta de origen**, escribe el valor numérico de cada código de respuesta HTTP que deba coincidir.  Separa dos o más códigos HTTP con una coma (p. ej. `401, 403`).

5\. (Opcional) Configura las funciones adicionales de limitación de velocidad basadas en tu plan.

6\.  Haz clic en **Guardar e implementar**.

___

## Tarea 3: configurar Respuesta Avanzada (solo para planes Business y Enterprise)

La opción **Respuesta avanzada** configura el formato de la información devuelta por Cloudflare cuando se supera el umbral de una regla: Utiliza **Respuesta avanzada** cuando desees devolver texto sin formato estático o contenido JSON.

Para configurar una respuesta de texto sin formato o JSON:

1\. Despliega el menú **Respuesta avanzada**.

![Campos disponibles al configurar una Respuesta avanzada para una regla de limitación de velocidad.](/images/support/previous-rate-limiting-advanced-response.png)

2\. Selecciona un formato de **tipo de respuesta** que no sea el predeterminado: _JSON Personalizado_ o _Texto Personalizado_.

3\. Escribe la respuesta de texto sin formato o JSON que deseas devolver. El tamaño máximo de respuesta es de 32 kB.

5\. (Opcional) Configura las funciones adicionales de limitación de velocidad en función de tu plan.

6\. Haz clic en **Guardar e implementar**.

### Uso de página HTML personalizada o redireccionamiento

Si deseas mostrar una página HTML personalizada, configura una página personalizada para los errores HTTP 429 ("Demasiadas solicitudes") en el panel de control. Cloudflare mostrará esta página cuando selecciones "Página de limitación de velocidad de Cloudflare por defecto" en **tipo de respuesta**(el valor por defecto del campo).

Puedes utilizar este método para redirigir a un cliente con tarifa limitada a una URL específica:

1\. Crea una página HTML en tu servidor que redirija a la URL final de la página que deseas mostrar. Incluye una etiqueta [meta refresh](https://www.w3.org/TR/WCAG20-TECHS/H76.html) en el contenido de la página, como en el siguiente ejemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!tipodedocumento html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> &lt;título&gt;Página personalizada de RL&lt;/título&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> &lt;meta http-equiv=&quot;actualizar&quot; contenido=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

Toma nota de la URL pública de la página que has creado.

2\. En el panel de control de Cloudflare, ve a **Inicio de la cuenta** > **Configuraciones** > **Páginas personalizadas**.

3\. En **errores 429**, haz clic en **Páginas personalizadas**.

4\. Escribe la URL de la página que has creado en tu servidor, la página que contiene la etiqueta meta refresh, y haz clic en **Publicar**.

Sigue el mismo procedimiento si deseas devolver contenido de texto sin formato o JSON, pero la respuesta es mayor de 32 kB. En este caso, la URL de redireccionamiento sería la URL del recurso de texto sin formato o JSON que se desea mostrar.

**Notas:**

-   Tu limitación de velocidad  no debe coincidir con la URL de redireccionamiento que se incluye en la página HTML personalizada para los errores 429.
-   Para protegerse de los ataques de denegación de servicio, la página de redireccionamiento solo debe incluir recursos almacenados en la memoria caché de Cloudflare.

___

## Tarea 4: configurar la opción Omitir (solo planes Enterprise)

**Omitir** crea una lista de permitidos o una excepción para que no se aplique ninguna acción a un conjunto específico de URL, incluso si coincide con el límite de velocidad. Configura **Omitir** siguiendo estos pasos:

1\. Despliega el menú **Omitir**.

2\. En **Omitir regla para estas URL**, escribe las URL que deseas eximir de la regla de limitación de velocidad. Escribe cada URL en su propia línea. Un HTTP o HTTPS especificado en la URL se elimina automáticamente cuando se guarda la regla y, en su lugar, se aplica tanto a HTTP como a HTTPS.

![Configurar dos URL para evitar una regla de limitación de velocidad (una por línea).](/images/support/previous-rate-limiting-bypass.png)

3\. (Opcional) Configura las funciones adicionales de limitación de velocidad en función de tu plan.

4\. Haz clic en **Guardar e implementar**.

___

## Orden de ejecución de las reglas

**Caso de uso 1**: Si una solicitud coincide con las dos reglas siguientes,

-   regla 1: coincide con _prueba.ejemplo.com_
-   regla 2: coincide con _\*.ejemplo.com\*_

o

-   regla 1: coincide con _\*.ejemplo.com\*_
-   regla 2: coincide con _prueba.ejemplo.com_

entonces la regla 2 siempre se activará primero porque se creó en último lugar.

**Caso de uso 2:** Al eliminar el asterisco (\*) al final del dominio, la ejecución de la regla dependerá de la última regla creada**.**

-   regla 1: coincide con _prueba.ejemplo.com_
-   regla 2: coincide con _\*.ejemplo.com_

la regla 2 anterior se activa primero si una solicitud coincide con ambas reglas.

-   regla 1: coincide con _\*.ejemplo.com_
-   regla 2: coincide con _prueba.ejemplo.com_

la regla 2 anterior se activa primero si una solicitud coincide con ambas reglas.

___

## Recursos relacionados

-   [¿Cómo se notifica la limitación de velocidad en los registros de Enterprise Log Share (ELS)?](/logs/reference/log-fields)
-   [Resolución de problemas de la función de Limitación de velocidad de Cloudflare](https://support.cloudflare.com/hc/articles/115000546328)
-   [Configuración de la limitación de velocidad desde el panel de Cloudflare](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
