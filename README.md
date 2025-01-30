# Gestión de productos

## Instalación

1. Clonar el repositorio
2. Abrir el proyecto en el editor de código de su preferencia.
3. Crear el archivo .env dentro de la carpeta backend y rellenar los campos según su máquina local para poder crear la
conexión con un puerto y la base de datos de Mongo:

        PORT = your_port
        MONGO_URI = your_mongodb_connection_string
        JWT_SECRET = your_jwt_secret

   >**Nota:** el JWT_SECRET será una variable de tipo string sin incluir las comillas
  
4. Crear el archivo .env dentro de la carpeta frontend:

        VITE_REACT_APP_API_URL = your_url_and_port_to_get_connection

5. Instalar las dependencias en ambas carpetas con el comando <code>npm install</code>
6. Verificar que la conexión con la base de datos MongoDB se encuentre activa.
7. Levantar el servidor del backend con el comando <code>npm run start</code>
8. Iniciar la aplicación en el frontend <code>npm run dev</code>.

### Flujo de Registro y Autenticación en Backend

1. **Registro de Usuario (`registerUser`)**:
   - Esta ruta (`/auth/register`) permite crear un nuevo usuario sin necesidad de un JWT, ya que es el punto de entrada para nuevos usuarios.

2. **Inicio de Sesión (`loginUser`)**:
   - Una vez que el usuario está registrado, puede iniciar sesión a través de la ruta `/auth/login`, donde se le proporcionará un JWT si las credenciales son correctas.

3. **Creación de Usuario (`createUser`)**:
   - Esta ruta está protegida por `verifyToken`, lo que significa que solo los usuarios autenticados (con un JWT válido) pueden crear nuevos usuarios. Esto es común en aplicaciones donde solo administradores o usuarios con permisos especiales pueden crear otros usuarios.


## Frontend

- Se utilizó React + Vite + Typescript.
- Para el UI Design se utilizó **TailwindCSS 3** y los componentes de **Flowbite**.

## Rutas protegidas

Las reglas de negocio mencionan que sólo los usuarios autenticados pueden acceder a la gestión de productos, para cumplir esta regla se maneja la restricción de acceso a ciertas rutas en la aplicación React utilizando rutas protegidas. 

### Implementación de Rutas Protegidas en React

Para implementar rutas protegidas, se implementaron estos pasos:

1. **Creación de un Contexto de Autenticación**: Esto permite gestionar el estado de autenticación de manera global en la aplicación.

2. **Creación de un Componente de Ruta Protegida**: Este componente verificará si el usuario está autenticado antes de permitir el acceso a la ruta.

3. **Configuración de las Rutas**: Se usa el componente de ruta protegida para envolver las rutas que requieren autenticación.

### Consideraciones

- **Estado de Autenticación**: Se asegura de que el estado de autenticación se actualice correctamente al iniciar y cerrar sesión.
- **Redirección**: Los usuarios no autenticados son redirigidos a la página de inicio de sesión.

    >Esta configuración permitirá gestionar el acceso a las rutas de productos de manera efectiva, asegurando que solo los usuarios autenticados puedan acceder a ellas.
