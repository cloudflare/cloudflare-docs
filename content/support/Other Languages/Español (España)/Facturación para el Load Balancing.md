---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115005254367-Facturaci%C3%B3n-para-el-Load-Balancing
title: Facturación para el Load Balancing
---

# Facturación para el Load Balancing



## Precios de Load Balancing de Cloudflare

{{<Aside type="warning">}}
Los clientes con acceso a la China network no deben usar Load Balancer o
se producirán errores HTTP 530.
{{</Aside>}}

Las suscripciones de Load Balancing de Cloudflare cuestan entre 5 $ y 50 $ al mes, según las opciones de suscripción seleccionadas.

Puedes configurar el Load Balancing para que se ajuste a tus requisitos específicos en función del número de servidores de origen, la frecuencia de health checks, el número de regiones verificadas y el enrutamiento geográfico.

La suscripción de 5 $ te permite configurar dos servidores de origen, health checks de 60 segundos y comprobaciones de una (1) región: esta opción es perfecta para una configuración sencilla de equilibrio de carga o failover.

___

## Facturación de Load Balancing de Cloudflare

Cuando está habilitado, Load Balancing de Cloudflare se factura a nivel de cuenta. Además de la suscripción mensual, tomaremos en cuenta el número de solicitudes de DNS (“consultas”) por cada Load Balancer que se configure al mes. Las primeras 500 000 consultas, compartidas entre todos los Load Balancers de tu cuenta, son gratuitas: el uso adicional más allá de esto se cobra a 50 centavos por cada 500 000 consultas, redondeado a las siguientes 500 000 consultas.

Por ejemplo:

-   81 451 consultas de DNS = suscripción + 0 $ en uso.
-   511 881 consultas de DNS = suscripción + 0,50 $ en uso.
-   2 994 155 consultas de DNS = suscripción + 2,50 $ en uso.

Toma en cuenta que las primeras 500 000 consultas se basan en todos los Load Balancers de carga activos de tu cuenta y no por sitio (dominio), ya que los Load Balancers se pueden compartir entre sitios cuando se configura un registro CNAME.

___

## Uso facturable de Load Balancing

El uso se cuenta como [consultas de DNS](https://en.wikipedia.org/wiki/Domain_Name_System) autoritativo en los servidores de nombre de Cloudflare para cada uno de los nombres de host de equilibrio de carga que hayas configurado.

Puedes reducir el número de consultas de DNS autoritativo configurando el Load Balancer como “proxy” (nube naranja) para los servicios HTTP(S), que configurarán el DNS TTL externo con 5 minutos y mantendrán el funcionamiento del failover equivalente con DNS TTL muy cortos. [Obtén más información sobre los beneficios del proxy (nube naranja) en comparación a no tener proxy (nube gris).](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Facturación para clientes de Enterprise

Los clientes de Enterprise se facturan según las conversaciones que se tengan con el equipo de ventas de Cloudflare Enterprise. Los clientes de Enterprise también tienen acceso a funciones adicionales, que incluyen lo siguiente:

-   Ejecución de health checks desde [cada centro de datos de Cloudflare](https://www.cloudflare.com/network/) (para una mayor granularidad de failover)
-   Direccionamiento según el centro de datos (anulación de los servidores origen que debe utilizar una ubicación específica y en qué orden)
-   Intervalos de health checks cinco segundos
-   Asistencia para más de 20 servidores de origen
-   Asistencia de Cloudflare Enterprise (incluye asistencia por correo electrónico las 24 horas del día, los 7 días por semana, por teléfono y un arquitecto de soluciones designado)
