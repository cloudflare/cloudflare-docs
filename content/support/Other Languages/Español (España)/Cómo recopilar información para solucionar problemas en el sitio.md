---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/203118044-C%C3%B3mo-recopilar-informaci%C3%B3n-para-solucionar-problemas-en-el-sitio
title: Cómo recopilar información para solucionar problemas en el sitio
---

# Cómo recopilar información para solucionar problemas en el sitio



## Descripción

Es importante recoger toda la información que sea posible para diagnosticar un problema y para [brindar los detalles adecuados a asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16). En este artículo se explica cómo obtener información para la solución de problemas que comúnmente solicita asistencia de Cloudflare.

{{<Aside type="note">}}
Asistencia de Cloudflare no puede hacer cambios de configuración en
nombre de los clientes por cuestiones de seguridad y responsabilidad.
{{</Aside>}}

___

## Generación de un archivo HAR

Un archivo HTTP (HAR) registra todas las solicitudes del navegador web, lo que incluye encabezados de solicitud y respuesta, contenido del cuerpo y tiempo de carga de página.

{{<Aside type="warning">}}
Un archivo HAR contiene detalles confidenciales como contraseñas,
información de pago y claves privadas. Retira manualmente la información
confidencial del archivo HAR mediante un editor de texto antes de
brindar información a asistencia de Cloudflare.
{{</Aside>}}

Por el momento, solo Chrome y Firefox tienen acceso a la función HAR de forma predeterminada. Otros navegadores requieren una extensión de navegador o no pueden generar un archivo HAR. Para instalar una extensión de navegador, sigue las instrucciones del proveedor de la extensión.

1\. Haz clic derecho en cualquier lugar de la página del navegador y selecciona **Inspeccionar elemento**.

2\. Las herramientas del desarrollador aparecen en la parte inferior o en el costado izquierdo del navegador. Haz clic en la pestaña **Network** (Red) ![gathering_har_file_network.png](/images/support/gathering_har_file_network.png)

3\. Marca **Preserve log** (Conservar registro)

4\. Haz clic en el registro

 ![gathering_har_file_record.png](/images/support/gathering_har_file_record.png)

5\. Navega a la URL que genera los problemas. Una vez que hayas experimentado el problema, haz clic con el botón derecho en cualquiera de los elementos de la pestaña **Network** (Red) y selecciona **Save all as HAR with Content** (Guardar todo como HAR con contenido).

 ![save_har_with_content.png](/images/support/save_har_with_content.png)

 6. Adjunta el archivo HAR a tu ticket de asistencia.

1\. Desde el menú de aplicación, selecciona **Herramientas** > **Desarrollador web** > **Red** o presiona _Ctrl+Shift+I_ (Windows/Linux) o _Cmd+Option+I_ (OS X).

2\. Navega a la URL que genera los problemas.

3\. Después de duplicar el problema, haz clic con el botón derecho y selecciona **Save All As HAR** (Guardar todo como HAR).

1\. Ve a **Herramientas de desarrollo** (utiliza _F12_ como acceso directo) y selecciona la pestaña **Red**.

2\. Navega a la URL que genera los problemas.

3\. Después de duplicar el problema, haz clic en **Export as HAR** (Exportar como HAR) y luego en **Save As...** (Guardar como...)

1\. En Safari, verifica que el menú **Desarrollo** aparezca en la parte superior de la ventana del navegador. En caso contrario, ve a **Safari** > **Preferencias** > **Avanzado** y selecciona **Mostrar menú Desarrollo en la barra de menús**.

2\. Ve a **Desarrollo** > **Mostrar inspector web**.

{{<Aside type="note">}}
El inspector web no está disponible hasta que navegues a una página que
no sea la página de inicio de Safari.
{{</Aside>}}

3\. Navega a la URL que genera los problemas.

4\. Presiona Ctrl y haz clic en un recurso en el Inspector web y haz clic en **Export HAR** (Exportar HAR).

___

## Identificar el centro de datos de Cloudflare que recibe tu solicitud

[En la página de estado de Cloudflare](https://www.cloudflare.com/network-map) hay [un mapa de nuestros centros de datos](https://www.cloudflarestatus.com/) clasificados por continente. El código de tres letras del nombre del centro de datos es el [código IATA](http://en.wikipedia.org/wiki/IATA_airport_code) del principal aeropuerto internacional más cercano. Para determinar el centro de datos de Cloudflare que recibe solicitudes para tu navegador, visita:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  http://www.example.com/cdn-cgi/trace </span></div></span></span></span></code></pre>{{</raw>}}

Sustituye _www.example.com_ por el dominio y nombre de host.  Observa el campo **colo** del resultado.

___

## Solicitudes de resolución de problemas con cURL

cURL es una herramienta de línea de comandos para enviar solicitudes HTTP/HTTPS y resulta útil para solucionar problemas:

-   Funcionamiento de HTTP/HTTPS
-   Respuestas de error HTTP
-   Encabezados HTTP
-   API
-   Comparación de respuestas de servidor/proxy
-   Certificados SSL

{{<Aside type="note">}}
El comando cURL no está instalado de forma predeterminada en Windows y
requiere un [asistente de instalación](http://curl.haxx.se/dlwiz/).
{{</Aside>}}

Ejecuta el siguiente comando para enviar una solicitud HTTP GET estándar a tu sitio web (reemplaza _www.example.com_ por tu dominio y nombre de host):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null http://www.example.com/</span></div></span></span></span></code></pre>{{</raw>}}

Este ejemplo de comando cURL arroja un resultado con detalles de la respuesta de HTTP y los encabezados de la solicitud pero desecha los resultados del cuerpo de la página. Los resultados de cURL confirman la respuesta de HTTP y si Cloudflare actualmente está redireccionando el tráfico mediante proxy para el sitio. La presencia del encabezado **CF-RAY**en la respuesta, confirma que la solicitud fue redireccionada mediante proxy a través de Cloudflare:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CF-Ray: 5097b5640cad8c56-LAX</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Revisa las [opciones de comando
cURL](https://curl.haxx.se/docs/manpage.html)para obtener una
funcionalidad adicional.
{{</Aside>}}

Amplía las secciones a continuación para obtener consejos sobre cómo solucionar errores de HTTP, de funcionamiento, de memoria caché y de certificados SSL/TLS:

Cuando tratas de solucionar errores de HTTP en respuestas desde Cloudflare, verifica si tu origen generó los errores al enviar solicitudes directamente a tu servidor web de origen. Para solucionar los errores de HTTP, ejecuta el comando cURL directamente a tu dirección IP del servidor web de origen (evitando el proxy de Cloudflare):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --header &quot;Host: example.com&quot; http://203.0.113.34/</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
Si tienes varios servidores web de origen, verifica cada uno para
asegurarte de que no haya diferencias en las respuestas. Si observas el
problema cuando te conectas directamente a tu servidor web de origen,
contacta a tu proveedor de alojamiento para obtener asistencia.
{{</Aside>}}

Por ejemplo, si observas un [error de HTTP 520](https://support.cloudflare.com/hc/articles/115003011431#520error) para el tráfico redireccionado mediante proxy a través de Cloudflare, ejecuta un comando cURL al servidor web de origen para determinar si se envían solicitudes vacías:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --resolve www.example.com:80:203.0.113.34 http://www.example.com/* Added www.example.com:80:203.0.113.34 to DNS cache* Hostname www.example.com was found in DNS cache* Trying 203.0.113.34...* Connected to www.example.com (127.0.0.1) port 80 (#0)&gt; GET / HTTP/1.1&gt; Host: www.example.com&gt; User-Agent: curl/7.43.0&gt; Accept: */*&gt;* Empty reply from server</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
Al probar HTTPS, usa la marca*\--insecure* para omitir la validación del
certificado SSL presentado por tu servidor web de origen, salvo que
tengas instalado un certificado de una Autoridad de certificación real.
{{</Aside>}}

El comando cURL mide la degradación del funcionamiento o la latencia para las solicitudes HTTP/HTTPS mediante las opciones de cURL-[_w_ o _\--write-out_](https://curl.haxx.se/docs/manpage.html#-w). El ejemplo del comando cURL a continuación mide varios vectores de funcionamiento en la transacción de solicitud, tales como la duración del protocolo de enlace TLS, la búsqueda de DNS, los redireccionamientos, las transferencias, etc.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://example.com/ -w &quot;\nContent Type: %{content_type} \\nHTTP Code: %{http_code} \\nHTTP Connect:%{http_connect} \\nNumber Connects: %{num_connects} \\nNumber Redirects: %{num_redirects} \\nRedirect URL: %{redirect_url} \\nSize Download: %{size_download} \\nSize Upload: %{size_upload} \\nSSL Verify: %{ssl_verify_result} \\nTime Handshake: %{time_appconnect} \\nTime Connect: %{time_connect} \\nName Lookup Time: %{time_namelookup} \\nTime Pretransfer: %{time_pretransfer} \\nTime Redirect: %{time_redirect} \\nTime Start Transfer: %{time_starttransfer} \\nTime Total: %{time_total} \\nEffective URL: %{url_effective}\n&quot; 2&gt;&amp;1</span></div></span></span></span></code></pre>{{</raw>}}

Puedes encontrar la [explicación de este resultado de sincronización](https://blog.cloudflare.com/a-question-of-timing/) en el blog de Cloudflare.

{{<Aside type="tip">}}
Como se demuestra en el ejemplo anterior, se logran resultados más
limpios al señalar una nueva línea con **\\n** antes de cada variable.
De lo contrario, todas las métricas se muestran juntas en una sola
línea.
{{</Aside>}}

El comando cURL revisa los encabezados de respuesta de HTTP que afectan la memoria caché. En particular, revisa varios encabezados HTTP cuando se resuelven problemas de memoria caché de Cloudflare:

-   CF-Cache-Status
-   Cache-control/Pragma
-   Expires
-   Last-Modified
-   S-Maxage

{{<Aside type="note">}}
Busca los detalles específicos del [comportamiento de la memoria caché
de Cloudflare](https://support.cloudflare.com/hc/articles/202775670) en
el Centro de ayuda de Cloudflare.
{{</Aside>}}

#### Revisión de certificados con cURL

El siguiente comando cURL muestra el certificado SSL provisto por Cloudflare durante una solicitud HTTPS (reemplaza _www.example.com_ por tu dominio y nombre de host):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://www.example.com/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
2*\>&1 \| egrep -v \"\^{.\*\$\|\^}.\*\$\|\^\\\* http.\*\$\" *limpia y
analiza el protocolo de enlace TLS y la información del certificado.
{{</Aside>}}

Revisa el certificado de origen (en el caso de que haya uno instalado) y reemplaza _203.0.113.34_por la actual dirección IP de tu servidor  web de origen y reemplaza _www.example.com_ por tu dominio y nombre de host:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --header &quot;Host: www.example.com&quot; http://203.0.113.34/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Prueba de versiones TLS

Si se solucionan los problemas de asistencia del navegador o se confirma qué versiones TLS se admiten, cURL te permite probar una versión TLS específica al agregar una de las siguientes opciones a tu cURL:

-   \--tlsv1.0
-   \--tlsv1.1
-   \--tlsv1.2
-   \--tlsv1.3

___

## Pausar temporariamente Cloudflare

Pausa Cloudflare para enviar tráfico directamente a tu servidor web de origen en lugar de hacerlo mediante direccionamiento de proxy inverso de Cloudflare. Ningún servicio de Cloudflare como SSL o WAF están activados para dominios en pausa.  Una alternativa a establecer una pausa de Cloudflare a nivel global es [marcar con una nube gris](https://support.cloudflare.com/hc/articles/200169626) los registros que reciben tráfico en tu aplicación **DNS** de Cloudflare.

{{<Aside type="tip">}}
Al solucionar problemas de la memoria caché, una alternativa a poner en
pausa a Cloudflare es el [Modo
desarrollo](https://support.cloudflare.com/hc/articles/200168246) que
solo omite la caché de Cloudflare.
{{</Aside>}}

Para pausar temporariamente Cloudflare:

1.  Ve a la pestaña **Overview** (Descripción) del panel de control de Cloudflare.
2.  Haz clic en**Pause Cloudflare on Site** (Pausar Cloudflare en el sitio) en la parte inferior derecha de la página debajo de **Advanced Actions** (Opciones avanzadas).

{{<Aside type="note">}}
Para pausar Cloudflare, se necesitan 5 minutos o menos, y es preferible
esto a cambiar tus servidores de nombres de Cloudflare, ya que el cambio
de los servidores de nombres puede ocasionar demoras de propagación de
varias horas.
{{</Aside>}}

___

## Ejecutar traceroute

Traceroute es una herramienta de diagnóstico que mide la latencia de la ruta de los paquetes en una red. La mayoría de los sistemas operativos admiten el comando _traceroute_. Si tienes problemas de conectividad con el sitio web con proxy de Clouflare y [solicitas ayuda a asistencia de Cloudflare,](https://support.cloudflare.com/hc/articles/200172476), recuerda brindar los resultados de traceroute.

{{<Aside type="tip">}}
Los tiempos de espera son posibles para los resultados ping, ya que
Cloudflare limita la solicitudes ping.
{{</Aside>}}

A continuación, consulta las instrucciones para ejecutar traceroute en distintos sistemas operativos. Sustituye _www.example.com_ por el dominio y nombre de host en los siguientes ejemplos.

1.  Abrir el menú **Inicio**.
2.  Hacer clic en **Ejecutar**.
3.  Para abrir la interfaz de línea de comandos, escribe **cmd** y, a continuación, haz clic en **Aceptar**.
4.  En la línea de comandos, escribe:  
    For IPv4 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
    For IPv6 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert -6 www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Presiona **Enter**.
6.  Puedes copiar los resultados para guardarlos en un archivo o pegarlos en otro programa.

1.  Abre una ventana de terminal.
2.  En la línea de comandos, escribe:  
    For IPv4 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
    For IPv6 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute -6 www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  Puedes copiar los resultados para guardarlos en un archivo o pegarlos en otro programa.

1.  Abre la aplicación **Network Utility**.
2.  Haz clic en la pestaña **Traceroute**.
3.  Escribe el _dominio_ o la _dirección IP_ en el campo de entrada correspondiente y presiona **Trace** (Rastrear).
4.  Puedes copiar los resultados para guardarlos en un archivo o pegarlos en otro programa.

Como alternativa, sigue las mismas instrucciones de traceroute para Linux de arriba cuando uses el programa terminal de Mac OS.

___

## Agregar el encabezado CF-RAY a tus registros

El encabezado **CF-RAY** rastrea una solicitud de sitio web a través de la red de Cloudflare. Proporciona el encabezado **CF-RAY** de una solicitud web a la asistencia de Clouflare cuando trates de resolver un problema. También puedes agregar el encabezado **CF-RAY** a tus registros mediante la edición de la configuración del servidor web de origen con el fragmento de abajo que corresponda a la marca de tu servidor web.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t \&quot;%r\&quot; %&gt;s %b \&quot;%{Referer}i\&quot; \&quot;%{User-agent}i\&quot; %{CF-Ray}i&quot; cf_custom</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">log_format cf_custom '$remote_addr - $remote_user [$time_local]  ''&quot;$request&quot; $status $body_bytes_sent ''&quot;$http_referer&quot; &quot;$http_user_agent&quot; ''$http_cf_ray';</span></div></span></span></span></code></pre>{{</raw>}}

___

## Recursos relacionados

-   [Cómo contactar a asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476)
-   [Cómo solucionar errores HTTP 5XX de Cloudflare](https://support.cloudflare.com/hc/articles/115003011431)
-   [Cómo diagnosticar problemas de red con MTR y traceroute](https://www.digitalocean.com/community/tutorials/how-to-use-traceroute-and-mtr-to-diagnose-network-issues)
-   [Herramienta de la línea de comando cURL](https://curl.haxx.se/)
