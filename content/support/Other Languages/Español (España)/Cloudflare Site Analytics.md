---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360037684251-Cloudflare-Site-Analytics
title: Cloudflare Site Analytics
---

# Cloudflare Site Analytics



## Información general

La aplicación (Site) **Analytics** del panel de control de Cloudflare es un componente importante de la línea general de productos de Cloudflare Analytics. En concreto, esta aplicación te da acceso a una amplia variedad de métricas, recabadas a nivel de sitio web o de dominio.

{{<Aside type="note">}}
Consulta [Cloudflare Analytics: vista
rápida](https://support.cloudflare.com/hc/articles/360037684111 "Cloudflare Analytics: vista rápida")
que incluye información general sobre toda la oferta de análisis de
Cloudflare. También podrás conocer las características de los datos que
capturamos y procesamos.
{{</Aside>}}

___

## Acceder a los análisis de tu sitio web

Para ver las métricas de tu sitio web:

1.  Inicia sesión en el panel de control de Cloudflare.
2.  Haz clic en la **cuenta** de Cloudflare asociada a tu sitio y, a continuación, elige el **dominio**.
3.  A continuación, haz clic en el icono de la aplicación **Analytics**.

Una vez que esté cargada, la aplicación Analytics muestra un conjunto de pestañas: **Tráfico**, **Seguridad**, **Rendimiento**, **DNS**, **Workers** y **Registros** (solo dominios Enterprise). Para conocer las distintas métricas disponibles, consulta _Revisar las métricas de tu sitio web_ (véase más abajo).

![Interfaz de usuario de la aplicación Analytics en el panel de control de Cloudflare que muestra los datos de tráfico web](/images/support/hc-dash-analytics-dashboard_overview.png)

Si eres cliente de los planes Pro, Business o Enterprise puedes ver los últimos análisis web en la pestaña Tráfico.

![Captura de pantalla de la interfaz de usuario del panel de Cloudflare Analytics para clientes Pro, Business y Enterprise.](/images/support/hc-dash-analytics-web_traffic.png)

___

## Revisar las métricas de tu sitio web

Esta sección describe las métricas disponibles en cada pestaña de la aplicación Analytics. Antes de continuar, ten en cuenta que cada pestaña puede incluir:

-   Uno o más paneles que clasifican más detalladamente las métricas subyacentes.
-   Un menú desplegable (en la parte superior derecha del panel) para filtrar las métricas de un periodo de tiempo concreto. El periodo de tiempo que puedes seleccionar puede variar según el plan de Cloudflare con el que esté asociado tu dominio.

A continuación se muestra un resumen de cada pestaña de la aplicación Analytics.

### Tráfico

#### Plan gratuito

Estas métricas incluyen las peticiones legítimas de los usuarios, así como los rastreadores y las amenazas. La pestaña Tráfico muestra los siguientes paneles: 

-   **Tráfico web**: muestra las métricas de _Solicitudes_, _Ancho de banda_, _Visitantes únicos_ y [_Códigos de estado_](https://support.cloudflare.com/hc/articles/206973867-Status-code-metrics-in-Cloudflare-Site-Analytics). Ten en cuenta que si utilizas Cloudflare Workers, los análisis de las subpeticiones se encuentran en la pestaña **Workers**.
-   **Solicitudes de tráfico web por país**: es un mapa interactivo que desglosa el número de solicitudes por país. Este panel también incluye una tabla de datos para **principales países/regiones de tráfico** que muestra los países con mayor número de solicitudes (hasta cinco, si los datos existen).
-   **Comparte tus estadísticas:** te permite compartir estadísticas reales del sitio en las redes sociales (Twitter) relativos a: _bytes guardados,_ _solicitudes SSL atendidas_ y _ataques bloqueados_.

#### Planes Pro, Business o Enterprise

{{<Aside type="note">}}
Los planes Pro, Business y Enterprise incluyen la nueva herramienta de
Análisis de tráfico web que priorizan la privacidad.
{{</Aside>}}

Los análisis se basan en los registros perimetrales de Cloudflare, sin necesidad de scripts ni rastreadores de terceros. La pestaña Tráfico presenta las siguientes métricas:

-   **Visitas**: una visita se define como una vista de página que procede de un sitio web diferente o un enlace directo. Cloudflare comprueba si el referente HTTP no coincide con el nombre del servidor. Una visita puede consistir en varias vistas de página. 
-   **Vistas de página**: una vista de página se define como una respuesta HTTP exitosa con un tipo de contenido HTML. 
-   **Solicitudes**: una solicitud HTTP. Una vista de página típica requiere muchas solicitudes.
-   **Transferencia de datos**: total de datos HTTP transferidos en las solicitudes.

Para ver métricas más detalladas, haz clic en **Añadir filtro**. También puedes filtrar cada métrica por **referente**, **servidor**, **país**, **ruta**, **código de estado**, **código de estado de origen**, **navegador**, **sistema operativo** o **tipo de dispositivo**. 

Para cambiar el periodo de tiempo, usa el menú desplegable que aparece en el lado derecho sobre el gráfico. También puedes arrastrar para hacer zoom en el gráfico.

{{<Aside type="note">}}
Para desactivar la nueva herramienta de Análisis de tráfico web, haz
clic en **Cambiar el interruptor para volver a la experiencia anterior**
en el lado izquierdo de la página.
{{</Aside>}}

### Seguridad

Para esta pestaña, el número y el tipo de gráficos pueden variar según los datos existentes y el plan del cliente. La mayoría de las métricas de esta pestaña provienen de la aplicación Firewall de Cloudflare. Los paneles disponibles incluyen:

-   **Amenazas**: muestra un resumen de datos y un gráfico de áreas que incluye las amenazas contra el sitio.
-   **Amenazas por país**: es un mapa interactivo que destaca los países donde se originaron las amenazas. También incluye tablas de datos con estadísticas sobre **principales países/regiones de amenaza** y **rastreadores/bots principales**.
-   **Limitación de velocidad** (servicio adicional): presenta un gráfico de líneas que destaca las solicitudes coincidentes y bloqueadas, en función de los límites de velocidad.  Para obtener más información, consulta [Análisis de la limitación de velocidad](https://support.cloudflare.com/hc/es-es/articles/115003414428-Rate-Limiting-Analytics).
-   **Información general**: muestra un conjunto de gráficos circulares que incluye:**total de amenazas detenidas**, **tráfico servido sobre SSL** y **tipos de amenazas mitigadas**. Si está disponible, el enlace desplegable **Detalles** muestra una tabla con datos numéricos.

### Rendimiento

Las métricas agregadas en esta pestaña abarcan varios servicios de Cloudflare. Los paneles disponibles son:

-   **Rendimiento de origen (Argo)** (servicio adicional): muestra las métricas relacionadas con el tiempo de respuesta entre la red perimetral de Cloudflare y los servidores de origen durante las últimas 48 horas. Para obtener más información, consulta [Análisis de Argo](https://support.cloudflare.com/hc/articles/115001255631-Argo-Analytics).
-   **Información general**: muestra un conjunto de gráficos circulares que incluyen datos relacionados con:**versión HTTP del cliente utilizada**, **ancho de banda guardado** y **desglose por tipo de contenido**. Si está disponible, el enlace desplegable **Detalles** muestra una tabla con datos numéricos.

### DNS

La pestaña DNS presenta varias estadísticas para las consultas DNS. Ten en cuenta que las métricas están disponibles siempre y cuando Cloudflare sea el servidor DNS autoritativo del sitio, incluso si este no está redireccionado mediante proxy a través de Cloudflare. Por lo tanto, las métricas DNS no se ofrecen para los sitios con una [configuración de CNAME](https://support.cloudflare.com/hc/articles/360020348832-Understanding-a-CNAME-Setup).

Los paneles de métricas disponibles en la pestaña DNS incluyen:

-   **Consultas DNS**: muestra varios gráficos de área y tablas de datos para las métricas de registro DNS, incluidas las consultas por _código de respuesta_, _tipo de registro_, así como los registros que devuelven una respuesta _NXDOMAIN_ (el registro DNS no existe). Puedes filtrar por uno o varios registros DNS introduciendo nombres de registro (por ejemplo, www.ejemplo.com) en el menú desplegable situado cerca de la parte superior.
-   **Consultas DNS por centro de datos**: te permite ver la distribución de consultas DNS en los centros de datos de Cloudflare. Las métricas aparecen como mapas interactivos y tablas de datos, e incluyen estadísticas para _Tráfico_, _NXDOMAIN_ y _NOERROR_.

### Workers

Este panel muestra las métricas de Cloudflare Workers. Para saber más, consulta [Análisis de Cloudflare con Workers](https://support.cloudflare.com/hc/articles/360007553512-Cloudflare-analytics-with-Workers).

### Registros

La pestaña Registros no es una función de métricas. En su lugar, los clientes del plan Enterprise pueden habilitar el servicio [Logpush de Cloudflare](/logs/about/). Puedes usar Logpush para descargar y analizar datos utilizando cualquier herramienta de análisis de tu elección.

___

## Recursos relacionados

-   [Cloudflare Analytics: vista rápida](/analytics)
-   [Cloudflare GraphQL Analytics API](/analytics/)
