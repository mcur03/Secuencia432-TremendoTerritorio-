CREATE DATABASE tremendo_territorio;
USE tremendo_territorio;


CREATE TABLE auth_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cloudinary_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users;
SELECT COUNT(*) as count FROM users WHERE cedula = 1097731111;
-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE,
    cedula VARCHAR(20) UNIQUE,
    pin VARCHAR(255) NOT NULL UNIQUE,
    selected_image_id INT NOT NULL,
    rol ENUM('campesino', 'restaurante', 'usuariofinal', 'administrador'),
    is_active BOOLEAN DEFAULT TRUE,
    failed_login_attempts INT DEFAULT 0,
    last_failed_login TIMESTAMP NULL,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (selected_image_id) REFERENCES auth_images(id)
);

ALTER TABLE users
ADD COLUMN telefono VARCHAR(20) AFTER cedula,
ADD COLUMN fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;


CREATE TABLE whatsapp_user_states (
  id SERIAL PRIMARY KEY,
  user_phone VARCHAR(50) UNIQUE,
  current_state VARCHAR(100) DEFAULT 'main_menu',
  context TEXT,
  last_interaction TIMESTAMP DEFAULT NOW()
);
select now();
select * from whatsapp_user_states;
SELECT * FROM auth_images;
delete from auth_images where id in(18,19,20,21,22);
delete from whatsapp_user_states where id in(779);
delete from users where id = 10;

update whatsapp_user_states SET current_state = "registration_start" where id = 779;

update whatsapp_user_states SET current_state = "registration_username", context = '{"username":"Camila","username_timestamp":"2025-08-07T21:58:49.434Z","last_updated":"2025-08-07T21:59:15.388Z"}' where id = 557;
update users SET pin = "$h.xdYS93lQDLsD3aRHX2we4TNiAhh/.paJmNG8mQpdM2XNVWcV9vW" where id = 9;




INSERT INTO auth_images (cloudinary_url) VALUES 
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058394/img010_axmtjs.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058394/img007_potlq3.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058394/img009_j0tqhr.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058394/img008_n01zkx.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058393/img006_lodfe5.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058393/img005_mkiu2d.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058393/img003_jvog3u.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058393/img002_hsj0tn.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058393/img001_m6hdts.png'),
('https://res.cloudinary.com/duo1i65d7/image/upload/v1751058393/img004_djubof.png');	
