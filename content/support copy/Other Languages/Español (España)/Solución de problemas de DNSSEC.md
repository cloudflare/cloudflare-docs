---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360021111972-Soluci%C3%B3n-de-problemas-de-DNSSEC
title: Solución de problemas de DNSSEC
---

# Solución de problemas de DNSSEC



## Prueba de DNSSEC con Dig

_Dig_ es una herramienta de línea de comando para consultar a un servidor de nombres por registros DNS. Por ejemplo, _dig_ puede solicitar un solucionador de DNS para la dirección IP de _www.cloudflare.com_ (la opción _+short_ elabora solo el resultado)_:_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short198.41.215.162198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

Usa _dig_ para verificar los registros DNSSEC.  En el ejemplo a continuación,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short198.41.214.162198.41.215.162A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span></span></span></code></pre>{{</raw>}}

 consulta por la clave pública del dominio raíz, no por la del subdominio: 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span></span></span></code></pre>{{</raw>}}

La respuesta DNS incluye dos registros:

-   El _registro DNSKEY_ **256** es la clave pública llamada clave de firma de zonas y se utiliza para verificar las firmas de registro DNS para _A, MX, CNAME, SRV_, etc.

{{<Aside type="note">}}
Los detalles sobre la verificación de las firmas con la clave pública no
se incluyen en el alcance de este artículo.
{{</Aside>}}

Cuando no se usa la opción _+short_ con _dig_, se autentica mediante DNSSEC una respuesta DNS si una marca **ad** aparece en el encabezado de respuesta:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com[...];; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1 [...] ;; SECCIÓN DE PREGUNTAS: ;www.cloudflare.com.        IN  A [...] ;; SECCIÓN DE RESPUESTAS: www.cloudflare.com. 15  IN  A   198.41.215.162 www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

___

## Vista de la cadena de confianza de DNSSEC con Dig

La verificación completa de firmas de dominio (por ejemplo: _cloudflare.com_) implica verificar la clave de firma de claves en el dominio de primer nivel (por ejemplo: _.com_).  Una verificación similar 

Cuando se habilita DNSSEC, se necesita un _registro DS_ en el DNS del registrar. El _registro DS_ contiene un hash de la clave pública de firma de claves y metadatos sobre la clave.

Usa _dig_ para encontrar un _registro DS_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

 _dig_ confirma si una respuesta se


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace[...]cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9[...]com.            172800  IN  NS  e.gtld-servers.net.[...];; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span></span></span></code></pre>{{</raw>}}

Una alternativa más sencilla a la ejecución manual de todos los pasos anteriores es usar la [herramienta en línea DNSViz](http://dnsviz.net/). Obtén más detalles sobre la [solución de problemas de validación de DNSSEC mediante el uso de DNSViz](https://support.cloudflare.com/hc/es-es/articles/360021111972-Soluci%C3%B3n-de-problemas-de-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz) o un ejemplo de [resultados DNSSEC de cloudflare.com a través de DNSViz](http://dnsviz.net/d/cloudflare.com/dnssec/).

___

## Solución de problemas de validación de DNSSEC con Dig

Si los proveedores de DNS autoritativo se cambian sin actualizar o quitar registros DNSSEC antiguos en el registrar, se producen problemas:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 10663</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short104.20.49.61104.20.48.61</span></div></span></span></span></code></pre>{{</raw>}}

En el ejemplo anterior, DNSSEC está mal configurado si se recibe una respuesta DNS apropiada al usar la opción _+cd_, pero las consultas que usan DNSSEC envían una respuesta _SERVFAIL__._ Este problema suele suceder cuando los servidores de nombres autoritativos se cambian pero los _registros DS_ no están actualizados.  Este problema también puede ocurrir si un atacante intenta falsificar la respuesta a una consulta. 

___

## Solución de problemas de validación de DNSSEC mediante el uso de DNSViz

1.  Visita [http://dnsviz.net/](http://dnsviz.net/)
2.  Escribe un nombre de dominio en el campo de texto.
3.  Si DNSViz nunca ha analizado el sitio, haz clic en el botón **Analizar**.
4.  Si DNSViz ya ha analizado el sitio,

![Screen_Shot_2018-09-18_at_10.31.54_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.31.54_AM.png)

![Screen_Shot_2018-10-16_at_2.png](/images/support/Screen_Shot_2018-10-16_at_2.png)

![Screen_Shot_2018-09-18_at_10.25.49_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.25.49_AM.png)

___

## Pasos siguientes 

Si se descubre un problema con la implementación de DNSSEC, ponte en contacto con el registrar de dominio y confirma que el _registro DS_ coincide con lo especificado por el proveedor de DNS autoritativo. Si Cloudflare es el proveedor de DNS autoritativo, sigue las instrucciones para la [configuración de DNSSEC con Cloudflare](https://support.cloudflare.com/hc/articles/360006660072).

___

## Recursos relacionados

-   [Cómo funciona DNSSEC](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) 
-   [Seguridad de DNS](https://www.cloudflare.com/learning/dns/dns-security/)
-   [Configuración de DNSSEC con Cloudflare](https://support.cloudflare.com/hc/articles/360006660072)
