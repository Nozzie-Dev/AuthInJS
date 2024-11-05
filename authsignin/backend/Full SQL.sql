CREATE DATABASE ruixAuth_db;

USE ruixAuth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password)
VALUES
    ('Naledi', 'naledi@melsoft.may', 'Naledi@123'),
    ('Mnelisi', 'mnelisi@melsoft.may', 'Mnelisi@123'),
    ('Nozzie', 'nozzie@melsoft.may', 'Nozzie@123');
    
SELECT * from users;

ALTER TABLE users
ADD COLUMN google_id VARCHAR(255) UNIQUE;
