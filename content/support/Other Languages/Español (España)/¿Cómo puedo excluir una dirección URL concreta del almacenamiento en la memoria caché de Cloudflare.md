---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200172316--C%C3%B3mo-puedo-excluir-una-direcci%C3%B3n-URL-concreta-del-almacenamiento-en-la-memoria-cach%C3%A9-de-Cloudflare-
title: ¿Cómo puedo excluir una dirección URL concreta del almacenamiento en la memoria caché de Cloudflare
---

# ¿Cómo puedo excluir una dirección URL concreta del almacenamiento en la memoria caché de Cloudflare?

Puede excluir ciertas direcciones URL del almacenamiento en la memoria caché de Cloudflare mediante la aplicación **Page Rules** situada en el panel de Cloudflare.

El primer paso para usar **Page Rules** consiste en establecer un patrón que defina cuándo se activa la regla. Estos patrones pueden ser simples, como una sola dirección URL, o complicados, con varios comodines. Imagine que tiene un sistema de gestión de contenido con una sola dirección URL administrativa:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/admin.php</span></div></span></span></span></code></pre>{{</raw>}}

Si desea desactivar las opciones de optimizaci\[on y almacenamiento en la memoria caché de Cloudflare para esta dirección URL, debe desactivarlas con los menús o los menús desplegables para las diversas funciones de Cloudflare.

### Coincidencia de comodines y patrones avanzados

El patrón anterior solo coincidirá con la siguiente dirección URL:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/admin.php</span></div></span></span></span></code></pre>{{</raw>}}

No coincidirá con ninguna de las siguientes direcciones URL:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://www.ejemplo.com/admin.php  [http ≠ https]</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://ejemplo.com/admin.php  [falta subdominio www]</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/admin  [admin ≠ admin.php]</span></div></span></span></span></code></pre>{{</raw>}}

Puede flexibilizar las reglas si incluye comodines con el carácter \*. Por ejemplo, si desea que el patrón coincida con las cuatro direcciones URL anteriores, puede utilizar un patrón como el siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">*ejemplo.com/admin*</span></div></span></span></span></code></pre>{{</raw>}}

Un comodín puede representar cero o varios caracteres, y puede utilizarse en cualquier parte del patrón. Por lo tanto, el siguiente patrón:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/*b*/*</span></div></span></span></span></code></pre>{{</raw>}}

Coincidiría con:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/blog/   </span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/blog/index.php</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/b/admin/folder/index.php</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/miblog/</span></div></span></span></span></code></pre>{{</raw>}}

Pero no coincidiría con:   


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/blog  [falta la barra diagonal]   </span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/sam/index.php  [sam no contiene «b»]</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Las Page Rules se aplican por orden de aparición en la lista. Si desea
cambiar la posición de una Page Rule, puede moverla con el icono de la
parte izquierda.
{{</Aside>}}

Para acceder a un tutorial completo de Page Rule, [visite este artículo.](https://support.cloudflare.com/entries/22576178-Is-there-a-tutorial-for-PageRules-)
