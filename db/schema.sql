

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- CREATE TABLE roles (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL(10, 10),
--     dapartment_id INTEGER -- CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE
--     -- SET NULL
-- );

-- CREATE TABLE employees (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INTEGER NOT NULL,
--     manager_id INTEGER NOT NULL
-- );