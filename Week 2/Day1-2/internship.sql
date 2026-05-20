CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);
INSERT INTO users(name, email)
VALUES
('Ali', 'ali@gmail.com'),
('Sara', 'sara@gmail.com');