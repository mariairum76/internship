CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);


INSERT INTO users (name, email)
VALUES
('Maria', 'maria@gmail.com'),
('Ali', 'ali@gmail.com');

SELECT * FROM users;


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    user_id INT,
    
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);


INSERT INTO posts (title, user_id)
VALUES
('First Post', 1),
('Second Post', 1),
('Third Post', 2);



SELECT users.name, posts.title
FROM users
INNER JOIN posts
ON users.id = posts.user_id;

SELECT users.name, posts.title
FROM users
LEFT JOIN posts
ON users.id = posts.user_id;

CREATE TABLE student_courses (
    student_id INT,
    course_id INT
);

SELECT COUNT(*) FROM users;
SELECT user_id, COUNT(*)
FROM posts
GROUP BY user_id;


SELECT name
FROM users
WHERE id IN (
    SELECT user_id FROM posts
);
CREATE INDEX idx_users_email
ON users(email);

EXPLAIN
SELECT * FROM users
WHERE email = 'maria@gmail.com';