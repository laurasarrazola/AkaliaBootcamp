# 🛍️ Proyecto Final - Aplicación de Compras Artesanales

Este proyecto fue desarrollado como parte del bootcamp de programación nivel integrador con una duración de 2 meses. La aplicación es una plataforma showroom enfocada en productos artesanales, donde los usuarios pueden crear, editar, y visualizar productos, así como gestionar sus imágenes, categorías y etiquetas.

## 🛠️ Tecnologías Utilizadas

### 🧑‍💻 Frontend
- HTML + EJS
- CSS3
- Bootstrap 5

### 🌐 Backend
- Node.js
- Express.js
- Multer (para manejo de imágenes)
- MySQL (Base de datos relacional)

### ⚙️ Servidores
- Frontend: corre en `localhost:7001`
- Backend API REST: corre en `localhost:3000`
- MySQL: corre en el puerto `3306`

## 📦 Instalación y Configuración

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/laurasarrazola/AkaliaBootcamp
   cd AkaliaBootcamp
   ```

2. **Instala las dependencias** en los dos proyectos (frontend y backend):

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Crea la base de datos en MySQL** (en el puerto 3306). Asegúrate de tener un archivo `.env` con las variables necesarias como:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_basedatos
   ```

4. **Ejecuta los servidores**:
   - Backend:
     ```bash
     npm run dev
     ```
     > Servidor corriendo en `http://localhost:3000`

   - Frontend:
     ```bash
     npm run dev
     ```
     > Servidor corriendo en `http://localhost:7001`

## 🖼️ Subida de Imágenes

La aplicación utiliza `multer` para recibir y guardar imágenes asociadas a productos. Las imágenes se almacenan en una carpeta del servidor backend.

## 🔍 Funcionalidades

- Registro y autenticación de usuarios.
- CRUD de usuarios, emprendimientos, productos.
- Asignación de categorías y etiquetas.
- Subida y visualización de imágenes.
- Comunicación entre frontend y backend mediante peticiones HTTP (Axios o Fetch).
- Uso de plantillas dinámicas con EJS.

## 📁 Estructura del Proyecto

```
.
├── frontend
│   ├── views/         # Archivos EJS
│   │    ├── pages/
│   │    ├── partials/
│   ├── public/        # CSS, imágenes y JS del lado cliente
│   ├── routes/

│   └── app.js         # Servidor Express del frontend (puerto 7001)
│
├── backend
│   ├── controllers/   # Lógica de negocio
│   ├── routes/        # Endpoints de la API
│   ├── uploads/       # Carpeta de imágenes subidas
│   ├── app.js      # Servidor Express backend (puerto 3000)
│   └── db.js      # Conexion base de datos (puerto 3306)
│
└── README.md
```

## 🙋‍♀️ Autoras

**Xiomara García**  

**Laura Sarrazola**

**Paulina Fernandez**

Desarrolladoras web en formación  
