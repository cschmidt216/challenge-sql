INSERT INTO department
    (department_name)
VALUES
    ('Engineering'), 
    ('Sales'), 
    ('Finance'), 
    ('Legal'); 

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Software Engineer', 120000, 1), 
    ('Salesperson', 80000, 2), 
    ('Accountant', 100000, 3), 
    ('Lawyer', 190000, 4), 
    ('Legal Team Lead', 250000, 4), 
    ('Account Manager', 160000, 3), 
    ('Lead Engineer', 150000, 1), 
    ('Sales Lead', 100000, 1); 

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 8, null),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 7, null),
    ('Kevin ', 'Tupic', 1, 3),
    ('Kunal', 'Singh', 6, null),
    ('Malia', 'Brown', 3, 5),
    ('Sarah', 'Lourd', 5, null),
    ('Tom', 'Allen', 4, 7);