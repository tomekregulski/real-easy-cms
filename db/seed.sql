-- department table
INSERT INTO department(name)
VALUES
("Field Management"), 
("Business Development");

-- role table
INSERT INTO role(title, salary, department_id)
VALUES
-- field management
("Senior Manager", 75000.00, 1),
("Field Manager", 45000.00, 1),
("Talent Manager", 50000.00, 1),
-- business development
("Manager", 75000.00, 2),
("Associate", 50000.00, 2);

-- employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
-- field management
("Crystal", "Merkel", 1, null),
("Jerry", "Rust", 2, 1),
("Franz", "Kroll", 3, 1),
-- business development
("Samantha", "Fauci", 4, null),
("Mark", "Cornish", 5, 4),