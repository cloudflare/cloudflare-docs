---
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200170196--C%C3%B3mo-responder-a-los-ataques-DDoS
title: Cómo responder a los ataques DDoS
---

# Cómo responder a los ataques DDoS



## Descripción

La red de Cloudflare mitiga automáticamente los [ataques DDoS](https://www.cloudflare.com/ddos) muy grandes. Guardar el contenido de la memoria caché en Cloudflare también protege tu sitio web contra los ataques DDoS pequeños, pero es posible que los activos no guardados en la memoria caché requieran otros pasos de intervención manual que se ofrecen en esta guía.

___

## Paso 1: Activar el **Modo Under Attack**

Para activar el **[Modo Under Attack](https://support.cloudflare.com/hc/articles/200170076)**:

1.  Inicia sesión en tu cuenta de Cloudflare.
2.  Selecciona el dominio que está siendo atacado.
3.  Cambia el **Under Attack Mode** (Modo Under Attack) a _On_ (Activar) en la sección **Quick Actions** (Acciones rápidas) de la aplicación de **Overview** (Descripción) de Cloudflare.
4.  \[Opcional\] Ajusta **[Challenge Passage](https://support.cloudflare.com/hc/articles/200170136)** (Duración del acceso autorizado) en la pestaña **Settings** (Configuraciones) de la aplicación del**Firewall**.

___

## Paso 2: Activar **Web Application Firewall** (WAF)

Activa el [WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-) de Cloudflare mediante el siguiente procedimiento:

1.  Inicia sesión en tu cuenta de Cloudflare.
2.  Selecciona el dominio que requiere protección adicional.
3.  Cambia **Web Application Firewall** a _On_ en la pestaña **Managed Rules**(Reglas administradas) de la aplicación del **Firewall**.

___

## Paso 3: Controlar o bloquear el tráfico a través de la aplicación del **Firewall**

La aplicación del **Firewall** de Cloudflare facilita el bloqueo del tráfico a través de los siguientes métodos:

**[Reglas de acceso de IP](https://support.cloudflare.com/hc/articles/217074967)** \- Se recomiendan para el bloqueo de múltiples direcciones IP, rangos de IP de 16 o 24, o números de sistema autónomo (ASN).   
**[Reglas de Firewall](https://developers.cloudflare.com/firewall/cf-dashboard/create-edit-delete-rules/)** \- Se recomiendan para el bloqueo de un país, cualquier rango de IP válido o patrones de ataques más complejos.  
**[Bloqueo de zona](https://support.cloudflare.com/hc/en-us/articles/115001595131-How-do-I-Lockdown-URLs-in-Cloudflare-)** \- Se recomienda para permitir solo direcciones IP o rangos de confianza a una parte de tu sitio.  
**[Bloqueo de agente-usuario:](https://support.cloudflare.com/hc/en-us/articles/115001856951-How-do-I-block-malicious-User-Agents-with-Cloudflare-)** se recomienda para el bloqueo de [encabezados de agentes-usuarios](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) sospechosos para todo tu dominio.

Para decidir qué país o IP bloquear o controlar, verifica tus archivos de registro. Contacta a tu proveedor de alojamiento para que te ayude a identificar lo siguiente:

-   el tráfico de ataque que llega a tu servidor web de origen;
-   los recursos a los que el ataque accede; y
-   características comunes del ataque (direcciones IP, agentes usuarios, países, ASN, etc.).

___

## Paso 4: Contactar a asistencia de Cloudflare

Si no puedes evitar que el ataque sobrecargue tu servidor web de origen con los pasos anteriores, [contacta a asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) para obtener ayuda.

___

## Recursos relacionados

-   [Cómo comprender la protección DDoS de Cloudflare](https://support.cloudflare.com/hc/articles/200172676)
-   [Prácticas recomendadas: Medidas preventivas de DDoS](https://support.cloudflare.com/hc/articles/200170166)
-   [¿Qué hace el modo “I’m Under Attack”?](https://support.cloudflare.com/entries/22053133)
-   [Cómo usar los registros de Cloudflare para investigar el tráfico DDoS (solo Enterprise)](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [Cómo denunciar un ataque DDoS para que la ley actúe](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
