CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO users(name, email)
SELECT
    'User' || generate_series,
    'user' || generate_series || '@gmail.com'
FROM generate_series(1, 100000);

SELECT * FROM users
WHERE email = 'user50000@gmail.com';

EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'user50000@gmail.com';

CREATE INDEX idx_users_email
ON users(email);

EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'user50000@gmail.com';