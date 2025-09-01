CREATE DATABASE tremendo_territorio;
USE tremendo_territorio;

-- ----- whatsapp_user_states ----------------------------------------------------------------
CREATE TABLE whatsapp_user_states (
  id SERIAL PRIMARY KEY,
  user_phone VARCHAR(50) UNIQUE,
  current_state VARCHAR(100) DEFAULT 'main_menu',
  context TEXT,
  last_interaction TIMESTAMP DEFAULT NOW()
);
-- ----- auth_images ------------------------------------------------------------
CREATE TABLE auth_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cloudinary_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT* FROM auth_images;
-- ----- Tabla de usuarios -------------------------------------------------------
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NULL,
    email VARCHAR(255) UNIQUE,
    id_number VARCHAR(20) UNIQUE,
    user_phone VARCHAR(20) NOT NULL,
    pin VARCHAR(255) NOT NULL UNIQUE,
    selected_image_id INT NOT NULL,
    userRole ENUM('campesino', 'restaurante', 'usuariofinal', 'administrador'),
    is_active BOOLEAN DEFAULT TRUE,
    failed_login_attempts INT DEFAULT 0,
    last_failed_login TIMESTAMP NULL,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizattion_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (selected_image_id) REFERENCES auth_images(id) ON DELETE CASCADE ON UPDATE CASCADE
);
SELECT * FROM users;

-- ----- Farms -----------------------------------------------------------------------------------
CREATE TABLE farms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    farm_name VARCHAR(150) NOT NULL,
    location VARCHAR(255),
    farm_description TEXT,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
select * from farms;

-- ----- restaurants -----------------------------------------------------------------
CREATE TABLE restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    restaurant_name VARCHAR(150) NOT NULL,
    location VARCHAR(255),
	restaurant_description TEXT,
    openingTime TIME,
    closingTime TIME,
    peopleCapacity INT,
    socialMedia JSON,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
SELECT * FROM restaurants;
-- ------ images ----------------------------------------------------------------
CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- ----- products_category ----------------------------------------------------------
CREATE TABLE product_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ----- products -----------------------------------------------------------------------
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(100) NOT NULL,
    id_category INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_category) REFERENCES product_categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_product_category (productName, id_category)
);
-- ----- farm_offers -------------------------------------------------------------------------------
CREATE TABLE farm_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_farm INT NOT NULL,
    id_product INT NOT NULL,
    id_category INT NOT NULL,
    unitOfMeasurement VARCHAR(50),
    productionCapacity DECIMAL(10,2),
    variety VARCHAR(150),
    cultivation_method VARCHAR(200),
    seed_type VARCHAR(100),
    planting_date DATE,
    harvest_date DATE,
    seed_origin VARCHAR(200),
    contact_supplier VARCHAR(200),
    cycle_days INT,
    status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_farm) REFERENCES farms(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_category) REFERENCES product_categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- ----- restaurant_requirements --------------------------------------------------------------------
CREATE TABLE restaurant_requirements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_restaurant INT NOT NULL,
    id_product INT NOT NULL,
    id_category INT NOT NULL,
    unitOfMeasurement VARCHAR(50),
    required_quantity DECIMAL(10,2),
    priority ENUM('alta', 'media', 'baja') DEFAULT 'media',
    frecuencia ENUM('diaria', 'semanal', 'mensual') DEFAULT 'semanal',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_restaurant) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_category) REFERENCES product_categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- ------ comments ------------------------------------------------------------------------------------------
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_addressee INT NOT NULL,
    id_author INT NULL,     
    author_name VARCHAR(150) NOT NULL,
    author_email VARCHAR(5) NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment_text TEXT NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (id_addressee) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- ------ stories -----------------------------------------------------------------------------------
CREATE TABLE stories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    title VARCHAR(200),
    hisoty TEXT NOT NULL,
    state BOOLEAN DEFAULT TRUE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- --------------------------------------------------











































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
