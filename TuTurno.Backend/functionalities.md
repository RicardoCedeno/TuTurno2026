# TuTurno Backend - Funcionalidades de la Aplicación

Este documento resume las capacidades y funcionalidades del sistema backend de TuTurno, organizadas por módulos según la estructura de controladores implementada.

---

## 👤 Gestión de Usuarios
El sistema permite la administración de los usuarios que acceden a la plataforma, gestionando sus perfiles y permisos.
- **Listado General**: Obtener todos los usuarios registrados.
- **Consulta Individual**: Buscar un usuario específico mediante su ID.
- **Registro**: Crear nuevos usuarios definiendo nombre, correo electrónico y rol.
- **Actualización**: Modificar la información existente de un usuario.
- **Eliminación**: Remover usuarios permanentemente del sistema.
- **Estado de Cuenta**: Desactivar usuarios sin necesidad de eliminarlos.

## 🏥 Gestión de Pacientes
Módulo dedicado a la administración de la información de los pacientes.
- **Listado de Pacientes**: Acceso a la base de datos completa de pacientes.
- **Ficha del Paciente**: Obtener detalles completos de un paciente por su ID.
- **Registro**: Dar de alta a nuevos pacientes en el sistema.
- **Edición**: Actualizar los datos personales o de contacto de los pacientes.
- **Baja**: Eliminar registros de pacientes cuando sea necesario.

## 👨‍⚕️ Gestión de Doctores y Especialidades

### Doctores
Administración del personal médico y su disponibilidad.
- **Directorio Médico**: Listar todos los doctores registrados.
- **Perfil del Doctor**: Obtener detalles de un médico por su ID.
- **Búsqueda Especializada**: Filtrar doctores según su especialidad médica.
- **Registro**: Agregar nuevos profesionales al equipo médico.
- **Actualización**: Editar perfiles y datos de los doctores.
- **Baja**: Eliminar doctores del sistema.

### Especialidades
Gestión de las ramas médicas que ofrece la institución.
- **Catálogo de Especialidades**: Listar todas las especialidades médicas disponibles.
- **Consulta**: Obtener información de una especialidad por ID.
- **Mantenimiento**: Crear, actualizar y eliminar especialidades del catálogo.

## 🏢 Infraestructura: Sedes y Oficinas

### Sedes (Locations)
Gestión de los diferentes centros o edificios de atención.
- **Listado de Sedes**: Ver todas las ubicaciones físicas disponibles.
- **Búsqueda Geográfica**: Filtrar sedes por ciudad o país.
- **Contacto**: Buscar sedes por número telefónico.
- **Filtro de Estado**: Consultar sedes activas e inactivas por separado.
- **Gestión CRUD**: Crear, consultar detalles, actualizar y eliminar sedes.

### Oficinas (Offices)
Administración de los espacios físicos (consultorios) dentro de las sedes.
- **Listado de Oficinas**: Ver todos los consultorios u oficinas disponibles.
- **Disponibilidad**: Filtrar oficinas activas o inactivas.
- **Ubicación Interna**: Filtrar oficinas por sede (Location) o por piso del edificio.
- **Gestión CRUD**: Crear, consultar detalles, actualizar y eliminar oficinas.

## 📅 Gestión de Citas Médicas

### Citas (Appointments)
El núcleo del sistema, permitiendo la gestión integral del flujo de atención.
- **Control de Agenda**: Listar todas las citas del sistema.
- **Historial por Paciente**: Consultar todas las citas asociadas a un paciente específico.
- **Agenda del Doctor**: Consultar las citas asignadas a un médico, con opción de filtrar por rango de fechas.
- **Planificación Temporal**: Filtrar citas globales por rangos de fechas específicos.
- **Seguimiento de Estados**: Filtrar citas según su situación (Pendiente, Realizada, etc.).
- **Filtros Avanzados**: Búsquedas combinadas por Paciente + Estado o Paciente + Doctor + Estado.
- **Gestión CRUD**: Agendar nuevas citas, consultar detalles, actualizar información y eliminar citas.

### Cancelaciones
Módulo específico para el seguimiento de citas que no pudieron concretarse.
- **Registro de Cancelaciones**: Listar todas las cancelaciones realizadas.
- **Trazabilidad**: Consultar cancelaciones filtradas por paciente o por doctor.
- **Análisis Temporal**: Filtrar cancelaciones por rango de fechas.
- **Proceso de Cancelación**: Crear nuevos registros de cancelación y gestionar su eliminación si fuera necesario.
