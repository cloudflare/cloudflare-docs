---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/218411427-C%C3%B3mo-entender-y-configurar-las-reglas-de-p%C3%A1gina-de-Cloudflare-Tutorial-sobre-las-reglas-de-p%C3%A1gina-
title: Cómo entender y configurar las reglas de página de Cloudflare (Tutorial sobre las reglas de página)
---

# Cómo entender y configurar las reglas de página de Cloudflare (Tutorial sobre las reglas de página)



## Información general

Puedes definir una regla de página para activar una o más acciones siempre que coincida un determinado patrón de URL. Las reglas de página están disponibles en la aplicación **Reglas**, en la pestaña **Reglas de página**. 

{{<Aside type="warning">}}
Las reglas de página requieren un registro DNS \"[redireccionado
mediante
proxy](/dns/manage-dns-records/reference/proxied-dns-records)\"
para que funcione la regla de tu página. Las reglas de página no se
aplicarán a los nombres de servidor que no existan en el DNS o que no se
dirijan a Cloudflare.
{{</Aside>}}

El número predeterminado de reglas de página permitidas depende del plan de dominio como se muestra a continuación.

| **Plan** | **Reglas de página permitidas** |
| --- | --- |
| Gratuito | 3 |
| Pro | 20 |
| Business | 50 |
| Enterprise | 125 |

Si estás suscrito a un plan gratuito, Pro o Business, puedes [comprar reglas adicionales](https://www.cloudflare.com/features-page-rules/) (hasta un máximo de 100).

___

## Antes de empezar

Es importante comprender dos comportamientos básicos de las reglas de página:

-   Solo la regla de página de coincidencia de prioridad más alta surte efecto en una solicitud.
-   Las reglas de página se priorizan en orden descendente en el panel de control de Cloudflare. La regla de mayor prioridad estará en la parte superior.

{{<Aside type="tip">}}
Te recomendamos que ordenes las reglas por prioridad, de las más
específicas a las menos específicas.
{{</Aside>}}

Una regla de página coincide con un patrón de URL basado en el siguiente formato (compuesto por cinco segmentos): <scheme>://<hostname><:port>/<path>?<query\_string>

Un ejemplo de URL con estos cuatro segmentos se parece a:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

Los segmentos _esquema_ y _puerto_ son opcionales. Si se omite, el  _esquema_ coincide con los protocolos _http://_ y _https://_. Si no se especifica ningún _puerto_, la regla coincidirá con todos los puertos.

Por último, puedes desactivar una regla de página en cualquier momento. Cuando una regla está desactivada, las acciones no se activarán, pero la regla seguirá apareciendo en la aplicación **Reglas** en la pestaña **Reglas de página**. Es editable y se incluye en el número de reglas permitidas para tu dominio. La opción _Guardar como borrador_ crea una regla de página que está deshabilitada de forma predeterminada.

___

## Crear una regla de página

Los pasos para crear una regla de página son:

1.  Inicia sesión en el panel de control de Cloudflare.
2.  Selecciona el dominio en el que deseas añadir la regla de página.
3.  Haz clic en la aplicación **Reglas**. 
4.  En la pestaña **Reglas de página****,** haz clic en **Crear regla de página**. Se abrirá el cuadro de diálogo  _Crear regla de página para <tu dominio>_. 
5.  En **Si la URL coincide con**, escribe la URL o el modelo de URL que debe coincidir con la regla. [_Más información sobre la coincidencia de comodines_](https://support.cloudflare.com/hc/es-es/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6).
6.  A continuación, en **los ajustes son:**  haz clic en **+ Añadir un ajuste** y selecciona el ajuste deseado en el menú desplegable. Puedes incluir más de un ajuste por regla. Puedes consultar más información sobre los ajustes en el [resumen de más abajo](https://support.cloudflare.com/hc/es-es/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ).
7.  En el menú desplegable **Orden**, especifica el orden deseado: _primero, último_ o _personalizado_.
8.  Para guardar, haz clic en una de las siguientes opciones:
    -   **Guardar como borrador** para guardar la regla y dejarla desactivada.
    -   **Guardar e implementar** para guardar la regla y activarla inmediatamente.

{{<Aside type="note">}}
**Nota:** No admitimos caracteres no ASCII (p.ej. punycode/dominio
unicode) en reglas de página. En su lugar, puedes codificar la cadena de
URL utilizando, por ejemplo, [Punycode
converter](https://www.punycoder.com/ "Convertidor de Punycode") y
funcionará.
{{</Aside>}}

{{<Aside type="tip">}}
Consulta la sección [reglas de página recomendadas a tener en
cuenta](https://support.cloudflare.com/hc/es-es/articles/224509547 "Reglas de página recomendadas que se han de tener en cuenta")
si necesitas ideas sobre los tipos de reglas de página que puedes crear.
{{</Aside>}}

___

## Editar una regla de página

Para modificar una regla existente:

1.  Inicia sesión en el panel de control de Cloudflare.
2.  Selecciona el dominio en el que deseas añadir la regla de página.
3.  Haz clic en la aplicación **Reglas**. 
4.  En la pestaña **Reglas de página**, localiza la regla a editar.
5.  Continúa para realizar los cambios necesarios, de la siguiente manera:
    -   Para activar o desactivar una regla, haz clic en el botón **Activado/Desactivado**.
    -   Para modificar el modelo de URL, la configuración y el orden, haz clic en el botón **Editar** (icono en forma de llave inglesa). En el cuadro de diálogo, introduce la información que deseas modificar.
    -   Para eliminar una regla, haz clic en el botón **Eliminar** (icono de una x) y confirma haciendo clic en **Aceptar** en el cuadro de diálogo **Confirmar**.

___

## Coincidencia y referencias de caracteres comodines

Puedes utilizar el asterisco (\*) en cualquier segmento de la URL para que coincida con determinados modelos. Por ejemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com/t*st</span></div></span></span></span></code></pre>{{</raw>}}

Coincidiría con:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_ejemplo.com/foo/\*_ no coincide con ejemplo.com/foo.  Sin embargo, _ejemplo.com/foo\*_, sí.

### Consejos útiles

-   Para incluir _http_ y _https_, escribe solamente _ejemplo.com_. No es necesario escribir _\*ejemplo.com_.
-   Para que todas las páginas de un dominio coincidan, escribe _ejemplo.com/\*_. Si solo escribes _ejemplo.com_ no funcionará.
-   Para que todas las páginas de un dominio y sus subdominios coincidan, escribe \*_example.com/\*_. Si solo escribes _example.com_ no funcionará.
-   Un caracter comodín (\*) en una URL de regla de página coincidirá incluso si no hay caracteres presentes, y puede incluir cualquier parte de la URL, incluida la cadena de consulta.

### Referenciar las coincidencias de los comodines

Puede hacer referencia a un comodín coincidente más adelante utilizando la sintaxis _$X._ _X_ indica el índice de un patrón de glob. Así, $1 representa la primera coincidencia de comodines, $2 la segunda coincidencia de comodines, y así sucesivamente.

Esto es especialmente útil con la configuración de _URL de reenvío_. Por ejemplo:

Podrías reenviar:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.ejemplo.com/*</span></div></span></span></span></code></pre>{{</raw>}}

a:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/images/support/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

Esta regla coincidiría con:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/images/support/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

que termina siendo reenviado a:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/images/support/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

Para usar un carácter literal _$_ en la URL de reenvío, sortéalo añadiendo una barra invertida (\\) delante: _\\$_.

{{<Aside type="warning">}}
Evita crear un redireccionamiento en el que el dominio apunte a sí mismo
como destino. Esto podría ocasionar un error de redireccionamiento
infinito y tu sitio no se podría servir a los visitantes.
{{</Aside>}}

___

## Resumen de la configuración de reglas de página

La configuración controla la acción que realiza Cloudflare una vez que una solicitud coincide con el modelo de URL definido en una regla de página. Puedes utilizar la configuración para activar y desactivar varias funciones de Cloudflare en varias aplicaciones del panel. Ten en cuenta lo siguiente:

-   Algunas configuraciones requieren un plan de dominio Pro, Business o Enterprise.
-   Puede especificar más de una configuración que se aplicará cuando se active la regla.

A continuación, se muestra la lista completa de los ajustes disponibles, presentados en el orden en que aparecen en la interfaz de usuario de las **reglas de página de Cloudflare**.

|**Ajuste**|**Descripción**|**Planes**|
| --- | --- | --- |
|Usar siempre HTTPS| Activa o desactiva la función **[Usar siempre HTTPS](/ssl/edge-certificates/additional-options/always-use-https)** de la pestaña **Certificados de perímetro** en la aplicación **SSL/TLS** de Cloudflare. Si se activa, cualquier URL _http://_ se convierte en  _https://_ mediante redireccionamiento 301. Si no aparece esta opción es porque aún no dispones de un **certificado de perímetro** activo. | Todo |
| Auto Minify | Indica qué extensiones de archivo quieres minificar automáticamente. [Más información](https://support.cloudflare.com/hc/articles/200168196). | Todo |
|Reescrituras automáticas HTTPS|Activa o desactiva la función **Reescrituras automáticas HTTPS de Cloudflare** de la pestaña **certificado de perímetro** de la aplicación **SSL/TLS** de Cloudflare. [Más información](/ssl/edge-certificates/additional-options/automatic-https-rewrites).| Todo|
|TTL de caché del navegador|Controla el tiempo de validez de los recursos almacenados en caché por los navegadores de los clientes. Tanto la interfaz de usuario como la API de Cloudflare prohíben la configuración de **TTL de caché de navegador** a _0_ para los dominios que no son Enterprise. [Más información](/cache/how-to/edge-browser-cache-ttl/).| Todo|
|Comprobación de integridad del navegador|Comprueba el navegador del visitante en busca de encabezados comúnmente asociados con quienes envían spam y ciertos bots. [Más información](https://support.cloudflare.com/hc/articles/200170086).|Todo|
|Omisión caché en cookie|Omite el almacenamiento en caché y recupera los recursos del servidor de origen si una expresión normal coincide con un nombre de cookie presente en la solicitud. Si agregas esta configuración y la configuración _Cache on Cookie_ a la misma regla de página, _Cache on Cookie_ tiene prioridad sobre _Bypass Cache on Cookie_. _Consulta más detalles a continuación para obtener información sobre la compatibilidad limitada con expresiones normales._| Business Enterprise|
| Caché por tipo de dispositivo| Separa el contenido en caché en función del tipo de dispositivo del visitante. [Mas información](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only).|Enterprise|
| Protección contra engaño en caché| Protege de los ataques de engaño a la caché de la web al tiempo que permite el almacenamiento en caché de los activos estáticos. Esta configuración verifica que la extensión de la URL coincide con la devuelta _Content-Type_. Más información.| Todo|
| Clave de caché| También conocida como _Clave de caché personalizada_. Controla específicamente qué variables incluir al decidir qué recursos almacenar en caché. Esto permite a los clientes determinar lo que se debe almacenar en la memoria caché basándose en algo más que la URL. [Más información](/cache/how-to/cache-keys/).| Enterprise |
| Nivel de caché| Aplica la memoria caché personalizada en función de la opción seleccionada: **Omitir:** Cloudflare no almacena en caché. **Sin cadena de consulta**: entrega recursos desde la memoria caché cuando no hay una cadena de consulta. **Ignorar cadena de consulta**: entrega el mismo recurso a todos independientemente de la cadena de consulta. **Estándar:** almacena en la memoria caché todo el contenido estático que tiene una cadena de consulta. **Copiar todo en caché**: trata todo el contenido como estático y almacena en la memoria caché todos los tipos de archivos más allá del [contenido almacenado en caché predeterminado de Cloudflare](/cache/concepts/default-cache-behavior/#default-cached-file-extensions). Respeta los encabezados de caché del servidor web de origen a menos que el **TTL de caché del perímetro** también se establezca en la regla de página. Cuando se combina con un **TTL de caché del perímetro** > _0_, **Copiar todo en caché** elimina las cookies de la respuesta del servidor web de origen. | Todo |
| Caché en Cookie | Aplica la opción _Copiar todo en caché_ (configuración de _Nivel de caché_ ) en función de una coincidencia de expresión normal con un nombre de cookie. Si añades esta configuración y _Omitir caché en cookie_ a la misma regla de página, _caché en cookie_ tiene prioridad sobre _Omitir caché en cookie_. | Business Enterprise|
| TTL de caché por código de estado| Los clientes Enterprise pueden establecer el tiempo de vida de la caché (TTL) en función del estado de la respuesta del servidor web de origen. TTL de caché se refiere a la duración de un recurso en la red de Cloudflare antes de ser marcado como obsoleto o descartado de la caché. Los códigos de estado son devueltos por el origen de un recurso.   La configuración del TTL de caché basada en el estado de la respuesta anula el comportamiento predeterminado de la caché (caché estándar) para los archivos estáticos y anula las instrucciones de la caché enviadas por el servidor web de origen. Para almacenar en caché activos no estáticos, establece un nivel de caché de "Todo en caché" utilizando una regla de página . Establecer un control de caché sin almacenamiento o un TTL bajo (usando max-age/s-maxage) aumenta las solicitudes a los servidores web de origen y disminuye el rendimiento. [Más información](https://support.cloudflare.com/hc/es-es/articles/360043842472-Configuring-cache-TTL-by-status-code).| Enterprise|
| Deshabilitar aplicaciones|Desactiva todas las aplicaciones activas de **Cloudflare Apps**.| Todo|
| Desactivar Rendimiento| Desactiva: [Auto Minify](https://support.cloudflare.com/hc/articles/200168196) [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) [Mirage](https://support.cloudflare.com/hc/articles/200403554) [Polish](https://support.cloudflare.com/hc/articles/360000607372) | Todo|
| Desactivar Railgun| Desactiva la función **Railgun** de la aplicación **Velocidad** de Cloudflare.| Business Enterprise|
| Deshabilitar Seguridad| Desactiva: [Ofuscación de la dirección de correo electrónico](https://support.cloudflare.com/hc/articles/200170016) [Limitación de velocidad (versión anterior)](https://support.cloudflare.com/hc/articles/115001635128) [ScrapeShield](https://support.cloudflare.com/hc/articles/200171036) [Exclusiones del lado del servidor](https://support.cloudflare.com/hc/articles/200170036) [Bloqueo de URL (zona)](/waf/tools/zone-lockdown/) [Reglas administradas del WAF (versión anterior)](https://support.cloudflare.com/hc/articles/200172016)| Todo|
| TTL de caché del perímetro| Especifica el tiempo que se debe almacenar en caché un recurso en la red perimetral de Cloudflare. El _TTL de la caché perimetral_ no es visible en los encabezados de respuesta.  El _TTL mínimo de la caché perimetral_ depende del tipo de plan: Plan gratuito - 2 horas  Pro - 1 hora  Business - 1 segundo  Enterprise - 1 segundo | Todo|
| Ofuscación de la dirección de correo electrónico| Activar o desactivar la función **ofuscación de correo electrónico** de la aplicación **Scrape Shield** de Cloudflare. [Más información](https://support.cloudflare.com/hc/articles/200170016). | Todo |
| URL de reenvío | Redirige una URL a otra mediante un _redireccionamiento HTTP 301/302_. _Consulta [Coincidencia y referencia de caracteres comodines.](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)_ | Todo |
| Anulación de encabezado del servidor| Aplica un encabezado de servidor específico. [Más información](https://support.cloudflare.com/hc/articles/206652947). | Enterprise |
| Encabezado de geolocalización de IP| Cloudflare añade un encabezado HTTP _CF-IPCountry_ que contiene el código de país que corresponde al visitante. | Todo |
| Mirage | Activa o desactiva **Cloudflare Mirage** de la aplicación  **Velocidad** de Cloudflare. [Más información](https://support.cloudflare.com/hc/articles/200403554).| Pro Business Enterprise|
| Encriptación oportunista| Activa o desactiva la función **Encriptación oportunista de Cloudflare** de la pestaña **Certificados de perímetro** en la aplicación **SSL/TLS** de Cloudflare. [Más información](/ssl/edge-certificates/additional-options/opportunistic-encryption). | Todo|
| Encabezado Origin Cache Control | [Origin Cache Control](/cache/concepts/cache-control/) está activado por defecto en los dominios de los planes gratuito, Pro y Business y desactivado por defecto en los dominios Enterprise. | Todo |
| Paso directo a página de error en origen| Activa o desactiva las páginas de error de Cloudflare generadas a partir de incidencias enviadas desde el servidor de origen. Si están habilitadas, esta configuración activa las páginas de error emitidas por el origen. | Enterprise|
| Polish| Aplica las opciones de la función **Polish** de la aplicación  **Velocidad** de Cloudflare. [Más información](/images/polish).| Pro Business Enterprise|
| Ordenar cadena de consulta | Activa o desactiva el reordenamiento de las cadenas de consulta. Cuando las cadenas de consulta tienen la misma estructura, el almacenamiento en caché mejora. [Más información](https://support.cloudflare.com/hc/articles/206776797). | Enterprise |
| Resolver anulación| Cambia la dirección de origen al valor especificado en esta configuración. [Más información](https://support.cloudflare.com/hc/articles/206190798). | Enterprise |
| Respetar ETags fuertes| Activa o desactiva las comprobaciones de equivalencia byte a byte entre la memoria caché de Cloudflare y el servidor de origen. [Más información](https://support.cloudflare.com/hc/articles/218505467). | Enterprise|
| Búfer de respuesta | Activa o desactiva si Cloudflare debe esperar un archivo completo desde el servidor de origen antes de enviarlo al visitante del sitio. De forma predeterminada, Cloudflare envía paquetes al cliente a medida que llegan desde el servidor de origen. | Enterprise|
| Rocket Loader| Activa o desactiva **Cloudflare Rocket Loader** en la aplicación **Velocidad** [de Cloudflare. Más información](https://support.cloudflare.com/hc/articles/200168056). | Todo |
| Nivel de seguridad | Opciones de control para la función  **Nivel de seguridad**  de la aplicación  **Seguridad** . [Más información](https://support.cloudflare.com/hc/articles/200170056). | Todo |
| Exclusiones del lado del servidor| Activa o desactiva la función **exclusión del lado del servidor** de la aplicación **Scrape Shield** de Cloudflare. [Más información](https://support.cloudflare.com/hc/articles/200170036). | Todo |
| SSL | Opciones de control para la función **SSL** de la pestaña **Certificados de perímetro** en la aplicación **SSL/TLS** de Cloudflare. [Más información](/ssl/origin-configuration/ssl-modes). | Todo |
| Encabezado de IP de cliente verdadero | Activa o desactiva la función **encabezado de IP de cliente verdadero** de la aplicación **Red** de Cloudflare. [Más información](https://support.cloudflare.com/hc/articles/206776727). | Enterprise |
| Firewall de aplicaciones web (versión anterior)| Activar o desactivar **Reglas administrada del WAF** según lo definido en **Seguridad** > **WAF** > **Reglas administradas**. [Más información](https://support.cloudflare.com/hc/articles/200172016). No se pueden activar o desactivar reglas individuales administradas del WAF a través de las reglas de la página. | Pro Business Enterprise |

___

## Problemas conocidos

**Problema de configuración de la regla de página que origina el "****_Error 500 (error interno del servidor)_****"**

**Causa principal**: puede deberse a un problema de configuración en una regla de página. Cuando se crea una regla de página que utiliza dos comodines, como una regla de _Reenvío de URL_, es posible crear una regla que mencione el segundo comodín con el marcador de posición $2. Véase el ejemplo siguiente:

![Ejemplo de configuración de regla de página con dos comodines. La URL de reenvío contiene un marcador de posición $2, que se sustituirá por el contenido que coincida con el segundo ](/images/support/page-rule-create.png)

Al actualizar la misma regla, puedes eliminar uno de los comodines en el campo **Si la URL coincide** y guardarlo. Véase el ejemplo siguiente:

![Configuración incorrecta de la regla de página con un solo comodín, pero que sigue utilizando el marcador de posición $2 en la URL de reenvío. Esta configuración hace que ](/images/support/page-rule-update.png)

Si lo haces, el marcador de posición $2 mencionará a un comodín que ya no existe y, por lo tanto, aparecerá un "_Error 500 (error interno del servidor)"_ cuando una URL active la regla de la página.

**Solución**: actualizar la regla de la página y eliminar la referencia _2$_ para el segundo comodín. Si solo hay un comodín, entonces solo se puede utilizar _$1_.

___

## Detalles adicionales

### Configuración Omitir caché en cookie

Esta configuración está disponible para los clientes Business y Enterprise.

La configuración de **Omitir caché en cookie** admite expresiones normales básicas (regex) como las siguientes:

-   Un operador de conexión (representado por |) hace coincidir varias cookies utilizando la lógica booleana _OR_. Por ejemplo, bypass=.\*_|PHPSESSID=.\*_ pasaría por alto la caché si se establece una cookie llamada bypass o PHPSESSID, independientemente del valor de la cookie.
-   El operador de caracteres comodín (representado por .\*), de modo que un valor de regla de "t.\*st=" coincidiría tanto con una cookie denominada "prueba" como con otra denominada "pruebaaa".

Las limitaciones incluyen:

-   150 caracteres por expresión regular de cookie
-   12 caracteres comodines por expresión normal de cookie
-   1 caracter comodín en medio | en la expresión normal de cookie

Para aprender a configurar **Omitir caché en cookie** con una variedad de plataformas, revisa estos artículos:

-   [Almacenamiento en la memoria caché de vistas de página anónimas con WordPress o WooCommerce](https://support.cloudflare.com/hc/articles/236166048)
-   [Almacenamiento en la memoria caché de vistas de página con Magento 1 y Magento 2](https://support.cloudflare.com/hc/articles/236168808)
-   [¿Cómo puedo almacenar el HTML estático en la memoria caché?](https://support.cloudflare.com/hc/articles/202775670)

**Nota:** Si añades tanto esta configuración como la configuración _caché en cookie_ solo para empresas a la misma regla de página, _caché en cookie_ tiene prioridad sobre _Omitir caché en cookie_.

### Las ocurrencias de nombres de zona deben terminar con una barra oblicua

Al guardar una regla de página, Cloudflare se asegurará de que haya una barra obligua después de cada ocurrencia de nombre de zona actual en el campo **si la URL coincide**. Por ejemplo, si el nombre de zona actual es `ejemplo.com`, entonces:

-   `ejemplo.com` se guardará como `ejemplo.com/`
-   `ejemplo.com/ruta/ejemplo.com` se guardará como `ejemplo.com/ruta/ejemplo.com/`

Ten en cuenta que `ejemplo.com/alguna-ruta/cloudflare.com` se guardará _sin_ una barra oblicua final, ya que el nombre de zona no es `cloudflare.com`.

### Puertos de red compatibles con Page Rules

Si especificas un puerto en el campo **si la URL coincide** de una regla de página, debe ser uno de los siguientes:

-   Uno de los puertos HTTP/HTTPS [compatible con el proxy de Cloudflare](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   Un puerto personalizado de una aplicación HTTPS de [Cloudflare Spectrum](/spectrum/).

### Uso de Page Rules con Workers

Si la URL de la solicitud actual coincide tanto con una regla de página como con una [ruta personalizada de Workers](/workers/platform/routes), no se aplicarán algunos ajustes de Page Rules. Si necesitas más información sobre el uso de Page Rules con Workers, consulta [Workers: Page Rules](/workers/configuration/workers-with-page-rules/) en la documentación para desarrolladores.

___

## Recursos relacionados

-   [Reglas de página recomendadas que se han de tener en cuenta](https://support.cloudflare.com/hc/articles/224509547)
-   [¿Qué subdominios son adecuados para nube gris o naranja?](https://support.cloudflare.com/hc/es-es/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [¿Cómo puedo almacenar en la caché todo lo que hay en una URL?](https://support.cloudflare.com/hc/articles/202775670)
-   [¿Cómo puedo almacenar el HTML estático en la memoria caché?](https://support.cloudflare.com/hc/articles/200172256)
-   [Mensaje de error "sin conexión" al actualizar o acceder a la sección de administración de mi sistema de gestión de contenidos](https://support.cloudflare.com/hc/articles/200169526)
