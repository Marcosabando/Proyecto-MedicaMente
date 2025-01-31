CREATE DATABASE medicamente;
use medicamente;

CREATE TABLE hospital(
	id_hospital SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    hospital_name VARCHAR(70) NOT NULL,
    address VARCHAR(50),
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    city VARCHAR(85) NOT NULL, --  se abrevia como Taumata Hill, su nombre original es Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu.
	description VARCHAR(255),
	hospital_img VARCHAR(255),
    hospital_deleted BOOLEAN DEFAULT 0
);

CREATE TABLE doctor(
	id_doctor INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	id_hospital SMALLINT UNSIGNED NOT NULL,
	doctor_name VARCHAR(70) NOT NULL,
	last_name VARCHAR(70) NOT NULL,
	speciality VARCHAR(100) NOT NULL,
	description_dr VARCHAR(255),
	university_degree VARCHAR(180) NOT NULL,
	doctor_image VARCHAR(255),
	doctor_delete BOOLEAN DEFAULT 0,

    CONSTRAINT fk_id_hospital FOREIGN KEY (id_hospital) 
    REFERENCES hospital(id_hospital) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO hospital (hospital_name, address, phone_number, email, password, city, description, hospital_img) 
VALUES("Hospital Universitario Virgen del Rocío","Av. Manuel Siurot, S/n, 41013 Sevilla","955 01 20 00","virgendelrocio@salud.com","", "Sevilla", "El Hospital Universitario Virgen del Rocío es un complejo hospitalario gestionado por el Servicio Andaluz de Salud, ubicado en la ciudad española de Sevilla, concretamente en el barrio de Bami.", "vr.jpg");


INSERT INTO doctor (id_hospital, doctor_name, last_name, speciality, description_dr, university_degree, doctor_image)
VALUES (1, "Jose Manuel", "Herrera Justiniano", "Aparato Digestivo EII", "Dr.Herrera Especializado en Enfermedades Intestinal Irritable, con mas de 40 años de experiencia y un largo historial de éxitos ante la enfermedad de Crohn", "Dr.Medicina Interna", "justi.jpg");
