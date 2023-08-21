-- Active: 1690505574728@@localhost@5432@db_clinica_types@public

INSERT INTO tbl_roles (nombre) VALUES ('Admin');

INSERT INTO tbl_roles (nombre) VALUES ('Doctor');

INSERT INTO tbl_roles (nombre) VALUES ('Patient');

-- Inserting data into tbl_usuarios

INSERT INTO
    tbl_usuarios (
        nombre,
        email,
        telefono,
        password,
        id_rol
    )
VALUES (
        'John Doe',
        'john@example.com',
        '1234567890',
        'password123',
        1
    );

-- Admin

INSERT INTO
    tbl_usuarios (
        nombre,
        email,
        telefono,
        password,
        id_rol
    )
VALUES (
        'Dr. Smith',
        'smith@example.com',
        '0987654321',
        'drsmithpassword',
        2
    );

-- Doctor

INSERT INTO
    tbl_usuarios (
        nombre,
        email,
        telefono,
        password,
        id_rol
    )
VALUES (
        'Jane Doe',
        'jane@example.com',
        '1122334455',
        'janedoe123',
        3
    );

-- Patient

-- Inserting data into tbl_doctores

INSERT INTO
    tbl_doctores (usuario_id, color)
VALUES (2, '#FF5733');

-- Inserting data into tbl_pacientes

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Jane Doe',
        '1122334455',
        'jane@example.com',
        '1995-07-15'
    );

-- Inserting data into tbl_estados_cita

INSERT INTO tbl_estados_cita (estado) VALUES ('Scheduled');

INSERT INTO tbl_estados_cita (estado) VALUES ('Completed');

INSERT INTO tbl_estados_cita (estado) VALUES ('Cancelled');

-- Inserting data into tbl_citas

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        fecha_inicio,
        fecha_final
    )
VALUES (
        CURRENT_TIMESTAMP,
        1,
        1,
        1,
        '2023-08-25 10:00:00',
        '2023-08-25 11:00:00'
    );

-- Inserting data into tbl_especialidades

INSERT INTO tbl_especialidades (nombre) VALUES ('Orthodontics');

INSERT INTO tbl_especialidades (nombre) VALUES ('Endodontics');

-- Inserting data into tbl_doctor_especialidades

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (1, 1);

-- Inserting data into tbl_tipos_mensajes

INSERT INTO
    tbl_tipos_mensajes (tipo, mensaje_template)
VALUES (
        'Appointment Reminder',
        'Hello, this is a reminder for your appointment on {date} at {time}.'
    );

-- Inserting data into tbl_mensajes

INSERT INTO
    tbl_mensajes (
        tipo_mensaje_id,
        usuario_id,
        cita_id,
        contenido
    )
VALUES (
        1,
        3,
        1,
        'Hello, this is a reminder for your appointment on August 25th, 2023 at 10:00 AM.'
    );