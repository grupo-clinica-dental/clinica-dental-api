

CREATE DATABASE clinica; 

CREATE TABLE
    tbl_roles (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL
    );

CREATE TABLE
    tbl_usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        telefono VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tbl_roles_usuarios (
        rol_id INTEGER NOT NULL,
        usuario_id INTEGER NOT NULL,
        PRIMARY KEY (rol_id, usuario_id),
        FOREIGN KEY (rol_id) REFERENCES tbl_roles(id),
        FOREIGN KEY (usuario_id) REFERENCES tbl_usuarios(id)
    );

CREATE TABLE
    tbl_tokens (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL REFERENCES tbl_usuarios(id),
        token VARCHAR(255) NOT NULL,
        fecha_inicio TIMESTAMP NOT NULL,
        fecha_expiracion TIMESTAMP NOT NULL
    );

CREATE TABLE
    tbl_especialidades (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL
    );

CREATE TABLE
    tbl_doctores (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES tbl_usuarios(id),
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tbl_doctor_especialidades (
        doctor_id INTEGER NOT NULL,
        especialidad_id INTEGER NOT NULL,
        PRIMARY KEY (doctor_id, especialidad_id),
        FOREIGN KEY (doctor_id) REFERENCES tbl_doctores(id),
        FOREIGN KEY (especialidad_id) REFERENCES tbl_especialidades(id)
    );

CREATE TABLE
    tbl_pacientes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(15) NOT NULL,
        email VARCHAR(100),
        fecha_nacimiento DATE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tbl_estados_cita (
        id SERIAL PRIMARY KEY,
        estado VARCHAR(50) NOT NULL
    );

CREATE TABLE
    tbl_citas (
        id SERIAL PRIMARY KEY,
        fecha_hora TIMESTAMP NOT NULL,
        doctor_id INTEGER NOT NULL REFERENCES tbl_doctores(id),
        paciente_id INTEGER NOT NULL REFERENCES tbl_pacientes(id),
        estado_id INTEGER NOT NULL REFERENCES tbl_estados_cita(id),
        google_calendar_event_id VARCHAR(255),
        ubicacion VARCHAR(255),
        descripcion TEXT,
        notas TEXT,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tbl_tipos_mensajes (
        id SERIAL PRIMARY KEY,
        tipo VARCHAR(50) NOT NULL,
        mensaje_template TEXT NOT NULL
    );

CREATE TABLE
    tbl_mensajes (
        id SERIAL PRIMARY KEY,
        tipo_mensaje_id INTEGER NOT NULL REFERENCES tbl_tipos_mensajes(id),
        usuario_id INTEGER NOT NULL REFERENCES tbl_usuarios(id),
        cita_id INTEGER REFERENCES tbl_citas(id),
        contenido TEXT NOT NULL,
        fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        estado BOOLEAN DEFAULT TRUE
    );