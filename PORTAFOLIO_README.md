# 👩‍💻 Portafolio Personal Django - Laura Sarrazola

Este es un portafolio personal desarrollado con Django como parte del bootcamp de programación. El sitio presenta información sobre Laura Sarrazola, estudiante apasionada de análisis y desarrollo de software.

## 🚀 Características

- **4 Secciones Principales**:
  - **Inicio**: Página principal con presentación y resumen
  - **Sobre Mí**: Información personal, pasiones y filosofía
  - **Proyectos**: Showcase del proyecto Akalia y habilidades técnicas
  - **Contacto**: Información de contacto y formulario

- **Diseño Responsivo**: Utiliza Bootstrap 5.3.0 para un diseño limpio y moderno
- **Navegación Funcional**: Menú de navegación con indicadores de página activa
- **Iconos Font Awesome**: Interfaz mejorada con iconos profesionales
- **Esquema de Colores**: Paleta moderna con acento púrpura (#6c5ce7)

## 🛠️ Tecnologías Utilizadas

- **Backend**: Django 5.2.5, Python 3
- **Frontend**: HTML5, CSS3, Bootstrap 5.3.0
- **Iconos**: Font Awesome 6.4.0
- **Base de Datos**: SQLite (desarrollo)

## 📦 Instalación y Configuración

### Prerrequisitos
- Python 3.x instalado
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Instalar Django**:
   ```bash
   pip3 install django
   ```

2. **Navegar al directorio del proyecto**:
   ```bash
   cd AkaliaBootcamp
   ```

3. **Ejecutar migraciones**:
   ```bash
   python3 manage.py migrate
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   python3 manage.py runserver 8000
   ```

5. **Acceder al portafolio**:
   Abrir navegador en `http://127.0.0.1:8000`

## 📁 Estructura del Proyecto Django

```
AkaliaBootcamp/
├── portafolio_project/          # Configuración principal del proyecto
│   ├── settings.py             # Configuraciones de Django
│   ├── urls.py                 # URLs principales
│   └── wsgi.py                 # Configuración WSGI
├── portafolio/                 # Aplicación del portafolio
│   ├── views.py                # Vistas de las páginas
│   ├── urls.py                 # URLs de la aplicación
│   └── templates/portafolio/   # Plantillas HTML
│       ├── base.html           # Plantilla base
│       ├── inicio.html         # Página de inicio
│       ├── sobre_mi.html       # Página sobre mí
│       ├── proyectos.html      # Página de proyectos
│       └── contacto.html       # Página de contacto
├── manage.py                   # Comando de gestión de Django
└── .gitignore                  # Archivos ignorados por Git
```

## 🎨 Características del Diseño

- **Diseño Limpio y Minimalista**: Apropiado para un estudiante principiante
- **Responsive**: Se adapta a dispositivos móviles y desktop
- **Navegación Intuitiva**: Menú fijo con íconos y estados activos
- **Secciones Hero**: Páginas con cabeceras atractivas
- **Cards Informativas**: Contenido organizado en tarjetas Bootstrap
- **Footer Profesional**: Pie de página consistente

## 👩‍🎓 Información Personal Incluida

- **Nombre**: Laura Sarrazola
- **Edad**: 28 años
- **Ocupación**: Estudiante de análisis y desarrollo de software
- **Ubicación**: Envigado, Colombia
- **Pasiones**: Academia, música (Pink Floyd, Tame Impala, Mon Laferte), gatos
- **Estudios**: Ingeniería (estudios previos)
- **Contacto**: lausa8a@gmail.com, 3013983587

## 🚀 Proyecto Destacado: Akalia

El portafolio incluye información detallada sobre Akalia, una plataforma showroom para productos artesanales desarrollada con:

- **Frontend**: HTML, EJS, CSS3, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Base de Datos**: MySQL
- **Funcionalidades**: CRUD de productos, gestión de imágenes, categorías y etiquetas

## 🔗 URLs del Portafolio

- `/` - Página de inicio
- `/sobre-mi/` - Información personal
- `/proyectos/` - Proyectos y habilidades
- `/contacto/` - Información de contacto

## 📝 Notas de Desarrollo

- El proyecto está configurado en español (`LANGUAGE_CODE = 'es-es'`)
- Utiliza SQLite para desarrollo (fácil configuración)
- Las plantillas extienden una base común para consistencia
- Los formularios son demostrativos (no procesan envíos)
- Incluye enlaces reales a GitHub y email

---

**Desarrollado por**: Laura Sarrazola  
**Parte de**: Bootcamp de Programación Nivel Integrador  
**Año**: 2024