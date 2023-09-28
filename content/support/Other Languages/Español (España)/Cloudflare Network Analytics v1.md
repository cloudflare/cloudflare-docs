---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360038696631-Cloudflare-Network-Analytics-v1
title: Cloudflare Network Analytics v1
---

# Cloudflare Network Analytics v1



## Información general

Para acceder a Network Analytics sigue los siguientes pasos:

-   Plan Enterprise de Cloudflare
-   [Magic Transit](/magic-transit/) o [Spectrum](/spectrum/) de Cloudflare

La vista de **Network Analytics** de Cloudflare proporciona visibilidad casi en tiempo real de los patrones de tráfico de las capas de red y de transporte, así como de los ataques DDoS. Network Analytics visualiza datos a nivel de paquete y de bits. Son los mismos datos disponibles a través de la [API de GraphQL Analytics](/analytics/graphql-api/).

{{<Aside type="note">}}
-   Si necesitas información sobre el nuevo panel de control de Network
    Analytics v2 (NAv2), disponible en versión beta, consulta
    [Cloudflare Network
    Analytics](/analytics/network-analytics/)
    en la documentación para desarrolladores.
-   También hay una nueva versión de la API GraphQL de Network
    Analytics. Si todavía estás utilizando NAv1, deberías migrar a NAv2.
    Para ello, consulta la [guía de
    migración](/analytics/graphql-api/migration-guides/network-analytics-v2/).
{{</Aside>}}

![Panel de Analytics que muestra el resumen de paquetes por tipo](/images/support/na-main-dashboard.png)

La herramienta Network Analytics acelera la elaboración de informes y la investigación del tráfico malicioso. Puedes filtrar los datos por los siguientes parámetros:

-   Mitigación realizada por Cloudflare
-   IP, puerto y ASN de origen
-   IP y puerto de destino
-   La ciudad y el país del centro de datos de Cloudflare donde se observó el tráfico
-   Tamaño, tipo, tasa y duración del ataque
-   Marca de TCP 
-   Versión de IP
-   Protocolo

Utiliza Network Analytics para identificar rápidamente la información clave:

-   Principales vectores de ataque dirigidos a la red. 
-   Mitigación del tráfico a lo largo del tiempo, desglosado por acción. 
-   Origen de los ataques, por país o centro de datos.

___

## Acceder a Network Analytics

Puedes acceder a la vista de **Network Analytics** desde la página de inicio de tu cuenta de Cloudflare.

Para acceder a la vista de **Network Analytics**, sigue estos pasos:

1.  Inicia sesión en tu cuenta de Cloudflare.
2.  Si tienes acceso a varias cuentas, selecciona una cuenta que tenga acceso a Magic Transit o Spectrum.
3.  En la página de **Inicio** de la cuenta, haz clic en **Network Analytics**.

{{<Aside type="note">}}
Las direcciones IP de origen se almacenan durante 30 días. Los periodos
de informe de más de 30 días no incluyen datos de las direcciones IP de
origen.
{{</Aside>}}

___

## Explorar Network Analytics

### Resumen del encabezado y paneles laterales

El encabezado y los paneles laterales ofrecen un resumen de la actividad durante el periodo seleccionado en la lista desplegable **periodo**.

![Título y panel lateral que resume la actividad de las últimas 24 horas](/images/support/na-navigate.png)

El encabezado proporciona el total de paquetes o bits y el número de ataques detectados y mitigados. Cuando está ocurriendo un ataque, el encabezado muestra la tasa máxima de paquetes (o bits), pero no el recuento total.

Para cambiar la vista de los datos, pulsa en los paneles laterales de **Paquetes** o **Bits**.

### Establecer el periodo de visualización

Utiliza la lista desplegable **Periodo** para cambiar el intervalo de tiempo en el cual Network Analytics muestra los datos. Cuando seleccionas un periodo de tiempo, se actualiza la vista completa para reflejar tu elección.

Cuando se selecciona _Últimos 30 minutos_, la vista **Network Analytics** muestra los datos de los últimos 30 minutos, actualizándose cada 20 segundos. Aparece una notificación _Live_ junto a la lista desplegable de estadísticas para informarte de que la vista se sigue actualizando automáticamente:

![Actualización automática habilitada en Network Analytics](/images/support/hc-dash-Network_Analytics-auto_refresh.png)

Si seleccionas la opción _Rango personalizado_ , puede especificar un rango de tiempo de hasta 30 días a lo largo de cualquier periodo de los últimos 365 días.

### Visualización por tasa media o por volumen total 

Elige una estadística de la lista desplegable para alternar entre los gráficos de _Promedio_ y _Recuento total_. 

### Mostrar anuncios de prefijos de IP/eventos de retirada

Activa la opción **Mostrar anotaciones** para mostrar u ocultar las anotaciones de los eventos de prefijos IP anunciados/retirados en la vista **Network Analytics** . Haga clic en cada anotación para obtener más detalles.

![Botón de alternancia para mostrar las anotaciones en el gráfico de Network Analytics](/images/support/hc-dash-Network_Analytics-show_annotations.png)

### Resumen de los detalles de los paquetes 

Haz clic y arrastra el ratón sobre una región del gráfico para ampliarlo. Con esta técnica, puedes acercarte a un rango de tiempo de tan solo 3 minutos.

![Ampliación de los detalles de los paquetes ](/images/support/unnamed.gif)

Para hacer zoom, pulsa el icono **X** del selector de **intervalo de tiempo**.

___

## Aplicar filtros a los datos

Puedes aplicar múltiples filtros y exclusiones para ajustar el alcance de los datos mostrados en Network Analytics.

Los filtros afectan a todos los datos que se muestran en la página de Network Analytics.

Hay dos formas de filtrar los datos de Network Analytics: utilizar el botón **Añadir filtro** o hacer clic en uno de los **filtros de estadísticas**.

### Usar el botón Añadir filtro

Haz clic en el botón **Añadir filtro** para abrir la ventana emergente **Nuevo filtro**. Especifica un campo, un operador y un valor para completar la expresión de filtro. Pulsa **Aplicar** para actualizar la vista.

Al aplicar los filtros, ten en cuenta lo siguiente:

-   Los caracteres comodín no son compatibles.
-   No necesitas entrecomillar valores.
-   Cuando especifiques un número de aviso de envío por adelantado (ASN), no incluyas el prefijo _AS_. Por ejemplo, introduce _1423_ en lugar de _AS1423_.

### Utilizar un filtro de estadísticas

Para filtrar en función del tipo de datos asociados con una de las estadísticas de Network Analytics, utiliza los botones **Filtrar** y **Excluir** que se muestran al desplazar el puntero sobre la estadística. 

En este ejemplo, al hacer clic en el botón **Filtrar** se reduce el alcance de la vista a solo el tráfico asociado con la acción _Permitir_.

### Crear una regla de firewall mágico a partir de los filtros aplicados

{{<Aside type="note">}}
Esta función sólo está disponible para los usuarios de Magic Transit.
{{</Aside>}}

Puedes crear una regla [Magic Firewall](/magic-firewall) que bloquee todo el tráfico que coincida con los filtros seleccionados en Network Analytics. Los filtros admitidos actualmente son:

-   IP de destino
-   Protocolo
-   Centro de datos de origen
-   IP de origen
-   Marca de TCP

Otros tipos de filtros de Network Analytics no se añadirán a la nueva definición de reglas. Sin embargo, puedes configurar aún más la regla en Magic Firewall.

Haz lo siguiente:

1\. Aplica uno o más filtros en Network Analytics.

2\. Haz clic en **Crear regla de firewall mágico**. 

![Creación de un enlace de regla de cortafuegos en Network Analytics](/images/support/hc-dash-Network_Analytics-create_firewall_rule.png)

Aparecerá el editor de reglas de firewall mágico con los filtros y valores seleccionados.

3\. Revisa la definición de regla en el editor de reglas de firewall mágico.

Haz clic en **Añadir**.

### Campos, operadores y valores compatibles 


La siguiente tabla muestra los campos, los operadores y los valores que puedes utilizar para filtrar Network Analytics.

| Campo                     | Operadores                                                                                  | Valor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Acción                    | Equivale<br>No equivale                                                                     | \- Permitir: se permite el tráfico a través de los sistemas automatizados de protección DDoS de Cloudflare. También puede incluir el tráfico mitigado por las reglas de firewall, flowtrackd y reglas de capa 7.<br>\- Bloquear: el tráfico es bloqueado por los sistemas automatizados de protección DDoS de Cloudflare.<br>\- Seguimiento de conexión: se aplica exclusivamente a la capa 7, ya que Magic Transit está excluido del ámbito de aplicación y nunca se ejecuta el seguimiento de conexión para los prefijos de Magic Transit.<br>\- Limitación de velocidad: se puede aplicar por IP de origen, subred o cualquier conexión. La decisión se toma mediante programación basándose en la tecnología heurística.<br>\- Supervisión: ataques que han sido identificados, pero que solo se ha optado por observar y no mitigar con reglas. |
| Id. de ataque             | Equivale<br>No equivale                                                                     | Número de ataque                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Tipo de ataque            | Equivale<br>No equivale                                                                     | Ataque de inundación UDP<br>Ataque de inundación SYN<br>Ataque de inundación ACK<br>Ataque de inundación RST<br>Ataque de inundación LDAP<br>Ataque de inundación marca de TCP<br>Ataque de inundación FIN<br>Ataque de inundación GRE<br>Ataque de inundación ICMP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| IP de destino             | Equivale<br>No equivale                                                                     | Dirección IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Puerto de destino         | Equivale<br>No equivale<br>Mayor que<br>Mayor o igual que<br>Menor que<br>Menor o igual que | Número de puerto<br>Intervalo de puertos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Rango de IP de destino    | Equivale<br>No equivale                                                                     | Rango y máscara de IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Versión de IP             | Equivale<br>No equivale                                                                     | 4 o 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Protocolo                 | Equivale<br>No equivale                                                                     | TCP<br>UDP<br>ICMP<br>GRE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ASN de origen             | Equivale<br>No equivale                                                                     | Número de AS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| País de origen            | Equivale<br>No equivale                                                                     | Nombre de país                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Centro de datos de origen | Equivale<br>No equivale                                                                     | Ubicación del centro de datos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| IP de origen              | Equivale<br>No equivale                                                                     | Dirección IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Puerto de origen          | Equivale<br>No equivale<br>Mayor que<br>Mayor o igual que<br>Menor que<br>Menor o igual que | Número de puerto<br>Intervalo de puertos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Marca de TCP              | Equivale<br>No equivale<br>Incluye                                                          | SYN, SYN-ACK, FIN, ACK, RST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

___

## Seleccionar una dimensión para trazar

Puedes trazar los datos de Network Analytics a lo largo de una variedad de dimensiones. Por defecto, Network Analytics muestra los datos desglosados por acción.

Selecciona una de las pestañas de **Resumen** para ver los datos con una dimensión diferente.

![Visualización de datos en distintas dimensiones](/images/support/unnamed__1_.gif)

Puedes elegir entre estas opciones:

-   Acción
-   Tipo de ataque
-   IP de destino
-   Puerto de destino
-   Versión de IP
-   Protocolo
-   ASN de origen
-   País de origen
-   Centro de datos de origen
-   IP de origen
-   Puerto de origen
-   Marca de TCP

{{<Aside type="note">}}
Los datos para el ASN (aviso de envío por adelantado) de origen, IP de
origen, puerto de origen y marca de TCP solo están disponibles durante
las últimas 24 horas.
{{</Aside>}}

### Compartir los filtros de Network Analytics 

Cuando añades filtros y especificas un intervalo de tiempo en Network Analytics, la URL del panel de Cloudflare cambia para reflejar los parámetros.

Para compartir tu vista de datos, copia la URL y envíala a otros usuarios para que puedan trabajar con la misma vista.

![Selección de la URL de la página de Network Analytics](/images/support/hc-dashboard-network-analytics-6.png)

___

## Ver el registro de actividad

El **registro de actividad** de Network Analytics muestra hasta 500 eventos del registro en el intervalo de tiempo seleccionado actualmente, con 10 resultados por página por vista de intervalo de tiempo. (La [API de GraphQL Analytics](/analytics/graphql-api/) no tiene esta limitación). 

Para mostrar los detalles del evento, haz clic en el widget de expansión asociado a los eventos.

### Configurar columnas

Para configurar qué columnas se muestran en el registro de actividad, haz clic en el botón **Editar columnas**. 

Esta opción es especialmente interesante cuando quieres identificar un ataque DDoS, durante el cual puedes especificar los atributos que desees, como las direcciones IP, la tasa de bits máxima y el Id. del ataque, entre otros.

### Ver elementos principales

Los paneles **País de origen**, **Origen** y **Destino** muestran los elementos principales de cada vista.

Para seleccionar el número de elementos que se van a mostrar, utiliza la lista desplegable asociada con la vista.

Para ver los principales centros de datos, selecciona _Centro de datos_ en la lista desplegable de la vista **País de origen**. La vista **Centro de datos** de origen reemplaza a la vista **País de origen**.

___

## Exportar datos de registro e informes

### Exportar los datos del registro de actividades 

Puedes exportar simultáneamente hasta 500 eventos sin procesar del registro de actividad. Esta opción es útil cuando se necesita combinar y analizar los datos de Cloudflare con los datos almacenados en un sistema o base de datos independiente, como un sistema de gestión de eventos e información de seguridad (SIEM).

Para exportar los datos de registro, haz clic en **Exportar**.

Elige el formato CSV o JSON para representar los datos exportados. El nombre del archivo descargado reflejará el intervalo de tiempo seleccionado, utilizando este patrón:

_network-analytics-attacks-\[start time\]-\[end time\].json_

### Exportar un informe de Network Analytics 

Para imprimir o descargar un informe desde **Network Analytics**, sigue estos pasos:

Haz clic en **Imprimir informe**. La interfaz de impresión de tu navegador web muestra opciones para imprimir o guardar como PDF.

___

## Limitaciones

Actualmente, Network Analytics tiene las siguientes limitaciones:

-   Network Analytics v1 proporciona información sobre ataques de [denegación de servicio daemon (dosd)](https://blog.cloudflare.com/who-ddosd-austin/). Si bien ofrece una vista actualizada de los datos, la visualización de todos los eventos no es completa. 
-   Los siguientes orígenes de datos no están disponibles en Network Analytics v1:
    -   Reglas de firewall _(disponible en Network Analytics v2)_.
    -   Reglas de la capa de aplicación.
    -   Gatekeeper y reglas aplicadas manualmente.
    -   [Flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/) (Protección TCP avanzada) _(disponible en Network Analytics v2)_.
    -   Tráfico Warp y [tráfico con nube naranja](https://support.cloudflare.com/hc/es-es/articles/205177068).
-   Los datos de los servicios de Cloudflare que representan el tráfico proxy, como la CDN, no están disponibles en Network Analytics.

___

## Recursos relacionados

-   [Cloudflare Network Analytics v2](/analytics/network-analytics/)
-   [Migración de Network Analytics v1 a Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [Cloudflare GraphQL API](/analytics/graphql-api/)
-   [Cloudflare Analytics: vista rápida](https://support.cloudflare.com/hc/articles/360037684111)
-   [Números de puertos y nombres de servicio de la IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## Preguntas frecuentes

### ¿Cuánto tiempo conserva Cloudflare los datos en el portal de Network Analytics?

Si utilizas Network Analytics v2 (NAv2), puedes consultar datos con una antigüedad de **90 días**.

Network Analytics utiliza nodos GraphQL para incluir datos en flujos de IP de 1 minuto, 1 hora y 1 día. Por ejemplo, el nodo ipFlows1mGroups almacena datos con un intervalo de agregación de minutos.

Para identificar el intervalo de datos históricos que puedes consultar, mira esta tabla. Usa la columna _**notOlderThan**_ como indicador del tiempo de retención.

| 
Nodo de datos GraphQL

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

selección de intervalo de tiempo en Network Analytics

 | 

Número de puntos de datos

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroups

 | 

25 horas

 | 

30 días

 | 

30 minutos

 | 

30

 |
| 

6 horas

 | 

71

 |
| 

12 horas

 | 

48

 |
| 

24 horas

 | 

96

 |
| 

ipFlows1dGroups

 | 

6 meses

 | 

1 año

 | 

1 semana

 | 

168

 |
| 

1 mes

 | 

30

 |

_**\*maxDuration**_ _delimita la franja horaria que puede solicitarse en una consulta (varía según el nodo de datos)._

_**\*\*notOlderThan**_ _limita cuánto puede retroceder en el tiempo la consulta en el registro. Es indicativo del tiempo que permanecen los datos en nuestra base de datos._ 

Cuando trabajes con los registros de ataques en el panel de control, ten en cuenta lo siguiente:

-   Los registros de los ataques se almacenan con marcas de tiempo de inicio y fin, estadísticas de paquetes y bits para la tasa de datos mínima, máxima y media, así como los totales, el tipo de ataque y la acción realizada. 
-   Las direcciones IP de origen se consideran información de identificación personal. Por lo tanto, Cloudflare solo los almacena durante 30 días. Después de este tiempo, las direcciones IP de origen se descartan y los registros se agrupan primero en grupos de 1 hora y luego en grupos de 1 día. Los resúmenes de 1 hora se almacenan 6 meses. Los resúmenes de 1 día se almacenan 1 año.

Para obtener más información sobre la consulta y el acceso a los datos de registros, consulta la página web [API GraphQL Analytics](/analytics/graphql-api/limits). 

### ¿Por qué Network Analytics indica que la dirección IP de destino no está disponible?

La dirección IP de destino se indica como _No disponible_ si no se incluyó en la firma en tiempo real generada por nuestros [sistemas de protección contra DDoS](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/). 

Para ver la dirección IP de destino, filtra por **Id. de ataque** y desplázate hasta la sección **Destino** en las listas de elementos principales. Cuando filtras por un Id. de ataque específico, todo el panel de control de Network Analytics se convierte en un informe de ataque.
