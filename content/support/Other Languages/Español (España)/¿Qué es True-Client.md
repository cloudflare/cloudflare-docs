---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/206776727--Qu%C3%A9-es-True-Client-IP-
title: ¿Qué es True-Client-IP
---

# ¿Qué es True-Client-IP?

## ¿Qué es True-Client-IP?

¿Qué es True-Client-IP?  
Si se habilita True-Client-IP, Cloudflare añadirá un encabezado True-Client-IP a la solicitud enviada al origen con la dirección IP del usuario final.

Las conexiones desde Cloudflare hacia los servidores de origen provienen de las IP de Cloudflare. True-Client-IP es una solución que permite a los usuarios de Cloudflare ver la dirección IP del usuario final, incluso cuando el tráfico hacia el origen se envía directamente desde Cloudflare.

Esta función complementa nuestros encabezados CF-Connecting-IP y X-Forwarded-For.

¿Cómo puedo habilitar True-Client-IP?  
True-Client-IP se encuentra disponible en la aplicación Network del panel de Cloudflare.

![](/images/support/Screen_Shot_2015-06-30_at_3.55.04_PM.png)

¿Para quién está disponible True-Client-IP?  
True-Client-IP está disponible para todos los clientes con el plan Enterprise. Si desea contratar el plan Enterprise, [póngase en contacto con el equipo de ventas de Cloudflare](https://www.cloudflare.com/enterprise-service-request).
