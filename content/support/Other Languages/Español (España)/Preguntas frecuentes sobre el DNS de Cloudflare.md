---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360017421192-Preguntas-frecuentes-sobre-el-DNS-de-Cloudflare
title: Preguntas frecuentes sobre el DNS de Cloudflare
---

# Preguntas frecuentes sobre el DNS de Cloudflare



## ¿Dónde puedo obtener más información sobre el DNS?

Consulta las [guías de DNS de centro de aprendizaje de Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/).

___

## ¿Es Cloudflare un proveedor de DNS gratuito?

Sí. Cloudflare ofrece [servicios de DNS gratuitos](https://www.cloudflare.com/dns) a los clientes de todos los planes. Ten en cuenta lo siguiente:

1.  No es necesario cambiar el proveedor de alojamiento web para utilizar Cloudflare.
2.  No es necesario evitar el registrador. El único cambio que realizarás con el registrador será apuntar los servidores de nombres autoritativos a los servidores de nombres de Cloudflare.

Desde octubre de 2018, puedes transferir tu dominio a [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/).

___

## ¿Factura o limita Cloudflare las consultas DNS?

Cloudflare nunca limita las consultas DNS, pero el precio depende de tu nivel de plan.

Para los clientes de los planes gratuito, Pro o Business, Cloudflare no factura las consultas DNS.

Para los clientes Enterprise, Cloudflare utiliza el número de consultas DNS mensuales como propuesta para generar un presupuesto personalizado. No facturamos recargos.

___

## ¿Dónde cambio mis servidores de nombres para que apunten a Cloudflare?

Realiza el cambio en el registrador, que puede o no ser tu proveedor de alojamiento. Si no sabes quién es el registrador del dominio, puedes encontrarlo buscando en [WHOIS](http://www.whois.net/). Sigue las instrucciones que encontrarán en [cambiar los servidores de nombre a Cloudflare](/dns/zone-setups/full-setup/setup).

___

## ¿Limita Cloudflare el número de registros DNS que puede tener un dominio?

Sí. Actualmente los clientes de los planes gratuito, Pro y Business tienen un límite en el número de registros DNS que pueden crear.

Si eres un cliente Enterprise puedes ponerte en contacto con tu equipo de cuenta si necesitas más registros DNS.

___

## ¿Qué tipos de registro no redireccionamos mediante proxy?

Cloudflare no redirecciona mediante proxy los siguientes tipos de registro:

-   LOC
-   MX
-   NS
-   SPF
-   TXT
-   SRV
-   CAA

___

## ¿Puedo realizar un registro CNAME de un dominio que no está en Cloudflare en un dominio que sí lo está?

No. Si quieres hacer una redirección para un sitio que no está en Cloudflare, configura una redirección tradicional 301 o 302 en tu servidor web de origen.

Redirigir sitios que no son de Cloudflare a través de registros CNAME causaría un error de resolución de DNS. Dado que Cloudflare es un proxy inverso para el dominio que está en Cloudflare, el redireccionamiento CNAME para el dominio (que no está en Cloudflare) no sabría dónde enviar el tráfico.

___

## ¿Es Cloudflare compatible con las entradas de DNS comodín?

Cloudflare ahora admite el redirecconamiento mediante proxy del registro '\*' comodín para la gestión de DNS en todos los planes de clientes. Antes solo se ofrecía a los planes Enterprise.

___

## ¿Cuánto tiempo tarda en propagarse un cambio de DNS que he realizado?

Por defecto, cualquier cambio o incorporación que realices en el archivo de zona de Cloudflare se propagará en 5 minutos o menos. Ten en cuenta que la caché DNS local puede tardar más tiempo en actualizarse, por lo que la propagación generalizada puede tardar más de 5 minutos.

Esta configuración está controlada por el valor tiempo de vida (TTL) de un [registro DNS](/dns/manage-dns-records/how-to/create-dns-records). Los registros redireccionados mediate proxy se actualizan en 300 segundos (de manera automática), pero el TTL para los registros que no se redireccionan mediante proxy se puede personalizar.

___

## ¿Ofrece Cloudflare enmascaramiento de dominio?

Cloudflare no ofrece enmascaramiento de dominio ni servicios de redireccionamiento de DNS (pero tu proveedor de alojamiento puede hacerlo). Sin embargo, ofrecemos el reenvío de URL a través de [Bulk Redirects](/rules/url-forwarding/bulk-redirects/).

___

## ¿Por qué no puedo realizar consultas ANY a los servidores DNS de Cloudflare?

Las consultas ANY son especiales y muchas veces se malinterpretan. Por lo general, se usan para obtener todos los tipos de registro disponibles en un nombre DNS, pero lo que devuelven es cualquier tipo en la memoria caché de los solucionadores recursivos. Esto puede crear cierta confusión cuando se utilizan para depurar.

Debido a las numerosas funciones avanzadas del DNS de Cloudflare, como CNAME Flattening, puede resultar complejo e incluso imposible ofrecer respuestas correctas a las consultas ANY. Por ejemplo, cuando los registros DNS aparecen y desaparecen de manera constante o se almacenan de manera remota, puede ser difícil o incluso imposible obtener todos los resultados al mismo tiempo.

Pocas veces se utilizan las consultas ANY en producción, pero con frecuencia se usan en los ataques de reflexión de DNS y aprovechan la respuesta extensa que se obtiene de las consultas ANY.

En lugar de utilizar las consultas ANY para mostrar los registros, los clientes de Cloudflare pueden obtener una mejor perspectiva de sus registros DNS iniciando sesión y comprobando la configuración de su aplicación DNS.

En septiembre de 2015, se implementó la decisión de bloquear las consultas ANY para todos los clientes del DNS autoritativo, y no afecta a los clientes DNS virtuales.

Consulta la sección [Eliminación del tipo de metaconsulta ANY de DNS](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) en el blog de Cloudflare.

___

## ¿Por qué tengo que eliminar mi registro DS cuando me registre en Cloudflare?

Cloudflare es compatible con DNSSEC. Si un registro DS aparece en el registrador mientras utilizas Cloudflare, aparecerán errores de conectividad, como SERVFAIL, cuando utilices un solucionador de validación como Google y del tipo noError de los que no estén validados.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Este es un ejemplo de lo que sería un error:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤ dig dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; global options: +cmd</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; Got answer:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 5531</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;dnssec-failed.org. IN A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Gracias a la compatibilidad con DNSSEC, Cloudflare ofrece el registro DS que se debe cargar en el dominio primario cuando [habilites DNSSEC](https://support.cloudflare.com/hc/articles/360006660072) para tu dominio.

___

## ¿Qué sucede cuando elimino el registro DS?

Cuando eliminas tu registro DS, se inicia un proceso de invalidación que produce la anulación de la firma de los registros DNS de tu dominio. Esto desencadenará eventos que permitirán que se cambien tus servidores de nombres autoritativos. Si ya eres cliente, esto no afectará a su capacidad para utilizar Cloudflare. Los clientes nuevos tendrán que completar este paso antes de poder usar con éxito Cloudflare.

___

## ¿Es Cloudflare compatible con EDNS0 (mecanismos de extensión para DNS)?

Sí, el DNS de Cloudflare es compatible con EDNS0. EDNS0 está disponible para todos los clientes de Cloudflare. Es una pieza fundamental de las implementaciones de DNS modernas que brinda asistencia a la señalización si el solucionador DNS (proveedor de DNS recursivo) es compatible con mensajes de tamaño más grande y con DNSSEC.

EDNS0 es el primer conjunto aprobado de mecanismos  [para extensiones DNS](http://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS), publicado originalmente como [RFC 2671](https://datatracker.ietf.org/doc/html/rfc2671).

___

## ¿Qué debo hacer si cambio la dirección IP de mi servidor o el proveedor de alojamiento?

Después de cambiar los proveedores de alojamiento o las direcciones IP del servidor, actualiza las direcciones IP en tu aplicación **DNS** de Cloudflare. Tu nuevo proveedor de alojamiento te brindará las nuevas direcciones IP que debe utilizar tu DNS.  Para modificar el contenido del registro **DNS** en la aplicación DNS, haz clic en la dirección IP y escribe la nueva dirección IP.

___

## ¿Dónde puedo encontrar mis servidores de nombres de Cloudflare?

En la aplicación **DNS** de tu cuenta de Cloudflare, revisa los **servidores de nombres de Cloudflare**.

Se puede recuperar la dirección IP asociada a un servidor de nombres específico de Cloudflare mediante un comando dig o una herramienta de búsqueda de DNS de un proveedor externo en línea como [whatsmydns.net](https://www.whatsmydns.net/):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig kate.ns.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">kate.ns.cloudflare.com.    68675    IN    A    173.245.58.124.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## ¿Por qué veo registros A o AAAA de Cloudflare / direcciones IP para las respuestas DNS de mi dominio?

En cuanto a los registros DNS que se redireccionan a Cloudflare mediante proxy, se devuelven las direcciones IP de Cloudflare en consultas DNS en lugar de la dirección IP del servidor de origen. Esto permite que Cloudflare optimice, almacene en caché y proteja todas las solicitudes de tu sitio web.

___

## ¿Debe ser el icono de la nube situado junto a mi registro DNS naranja o gris?

De forma predeterminada, solo los registros A y CNAME que gestionan tráfico web (HTTP y HTTPs) se pueden redireccionar mediante proxy a Cloudflare. El resto de registros DNS se debe cambiar a una nube gris. Si necesitas más información, consulta nuestra [guía de Soporte](/dns/manage-dns-records/reference/proxied-dns-records).

___

## ¿Se pueden añadir subdominios directamente a Cloudflare?

Solo los clientes Enterprise pueden añadir subdominios directamente a Cloudflare vía [Soporte para subdominios](https://support.cloudflare.com/hc/articles/360026440252).

___

## Error de autenticación 403 al crear registros DNS con Terraform

**Descripción del problema**

`Error: no se ha podido crear el registro DNS: Estado HTTP 403: se devuelve el error de autenticación (10000)` al utilizar Terraform con la API de Cloudflare.

**Motivo**

El error es confuso, ya que al parecer está en la sintaxis del código del cliente, específicamente: zone\_id = data.cloudflare\_zones.example\_com.id

**Solución**

Comprobar el argumento `zone_id = data.cloudflare_zones.example_com.zones[0].id`. Se puede encontrar un caso de uso más detallado en [este](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913) hilo de GitHub.

___

## ¿Por qué veo cientos de registros DNS aleatorios después de añadir mi dominio?

Esto puede ocurrir cuando se ha configurado un registro comodín \* en tu anterior DNS autoritativo. Puedes eliminar estos registros de forma masiva utilizando la API: /api/operations/dns-records-for-a-zone-delete-dns-record. También puedes eliminar tu dominio desde el panel de control de Cloudflare, luego eliminar el registro comodín de tu DNS autoritativo, y después volver a añadir el dominio de nuevo.

___

## ¿Qué IP debo utilizar para la configuración de dominio registrado / solo redirección / sin origen?

En el caso de que se necesite una dirección de marcador de posición para las configuraciones "sin origen", utiliza la dirección reservada IPv6 **100::** o la dirección reservada IPv4 **192.0.2.0** en tu DNS de Cloudflare para crear la entrada en modo "redireccionado mediante proxy" para aprovechar Cloudflare Page Rules o Cloudflare Workers.
