CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    balance INT
);
ROLLBACK;


INSERT INTO accounts(name, balance)
VALUES
('Ali', 5000),
('Yousaf', 10000),
('Sara', 7000);
SELECT * FROM accounts;

-- Start Transaction
BEGIN;

--Deduct money form Ali
UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

--add money to yousaf
UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

--save changes
COMMIT;

SELECT * FROM accounts;
