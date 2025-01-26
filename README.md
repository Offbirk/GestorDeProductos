# Gestión de productos

## Instalación

1. Clonar el repositorio
2. Abrir el proyecto en el editor de código de su preferencia.
3. Crear el archivo .env dentro de la carpeta backend y rellenar los campos según su máquina local:

        PORT = your_port
        MONGO_URI = your_mongodb_connection_string
        JWT_SECRET = your_jwt_secret

4. Crear el archivo .env dentro de la carpeta frontend:

        REACT_ENV // corregir luego

5. Instalar las dependencias en ambas carpetas con el comando <code>npm install</code>
6. Verificar que la conexión con la base de datos MongoDB se encuentre activa.
7. Levantar el servidor del backend con el comando <code>npm run start</code>
8. Iniciar la aplicación en el frontend <code>npm run dev</code>.

## Frontend

- Se utilizó React + Vite + Typescript.
- Para el UI Design se utilizó **TailwindCSS** 3 y los componentes de **Flowbite**.