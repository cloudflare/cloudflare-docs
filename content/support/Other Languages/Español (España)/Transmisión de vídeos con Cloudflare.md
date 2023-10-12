---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360057976851-Transmisi%C3%B3n-de-v%C3%ADdeos-con-Cloudflare
title: Transmisión de vídeos con Cloudflare
---

# Transmisión de vídeos con Cloudflare



## Uso de los servicios de Cloudflare

Cloudflare se lanzó en 2010 con la convicción de que todo el mundo merece una presencia de web segura, rápida y fiable. Creíamos que no debías pagar más dinero para protegerte de un ciberataque, por lo que ofrecimos planes gratis y con tarifas planas para sitios web. Este mecanismo funcionaba porque la mayoría de los sitios web no consumían un ancho de banda importante y, por tanto, podíamos ofrecer nuestros servicios a todo el público de manera asequible. Desde el principio, prohibimos la transmisión de contenidos de vídeo utilizando nuestro ancho de banda. Si bien podías insertar un vídeo de otro proveedor, limitamos tu capacidad de usar nuestros servicios para ofrecer bits de vídeo desde nuestra red a tus visitantes. La razón es que cada segundo de un vídeo típico requiere tanto ancho de banda como la carga de una página web completa.

Con el tiempo, detectamos que algunos de nuestros clientes querían transmitir vídeos a través de nuestra red. Para satisfacer esta demanda, desarrollamos nuestro producto [Stream](https://www.cloudflare.com/products/cloudflare-stream/). Stream ofrece un excelente rendimiento a una tarifa asequible que se cobra en función de la carga que uses en nuestra red.

Lamentablemente, aunque la mayoría de las personas respetan estas limitaciones y entienden que su objetivo es garantizar una buena calidad de servicio para todos los clientes de Cloudflare, algunos usuarios intentan configurar mal nuestro servicio de transmisión de vídeo, infringiendo así nuestras Condiciones de servicio. Queremos asegurarnos de que nuestro servicio es ideal para todos, incluidas las iniciativas de servicio público que llevamos a cabo, tales como los proyectos [Galileo](https://www.cloudflare.com/galileo/), [Athenian](https://www.cloudflare.com/athenian/) y [Fair Shot](https://www.cloudflare.com/fair-shot/). Un grupo de personas que hacen un mal uso de nuestro servicio limita nuestra capacidad para llevar a cabo estas iniciativas.

A continuación te ofrecemos algunas recomendaciones para utilizar los servicios de Cloudflare en función de lo que te haya llevado a visitar esta página.

___

## Soy operador de un sitio web y mi contenido fue redireccionado debido a una violación de las Condiciones de servicio

Si estás suscrito a un plan gratuito, Pro o Business y transmites vídeos o una cantidad desproporcionada de contenido no HTML, como binarios de software o un gran volumen de imágenes, infringiendo así la [sección 2.8 del Acuerdo de suscripción de autoservicio](https://www.cloudflare.com/terms/), Cloudflare puede redirigir tu contenido a otros vídeos e imágenes. Cuando esto ocurra, recibirás una notificación por correo electrónico con información sobre el área que incumple las Condiciones de servicio. Por favor, no intentes evadir el redireccionamiento, ya que tu capacidad para usar Cloudflare puede verse limitada en el futuro.

## Opciones para que los administradores web eliminen el redireccionamiento 

-   **Entregar contenido redireccionado desde un subdominio de nube gris**
    -   La sección 2.8 del Acuerdo de suscripción de autoservicio de Cloudflare prohíbe que los usuarios ofrezcan una cantidad desproporcionada de contenido que no sea HTML, como imágenes y vídeos, sin un plan de pago que incluya esos servicios. Las restricciones establecidas en la sección 2.8 no se aplican a los contenidos entregados desde subdominios de nube gris (sin servidor proxy). 

-   **Entregar contenido redireccionado desde un servicio de pago como se indica a continuación**

## Transmite vídeos con Cloudflare utilizando productos de pago

Cloudflare permite la entrega de contenidos de vídeo con servicios específicos de pago. Si te interesa transmitir contenidos de vídeo, te recomendamos dos opciones. 

### Opción 1: Cloudflare Stream 

[Stream](https://www.cloudflare.com/products/cloudflare-stream/) es una plataforma de vídeo bajo demanda para diseñar aplicaciones de vídeo. Stream codifica, almacena y entrega vídeos optimizados con formato para diferentes dispositivos y conexiones de red. 

Para empezar a utilizar Stream, visita **Stream** desde tu panel de control o [regístrate](https://dash.cloudflare.com/sign-up/stream). Tus vídeos en la plataforma Stream no están vinculados a un dominio en tu cuenta de Cloudflare, y no necesitas un dominio en Cloudflare para usar Stream.

### Opción 2: Stream Delivery (solo plan Enterprise)

[Stream Delivery](https://www.cloudflare.com/products/stream-delivery/) ofrece almacenamiento en caché y entrega de contenidos de vídeo a través de los centros de datos de Cloudflare en todo el mundo. Esta función de CDN solo está disponible en el plan Enterprise de Cloudflare. Ponte en contacto con el [departamento de ventas](https://www.cloudflare.com/products/stream-delivery/#) si quieres saber más.

___

## Soy visitante de esta web y el sitio al que intento acceder muestra un mensaje que hace referencia a las Condiciones de servicio de Cloudflare en lugar del contenido que esperaba

Esto puede ocurrir si el operador del sitio web está violando la [sección 2.8 del Acuerdo de suscripción de autoservicio](https://www.cloudflare.com/terms/) y no ha adquirido un producto de pago apropiado para ofrecer el contenido al que estás tratando de acceder.

Facilitamos al operador del sitio web información relacionada con la infracción y cómo puede utilizar adecuadamente los servicios de Cloudflare para entregar el contenido que estás solicitando. Lamentablemente, hasta que el operador del sitio web adopte medidas correctivas (como la compra de productos autorizados para ofrecer contenido de vídeo con la red de Cloudflare), no podemos eliminar estas restricciones.

¿Qué puedes hacer mientras tanto?

1.  Dile al operador del sitio web que respete las reglas que nos permiten ofrecer servicios de bajo coste desde el principio.
2.  Descubre más información sobre lo que hace Cloudflare para mejorar Internet, como los proyectos [Galileo](https://www.cloudflare.com/galileo/), [Athenian](https://www.cloudflare.com/athenian/) y [Fair Shot](https://www.cloudflare.com/fair-shot/).

Instala [1.1.1.1](https://1.1.1.1/) para que tu experiencia en Internet sea más privada y segura.

___

## Soy operador de un sitio web y me preocupa violar las Condiciones de servicio

Los clientes de los planes gratuitos, Pro y Business que transmitan vídeos o una cantidad desproporcionada de contenido no HTML pueden infringir la [sección 2.8 del Acuerdo de suscripción de autoservicio](https://www.cloudflare.com/terms/). Para transmitir vídeos o una gran cantidad de contenido no HTML, recomendamos utilizar una de las opciones de pago indicadas anteriormente. 

## Aprende sobre el contenido que ofreces

Si necesitas más información sobre el contenido que está entregando tu zona (por ejemplo, tipo de contenido), puedes utilizar las siguientes herramientas: 

-   Usuarios de Cache Analytics: abre la pestaña **Caching** en el panel de control para filtrar por tipo de contenido e identificar el tipo de tráfico que estás transmitiendo. 
-   Usuarios sin Cache Analytics: abra la pestaña **Analytics** en el panel de control y selecciona la sección **Rendimiento** para obtener información sobre el contenido que estás entregando.

![Cache Analytics: identifica el tipo de tráfico que se está transmitiendo](/images/support/traffic-types.png)

## ¿Aún tienes dudas? Contacta con el soporte técnico

Si tienes más preguntas sobre el redireccionamiento (por ejemplo, si crees que tu contenido se ha redireccionado por error y tienes pruebas de ello), presenta una [solicitud de asistencia](https://dash.cloudflare.com/redirect?account=support) e incluye la siguiente información: 

-   Nombre de tu dominio
-   Descripción del problema
-   Descripción del contenido que estás entregando a través de la red de Cloudflare
