---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200172016-Reglas-administradas-del-WAF-Firewall-de-aplicaciones-web-
title: Reglas administradas del WAF (Firewall de aplicaciones web)
---

# Reglas administradas del WAF (Firewall de aplicaciones web)



## Información general

Las reglas administradas, una función de Cloudflare WAF (Firewall de aplicaciones web), identifican y eliminan la actividad sospechosa de las solicitudes HTTP GET y POST. 

Entre los ejemplos de [contenido malicioso](https://www.cloudflare.com/learning/security/what-is-web-application-security/) que las reglas administradas identifican se encuentran: 

-   Palabras clave comunes utilizadas en spam de comentarios (_XX_, _Rolex_, _Viagra_, etc.)
-   Ataques de scripting entre sitios (XSS)
-   Inyecciones de código SQL (SQLi)

Las reglas administradas están disponibles en los planes Pro, Business y Enterprise de cualquier [subdominio redireccionado mediante proxy a Cloudflare](https://support.cloudflare.com/hc/articles/200169626). Controla la configuración de las reglas administradas en **Seguridad** > **WAF** > **Reglas administradas**. Las reglas administradas incluyen tres paquetes: 

-   **Conjuntos de reglas administradas** 
-   **Paquete: conjunto de reglas básicas de OWASP ModSecurity**
-   **Reglas solicitadas por el cliente** 

{{<Aside type="note">}}
-   El nuevo WAF, anunciado en marzo de 2021, proporciona el [el
    conjunto de reglas administradas gratuitas de
    Cloudflare](/waf/managed-rulesets/)
    a todos los clientes, incluidos los suscritos a un plan gratuito.
    Consulta la [entrada del
    blog](https://blog.cloudflare.com/waf-for-everyone/) para obtener
    más detalles.
-   El 4 de mayo de 2022, Cloudflare comenzó la fase 1 de la [migración
    de WAF](https://support.cloudflare.com/hc/articles/5995821690637)
    desde las reglas administradas del WAF a los nuevos conjuntos de
    reglas administradas del WAF.
{{</Aside>}}

Revisa las amenazas bloqueadas a través de [Análisis de firewall](/waf/analytics/) **Registro de actividad** disponible en **Seguridad** > **Información general**.

### Consideraciones importantes

-   Las reglas administradas añaden una cantidad limitada de latencia. 
-   Los cambios en las reglas administradas del WAF tardan unos 30  
    segundos en actualizarse globalmente.
-   Cloudflare utiliza reglas propias para filtrar el tráfico. 
-   Los Websockets establecidos no activan las reglas administradas para las solicitudes posteriores.
-   Las reglas administradas analizan las respuestas JSON para identificar las vulnerabilidades dirigidas a las API. El análisis de la carga útil JSON está limitado a 128 KB.
-   Las reglas administradas mitigan las técnicas de relleno. Recomendamos lo siguiente:
    1.  Activar la regla _100048_. Esta regla protege ahora contra los ataques de "relleno", pero no se implementa por defecto ya que provoca muchos falsos positivos en los entornos de los clientes. Sin embargo, es importante que los clientes ajusten su configuración de reglas administradas. Cloudflare está trabajando en una solución mejor a largo plazo.
    2.  Crea una regla de firewall utilizando el [Editor de expresión](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) en función de la necesidad de comprobar los encabezados y/o el cuerpo para bloquear la carga útil más grande (> 128 KB). Asegúrate de probar tu regla de firewall en el modo _Registro_ primero, ya que podría ser propenso a generar falsos positivos.
        -   _http.request.body.truncated_
        -   _http.request.headers.truncated_
-   Hay varias reglas administradas que Cloudflare no desactiva aunque **Reglas administradas** esté _desactivado_ en el panel de control de Cloudflare, como los Id. de regla _WP0025B_, _100043A_ y _100030._

___

## Nota sobre los falsos positivos y falsos negativos

Por defecto, las reglas administradas del WAF se administran completamente a través del panel de control de Cloudflare y son compatibles con la mayoría de los sitios y aplicaciones web. Sin embargo, los falsos positivos y falsos negativos pueden tener en cuenta todo el ecosistema de Internet:

-   **Falsos positivos**: solicitudes legítimas detectadas y filtradas como maliciosas.
-   **Falsos negativos**: solicitudes maliciosas no filtradas.

### Solución de falsos positivos de las reglas administradas del WAF

La definición de contenido sospechoso es subjetiva para cada sitio web.  Por ejemplo, el código PHP publicado en tu sitio web es sospechoso a menos que tu sitio web te enseñe a codificar y requiera el envío de código PHP de los visitantes.  Por lo tanto, dicho sitio web debe deshabilitar las reglas administradas que interfieran con el funcionamiento normal.

Para hacer la prueba de falsos positivos, configura las reglas administradas del WAF en modo **Simular**, de esta manera registrarás la respuesta a posibles ataques sin las acciones de desafiar o bloquear. Utiliza también el [**registro de actividad**](/waf/analytics/paid-plans#activity-log) de la función Análisis de firewall para determinar qué reglas administradas causaron falsos positivos.

Si te encuentras con un falso positivo debido al [WAF heredado](https://support.cloudflare.com/hc/es-es/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-), existen varias soluciones potenciales:

-   **Añade las direcciones IP del cliente a la lista de permisos de** [**reglas de Access de IP**](https://support.cloudflare.com/hc/articles/217074967)**:** si el navegador o el cliente visita desde las mismas direcciones IP, recomendamos permitir. 
-   **Desactiva la(s)** [**regla(s) administradas**](https://support.cloudflare.com/hc/articles/200172016) correspondiente(s): evita bloquear o desafiar los falsos positivos, pero reduce la seguridad general del sitio. Una solicitud bloqueada por el Id. de regla _981176_ hace referencia a las reglas de OWASP. Reduce la sensibilidad de OWASP para resolver el problema.
-   **Omitir las reglas administradas del WAF con una regla de firewall:** crea una regla de firewall con la acción **Omitir** para desactivar las reglas administradas del WAF en una combinación específica de parámetros. Por ejemplo, [omite las reglas administradas](/firewall/cf-firewall-rules/actions/) para una URL específica y una dirección IP o agente de usuario concreto.
-   **No se recomienda desactivar las reglas administradas del WAF para el tráfico hacia una URL:**  disminuye la seguridad en el punto de conexión de la URL en particular.  Configuración a través de [Page Rules](https://support.cloudflare.com/hc/es-es/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-).

Si te encuentras con un falso positivo debido al [nuevo WAF](https://blog.cloudflare.com/new-cloudflare-waf/), existen varias soluciones potenciales:

1.  **Añade una excepción del WAF:** puedes definir excepciones del WAF en el [panel de control de Cloudflare](/waf/managed-rulesets/waf-exceptions/define-dashboard) o por medio del  [conjunto de reglas API](/waf/managed-rulesets/waf-exceptions/define-api).
2.  **Desactiva la(s)** [**regla(s) administradas**](https://support.cloudflare.com/hc/articles/200172016) correspondiente(s): evita bloquear o desafiar los falsos positivos, pero reduce la seguridad general del sitio. Una solicitud bloqueada por el Id. de regla _949110_ se refiere a las [nuevas reglas de OWASP](https://blog.cloudflare.com/new-cloudflare-waf/). Reduce la sensibilidad de OWASP para resolver el problema.

**Nota:** Si [contactas con Soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) para verificar si una regla administrada del WAF se activa según lo previsto, [facilita una captura de un archivo HAR](https://support.cloudflare.com/hc/articles/203118044#h_8c9c815c-0933-49c0-ac00-b700700efce7) al enviar la solicitud específica.

A continuación, enumeramos otras directrices:

-   Si una regla específica causa falsos positivos, configura el **modo** de la regla en _Desactivar_ en lugar de _desactivar_ todo el **Grupo** de regla.
-   Para solucionar falsos positivos con el contenido del administrador de tu sitio web, crea una [**regla de página**](https://support.cloudflare.com/hc/articles/218411427) para **deshabilitar la seguridad** para la sección _admin_ de los recursos de tu sitio, es decir, _yoursite.com/admin_.

### Solucionar los falsos negativos de las reglas administradas del WAF

Para identificar falsos negativos, revisa los registros HTTP de tu servidor web de origen. Para reducir los falsos negativos, utiliza la siguiente lista de verificación:

-   ¿Están _activadas_ las reglas administradas del WAF en **Seguridad** > **WAF** > **Reglas administradas**?
-   ¿Están _desactivadas_ las reglas administradas del WAF a través [**Page Rules**](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)?
-   No todas las reglas administradas están habilitadas de forma predeterminada, por lo tanto, revisa las acciones predeterminadas de las reglas individuales.
    -   Por ejemplo, Cloudflare permite solicitudes con agentes de usuario vacíos de forma predeterminada. Para bloquear solicitudes con un agente de usuario vacío, cambia el  **Modo** de la regla a **Bloquear**.
    -   Otro ejemplo, si quieres bloquear los ataques de inyección de código SQL no mitigados, asegúrate de que las reglas de inyección de código SQL relevantes están activadas y configuradas en el modo **Bloquear** en el grupo **Cloudflare Specials**.
-   ¿Se redirigen los registros DNS que sirven tráfico HTTP mediante proxy a Cloudflare?
-   ¿Una [**regla de firewall** omite](/firewall/cf-firewall-rules/actions/#supported-actions) las reglas administradas de Cloudflare? 
-   ¿Puede un país, aviso de envío por adelantado (ASN), rango de IP o dirección IP que estén autorizados en las [**reglas de Access de IP**](https://support.cloudflare.com/hc/articles/217074967) o [**reglas de firewall**](/firewall/cf-firewall-rules/) coincidir con el tráfico de ataque?
-   ¿Se dirige el tráfico malicioso a tus direcciones IP de origen para evitar la protección de Cloudflare? Bloquea todo el tráfico, excepto las [direcciones IP de Cloudflare](https://www.cloudflare.com/ips/) en tu servidor web de origen.

___

## Conjuntos de reglas administradas de Cloudflare

El **conjunto de reglas administradas de Cloudflare** contiene reglas de seguridad escritas y depuradas por Cloudflare. Haz clic en un nombre de conjunto de reglas en **Grupo** para desplegar las descripciones de las reglas.

**Cloudflare Specials** es un **Grupo** que ofrece seguridad firewall básica contra [ataques comunes](https://www.cloudflare.com/learning/security/what-is-web-application-security/).   

{{<Aside type="tip">}}
Cloudflare recomienda que siempre mantengas habilitado **Cloudflare
Specials**. Además, activa solo los grupos de reglas que correspondan a
tu paquete tecnológico. Por ejemplo, si utilizas WordPress, activa el
grupo **Cloudflare WordPress**.
{{</Aside>}}

Al visualizar un conjunto de reglas, Cloudflare muestra las acciones predeterminadas para cada regla enumerada en **modo predeterminado**. El **modo** disponible para reglas individuales dentro de un **conjunto de Reglas** **administradas** específico de Cloudflare es:

-   _Predeterminado: realiza la acción predeterminada que aparece en_ _**modo predeterminado**_ _al ver una regla específica._
-   _Desactivado:_ desactiva la regla específica dentro del grupo.
-   _Bloqueado_: la solicitud se descarta.
-   _CAPTCHA heredado (Legacy CAPTCHA)_ -El visitante recibe una página de desafío CAPTCHA.
-   _Simulado_: la solicitud se permite pero se registra en el [**registro de actividad**](/waf/analytics/paid-plans#activity-log).

El [registro de cambios del WAF](/waf/change-log/scheduled-changes/) de Cloudflare permite a los clientes supervisar los cambios en curso en el **Conjunto de reglas administradas de Cloudflare.**

___

## Paquete: conjunto de reglas básicas de OWASP ModSecurity

### Paquete OWASP de Cloudflare

**Paquete: conjunto de reglas básicas de OWASP ModSecurity** asigna una puntuación a cada solicitud en función de cuántas reglas OWASP se activen. Algunas reglas OWASP tienen una puntuación de sensibilidad más alta que otras. Después de que OWASP evalúe una solicitud, Cloudflare compara la puntuación final con la **sensibilidad** configurada para el dominio. Si la puntuación supera la **sensibilidad**, la solicitud se realiza en función de la **Acción** configurada en **Paquete: conjunto de reglas básicas de OWASP ModSecurity**:

-   _Bloqueado_: la solicitud se descarta.
-   _Desafío_: el visitante recibe una página de desafío CAPTCHA.
-   _Simulado_: la solicitud se permite pero se registra en el [**registro de actividad**](/waf/analytics/paid-plans#activity-log).

La puntuación de sensibilidad necesaria para activar el WAF para una **sensibilidad** específica es la siguiente:

-   _Baja_ - 60 y superior
-   _Media_ - 40 y superior
-   _Alta_ - 25 y superior

Para las solicitudes de Ajax, se aplican las siguientes puntuaciones:

-   _Baja_ - 120 y superior
-   _Media_ - 80 y superior
-   _Alta_ - 65 y superior

Revisa el [registro de actividad](/waf/analytics/paid-plans#activity-log) para ver la puntuación final, así como las reglas individuales activadas.

### Controla el paquete OWASP de Cloudflare

**Paquete: el conjunto de reglas básicas de OWASP ModSecurity** contiene varias reglas del [proyecto OWASP](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project). Cloudflare no escribe ni resuelve las reglas de OWASP. Haz clic en un nombre de conjunto de reglas en **Grupo** para que se muestren las descripciones de las reglas. A diferencia del **conjunto de reglas administradas de Cloudflare**, las reglas específicas de OWASP se _activan_ o _desactivan._

Para administrar los umbrales OWASP, establece el nivel de **sensibilidad** en _baja_, _media_ o _alta_ en **Paquete: conjunto de reglas básicas de OWASP ModSecurity**. Si se configura la **sensibilidad** en _desactivada_, se desactivará todo el paquete OWASP, incluidas todas sus reglas. El nivel de **sensibilidad** adecuado depende del sector y las operaciones de tu empresa. Por ejemplo, la configuración _baja_ es adecuada para:

-   Ciertos sectores empresariales tienen más probabilidades de activar el WAF, y
-   cargar archivos grandes. 

{{<Aside type="tip">}}
Con una *sensibilidad* **alta**, las cargas de archivos grandes activan
el WAF.
{{</Aside>}}

Cloudflare recomienda configurar inicialmente la **sensibilidad** a _baja_ y revisar si hay falsos positivos antes de aumentar el valor de **sensibilidad**.

{{<Aside type="note">}}
El registro de actividad muestra el **ID de regla** *981176* (OWASP
heredado) o *949110* ([nuevo
OWASP](https://blog.cloudflare.com/new-cloudflare-waf/)) cuando una
solicitud es bloqueada por OWASP. Además, algunas reglas OWASP incluidas
en el registro de actividad no aparecen en la lista de reglas de
**Paquete: conjunto de reglas básicas de OWASP ModSecurity** porque no
se recomienda desactivarlas.
{{</Aside>}}

___

## Recursos relacionados

-   [Análisis de firewall](/waf/analytics/)
-   [Reglas de firewall de Cloudflare](/firewall/cf-firewall-rules/)
-   [Registro de cambios del WAF de Cloudflare](/waf/change-log/scheduled-changes/)
