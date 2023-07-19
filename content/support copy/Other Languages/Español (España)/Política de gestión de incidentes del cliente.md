---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/230054288-Pol%C3%ADtica-de-gesti%C3%B3n-de-incidentes-del-cliente
title: Política de gestión de incidentes del cliente
---

# Política de gestión de incidentes del cliente



## Propósito

Cloudflare cree que la apertura y la transparencia son intrínsecas a la prestación de nuestro servicio, y busca ganar la confianza de nuestros clientes y de la comunidad de Internet en general.  Cloudflare opera una red global que impacta las vidas y la prosperidad de cientos de millones de personas y, por lo tanto, somos extremadamente conscientes de esa responsabilidad.

Este procedimiento operativo estándar (SOP) define cómo Cloudflare trata todos los incidentes y problemas que afectan su entorno de producción y las formas en que Cloudflare comunica la naturaleza y el impacto de estos incidentes a los clientes del Enterprise Plan, tanto planificados como no planificados, independientemente de la gravedad.  Este procedimiento especifica cómo se siguen de manera uniforme estos esfuerzos para

-   maximizar el tiempo de actividad del entorno,
-   minimizar el impacto en el cliente,
-   reducir el tiempo de reparación y
-   compartir información con nuestros clientes y la comunidad de Internet.

___

## Alcance

Este SOP se aplica a los clientes de Cloudflare y a los servicios al cliente que consumen los clientes. El SOP es aplicable a todos los entornos de producción de clientes en Cloudflare, incluidos:

-   sitio web público de Cloudflare [www.cloudflare.com](http://www.cloudflare.com/))
-   las API de Cloudflare (interfaces de programación de aplicaciones)
-   interfaces salientes de terceros (por ejemplo, autorizaciones de tarjetas de crédito, etc.)
-   infraestructura de red que es propiedad o es administrada por Cloudflare para servicios de producción
-   software, hardware y servicios del proveedor que afectan cualquier parte de la producción de Cloudflare

___

## Información

Cloudflare quiere construir un mejor Internet. Para ofrecer una experiencia mejorada a millones de usuarios de Internet, las operaciones internas de Cloudflare deben seguir procesos y procedimientos de entrega de servicios excelentes.  Por lo tanto, los procedimientos de Cloudflare siguen muchas de las prácticas recomendadas estándar de la industria, algunas de las cuales siguen específicamente los patrones de la Tecnología de infraestructura de la biblioteca de información (ITIL).  Este SOP sigue las prácticas recomendadas de la metodología de gestión de problemas de ITIL.

___

## Definiciones

Categorías de términos clave del incidente:  Todos los eventos son condiciones que pueden provocar alertas; algunas alertas son incidentes notables (y otras no); todos los incidentes se deben evaluar (a veces a través de la automatización, a veces a través de la interacción humana); algunos incidentes son problemas; algunos subconjuntos de problemas son "importantes" e instigan actualizaciones de la página de estado; algunos incidentes importantes tienen una alta prioridad (P1), que requiere que se cree un Informe de incidentes.

Terminología

<table><tbody><tr><td><p><strong>Término</strong></p></td><td><p><strong>Definición</strong></p></td></tr><tr><td><p><span>Evento</span></p></td><td><p><span>Cualquier cosa identificable y discreta que pueda ser registrada por una de las aplicaciones o sistemas de producción de Cloudflare</span></p></td></tr><tr><td><p><span>Alerta</span></p></td><td><p><span>Un evento de interés potencial que se identifica y comunica a través de uno de los sistemas de monitoreo de Cloudflare</span></p></td></tr><tr><td><p><span>Incidente</span></p></td><td><p><span>Un informe o alerta que tiene una alta probabilidad de afectar los sistemas de producción de Cloudflare, o una condición de alerta que solo existe por un período de tiempo corto porque el servicio afectado se restablece antes de que se identifique una condición de Problema</span></p></td></tr><tr><td><p><span>Problema</span></p></td><td><p><span>Un incidente identificado y categorizado que tiene un impacto negativo en la condición o funcionamiento óptimo de los sistemas o aplicaciones de producción de Cloudflare</span></p></td></tr><tr><td><p><span>Reporte de incidente</span></p></td><td><p><span>Un informe público que describe la naturaleza de un problema de servicio, la respuesta general de Cloudflare al problema y los esfuerzos para reducir o eliminar el impacto futuro</span></p></td></tr><tr><td><p><span>Revisiones post mortem</span></p></td><td><p><span>Una reunión de revisión iniciada en respuesta a un problema grave o crítico. &nbsp;Todas las reuniones post mortem se centran en los detalles de un Informe de incidentes generado por un ingeniero de Cloudflare con la capacidad o experiencia adecuada para abordar la naturaleza del Problema.</span></p></td></tr><tr><td><p><span>SRE</span></p></td><td><p><span>Los ingenieros de fiabilidad de los sistemas son el grupo responsable de la asistencia de primer nivel de todos los incidentes</span></p></td></tr><tr><td><p><span>CSUP</span></p></td><td><p><span>El grupo de asistencia al cliente es el equipo responsable de responder a todas las solicitudes generadas por los clientes y de todas las comunicaciones de los clientes durante cualquier problema que se identifique.</span></p></td></tr><tr><td><p><span>JIRA</span></p></td><td><p><span>Sistema de tickets de Cloudflare que se usa para el seguimiento de incidentes, órdenes de trabajo y problemas.</span></p></td></tr><tr><td><p><span>Nivel de gravedad/prioridad</span></p></td><td><p><span>Valor de "P0, P1, P2 o P3" en función de la gravedad del problema que afecta a la red de Cloudflare y a los clientes</span></p></td></tr><tr><td><p><span>SLA</span></p></td><td><p><span>Acuerdo de nivel de servicio: obligación interna o contractual para un nivel específico de servicio (generalmente medido en acciones por unidad de tiempo)</span></p></td></tr><tr><td><p><span>SLO</span></p></td><td><p><span>Objetivo de nivel de servicio: objetivo interno o contractual para un nivel de servicio específico (generalmente medido en acciones por unidad de tiempo)</span></p></td></tr><tr><td><p><span>Comandante de incidentes</span></p></td><td><p><span>El recurso de Cloudflare que es responsable de asegurar que el problema se aborde adecuadamente, se mantenga el tiempo, se realicen escalamientos, se actualicen los clientes y se usen los recursos según sea necesario</span></p></td></tr><tr><td><p><span>La comunidad de Internet</span></p></td><td><p><span>El principal grupo de partes interesadas de Cloudflare. &nbsp;Cloudflare asegura y optimiza más de 4 600 000 de sitios web y el usuario promedio de Internet interactúa con los sitios web de Cloudflare más de 500 veces por semana.</span></p></td></tr><tr><td><p><span>Tercero</span></p></td><td><p><span>Proveedor de servicio o proveedor que no pertenece a Cloudflare que se asocia con CloudFlare para la entrega de sistemas o servicios al cliente</span></p></td></tr><tr><td><p><span>Partes interesadas</span></p></td><td><p><span>Persona, grupo o empresa que se ve afectada por un incidente, ya sea como proveedor (por ejemplo, persona de Cloudflare, tercero) o consumidor (cliente)</span></p></td></tr><tr><td><p><span>RCA</span></p></td><td><p><span>Análisis de causa raíz: revisión exhaustiva de la causa subyacente de un problema</span></p></td></tr><tr><td><p><span>Remediación</span></p></td><td><p><span>Todos los pasos necesarios para resolver la causa principal de un problema y garantizar que no vuelva a suceder.</span></p></td></tr><tr><td><p><span>Página de estado</span></p></td><td><p><span>La herramienta principal que usa Cloudflare para compartir públicamente información sobre la prestación de sus servicios y cualquier incidente o problema que afecte los servicios de Cloudflare:</span><a href="https://www.cloudflarestatus.com/"> <span>https://www.cloudflarestatus.com</span></a></p><p><span>La página de estado está alojada por un tercero </span><a href="http://statuspage.io/"><span>Statuspage.io</span></a><span>) que no depende de los servicios de Cloudflare para su funcionamiento.</span></p></td></tr></tbody></table>

___

## Funciones y responsabilidades

## Las siguientes funciones y responsabilidades están asociadas con la gestión de incidentes dentro de Cloudflare: 

<table><tbody><tr><td><p><strong>Función</strong></p></td><td><p><strong>Responsabilidades</strong></p></td></tr><tr><td><p><span>Gestión de Cloudflare</span></p></td><td>Revisar y aprobar procedimientos.<br>Asegúrate de que todos los miembros del personal estén capacitados en los procedimientos.<br>Notificar a los clientes y a terceros, según sea necesario, sobre su función en los procedimientos.<br>Iniciar y supervisar las revisiones de post mortem para informes de incidentes críticos.</td></tr><tr><td><p><span>SRE de turno</span></p></td><td>Uno o más SRE asignados de turno para responder a todas las alertas críticas.<br><span>Identifica y responde a un incidente, evalúa y clasifica la gravedad del incidente y posiblemente escala un incidente impactante como un Problema.</span><br>Actúan como escalamientos y administración del problema de principio a fin.</td></tr><tr><td><p><span>Ingenieros de redes de turno</span></p></td><td>Uno o más ingenieros de red asignados de turno para responder a alertas críticas.<br>Coordina con el equipo de SRE, que proporciona la Gestión de incidentes primaria durante cualquier problema identificado.</td></tr><tr><td><p><span>CSUP de turno</span></p></td><td>Uno o más ingenieros de CSUP que tienen asignados turnos para responder a todas las solicitudes de los clientes.<br>Responsable de todas las comunicaciones con el cliente durante todos los problemas identificados.<br>Responsable de comunicar todo el mantenimiento planificado.</td></tr><tr><td><p><span>Equipo SRE</span></p></td><td>El equipo general de Ingeniería de fiabilidad de los sistemas que brinda asistencia a los esfuerzos de SRE de turno.<br>Asume la función de gestor de incidentes durante un problema identificado.<br>Implementa los cambios de producción adecuados compatibles con Cloudflare para resolver problemas.</td></tr><tr><td><p><span>Equipos de ingeniería de Cloudflare</span></p><p><span>(DBA, red, nginx, seguridad, etc.)</span></p></td><td>Brindan asistencia al gestor de incidentes durante la resolución de un problema.<br>Se unen a las llamadas de puente, a solicitud.<br>Se aseguran de capturar la documentación durante el diagnóstico y corrección de problemas, y ejecutan la escalación adecuada a otros grupos responsables.<br>Participan en las revisiones post mortem de algunos informes de incidentes, según lo solicitado por la gestión de Cloudflare.</td></tr></tbody></table>

___

## Procedimiento operativo estándar

Esta sección detalla los procedimientos para la gestión de incidentes y problemas.  A alto nivel, estos procesos se relacionan de la siguiente manera:

-   Gestión de incidentes:  El proceso general para observar y responder a alertas, que incluye: evaluar el impacto potencial y la gravedad de un incidente, clasificar el incidente como un problema, asignar una prioridad al problema o descartar el incidente como un evento sin impacto si no se puede identificar una condición problemática.

-   Gestión de problemas:  Es el proceso de identificar el alcance y la extensión de un Problema, asignar un nivel de gravedad apropiado (P0, P1, P2, P3), las acciones para resolver el Problema y restaurar el estado óptimo para los servicios de producción y la comunicación del problema a las partes correspondientes.

-   Gestión de resolución:  Es el proceso de investigar las causas y condiciones que conducen a una condición problemática, informar sobre la forma general en que se gestionó y resolvió un problema, y cualquier análisis posterior de cómo las condiciones y causas de un problema se pueden prevenir en el futuro.

___

El objetivo principal de la gestión de incidentes es identificar y reaccionar ante posibles problemas lo más rápido posible, y así minimizar el impacto en los servicios de producción y proporcionar los mejores niveles posibles de calidad y disponibilidad del servicio.  Los mejores niveles posibles de calidad y disponibilidad del servicio implicaría que todos los servicios operaran exactamente como fueron diseñados el 100 % del tiempo, y que estuvieran disponibles y accesibles el 100 % del tiempo.

Debido a que aceptamos que una combinación de fuerzas dentro de nuestro control, y fuerzas más allá de nuestro control, eventualmente impactarán la condición del servicio, definimos los Objetivos de nivel de servicio (SLO) y los Acuerdos de nivel de servicio (SLA) para describir qué degradaciones en la condición del servicio son aceptables para diversos servicios dentro de la red de Cloudflare.   Los SLA y SLO se expresan como porcentajes de períodos de tiempo (mensualmente y anualmente).

El nivel de información sobre un incidente puede variar, pero se debe recopilar la siguiente información antes de clasificar y priorizar un incidente:

-   Fuente del remitente (alerta de monitoreo o fuente alternativa)
-   Clientes (si corresponde)
-   Sistema o aplicación (y nombre de host, si corresponde)
-   Tiempo de alerta
-   Alcance del impacto: número estimado de sistemas, usuarios o regiones afectados
-   Tipo de impacto: alcance general del deterioro del servicio (por ejemplo, pérdida de acceso total, funcionamiento degradado, aplicaciones dependientes afectadas, impacto observado en el cliente)

Todos los incidentes que se clasifiquen como problemas, independientemente de la fuente, que tengan una prioridad de P0 o P1, se registrarán dentro del sistema de emisión de tickets Cloudflare, JIRA.  Algunas alertas indicarán condiciones que pueden no tener un impacto inmediato en los niveles de servicio y, según sea necesario, se clasificarán como Problemas con una prioridad P2 o P3.  

El sistema JIRA es el sistema de registro de toda la información del incidente y todas las demás fuentes de documentación sobre un problema (por ejemplo, historial de alertas, capturas de pantalla, registros de trabajo, conversaciones de chat) se adjuntan al ticket original de JIRA creado en respuesta a un incidente.

### Clasificaciones de incidentes

Después de reconocer una alerta, SRE inmediatamente clasifica la alerta correlacionándola con una categoría y un nivel de prioridad.  Al crear nuevos tickets JIRA para problemas de alta prioridad (P0 y P1), SRE se asegurará de que cada ticket se clasifique correctamente al incluir su Categoría y Prioridad.  

### Nivel de prioridad

Todos los tickets se clasificarán de acuerdo con los siguientes 4 niveles de prioridad.  Los criterios enumerados son directrices generales.   Las condiciones descritas a continuación deberían definir explícitamente un nivel de prioridad; sin embargo, a discreción de la administración de SRE o Cloudflare, a los Problemas se les puede asignar un mayor nivel de prioridad, según sea necesario.

<table><tbody><tr><td><p><span><strong>Nivel de prioridad</strong></span></p></td><td><p><span><strong>Descripción</strong></span></p></td></tr><tr><td><p><span>P0</span></p></td><td>Pérdida completa de acceso a la aplicación Cloudflare o API.<br>Acceso degradado a la aplicación o API Cloudflare (⪯ 98 % medido en todo el mundo o desde cualquier región importante).<br>Pérdida completa de acceso o degradación importante de funcionamiento a un Centro de datos de nivel 1.<br>Funcionamiento degradado de cualquier proveedor de tránsito global de Nivel 1 (⪰ 20 % de pérdida de paquetes en todo el mundo o 30 % de pérdida de paquetes en cualquier región importante).<br>Acceso o funcionamiento degradado de cualquier sistema crítico</td></tr><tr><td><p><span>P1</span></p></td><td>Degradación intermitente o degradada del funcionamiento en todo el sitio.<br>Pérdida de una función importante como elaboración de informes<br>Pérdida de acceso a la aplicación Cloudflare desde una de las redes sociales o sitios web externos de CloudFlare (por ejemplo, <a href="http://spacloudflare.com/">spaCloudflare.com</a>, <a href="http://saloncloudflare.com/">salonCloudflare.com</a>, etc.).<br>Interrupción de la importante interfaz de salida de terceros.<br>Inoperabilidad del sitio para uno de los clientes comerciales o socios de distribución.<br>Corrupción o pérdida de datos del cliente.</td></tr><tr><td><p><span>P2</span></p></td><td>Problema de funcionamiento esporádico o localizado.<br>Problemas del sistema sin que haya aún un impacto notable en el cliente (por ejemplo, CPU alto).<br>Interrupción/degradación de un solo cliente.</td></tr><tr><td><p><span>P3</span></p></td><td>Problemas operativos, problemas de procedimiento o solicitudes de servicio que tienen poco o ningún efecto en los usuarios finales y que se pueden manejar según disponibilidad.<br>La gravedad predeterminada que se asigna a todos los tickets que aún no se han revisado o que no se les ha asignado un nivel de gravedad.</td></tr></tbody></table>

###   
Categoría

Para un seguimiento y comunicaciones adecuados, los problemas de alta prioridad (P0 y P1) se asignarán a las categorías. Estas categorías (etiquetas de tickets) corresponden a las categorías comunicadas públicamente que se enumeran en la Página de estado pública de Cloudflare. 

Los tickets de menor prioridad (P2 y P3) se pueden clasificar mediante etiquetas y nomenclatura que son específicas de varios equipos de ingeniería y no ingeniería dentro de Cloudflare.  Estas etiquetas y categorías diversas no se incluyen en este documento. 

### Incidentes de seguridad

Es fundamental entender que los incidentes que se clasifican en la categoría de Seguridad requieren un manejo y procedimientos especiales.  Estos incidentes se deben registrar aquí y luego seguir los procedimientos de Incidentes de seguridad definidos por el equipo de Cloudflare de Información seguridad.

### Gravedad alta/incidentes prioritarios

Los incidentes P0 y P1 obviamente tienen un mayor impacto en el negocio y, por lo tanto, tienen algunos requisitos iniciales especiales para asegurar que se manejen de la manera más rápida posible.

### Gestor de incidentes

Para todos los problemas P0 y P1, se debe contactar al Gestor de incidentes en servicio de inmediato.  Se publicará un cronograma de gestores de incidentes para garantizar que el SRE sepa a quién contactar en un momento dado.  El gestor de incidentes es un recurso crítico responsable de lo siguiente:

-   Validación de la gravedad de un problema
-   Seguimiento del problema desde la presentación hasta la resolución
-   Representación del mejor interés de los clientes.
-   Registro de todas las acciones y tiempos.
-   Dirección del personal hacia la resolución más rápida posible
-   Asegurarse de que los clientes y la administración interna sean notificados del estado de acuerdo con períodos de tiempo predeterminados (o al cambiar el estado)
-   Realizar escalamientos de clientes, internos o de terceros cuando se exceden los límites de tiempo o no se realiza el progreso adecuado
-   Asegurarse que se aplique una explicación significativa al ticket después de la resolución
-   Asegurarse de que el remitente inicial acepte que el problema se resolvió antes de que se cierre el ticket 

___

## Comunicaciones de incidentes

Las comunicaciones externas durante un incidente son críticas para:

-   Notificar a las partes interesadas que Cloudflare conoce el problema y está buscando una solución
-   Asegurar a los clientes que el asunto está bajo revisión y que Cloudflare está buscando sus mejores intereses.
-   Los problemas no se prolongan innecesariamente y se hacen las escalaciones adecuadas
-   Informar a las partes interesadas internas clave de incidentes importantes

Los principales tipos de comunicaciones durante un incidente incluyen:

Un miembro del equipo de CSUP de turno creará la página de estado con plantillas tan pronto como se identifique un incidente.

___

## Revisiones de post mortem

Cloudflare cree ninguno de los problemas críticos deberían repetirse de nuevo.  Con ese fin, todos los problemas P0 instigarán la publicación de un Informe de incidentes (IR), que incluye un Análisis de causa raíz (RCA) del problema y los factores generales que conducen al Incidente. A todas las publicaciones de IR las seguirá una reunión post mortem, una reunión en la que los ingenieros y gestores revisan y acuerdan los detalles del IR, las conclusiones del RCA y cualquier paso de remediación de seguimiento que se tomará para garantizar que las condiciones del problema no se repitan.

### Gestión de problemas y post mortem

La gestión de problemas difiere de la Gestión de incidentes en que su objetivo principal es la detección de las causas subyacentes de un incidente, así como su posterior resolución y prevención.

###   
Análisis de causa raíz y remediación

#### **Ticket del problema**

Un RCA es un informe de análisis de causa raíz.  Un ticket Jira de un problema es el registro y el seguimiento de eventos que pueden justificar un RCA.  Este es un proceso mediante el cual los expertos en la materia (SME) de un área revisarán un problema P0 o P1 en busca de la causa subyacente del problema.  Una vez que esto se determina, los SME deben crear un plan de remediación para abordar las causas.  La entrega final es un ticket bien documentado para rastrear la remediación hasta su finalización y, si es necesario, un informe de incidentes bien redactado que se enviará a un equipo interno y/o cliente.

Los puntos anteriores siguen siendo aplicables, incluso si se trata de un proveedor externo o proveedor que suministra el RCA.  Cuando la información de RCA se recibe de un tercero, debemos asegurarnos de que el ticket del problema se actualice con toda la información relevante, incluyendo las correcciones pendientes que se deben rastrear.  

#### **Informe IR**

El Informe de incidentes ("IR") es el método principal de comunicación al cliente sobre un problema y puede contener algunas o todas las partes de lo que está escrito en el ticket.  

La persona que escribe el informe variará según la gravedad del problema y el área responsable.  Una vez completado el borrador del informe, es fundamental asegurarse de que el informe sea revisado por la administración de Cloudflare en cuanto a contenido, compromisos y presentación profesional.  Una vez que se aprueba el informe, se puede publicar para el cliente.

___

## Revisión del problema

Las secciones anteriores han detallado el manejo del incidente y el proceso de la causa raíz para asegurar una solución permanente.  La última parte del proceso de gestión de incidentes y problemas es asegurar que las métricas, tendencias e informes clave se lleven a cabo para garantizar que se siga el proceso correctamente, que se cumpla con los SLA y que no se pasen por alto los problemas subyacentes.

### Elaboración de informes

Los criterios de ticket que deben informarse tanto para tickets abiertos como cerrados incluyen los siguientes:

-   Gravedad
-   Categoría/subcategoría
-   Grupo responsable
-   Edad/días en que estuvieron abiertos

Siempre que sea posible, estos datos se deben informar gráficamente para mostrar tendencias visibles.  Estos informes se deben publicar para los gestores internos de Cloudflare y los propietarios de área.

### Análisis y responsabilidad

Cada propietario de área para tickets será responsable no solo de asegurarse de que sus tickets se cierren dentro de los plazos prescritos o razonables, sino también de revisar los informes y buscar tendencias, inquietudes y problemas recurrentes.  Con base en este análisis, se deben abrir más tickets de problemas para remediar cualquier problema que no haya surgido a través de un P0 o P1.  Esto permitirá una mejora continua y, en última instancia, reducirá el conteo de nuevos tickets al abordar las causas raíz.

### Reuniones de revisión de gestión de incidentes (post mortem)

Como parte de todas las reuniones del personal departamental, los gestores de grupo deben revisar los informes abiertos y de tendencias con los siguientes objetivos:

-   Discusión de áreas de éxito o preocupación.
-   Revisión de oportunidades de mejora por parte de los propietarios del área.
-   Acuerdo sobre áreas que justifican que se abra un nuevo ticket de problema para el seguimiento de remediación
