# Secuencia432-TremendoTerritorio
API backend para la plataforma Tremendo Territorio, desarrollada con Node.js, Express y TypeScript.

## Descripción del Proyecto
Este proyecto proporciona la API REST que alimenta la plataforma Tremendo Territorio. Maneja la autenticación de usuarios, gestión de datos y todas las operaciones del backend necesarias para el funcionamiento de la aplicación.

## Características principales:
- API REST desarrollada con Express.js y TypeScript<br>
- Autenticación JWT con bcrypt para encriptación de contraseñas<br>
- Conexión a base de datos MySQL<br>
- CORS configurado para peticiones cross-origin<br>
- Arquitectura escalable y mantenible

## Instalación y Configuración
###Prerrequisitos

- Node.js (versión 22 o superior)<br>
- npm o yarn <br>
- MySQL (versión 8.0 o superior) <br>
- Git

### Pasos de instalación

#### 1. Clonar el repositorio:
git clone https://github.com/mcur03/Secuencia432-TremendoTerritorio.git <br>
cd tremendo-territorio-backend

#### 2. Instalar dependencias:
npm install

#### 3. Configurar variables de entorno:
Crear un archivo .env en la raíz del proyecto: <br>
##### Base de datos <br>
DB_HOST=localhost <br>
DB_PORT=3306 <br>
DB_USER=tu_usuario <br>
DB_PASSWORD=tu_contraseña <br>
DB_NAME=tremendo_territorio <br>

##### JWT
JWT_SECRET=tu_clave_secreta_muy_segura <br>
JWT_EXPIRES_IN=24h

##### Servidor
PORT=3000

#### 4. Configurar la base de datos:
##### Crear la base de datos en MySQL <br>
mysql -u root -p <br>
CREATE DATABASE tremendoTerritorio;

#### 5. Compilar el proyecto:
npm run build
