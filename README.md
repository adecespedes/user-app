## Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instalado:

- Node.js (versión 18 o superior).
- npm.

## Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/adecespedes/user-app.git
   ```

2. Acceder al directorio del proyecto:

   ```bash
   cd user-app
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador la dirección que proporciona Vite, normalmente:

   ```text
   http://localhost:5173
   ```

## Funcionalidades

- Consultar y mostrar la lista de usuarios.
- Buscar usuarios por nombre.
- Seleccionar un usuario para visualizar sus publicaciones.
- Mostrar el título y contenido de cada publicación.
- Crear nuevas publicaciones mediante un formulario.
- Validar los campos obligatorios antes de enviar.
- Mostrar estados de carga y mensajes de error.
- Cerrar los modales y cancelar la creación de publicaciones.

## Decisiones técnicas

### Separación de responsabilidades

Se separó la visualización de publicaciones y su formulario de creación en el componente `PostsModal`.

El formulario para crear publicaciones se implementó como un modal secundario, evitando mezclar la lógica de creación con la visualización de los datos existentes.

### Gestión de estados

Se utilizó `useState` para controlar los estados de la interfaz, incluyendo:

- Usuario seleccionado.
- Publicaciones del usuario.
- Visibilidad de los modales.
- Valores del formulario.
- Estado de envío.
- Mensajes de error.

### Experiencia de usuario

Se incorporaron validaciones para evitar el envío de campos vacíos, indicadores durante el guardado, mensajes de error y una distribución de los modales que permite mantener visibles los encabezados mientras se desplaza el contenido de las publicaciones.

## ¿Qué mejoraría con más tiempo?

Hay varias mejoras que podrían incorporarse en futuras versiones:

1. **Gestión de errores:** implementar un manejo más completo de errores de red, respuestas HTTP y posibles interrupciones del servicio.
2. **Experiencia de usuario:** agregar notificaciones visuales de éxito, confirmaciones y mejores estados de carga.
3. **Paginación:** incorporar paginación o carga progresiva para manejar grandes cantidades de publicaciones.
4. **Accesibilidad:** mejorar la navegación mediante teclado.
5. **Cobertura de pruebas:** ampliar las pruebas para contemplar más escenarios, como errores al consultar usuarios, cancelación del formulario y estados de envío.
6. **Organización del proyecto:** separar progresivamente los servicios de API, tipos, componentes y lógica de negocio para facilitar su escalabilidad.

## Uso de inteligencia artificial

Se utilizó inteligencia artificial como herramienta de apoyo durante el desarrollo, principalmente para resolver dudas técnicas, mejorar la interfaz visual, revisar implementaciones y aumentar la calidad del código.

### ¿Qué se le pidió a la IA?

- Orientación para configurar Vitest y React Testing Library en el proyecto.
- Ayuda para solucionar problemas de configuración de Vitest y TypeScript.
- Propuestas para implementar pruebas unitarias de `App` y `PostsModal`.
- Recomendaciones para validar formularios y comprobar el comportamiento de los modales.
- **Ayuda con los estilos CSS:** se solicitó mejorar la apariencia visual de la aplicación, ajustar espacios, tamaños, colores, alineación y distribución de los elementos.
- **Mejoras en los modales:** se pidió ayuda para organizar el contenido, mantener fijos los encabezados y permitir que el desplazamiento afectara únicamente al área de las publicaciones.
- **Diseño del formulario:** se solicitaron recomendaciones para mantener una apariencia coherente entre los campos de búsqueda y los campos del formulario de creación de publicaciones.
- Sugerencias para mejorar la organización y presentación general de la interfaz.
- Ayuda para redactar la documentación técnica del proyecto.

### ¿Qué sugerencias se aceptaron?

- La configuración de Vitest y React Testing Library.
- La utilización de pruebas unitarias para verificar los principales comportamientos de la aplicación.
- La simulación de interacciones mediante `user-event`.
- Las mejoras de CSS relacionadas con la distribución, alineación y presentación de los componentes.
- La organización de los modales y la implementación de áreas de desplazamiento independientes.
- Las recomendaciones visuales para mantener consistencia entre los diferentes elementos de la interfaz.

### ¿Qué se revisó o corrigió?

Las propuestas generadas por la IA se contrastaron con la implementación real del proyecto.

Se revisaron especialmente:

- Las importaciones y compatibilidad de la configuración de Vitest con Vite.
- Los nombres de los componentes, propiedades y elementos utilizados en las pruebas.
- Los textos y etiquetas accesibles para localizar los elementos de la interfaz.
- Los estilos CSS propuestos para adaptarlos a la estructura existente y evitar conflictos con otras clases.
- El comportamiento de los modales, especialmente la separación entre el encabezado fijo y el contenido desplazable.
- Las validaciones del formulario y el comportamiento asíncrono de las peticiones.
- Los casos de error para comprobar que los mensajes se mostraran correctamente.

La IA se utilizó como apoyo, no como sustituto de las decisiones de desarrollo. Las sugerencias se adaptaron al código existente y se revisaron antes de incorporarlas.
