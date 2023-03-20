---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360016450871-Facturaci%C3%B3n-para-Cloudflare-Stream
title: Facturación para Cloudflare Stream
---

# Facturación para Cloudflare Stream



## Precios de Cloudflare Stream

[Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091) es una plataforma de video a pedido que sirve para crear aplicaciones de video. El precio se basa en el uso y almacenamiento, como se describe a continuación.

Minutos de video entregados a los usuarios:

-   1,00 $ por 1000 minutos por mes

Minutos de video almacenados en Cloudflare Stream:

-   5,00 $ por 1000 minutos por mes
-   Facturado por adelantado

___

Cloudflare Stream se factura mensualmente. Dado que Stream se basa en el uso, se te facturarán los minutos de visualización y que se hayan almacenados durante el mes anterior. Por ejemplo, tu factura de septiembre incluirá cargos por el uso de Argo en agosto.

Los cargos facturados se redondean a los siguientes 1000 minutos. A continuación se presentan algunas estimaciones de precios con base en los minutos entregados y almacenados:

| **5 minutos** | **Redondear a** | **Cargos incurridos** |
| --- | --- | --- |
| 
1999 entregados a los usuarios

 | 

2000 minutos

 | 

2,00 $

 |
| 

3001 almacenados en Stream

 | 

4000 minutos

 | 

20,00 $

 |
| Cargo total por período | 

22,00 $

 |

Para usar Stream, tu cuenta de Cloudflare debe tener un método de pago válido en archivo. Cloudflare Stream dejará de publicar videos cuando detectemos un retraso en el pago. Si no reanudas tu pago, los videos de Stream que se han cargado se eliminarán después de 30 días.

___

## Minutos facturables de Cloudflare Stream

Los minutos facturables representan el tiempo dedicado a entregar videos de Cloudflare a tus visitantes.

Si un visitante del sitio carga un video y no lo ve, Cloudflare seguirá facturando por la entrega del video. Sin embargo, si el navegador del visitante almacena en caché el video a nivel local, Cloudflare no factura el tiempo que se dedique para verlo. En otras palabras, si el visitante ve el video varias veces, no cobraremos por las vistas posteriores.

Si usa el atributo de _precarga_ (descrito en la documentación de [API de Stream](https://developers.cloudflare.com/stream/video-playback/player-api/)) en el código de inserción, facturaremos el tiempo dedicado a precargar el video. Toma en cuenta que el comportamiento de precarga varía según el navegador. Algunos navegadores precargan unos segundos de video mientras que otros precargan todo el video. Aunque la precarga es útil para optimizar la disponibilidad de video, considera si es apropiado para tu caso de uso.

Puedes ver los minutos facturables de Cloudflare Stream en el panel de control de Cloudflare para calcular el cargo por los minutos entregados.

Para ver tus minutos de Stream vistos, 

1.  Inicia sesión en tu cuenta de Cloudflare.
2.  En el menú desplegable **Mi perfil**, selecciona **Facturación**. Verás una lista de dominios asociados a tu cuenta de Cloudflare.
3.  Elige el dominio que tiene habilitado Argo.
4.  En la navegación izquierda, haz clic en **Uso facturable**. Verás un gráfico que muestra tu tráfico diario actual.
5.  Elige **Mes anterior** en el menú desplegable sobre el gráfico y haz clic en **Mes hasta la fecha** para ver el uso de tu mes anterior. ![argo_billing_subcriptions_previous_month.png](/support/static/stream_billing_subcriptions_previous_month.png)

{{<Aside type="note">}}
En un futuro próximo, Cloudflare planea incluir almacenamiento total en
el panel de control de Cloudflare.
{{</Aside>}}

___

-   [Plataforma de video Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Documentación del desarrollador de Cloudflare Stream](https://developers.cloudflare.com/stream/getting-started/)
