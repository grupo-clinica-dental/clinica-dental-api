-- Active: 1690505574728@@localhost@5432@bd_de_pruebas@public

CREATE TABLE
    tbl_usuarios (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    tbl_usuarios (email, password)
VALUES ('admin@admin.com', 'admin'), ('admin2@admin.com', 'admin');

SELECT *
FROM tbl_usuarios
WHERE
    email = 'admin@admin.com'
    AND password = 'admin'