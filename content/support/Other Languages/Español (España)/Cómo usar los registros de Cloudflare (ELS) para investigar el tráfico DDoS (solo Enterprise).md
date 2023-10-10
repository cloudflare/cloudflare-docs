---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360020739772-C%C3%B3mo-usar-los-registros-de-Cloudflare-ELS-para-investigar-el-tr%C3%A1fico-DDoS-solo-Enterprise-
title: Cómo usar los registros de Cloudflare (ELS) para investigar el tráfico DDoS (solo Enterprise)
---

# Cómo usar los registros de Cloudflare (ELS) para investigar el tráfico DDoS (solo Enterprise)



## Descripción

Con los registros de Cloudflare (anteriormente ELS) tienes acceso a datos útiles para analizar el tráfico que puede mostrar patrones relacionados con un ataque DDoS. Para ejecutar este tipo de análisis, puedes organizar los datos de tus registros de Cloudflare. Para comenzar, sigue los pasos que se describen a continuación y revisa el flujo de trabajo del ejemplo que se muestra.

Antes de seguir estas instrucciones, necesitas lo siguiente:

-   [cat](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [API Logpull de registros de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

## Paso 1: Reunir la información que necesitas antes de consultar los registros de Cloudflare

Reunir la siguiente información:

1.  Dirección de correo electrónico del administrador de zona
2.  ID de zona (se encuentra bajo **Overview** (Descripción) > **Zone ID** (ID de zona))
3.  Clave de API del cliente
4.  Hora de inicio (formato de ejemplo: 1529171100)
5.  Hora de finalización (formato de ejemplo: 1529171100)

{{<Aside type="tip">}}
Para los fines de este tutorial, puedes usar el siguiente sitio web para
convertir los horarios a Tiempo Unix: <https://www.epochconverter.com/>
{{</Aside>}}

___

## Paso 2: Descargar y guardar los registros

Nota: El punto de conexión de Cloudflare tiene una franja horaria de 1 hora y el tamaño de los archivos de registro debe ser inferior a 1 GB por solicitud. Si el tamaño del archivo es mayor a 1 GB, la descarga se detendrá al alcanzar 1 GB, incluso si los eventos registrados desde la hora solicitada no están incluidos. Para evitar que se trunquen los registros, reduce el tiempo de 1 hora a 45 minutos, y así sucesivamente hasta que el tamaño del archivo sea inferior a 1 GB.

#### Opción 1:

**Descarga \*todos\* los campos desde los registros de Cloudflare, guarda en els.txt:**

Plantilla:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Ejemplo (con valores):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Opción 2:

**Descarga los campos \*específicos\* desde los registros de Cloudflare, guarda en els.txt:  
**

Este comando incluirá solo los siguientes campos en los registros que solicitaste: _CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, ClientASN_.

Consulta [aquí](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API) la lista completa de los campos de los registros de Cloudflare. 

Plantilla:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

Ejemplo (con valores):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## Paso 3: Organizar los registros

Organiza los registros por valor de campo e imprímelos en un archivo.Organiza por respuesta de HTTP 200, envía al archivo con el nombre de els-200.txt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

Organiza por respuesta de HTTP 525, envía al archivo con el nombre de els-525.txt


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:525,&quot; &gt; els-525.txt</span></div></span></span></span></code></pre>{{</raw>}}

**¿De dónde viene el** **valor de campo “:525,”** **?**

El patrón _:525,_ (dos puntos, código de estado, coma) es exclusivo del campo _EdgeResponseStatus_. La simple búsqueda del código de estado HTTP _525_ sin dos puntos y coma también incluiría entradas de registro que tienen el patrón _525_ en otros campos como _EdgeStartTimeStamp_, por ejemplo, que contiene muchos números y también puede contener la secuencia de números _525_.

![](/images/support/12.png)

Nota:los archivos de salida (els-200.txt y els-525.txt) no son legibles así como están. Para visualizarlos en un formato legible, usa jq en el siguiente comando:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

**Cuenta las** **solicitudes** **por** **campo** **e imprímelas en un** **archivo**

En este ejemplo, contamos las solicitudes por versión de protocolo SSL, que se indica por el campo _ClientSSLProtocol_ en los registros de Cloudflare (comprueba el punto antes del nombre del campo a continuación).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientSSLProtocol els-200.txt |sort -n |uniq -c |sort -n &gt; ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Resultado del ejemplo:**

![](/images/support/11.png)

Los campos _ClientRequestURI, ClientIP, ClientRequestUserAgent, ClientCountry_ y _ClientRequestHost_ son, por lo general, los más útiles para encontrar los patrones de los ataques en estos registros.

-   Organizar por _ClientRequestUserAgent_ te permite configurar las reglas para bloquear el agente usuario.
-   Organizar por _ClientCountry_ te permite configurar las reglas de firewall en función del país.
-   Organizar por _ClientRequestURI_ te permitirá configurar las reglas de rate limiting para las páginas con la mayor cantidad de solicitudes.

___

## Flujo de trabajo de ejemplo

Con frecuencia, necesitarás organizar por muchos campos para analizar e identificar el origen de un ataque. Por ejemplo, observa el siguiente flujo de trabajo:

**Acción 1**: Organiza tus registros descargados de Cloudflare por respuesta _HTTP 200_, envía a els-200.txt.

**Razón**: Ya no te interesan las respuestas que Cloudflare está bloqueando, es decir, solicitudes que generan una respuesta HTTP _503_ o _403_. Una solicitud que genera una respuesta _200 HTTP_ en tu red perimetral no está bloqueada por Cloudflare y es probable que vaya hasta el origen si el recurso no está en caché en la red perimetral de Cloudflare. Estas solicitudes, cuando son elementos maliciosos, estás diseñadas para sobrecargar el origen.

**Cómo proceder**:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt | grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
Acción 2**: Organiza tus registros "HTTP 200 only" por URI, envía a els-200-URI.txt.

**Razón**: de las 200 respuestas, tú quieres ver las páginas que más se están solicitando.

**Cómo proceder**:

Busca los URI que están más arriba:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientRequestURI els-200.txt |sort -n |uniq -c |sort -n &gt; els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}

Selecciona un URI de esta lista y envía las entradas de registro con ese URI a su propio archivo. Para hacerlo, reemplaza _/ClientRequestURI/path/to/something/_ en el comando que ves abajo con el URI que seleccionas:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200.txt| grep &quot;/ClientRequestURI/path/to/something/&quot; &gt; els-200-URI-1.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
Acción 3**: Cuenta las respuestas específicas de URI, "HTTP 200 only", por dirección IP, y envía a els-200-URI-1-Top-IP.txt

**Razón**: quieres ver las direcciones IP principales que están solicitando el URI y que generan una respuesta de 200.

**Cómo proceder**:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Envía los contenidos del archivo:**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

Puedes acotar las respuestas 200 HTTP tanto por URI de solicitud como por las IP que solicitan esos URI. También puedes organizar los registros a la inversa, acotar las entradas de registro por direcciones IP principales y luego ver qué URI solicita más la dirección IP.
