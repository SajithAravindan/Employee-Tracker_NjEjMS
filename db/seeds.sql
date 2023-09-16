INSERT INTO department (name)
VALUES ("Engineering"),
    ("Finance"),
    ("Marketing"),
    ("Sales"),
    ("HR");
SELECT *
FROM DEPARTMENT;
-- engineering department has engineers and project managers and engineering manager
-- finance department has accountants and managers
--  marketing department has product marketing manager, Product Marketing Executive
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
    ("Project Manager", 150000, 1),
    ("Accountant", 70000, 2),
    ("Accounting Manager", 120000, 2),
    ("Product Marketing Executive ", 50000, 3),
    ("Product Marketing Manager", 150000, 3),
    ("HR Personal", 150000, 4),
    ("HR Manager", 225000, 1);
SELECT *
FROM ROLE;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("TONY", "STARK", 2, NULL),
    ("CONNIE", "SMITH", 2, NULL),
    ("RICHARD", "BUTCHER", 4, NULL),
    ("MICHEAL", "DOWNHILL", 6, NULL),
    ("BERNARD", "ALKINSON", 8, NULL),
    ("KAREN", "MATTHEWS", 1, 1),
    ("TIM", "ADOLF", 1, 1),
    ("KIM", "JARVIS", 1, 1),
    ("SAM", "MILES", 1, 1),
    ("JENNIFER", "HUETTE", 1, 2),
    ("ALFRED", "KINSLEY", 1, 2),
    ("PAUL", "TIMOTHY", 1, 2),
    ("JOHN", "ASGHAR", 1, 2),
    ("ROSE", "SUMMERS", 5, 3),
    ("ANDREW", "FAULKNER", 5, 3),
    ("BELLA", "SWAN", 5, 3),
    ("WENDY", "SHAWN", 5, 3),
    ("MADII", "HIMBURY", 7, 4),
    ("ATHENA", "WILSON", 7, 4);