CREATE TABLE employe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);

INSERT INTO employe(name, department, salary)
VALUES
('Ali', 'IT', 50000),
('Sara', 'IT', 70000),
('Ahmed', 'HR', 45000),
('Zara', 'HR', 60000),
('haider', 'Sales', 55000);

SELECT
    name,
    salary,
    ROW_NUMBER() OVER(ORDER BY salary DESC) AS row_num
FROM employe;

SELECT
    name,
    salary,
    RANK() OVER(ORDER BY salary DESC) AS ranking
FROM employe;

SELECT
    name,
    department,
    salary,
    RANK() OVER(
        PARTITION BY department
        ORDER BY salary DESC
    ) AS dept_rank
FROM employe;

SELECT
    name,
    salary,
    LEAD(salary) OVER(ORDER BY salary) AS next_salary
FROM employe;

SELECT
    name,
    salary,
    SUM(salary) OVER(ORDER BY id) AS running_total
FROM employe;

WITH high_salary AS (
    SELECT *
    FROM employe
    WHERE salary > 55000
)
SELECT * FROM high_salary;


WITH dept_avg AS (
    SELECT
        department,
        AVG(salary) AS avg_salary
    FROM employe
    GROUP BY department
),

high_paid AS (
    SELECT *
    FROM employe
    WHERE salary > 55000
)

SELECT
    h.name,
    h.salary,
    d.avg_salary
FROM high_paid h
JOIN dept_avg d
ON h.department = d.department;

CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT
);


INSERT INTO staff(name, manager_id)
VALUES
('CEO', NULL),
('Manager1', 1),
('Manager2', 1),
('Employee1', 2),
('Employee2', 2);

WITH RECURSIVE employee_tree AS (

    SELECT
        id,
        name,
        manager_id
    FROM staff
    WHERE manager_id IS NULL

    UNION ALL

    SELECT
        s.id,
        s.name,
        s.manager_id
    FROM staff s
    JOIN employee_tree et
    ON s.manager_id = et.id
)

SELECT * FROM employee_tree;