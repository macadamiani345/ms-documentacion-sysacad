# Análisis de las Métricas de Test de Carga

## 1. Contexto del Servicio
El objetivo de la prueba fue evaluar el rendimiento de un microservicio encargado de la **generación de archivos (PDF y Word)**. Este tipo de operación se caracteriza por ser intensiva en uso de CPU y por generar respuestas con cargas de datos (payloads) de mayor tamaño que una API REST convencional.

## 2. Configuración del Escenario
* **Herramienta:** k6
* **Usuarios Virtuales (VUs):** Máximo de 100 concurrentes.
* **Duración:** 40 segundos.
* **Naturaleza:** Generación de documentos bajo demanda.

## 3. Resumen de Métricas (Key Results)

### A. Fiabilidad (Reliability)
* **Tasa de Éxito:** **100%**.
* **Solicitudes Totales:** 2375.
* **Fallos (`http_req_failed`):** 0.00%.
    * **Interpretación:** El servicio fue capaz de generar y entregar 2375 documentos sin corromperse ni rechazar conexiones, incluso bajo la presión de 100 usuarios solicitando archivos simultáneamente.

### B. Rendimiento y Latencia (`http_req_duration`)
* **Promedio (`avg`):** 1.28 s
* **Mínimo (`min`):** 34.49 ms
* **Máximo (`max`):** 2.95 s
* **Percentil 95 (`p(95)`):** 1.93 s

**Análisis:** Dado que la tarea implica renderizado de documentos, un promedio de **1.28 segundos** es un resultado positivo. El sistema mantuvo tiempos de respuesta coherentes sin dispararse exponencialmente (el máximo fue controlado a menos de 3s).

### C. Transferencia de Datos (Throughput)
* **Datos Recibidos:** 309 MB totales (Tasa de **7.7 MB/s**).
* **Interpretación:** El alto volumen de tráfico de red confirma la transmisión exitosa de los archivos binarios generados hacia los clientes simulados.

## 4. Conclusión Técnica
La prueba de carga se considera **EXITOSA**.

El microservicio demostró robustez al manejar 100 usuarios concurrentes generando documentos. A diferencia de servicios transaccionales simples donde se espera latencia de milisegundos, en este contexto de **procesamiento pesado (I/O y CPU bound)**, mantener el p(95) por debajo de los 2 segundos indica una excelente optimización de los recursos y una arquitectura capaz de soportar alta demanda operativa sin degradación del servicio.