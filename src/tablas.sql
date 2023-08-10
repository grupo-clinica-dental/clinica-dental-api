create table if not exists tbl_roles(
    id_role int auto_increment,
    nombre varchar(64) null,
    PRIMARY KEY(id_role)
)Engine = InnoDB default charset = utf8mb4;

create table if not exists tbl_token(
    id_token int auto_increment,
    token varchar(256),
    fecha_inicio datetime null,
    fecha_final datetime null,
    PRIMARY KEY(id_token)
)Engine = InnoDB default charset = utf8mb4;

create table if not exists tbl_estados_citas(
    id_estados_cita int auto_increment,
    nombre varchar(64),
    PRIMARY KEY(id_estados_cita)
)Engine = InnoDB default charset = utf8mb4;

create table if not exists tbl_pacientes(
    id_paciente int auto_increment,
    nombre varchar(64) null,
    edad int null,
    fecha_nacimiento DATE null,
    correo_electronico varchar(100) UNIQUE null,
    estado_civil varchar(24) null,
    tel varchar(24) null,
    PRIMARY KEY(id_paciente)
)Engine = InnoDB default charset = utf8mb4;


create table if not exists tbl_usuarios(
    id_usuario int auto_increment,
    nombre_completo varchar(64) null,
    password varchar(128) null,
    correo_electronico VARCHAR(128) UNIQUE NULL,
    url_img varchar(256) null,
    id_token int null,
    id_role int null,
    PRIMARY key(id_usuario),
    Foreign Key (id_role) REFERENCES tbl_roles(id_role),
    Foreign Key (id_token) REFERENCES tbl_token(id_token)
)Engine = InnoDB default charset = utf8mb4;


create table if not exists tbl_doctores(
    id_doctor int auto_increment,
    hora_incio TIME null,
    hora_final TIME null,
    id_usuario int null,
    color varchar(256) null,
    PRIMARY KEY(id_doctor),
    Foreign Key (id_usuario) REFERENCES tbl_usuarios(id_usuario)
)Engine = InnoDB default charset = utf8mb4;

create table if not exists tbl_citas(
    id_cita int auto_increment,
    fecha_inicio datetime null,
    fecha_final datetime null,
    id_paciente int null,
    id_doctor int null,
    id_estados_cita int null,
    mensaje varchar null,
    PRIMARY key(id_cita),
    Foreign Key (id_paciente) REFERENCES tbl_pacientes(id_paciente),
    Foreign Key (id_doctor) REFERENCES tbl_doctores(id_doctor),
    Foreign Key (id_estados_cita) REFERENCES tbl_estados_citas(id_estados_cita)
)Engine = InnoDB default charset = utf8mb4;

