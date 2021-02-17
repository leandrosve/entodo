# Entodo

## Características

### Frontend
- Lenguaje: Typescript 4.1.4
- Framework : React 17.0.1
- Chakra UI como libreria de componentes principal.
- Manejo de formularios con Formik y Yup.
- Comunicación con el backend mediante cliente Axios.
- Autenticación mediante JWT tokens.

### Backend
- Lenguaje: Java 8
- Framework : Spring Boot 2.4.2
- Base de datos: MySQL 5.7

### Instrucciones
Para iniciar la aplicación sin preocupaciones es necesario instalar Docker Compose.

Instalar Docker Compose: https://docs.docker.com/compose/install/

Al finalizar la instalación podrás acceder a la aplicación desde cualquier navegador con la url  http://localhost:3033/ 

La aplicación utiliza los puertos 3033 y 8088 para el frontend y el backend respectivamente.

#####  Construir e iniciar containers
Una vez instalado Docker Compose, debería ser suficiente con ejecutar el siguiente comando para levantar la aplicación.

`docker-compose build && docker-compose up`

El archivo [run.sh](https://github.com/leandrosve/entodo/blob/develop/run.sh "run.sh") solo se encarga de ejecutar la secuencia de comandos anterior.

