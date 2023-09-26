-- tbl_roles

INSERT INTO tbl_roles (nombre) VALUES ('Admin');

INSERT INTO tbl_roles (nombre) VALUES ('Doctor');

INSERT INTO tbl_roles (nombre) VALUES ('Recepcionista');

-- tbl_colores

INSERT INTO tbl_colores (codigo, nombre) VALUES ('#FF5733', 'Rojo');

INSERT INTO tbl_colores (codigo, nombre) VALUES ('#33FF57', 'Verde');

INSERT INTO tbl_colores (codigo, nombre) VALUES ('#5733FF', 'Azul');

-- tbl_usuarios

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'John Doe',
        'john@example.com',
        'hashedpassword1',
        1
    );

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'Dr. Smith',
        'smith@example.com',
        'hashedpassword2',
        2
    );

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'Jane Doe',
        'jane@example.com',
        'hashedpassword3',
        3
    );

-- tbl_doctores

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Smith', 2, 1);

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Jane', 3, 2);

-- tbl_pacientes

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Michael Johnson',
        '+123456789',
        'michael@example.com',
        '1995-06-12'
    );

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Emily Clark',
        '+987654321',
        'emily@example.com',
        '1990-10-25'
    );

-- tbl_estados_cita

INSERT INTO tbl_estados_cita (nombre) VALUES ('Programada');

INSERT INTO tbl_estados_cita (nombre) VALUES ('Completada');

INSERT INTO tbl_estados_cita (nombre) VALUES ('Cancelada');

-- tbl_citas

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-10 10:00:00',
        1,
        1,
        1,
        'Sala 1',
        '2023-08-20 10:00:00',
        '2023-08-20 11:00:00'
    );

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-11 15:00:00',
        2,
        2,
        2,
        'Sala 2',
        '2023-08-22 15:00:00',
        '2023-08-22 16:00:00'
    );

-- tbl_especialidades

INSERT INTO tbl_especialidades (nombre) VALUES ('Ortodoncia');

INSERT INTO tbl_especialidades (nombre) VALUES ('Endodoncia');

-- tbl_doctor_especialidades

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (1, 1);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (2, 2);

-- tbl_tipos_mensajes

INSERT INTO tbl_tipos_mensajes (tipo) VALUES ('Recordatorio');

INSERT INTO tbl_tipos_mensajes (tipo) VALUES ('Confirmación');

-- tbl_mensajes

INSERT INTO
    tbl_mensajes (tipo_mensaje_id, contenido)
VALUES (
        1,
        'Su cita está programada para mañana. No olvide asistir.'
    );

INSERT INTO
    tbl_mensajes (tipo_mensaje_id, contenido)
VALUES (
        2,
        'Su cita ha sido confirmada para el 20 de Agosto.'
    );

-- tbl_estados_mensajes

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('No enviado');

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('Enviado');

-- tbl_citas_mensajes

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (1, 1, '2023-08-19 10:00:00', 1);

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (2, 2, '2023-08-21 15:00:00', 2);

-- tbl_mensajes_templates

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        1,
        'Recuerde su cita para el [FECHA].'
    );

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        2,
        'Confirmamos su cita para el [FECHA].'
    );

--------hasta acldefault

-- tbl_roles

INSERT INTO tbl_roles (nombre) VALUES ('Enfermero/a');

-- tbl_colores

INSERT INTO
    tbl_colores (codigo, nombre)
VALUES ('#F2F233', 'Amarillo');

-- tbl_usuarios

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'Nurse John',
        'nursejohn@example.com',
        'hashedpassword4',
        4
    );

-- tbl_doctores

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Emily', 4, 3);

-- tbl_pacientes

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Tom Wilson',
        '+111223344',
        'tom@example.com',
        '1985-02-15'
    );

-- tbl_estados_cita

INSERT INTO tbl_estados_cita (nombre) VALUES ('Pendiente');

-- tbl_citas

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-12 13:00:00',
        2,
        3,
        3,
        'Sala 3',
        '2023-08-24 13:00:00',
        '2023-08-24 14:00:00'
    );

-- tbl_especialidades

INSERT INTO tbl_especialidades (nombre) VALUES ('Pediatría');

-- tbl_doctor_especialidades

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (1, 3);

-- tbl_tipos_mensajes

INSERT INTO tbl_tipos_mensajes (tipo) VALUES ('Cambio de hora');

-- tbl_mensajes

INSERT INTO
    tbl_mensajes (tipo_mensaje_id, contenido)
VALUES (
        3,
        'La hora de su cita ha cambiado a [NUEVA_HORA].'
    );

-- tbl_estados_mensajes

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('Fallido');

-- tbl_citas_mensajes

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (1, 3, '2023-08-19 11:00:00', 3);

-- tbl_mensajes_templates

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        3,
        'La hora de su cita ha sido cambiada para el [NUEVA_FECHA].'
    );

-------OTROS

-- Más roles

INSERT INTO tbl_roles (nombre) VALUES ('Coordinador');

-- Más colores

INSERT INTO
    tbl_colores (codigo, nombre)
VALUES ('#F25333', 'Naranja');

INSERT INTO tbl_colores (codigo, nombre) VALUES ('#33F2F2', 'Cian');

-- Más usuarios

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'Dr. Harris',
        'harris@example.com',
        'hashedpassword5',
        2
    );

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'Sarah',
        'sarah@example.com',
        'hashedpassword6',
        3
    );

INSERT INTO
    tbl_usuarios (nombre, email, password, id_rol)
VALUES (
        'Coordinator Sam',
        'sam@example.com',
        'hashedpassword7',
        5
    );

-- Más doctores

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Harris', 5, 4);

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Emily', 6, 5);

-- Más pacientes

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Sara Connors',
        '+111998877',
        'sara@example.com',
        '1980-03-10'
    );

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Linda Hamilton',
        '+111776655',
        'linda@example.com',
        '1975-09-19'
    );

-- Más estados de cita

INSERT INTO tbl_estados_cita (nombre) VALUES ('En curso');

-- Más citas

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-13 14:00:00',
        3,
        4,
        1,
        'Sala 4',
        '2023-08-25 14:00:00',
        '2023-08-25 15:00:00'
    );

-- Más especialidades

INSERT INTO tbl_especialidades (nombre) VALUES ('Cirugía');

INSERT INTO tbl_especialidades (nombre) VALUES ('Ginecología');

-- Más doctor_especialidades

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (3, 4);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (4, 5);

-- Más tipos de mensajes

INSERT INTO tbl_tipos_mensajes (tipo) VALUES ('Actualización');

INSERT INTO tbl_tipos_mensajes (tipo) VALUES ('Alerta');

-- Más mensajes

INSERT INTO
    tbl_mensajes (tipo_mensaje_id, contenido)
VALUES (
        4,
        'Su cita ha sido actualizada para [NUEVA_FECHA]'
    );

INSERT INTO
    tbl_mensajes (tipo_mensaje_id, contenido)
VALUES (
        5,
        'Alerta: Su próxima cita ha sido cancelada.'
    );

-- Más estados de mensajes

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('Leído');

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('No leído');

-- Más citas_mensajes

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (2, 4, '2023-08-23 15:00:00', 4);

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (3, 5, '2023-08-25 14:00:00', 5);

-- Más mensajes_templates

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        4,
        'Su cita ha sido actualizada para el [NUEVA_FECHA].'
    );

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        5,
        'Alerta: Su próxima cita ha sido cancelada.'
    );

---MAS

-- Más colores

INSERT INTO
    tbl_colores (codigo, nombre)
VALUES ('#F2A133', 'Naranja oscuro');

INSERT INTO
    tbl_colores (codigo, nombre)
VALUES ('#33F2A1', 'Turquesa');

-- Más doctores

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Wilson', 7, 6);

INSERT INTO
    tbl_doctores (nombre, id_color)
VALUES ('Dr. Adams', 7);

-- Más pacientes

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'Paul Walker',
        '+123123123',
        'paul@example.com',
        '1970-10-30'
    );

INSERT INTO
    tbl_pacientes (
        nombre,
        telefono,
        email,
        fecha_nacimiento
    )
VALUES (
        'George Baker',
        '+123444123',
        'george@example.com',
        '1980-05-25'
    );

-- Más citas

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-15 16:00:00',
        4,
        5,
        1,
        'Sala 5',
        '2023-09-01 16:00:00',
        '2023-09-01 17:00:00'
    );

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-16 17:00:00',
        5,
        6,
        2,
        'Sala 6',
        '2023-09-02 17:00:00',
        '2023-09-02 18:00:00'
    );

-- Más especialidades

INSERT INTO tbl_especialidades (nombre) VALUES ('Dermatología');

INSERT INTO tbl_especialidades (nombre) VALUES ('Oftalmología');

-- Más asociaciones de doctores con especialidades

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (5, 6);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (6, 7);

-- Más templates de mensajes

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        4,
        'Le informamos que su cita ha sido reprogramada para el [NUEVA_FECHA].'
    );

INSERT INTO
    tbl_mensajes_templates (tipo_mensaje_id, contenido)
VALUES (
        5,
        'Lamentamos informarle que su próxima cita ha sido cancelada. Por favor, póngase en contacto con la recepción para más detalles.'
    );

-- Más estados de mensajes

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('Reenviado');

INSERT INTO tbl_estados_mensajes (nombre) VALUES ('Borrador');

-- Más citas_mensajes

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (4, 4, '2023-08-31 16:00:00', 6);

INSERT INTO
    tbl_citas_mensajes (
        cita_id,
        tipo_mensaje_id,
        fecha_programada,
        id_estado_mensaje
    )
VALUES (5, 5, '2023-09-01 17:00:00', 7);

--MAAAS

-- Más doctores sin usuario

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Miller', NULL, 1);

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Davis', NULL, 2);

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Patel', NULL, 3);

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Thompson', NULL, 4);

INSERT INTO
    tbl_doctores (nombre, usuario_id, id_color)
VALUES ('Dr. Rodriguez', NULL, 5);

-- Asociación de estos doctores con especialidades

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (5, 1);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (4, 2);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (6, 3);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (5, 4);

INSERT INTO
    tbl_doctor_especialidades (doctor_id, especialidad_id)
VALUES (2, 5);

-- Asignar más citas para estos doctores

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-20 12:00:00',
        5,
        1,
        1,
        'Sala 4',
        '2023-09-15 12:00:00',
        '2023-09-15 13:00:00'
    );

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-20 14:00:00',
        4,
        2,
        2,
        'Sala 5',
        '2023-09-16 14:00:00',
        '2023-09-16 15:00:00'
    );

---MAS CITAS

-- Insertar más citas

-- Usando doctor_id del 1 al 6 y paciente_id del 1 al 3 (suponiendo que existen)

-- Cita 1

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-13 09:00:00',
        1,
        1,
        1,
        'Sala 4',
        '2023-08-25 09:00:00',
        '2023-08-25 10:00:00'
    );

-- Cita 2

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-13 11:00:00',
        2,
        2,
        1,
        'Sala 5',
        '2023-08-26 11:00:00',
        '2023-08-26 12:00:00'
    );

-- Cita 3

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-13 14:00:00',
        3,
        1,
        1,
        'Sala 6',
        '2023-08-27 14:00:00',
        '2023-08-27 15:00:00'
    );

-- Cita 4

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-14 09:00:00',
        4,
        3,
        1,
        'Sala 7',
        '2023-08-28 09:00:00',
        '2023-08-28 10:00:00'
    );

-- Cita 5

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-14 10:00:00',
        5,
        2,
        1,
        'Sala 8',
        '2023-08-29 10:00:00',
        '2023-08-29 11:00:00'
    );

-- Cita 6

INSERT INTO
    tbl_citas (
        fecha_creacion,
        doctor_id,
        paciente_id,
        estado_id,
        ubicacion,
        fecha_inicio,
        fecha_final
    )
VALUES (
        '2023-08-14 11:00:00',
        6,
        3,
        1,
        'Sala 9',
        '2023-08-30 11:00:00',
        '2023-08-30 12:00:00'
    );

-- Puedes seguir este patrón para insertar más citas si lo necesitas