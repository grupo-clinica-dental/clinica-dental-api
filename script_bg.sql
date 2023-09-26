-- Active: 1690505574728@@localhost@5432@clinica_sequelize@public

-- Drop the database, please ensure you truly want to do this

-- drop DATABASE clinica

-- Table clinica_dental_api_type.tbl_roles

CREATE TABLE
    IF NOT EXISTS tbl_roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP
    );

-- Table clinica_dental_api_type.tbl_users

CREATE TABLE
    IF NOT EXISTS tbl_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP,
        role_id INT REFERENCES tbl_roles(id)
    );

-- Table clinica_dental_api_type.tbl_colors

CREATE TABLE
    IF NOT EXISTS tbl_colors (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) NOT NULL,
        name VARCHAR(60) NOT NULL,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP
    );

-- Table clinica_dental_api_type.tbl_doctors

CREATE TABLE
    IF NOT EXISTS tbl_doctors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        user_id INT REFERENCES tbl_users(id) NULL,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP,
        color_id INT REFERENCES tbl_colors(id) NOT NULL
    );

-- Table clinica_dental_api_type.tbl_patients

CREATE TABLE
    IF NOT EXISTS tbl_patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(100) NOT NULL,
        birth_date DATE,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP
    );

-- Table clinica_dental_api_type.tbl_appointment_statuses

CREATE TABLE
    IF NOT EXISTS tbl_appointment_statuses (
        id SERIAL PRIMARY KEY,
        status BOOLEAN DEFAULT TRUE,
        name VARCHAR(255) NOT NULL,
        deletion_date TIMESTAMP
    );

-- Table clinica_dental_api_type.tbl_appointments

CREATE TABLE
    IF NOT EXISTS tbl_appointments (
        id SERIAL PRIMARY KEY,
        doctor_id INT REFERENCES tbl_doctors(id),
        patient_id INT REFERENCES tbl_patients(id),
        appointment_status_id INT REFERENCES tbl_appointment_statuses(id),
        google_calendar_event_id VARCHAR(255),
        description TEXT,
        status BOOLEAN DEFAULT TRUE,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL
    );

-- Table clinica_dental_api_type.tbl_specialties

CREATE TABLE
    IF NOT EXISTS tbl_specialties (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP
    );

-- Table clinica_dental_api_type.tbl_doctor_specialties

CREATE TABLE
    IF NOT EXISTS tbl_doctor_specialties (
        doctor_id INT REFERENCES tbl_doctors(id),
        specialty_id INT REFERENCES tbl_specialties(id),
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP,
        PRIMARY KEY (doctor_id, specialty_id)
    );

-- Table clinica_dental_api_type.tbl_message_types

CREATE TABLE
    IF NOT EXISTS tbl_message_types (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        status BOOLEAN DEFAULT TRUE,
    );

-- Table clinica_dental_api_type.tbl_messages

CREATE TABLE
    IF NOT EXISTS tbl_messages (
        id SERIAL PRIMARY KEY,
        appointment_id INT REFERENCES tbl_appointments(id),
        user_id INT REFERENCES tbl_users(id),
        message_type_id INT REFERENCES tbl_message_types(id),
        sent_status_id INT REFERENCES tbl_message_statuses(id),
        content TEXT NOT NULL,
        status BOOLEAN DEFAULT TRUE,
    );

-- Table for message statuses

CREATE TABLE
    IF NOT EXISTS tbl_message_statuses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        status BOOLEAN DEFAULT TRUE,
    );

-- Table for scheduled messages associated with appointments

CREATE TABLE
    IF NOT EXISTS tbl_appointment_messages (
        id SERIAL PRIMARY KEY,
        appointment_id INT REFERENCES tbl_appointments(id),
        message_type_id INT REFERENCES tbl_message_types(id),
        scheduled_date TIMESTAMP,
        status BOOLEAN DEFAULT TRUE,
        message_status_id INT REFERENCES tbl_message_statuses(id),
        deletion_date TIMESTAMP
    );

-- Table for predefined message templates

CREATE TABLE
    IF NOT EXISTS tbl_message_templates (
        id SERIAL PRIMARY KEY,
        message_type_id INT REFERENCES tbl_message_types(id),
        content TEXT NOT NULL,
        status BOOLEAN DEFAULT TRUE,
        deletion_date TIMESTAMP
    );